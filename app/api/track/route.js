// ─── VISITOR TRACKING API ───
// Saves every page visit to Redis (grouped by date)

async function redisGet(key) {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    if (!url || !token) return null;
    const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data || !data.result) return null;
    try { return JSON.parse(data.result); } catch { return null; }
  } catch (e) { console.error('Redis get error:', e); return null; }
}

async function redisSet(key, value, expireSeconds = 2592000) {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    if (!url || !token) return;
    await fetch(`${url}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: JSON.stringify(value), ex: expireSeconds }),
    });
  } catch (e) { console.error('Redis set error:', e); }
}

export async function POST(request) {
  try {
    let body;
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const text = await request.text();
      body = JSON.parse(text);
    }

    const { page, referrer, visitorId, screenWidth, language } = body;

    // Get Dubai date
    const now = new Date();
    const dubaiDate = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' }); // YYYY-MM-DD
    const dubaiTime = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' });

    // Detect device from screen width
    const device = (screenWidth && screenWidth < 768) ? 'Mobile' : 'Desktop';

    // Get visitor's IP-based info from headers
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Unknown';
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = request.headers.get('x-vercel-ip-city') || 'Unknown';

    // Detect browser from user-agent
    const ua = request.headers.get('user-agent') || '';
    let browser = 'Other';
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edg')) browser = 'Edge';

    // Clean referrer
    let source = 'Direct';
    if (referrer) {
      try {
        const refUrl = new URL(referrer);
        const host = refUrl.hostname.toLowerCase();
        if (host.includes('google')) source = 'Google Search';
        else if (host.includes('instagram')) source = 'Instagram';
        else if (host.includes('facebook') || host.includes('fb.')) source = 'Facebook';
        else if (host.includes('linkedin')) source = 'LinkedIn';
        else if (host.includes('twitter') || host.includes('x.com')) source = 'Twitter/X';
        else if (host.includes('tiktok')) source = 'TikTok';
        else if (!host.includes('saifeliteqs')) source = refUrl.hostname;
      } catch { source = 'Direct'; }
    }

    // Build visit record
    const visit = {
      page: page || '/',
      time: dubaiTime,
      visitorId: visitorId || 'unknown',
      device,
      browser,
      source,
      country,
      city,
      language: language || 'Unknown',
    };

    // Save to Redis — append to today's visits
    const redisKey = `tracking:${dubaiDate}`;
    const existing = await redisGet(redisKey);
    const todayData = existing || { visits: [], uniqueVisitors: [] };

    todayData.visits.push(visit);

    // Track unique visitors
    if (visitorId && !todayData.uniqueVisitors.includes(visitorId)) {
      todayData.uniqueVisitors.push(visitorId);
    }

    await redisSet(redisKey, todayData, 2592000); // 30 days expiry

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Track error:', error);
    return Response.json({ error: 'Track failed' }, { status: 500 });
  }
}
