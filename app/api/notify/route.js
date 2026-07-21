export async function POST(request) {
  try {
    // sendBeacon sends as text/plain, so handle both
    let body;
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const text = await request.text();
      body = JSON.parse(text);
    }
    const { type, sessionId, messages, userInfo } = body;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return Response.json({ error: 'Email not configured' }, { status: 500 });
    }

    const toEmail = 'info@saifeliteqs.com';
    const fromEmail = 'onboarding@resend.dev'; // Change to noreply@saifeliteqs.com after domain verification

    let subject = '';
    let htmlBody = '';

    const timestamp = new Date().toLocaleString('en-AE', {
      timeZone: 'Asia/Dubai',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    // ─── NEW CHAT STARTED ───
    if (type === 'new_chat') {
      const firstMessage = messages?.[0]?.content || 'N/A';

      subject = `🟢 New Chat Started — ${sessionId?.slice(0, 16)}`;
      htmlBody = `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
          <div style="background:linear-gradient(135deg,#1a1f2e,#252b3a);padding:24px;text-align:center;">
            <h1 style="color:#d4aa40;font-size:20px;margin:0;">🟢 New Chat Started</h1>
            <p style="color:rgba(255,255,255,.6);font-size:13px;margin:6px 0 0;">Saif Elite QS — Website Chatbot</p>
          </div>
          <div style="padding:24px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#888;width:140px;">Session ID</td>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;font-weight:600;">${sessionId || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#888;">Time (Dubai)</td>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;">${timestamp}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#888;">Page URL</td>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;">${userInfo?.page || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;color:#888;">First Message</td>
                <td style="padding:10px 12px;color:#1a1f2e;font-weight:600;">${escapeHtml(firstMessage)}</td>
              </tr>
            </table>
          </div>
          <div style="background:#f7f6f3;padding:16px;text-align:center;font-size:12px;color:#aaa;">
            Saif Elite QS Chatbot Notification
          </div>
        </div>
      `;
    }

    // ─── CHAT ENDED — FULL CONVERSATION ───
    else if (type === 'chat_end') {
      const msgCount = messages?.length || 0;
      const userMsgCount = messages?.filter(m => m.role === 'user').length || 0;

      // Build conversation HTML
      let conversationHtml = '';
      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          if (msg.role === 'user' || msg.role === 'assistant') {
            const isUser = msg.role === 'user';
            const bgColor = isUser ? '#b8912a' : '#f0efec';
            const textColor = isUser ? '#fff' : '#1a1f2e';
            const label = isUser ? '👤 Visitor' : '🤖 Bot';
            const align = isUser ? 'right' : 'left';

            conversationHtml += `
              <div style="text-align:${align};margin-bottom:12px;">
                <span style="font-size:11px;color:#999;">${label}</span>
                <div style="display:inline-block;max-width:80%;background:${bgColor};color:${textColor};padding:10px 14px;border-radius:10px;font-size:13px;line-height:1.5;text-align:left;margin-top:3px;">
                  ${escapeHtml(msg.content)}
                </div>
              </div>
            `;
          }
        });
      }

      subject = `🔴 Chat Ended — ${userMsgCount} visitor messages — ${sessionId?.slice(0, 16)}`;
      htmlBody = `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
          <div style="background:linear-gradient(135deg,#1a1f2e,#252b3a);padding:24px;text-align:center;">
            <h1 style="color:#d4aa40;font-size:20px;margin:0;">🔴 Chat Session Ended</h1>
            <p style="color:rgba(255,255,255,.6);font-size:13px;margin:6px 0 0;">Saif Elite QS — Website Chatbot</p>
          </div>
          <div style="padding:24px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#888;width:140px;">Session ID</td>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;font-weight:600;">${sessionId || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#888;">Time (Dubai)</td>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;">${timestamp}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#888;">Total Messages</td>
                <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;">${msgCount} (${userMsgCount} from visitor)</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;color:#888;">Page URL</td>
                <td style="padding:10px 12px;color:#1a1f2e;">${userInfo?.page || 'N/A'}</td>
              </tr>
            </table>

            <h3 style="font-size:15px;color:#1a1f2e;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #d4aa40;">💬 Full Conversation</h3>
            <div style="background:#f7f6f3;padding:16px;border-radius:8px;">
              ${conversationHtml || '<p style="color:#999;font-size:13px;">No messages recorded.</p>'}
            </div>
          </div>
          <div style="background:#f7f6f3;padding:16px;text-align:center;font-size:12px;color:#aaa;">
            Saif Elite QS Chatbot Notification
          </div>
        </div>
      `;
    } else {
      return Response.json({ error: 'Invalid notification type' }, { status: 400 });
    }

    // ─── SEND VIA RESEND ───
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Saif Elite QS Bot <${fromEmail}>`,
        to: [toEmail],
        subject,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend error:', errText);
      return Response.json({ error: 'Email send failed' }, { status: 500 });
    }

    const data = await res.json();
    return Response.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Notify error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
