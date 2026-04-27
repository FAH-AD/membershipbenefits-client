import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "../components/Navbar";

const ClientJobs = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("open");

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: { from: "/company-member/posted-jobs", message: "Please login to view your posted jobs" },
      });
    } else if (user.role !== "client") {
      navigate("/", { state: { message: "Only clients can view posted jobs" } });
    } else {
      fetchJobs();
    }
  }, [user, navigate]);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(" https://membershiptbenefits-server-1.onrender.com/api/jobs/my/posted-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterJobs = (status) => {
    return jobs
      ?.filter((job) => job.status === status)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  const NoJobsMessage = () => (
    <div className="bg-white rounded-lg border border-slate-200 p-8 text-center shadow-sm">
      <Briefcase size={48} className="text-[#12a1e2] mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-slate-900">No Jobs Posted Yet</h2>
      <p className="text-slate-500 mb-6">You haven't posted any jobs. Start by creating your first job listing!</p>
      <button
        onClick={() => navigate("/company-member/post-job")}
        className="bg-[#12a1e2] hover:bg-[#0e8cd4] text-white px-6 py-3 rounded-md transition-colors duration-200 shadow-sm font-medium"
      >
        Post Your First Job
      </button>
    </div>
  );

  const JobSection = ({ title, status, icon: Icon }) => {
    const filteredJobs = filterJobs(status);
    if (jobs.length === 0 || filteredJobs.length === 0) {
      return null;
    }

    return (
      <div className="mb-8 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50/50">
          <Icon size={24} className="text-[#12a1e2] mr-2" />
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <span className="ml-2 bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold">
            {filteredJobs.length}
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    );
  };

  const JobCard = ({ job }) => {
    const getJobRoute = (job) => {
      if (job.isCrowdsourced && job.status === 'in-progress') {
        return `/client/my-teams/${job._id}`;
      } else if (job.status === 'open') {
        return `/company-member/jobs/${job._id}`;
      } else {
        return `/company-member/my-jobs/${job._id}`;
      }
    };
    return (
      <div className="p-5 hover:bg-slate-50 transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-1">{job.title}</h3>
            <p className="text-slate-500 text-sm mb-3 max-w-2xl">{job.description.substring(0, 160)}...</p>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="text-[#12a1e2] bg-[#12a1e2]/10 px-3 py-1 rounded-full">
                $ {job.budget?.toLocaleString()}
              </span>
              <span className="text-slate-400 flex items-center">
                <Clock size={14} className="mr-1" />
                {job.status === 'open' ? 'Posted recently' : 'Update pending'}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate(getJobRoute(job))}
            className="bg-white hover:bg-slate-50 text-[#12a1e2] border border-[#12a1e2] px-6 py-2 rounded-md transition-colors duration-200 font-medium text-sm text-center"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#12a1e2]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg border border-slate-200 max-w-md w-full text-center shadow-lg">
          <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-slate-900">Error</h2>
          <p className="text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-12">
      <Navbar />
      <div className="bg-gradient-to-r mb-6 h-[200px] from-[#12a1e2]/20 to-slate-50 border-b border-slate-200 flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div>
              <div className="flex items-center">
                <Briefcase className="text-[#12a1e2] mr-2" size={24} />
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Posted Jobs</h1>
              </div>
              <p className="text-slate-500 mt-1">Manage and track your posted jobs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {jobs.length === 0 ? (
          <NoJobsMessage />
        ) : (
          <>
            <JobSection title="Open Jobs" status="open" icon={Briefcase} />
          </>
        )}
      </div>
    </div>
  );
};

export default ClientJobs;