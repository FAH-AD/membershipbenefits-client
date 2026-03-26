import axios from 'axios';

const API_BASE = 'https://membershiptbenefits-server-1.onrender.com/api/events';

/**
 * Searches events via our backend discovery system.
 */
export const searchEvents = async (params) => {
    try {
        const { data } = await axios.get(`${API_BASE}/search`, { params });
        return data.success ? data.data : [];
    } catch (err) {
        console.error('Error searching events:', err.message);
        throw err;
    }
};

/**
 * Fetches events from Real-Time Events Search API.
 */
export const fetchRealTimeEvents = async (query, location, date = 'any') => {
    const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
    const RAPIDAPI_HOST = 'real-time-events-search.p.rapidapi.com';

    if (!RAPIDAPI_KEY) {
        console.error('VITE_RAPIDAPI_KEY is missing in .env');
        return [];
    }

    const headers = {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.request({
            method: 'GET',
            url: `https://${RAPIDAPI_HOST}/search-events`,
            params: {
                query: `${query} in ${location}`,
                date,
                is_virtual: 'false',
                start: '0'
            },
            headers
        });

        const events = response.data?.data || [];

        return events.map(evt => ({
            title: evt.name || evt.title || 'No Title',
            start_date: evt.start_time || evt.start_at || null,
            end_date: evt.end_time || evt.end_at || null,
            location: evt.venue?.name || evt.location || 'Location TBD',
            organizer: evt.organizer?.name || 'Verified Host',
            description: evt.description || evt.summary || '',
            price: evt.price || 'See Tickets',
            image_url: evt.image || evt.thumbnail || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
            event_url: evt.link || evt.url || evt.event_link || '#',
            tags: evt.tags || [],
            detail_error: false
        })).sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

    } catch (err) {
        console.error('Real-Time Events Search error:', err.message);
        return [];
    }
};

/**
 * Fetches events from Eventbrite-API4.
 */
export const fetchEventbriteAPI4Events = async (query, location) => {
    const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
    const RAPIDAPI_HOST = 'eventbrite-api4.p.rapidapi.com';

    if (!RAPIDAPI_KEY) {
        console.error('VITE_RAPIDAPI_KEY is missing in .env');
        return [];
    }

    // Rough parsing of "City, State"
    let city = location;
    let state = 'GA'; // Default state as per user example if not provided
    if (location.includes(',')) {
        const parts = location.split(',');
        city = parts[0].trim();
        state = parts[1].trim();
    }

    const headers = {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.request({
            method: 'GET',
            url: `https://${RAPIDAPI_HOST}/search_bycat`,
            params: {
                city: city.toLowerCase(),
                state: state.toLowerCase(),
                page: '1',
                selected_date: 'Do_Not_Include',
                category: query || 'Business',
                selected_languages: 'Do_Not_Include',
                currency: 'Do_Not_Include',
                format: 'Do_Not_Include',
                price: 'Do_Not_Include'
            },
            headers
        });

        // The API returns events in a results array or directly in data
        const events = response.data?.results || response.data || [];

        return (Array.isArray(events) ? events : []).map(evt => ({
            title: evt.title || evt.name || 'No Title',
            start_date: evt.start_date || evt.start_at || null,
            end_date: evt.end_date || evt.end_at || null,
            location: evt.location || evt.venue || `${city}, ${state}`,
            organizer: evt.organizer || 'Eventbrite Host',
            description: evt.description || evt.summary || '',
            price: evt.price || 'Check Tickets',
            image_url: evt.image || evt.thumbnail || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
            event_url: evt.url || evt.link || '#',
            tags: evt.tags || [],
            source: 'Eventbrite',
            detail_error: false
        }));

    } catch (err) {
        console.error('Eventbrite-API4 error:', err.message);
        return [];
    }
};

/**
 * Aggregates results from both Event Discovery APIs.
 */
export const fetchAllEvents = async (query, location) => {
    try {
        const [res1, res2] = await Promise.allSettled([
            fetchRealTimeEvents(query, location),
            fetchEventbriteAPI4Events(query, location)
        ]);

        const events1 = res1.status === 'fulfilled' ? res1.value : [];
        const events2 = res2.status === 'fulfilled' ? res2.value : [];

        // Combine and mark sources
        const combined = [
            ...events1.map(e => ({ ...e, source: 'Real-Time Search' })),
            ...events2
        ];

        // Deduplicate with multi-layered strategy
        const seenUrls = new Set();
        const seenEvents = new Set(); // Key: normalizedTitle|startDate

        const unique = combined.filter(evt => {
            // 1. URL Normalization (Primary)
            let url = evt.event_url || evt.url || '#';
            try {
                if (url !== '#') {
                    const u = new URL(url);
                    url = u.origin + u.pathname; // Strip query params
                }
            } catch (e) { }

            // 2. Title + Date Normalization (Secondary)
            const title = (evt.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const date = evt.start_date ? new Date(evt.start_date).getTime() : 'nodate';
            const eventKey = `${title}|${date}`;

            if (url !== '#' && seenUrls.has(url)) return false;
            if (seenEvents.has(eventKey)) return false;

            if (url !== '#') seenUrls.add(url);
            seenEvents.add(eventKey);
            return true;
        });

        // Final sort by date
        return unique.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

    } catch (err) {
        console.error('Aggregator error:', err.message);
        return [];
    }
};

/**
 * Manually triggers discovery (Admin/Maintenance).
 */
export const triggerDiscovery = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const { data } = await axios.get(`${API_BASE}/maintenance?action=discovery`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data;
    } catch (err) {
        console.error('Error triggering discovery:', err.message);
        throw err;
    }
};
