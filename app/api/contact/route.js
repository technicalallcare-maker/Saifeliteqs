'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const PROC_ICONS = [
  "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2",
  "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
  "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
];

const SLIDES = [
  { tag:'Quantity Surveying & Cost Consultancy', h1:'Global Vision.', h2:'Local Expertise.', sub:'Precision cost management delivered across the UAE, GCC and internationally', img:'/images/hero_section1.jpg' },
  { tag:'Proactive Approach · Diligent Delivery', h1:'Protecting Your', h2:'Investment.', sub:'From initial concept through to final account — complete cost control', img:'/images/hero_section2.jpg' },
  { tag:'Superior Results · Every Project', h1:'Expert QS Services', h2:'You Can Trust.', sub:'Over a decade of excellence in the UAE built environment', img:'/images/hero_section3.jpeg' },
];

const SVCS = [
  { n:'01', t:'Cost Planning & Estimation', d:'Detailed estimates and cost plans at every design stage — from initial feasibility through to tender, providing reliable budget benchmarks throughout the project lifecycle.' },
  { n:'02', t:'RICS-AIQS — Developing Under Their Guidance & Standards', d:'Saif Elite QS is actively developing under the guidance and standards of RICS (Royal Institution of Chartered Surveyors) and AIQS (Australian Institute of Quantity Surveyors) — ensuring our practice meets the highest internationally recognised benchmarks of quality, ethics and professional competence.' },
  { n:'03', t:'Bill of Quantities', d:'Precisely measured Bills of Quantities prepared to standard methods of measurement, forming a transparent basis for tendering, procurement and ongoing cost control.' },
  { n:'04', t:'Contract Administration', d:'Expert management of construction contracts — interim valuations, variation assessment, claims handling and final account negotiation to protect your interests.' },
  { n:'05', t:'Project Cost Management', d:'Proactive monitoring, forecasting and reporting throughout construction, keeping your budget on track and identifying commercial risks before they become costly.' },
  { n:'06', t:'Dispute Resolution', d:'Professional quantum preparation and independent review for disputes, adjudications and arbitrations — protecting your commercial position at every stage.' },
  { n:'07', t:'Feasibility Studies', d:'Robust financial viability assessments and investment appraisals providing the clarity needed to make sound project decisions before committing capital.' },
  { n:'08', t:'Procurement Strategy', d:'Guidance on the most appropriate procurement routes, contract forms and tendering strategies to achieve best value and minimise commercial risk.' },
  { n:'09', t:'Value Engineering', d:'Structured cost reduction exercises identifying opportunities to reduce expenditure without compromising design intent, quality or construction programme.' },
];

const STATS = [
  { v:'10+', l:'Years of Experience' },
  { v:'200+', l:'Projects Delivered' },
  { v:'AED 2B+', l:'Total Value Managed' },
  { v:'98%', l:'Client Satisfaction' },
];

const PROC = [
  { t:'Initial Brief', d:'We begin by fully understanding your project objectives, programme, budget parameters and procurement strategy before anything else.' },
  { t:'Cost Plan', d:'A robust cost plan is established with appropriate risk allowances and contingencies, setting clear financial benchmarks from the outset.' },
  { t:'Tender Management', d:'We prepare tender documentation, manage the process, evaluate returns and provide a recommendation on contractor selection.' },
  { t:'Construction Phase', d:'Ongoing cost monitoring, variation assessment, interim valuations and regular cost reporting throughout the build programme.' },
  { t:'Final Account', d:'We negotiate and agree the final account, ensuring all entitlements are properly assessed and financial exposure minimised.' },
];

const PROJS = [
  { tag:'Residential', n:'Luxury Villa Complex', loc:'Dubai Hills, Dubai', v:'AED 45M', d:'24-unit luxury villa development including landscaping, pools and smart home systems.', img:'/images/project1.jpg' },
  { tag:'Commercial', n:'Grade A Office Tower', loc:'DIFC, Dubai', v:'AED 280M', d:'38-storey premium office tower. Complete cost management and contract administration.', img:'/images/project2.jpg' },
  { tag:'Mixed-Use', n:'Retail & Hospitality Scheme', loc:'JBR, Dubai', v:'AED 120M', d:'Mixed-use retail and hotel development on the Jumeirah Beach Residence waterfront.', img:'/images/project3.jpeg' },
  { tag:'Infrastructure', n:'Road & Utilities Package', loc:'Abu Dhabi', v:'AED 90M', d:"Employer's QS services for a major road infrastructure and utilities upgrade covering 14km.", img:'/images/project4.jpeg' },
  { tag:'Residential', n:'High-Rise Apartment Tower', loc:'Business Bay, Dubai', v:'AED 175M', d:'52-storey residential tower. Post-contract cost management and monthly reporting.', img:'/images/project5.jpeg' },
  { tag:'Construction', n:'Mixed Development', loc:'Dubai, UAE', v:'AED 32M', d:'Specialist QS services covering all phases from feasibility to final account.', img:'/images/project6.jpeg' },
];

const WHY = [
  'RICS-aligned professional standards on every commission',
  'Developing under RICS & AIQS guidance and standards — committed to the highest international benchmarks of quality and professionalism',
  'Dedicated senior QS assigned throughout your project',
  'Deep knowledge of UAE, GCC, UK, Ireland, NZ & Australia construction markets',
  'Transparent reporting — no surprises at final account',
  'Proactive risk identification before problems escalate',
  'Proven track record across all major construction sectors',
];

/* Animated stats data */
const GRAPH_STATS = [
  { label:'Residential', pct:40, color:'#b8912a' },
  { label:'Commercial', pct:28, color:'#d4aa40' },
  { label:'Infrastructure', pct:18, color:'#8a6820' },
  { label:'Mixed-Use', pct:9, color:'#e8c86a' },
  { label:'Healthcare', pct:5, color:'#c8a030' },
];

const PARTNERS = [
  'Emaar Properties','Nakheel','DAMAC Properties','Aldar Properties',
  'Meraas Holding','Dubai Properties','Sobha Realty','Majid Al Futtaim',
  'Omniyat','Azizi Developments',
];

