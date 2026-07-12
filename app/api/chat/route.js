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
    if (!data || !data.result) return null;
    try {
      const parsed = JSON.parse(data.result);
      return parsed;
    } catch {
      return null;
    }
  } catch (e) { 
    console.error('Redis get error:', e); 
    return null; 
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const message = body?.message;
    const sessionId = body?.sessionId;
    const history = body?.history;
    
    if (!message || !sessionId) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Build messages array safely
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
    
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (let i = 0; i < recentHistory.length; i++) {
        const msg = recentHistory[i];
        if (msg && typeof msg === 'object' && msg.role && msg.content) {
          messages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: String(msg.content)
          });
        }
      }
    }
    
    messages.push({ role: 'user', content: String(message) });

    // Call Groq API
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Groq API error:', errText);
      return Response.json({ error: 'AI service error' }, { status: 500 });
    }

    const data = await res.json();
    const aiReply = data?.choices?.[0]?.message?.content;
    
    if (!aiReply) {
      return Response.json({ error: 'No AI response' }, { status: 500 });
    }

    // Save chat history to Redis (with safe fallback)
    try {
      const existingRaw = await redisGet(`chat:${sessionId}`);
      const existing = Array.isArray(existingRaw) ? existingRaw : [];
      const newHistory = [
        ...existing,
        { role: 'user', content: message, timestamp: new Date().toISOString() },
        { role: 'assistant', content: aiReply, timestamp: new Date().toISOString() }
      ];
      await redisSet(`chat:${sessionId}`, newHistory);

      const sessionsRaw = await redisGet('sessions:index');
      const sessions = Array.isArray(sessionsRaw) ? sessionsRaw : [];
      const exists = sessions.some(s => s && s.id === sessionId);
      if (!exists) {
        sessions.unshift({
          id: sessionId,
          startedAt: new Date().toISOString(),
          firstMessage: String(message).slice(0, 60)
        });
        await redisSet('sessions:index', sessions.slice(0, 500));
      }
    } catch (redisErr) {
      console.error('Redis save failed (non-critical):', redisErr);
    }

    return Response.json({ reply: aiReply });
    
  } catch (error) {
    console.error('Chat error:', error);
    return Response.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}
