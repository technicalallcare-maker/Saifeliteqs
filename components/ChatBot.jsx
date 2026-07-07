'use client';
import { useState, useEffect, useRef } from 'react';

const BOT_NAME = 'Saif Elite QS Assistant';
const WELCOME_MSG = "Hello! I'm the Saif Elite QS virtual assistant. How can I help you today? You can ask me about our quantity surveying services, cost planning, or anything related to your construction project.";

const QUICK_QUESTIONS = [
  'What services do you offer?',
  'How do I get a quote?',
  'Where are you located?',
  'What is a Bill of Quantities?',
];

function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME_MSG, id: 'welcome' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('chatSessionId');
      if (stored) return stored;
      const newId = generateSessionId();
      sessionStorage.setItem('chatSessionId', newId);
      return newId;
    }
    return generateSessionId();
  });
  const [showBubble, setShowBubble] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Show attention bubble after 8 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setShowBubble(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput('');
    const userMsg = { role: 'user', content: userText, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, sessionId, history })
      });

      const data = await res.json();

      if (data.reply) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.reply,
          id: Date.now().toString()
        }]);
        if (!open) setUnread(prev => prev + 1);
      } else {
        throw new Error('No reply');
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us directly at info@saifeliteqs.com',
        id: Date.now().toString(),
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const CSS = `
    .cb-wrap{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;font-family:'Segoe UI',system-ui,sans-serif;}
    
    /* TOGGLE BUTTON */
    .cb-toggle{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#b8912a,#d4aa40);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(184,145,42,.5);transition:all .3s;position:relative;}
    .cb-toggle:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(184,145,42,.6);}
    .cb-toggle svg{transition:all .3s;}
    .cb-badge{position:absolute;top:-4px;right:-4px;width:20px;height:20px;background:#e53e3e;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;color:#fff;}
    
    /* ATTENTION BUBBLE */
    .cb-bubble{position:absolute;bottom:68px;right:0;background:#1a1f2e;color:#fff;padding:.7rem 1rem;border-radius:12px 12px 0 12px;font-size:.8rem;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:bubbleIn .4s ease;cursor:pointer;}
    .cb-bubble::after{content:'';position:absolute;bottom:-8px;right:16px;border:8px solid transparent;border-top-color:#1a1f2e;border-bottom:none;}
    .cb-bubble span{color:#d4aa40;}
    @keyframes bubbleIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}

    /* CHAT WINDOW */
    .cb-window{position:absolute;bottom:70px;right:0;width:360px;height:520px;background:#fff;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.2);display:flex;flex-direction:column;overflow:hidden;animation:windowIn .3s ease;border:1px solid rgba(0,0,0,.08);}
    @keyframes windowIn{from{opacity:0;transform:translateY(16px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);}}
    
    /* HEADER */
    .cb-header{background:linear-gradient(135deg,#1a1f2e 0%,#252b3a 100%);padding:1rem 1.2rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
    .cb-header-info{display:flex;align-items:center;gap:.7rem;}
    .cb-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#b8912a,#d4aa40);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .cb-header-txt h4{font-size:.82rem;font-weight:700;color:#fff;margin:0;letter-spacing:.02em;}
    .cb-header-txt p{font-size:.65rem;color:rgba(255,255,255,.5);margin:0;display:flex;align-items:center;gap:.3rem;}
    .cb-online{width:6px;height:6px;background:#48bb78;border-radius:50%;display:inline-block;}
    .cb-close{background:none;border:none;color:rgba(255,255,255,.5);cursor:pointer;padding:4px;transition:color .2s;display:flex;}
    .cb-close:hover{color:#fff;}

    /* MESSAGES */
    .cb-msgs{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.75rem;background:#f7f6f3;}
    .cb-msgs::-webkit-scrollbar{width:3px}
    .cb-msgs::-webkit-scrollbar-thumb{background:#e2ddd6;border-radius:2px}
    
    .cb-msg{display:flex;gap:.5rem;align-items:flex-end;max-width:88%;}
    .cb-msg.user{flex-direction:row-reverse;margin-left:auto;}
    .cb-msg-avatar{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#b8912a,#d4aa40);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-bottom:2px;}
    .cb-msg-bubble{padding:.65rem .9rem;border-radius:12px;font-size:.82rem;line-height:1.6;word-break:break-word;}
    .cb-msg.bot .cb-msg-bubble{background:#fff;color:#1e1e1e;border-radius:4px 12px 12px 12px;box-shadow:0 1px 4px rgba(0,0,0,.08);}
    .cb-msg.user .cb-msg-bubble{background:linear-gradient(135deg,#b8912a,#d4aa40);color:#fff;border-radius:12px 4px 12px 12px;}
    .cb-msg.error .cb-msg-bubble{background:#fff5f5;color:#c53030;border:1px solid #fed7d7;}
    .cb-msg-time{font-size:.58rem;color:#aaa;margin-top:.2rem;text-align:right;}

    /* TYPING */
    .cb-typing{display:flex;align-items:center;gap:.35rem;padding:.65rem .9rem;background:#fff;border-radius:4px 12px 12px 12px;box-shadow:0 1px 4px rgba(0,0,0,.08);}
    .cb-typing span{width:7px;height:7px;background:#b8912a;border-radius:50%;animation:bounce .9s ease infinite;}
    .cb-typing span:nth-child(2){animation-delay:.15s;}
    .cb-typing span:nth-child(3){animation-delay:.3s;}
    @keyframes bounce{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-6px);}}

    /* QUICK QUESTIONS */
    .cb-quick{padding:.6rem .8rem;background:#fff;border-top:1px solid #e2ddd6;display:flex;gap:.4rem;flex-wrap:wrap;flex-shrink:0;}
    .cb-q-btn{font-size:.68rem;background:transparent;border:1px solid #e2ddd6;color:#444;padding:.3rem .65rem;border-radius:20px;cursor:pointer;font-family:inherit;transition:all .2s;white-space:nowrap;}
    .cb-q-btn:hover{background:#b8912a;border-color:#b8912a;color:#fff;}

    /* INPUT */
    .cb-input-row{padding:.75rem .9rem;background:#fff;border-top:1px solid #e2ddd6;display:flex;gap:.6rem;align-items:flex-end;flex-shrink:0;}
    .cb-input{flex:1;background:#f7f6f3;border:1px solid #e2ddd6;border-radius:20px;padding:.55rem 1rem;font-size:.84rem;font-family:inherit;outline:none;resize:none;max-height:100px;transition:border-color .2s;color:#1e1e1e;line-height:1.4;}
    .cb-input:focus{border-color:#b8912a;}
    .cb-input::placeholder{color:#aaa;}
    .cb-send{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#b8912a,#d4aa40);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;margin-bottom:1px;}
    .cb-send:hover{transform:scale(1.08);}
    .cb-send:disabled{opacity:.5;cursor:not-allowed;transform:none;}

    /* FOOTER */
    .cb-footer{padding:.4rem;background:#fff;text-align:center;flex-shrink:0;}
    .cb-footer p{font-size:.58rem;color:#bbb;}
    .cb-footer a{color:#b8912a;text-decoration:none;}

    @media(max-width:420px){
      .cb-window{width:calc(100vw - 2rem);right:-0.5rem;height:480px;}
    }
  `;

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <style>{CSS}</style>
      <div className="cb-wrap">

        {/* ATTENTION BUBBLE */}
        {showBubble && !open && (
          <div className="cb-bubble" onClick={() => setOpen(true)}>
            👋 Hi! Need help? <span>Ask me anything</span>
          </div>
        )}

        {/* CHAT WINDOW */}
        {open && (
          <div className="cb-window">
            {/* HEADER */}
            <div className="cb-header">
              <div className="cb-header-info">
                <div className="cb-avatar">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div className="cb-header-txt">
                  <h4>{BOT_NAME}</h4>
                  <p><span className="cb-online"/> Online · Replies instantly</p>
                </div>
              </div>
              <button className="cb-close" onClick={() => setOpen(false)}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* MESSAGES */}
            <div className="cb-msgs">
              {messages.map((msg) => (
                <div key={msg.id} className={`cb-msg ${msg.role === 'user' ? 'user' : 'bot'} ${msg.isError ? 'error' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="cb-msg-avatar">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </div>
                  )}
                  <div>
                    <div className="cb-msg-bubble">{msg.content}</div>
                    <div className="cb-msg-time">{now}</div>
                  </div>
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {loading && (
                <div className="cb-msg bot">
                  <div className="cb-msg-avatar">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div className="cb-typing">
                    <span/><span/><span/>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}/>
            </div>

            {/* QUICK QUESTIONS — show only at start */}
            {messages.length <= 2 && (
              <div className="cb-quick">
                {QUICK_QUESTIONS.map(q => (
                  <button key={q} className="cb-q-btn" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* INPUT */}
            <div className="cb-input-row">
              <textarea
                ref={inputRef}
                className="cb-input"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                disabled={loading}
              />
              <button
                className="cb-send"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z"/>
                </svg>
              </button>
            </div>

            {/* FOOTER */}
            <div className="cb-footer">
              <p>Powered by AI · <a href="mailto:info@saifeliteqs.com">info@saifeliteqs.com</a></p>
            </div>
          </div>
        )}

        {/* TOGGLE BUTTON */}
        <button className="cb-toggle" onClick={() => setOpen(o => !o)} aria-label="Chat">
          {unread > 0 && !open && <div className="cb-badge">{unread}</div>}
          {open ? (
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          )}
        </button>

      </div>
    </>
  );
}
