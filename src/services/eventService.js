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
