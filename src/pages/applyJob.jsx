"use client"

import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Plus,
  Trash2,
  Users,
  Upload,
  X,
} from "lucide-react"
import Navbar from "../components/Navbar"

// Import the file upload utility
export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append("file", file)

  try {
    const response = await fetch("http://localhost:5000/api/upload/test-upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("File upload failed")
    }

    const data = await response.json()
    return data.file.url
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

const ApplyJob = () => {
  const navigate = useNavigate()
  const { jobId } = useParams()
  const location = useLocation()
  const jobFromState = location.state?.job
  const fileInputRef = useRef(null)

  const user = useSelector((state) => state.Auth.user)
  const [isLoading, setIsLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [job, setJob] = useState(null)
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const token = localStorage.getItem("authToken")

  // Application data state
  const [applicationData, setApplicationData] = useState({
    jobId: jobId || "",
    budget: 0,
    deliveryTime: 14,
    deliveryTimeUnit: "days",
    proposal: "",
    contactNumber: "",
    attachments: [],
    status: "pending",
    isRead: false,
    role: "", // For crowdsourced jobs
  })

  // Check if user is authorized (member/company-member role)
  useEffect(() => {

    if (!user) {
      navigate("/login", {
        state: { from: `/apply-job/${jobId}`, message: "Please login to apply for jobs" },
      })
    } else if (user.role !== "freelancer" && user.role !== "client") {
      navigate("/", { state: { message: "Only freelancers and company-members can apply for jobs" } })
    } else {
      console.log('jobId', jobId)
      fetchJobDetails()
    }
  }, [user, navigate, jobId])

  // Fetch job details (only if not provided in route state)
  const fetchJobDetails = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch job details")
      }
      const data = await response.json()
      setJob(data.data)
      console.log(data, "job data")
      setApplicationData((prev) => ({
        ...prev,
        budget: data.data.budget,
      }))
    } catch (err) {
      setError("Failed to load job details. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form data changes
  const handleChange = (field, value) => {
    setApplicationData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Removed handleMilestoneChange, addMilestone, removeMilestone

  // Handle file upload
  const handleFileChange = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    await handleFileUpload(files)
  }

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      await handleFileUpload(files)
    }
  }

  // Handle file upload
  const handleFileUpload = async (files) => {
    // Check file size (limit to 10MB per file)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const oversizedFiles = Array.from(files).filter((file) => file.size > maxSize)

    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the 10MB limit: ${oversizedFiles.map((f) => f.name).join(", ")}`)
      return
    }

    // Limit to 5 files total
    if (applicationData.attachments.length + files.length > 5) {
      setError("You can upload a maximum of 5 files")
      return
    }

    setUploadingFiles(true)
    setError(null)

    try {
      const filePromises = Array.from(files).map(async (file) => {
        try {
          const fileUrl = await uploadFile(file)
          return {
            name: file.name,
            url: fileUrl,
          }
        } catch (err) {
          console.error(`Error uploading ${file.name}:`, err)
          throw new Error(`Failed to upload ${file.name}`)
        }
      })

      const uploadedFiles = await Promise.all(filePromises)

      setApplicationData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...uploadedFiles],
      }))
    } catch (err) {
      setError(err.message || "Failed to upload files. Please try again.")
    } finally {
      setUploadingFiles(false)
    }
  }

  // Remove attachment
  const removeAttachment = (index) => {
    const updatedAttachments = [...applicationData.attachments]
    updatedAttachments.splice(index, 1)
    setApplicationData((prev) => ({
      ...prev,
      attachments: updatedAttachments,
    }))
  }

  // Removed totalMilestoneAmount calculation

  // Check if form is valid
  const isFormValid = () => {
    // Check if proposal is not empty and has minimum length
    if (!applicationData.proposal.trim() || applicationData.proposal.length < 50) return false

    // Check if budget is greater than 0
    if (applicationData.budget <= 0) return false

    // Check if delivery time is greater than 0
    if (applicationData.deliveryTime <= 0) return false

    // Check if role is selected for crowdsourced jobs
    if (job?.isCrowdsourced && !applicationData.role) return false

    // CV is now mandatory
    if (applicationData.attachments.length === 0) return false

    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      // Prepare data for submission
      const bidData = {
        jobId: jobId,
        freelancer: user._id,
        budget: applicationData.budget,
        deliveryTime: applicationData.deliveryTime,
        deliveryTimeUnit: applicationData.deliveryTimeUnit,
        proposal: applicationData.proposal,
        attachments: applicationData.attachments.map((attachment) => attachment.url),
        status: "pending",
        isRead: false,
      }

      // Add role for crowdsourced jobs
      if (job?.isCrowdsourced) {
        bidData.role = applicationData.role
      }
      console.log(bidData, "bid data")

      // Submit bid to API
      const response = await fetch("http://localhost:5000/api/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bidData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit proposal")
      }

      // Show success message
      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        navigate("/member", { state: { message: "Proposal submitted successfully!" } })
      }, 2000)
    } catch (err) {
      setError(err.message || "Failed to submit proposal. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#12a1e2] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg border border-slate-200 max-w-md w-full text-center shadow-md">
          <div className="mx-auto w-16 h-16 bg-[#12a1e2]/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-[#12a1e2]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Proposal Submitted!</h2>
          <p className="text-slate-500 mb-6">Your proposal has been sent to the client.</p>
          <div className="animate-pulse">
            <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <Navbar />
      <div className="bg-gradient-to-r mb-6 h-[200px] from-[#12a1e2]/20 to-slate-50 border-slate-200 flex items-center">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center">
                <Briefcase className="text-[#12a1e2] mr-2" size={24} />
                <h1 className="text-2xl md:text-3xl font-bold">Apply for Job</h1>
              </div>
              <p className="text-slate-500 mt-1">Submit your proposal for this project</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-200 transition-colors"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Job Details */}
        {job && (
          <div className="bg-white border-slate-200 mb-8 border rounded-lg shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                <span className="flex items-center">
                  Budget: $ {job.budget.toLocaleString()}
                </span>
                <span className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Briefcase size={16} className="mr-1" />
                  Client: {job.client?.name || "Client"}
                </span>
                {job.isCrowdsourced && (
                  <span className="flex items-center bg-[#12a1e2]/20 text-[#12a1e2] px-2 py-1 rounded-full">
                    <Users size={14} className="mr-1" />
                    Team Project
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">Job Description</h3>
              <p className="text-slate-600 mb-4">{job.description}</p>

              <h3 className="text-lg font-bold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, index) => (
                  <span key={index} className="bg-slate-100 text-slate-900 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Crowdsourcing Roles */}
              {job.isCrowdsourced && job.crowdsourcingRoles && job.crowdsourcingRoles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Available Roles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.crowdsourcingRoles.map((role, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${applicationData.role === role.title
                          ? "border-[#12a1e2] bg-[#12a1e2]/10"
                          : "border-slate-200 bg-slate-50 hover:border-[#12a1e2]/50"
                          }`}
                        onClick={() => {
                          handleChange("role", role.title)
                          handleChange("budget", role.budget)
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{role.title}</h4>
                          <span className="bg-slate-200 px-2 py-1 rounded text-sm">
                            $ {role.budget.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mb-3">{role.description}</p>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Required Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {role.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full border border-slate-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-md flex items-center">
            <AlertTriangle size={20} className="text-red-400 mr-2" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit}>
          {/* Crowdsourced Role Selection - Mobile View */}
          {job?.isCrowdsourced && (
            <div className="bg-white border-slate-200 mb-8 p-6 md:hidden">
              <h2 className="text-xl font-bold mb-4">Select Role</h2>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2">
                  Role <span className="text-red-400">*</span>
                </label>
                <select
                  value={applicationData.role}
                  onChange={(e) => {
                    const selectedRole = job.crowdsourcingRoles.find((role) => role.title === e.target.value)
                    handleChange("role", e.target.value)
                    if (selectedRole) {
                      handleChange("budget", selectedRole.budget)
                    }
                  }}
                  className="w-full px-4 py-3 bg-slate-100 border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#12a1e2] focus:border-transparent"
                  required={job.isCrowdsourced}
                >
                  <option value="">Select a role</option>
                  {job.crowdsourcingRoles.map((role, index) => (
                    <option key={index} value={role.title}>
                      {role.title} - ${role.budget}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">Select the role you want to apply for in this team project</p>
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-8 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold">Your Proposal</h2>
              <p className="text-slate-500 mt-1">Tell the client why you're the best fit for this job</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Budget and Delivery Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2">
                    Expected Salary ($) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-sm">$</span>
                    </div>
                    <input
                      id="budget"
                      type="number"
                      step="50"
                      value={applicationData.budget === 0 ? '' : applicationData.budget}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : Number(e.target.value);
                        handleChange("budget", value);
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-slate-100 border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#12a1e2] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="deliveryTime" className="block text-sm font-medium mb-2">
                    Notice Period <span className="text-red-400">*</span>
                  </label>
                  <div className="flex">
                    <input
                      id="deliveryTime"
                      type="number"
                      min="1"
                      value={applicationData.deliveryTime}
                      onChange={(e) => handleChange("deliveryTime", Number(e.target.value))}
                      className="w-full pl-4 pr-4 py-3 bg-slate-100 hover:border-[#12a1e2]/50 rounded-l-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#12a1e2] focus:border-transparent"
                      required
                    />
                    <select
                      value={applicationData.deliveryTimeUnit}
                      onChange={(e) => handleChange("deliveryTimeUnit", e.target.value)}
                      className="bg-white border-l-0 border border-slate-200 rounded-r-md text-slate-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#12a1e2] focus:border-transparent"
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">What is your notice period for this project?</p>
                </div>
              </div>

              {/* Proposal */}
              <div>
                <label htmlFor="proposal" className="block text-sm font-medium mb-2">
                  Cover Letter <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="proposal"
                  value={applicationData.proposal}
                  onChange={(e) => handleChange("proposal", e.target.value)}
                  placeholder="Introduce yourself and explain why you're the best fit for this job..."
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-100 border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#12a1e2] focus:border-transparent resize-none"
                  required
                ></textarea>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-slate-500">
                    Highlight your relevant experience, skills, and approach to this project.
                  </p>
                  <p className={`text-xs ${applicationData.proposal.length < 50 ? "text-red-400" : "text-green-400"}`}>
                    {applicationData.proposal.length}/50 characters minimum
                  </p>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">CV <span className="text-red-400">*</span></label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? "border-[#12a1e2] bg-[#12a1e2]/5" : "border-slate-300"
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center">
                    <Upload size={36} className="text-slate-500 mb-2" />
                    <p className="mb-2 text-sm">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">PDF, DOCX, JPG, PNG (Max 10MB per file)</p>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      id="file-upload"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      disabled={uploadingFiles}
                      className={`mt-4 px-4 py-2 rounded-md cursor-pointer transition-colors ${uploadingFiles
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                        }`}
                    >
                      {uploadingFiles ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-[#12a1e2] border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span>Uploading...</span>
                        </div>
                      ) : (
                        "Select Files"
                      )}
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Upload your CV/Resume (up to 5 files). **Mandatory**
                </p>

                {/* Attached Files */}
                {applicationData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {applicationData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-50 p-3 rounded-md border border-slate-200"
                      >
                        <div className="flex items-center">
                          <div className="bg-[#12a1e2]/10 p-2 rounded-md mr-3">
                            <FileText size={16} className="text-[#12a1e2]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#12a1e2] hover:underline"
                            >
                              View file
                            </a>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Removed Milestones section */}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isFormValid() || submitting || uploadingFiles}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-colors ${!isFormValid() || submitting || uploadingFiles
                ? "bg-[#12a1e2]/50 text-white cursor-not-allowed"
                : "bg-[#12a1e2] hover:bg-[#0e8cd4] text-white shadow-sm"
                }`}
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <CheckCircle size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyJob
