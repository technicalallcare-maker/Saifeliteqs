const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'saifqs2025';

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
  } catch (e) { return null; }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    if (password !== ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const sessions = await redisGet('sessions:index') || [];
    const chats = await Promise.all(
      sessions.slice(0, 50).map(async (session) => {
        const messages = await redisGet(`chat:${session.id}`) || [];
        return { ...session, messageCount: messages.length, messages };
      })
    );

    return Response.json({ total: sessions.length, chats });
  } catch (error) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
