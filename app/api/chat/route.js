const SYSTEM_PROMPT = `You are a professional assistant for Saif Elite QS — a Quantity Surveying and Cost Consultancy firm headquartered in Dubai, UAE.

Your role is to help visitors understand our services, answer questions about construction costs, quantity surveying, and guide them to contact us.

KEY INFORMATION ABOUT SAIF ELITE QS:
- Services: Cost Planning & Estimation, Bill of Quantities, Contract Administration, Project Cost Management, Dispute Resolution, Feasibility Studies, Procurement Strategy, Value Engineering
- Standards: Developing under RICS and AIQS guidance
- Locations: Dubai UAE (HQ), UK, Ireland, New Zealand, Australia (Remote QS Services)
- Contact: info@saifeliteqs.com | procurement@saifeliteqs.com | +971 50 505 3679
- Track Record: 10+ years, 200+ projects, AED 2B+ total value managed, 98% client satisfaction
- Clients include: Emaar, Nakheel, DAMAC, Aldar, Meraas, Dubai Properties, Sobha, Majid Al Futtaim

GUIDELINES:
- Always be professional, helpful and concise
- For specific project quotes, always direct them to contact us
- Answer general QS/construction cost questions confidently
- Keep responses brief (2-4 sentences max) unless detailed explanation is needed
- Respond in the same language the user writes in (English or Arabic)`;

async function redisSet(key, value) {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    if (!url || !token) return;
    await fetch(`${url}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: JSON.stringify(value), ex: 2592000 }),
    });
  } catch (e) { console.error('Redis set error:', e); }
}

async function redisGet(key) {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;
    if (!url || !token) return null;
    const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.result ? JSON.parse(data.result) : null;
  } catch (e) { console.error('Redis get error:', e); return null; }
}

export async function POST(request) {
  try {
    const { message, sessionId, history } = await request.json();
    if (!message || !sessionId) return Response.json({ error: 'Missing fields' }, { status: 400 });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return Response.json({ error: 'API key not configured' }, { status: 500 });

    const contents = [];
    if (history && history.length > 0) {
      history.slice(-10).forEach(msg => {
        contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.content }] });
      });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
        })
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error('Gemini error:', err);
      return Response.json({ error: 'AI error' }, { status: 500 });
    }

    const geminiData = await geminiRes.json();
    const aiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiReply) return Response.json({ error: 'No AI response' }, { status: 500 });

    // Save chat history
    const existing = await redisGet(`chat:${sessionId}`) || [];
    await redisSet(`chat:${sessionId}`, [
      ...existing,
      { role: 'user', content: message, timestamp: new Date().toISOString() },
      { role: 'assistant', content: aiReply, timestamp: new Date().toISOString() }
    ]);

    // Save session index
    const sessions = await redisGet('sessions:index') || [];
    if (!sessions.find(s => s.id === sessionId)) {
      sessions.unshift({ id: sessionId, startedAt: new Date().toISOString(), firstMessage: message.slice(0, 60) });
      await redisSet('sessions:index', sessions.slice(0, 500));
    }

    return Response.json({ reply: aiReply });
  } catch (error) {
    console.error('Chat error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
