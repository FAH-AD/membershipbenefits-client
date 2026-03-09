import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { searchEvents } from '../services/eventService';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Events');
  const [filters, setFilters] = useState({
    q: 'AI events',
    location: 'United States',
  });
  const [appliedFilters, setAppliedFilters] = useState({
    q: 'AI events',
    location: 'United States',
  });

  const navigate = useNavigate();

  const handleSearch = async (override) => {
    try {
      setLoading(true);
      const active = override || filters;
      setAppliedFilters(active);

      const data = await searchEvents({
        q: active.q,
        location: active.location,
      });
      setEvents(data || []);
    } catch (err) {
      console.error('Search error:', err);
      toast.error('Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleReset = () => {
    const next = {
      q: 'AI AR VR XR events',
      location: 'United States',
    };
    setFilters(next);
    setAppliedFilters(next);
    handleSearch(next);
  };

  const formatDate = (dateString) => {
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

  const renderStars = (rating) => {
    const num = typeof rating === 'number' ? rating : 0;
    const fullStars = Math.floor(num);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {num > 0 && <span className="text-xs text-gray-500 ml-1">{num}</span>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {appliedFilters.q}
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Discover immersive technology events near <span className="text-[#12a1e2] font-semibold">{appliedFilters.location}</span>
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2 border-2 border-[#12a1e2] text-[#12a1e2] font-bold rounded-full hover:bg-[#12a1e2] hover:text-white transition-all duration-300 shadow-sm"
          >
            Reset Discovery
          </button>
        </div>

        {/* Search Bar (Simplified) */}
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search AI, VR, XR events..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-slate-50 focus:ring-2 focus:ring-[#12a1e2] transition-all outline-none text-slate-700"
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-slate-50 focus:ring-2 focus:ring-[#12a1e2] transition-all outline-none text-slate-700"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={() => handleSearch()}
            className="md:w-32 px-6 py-3 bg-[#12a1e2] text-white font-bold rounded-xl hover:bg-[#0e8cd4] transition-all shadow-lg active:scale-95"
          >
            Search
          </button>
        </div>

        {/* Event Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-[#12a1e2] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-medium">Scanning the globe for the best events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((evt) => (
              <div
                key={evt._id || evt.id}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col border border-slate-100"
                onClick={() => window.open(evt.externalUrl, '_blank')}
              >
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={evt.coverImageUrl || evt.thumbnail || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Online Tag */}
                  {evt.isOnline && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#12a1e2]/90 backdrop-blur-md text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-xl">
                      Live / Virtual
                    </div>
                  )}

                  {/* Source Tag */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-lg">
                    {evt.source || 'Discover'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[12px] font-bold text-[#12a1e2] mb-2 uppercase tracking-loose">
                    {formatDate(evt.startAt)}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#12a1e2] transition-colors">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-600 font-medium truncate">
                      {evt.isOnline ? 'Online Event' : evt.locationName || 'Location pending'}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">By</span>
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">
                        {evt.organizer || 'Verified Host'}
                      </span>
                    </div>
                    {evt.rating > 0 && renderStars(evt.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[40px] shadow-sm border border-slate-100 max-w-2xl mx-auto">
            <div className="text-7xl mb-8 animate-bounce">🌍</div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">No events found in this orbit</h2>
            <p className="text-slate-500 mb-10 text-lg px-8">Our discovery engines are searching. Try broadening your terms or check back later for new XR events.</p>
            <button
              onClick={handleReset}
              className="px-10 py-4 bg-[#12a1e2] text-white font-black rounded-2xl hover:bg-[#0e8cd4] shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Reset Discovery
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
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
