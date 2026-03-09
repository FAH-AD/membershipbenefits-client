import axios from 'axios';

const SERPAPI_BASE = 'https://serpapi.com/search';
const API_KEY = 'eddd7716c5ff217135520ba4e38077fd387cd8a060545b705247669ea7112434';

const stableId = (link, title, index) => {
    const str = link || title || String(index);
    // Simple hash for frontend (could use a small lib, but a simple string-based hash is fine for dedupe)
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return `serpapi-${index}-${Math.abs(hash).toString(16)}`;
};

export const normalizeSerpApiEvent = (evt, index) => {
    const venueName = evt.venue?.name || '';
    const addressLines = Array.isArray(evt.address) ? evt.address : [];
    const lastLine = addressLines[addressLines.length - 1] || '';
    const hasCityCountry = lastLine.includes(',') && addressLines.length >= 2;
    const city = hasCityCountry ? lastLine.split(',')[0].trim() : '';
    const country = hasCityCountry ? lastLine.split(',').pop().trim() : '';
    const locationName = addressLines[0] || venueName || (evt.address?.[0] && !venueName ? 'Online' : '');

    const whenStr = evt.date?.when || evt.date?.start_date || '';
    let startAt = new Date().toISOString();
    try {
        const parsed = new Date(whenStr);
        if (!Number.isNaN(parsed.getTime())) startAt = parsed.toISOString();
    } catch (_) { }

    const isOnline =
        /online|virtual|zoom|webinar|hosted by/i.test(evt.title || '') ||
        /online|virtual/i.test(evt.description || '') ||
        (addressLines.length === 1 && /hosted by/i.test(addressLines[0]));

    return {
        id: stableId(evt.link, evt.title, index),
        source: 'serpapi',
        title: evt.title || 'Event',
        description: evt.description || '',
        startAt,
        locationName: locationName || (isOnline ? 'Online' : ''),
        city,
        country,
        coverImageUrl: evt.image || evt.thumbnail,
        externalUrl: evt.link,
        isOnline,
        organizer: venueName || (addressLines[0] && addressLines[0].startsWith('Hosted by') ? addressLines[0].replace(/^Hosted by\s*/i, '') : ''),
        rating: evt.venue?.rating,
        attendees: evt.venue?.reviews || 0,
    };
};

export const searchSerpApiEventsFrontend = async ({
    q,
    location,
    gl = 'us',
    hl = 'en',

    dateChip,
    start = 0,
}) => {
    const query = (q || '').trim() || 'AI and VR events';
    const loc = (location || '').trim();
    const fullQuery = loc ? `${query} in ${loc}` : query;

    const params = {
        engine: 'google_events',
        q: fullQuery,
        api_key: API_KEY,

    };
    if (loc) params.location = loc;

    const chips = [];
    // if (onlineOnly === true) chips.push('event_type:Virtual-Event');
    if (dateChip) chips.push(dateChip);
    if (chips.length) params.htichips = chips.join(',');

    try {
        const { data } = await axios.get(SERPAPI_BASE, { params, timeout: 15000 });

        if (data.error) {
            console.warn('SerpAPI error:', data.error);
            return [];
        }

        const results = data.events_results || [];
        return results.map((evt, i) => normalizeSerpApiEvent(evt, start + i));
    } catch (err) {
        console.warn('SerpAPI search failed:', err.message);
        return [];
    }
};
