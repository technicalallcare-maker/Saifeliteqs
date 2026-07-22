// ─── VISITOR TRACKING API ───

async function redisGet(key) {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    if (!url || !token) { console.error('Redis credentials missing'); return null; }
    const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data || !data.result) return null;
    try { return JSON.parse(data.result); } catch { return null; }
  } catch (e) { console.error('Redis get error:', e); return null; }
}

async function redisSet(key, value) {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    if (!url || !token) { console.error('Redis credentials missing'); return; }
    await fetch(`${url}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: JSON.stringify(value), ex: 2592000 }),
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

    // Get Dubai date & time
    const now = new Date();
    const dubaiDate = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' });
    const dubaiTime = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' });

    // Device
    const device = (screenWidth && screenWidth < 768) ? 'Mobile' : 'Desktop';

    // Location from Vercel headers
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = request.headers.get('x-vercel-ip-city') || 'Unknown';

    // Browser
    const ua = request.headers.get('user-agent') || '';
    let browser = 'Other';
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edg')) browser = 'Edge';

    // Traffic source
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

    // Save to Redis
    const redisKey = `tracking:${dubaiDate}`;
    const existing = await redisGet(redisKey);
    const todayData = existing || { visits: [], uniqueVisitors: [] };

    todayData.visits.push(visit);

    if (visitorId && !todayData.uniqueVisitors.includes(visitorId)) {
      todayData.uniqueVisitors.push(visitorId);
    }

    await redisSet(redisKey, todayData);

    console.log(`Tracked: ${page} | ${device} | ${browser} | ${source} | ${city}, ${country}`);

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Track error:', error);
    return Response.json({ error: 'Track failed' }, { status: 500 });
  }
}
