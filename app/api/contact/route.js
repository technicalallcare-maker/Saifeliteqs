// ─── CONTACT FORM API ───
// Receives form submission and sends email to info@saifeliteqs.com via Resend

export async function POST(request) {
  try {
    const body = await request.json();
    const { fn, ln, email, phone, svc, msg } = body;

    // Validation
    if (!fn || !email || !msg) {
      return Response.json({ error: 'Please fill all required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return Response.json({ error: 'Email not configured' }, { status: 500 });
    }

    const timestamp = new Date().toLocaleString('en-AE', {
      timeZone: 'Asia/Dubai',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const fullName = ln ? `${fn} ${ln}` : fn;

    const htmlBody = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
        
        <!-- HEADER -->
        <div style="background:linear-gradient(135deg,#1a1f2e,#252b3a);padding:24px;text-align:center;">
          <h1 style="color:#d4aa40;font-size:20px;margin:0;">📩 New Enquiry Received</h1>
          <p style="color:rgba(255,255,255,.6);font-size:13px;margin:6px 0 0;">Saif Elite QS — Contact Form</p>
        </div>

        <!-- DETAILS -->
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;color:#888;width:140px;vertical-align:top;">👤 Name</td>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;font-weight:600;">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;color:#888;vertical-align:top;">📧 Email</td>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;">
                <a href="mailto:${escapeHtml(email)}" style="color:#b8912a;font-weight:600;text-decoration:none;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;color:#888;vertical-align:top;">📱 Phone</td>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;font-weight:600;">
                ${phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#b8912a;text-decoration:none;">${escapeHtml(phone)}</a>` : '<span style="color:#ccc;">Not provided</span>'}
              </td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;color:#888;vertical-align:top;">🔧 Service</td>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;font-weight:600;">${svc ? escapeHtml(svc) : '<span style="color:#ccc;">Not selected</span>'}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;color:#888;vertical-align:top;">🕐 Time</td>
              <td style="padding:12px;border-bottom:1px solid #f0f0f0;color:#1a1f2e;">${timestamp} (Dubai)</td>
            </tr>
          </table>

          <!-- MESSAGE -->
          <h3 style="font-size:15px;color:#1a1f2e;margin:20px 0 10px;padding-bottom:8px;border-bottom:2px solid #d4aa40;">💬 Project Details</h3>
          <div style="background:#f7f6f3;padding:16px;border-radius:8px;font-size:14px;line-height:1.7;color:#333;">
            ${escapeHtml(msg).replace(/\n/g, '<br>')}
          </div>

          <!-- QUICK ACTIONS -->
          <div style="margin-top:20px;display:flex;gap:10px;">
            <a href="mailto:${escapeHtml(email)}?subject=Re: Your Enquiry — Saif Elite QS&body=Dear ${escapeHtml(fn)},%0A%0AThank you for contacting Saif Elite QS.%0A%0A" 
               style="display:inline-block;background:#b8912a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">
              ↩ Reply to ${escapeHtml(fn)}
            </a>
            ${phone ? `<a href="tel:${escapeHtml(phone)}" 
               style="display:inline-block;background:#1a1f2e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">
              📞 Call ${escapeHtml(fn)}
            </a>` : ''}
          </div>
        </div>

        <!-- FOOTER -->
        <div style="background:#f7f6f3;padding:16px;text-align:center;font-size:11px;color:#aaa;">
          Saif Elite QS — Contact Form Notification · saifeliteqs.com
        </div>
      </div>
    `;

    // Send via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Saif Elite QS <noreply@saifeliteqs.com>`,
        to: ['info@saifeliteqs.com'],
        reply_to: email,
        subject: `📩 New Enquiry — ${fullName} ${svc ? `— ${svc}` : ''}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend error:', errText);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }

    const data = await res.json();
    return Response.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Contact form error:', error);
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