const CNTS = [
  { d:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'Head Office', v:'Dubai, United Arab Emirates' },
  { d:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'UK Office', v:'United Kingdom (Remote QS Services)' },
  { d:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'Ireland Office', v:'Ireland (Remote QS Services)' },
  { d:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'NZ Office', v:'New Zealand (Remote QS Services)' },
  { d:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'Australia Office', v:'Australia (Remote QS Services)' },
  { d:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z', l:'Phone', v:'+971 50 505 3679' },
  { d:'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6', l:'Email', v:'info@saifeliteqs.com' },
  { d:'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z', l:'Website', v:'www.saifeliteqs.com' },
];

// ✅ UPDATED: Added 'Procurement' to navigation
const NAV = ['Home','Services','About','Procurement','Projects','Contact'];
const PHONE = '+97150505 3679';
const WA_LINK = 'https://wa.me/971505053679';

export default function Page() {
  const [sl, setSl] = useState(0);
  const [anim, setAnim] = useState(true);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [prjFilter, setPrjFilter] = useState('All');
  const [graphVisible, setGraphVisible] = useState(false);
  const [animPct, setAnimPct] = useState(GRAPH_STATS.map(() => 0));
  const [form, setForm] = useState({ fn:'', ln:'', email:'', svc:'', msg:'' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const timer = useRef(null);

  const handleSubmit = async () => {
    if (!form.fn || !form.email || !form.msg) {
      setFormError('Please fill Name, Email and Project Details');
      return;
    }
    setFormError('');
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSent(true);
      } else {
        setFormError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (e) {
      setFormError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };
  const graphRef = useRef(null);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const next = useCallback(() => {
    setAnim(false);
    setTimeout(() => { setSl(p => (p + 1) % SLIDES.length); setAnim(true); }, 400);
  }, []);
  useEffect(() => { timer.current = setInterval(next, 6000); return () => clearInterval(timer.current); }, [next]);

  /* scroll reveal */
  useEffect(() => {
    const run = () => document.querySelectorAll('.rv').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('on');
    });
    run(); window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  /* graph animation on scroll */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !graphVisible) {
        setGraphVisible(true);
        GRAPH_STATS.forEach((s, i) => {
          let start = 0;
          const step = () => {
            start += 2;
            if (start <= s.pct) {
              setAnimPct(p => { const n = [...p]; n[i] = start; return n; });
              setTimeout(step, 25);
            }
          };
          setTimeout(step, i * 200);
        });
      }
    }, { threshold: 0.3 });
    if (graphRef.current) obs.observe(graphRef.current);
    return () => obs.disconnect();
  }, [graphVisible]);

  const go = (id) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const filteredProjs = prjFilter === 'All' ? PROJS : PROJS.filter(p => p.tag === prjFilter);
  const filters = ['All', ...Array.from(new Set(PROJS.map(p => p.tag)))];

  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    :root{
      --gold:#b8912a;--gold-lt:#d4aa40;--gold-dk:#8a6820;
      --navy:#1a1f2e;--navy2:#252b3a;--dark:#0e1118;
      --white:#fff;--off:#f7f6f3;--light:#efefed;
      --txt:#1e1e1e;--txt2:#444;--muted:#777;--border:#e2ddd6;--tr:.3s ease;
    }
    body{background:var(--white);color:var(--txt);font-family:'Segoe UI',system-ui,sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--light)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}

    /* REVEAL */
    .rv{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease;}
    .rv.on{opacity:1;transform:none;}
    .rv.rl{transform:translateX(-26px);}.rv.rl.on{transform:none;}
    .rv.rr{transform:translateX(26px);}.rv.rr.on{transform:none;}
    .d1{transition-delay:.06s}.d2{transition-delay:.12s}.d3{transition-delay:.18s}
    .d4{transition-delay:.24s}.d5{transition-delay:.3s}.d6{transition-delay:.36s}

    /* FLOATING SOCIAL — desktop only */
    .float-social{
      position:fixed;left:0;top:50%;transform:translateY(-50%);
      z-index:500;display:flex;flex-direction:column;gap:0;
    }
    .float-social a{
      width:44px;height:44px;display:flex;align-items:center;justify-content:center;
      background:var(--navy);color:#fff;text-decoration:none;
      transition:all var(--tr);border-bottom:1px solid rgba(255,255,255,.1);
    }
    .float-social a:hover{background:var(--gold);width:52px;}
    .float-social a.wa{background:#25D366;}
    .float-social a.wa:hover{background:#1ebe5d;}
    .float-social a:first-child{border-radius:0 4px 0 0;}
    .float-social a:last-child{border-radius:0 0 4px 0;border-bottom:none;}

    /* MOBILE FIXED BUTTONS */
    .mob-call{position:fixed;left:1rem;bottom:1.4rem;z-index:500;width:48px;height:48px;border-radius:50%;background:var(--navy);color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25);}
    .mob-wa{position:fixed;right:1rem;bottom:1.4rem;z-index:500;width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(37,211,102,.4);}

    /* NAV */
    .nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;height:90px;padding:0 3rem;transition:all .4s;}
    .nav.sc{background:rgba(14,17,24,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(184,145,42,.2);height:72px;}
    .nlogo{display:flex;align-items:center;gap:.8rem;cursor:pointer;}
    .nlogo-txt{display:flex;flex-direction:column;line-height:1.2;}
    .nlogo-txt b{font-size:.85rem;font-weight:700;color:#fff;letter-spacing:.05em;text-transform:uppercase;}
    .nlogo-txt span{font-size:.56rem;color:rgba(255,255,255,.5);letter-spacing:.2em;text-transform:uppercase;}
    .nlinks{display:flex;align-items:center;gap:2.2rem;list-style:none;}
    .nlinks a{color:rgba(255,255,255,.7);text-decoration:none;font-size:.7rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;transition:color var(--tr);position:relative;padding-bottom:3px;}
    .nlinks a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold-lt);transition:width var(--tr);}
    .nlinks a:hover{color:#fff;}.nlinks a:hover::after{width:100%;}
    .nbtn{background:var(--gold);color:#fff;border:none;padding:.46rem 1.4rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .nbtn:hover{background:var(--gold-lt);}
    .burger{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:4px;}

    /* MOB MENU */
    .mob{display:none;position:fixed;inset:0;z-index:199;background:var(--dark);flex-direction:column;align-items:center;justify-content:center;gap:2rem;}
    .mob.on{display:flex;}
    .mob-x{position:absolute;top:1.4rem;right:1.6rem;background:none;border:none;color:rgba(255,255,255,.6);cursor:pointer;}
    .mob a{color:#fff;text-decoration:none;font-size:1.3rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:color var(--tr);}
    .mob a:hover{color:var(--gold-lt);}

    /* BUTTONS */
    .btn-gold{display:inline-flex;align-items:center;gap:.5rem;background:var(--gold);color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;font-family:inherit;transition:all var(--tr);position:relative;overflow:hidden;}
    .btn-gold::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transition:left .5s;}
    .btn-gold:hover{background:var(--gold-lt);transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,145,42,.3);}
    .btn-gold:hover::before{left:100%;}
    .btn-ol-dark{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--navy);padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid var(--navy);cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .btn-ol-dark:hover{background:var(--navy);color:#fff;}
    .btn-ol-gold{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold);padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid var(--gold);cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .btn-ol-gold:hover{background:var(--gold);color:#fff;}
    .btn-white{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(255,255,255,.4);cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .btn-white:hover{background:rgba(255,255,255,.1);border-color:#fff;}
    .btn-full{width:100%;justify-content:center;padding:.9rem;}

    /* HERO */
    .hero{position:relative;width:100%;height:100vh;min-height:640px;overflow:hidden;}
    .hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(10,13,20,.88) 50%,rgba(10,13,20,.45) 100%);}
    .hero-cnt{position:relative;z-index:2;height:100%;max-width:1200px;margin:0 auto;padding:0 3rem;display:flex;flex-direction:column;justify-content:center;}
    .hero-tag{display:inline-flex;align-items:center;gap:.8rem;font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1.8rem;transition:opacity .4s,transform .4s;}
    .hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .hero-tag.out,.hero-h.out,.hero-sub.out{opacity:0;transform:translateY(12px);}
    .hero-h{font-size:clamp(2.8rem,6vw,5rem);font-weight:700;line-height:1.08;color:#fff;font-family:Georgia,serif;margin-bottom:1.4rem;transition:opacity .4s,transform .4s;}
    .hero-h span{display:block;}.hero-h span:last-child{color:var(--gold-lt);}
    .hero-sub{font-size:1rem;color:rgba(255,255,255,.72);font-weight:300;max-width:500px;margin-bottom:3rem;line-height:1.75;transition:opacity .4s,transform .4s;}
    .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;}
    .hero-nav{position:absolute;bottom:3rem;left:3rem;z-index:3;display:flex;align-items:center;gap:1.4rem;}
    .hnav-btn{display:flex;align-items:center;gap:.6rem;cursor:pointer;font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.3);transition:color var(--tr);border:none;background:none;font-family:inherit;}
    .hnav-btn.a{color:var(--gold-lt);}
    .hnav-bar{width:28px;height:1px;background:currentColor;transition:width var(--tr);}
    .hnav-btn.a .hnav-bar{width:48px;}
    .hero-scrl{position:absolute;right:3rem;bottom:3rem;z-index:3;display:flex;flex-direction:column;align-items:center;gap:.5rem;}
    .scrl-ln{width:1px;height:48px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.4));animation:scrl 2.5s ease-in-out infinite;}
    @keyframes scrl{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
    .scrl-txt{font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.25);writing-mode:vertical-rl;}

    /* STATS BAND */
    .statsband{background:var(--white);padding:3.5rem 1.5rem;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
    .stat{text-align:center;padding:1rem 1.5rem;position:relative;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:var(--border);}
    .stat-v{font-size:2.6rem;font-weight:700;color:var(--gold);font-family:Georgia,serif;line-height:1;margin-bottom:.5rem;}
    .stat-l{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--txt2);}

    /* SECTION */
    section{padding:8rem 1.5rem;}
    .wrap{max-width:1100px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.2rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;font-weight:400;line-height:1.82;max-width:560px;}

    /* SERVICES */
    .svc{background:var(--navy);}
    .svc .sec-h{color:#fff;}.svc .sec-p{color:rgba(255,255,255,.6);}
    .svc-hd{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem;margin-bottom:4rem;padding-bottom:2rem;border-bottom:1px solid rgba(255,255,255,.1);}
    .svc-grid{display:grid;grid-template-columns:repeat(4,1fr);}
    .svc-card{padding:2rem 1.6rem;border-right:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden;transition:background var(--tr),transform var(--tr);}
    .svc-card:nth-child(4n){border-right:none;}.svc-card:nth-last-child(-n+4){border-bottom:none;}
    .svc-card::after{content:'';position:absolute;top:0;left:0;width:0;height:3px;background:linear-gradient(to right,var(--gold),var(--gold-lt));transition:width .5s ease;}
    .svc-card:hover{background:rgba(255,255,255,.04);transform:translateY(-3px);}
    .svc-card:hover::after{width:100%;}
    .svc-n{font-size:.58rem;color:var(--gold-lt);letter-spacing:.22em;font-weight:700;margin-bottom:.9rem;opacity:.7;}
    .svc-t{font-size:.9rem;font-weight:700;color:#fff;margin-bottom:.6rem;font-family:Georgia,serif;line-height:1.3;}
    .svc-d{font-size:.8rem;color:rgba(255,255,255,.55);line-height:1.75;}

    /* ABOUT */
    .abt{background:var(--off);padding:0;overflow:hidden;}
    .abt-g{display:grid;grid-template-columns:1fr 1fr;min-height:580px;position:relative;}
    .abt-img{position:relative;overflow:hidden;min-height:500px;}
    .abt-img img{object-fit:cover;object-position:center;}
    .abt-img::after{content:'';position:absolute;top:0;right:0;width:55%;height:100%;background:linear-gradient(to right, transparent 0%, var(--off) 100%);}
    .abt-txt{padding:6rem 3rem 6rem 1rem;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2;margin-left:-6rem;}
    .why-list{margin-top:1.8rem;display:flex;flex-direction:column;gap:.9rem;}
    .why-row{display:flex;align-items:flex-start;gap:.8rem;}
    .why-chk{color:var(--gold);flex-shrink:0;margin-top:2px;}
    .why-t{font-size:.84rem;color:var(--txt2);line-height:1.6;}

    /* PROCESS */
    .proc{background:var(--white);}
    .proc-grid{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid var(--border);margin-top:3.5rem;}
    .pstep{padding:2.2rem 1.6rem;border-right:1px solid var(--border);position:relative;transition:background var(--tr),transform var(--tr);}
    .pstep:last-child{border-right:none;}
    .pstep:hover{background:var(--off);transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.06);}
    .pstep-bar{position:absolute;bottom:0;left:0;width:0;height:3px;background:var(--gold);transition:width .5s ease;}
    .pstep:hover .pstep-bar{width:100%;}
    .pstep-ico{width:44px;height:44px;border:1px solid rgba(184,145,42,.3);display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:1.1rem;transition:all var(--tr);}
    .pstep:hover .pstep-ico{background:var(--gold);color:#fff;border-color:var(--gold);}
    .pstep-t{font-size:.88rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;font-family:Georgia,serif;}
    .pstep-d{font-size:.78rem;color:var(--txt2);line-height:1.72;}

    /* DESKTOP CALL BUBBLE */
    .call-bubble{position:fixed;right:1.5rem;top:50%;transform:translateY(-50%);z-index:500;display:flex;align-items:center;gap:0;}
    .call-bubble-ring{position:relative;width:52px;height:52px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;box-shadow:0 0 0 0 rgba(184,145,42,.6);animation:ringPulse 2s ease-out infinite;transition:all var(--tr);}
    .call-bubble:hover .call-bubble-ring{background:var(--gold-lt);}
    .call-bubble-ring svg{animation:ringShake 2s ease-in-out infinite;}
    @keyframes ringShake{0%,100%{transform:rotate(0deg);}10%{transform:rotate(-18deg);}20%{transform:rotate(18deg);}30%{transform:rotate(-12deg);}40%{transform:rotate(12deg);}50%{transform:rotate(0deg);}}
    @keyframes ringPulse{0%{box-shadow:0 0 0 0 rgba(184,145,42,.6);}70%{box-shadow:0 0 0 16px rgba(184,145,42,0);}100%{box-shadow:0 0 0 0 rgba(184,145,42,0);}}
    .call-bubble-ring::before,.call-bubble-ring::after{content:'';position:absolute;border-radius:50%;border:2px solid rgba(184,145,42,.5);animation:ripple 2s ease-out infinite;}
    .call-bubble-ring::before{width:68px;height:68px;animation-delay:0s;}
    .call-bubble-ring::after{width:86px;height:86px;animation-delay:.4s;}
    @keyframes ripple{0%{transform:scale(.85);opacity:1;}100%{transform:scale(1.4);opacity:0;}}
    .call-bubble-label{background:var(--navy);color:#fff;padding:.5rem 1rem;border-radius:4px 0 0 4px;font-size:.72rem;font-weight:600;white-space:nowrap;max-width:0;overflow:hidden;opacity:0;transition:max-width .4s ease,opacity .4s ease,padding .4s ease;pointer-events:none;}
    .call-bubble:hover .call-bubble-label{max-width:180px;opacity:1;padding:.5rem 1rem;}
    .call-bubble-label span:first-child{font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;opacity:.65;display:block;}
    .call-bubble-label span:last-child{font-size:.8rem;font-weight:700;display:block;color:var(--gold-lt);}

    /* PROJECTS */
    .prj{background:var(--dark);padding:8rem 0;}
    .prj-wrap{max-width:100%;}
    .prj-header{max-width:1100px;margin:0 auto;padding:0 1.5rem;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3rem;}
    .prj-header .sec-h{color:#fff;}.prj-header .sec-tag{color:var(--gold-lt);}
    .prj-filters{display:flex;gap:.5rem;flex-wrap:wrap;}
    .pf-btn{background:transparent;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.6);padding:.38rem 1rem;font-size:.65rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .pf-btn.a,.pf-btn:hover{background:var(--gold);border-color:var(--gold);color:#fff;}
    .prj-card-stone{position:relative;overflow:hidden;cursor:pointer;}
    .prj-img-stone{width:100%;position:relative;overflow:hidden;}
    .prj-img-stone img{object-fit:cover;object-position:center;transition:transform .7s ease;}
    .prj-card-stone:hover .prj-img-stone img{transform:scale(1.05);}
    .prj-stone-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,13,20,.92) 0%,rgba(10,13,20,.2) 55%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.8rem;transition:background var(--tr);}
    .prj-card-stone:hover .prj-stone-overlay{background:linear-gradient(to top,rgba(10,13,20,.96) 0%,rgba(10,13,20,.55) 65%,rgba(10,13,20,.1) 100%);}
    .prj-stone-tag{font-size:.56rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:.45rem;border-left:2px solid var(--gold);padding-left:.55rem;}
    .prj-stone-name{font-size:clamp(.95rem,2.2vw,1.4rem);font-weight:700;color:#fff;font-family:Georgia,serif;margin-bottom:.25rem;line-height:1.2;}
    .prj-stone-loc{font-size:.7rem;color:rgba(255,255,255,.5);margin-bottom:.4rem;}
    .prj-stone-val{font-size:.76rem;color:var(--gold-lt);font-weight:700;margin-bottom:.6rem;}
    .prj-stone-desc{font-size:.76rem;color:rgba(255,255,255,.6);line-height:1.65;max-height:0;overflow:hidden;transition:max-height .4s,opacity .4s;opacity:0;}
    .prj-card-stone:hover .prj-stone-desc{max-height:80px;opacity:1;}
    .prj-stone-arrow{display:inline-flex;align-items:center;gap:.4rem;font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-lt);margin-top:.7rem;opacity:0;transform:translateY(6px);transition:all var(--tr);}
    .prj-card-stone:hover .prj-stone-arrow{opacity:1;transform:translateY(0);}
    .prj-desktop{display:block;}
    .prj-feat-row{display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-bottom:3px;}
    .prj-feat-row .prj-left .prj-img-stone{height:623px;}
    .prj-right-stack{display:flex;flex-direction:column;gap:3px;}
    .prj-right-stack .prj-img-stone{height:308px;}
    .prj-bot-row{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;}
    .prj-bot-row .prj-img-stone{height:300px;}
    .prj-mobile{display:none;padding:0 1.5rem;}
    .prj-mob-grid{display:grid;grid-template-columns:1fr;gap:1rem;}
    .prj-mob-grid .prj-img-stone{height:260px;}
    .prj-mob-grid .prj-stone-desc{max-height:60px!important;opacity:1!important;}
    .prj-mob-grid .prj-stone-arrow{opacity:1!important;transform:none!important;}

    /* ANIMATED GRAPH SECTION */
    .graph-sec{background:var(--navy);padding:8rem 1.5rem;}
    .graph-sec .sec-h{color:#fff;}.graph-sec .sec-p{color:rgba(255,255,255,.6);}
    .graph-inner{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;margin-top:4rem;}
    .graph-bars{display:flex;flex-direction:column;gap:1.4rem;}
    .gbar-row{display:flex;flex-direction:column;gap:.5rem;}
    .gbar-label{display:flex;justify-content:space-between;align-items:center;}
    .gbar-name{font-size:.75rem;font-weight:600;color:#fff;letter-spacing:.06em;}
    .gbar-pct{font-size:.75rem;font-weight:700;color:var(--gold-lt);}
    .gbar-track{height:8px;background:rgba(255,255,255,.08);border-radius:4px;overflow:hidden;}
    .gbar-fill{height:100%;border-radius:4px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
    .graph-right{display:flex;flex-direction:column;gap:2rem;}
    .graph-circle-wrap{display:flex;justify-content:center;align-items:center;}
    .graph-pie{position:relative;width:220px;height:220px;}
    .graph-pie svg{transform:rotate(-90deg);}
    .graph-pie-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
    .graph-pie-label span:first-child{font-size:2.2rem;font-weight:700;color:var(--gold-lt);font-family:Georgia,serif;line-height:1;}
    .graph-pie-label span:last-child{font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-top:.2rem;}
    .graph-legend{display:flex;flex-wrap:wrap;gap:.8rem;}
    .gleg{display:flex;align-items:center;gap:.4rem;font-size:.72rem;color:rgba(255,255,255,.65);}
    .gleg-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}

    /* PARTNERS */
    .partners{background:var(--white);padding:5rem 0;overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
    .partners-hd{text-align:center;padding:0 1.5rem;margin-bottom:3rem;}
    .partners-hd .sec-line{margin:0 auto 0;}
    .partners-track-wrap{overflow:hidden;position:relative;}
    .partners-track-wrap::before,.partners-track-wrap::after{content:'';position:absolute;top:0;bottom:0;width:120px;z-index:2;pointer-events:none;}
    .partners-track-wrap::before{left:0;background:linear-gradient(to right,var(--white),transparent);}
    .partners-track-wrap::after{right:0;background:linear-gradient(to left,var(--white),transparent);}
    .partners-track{display:flex;gap:0;animation:marquee 28s linear infinite;width:max-content;}
    .partners-track:hover{animation-play-state:paused;}
    @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
    .partner-logo{display:flex;align-items:center;justify-content:center;padding:1.2rem 3rem;border-right:1px solid var(--border);min-width:180px;height:90px;filter:grayscale(100%) opacity(.5);transition:filter var(--tr),transform var(--tr);flex-shrink:0;}
    .partner-logo:hover{filter:grayscale(0%) opacity(1);transform:scale(1.05);}
    .partner-logo img{max-height:52px;max-width:130px;object-fit:contain;width:auto;}

    /* CTA */
    .cta{position:relative;overflow:hidden;padding:8rem 1.5rem;text-align:center;}
    .cta-overlay{position:absolute;inset:0;z-index:1;background:rgba(10,13,20,.82);}
    .cta-in{position:relative;z-index:2;max-width:700px;margin:0 auto;}
    .cta-tag{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(212,170,64,.85);margin-bottom:1rem;}
    .cta-h{font-size:clamp(1.8rem,3.5vw,3rem);font-weight:700;color:#fff;margin-bottom:1rem;font-family:Georgia,serif;line-height:1.15;}
    .cta-p{color:rgba(255,255,255,.65);font-size:.9rem;font-weight:300;margin-bottom:2.5rem;line-height:1.8;}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

    /* CONTACT */
    .cnt{background:var(--white);}
    .cnt-g{display:grid;grid-template-columns:1fr 1.4fr;gap:6rem;margin-top:4rem;}
    .cnt-row{display:flex;gap:1rem;align-items:flex-start;margin-bottom:2rem;}
    .cnt-ico{width:44px;height:44px;flex-shrink:0;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--gold);}
    .cnt-lbl{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.2rem;}
    .cnt-val{font-size:.9rem;color:var(--txt);font-weight:500;}
    .cnt-note{background:var(--off);border-left:3px solid var(--gold);padding:1.2rem 1.4rem;margin-top:1.8rem;}
    .cnt-note p{font-size:.82rem;color:var(--txt2);line-height:1.7;}
    .frow{display:grid;grid-template-columns:1fr 1fr;gap:.9rem;}
    .fg{display:flex;flex-direction:column;gap:.32rem;margin-bottom:.85rem;}
    .fg label{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);}
    .fg input,.fg textarea,.fg select{background:var(--off);border:1px solid var(--border);color:var(--txt);padding:.72rem .9rem;font-size:.88rem;font-family:inherit;outline:none;transition:border-color var(--tr);resize:none;}
    .fg input::placeholder,.fg textarea::placeholder{color:rgba(119,119,119,.5);}
    .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--gold);}
    .fg select option{background:var(--white);}

    /* FOOTER */
    .ftr{background:var(--dark);}
    .ftr-main{padding:5rem 1.5rem 3rem;}
    .ftr-main-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3.5rem;}
    .ftr-brand-logo{margin-bottom:.8rem;}
    .ftr-brand-name{font-size:1rem;font-weight:700;color:#fff;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.2rem;}
    .ftr-brand-sub{font-size:.58rem;color:rgba(255,255,255,.35);letter-spacing:.2em;text-transform:uppercase;margin-bottom:1rem;}
    .ftr-brand-p{font-size:.82rem;color:rgba(255,255,255,.45);line-height:1.8;max-width:260px;}
    .ftr-brand-contact{margin-top:1.4rem;display:flex;flex-direction:column;gap:.5rem;}
    .ftr-brand-contact a{font-size:.82rem;color:rgba(255,255,255,.55);text-decoration:none;display:flex;align-items:center;gap:.5rem;transition:color var(--tr);}
    .ftr-brand-contact a:hover{color:var(--gold-lt);}
    .fsoc{display:flex;gap:.6rem;margin-top:1.4rem;}
    .fsc{width:34px;height:34px;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);transition:all var(--tr);text-decoration:none;}
    .fsc:hover{border-color:var(--gold-lt);color:var(--gold-lt);}
    .fcol h4{font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1.3rem;font-weight:700;}
    .fcol ul{list-style:none;}.fcol li{margin-bottom:.7rem;}
    .fcol a{color:rgba(255,255,255,.5);text-decoration:none;font-size:.82rem;transition:color var(--tr);}
    .fcol a:hover{color:#fff;}
    .ftr-mid{background:rgba(255,255,255,.03);border-top:1px solid rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.07);padding:1.4rem 1.5rem;}
    .ftr-mid-in{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;}
    .ftr-mid-links{display:flex;gap:2rem;list-style:none;}
    .ftr-mid-links a{font-size:.72rem;color:rgba(255,255,255,.35);text-decoration:none;transition:color var(--tr);}
    .ftr-mid-links a:hover{color:#fff;}
    .ftr-bot{padding:1.2rem 1.5rem;}
    .ftr-bot-in{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.6rem;}
    .ftr-bot p{font-size:.7rem;color:rgba(255,255,255,.2);}
    .ftr-bot .hl{color:var(--gold-lt);}

    /* RESPONSIVE */
    @media(max-width:1100px){
      .nav{padding:0 2rem;}.hero-cnt{padding:0 2rem;}
      .hero-nav{left:2rem;}.hero-scrl{right:2rem;}
      .svc-grid{grid-template-columns:repeat(2,1fr);}
      .svc-card:nth-child(4n){border-right:1px solid rgba(255,255,255,.08);}
      .svc-card:nth-child(2n){border-right:none!important;}
      .abt-g{grid-template-columns:1fr;}
      .abt-img{min-height:280px;}
      .abt-img::after{width:100%;height:50%;top:auto;bottom:0;background:linear-gradient(to bottom,transparent 0%,var(--off) 100%);}
      .abt-txt{padding:2rem 1.4rem 4rem;margin-left:0!important;}
      .proc-grid{grid-template-columns:repeat(3,1fr);}
      .graph-inner{grid-template-columns:1fr;}
      .partners-grid{grid-template-columns:repeat(3,1fr);}
      .cnt-g{grid-template-columns:1fr;gap:3rem;}
      .ftr-main-in{grid-template-columns:1fr 1fr;}
    }
    @media(max-width:768px){
      .float-social{display:none;}
      .mob-call{display:flex;}
      .mob-wa{display:flex;}
      .nav{padding:0 1.2rem;height:70px;}.nav.sc{height:60px;}
      .nlinks,.nbtn{display:none;}.burger{display:flex;}
      .hero-cnt{padding:0 1.4rem;}
      .hero-nav{left:1.4rem;bottom:2rem;}.hero-scrl{display:none;}
      .stats-g{grid-template-columns:1fr 1fr;}
      .stat:nth-child(2)::after{display:none;}
      .svc-grid{grid-template-columns:1fr;}
      .svc-card{border-right:none!important;}
      .proc-grid{grid-template-columns:1fr;}
      .pstep{border-right:none;border-bottom:1px solid var(--border);}
      .pstep:last-child{border-bottom:none;}
      .prj-desktop{display:none!important;}
      .prj-mobile{display:block!important;}
      .call-bubble{display:none!important;}
      .partners-grid{grid-template-columns:repeat(2,1fr);}
      .frow{grid-template-columns:1fr;}
      .ftr-main-in{grid-template-columns:1fr;gap:2.5rem;}
      section{padding:5rem 1.2rem;}
    }
    @media(max-width:480px){
      .stats-g{grid-template-columns:1fr 1fr;gap:.5rem;}
      .stat::after{display:none!important;}
      .hero-h{font-size:clamp(2rem,8vw,2.8rem);}
      .partners-grid{grid-template-columns:repeat(2,1fr);}
    }
  `;

  /* WhatsApp SVG path */
  const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.5 2C6.253 2 2 6.253 2 11.5c0 1.894.549 3.659 1.497 5.145L2 22l5.488-1.478A9.46 9.46 0 0 0 11.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2z";

  return (
    <>
      <style>{CSS}</style>

      {/* FLOATING SOCIAL — desktop */}
      <div className="float-social">
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="wa" title="WhatsApp">
          <svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d={WA_PATH}/></svg>
        </a>
        <a href={`mailto:info@saifeliteqs.com`} title="Email"><Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={18}/></a>
        <a href="https://www.linkedin.com/company/saif-elite-qs" target="_blank" rel="noreferrer" title="LinkedIn"><Svg d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" s={18}/></a>
        <a href="https://www.instagram.com/saifeliteqs/" target="_blank" rel="noreferrer" title="Instagram"><Svg d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" s={18}/></a>
        <a href="https://www.facebook.com/people/Saif-Elite-QS/61590199756177/" target="_blank" rel="noreferrer" title="Facebook"><Svg d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" s={18}/></a>
      </div>

      {/* MOBILE FIXED BUTTONS */}
      <a href={`tel:${PHONE}`} className="mob-call" aria-label="Call"><Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" s={22}/></a>
      <a href={WA_LINK} target="_blank" rel="noreferrer" className="mob-wa" aria-label="WhatsApp">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="white"><path d={WA_PATH}/></svg>
      </a>

      {/* DESKTOP CALL BUBBLE */}
      <a href={`tel:${PHONE}`} className="call-bubble" aria-label="Call us" style={{textDecoration:'none'}}>
        <div className="call-bubble-label">
          <span>Call Us Now</span>
          <span>{PHONE}</span>
        </div>
        <div className="call-bubble-ring">
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
          </svg>
        </div>
      </a>

      {/* NAV */}
      <nav className={`nav ${sc?'sc':''}`}>
        <div className="nlogo" onClick={()=>go('home')}>
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={100} height={100} style={{objectFit:'contain'}} priority/>
          <div className="nlogo-txt"><b>Saif Elite QS</b><span>Quantity Surveyor &amp; Cost Consultant</span></div>
        </div>
        <ul className="nlinks">
          {NAV.map(n=>(
            <li key={n}>
              <Link href={n === 'Home' ? '/' : `/${n.toLowerCase()}`}>{n}</Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="nbtn" style={{textDecoration:'none',display:'inline-flex',alignItems:'center'}}>Contact Us</Link>
        <button className="burger" onClick={()=>setMenu(true)}><Svg d="M3 12h18M3 6h18M3 18h18" s={24}/></button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob ${menu?'on':''}`}>
        <button className="mob-x" onClick={()=>setMenu(false)}><Svg d="M18 6 6 18M6 6l12 12" s={26}/></button>
        {NAV.map(n=>(
          <div key={n}>
            <Link href={n === 'Home' ? '/' : `/${n.toLowerCase()}`} onClick={()=>setMenu(false)}>{n}</Link>
          </div>
        ))}
        <Link href="/contact" className="btn-gold" style={{textDecoration:'none'}} onClick={()=>setMenu(false)}>Contact Us</Link>
      </div>

      {/* Rest of the component remains the same... */}
      {/* HERO, STATS, SERVICES, ABOUT, PROCESS, PROJECTS, GRAPH, PARTNERS, CTA, CONTACT, FOOTER sections */}
      
      {/* HERO */}
      <section id="home" className="hero">
        {SLIDES.map((s,i)=>(
          <div key={i} style={{position:'absolute',inset:0,zIndex:0,opacity:i===sl?1:0,transition:'opacity .6s ease'}}>
            <Image src={s.img} alt={s.tag} fill sizes="100vw" style={{objectFit:'cover',objectPosition:'center'}} priority={i===0}/>
          </div>
        ))}
        <div className="hero-overlay"/>
        <div className="hero-cnt">
          <div className={`hero-tag ${anim?'':'out'}`}>{SLIDES[sl].tag}</div>
          <h1 className={`hero-h ${anim?'':'out'}`}><span>{SLIDES[sl].h1}</span><span>{SLIDES[sl].h2}</span></h1>
          <p className={`hero-sub ${anim?'':'out'}`}>{SLIDES[sl].sub}</p>
          <div className="hero-btns">
            <button className="btn-gold" onClick={()=>go('contact')}>Professional Consultation &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></button>
            <button className="btn-white" onClick={()=>go('services')}>Our Services</button>
          </div>
        </div>
        <div className="hero-nav">
          {SLIDES.map((_,i)=>(
            <button key={i} className={`hnav-btn ${i===sl?'a':''}`} onClick={()=>{clearInterval(timer.current);setAnim(false);setTimeout(()=>{setSl(i);setAnim(true);},400);}}>
              <div className="hnav-bar"/><span>{String(i+1).padStart(2,'0')}</span>
            </button>
          ))}
        </div>
        <div className="hero-scrl"><div className="scrl-ln"/><div className="scrl-txt">Scroll</div></div>
      </section>

      {/* STATS */}
      <div className="statsband">
        <div className="stats-g">
          {STATS.map((s,i)=>(<div key={s.l} className={`stat rv d${i+1}`}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="svc">
        <div className="wrap">
          <div className="svc-hd">
            <div className="rv"><div className="sec-tag">What We Do</div><h2 className="sec-h">Our Services</h2><div className="sec-line"/><p className="sec-p">From initial feasibility through to final account — a complete range of QS services tailored to your project.</p></div>
            <button className="btn-ol-gold rv d2" onClick={()=>go('contact')}>Discuss Your Project &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={13}/></button>
          </div>
          <div className="svc-grid">
            {SVCS.map((s,i)=>(<div key={s.n} className={`svc-card rv d${(i%4)+1}`}><div className="svc-n">{s.n}</div><div className="svc-t">{s.t}</div><div className="svc-d">{s.d}</div></div>))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="abt">
        <div style={{maxWidth:'100%'}}>
          <div className="abt-g">
            <div className="abt-img rv rl" style={{position:'relative'}}>
              <Image src="/images/about_section1.jpeg" alt="About" fill sizes="50vw" style={{objectFit:'cover',objectPosition:'center'}}/>
            </div>
            <div className="abt-txt rv rr">
              <div className="sec-tag">Who We Are</div>
              <h2 className="sec-h">About Saif Elite QS</h2>
              <div className="sec-line"/>
              <p className="sec-p" style={{marginBottom:'1rem'}}>Saif Elite QS is a specialist quantity surveying and cost consultancy practice headquartered in Dubai, UAE, providing remote QS services across the UK, Ireland, New Zealand and Australia — delivering independent QS services across the UAE, GCC and internationally. We bring rigorous commercial discipline to every project.</p>
              <p className="sec-p" style={{marginBottom:'1rem'}}>Our qualified team delivers measurable value at every stage — working alongside developers, contractors, architects and project managers to ensure cost is always controlled and every decision is fully informed.</p>
              <div className="why-list">
                {WHY.map((w,i)=>(<div key={i} className="why-row"><span className="why-chk"><Svg d="M20 6 9 17l-5-5" s={14} w={2.5}/></span><span className="why-t">{w}</span></div>))}
              </div>
              <div style={{marginTop:'2.2rem'}}><button className="btn-gold" onClick={()=>go('contact')}>Work With Us &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></button></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="proc">
        <div className="wrap">
          <div className="rv"><div className="sec-tag">How We Work</div><h2 className="sec-h">Our Process</h2><div className="sec-line"/><p className="sec-p">A structured, transparent approach giving you complete visibility over your project costs from inception to final account.</p></div>
          <div className="proc-grid">
            {PROC.map((p,i)=>(<div key={p.t} className={`pstep rv d${i+1}`}><div className="pstep-bar"/><div className="pstep-ico"><Svg d={PROC_ICONS[i]} s={22} w={1.5}/></div><div className="pstep-t">{p.t}</div><div className="pstep-d">{p.d}</div></div>))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="prj">
        <div className="prj-wrap">
          <div className="prj-header">
            <div className="rv">
              <div className="sec-tag" style={{color:'var(--gold-lt)'}}>Our Work</div>
              <h2 className="sec-h" style={{color:'#fff'}}>Featured Projects</h2>
              <div className="sec-line"/>
            </div>
            <div className="prj-filters rv d2">
              {filters.map(f=>(<button key={f} className={`pf-btn ${prjFilter===f?'a':''}`} onClick={()=>setPrjFilter(f)}>{f}</button>))}
            </div>
          </div>

          {/* DESKTOP layout */}
          <div className="prj-desktop">
            {prjFilter==='All' ? (
              <>
                <div className="prj-feat-row">
                  <div className="prj-left prj-card-stone">
                    <div className="prj-img-stone">
                      <Image src={filteredProjs[0].img} alt={filteredProjs[0].n} fill sizes="50vw" style={{objectFit:'cover'}}/>
                    </div>
                    <div className="prj-stone-overlay">
                      <div className="prj-stone-tag">{filteredProjs[0].tag}</div>
                      <div className="prj-stone-name">{filteredProjs[0].n}</div>
                      <div className="prj-stone-loc">{filteredProjs[0].loc}</div>
                      <div className="prj-stone-val">{filteredProjs[0].v}</div>
                      <div className="prj-stone-desc">{filteredProjs[0].d}</div>
                      <div className="prj-stone-arrow">View Project <Svg d="M5 12h14M12 5l7 7-7 7" s={13}/></div>
                    </div>
                  </div>
                  <div className="prj-right-stack">
                    {filteredProjs.slice(1,3).map(p=>(
                      <div key={p.n} className="prj-card-stone">
                        <div className="prj-img-stone">
                          <Image src={p.img} alt={p.n} fill sizes="50vw" style={{objectFit:'cover'}}/>
                        </div>
                        <div className="prj-stone-overlay">
                          <div className="prj-stone-tag">{p.tag}</div>
                          <div className="prj-stone-name">{p.n}</div>
                          <div className="prj-stone-loc">{p.loc}</div>
                          <div className="prj-stone-val">{p.v}</div>
                          <div className="prj-stone-desc">{p.d}</div>
                          <div className="prj-stone-arrow">View Project <Svg d="M5 12h14M12 5l7 7-7 7" s={13}/></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="prj-bot-row">
                  {filteredProjs.slice(3).map(p=>(
                    <div key={p.n} className="prj-card-stone">
                      <div className="prj-img-stone">
                        <Image src={p.img} alt={p.n} fill sizes="33vw" style={{objectFit:'cover'}}/>
                      </div>
                      <div className="prj-stone-overlay">
                        <div className="prj-stone-tag">{p.tag}</div>
                        <div className="prj-stone-name">{p.n}</div>
                        <div className="prj-stone-loc">{p.loc}</div>
                        <div className="prj-stone-val">{p.v}</div>
                        <div className="prj-stone-desc">{p.d}</div>
                        <div className="prj-stone-arrow">View Project <Svg d="M5 12h14M12 5l7 7-7 7" s={13}/></div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="prj-bot-row">
                {filteredProjs.map(p=>(
                  <div key={p.n} className="prj-card-stone">
                    <div className="prj-img-stone" style={{height:'380px'}}>
                      <Image src={p.img} alt={p.n} fill sizes="33vw" style={{objectFit:'cover'}}/>
                    </div>
                    <div className="prj-stone-overlay">
                      <div className="prj-stone-tag">{p.tag}</div>
                      <div className="prj-stone-name">{p.n}</div>
                      <div className="prj-stone-loc">{p.loc}</div>
                      <div className="prj-stone-val">{p.v}</div>
                      <div className="prj-stone-desc">{p.d}</div>
                      <div className="prj-stone-arrow">View Project <Svg d="M5 12h14M12 5l7 7-7 7" s={13}/></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MOBILE layout */}
          <div className="prj-mobile">
            <div className="prj-mob-grid">
              {filteredProjs.map(p=>(
                <div key={p.n} className="prj-card-stone">
                  <div className="prj-img-stone">
                    <Image src={p.img} alt={p.n} fill sizes="100vw" style={{objectFit:'cover'}}/>
                  </div>
                  <div className="prj-stone-overlay">
                    <div className="prj-stone-tag">{p.tag}</div>
                    <div className="prj-stone-name">{p.n}</div>
                    <div className="prj-stone-loc">{p.loc}</div>
                    <div className="prj-stone-val">{p.v}</div>
                    <div className="prj-stone-desc">{p.d}</div>
                    <div className="prj-stone-arrow">View Project <Svg d="M5 12h14M12 5l7 7-7 7" s={13}/></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATED GRAPH SECTION */}
      <section className="graph-sec" ref={graphRef}>
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">Project Portfolio</div>
            <h2 className="sec-h">Our Project Breakdown</h2>
            <div className="sec-line"/>
            <p className="sec-p">A decade of delivering across every major construction sector in the UAE — here's how our portfolio is distributed.</p>
          </div>
          <div className="graph-inner">
            <div className="graph-bars rv rl">
              {GRAPH_STATS.map((g,i)=>(
                <div key={g.label} className="gbar-row">
                  <div className="gbar-label">
                    <span className="gbar-name">{g.label}</span>
                    <span className="gbar-pct">{animPct[i]}%</span>
                  </div>
                  <div className="gbar-track">
                    <div className="gbar-fill" style={{width:`${animPct[i]}%`,background:g.color}}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="graph-right rv rr">
              <div className="graph-circle-wrap">
                <div className="graph-pie">
                  <svg width="220" height="220" viewBox="0 0 220 220">
                    {(() => {
                      let cumulative = 0;
                      return GRAPH_STATS.map((g, i) => {
                        const pct = animPct[i] / 100;
                        const r = 90;
                        const cx = 110, cy = 110;
                        const circ = 2 * Math.PI * r;
                        const offset = circ * (1 - pct);
                        const rotation = cumulative * 360;
                        cumulative += animPct[i] / 100;
                        return (
                          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                            stroke={g.color} strokeWidth="28"
                            strokeDasharray={`${circ * pct} ${circ * (1 - pct)}`}
                            strokeDashoffset={0}
                            style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px`, transition: 'stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)' }}
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="graph-pie-label">
                    <span>200+</span>
                    <span>Projects</span>
                  </div>
                </div>
              </div>
              <div className="graph-legend">
                {GRAPH_STATS.map(g=>(
                  <div key={g.label} className="gleg">
                    <div className="gleg-dot" style={{background:g.color}}/>
                    {g.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="partners">
        <div className="partners-hd rv">
          <div className="sec-tag" style={{textAlign:'center',display:'block'}}>Trusted By</div>
          <h2 className="sec-h" style={{textAlign:'center',color:'var(--navy)'}}>Our Partners &amp; Clients</h2>
          <div className="sec-line" style={{margin:'0 auto 1rem'}}/>
          <p className="sec-p" style={{margin:'0 auto',textAlign:'center',maxWidth:'500px'}}>Proud to have delivered for some of the most respected names in UAE and GCC real estate.</p>
        </div>
        <div className="partners-track-wrap">
          <div className="partners-track">
            {[
              {src:'/images/emaar.png',alt:'Emaar'},
              {src:'/images/nakheel.png',alt:'Nakheel'},
              {src:'/images/aldaar.png',alt:'Aldar Properties'},
              {src:'/images/damac.avif',alt:'DAMAC'},
              {src:'/images/dubai_properties.png',alt:'Dubai Properties'},
              {src:'/images/majid.png',alt:'Majid Al Futtaim'},
              {src:'/images/shoba.png',alt:'Sobha Realty'},
              {src:'/images/meraasholding.svg',alt:'Meraas'},
            ].map(l=>(
              <div key={l.alt} className="partner-logo">
                <img src={l.src} alt={l.alt}/>
              </div>
            ))}
            {[
              {src:'/images/emaar.png',alt:'Emaar2'},
              {src:'/images/nakheel.png',alt:'Nakheel2'},
              {src:'/images/aldaar.png',alt:'Aldar2'},
              {src:'/images/damac.avif',alt:'DAMAC2'},
              {src:'/images/dubai_properties.png',alt:'Dubai Properties2'},
              {src:'/images/majid.png',alt:'Majid2'},
              {src:'/images/shoba.png',alt:'Sobha2'},
              {src:'/images/meraasholding.svg',alt:'Meraas2'},
            ].map(l=>(
              <div key={l.alt} className="partner-logo">
                <img src={l.src} alt={l.alt}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta" style={{backgroundImage:"url('/images/last_hero_section1.jpeg')",backgroundSize:'cover',backgroundPosition:'center'}}>
        <div className="cta-overlay"/>
        <div className="cta-in rv">
          <div className="cta-tag">Start Today</div>
          <h2 className="cta-h">Ready to Control Your Project Costs?</h2>
          <p className="cta-p">Get in touch for a free, no-obligation initial consultation. Our senior consultants will respond within one business day.</p>
          <div className="cta-btns">
            <button className="btn-gold" onClick={()=>go('contact')}>Request a Consultation &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></button>
            <button className="btn-white" onClick={()=>go('services')}>View Our Services</button>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="cnt">
        <div className="wrap">
          <div className="rv"><div className="sec-tag">Get in Touch</div><h2 className="sec-h">Contact Us</h2><div className="sec-line"/></div>
          <div className="cnt-g">
            <div className="rv rl">
              <p className="sec-p" style={{marginBottom:'2.5rem'}}>Have a project in mind? Reach out and a senior consultant will respond within one business day with a no-obligation discussion of how we can help.</p>
              {CNTS.map(c=>(<div key={c.l} className="cnt-row"><div className="cnt-ico"><Svg d={c.d} s={18}/></div><div><div className="cnt-lbl">{c.l}</div><div className="cnt-val">{c.v}</div></div></div>))}
              <div className="cnt-note"><p><strong style={{color:'var(--gold)'}}>Response Guarantee —</strong> We respond to every enquiry within one business day. For urgent requirements please call us directly.</p></div>
            </div>
            <div className="rv rr d2">
              {sent ? (
                <div style={{textAlign:'center',padding:'3rem 1.5rem'}}>
                  <Svg d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" s={40} w={1.5}/>
                  <h3 style={{marginTop:'1rem',color:'var(--navy)'}}>Enquiry Sent Successfully</h3>
                  <p style={{color:'var(--muted)',marginTop:'.5rem'}}>Thank you for getting in touch. A senior consultant will respond within one business day.</p>
                </div>
              ) : (
                <>
              <div className="frow">
                <div className="fg"><label>First Name *</label><input type="text" placeholder="John" value={form.fn} onChange={e=>setForm({...form,fn:e.target.value})}/></div>
                <div className="fg"><label>Last Name</label><input type="text" placeholder="Smith" value={form.ln} onChange={e=>setForm({...form,ln:e.target.value})}/></div>
              </div>
              <div className="fg"><label>Email *</label><input type="email" placeholder="john@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              <div className="fg"><label>Service Required</label>
                <select value={form.svc} onChange={e=>setForm({...form,svc:e.target.value})}>
                  <option value="">Select a service...</option>
                  {SVCS.map(s=><option key={s.n}>{s.t}</option>)}
                </select>
              </div>
              <div className="fg"><label>Project Details *</label><textarea rows={5} placeholder="Tell us about your project — type, location, value and programme..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/></div>
              {formError && <p style={{color:'#e53e3e',fontSize:'.85rem',marginBottom:'.8rem'}}>{formError}</p>}
              <button className="btn-gold btn-full" onClick={handleSubmit} disabled={sending} style={sending?{opacity:.6,cursor:'not-allowed'}:{}}>
                {sending ? 'Sending...' : 'Send Enquiry'} &nbsp;{!sending && <Svg d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z" s={14}/>}
              </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ftr">
        <div className="ftr-main">
          <div className="ftr-main-in">
            <div className="ftr-brand">
              <div className="ftr-brand-logo"><Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={80} height={80} style={{objectFit:'contain'}}/></div>
              <div className="ftr-brand-name">Saif Elite QS</div>
              <div className="ftr-brand-sub">Quantity Surveyor &amp; Cost Consultant</div>
              <p className="ftr-brand-p">Independent QS and cost consultancy headquartered in Dubai, UAE, providing remote QS services across the UK, Ireland, New Zealand and Australia. Trusted by developers, contractors and investors across the UAE, GCC and internationally.</p>
              <div className="ftr-brand-contact">
                <a href={`tel:${PHONE}`}><Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" s={15}/>{PHONE}</a>
                <a href="mailto:info@saifeliteqs.com"><Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={15}/>info@saifeliteqs.com</a>
                <a href="#"><Svg d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" s={15}/>Dubai, UAE (HQ) · UK · Ireland · NZ · Australia (Remote)</a>
              </div>
              <div className="fsoc">
                <a href="https://www.linkedin.com/company/saif-elite-qs" target="_blank" rel="noreferrer" className="fsc" aria-label="LinkedIn"><Svg d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" s={15}/></a>
                <a href="https://www.facebook.com/people/Saif-Elite-QS/61590199756177/" target="_blank" rel="noreferrer" className="fsc" aria-label="Facebook"><Svg d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" s={15}/></a>
                <a href="https://www.instagram.com/saifeliteqs/" target="_blank" rel="noreferrer" className="fsc" aria-label="Instagram"><Svg d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" s={15}/></a>
              </div>
            </div>
            <div className="fcol">
              <h4>Services</h4>
              <ul>{SVCS.slice(0,6).map(s=>(<li key={s.n}><a href="#" onClick={e=>{e.preventDefault();go('services');}}>{s.t}</a></li>))}</ul>
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <ul>{[['About Us','about'],['Our Process','process'],['Projects','projects'],['Contact','contact']].map(([t,h])=>(<li key={t}><a href={`#${h}`} onClick={e=>{e.preventDefault();go(h);}}>{t}</a></li>))}</ul>
              <h4 style={{marginTop:'2rem'}}>Connect</h4>
              <ul>
                <li><a href={WA_LINK} target="_blank" rel="noreferrer">WhatsApp</a></li>
                <li><a href="https://www.linkedin.com/company/saif-elite-qs" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href="mailto:info@saifeliteqs.com">Email Us</a></li>
                <li><a href={`tel:${PHONE}`}>Call Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ftr-mid">
          <div className="ftr-mid-in">
            <ul className="ftr-mid-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
            <p style={{fontSize:'.7rem',color:'rgba(255,255,255,.25)'}}>RICS Aligned · Dubai, UAE</p>
          </div>
        </div>
        <div className="ftr-bot">
          <div className="ftr-bot-in">
            <p>© 2025 <span className="hl">Saif Elite QS</span>. All rights reserved.</p>
            <p>Quantity Surveyor &amp; Cost Consultant — Dubai (HQ) · UK · Ireland · NZ · Australia (Remote)</p>
          </div>
        </div>
      </footer>
    </>
  );
}
