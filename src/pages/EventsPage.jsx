import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { fetchAllEvents } from '../services/eventService';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [filters, setFilters] = useState({
    q: 'Artificial Intelligence',
    location: 'New York, NY',
  });
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    q: 'Artificial Intelligence',
    location: 'New York, NY',
  });

  const handleSearch = async (override) => {
    try {
      setLoading(true);
      const active = override || filters;
      setAppliedFilters(active);

      const data = await fetchAllEvents(active.q, active.location);
      setEvents(data || []);

      if (data.length > 0) {
        toast.success(`Found ${data.length} events!`);
      } else {
        toast.error('No events found. Try different keywords.');
      }
    } catch (err) {
      console.error('Search error:', err);
      toast.error('Failed to fetch events from Eventbrite');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  // Event handler for scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 50) {
        setShowSearch(true)
        setIsManuallyOpened(false)
      } else if (currentScrollY > 150 && currentScrollY > lastScrollY) {
        if (!isManuallyOpened) {
          setShowSearch(false)
        }
      } else if (currentScrollY < lastScrollY && currentScrollY < 400) {
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
;

  const handleReset = () => {
    const next = {
      q: 'Machine Learning',
      location: 'San Francisco',
    };
    setFilters(next);
    setAppliedFilters(next);
    handleSearch(next);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-[rgba(247,245,243,1)]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="relative mb-16 overflow-hidden rounded-[2.5rem] bg-black p-12 text-white shadow-2xl border border-white/5">
          {/* AI Style Gradients */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none select-none">
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/10"></div>
            <div className="absolute -bottom-48 -left-24 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              Live Event Discovery
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-none text-white">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-indigo-300">{appliedFilters.q}</span> Events
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium mb-8 max-w-xl">
              Advanced multi-source discovery engine for the latest {appliedFilters.q} meetups and networking in {appliedFilters.location}.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-sm font-semibold text-slate-300">
                Total Results: {events.length}
              </span>

            </div>
          </div>
        </div>

        {/* Search Bar - Premium Float Style with Perfectly Smooth Toggle */}
        <div
          className={`sticky top-24 z-40 max-w-5xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${showSearch
            ? 'opacity-100 translate-y-0 -mt-24 mb-16 visible'
            : 'opacity-0 -translate-y-4 -mt-24 mb-0 invisible pointer-events-none'
            }`}
        >
          <div className="bg-white/80 backdrop-blur-2xl p-4 rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-white/50 flex flex-col md:flex-row gap-4 relative transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowSearch(false);
                setIsManuallyOpened(false);
              }}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:scale-110 transition-all z-50"
              title="Hide Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-1 relative flex items-center">
              <div className="absolute left-4 p-2 bg-slate-50 rounded-lg">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Ex: Artificial Intelligence, Generative AI..."
                className="w-full pl-16 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-slate-900 font-semibold"
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex-1 relative flex items-center">
              <div className="absolute left-4 p-2 bg-slate-50 rounded-lg">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Ex: San Francisco, London, Online"
                className="w-full pl-16 pr-10 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-slate-900 font-semibold"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="md:w-44 px-8 py-4 bg-[rgb(37,37,37)] text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Research</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Floating FAB to show search */}
        <button
          onClick={() => {
            setShowSearch(true);
            setIsManuallyOpened(true);
          }}
          className={`fixed bottom-8 right-8 w-16 h-16 bg-[rgb(37,37,37)] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group ${showSearch ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="absolute right-20 px-4 py-2 bg-[rgb(37,37,37)] text-white text-xs font-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10">
            Show Search
          </span>
        </button>

        {/* Results Info */}
        {!loading && events.length > 0 && (
          <div className={`flex justify-between items-center mb-8 ${!showSearch ? '' : ''} px-2`}>
            <h2 className="text-xl font-bold text-slate-900">
              Found <span className="text-blue-600">{events.length}</span> results in {appliedFilters.location}
            </h2>
            <div className="flex gap-2">
              <button onClick={handleReset} className="px-6 py-2 bg-[rgb(37,37,37)] text-white text-sm font-bold rounded-xl hover:bg-black transition-all active:scale-95">
                Reset Search
              </button>
            </div>
          </div>
        )}

        {/* Event Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-4 h-[450px] animate-pulse border border-slate-100">
                <div className="bg-slate-100 rounded-2xl h-52 mb-6"></div>
                <div className="h-4 bg-slate-100 rounded w-1/3 mb-4"></div>
                <div className="h-6 bg-slate-100 rounded w-3/4 mb-4"></div>
                <div className="h-12 bg-slate-100 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((evt, idx) => (
              <div
                key={evt.event_url || idx}
                className="group bg-white rounded-[2rem] overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 cursor-pointer flex flex-col border border-slate-100 relative"
                onClick={() => window.open(evt.event_url, '_blank')}
              >
                {/* Error Overlay */}
                {evt.detail_error && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center p-8 text-center">
                    <div className="bg-white/90 p-4 rounded-2xl shadow-xl border border-rose-100">
                      <p className="text-rose-600 font-bold text-sm">Partial Data Captured</p>
                      <p className="text-slate-500 text-xs mt-1">Visit site for full details</p>
                    </div>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative h-56 overflow-hidden m-4 rounded-[1.5rem]">
                  <img
                    src={evt.image_url}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Source Tag */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-wider rounded-lg shadow-lg">
                    {evt.source || 'Verified'}
                  </div>

                  {/* Floating Date Tag */}
                  <div className="absolute top-4 left-4 p-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl text-center min-w-[50px]">
                    <span className="block text-[10px] font-black text-blue-600 uppercase tracking-tighter">
                      {evt.start_date ? new Date(evt.start_date).toLocaleString('en-US', { month: 'short' }) : 'TBD'}
                    </span>
                    <span className="block text-xl font-black text-slate-900 leading-none">
                      {evt.start_date ? new Date(evt.start_date).getDate() : '?'}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="px-3 py-1 bg-[rgb(37,37,37)] rounded-lg text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {evt.price === 'Free' ? 'Free Access' : evt.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                      {evt.organizer || 'Premium Host'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Location</p>
                      <p className="text-sm text-slate-700 font-bold truncate">
                        {evt.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-2 transition-colors">
                      Secure Tickets
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
                          {i === 2 ? '+' : 'U'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100 max-w-2xl mx-auto overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-5xl">🔭</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 italic">No cosmic events found.</h2>
              <p className="text-slate-500 mb-10 text-lg px-8 max-w-md mx-auto">Our discovery bots are scouring Eventbrite, but nothing matched your current filters. Try expanding your search horizons.</p>
              <button
                onClick={handleReset}
                className="px-10 py-4 bg-[rgb(37,37,37)] text-white font-black rounded-2xl hover:bg-black shadow-2xl transition-all translate-y-0 hover:-translate-y-1 active:scale-95"
              >
                Reset Search
              </button>
            </div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-slate-50 rounded-full"></div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: -0.01em;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
