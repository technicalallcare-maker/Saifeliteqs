import { kv } from '@vercel/kv';

// Simple password protection - change this password!
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'saifqs2025';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    const sessionId = searchParams.get('sessionId');

    // Password check
    if (password !== ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get specific session
    if (sessionId) {
      const chatKey = `chat:${sessionId}`;
      const messages = await kv.get(chatKey) || [];
      return Response.json({ sessionId, messages });
    }

    // Get all sessions index
    const sessions = await kv.get('sessions:index') || [];
    
    // Get full chat for each session (limit to 50 most recent)
    const recentSessions = sessions.slice(0, 50);
    const fullChats = await Promise.all(
      recentSessions.map(async (session) => {
        const messages = await kv.get(`chat:${session.id}`) || [];
        return {
          ...session,
          messageCount: messages.length,
          messages,
          lastMessage: messages[messages.length - 1]?.timestamp || session.startedAt
        };
      })
    );

    return Response.json({
      total: sessions.length,
      chats: fullChats
    });

  } catch (error) {
    console.error('Get chats error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
