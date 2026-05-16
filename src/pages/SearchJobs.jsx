"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Loader,
  AlertTriangle,
  Gift,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import Navbar from "../components/Navbar"

const SearchJobs = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.Auth?.user)
  const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

  // Parse query params from URL
  const queryParams = new URLSearchParams(location.search)
  const initialTitle = queryParams.get("title") || ""
  const initialLocation = queryParams.get("location") || ""
  const initialCategory = queryParams.get("category") || ""
  const initialMinBudget = queryParams.get("minBudget") || ""
  const initialMaxBudget = queryParams.get("maxBudget") || ""
  const initialExperience = queryParams.get("experience") || ""
  const initialPage = Number.parseInt(queryParams.get("page") || "1", 10)

  // Search state
  const [searchParams, setSearchParams] = useState({
    title: initialTitle,
    location: initialLocation,
    category: initialCategory,
    minBudget: initialMinBudget,
    maxBudget: initialMaxBudget,
    experience: initialExperience,
    page: initialPage,
    limit: 5,
  })

  // UI state
  const [jobs, setJobs] = useState([])
  const [totalJobs, setTotalJobs] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isManuallyOpened, setIsManuallyOpened] = useState(false)

  // External jobs state
  const [externalJobs, setExternalJobs] = useState([])
  const [isExternalLoading, setIsExternalLoading] = useState(false)
  const [externalError, setExternalError] = useState(null)
  const [externalPage, setExternalPage] = useState(1)

  // Deals Popup State
  const [showDealsModal, setShowDealsModal] = useState(false)
  const [dealsUrl, setDealsUrl] = useState("")

  // Check for deals popup on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const showPopup = urlParams.get("showDealsPopup")
    const savedUrl = localStorage.getItem("deals_sign_in_url")

    if (showPopup === "true" && savedUrl) {
      setDealsUrl(savedUrl)
      setShowDealsModal(true)

      // Clean up URL and localStorage
      const newParams = new URLSearchParams(location.search)
      newParams.delete("showDealsPopup")
      localStorage.removeItem("deals_sign_in_url")
      navigate(`${location.pathname}${newParams.toString() ? '?' + newParams.toString() : ''}`, { replace: true })
    }
  }, [location.search, navigate])

  // Fetch jobs on mount and when search params change
  useEffect(() => {
    fetchJobs()
    fetchExternalJobs()
  }, [searchParams.page, navigate])

  // Smart scroll behavior: Hide on scroll down, show on scroll up when near hero
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
        // At the very top, always show
        setShowSearch(true)
        setIsManuallyOpened(false)
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down + past initial offset, hide search
        if (!isManuallyOpened) {
          setShowSearch(false)
        }
      } else if (currentScrollY < lastScrollY && currentScrollY < 400) {
        // Scrolling up AND reaching the hero area, show search
        setShowSearch(true)
      }

      setLastScrollY(currentScrollY)
    }

    // Add scroll listener with throttling for performance
    let timeoutId = null;
    const scrollListener = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", scrollListener)
    return () => {
      window.removeEventListener("scroll", scrollListener)
      if (timeoutId) clearTimeout(timeoutId);
    }
  }, [lastScrollY, isManuallyOpened])


  // Update URL when search params change
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchParams.title) params.set("title", searchParams.title)
    if (searchParams.location) params.set("location", searchParams.location)
    if (searchParams.category) params.set("category", searchParams.category)
    if (searchParams.minBudget) params.set("minBudget", searchParams.minBudget)
    if (searchParams.maxBudget) params.set("maxBudget", searchParams.maxBudget)
    if (searchParams.experience) params.set("experience", searchParams.experience)
    if (searchParams.page > 1) params.set("page", searchParams.page.toString())

    navigate(`/jobs?${params.toString()}`, { replace: true })
  }, [searchParams, navigate])

  // Fetch jobs from API
  const fetchJobs = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Build query string
      const params = new URLSearchParams()
      if (searchParams.title) params.set("title", searchParams.title)
      if (searchParams.location) params.set("location", searchParams.location)
      if (searchParams.category) params.set("category", searchParams.category)
      if (searchParams.minBudget) params.set("minBudget", searchParams.minBudget)
      if (searchParams.maxBudget) params.set("maxBudget", searchParams.maxBudget)
      if (searchParams.experience) params.set("experience", searchParams.experience)
      params.set("page", searchParams.page.toString())
      params.set("limit", searchParams.limit.toString())

      const headers = {}
      const token = localStorage.getItem("authToken")
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(` https://membershiptbenefits-server-1.onrender.com/api/jobs/search?${params.toString()}`, {
        method: "GET",

      })

      if (!response.ok) {
        throw new Error("Failed to fetch jobs")
      }

      const data = await response.json()
      console.log(data, "data in search jobs")
      setJobs(data.data.jobs)
      setTotalJobs(data.data.totalJobs || 0)
      setTotalPages(data.data.totalPages || 1)
    } catch (err) {
      setError(err.message || "Failed to load jobs")
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch external jobs from JSearch and Indeed APIs
  const fetchExternalJobs = async () => {
    setIsExternalLoading(true)
    setExternalError(null)

    const query = searchParams.title || "ai and vr jobs";

    // JSearch Config
    const jsearchOptions = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      params: {
        query: query,
        page: "1",
        num_pages: "1",
        country: "us",
        date_posted: "all",
      },
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    }

    // Indeed12 Config (Standard Search)
    const indeedOptions = {
      method: 'GET',
      url: 'https://indeed12.p.rapidapi.com/jobs/search',
      params: {
        query: query,
        locality: 'us',
        start: '0'
      },
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'indeed12.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    };

    try {
      // Fetch both sources concurrently with allSettled to ensure partial success
      const [jsearchRes, indeedRes] = await Promise.allSettled([
        axios.request(jsearchOptions),
        axios.request(indeedOptions)
      ]);

      let combinedJobs = [];

      // Process JSearch Response
      if (jsearchRes.status === 'fulfilled') {
        const jobs = jsearchRes.value.data.data || [];
        combinedJobs = [...combinedJobs, ...jobs.map(job => ({
          ...job,
          source: 'JSearch'
        }))];
      } else {
        console.error("JSearch Fetch Failed:", jsearchRes.reason);
      }

      // Process Indeed Response with Mapping
      if (indeedRes.status === 'fulfilled') {
        const jobs = indeedRes.value.data.data || [];
        const mappedIndeedJobs = jobs.map(job => ({
          job_id: job.jobKey || `indeed-${Math.random()}`,
          job_title: job.jobTitle,
          employer_name: job.companyName || job.company || "Indeed Partner",
          job_location: job.location || (job.city ? `${job.city}, ${job.country || 'US'}` : "Remote"),
          job_apply_link: job.url || `https://www.indeed.com/viewjob?jk=${job.jobKey}`,
          job_description: job.description || job.snippet || "Explore this opportunity on Indeed.",
          job_posted_at_datetime_utc: job.datePublished || job.dateOnIndeed,
          source: 'Indeed'
        }));
        combinedJobs = [...combinedJobs, ...mappedIndeedJobs];
      } else {
        console.error("Indeed Fetch Failed:", indeedRes.reason);
      }

      // Sort by recency if possible
      combinedJobs.sort((a, b) => {
        const dateA = new Date(a.job_posted_at_datetime_utc || 0);
        const dateB = new Date(b.job_posted_at_datetime_utc || 0);
        return dateB - dateA;
      });

      setExternalJobs(combinedJobs);

      if (jsearchRes.status === 'rejected' && indeedRes.status === 'rejected') {
        setExternalError("Multi-source discovery engine offline. Please retry shortly.");
      }
    } catch (error) {
      console.error("Search Engine Error:", error);
      setExternalError("Failed to fetch extended market jobs");
    } finally {
      setIsExternalLoading(false)
    }
  }

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams((prev) => ({ ...prev, page: 1 })) // Reset to page 1
    setExternalPage(1) // Reset external page
    fetchJobs()
    fetchExternalJobs()
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams((prev) => ({ ...prev, [name]: value }))
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setSearchParams((prev) => ({ ...prev, page: newPage }))
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({
      title: "",
      location: "",
      category: "",
      minBudget: "",
      maxBudget: "",
      experience: "",
      page: 1,
      limit: 5,
    })
    setExternalPage(1)
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Format location
  const formatLocation = (location) => {
    switch (location) {
      case "remote":
        return "Remote"
      case "on-site":
        return "On-site"
      case "hybrid":
        return "Hybrid"
      default:
        return location
    }
  }

  // Format experience level
  const formatExperience = (level) => {
    switch (level) {
      case "entry":
        return "Entry Level"
      case "intermediate":
        return "Intermediate"
      case "expert":
        return "Expert"
      default:
        return level
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3] text-[#1F2937]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Hero Section */}
        <div className="relative mb-8 md:mb-16 overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-black p-8 md:p-12 text-white shadow-2xl border border-white/5">
          {/* AI Style Gradients */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none select-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/10"></div>
            <div className="absolute -bottom-48 -left-24 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              Strategic Career Discovery
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight leading-tight md:leading-none text-white">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-indigo-300">{searchParams.title || "Global"}</span> Careers
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium mb-8 max-w-xl leading-relaxed">
              Advanced multi-source discovery engine for the latest opportunities across Eventbrite and global job markets.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-sm font-semibold text-slate-300">
                Total Resources: {totalJobs + externalJobs.length}
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar - Premium Float Style with Perfectly Smooth Toggle */}
        <div
          className={`sticky top-24 z-40 max-w-5xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${showSearch
            ? "opacity-100 translate-y-0 -mt-24 mb-16 visible"
            : "opacity-0 -translate-y-4 -mt-24 mb-0 invisible pointer-events-none"
            }`}
        >
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch(e); }}
            className="bg-white/80 backdrop-blur-2xl p-4 rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-white/50 flex flex-col md:flex-row gap-4 relative transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                setShowSearch(false);
                setIsManuallyOpened(false);
              }}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:scale-110 transition-all z-50"
              title="Hide Search"
            >
              <X size={18} />
            </button>

            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-lg group-focus-within:bg-blue-50 transition-colors">
                  <Search className="text-slate-400 group-focus-within:text-blue-600" size={20} />
                </div>
                <input
                  type="text"
                  name="title"
                  value={searchParams.title}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                  placeholder="Job title or keyword"
                  className="w-full pl-16 pr-4 py-4 bg-white rounded-2xl border-2 border-slate-100 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-slate-900 font-semibold placeholder:text-slate-400"
                />
              </div>

              <div className="flex-1 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-lg group-focus-within:bg-blue-50 transition-colors">
                  <MapPin className="text-slate-400 group-focus-within:text-blue-600" size={20} />
                </div>
                <select
                  name="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  className="w-full pl-16 pr-4 py-4 bg-white rounded-2xl border-2 border-slate-100 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-slate-900 font-semibold appearance-none"
                >
                  <option value="">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading || isExternalLoading}
                className="md:w-44 px-8 py-4 bg-[rgb(37,37,37)] text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
              >
                {isLoading || isExternalLoading ? (
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Research</span>
                    <Search size={20} />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-4 rounded-2xl border transition-all flex items-center justify-center ${showFilters
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                  }`}
              >
                <Filter size={20} />
                {showFilters ? <ChevronUp size={20} className="ml-1" /> : <ChevronDown size={20} className="ml-1" />}
              </button>
            </div>
          </form>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-slate-100 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={searchParams.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 appearance-none transition-all font-semibold"
                      >
                        <option value="">All Categories</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Content Writing">Content Writing</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Audio Production">Audio Production</option>
                        <option value="Translation">Translation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-bold text-slate-700 mb-2">
                        Experience Level
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={searchParams.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 appearance-none transition-all font-semibold"
                      >
                        <option value="">All Levels</option>
                        <option value="entry">Entry Level</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Budget Range ($)</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          name="minBudget"
                          value={searchParams.minBudget}
                          onChange={handleInputChange}
                          placeholder="Min"
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-400 font-semibold"
                        />
                        <input
                          type="number"
                          name="maxBudget"
                          value={searchParams.maxBudget}
                          onChange={handleInputChange}
                          placeholder="Max"
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-400 font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-sm font-bold px-4 py-2 text-slate-500 hover:text-rose-500 transition-colors bg-slate-50 rounded-lg"
                    >
                      <X size={16} />
                      <span>Clear Filters</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pb-24">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
              <AlertTriangle size={20} className="text-red-500 mr-2" />
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Results Info */}
          {!isLoading && totalJobs > 0 && (
            <div className="mb-8 flex justify-between items-center px-2">
              <h2 className="text-xl font-bold text-slate-900">
                Found <span className="text-blue-600">{totalJobs}</span> matching positions
              </h2>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-[rgb(37,37,37)] text-white text-sm font-bold rounded-xl hover:bg-black transition-all active:scale-95"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] p-6 h-[250px] animate-pulse border border-slate-100 shadow-sm">
                  <div className="flex justify-between mb-8">
                    <div className="space-y-3 w-1/2">
                      <div className="h-6 bg-slate-100 rounded-lg w-3/4"></div>
                      <div className="h-4 bg-slate-100 rounded-md w-1/2"></div>
                    </div>
                    <div className="h-10 bg-slate-100 rounded-2xl w-32"></div>
                  </div>
                  <div className="space-y-2 mb-8">
                    <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                    <div className="h-4 bg-slate-100 rounded-md w-5/6"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-slate-100 rounded-xl w-20"></div>
                    <div className="h-8 bg-slate-100 rounded-xl w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && jobs.length === 0 && (
            <div className="bg-white rounded-[3rem] p-24 text-center shadow-sm border border-slate-100 max-w-2xl mx-auto overflow-hidden relative">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Briefcase size={40} className="text-blue-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 italic">No careers found.</h3>
              <p className="text-slate-500 mb-10 text-lg px-8 max-w-md mx-auto">Our discovery bots are scouring the market, but nothing matched your current skills. Try expanding your search horizons.</p>
              <button
                onClick={clearFilters}
                className="px-8 py-4 bg-[rgb(37,37,37)] text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Job Results */}
          {!isLoading && jobs.length > 0 && (
            <div className="space-y-6">
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-blue-200 transition-all cursor-pointer shadow-sm hover:shadow-xl group"
                  onClick={() => {
                    if (!user) {
                      navigate('/login', { state: { message: "Please login to view job details" } });
                    } else {
                      navigate(user.role === 'client' ? `/company-member/jobs/${job._id}` : `/member/jobs/${job._id}`);
                    }
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-[#1F2937]">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#6B7280]">
                          <span className="flex items-center">
                            <Briefcase size={14} className="mr-1" />
                            {job.client?.name || "Client"}
                          </span>
                          <span className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {formatLocation(job.location)}
                          </span>
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            Posted {formatDate(job.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 px-5 py-2 rounded-2xl flex items-center border border-blue-100">
                          <DollarSign size={16} className="text-blue-600 mr-1" />
                          <span className="font-black text-blue-700">$ {job?.budget?.toLocaleString()}</span>
                        </div>
                        {job.hasApplied ? (
                          <div className="bg-emerald-50 text-emerald-600 px-5 py-2 rounded-2xl flex items-center border border-emerald-100 font-bold">
                            <CheckCircle size={16} className="mr-1" />
                            <span>Applied</span>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!user) {
                                navigate('/login', { state: { message: "Please login to apply for jobs" } });
                              } else {
                                navigate(user.role === 'client' ? `/company-member/apply-job/${job._id}` : `/member/apply-job/${job._id}`)
                              }
                            }}
                            className="bg-[rgb(37,37,37)] hover:bg-black px-6 py-2.5 text-white font-bold rounded-2xl transition-all shadow-lg shadow-black/5 active:scale-95"
                          >
                            Apply Now
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 mb-6 line-clamp-2 text-sm leading-relaxed">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="bg-slate-50 text-slate-700 px-4 py-1.5 rounded-xl text-xs font-bold border border-slate-100">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="pt-5 border-t border-slate-50 flex flex-wrap gap-3">
                      <span className="bg-blue-50/50 text-blue-700 px-4 py-2 rounded-xl flex items-center text-xs font-black uppercase tracking-wider">
                        <Briefcase size={12} className="mr-2" />
                        {formatExperience(job.experienceLevel)}
                      </span>
                      <span className="bg-indigo-50/50 text-indigo-700 px-4 py-2 rounded-xl flex items-center text-xs font-black uppercase tracking-wider">
                        <CheckCircle size={12} className="mr-2" />
                        {job.bidCount} Proposal{job.bidCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(searchParams.page - 1)}
                  disabled={searchParams.page === 1}
                  className={`px-4 py-2 rounded-xl border transition-all ${searchParams.page === 1
                    ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm"
                    }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-xl border transition-all font-bold ${searchParams.page === page
                      ? "bg-[rgb(37,37,37)] text-white border-[rgb(37,37,37)] shadow-lg shadow-black/10"
                      : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm"
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(searchParams.page + 1)}
                  disabled={searchParams.page === totalPages}
                  className={`px-4 py-2 rounded-xl border transition-all ${searchParams.page === totalPages
                    ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {/* External Jobs Heading */}
          <div className="mt-20 mb-10 pt-10 border-t border-slate-200">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Extended Market</h2>
            <p className="text-slate-500 text-lg">Cross-platform opportunities from our global partners</p>
          </div>

          {/* External Jobs Loading State */}
          {isExternalLoading && (
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] p-6 h-[220px] animate-pulse border border-slate-100 shadow-sm">
                  <div className="flex justify-between mb-8">
                    <div className="space-y-3 w-1/2">
                      <div className="h-6 bg-slate-100 rounded-lg w-3/4"></div>
                      <div className="h-4 bg-slate-100 rounded-md w-1/2"></div>
                    </div>
                    <div className="h-10 bg-slate-100 rounded-2xl w-32"></div>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-md w-full mb-8"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-slate-100 rounded-xl w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* External Jobs Error Message */}
          {externalError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
              <AlertTriangle size={20} className="text-red-500 mr-2" />
              <p className="text-red-500">{externalError}</p>
            </div>
          )}

          {/* External Job Results */}
          {!isExternalLoading && externalJobs.length > 0 && (
            <div className="space-y-6 mb-12">
              {externalJobs.slice((externalPage - 1) * 5, externalPage * 5).map((job, index) => (
                <motion.div
                  key={job.job_id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-blue-200 transition-all cursor-pointer shadow-sm hover:shadow-xl group relative"
                  onClick={() => window.open(job.job_apply_link, "_blank")}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-[#1F2937]">{job.job_title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${job.source === 'Indeed'
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-indigo-50 text-indigo-600 border-indigo-100"
                            }`}>
                            {job.source || 'JSearch'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#6B7280]">
                          <span className="flex items-center">
                            <Briefcase size={14} className="mr-1" />
                            {job.employer_name || "External Company"}
                          </span>
                          <span className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {job.job_city && job.job_country ? `${job.job_city}, ${job.job_country}` : job.job_location || "Remote"}
                          </span>
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            Posted {job.job_posted_at_datetime_utc ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString() : "Recently"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          className="bg-[rgb(37,37,37)] hover:bg-black text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-lg shadow-black/5 active:scale-95 whitespace-nowrap"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(job.job_apply_link, "_blank");
                          }}
                        >
                          Secure Offer
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-6 line-clamp-2 text-sm leading-relaxed">{job.job_description}</p>

                    <div className="flex flex-wrap gap-2">
                      {job.job_employment_type && (
                        <span className="bg-slate-50 text-slate-700 px-4 py-1.5 rounded-xl text-xs font-bold border border-slate-100">
                          {job.job_employment_type}
                        </span>
                      )}
                      {job.job_is_remote && (
                        <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border border-blue-100">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No External Results */}
          {!isExternalLoading && externalJobs.length === 0 && !externalError && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 text-center mb-12 shadow-sm">
              <p className="text-[#6B7280]">No external jobs found for this search.</p>
            </div>
          )}

          {/* External Pagination */}
          {externalJobs.length > 5 && (
            <div className="mt-8 flex justify-center mb-12">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExternalPage((prev) => Math.max(1, prev - 1))}
                  disabled={externalPage === 1}
                  className={`px-4 py-2 rounded-xl border transition-all ${externalPage === 1
                    ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm"
                    }`}
                >
                  Previous
                </button>

                {Array.from({ length: Math.ceil(externalJobs.length / 5) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setExternalPage(page)}
                    className={`w-10 h-10 rounded-xl border transition-all font-bold ${externalPage === page
                      ? "bg-[rgb(37,37,37)] text-white border-[rgb(37,37,37)] shadow-lg shadow-black/10"
                      : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm"
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setExternalPage((prev) => prev + 1)}
                  disabled={externalPage >= Math.ceil(externalJobs.length / 5)}
                  className={`px-4 py-2 rounded-xl border transition-all ${externalPage >= Math.ceil(externalJobs.length / 5)
                    ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating FAB to show search */}
      <button
        onClick={() => {
          setShowSearch(true);
          setIsManuallyOpened(true);
        }}
        className={`fixed bottom-8 right-8 w-16 h-16 bg-[rgb(37,37,37)] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group ${showSearch ? "translate-y-32 opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <Search size={24} />
        <span className="absolute right-20 px-4 py-2 bg-[rgb(37,37,37)] text-white text-xs font-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10">
          Show Search
        </span>
      </button>

      {/* Deals Access Modal */}
      <AnimatePresence>
        {showDealsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDealsModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[92%] sm:max-w-[450px] md:max-w-3xl bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/20 mx-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Premium Background Elements */}
              <div className="absolute top-0 right-0 w-full h-full pointer-events-none select-none overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00d26a]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>

              <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="flex-1 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest mb-4 border border-emerald-100">
                    <Sparkles size={12} />
                    Premium Membership Access
                  </div>

                  <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                    Unlock Exclusive Member Deals
                  </h2>

                  <p className="text-slate-500 text-base leading-relaxed">
                    Your membership benefits dashboard is the core experience — giving you access
                    to exclusive discounts, perks, and premium offers.
                  </p>
                </div>

                <div className="flex-1 w-full space-y-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-600 text-sm font-medium mb-4 italic">
                      "Jobs and events are included as additional benefits to help you grow your network and opportunities."
                    </p>
                    <button
                      onClick={() => {
                        window.open(dealsUrl, "_blank");
                        setShowDealsModal(false);
                      }}
                      className="w-full py-4 bg-[#00d26a] hover:bg-[#1adb7a] text-white font-black rounded-xl transition-all shadow-[0_12px_24px_-8px_rgba(0,210,106,0.5)] active:scale-95 flex items-center justify-center gap-3 text-base group"
                    >
                      <span>Go to deals page</span>
                      <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: -0.01em;
        }
      `}} />
    </div>
  )
}

export default SearchJobs;
