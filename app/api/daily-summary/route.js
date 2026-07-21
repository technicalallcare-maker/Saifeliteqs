// ─── DAILY SUMMARY EMAIL ───
// Triggered by Vercel Cron every night at 11 PM Dubai time
// Compiles all visitor data from Redis and sends email via Resend

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

export async function GET(request) {
  try {
    // Verify cron secret (optional security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 });
    }

    // Get today's Dubai date
    const now = new Date();
    const dubaiDate = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' });
    const dubaiDateFormatted = now.toLocaleDateString('en-AE', {
      timeZone: 'Asia/Dubai',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Fetch today's data from Redis
    const redisKey = `tracking:${dubaiDate}`;
    const todayData = await redisGet(redisKey);

    const visits = todayData?.visits || [];
    const uniqueVisitors = todayData?.uniqueVisitors || [];
    const totalViews = visits.length;
    const totalUnique = uniqueVisitors.length;

    // ─── COMPILE STATS ───

    // Page views breakdown
    const pageViews = {};
    visits.forEach(v => {
      const page = v.page || '/';
      pageViews[page] = (pageViews[page] || 0) + 1;
    });

    // Device breakdown
    const devices = {};
    visits.forEach(v => {
      devices[v.device] = (devices[v.device] || 0) + 1;
    });

    // Browser breakdown
    const browsers = {};
    visits.forEach(v => {
      browsers[v.browser] = (browsers[v.browser] || 0) + 1;
    });

    // Source/Referrer breakdown
    const sources = {};
    visits.forEach(v => {
      sources[v.source] = (sources[v.source] || 0) + 1;
    });

    // Country breakdown
    const countries = {};
    visits.forEach(v => {
      const loc = v.city !== 'Unknown' ? `${v.city}, ${v.country}` : v.country;
      countries[loc] = (countries[loc] || 0) + 1;
    });

    // Peak hours
    const hours = {};
    visits.forEach(v => {
      const hour = v.time?.split(':')[0] || '00';
      hours[hour] = (hours[hour] || 0) + 1;
    });

    // Chat sessions today
    const chatSessions = await redisGet('sessions:index');
    const todayChats = Array.isArray(chatSessions)
      ? chatSessions.filter(s => s?.startedAt?.startsWith(dubaiDate)).length
      : 0;

    // ─── BUILD HTML ───
    const buildTable = (data, label1, label2) => {
      const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
      if (sorted.length === 0) return '<p style="color:#999;font-size:13px;">No data</p>';
      return `<table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:#f0efec;">
          <td style="padding:8px 12px;font-weight:600;color:#666;">${label1}</td>
          <td style="padding:8px 12px;font-weight:600;color:#666;text-align:right;">${label2}</td>
        </tr>
        ${sorted.map(([key, val]) => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;">${escapeHtml(key)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;text-align:right;font-weight:600;">${val}</td>
          </tr>
        `).join('')}
      </table>`;
    };

    const htmlBody = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
        
        <!-- HEADER -->
        <div style="background:linear-gradient(135deg,#1a1f2e,#252b3a);padding:28px;text-align:center;">
          <h1 style="color:#d4aa40;font-size:22px;margin:0;">📊 Daily Website Report</h1>
          <p style="color:rgba(255,255,255,.6);font-size:13px;margin:8px 0 0;">${dubaiDateFormatted}</p>
          <p style="color:rgba(255,255,255,.4);font-size:11px;margin:4px 0 0;">Saif Elite QS — saifeliteqs.com</p>
        </div>

        <!-- QUICK STATS -->
        <div style="display:flex;padding:20px 24px;gap:12px;background:#f7f6f3;">
          <div style="flex:1;text-align:center;background:#fff;padding:16px;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,.06);">
            <div style="font-size:28px;font-weight:700;color:#b8912a;">${totalUnique}</div>
            <div style="font-size:11px;color:#888;margin-top:4px;">Unique Visitors</div>
          </div>
          <div style="flex:1;text-align:center;background:#fff;padding:16px;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,.06);">
            <div style="font-size:28px;font-weight:700;color:#1a1f2e;">${totalViews}</div>
            <div style="font-size:11px;color:#888;margin-top:4px;">Page Views</div>
          </div>
          <div style="flex:1;text-align:center;background:#fff;padding:16px;border-radius:10px;box-shadow:0 1px 4px rgba(0,0,0,.06);">
            <div style="font-size:28px;font-weight:700;color:#48bb78;">${todayChats}</div>
            <div style="font-size:11px;color:#888;margin-top:4px;">Chat Sessions</div>
          </div>
        </div>

        <div style="padding:24px;">
        
          <!-- PAGES -->
          <h3 style="font-size:14px;color:#1a1f2e;margin:0 0 10px;padding-bottom:6px;border-bottom:2px solid #d4aa40;">📄 Pages Visited</h3>
          ${buildTable(pageViews, 'Page', 'Views')}

          <!-- SOURCES -->
          <h3 style="font-size:14px;color:#1a1f2e;margin:24px 0 10px;padding-bottom:6px;border-bottom:2px solid #d4aa40;">🔗 Traffic Sources</h3>
          ${buildTable(sources, 'Source', 'Visits')}

          <!-- DEVICES -->
          <h3 style="font-size:14px;color:#1a1f2e;margin:24px 0 10px;padding-bottom:6px;border-bottom:2px solid #d4aa40;">📱 Devices</h3>
          ${buildTable(devices, 'Device', 'Count')}

          <!-- BROWSERS -->
          <h3 style="font-size:14px;color:#1a1f2e;margin:24px 0 10px;padding-bottom:6px;border-bottom:2px solid #d4aa40;">🌐 Browsers</h3>
          ${buildTable(browsers, 'Browser', 'Count')}

          <!-- LOCATIONS -->
          <h3 style="font-size:14px;color:#1a1f2e;margin:24px 0 10px;padding-bottom:6px;border-bottom:2px solid #d4aa40;">📍 Locations</h3>
          ${buildTable(countries, 'Location', 'Visits')}

          <!-- PEAK HOURS -->
          <h3 style="font-size:14px;color:#1a1f2e;margin:24px 0 10px;padding-bottom:6px;border-bottom:2px solid #d4aa40;">⏰ Peak Hours (Dubai Time)</h3>
          ${buildTable(
            Object.fromEntries(
              Object.entries(hours).sort((a, b) => a[0] - b[0]).map(([h, c]) => [`${h}:00 - ${h}:59`, c])
            ),
            'Hour',
            'Visits'
          )}

        </div>

        <!-- FOOTER -->
        <div style="background:#f7f6f3;padding:16px;text-align:center;font-size:11px;color:#aaa;">
          Saif Elite QS — Automated Daily Report · saifeliteqs.com
        </div>
      </div>
    `;

    // ─── SEND EMAIL ───
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Saif Elite QS Reports <noreply@saifeliteqs.com>',
        to: ['info@saifeliteqs.com'],
        subject: `📊 Daily Report — ${dubaiDate} — ${totalUnique} visitors, ${totalViews} views`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend error:', errText);
      return Response.json({ error: 'Email failed' }, { status: 500 });
    }

    const data = await res.json();
    return Response.json({ success: true, id: data.id, stats: { totalViews, totalUnique, todayChats } });
  } catch (error) {
    console.error('Daily summary error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
