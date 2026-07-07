import { kv } from '@vercel/kv';

const SYSTEM_PROMPT = `You are a professional assistant for Saif Elite QS — a Quantity Surveying and Cost Consultancy firm headquartered in Dubai, UAE.

Your role is to help visitors understand our services, answer questions about construction costs, quantity surveying, and guide them to contact us.

KEY INFORMATION ABOUT SAIF ELITE QS:
- Services: Cost Planning & Estimation, Bill of Quantities, Contract Administration, Project Cost Management, Dispute Resolution, Feasibility Studies, Procurement Strategy, Value Engineering
- Standards: Developing under RICS (Royal Institution of Chartered Surveyors) and AIQS (Australian Institute of Quantity Surveyors) guidance
- Locations: Dubai UAE (HQ), UK, Ireland, New Zealand, Australia (Remote QS Services)
- Contact: info@saifeliteqs.com | procurement@saifeliteqs.com | +971 50 505 3679
- Track Record: 10+ years, 200+ projects, AED 2B+ total value managed, 98% client satisfaction
- Clients include: Emaar, Nakheel, DAMAC, Aldar, Meraas, Dubai Properties, Sobha, Majid Al Futtaim

GUIDELINES:
- Always be professional, helpful and concise
- For specific project quotes, always direct them to contact us
- Answer general QS/construction cost questions confidently
- If asked about pricing, explain that costs vary by project and invite them to get a free consultation
- Never make up specific numbers or commitments
- Keep responses brief (2-4 sentences max) unless detailed explanation is needed
- Always end with an invitation to contact us if they need more help
- Respond in the same language the user writes in (English or Arabic)`;

export async function POST(request) {
  try {
    const { message, sessionId, history } = await request.json();

    if (!message || !sessionId) {
      return Response.json({ error: 'Missing message or sessionId' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Build conversation history for Gemini
    const contents = [];
    
    // Add history
    if (history && history.length > 0) {
      history.slice(-10).forEach(msg => { // last 10 messages only
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      });
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Gemini API
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error('Gemini error:', err);
      return Response.json({ error: 'AI service error' }, { status: 500 });
    }

    const geminiData = await geminiRes.json();
    const aiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiReply) {
      return Response.json({ error: 'No response from AI' }, { status: 500 });
    }

    // Save to Vercel KV
    try {
      const chatKey = `chat:${sessionId}`;
      const existing = await kv.get(chatKey) || [];
      
      const updatedHistory = [
        ...existing,
        {
          role: 'user',
          content: message,
          timestamp: new Date().toISOString()
        },
        {
          role: 'assistant',
          content: aiReply,
          timestamp: new Date().toISOString()
        }
      ];

      // Save with 30 day expiry
      await kv.set(chatKey, updatedHistory, { ex: 60 * 60 * 24 * 30 });

      // Also save session to index
      const sessionsKey = 'sessions:index';
      const sessions = await kv.get(sessionsKey) || [];
      if (!sessions.find(s => s.id === sessionId)) {
        sessions.unshift({
          id: sessionId,
          startedAt: new Date().toISOString(),
          firstMessage: message.slice(0, 60)
        });
        // Keep last 500 sessions
        await kv.set(sessionsKey, sessions.slice(0, 500));
      }
    } catch (kvErr) {
      console.error('KV save error:', kvErr);
      // Don't fail the request if KV fails
    }

    return Response.json({ reply: aiReply });

  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
