"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Navigate, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

import Navbar from "../components/Navbar"
import {
  DollarSign,
  Clock,
  Briefcase,
  Star,
  CheckCircle,
  X,
  ExternalLink,
  ChevronDown,
  FileText,
  Mail,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import HirePopup from "../components/HirePopup"
import useConversation from "../components/useConversation"

const JobBids = () => {
  const [bids, setBids] = useState(null)
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBid, setSelectedBid] = useState(null)
  const [selectedRole, setSelectedRole] = useState("")
  const [roles, setRoles] = useState([])
  const { jobId } = useParams()
  const token = localStorage.getItem("authToken")
  const [hirePopupOpen, setHirePopupOpen] = useState(false)
  const [freelancerId, setFreelancerId] = useState(null)
  const [selectedBidForHire, setSelectedBidForHire] = useState(null)
  const user = useSelector((state) => state.Auth.user);
  const userId = user ? user.id : null;
  const { startConversation } = useConversation({ user });
  const navigate = useNavigate();

  const openHirePopup = (bid, freelancerId) => {
    console.log("user", user)
    setSelectedBidForHire(bid)
    setFreelancerId(freelancerId)
    setHirePopupOpen(true)
  }

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bids/job/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response.data.data, "bids data")
        setBids(response.data.data.bids)

        setJob(response.data.data)
        console.log(Object.keys(response.data.data.bids), "bid roles")
        setRoles(Object.keys(response.data.data.bids))
        if (response.data.data.isCrowdsourced) {
          setSelectedRole(Object.keys(response.data.data.bids)[0] || "")
        }
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch bids")
        setLoading(false)
      }
    }

    fetchBids()
  }, [jobId, token])

  const handleHire = (bidId, freelancerId) => {
    openHirePopup(bidId, freelancerId)
  }

  const handleMessage = (freelancerId) => {
    // Implement message functionality
    console.log(`Messaging freelancer ${freelancerId}`)
  }

  const handleViewDetails = (bid) => {
    setSelectedBid(bid)
  }

  const closePopup = () => {
    setSelectedBid(null)
  }

  const handleStartConversation = ({ freelancerId }) => {
    console.log(freelancerId, 'freelancerid')
    startConversation({
      receiverId: freelancerId,
      jobId,
      onSuccess: (data) => {
        navigate(`/client/messages/${data.message.conversation._id}`)

        console.log("Conversation created and joined:", data);
      },
      onError: (err) => {
        console.error("Failed to start conversation", err);
      },
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#12a1e2]"></div>
      </div>
    )
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>

  const renderBids = (bidsToRender) => {
    if (!bidsToRender || bidsToRender.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-slate-400 py-12 bg-white border border-slate-200 rounded-lg"
        >
          No applications for this role yet.
        </motion.div>
      )
    }

    return bidsToRender.map((bid, index) => (
      <motion.div
        key={bid._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#12a1e2]/50 transition-all shadow-sm group cursor-pointer"
        onClick={() => handleViewDetails(bid)}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <img
                src={
                  bid.freelancer.profilePicture ||
                  "https://res.cloudinary.com/dxmeatsae/image/upload/v1745772539/client_verification_docs/mhpbkpi3vnkejxe0kpai.png"
                }
                alt={bid.freelancer.name}
                className="w-14 h-14 rounded-full border-2 border-slate-100 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#12a1e2] transition-colors">{bid.freelancer.name}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                <div className="flex items-center text-amber-500 font-medium text-xs">
                  <Star size={14} className="fill-current mr-1" />
                  <span>{bid.freelancer.successRate}% Success Rate</span>
                </div>
                <div className="flex items-center text-slate-500 text-xs">
                  <CheckCircle size={14} className="mr-1" />
                  <span>{bid.freelancer.completedJobs} Jobs Completed</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm line-clamp-3 mb-5 leading-relaxed">
            {bid.proposal}
          </p>

          <div className="flex items-center gap-4 py-3 border-y border-slate-50 mb-4 mt-auto">
            <div className="flex items-center text-slate-500 text-sm">
              <FileText size={16} className="text-[#12a1e2] mr-2" />
              <span className="font-semibold text-slate-700">CV:</span>
              <span className="ml-2 bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold">
                {bid.attachments && bid.attachments.length > 0 ? "Available" : "Not Provided"}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (bid.attachments && bid.attachments.length > 0) {
                  window.open(bid.attachments[0], '_blank');
                } else {
                  alert("No CV provided for this application.");
                }
              }}
              className="flex-1 bg-white hover:bg-slate-50 text-[#12a1e2] border border-[#12a1e2] py-2.5 rounded-lg flex items-center justify-center font-bold transition-all shadow-sm active:scale-[0.98] text-sm"
            >
              <ExternalLink className="mr-2" size={16} />
              Check CV
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(bid);
              }}
              className="flex-1 bg-[#12a1e2] hover:bg-[#0e8cd4] text-white py-2.5 rounded-lg flex items-center justify-center font-bold transition-all shadow-md active:scale-[0.98] text-sm"
            >
              View Application
            </button>
          </div>


        </div>
      </motion.div>
    ))
  }

  const BidDetailsPopup = ({ bid }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-0 max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative"
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-slate-900">Application Details</h2>
          <button onClick={closePopup} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <img
              src={
                bid.freelancer.profilePicture ||
                "https://res.cloudinary.com/dxmeatsae/image/upload/v1745772539/client_verification_docs/mhpbkpi3vnkejxe0kpai.png"
              }
              alt={bid.freelancer.name}
              className="w-20 h-20 rounded-full mr-6 border-2 border-white shadow-sm object-cover"
            />
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{bid.freelancer.name}</h3>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                <div className="flex items-center text-amber-500 font-semibold">
                  <Star size={18} className="fill-current mr-1.5" />
                  <span>{bid.freelancer.successRate}% Success Rate</span>
                </div>
                <div className="flex items-center text-slate-500 font-medium">
                  <CheckCircle size={18} className="mr-1.5" />
                  <span>{bid.freelancer.completedJobs} Jobs Completed</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
              <Mail size={18} className="mr-2 text-[#12a1e2]" />
              Cover Letter
            </h4>
            <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap">{bid.proposal}</p>
          </div>


          <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Proposed Budget</span>
              <span className="text-2xl font-bold text-slate-900">$ {bid.budget?.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Notice Period</span>
              <span className="text-lg text-slate-700 font-semibold flex items-center">
                <Clock size={20} className="mr-2 text-[#12a1e2]" />
                {bid.deliveryTime} {bid.deliveryTimeUnit}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
              <FileText size={18} className="mr-2 text-[#12a1e2]" />
              Attached CV
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bid.attachments.map((attachment, index) => (
                <a
                  href={attachment}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-[#12a1e2] hover:bg-blue-50/30 transition-all group"
                >
                  <div className="bg-slate-100 p-2 rounded-md group-hover:bg-[#12a1e2]/10 transition-colors mr-3">
                    <FileText size={18} className="text-slate-400 group-hover:text-[#12a1e2]" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-[#12a1e2] truncate">Download CV</span>
                  <ExternalLink size={14} className="ml-auto text-slate-300 group-hover:text-[#12a1e2]" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={() => {
                if (bid.attachments && bid.attachments.length > 0) {
                  window.open(bid.attachments[0], '_blank');
                } else {
                  alert("No CV provided.");
                }
              }}
              className="flex-1 bg-white hover:bg-slate-50 text-[#12a1e2] border border-[#12a1e2] py-3.5 rounded-xl flex items-center justify-center font-bold transition-all shadow-sm active:scale-[0.98]"
            >
              <ExternalLink className="mr-2" size={20} />
              Check Attached CV
            </button>
            <button
              onClick={closePopup}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl flex items-center justify-center font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r mb-8 h-[220px] from-[#12a1e2]/20 to-slate-50 border-b border-slate-200 flex items-center"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div>
              <div className="flex items-center">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mr-4">
                  <Briefcase className="text-[#12a1e2]" size={32} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Applications</h1>
                  <p className="text-slate-500 mt-1 max-w-xl font-medium tracking-wide">Reviewing developers for <span className="text-[#12a1e2] font-bold">"{job?.jobTitle}"</span></p>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex gap-3">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
                <span className="text-xs text-slate-400 font-bold uppercase block mb-0.5">Total Applications</span>
                <span className="text-xl font-bold text-slate-900">{job?.isCrowdsourced ? Object.values(bids || {}).flat().length : bids?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-6 text-black"
        >
          {job?.jobTitle}
        </motion.h2>
        {job?.isCrowdsourced ? (
          <div>
            <div className="mb-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <label htmlFor="role-select" className="block text-sm font-bold text-slate-600 mb-2 uppercase tracking-wider">
                Filter by Role
              </label>
              <div className="relative max-w-xs">
                <select
                  id="role-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="block appearance-none w-full bg-slate-50 border border-slate-200 text-slate-900 py-3 px-4 pr-10 rounded-lg leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#12a1e2] focus:border-transparent transition-all"
                >
                  {Object.keys(bids || {}).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderBids(bids?.[selectedRole])}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{renderBids(bids)}</div>
        )}
      </div>
      <AnimatePresence>{selectedBid && <BidDetailsPopup bid={selectedBid} />}</AnimatePresence>

      <AnimatePresence>
        {hirePopupOpen && (
          <HirePopup
            bid={selectedBidForHire}
            onClose={() => setHirePopupOpen(false)}
            jobId={jobId}
            isCrowdsourced={job?.isCrowdsourced}
            roles={job?.isCrowdsourced ? roles.map((role) => role) : []}
            freelancerId={freelancerId}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default JobBids
