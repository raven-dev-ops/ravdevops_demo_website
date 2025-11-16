// netlify/functions/create-calendly-link.js
// Creates a Calendly scheduling link based on preferred meeting type using CALENDY_TOKEN

const https = require('https');

const API_HOST = 'api.calendly.com';

// Explicit mapping for meeting types to Calendly URLs. Environment variables take precedence.
const EXPLICIT_MAP = {
  zoom: process.env.CALENDY_URL_ZOOM || process.env.CALENDLY_URL_ZOOM || null,
  teams: process.env.CALENDY_URL_TEAMS || process.env.CALENDLY_URL_TEAMS || null,
  google: process.env.CALENDY_URL_GOOGLE || process.env.CALENDLY_URL_GOOGLE || null,
  phone: process.env.CALENDY_URL_PHONE || process.env.CALENDLY_URL_PHONE || null,
};
const DEFAULT_URL =
  process.env.CALENDY_URL_DEFAULT ||
  process.env.CALENDLY_URL_DEFAULT ||
  'https://calendly.com/ravendevops';

function apiRequest(method, path, token, body) {
  const payload = body ? JSON.stringify(body) : null;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  if (payload) headers['Content-Length'] = Buffer.byteLength(payload);

  const options = { method, hostname: API_HOST, path, headers };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject({ status: res.statusCode, body: parsed });
          }
        } catch (e) {
          reject({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', (err) => reject({ status: 500, body: err }));
    if (payload) req.write(payload);
    req.end();
  });
}

const allowCors = (resp) => ({
  statusCode: resp.statusCode || 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
  body: JSON.stringify(resp.body || {}),
});

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return allowCors({ statusCode: 200, body: {} });
  }

  if (event.httpMethod !== 'POST') {
    return allowCors({ statusCode: 405, body: { error: 'Method Not Allowed' } });
  }

  let payload = {};
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch (_) {}

  const meetingType = String(payload.meetingType || '').toLowerCase();

  // If there is an explicit mapping for the requested meeting type, return it immediately
  if (meetingType && EXPLICIT_MAP[meetingType]) {
    return allowCors({ statusCode: 200, body: { url: EXPLICIT_MAP[meetingType] } });
  }

  // Fall back to default URL if no API token is configured
  const token = process.env.CALENDY_TOKEN || process.env.CALENDLY_TOKEN;
  if (!token) {
    return allowCors({ statusCode: 200, body: { url: DEFAULT_URL } });
  }

  try {
    // Get user info
    const me = await apiRequest('GET', '/users/me', token);
    const user = me.resource || me.data || me; // defensive
    const userUri = user.uri;
    const userSchedulingUrl = user.scheduling_url;

    // Try to find an event type that matches the desired meeting type
    let eventTypeUrl = null;
    let eventTypeUri = null;
    try {
      const list = await apiRequest(
        'GET',
        `/event_types?user=${encodeURIComponent(userUri)}&active=true`,
        token
      );
      const collection = list.collection || list.data || [];

      const byName = (t) => (t.name || '').toLowerCase();
      const hasAny = (name, arr) => arr.some((kw) => name.includes(kw));
      const typeKeywords = {
        zoom: ['zoom'],
        teams: ['teams', 'microsoft'],
        google: ['google', 'meet', 'gmeet'],
        phone: ['phone', 'call'],
      };

      const keywords = typeKeywords[meetingType] || [];

      // Prefer items containing consult/consultation if possible
      let match = collection.find(
        (t) => hasAny(byName(t), keywords) && hasAny(byName(t), ['consult', 'consultation'])
      );
      if (!match) {
        match = collection.find((t) => hasAny(byName(t), keywords));
      }
      if (match) {
        eventTypeUrl = match.scheduling_url || null;
        eventTypeUri = match.uri || null;
      }
    } catch (e) {
      // ignore and fallback to user scheduling url
    }

    // If we have the direct scheduling_url for the event type, prefer it.
    let schedulingUrl = eventTypeUrl || userSchedulingUrl || DEFAULT_URL;

    // Optionally generate an ephemeral scheduling link when we have an event type uri
    if (eventTypeUri) {
      try {
        const link = await apiRequest('POST', '/scheduling_links', token, {
          owner: eventTypeUri,
          max_event_count: 1,
        });
        if (link && link.resource && link.resource.scheduling_url) {
          schedulingUrl = link.resource.scheduling_url;
        }
      } catch (_) {
        // fall back to schedulingUrl already set
      }
    }

    return allowCors({ statusCode: 200, body: { url: schedulingUrl } });
  } catch (err) {
    return allowCors({
      statusCode: 500,
      body: { error: 'Calendly API error', details: err && err.body ? err.body : String(err) },
    });
  }
};
