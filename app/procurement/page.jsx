'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

/* ===== DATA ===== */

const OFFERS = [
  {
    n: '01',
    t: 'Building Materials Supply',
    d: 'Direct supply of premium construction materials sourced from certified manufacturers globally. From structural steel and concrete to finishing materials — we deliver to your project on schedule, on specification and on budget.',
    img: '/images/image1.jpg',
    pts: ['Certified manufacturer relationships', 'Material quality guaranteed', 'Reliable delivery scheduling'],
  },
  {
    n: '02',
    t: 'Procurement Strategy & Planning',
    d: 'End-to-end procurement guidance grounded in our quantity surveying expertise. We develop procurement routes, prepare tender strategies and manage supplier evaluation to achieve best commercial value on every package.',
    img: '/images/image10.webp',
    pts: ['Strategic procurement planning', 'Tender management', 'Supplier evaluation & selection'],
  },
  {
    n: '03',
    t: 'Supply Chain Management',
    d: 'Complete supply chain visibility from factory floor to construction site. We manage international logistics, customs clearance and delivery coordination so your project never stalls waiting for materials.',
    img: '/images/image2.jpg',
    pts: ['International logistics handling', 'Customs & clearance management', 'Real-time shipment tracking'],
  },
  {
    n: '04',
    t: 'Cost Optimisation & Value',
    d: 'Leverage our global supplier network and volume negotiating power to secure best-in-class pricing. We benchmark every package against market rates to ensure you receive genuine commercial value.',
    img: '/images/preview.jpg',
    pts: ['Volume-negotiated pricing', 'Market benchmarking', 'Value engineering input'],
  },
];

const SAVINGS = [
  { v:'15-25%', l:'Average Cost Reduction' },
  { v:'98%', l:'On-Time Delivery Rate' },
  { v:'18+', l:'Countries Covered' },
  { v:'200+', l:'Active Suppliers' },
];

const PROCESS_STEPS = [
  { n:'01', t:'Initial Procurement Brief', d:'We review your project specifications, programme and budget parameters to fully understand the procurement requirement before any sourcing begins.' },
  { n:'02', t:'Supplier Identification', d:'Drawing on our global supplier network across 18+ countries, we identify qualified suppliers and conduct due diligence on each shortlisted candidate.' },
  { n:'03', t:'Negotiation & Contracting', d:'We negotiate commercial terms, delivery schedules and quality standards, preparing supply contracts that protect your interests throughout the engagement.' },
  { n:'04', t:'Logistics & Delivery', d:'We coordinate international logistics, customs clearance and site delivery — managing every shipment through to arrival on your construction site.' },
  { n:'05', t:'Quality & Final Verification', d:'All materials are verified against specification on receipt. We resolve any discrepancies directly with suppliers, ensuring you receive exactly what was contracted.' },
];

const MATERIALS = [
  { t:'Structural Materials', d:'Reinforced steel, concrete, structural frameworks and rebar from certified mills.', img:'/images/image6.jpg' },
  { t:'Mechanical Systems', d:'HVAC equipment, plumbing systems, pumps and industrial mechanical packages.', img:'/images/image5.jpg' },
  { t:'Finishing Materials', d:'Premium marble, granite, tiles, glass and finishing materials for luxury projects.', img:'/images/image4.jpg' },
  { t:'Safety & Scaffolding', d:'Site scaffolding systems, safety equipment, formwork and temporary works.', img:'/images/image3.jpg' },
  { t:'Logistics & Shipping', d:'International freight, container shipping and consolidated cargo solutions worldwide.', img:'/images/image7.jpg' },
];

const REGIONS = [
  { region:'Europe', countries:['Germany','UK','Ireland','Italy','Spain','France','Belgium','Netherlands'] },
  { region:'Asia-Pacific', countries:['China','India','Japan','Vietnam','Thailand','Singapore','Indonesia','Australia','New Zealand'] },
  { region:'Middle East & Americas', countries:['UAE','Qatar','Saudi Arabia','Kuwait','USA','Canada'] },
];

const WHY_PROCURE = [
  'Direct manufacturer relationships eliminating middlemen and cost mark-ups',
  'Volume-negotiated pricing leveraging our global procurement power',
  'Reliable delivery schedules with contingency planning built in',
  'Quality assurance and inspection protocols on every shipment',
  'Customs clearance and logistics management for international cargo',
  'Local UAE expertise combined with global sourcing capability',
];

const CNTS = [
  { d:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'Head Office', v:'Dubai, United Arab Emirates' },
  { d:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z', l:'Phone', v:'+971 56 465 5043' },
  { d:'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6', l:'Email', v:'info@saifeliteqs.com' },
  { d:'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z', l:'Website', v:'www.saifeliteqs.com' },
];

const NAV = ['Home','Services','About','Procurement','Projects','Contact'];
const PHONE = '+97156465 5043';
const WA_LINK = 'https://wa.me/971564655043';

export default function ProcurementPage() {
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const run = () => document.querySelectorAll('.rv').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('on');
    });
    run();
    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  const goHome = (id) => {
    setMenu(false);
    window.location.href = `/#${id}`;
  };

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

    /* ===== FLOATING SOCIAL (SAME AS HOME) ===== */
    .float-social{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:500;display:flex;flex-direction:column;gap:0;}
    .float-social a{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--navy);color:#fff;text-decoration:none;transition:all var(--tr);border-bottom:1px solid rgba(255,255,255,.1);}
    .float-social a:hover{background:var(--gold);width:52px;}
    .float-social a.wa{background:#25D366;}
    .float-social a.wa:hover{background:#1ebe5d;}
    .float-social a:first-child{border-radius:0 4px 0 0;}
    .float-social a:last-child{border-radius:0 0 4px 0;border-bottom:none;}

    /* MOB FIXED BUTTONS */
    .mob-call{position:fixed;left:1rem;bottom:1.4rem;z-index:500;width:48px;height:48px;border-radius:50%;background:var(--navy);color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25);}
    .mob-wa{position:fixed;right:1rem;bottom:1.4rem;z-index:500;width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(37,211,102,.4);}

    /* ===== DESKTOP CALL BUBBLE (SAME AS HOME) — Animated golden pulse phone ===== */
    .call-bubble{position:fixed;right:1.5rem;top:50%;transform:translateY(-50%);z-index:500;display:flex;align-items:center;gap:0;text-decoration:none;}
    .call-bubble-ring{position:relative;width:52px;height:52px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;box-shadow:0 0 0 0 rgba(184,145,42,.6);animation:ringPulse 2s ease-out infinite;transition:all var(--tr);}
    .call-bubble:hover .call-bubble-ring{background:var(--gold-lt);}
    .call-bubble-ring svg{animation:ringShake 2s ease-in-out infinite;}
    @keyframes ringShake{
      0%,100%{transform:rotate(0deg);}
      10%{transform:rotate(-18deg);}
      20%{transform:rotate(18deg);}
      30%{transform:rotate(-12deg);}
      40%{transform:rotate(12deg);}
      50%{transform:rotate(0deg);}
    }
    @keyframes ringPulse{
      0%{box-shadow:0 0 0 0 rgba(184,145,42,.6);}
      70%{box-shadow:0 0 0 16px rgba(184,145,42,0);}
      100%{box-shadow:0 0 0 0 rgba(184,145,42,0);}
    }
    /* Ripple rings */
    .call-bubble-ring::before,.call-bubble-ring::after{
      content:'';position:absolute;border-radius:50%;
      border:2px solid rgba(184,145,42,.5);
      animation:ripple 2s ease-out infinite;
    }
    .call-bubble-ring::before{width:68px;height:68px;animation-delay:0s;}
    .call-bubble-ring::after{width:86px;height:86px;animation-delay:.4s;}
    @keyframes ripple{
      0%{transform:scale(.85);opacity:1;}
      100%{transform:scale(1.4);opacity:0;}
    }
    /* Label — slides in on hover */
    .call-bubble-label{
      background:var(--navy);color:#fff;
      padding:.5rem 1rem;border-radius:4px 0 0 4px;
      font-size:.72rem;font-weight:600;white-space:nowrap;
      max-width:0;overflow:hidden;opacity:0;
      transition:max-width .4s ease,opacity .4s ease,padding .4s ease;
      pointer-events:none;
    }
    .call-bubble:hover .call-bubble-label{max-width:180px;opacity:1;padding:.5rem 1rem;}
    .call-bubble-label span:first-child{font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;opacity:.65;display:block;}
    .call-bubble-label span:last-child{font-size:.8rem;font-weight:700;display:block;color:var(--gold-lt);}

    /* ===== NAV (SAME AS HOME) ===== */
    .nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;height:90px;padding:0 3rem;transition:all .4s;background:rgba(14,17,24,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(184,145,42,.2);}
    .nav.sc{height:72px;}
    .nlogo{display:flex;align-items:center;gap:.8rem;cursor:pointer;text-decoration:none;}
    .nlogo-txt{display:flex;flex-direction:column;line-height:1.2;}
    .nlogo-txt b{font-size:.85rem;font-weight:700;color:#fff;letter-spacing:.05em;text-transform:uppercase;}
    .nlogo-txt span{font-size:.56rem;color:rgba(255,255,255,.5);letter-spacing:.2em;text-transform:uppercase;}
    .nlinks{display:flex;align-items:center;gap:2.2rem;list-style:none;}
    .nlinks a{color:rgba(255,255,255,.7);text-decoration:none;font-size:.7rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;transition:color var(--tr);position:relative;padding-bottom:3px;cursor:pointer;}
    .nlinks a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold-lt);transition:width var(--tr);}
    .nlinks a:hover{color:#fff;}.nlinks a:hover::after{width:100%;}
    .nlinks a.active{color:var(--gold-lt);}
    .nlinks a.active::after{width:100%;}
    .nbtn{background:var(--gold);color:#fff;border:none;padding:.46rem 1.4rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .nbtn:hover{background:var(--gold-lt);}
    .burger{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:4px;}

    /* MOB MENU */
    .mob{display:none;position:fixed;inset:0;z-index:199;background:var(--dark);flex-direction:column;align-items:center;justify-content:center;gap:2rem;}
    .mob.on{display:flex;}
    .mob-x{position:absolute;top:1.4rem;right:1.6rem;background:none;border:none;color:rgba(255,255,255,.6);cursor:pointer;}
    .mob a{color:#fff;text-decoration:none;font-size:1.3rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:color var(--tr);cursor:pointer;}
    .mob a:hover{color:var(--gold-lt);}

    /* ===== BUTTONS (SAME AS HOME) ===== */
    .btn-gold{display:inline-flex;align-items:center;gap:.5rem;background:var(--gold);color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;font-family:inherit;transition:all var(--tr);position:relative;overflow:hidden;text-decoration:none;}
    .btn-gold::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transition:left .5s;}
    .btn-gold:hover{background:var(--gold-lt);transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,145,42,.3);}
    .btn-gold:hover::before{left:100%;}
    .btn-ol-gold{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold);padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid var(--gold);cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-ol-gold:hover{background:var(--gold);color:#fff;}
    .btn-white{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(255,255,255,.4);cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-white:hover{background:rgba(255,255,255,.1);border-color:#fff;}

    /* ===== HERO (SAME AS HOME) ===== */
    .hero{position:relative;width:100%;height:100vh;min-height:640px;overflow:hidden;}
    .hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(10,13,20,.88) 50%,rgba(10,13,20,.45) 100%);}
    .hero-cnt{position:relative;z-index:2;height:100%;max-width:1200px;margin:0 auto;padding:0 3rem;display:flex;flex-direction:column;justify-content:center;}
    .hero-tag{display:inline-flex;align-items:center;gap:.8rem;font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1.8rem;}
    .hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .hero-h{font-size:clamp(2.8rem,6vw,5rem);font-weight:700;line-height:1.08;color:#fff;font-family:Georgia,serif;margin-bottom:1.4rem;}
    .hero-h span{display:block;}.hero-h span:last-child{color:var(--gold-lt);}
    .hero-sub{font-size:1rem;color:rgba(255,255,255,.72);font-weight:300;max-width:500px;margin-bottom:3rem;line-height:1.75;}
    .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;}

    /* ===== STATS BAND (SAME AS HOME) ===== */
    .statsband{background:var(--white);padding:3.5rem 1.5rem;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
    .stat{text-align:center;padding:1rem 1.5rem;position:relative;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:var(--border);}
    .stat-v{font-size:2.6rem;font-weight:700;color:var(--gold);font-family:Georgia,serif;line-height:1;margin-bottom:.5rem;}
    .stat-l{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--txt2);}

    /* ===== SECTION BASE (SAME FONT/TEXT STYLE AS HOME) ===== */
    section{padding:7rem 1.5rem;}
    .wrap{max-width:1200px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;display:block;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.2rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;font-weight:400;line-height:1.82;max-width:560px;}

    /* ============================================ */
    /* ===== UNIQUE TEMPLATE 1: OFFERS — ALTERNATING SPLIT ===== */
    /* ============================================ */
    .offers{background:var(--off);padding:7rem 1.5rem;}
    .offers-head{text-align:center;margin-bottom:5rem;}
    .offers-head .sec-line{margin:1rem auto 1.2rem;}
    .offers-head .sec-p{margin:0 auto;}
    .offer-row{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:4rem;background:var(--white);box-shadow:0 4px 24px rgba(0,0,0,.04);overflow:hidden;}
    .offer-row:last-child{margin-bottom:0;}
    .offer-row.rev{direction:rtl;}
    .offer-row.rev > *{direction:ltr;}
    .offer-img{position:relative;min-height:420px;overflow:hidden;}
    .offer-img img{object-fit:cover;transition:transform 1s ease;}
    .offer-row:hover .offer-img img{transform:scale(1.05);}
    .offer-img::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(184,145,42,.05),transparent 60%);}
    .offer-txt{padding:3.5rem 3rem;display:flex;flex-direction:column;justify-content:center;position:relative;}
    .offer-n{font-size:4.5rem;font-weight:700;color:var(--gold);font-family:Georgia,serif;line-height:1;margin-bottom:1rem;opacity:.18;position:absolute;top:1.5rem;right:2rem;}
    .offer-t{font-size:1.5rem;font-weight:700;color:var(--navy);font-family:Georgia,serif;margin-bottom:1rem;line-height:1.25;}
    .offer-d{font-size:.88rem;color:var(--txt2);line-height:1.85;margin-bottom:1.6rem;}
    .offer-pts{list-style:none;display:flex;flex-direction:column;gap:.6rem;}
    .offer-pts li{display:flex;align-items:flex-start;gap:.6rem;font-size:.82rem;color:var(--txt2);}
    .offer-pts li::before{content:'';width:6px;height:6px;background:var(--gold);border-radius:50%;flex-shrink:0;margin-top:8px;}

    /* ============================================ */
    /* ===== UNIQUE TEMPLATE 2: WHY US — IMAGE BG WITH FLOATING CARD ===== */
    /* ============================================ */
    .why{position:relative;padding:0;overflow:hidden;background:var(--dark);}
    .why-inner{display:grid;grid-template-columns:1fr 1fr;min-height:680px;align-items:stretch;}
    .why-img{position:relative;overflow:hidden;}
    .why-img img{object-fit:cover;}
    .why-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to right,rgba(14,17,24,.4),rgba(14,17,24,.85));}
    .why-card{padding:5rem 4rem;display:flex;flex-direction:column;justify-content:center;background:var(--dark);position:relative;}
    .why-card::before{content:'';position:absolute;top:0;left:0;width:60px;height:3px;background:var(--gold);}
    .why-card .sec-tag{color:var(--gold-lt);}
    .why-card .sec-h{color:#fff;font-size:clamp(1.8rem,3vw,2.6rem);}
    .why-card .sec-p{color:rgba(255,255,255,.65);}
    .why-list-pro{margin-top:2rem;display:flex;flex-direction:column;gap:1rem;}
    .why-li{display:flex;align-items:flex-start;gap:.9rem;padding:1rem 1.2rem;background:rgba(255,255,255,.04);border-left:2px solid var(--gold);transition:all var(--tr);}
    .why-li:hover{background:rgba(255,255,255,.08);border-left-color:var(--gold-lt);transform:translateX(4px);}
    .why-li-chk{color:var(--gold-lt);flex-shrink:0;margin-top:2px;}
    .why-li-t{font-size:.82rem;color:rgba(255,255,255,.8);line-height:1.6;}

    /* ============================================ */
    /* ===== UNIQUE TEMPLATE 3: PROCESS — VERTICAL TIMELINE ===== */
    /* ============================================ */
    .proc{background:var(--white);padding:7rem 1.5rem;}
    .proc-head{text-align:center;margin-bottom:4rem;}
    .proc-head .sec-line{margin:1rem auto 1.2rem;}
    .proc-head .sec-p{margin:0 auto;}
    .timeline{position:relative;max-width:900px;margin:0 auto;padding:2rem 0;}
    .timeline::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,transparent,var(--gold),var(--gold-lt),var(--gold),transparent);transform:translateX(-50%);}
    .tl-row{position:relative;display:grid;grid-template-columns:1fr 100px 1fr;gap:0;margin-bottom:3rem;align-items:center;}
    .tl-row:last-child{margin-bottom:0;}
    .tl-content{padding:1.8rem 2rem;background:var(--off);border:1px solid var(--border);position:relative;transition:all var(--tr);}
    .tl-content:hover{border-color:var(--gold);transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.08);}
    .tl-content::after{content:'';position:absolute;top:50%;width:30px;height:2px;background:var(--gold);transform:translateY(-50%);}
    .tl-row.left .tl-content::after{right:-30px;}
    .tl-row.right .tl-content::after{left:-30px;}
    .tl-row.left .tl-content{grid-column:1;text-align:right;}
    .tl-row.right .tl-content{grid-column:3;text-align:left;}
    .tl-circle{grid-column:2;display:flex;align-items:center;justify-content:center;width:70px;height:70px;border-radius:50%;background:var(--gold);color:#fff;font-family:Georgia,serif;font-size:1.4rem;font-weight:700;margin:0 auto;position:relative;z-index:2;box-shadow:0 6px 24px rgba(184,145,42,.3);border:4px solid var(--white);}
    .tl-t{font-size:1.05rem;font-weight:700;color:var(--navy);font-family:Georgia,serif;margin-bottom:.5rem;}
    .tl-d{font-size:.82rem;color:var(--txt2);line-height:1.75;}

    /* ============================================ */
    /* ===== UNIQUE TEMPLATE 4: MATERIALS — IMAGE CARDS WITH HOVER OVERLAY ===== */
    /* ============================================ */
    .mat{background:var(--dark);padding:7rem 1.5rem;}
    .mat-head{text-align:center;margin-bottom:4rem;}
    .mat-head .sec-h{color:#fff;}
    .mat-head .sec-line{margin:1rem auto 1.2rem;}
    .mat-head .sec-p{margin:0 auto;color:rgba(255,255,255,.65);}
    .mat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:1200px;margin:0 auto;}
    .mat-card{position:relative;height:340px;overflow:hidden;cursor:pointer;border:1px solid rgba(255,255,255,.05);}
    .mat-card-img{position:absolute;inset:0;}
    .mat-card-img img{object-fit:cover;transition:transform .7s ease;}
    .mat-card:hover .mat-card-img img{transform:scale(1.1);}
    .mat-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,13,20,.95) 0%,rgba(10,13,20,.5) 50%,rgba(10,13,20,.2) 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.8rem;transition:background .4s ease;}
    .mat-card:hover .mat-card-overlay{background:linear-gradient(to top,rgba(10,13,20,.97) 0%,rgba(10,13,20,.85) 50%,rgba(10,13,20,.45) 100%);}
    .mat-card-tag{font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:.5rem;border-left:2px solid var(--gold);padding-left:.55rem;}
    .mat-card-t{font-size:1.15rem;font-weight:700;color:#fff;font-family:Georgia,serif;margin-bottom:.5rem;line-height:1.25;}
    .mat-card-d{font-size:.78rem;color:rgba(255,255,255,.7);line-height:1.65;max-height:0;overflow:hidden;opacity:0;transition:max-height .4s ease,opacity .4s ease;}
    .mat-card:hover .mat-card-d{max-height:120px;opacity:1;margin-top:.5rem;}

    /* ============================================ */
    /* ===== UNIQUE TEMPLATE 5: GLOBAL NETWORK — MAP BG WITH PILLS ===== */
    /* ============================================ */
    .net{position:relative;padding:7rem 1.5rem;background:#050811;overflow:hidden;}
    .net-bg{position:absolute;inset:0;opacity:.4;}
    .net-bg img{object-fit:cover;}
    .net-bg::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 0%,#050811 80%);}
    .net-inner{position:relative;z-index:2;max-width:1100px;margin:0 auto;}
    .net-head{text-align:center;margin-bottom:4rem;}
    .net-head .sec-tag{color:var(--gold-lt);}
    .net-head .sec-h{color:#fff;}
    .net-head .sec-line{margin:1rem auto 1.2rem;}
    .net-head .sec-p{margin:0 auto;color:rgba(255,255,255,.65);}
    .reg-blocks{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
    .reg-block{padding:2rem;background:rgba(255,255,255,.03);backdrop-filter:blur(10px);border:1px solid rgba(184,145,42,.15);transition:all var(--tr);}
    .reg-block:hover{border-color:var(--gold);background:rgba(255,255,255,.05);transform:translateY(-4px);}
    .reg-name{font-size:1.1rem;font-weight:700;color:var(--gold-lt);font-family:Georgia,serif;margin-bottom:1.2rem;display:flex;align-items:center;gap:.6rem;}
    .reg-name::before{content:'';width:6px;height:6px;background:var(--gold);border-radius:50%;box-shadow:0 0 12px var(--gold);}
    .reg-pills{display:flex;flex-wrap:wrap;gap:.4rem;}
    .reg-pill{font-size:.72rem;color:rgba(255,255,255,.75);padding:.32rem .8rem;background:rgba(184,145,42,.1);border:1px solid rgba(184,145,42,.2);border-radius:999px;transition:all var(--tr);}
    .reg-pill:hover{background:var(--gold);color:#fff;border-color:var(--gold);}

    /* ============================================ */
    /* ===== CTA (SAME AS HOME) ===== */
    /* ============================================ */
    .cta{position:relative;overflow:hidden;padding:7rem 1.5rem;text-align:center;}
    .cta-overlay{position:absolute;inset:0;z-index:1;background:rgba(10,13,20,.82);}
    .cta-in{position:relative;z-index:2;max-width:700px;margin:0 auto;}
    .cta-tag{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(212,170,64,.85);margin-bottom:1rem;}
    .cta-h{font-size:clamp(1.8rem,3.5vw,3rem);font-weight:700;color:#fff;margin-bottom:1rem;font-family:Georgia,serif;line-height:1.15;}
    .cta-p{color:rgba(255,255,255,.65);font-size:.9rem;font-weight:300;margin-bottom:2.5rem;line-height:1.8;}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

    /* ===== CONTACT ===== */
    .cnt{background:var(--white);}
    .cnt-g{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;margin-top:4rem;}
    .cnt-row{display:flex;gap:1rem;align-items:flex-start;}
    .cnt-ico{width:44px;height:44px;flex-shrink:0;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--gold);}
    .cnt-lbl{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.2rem;}
    .cnt-val{font-size:.82rem;color:var(--txt);font-weight:500;}

    /* ===== FOOTER (SAME AS HOME) ===== */
    .ftr{background:var(--dark);}
    .ftr-main{padding:5rem 1.5rem 3rem;}
    .ftr-main-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:3.5rem;}
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
    .fcol a{color:rgba(255,255,255,.5);text-decoration:none;font-size:.82rem;transition:color var(--tr);cursor:pointer;}
    .fcol a:hover{color:#fff;}
    .ftr-bot{padding:1.2rem 1.5rem;border-top:1px solid rgba(255,255,255,.07);}
    .ftr-bot-in{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.6rem;}
    .ftr-bot p{font-size:.7rem;color:rgba(255,255,255,.2);}
    .ftr-bot .hl{color:var(--gold-lt);}

    /* ===== RESPONSIVE ===== */
    @media(max-width:1100px){
      .nav{padding:0 2rem;}
      .hero-cnt{padding:0 2rem;}
      .offer-row{grid-template-columns:1fr;}
      .offer-row.rev{direction:ltr;}
      .offer-img{min-height:300px;}
      .offer-txt{padding:2.5rem 2rem;}
      .why-inner{grid-template-columns:1fr;}
      .why-img{min-height:300px;}
      .why-card{padding:3rem 2rem;}
      .mat-grid{grid-template-columns:repeat(2,1fr);}
      .reg-blocks{grid-template-columns:1fr;}
      .cnt-g{grid-template-columns:repeat(2,1fr);}
      .ftr-main-in{grid-template-columns:1fr 1fr;}
    }
    @media(max-width:768px){
      .float-social{display:none;}
      .mob-call{display:flex;}
      .mob-wa{display:flex;}
      .call-bubble{display:none!important;}
      .nav{padding:0 1.2rem;height:70px;}.nav.sc{height:60px;}
      .nlinks,.nbtn{display:none;}.burger{display:flex;}
      .hero-cnt{padding:0 1.4rem;}
      .stats-g{grid-template-columns:1fr 1fr;}
      .stat:nth-child(2)::after{display:none;}
      .offer-txt{padding:2rem 1.4rem;}
      .offer-n{font-size:3rem;top:1rem;right:1rem;}
      .timeline::before{left:30px;}
      .tl-row{grid-template-columns:60px 1fr!important;gap:1rem;}
      .tl-row.left .tl-content,.tl-row.right .tl-content{grid-column:2!important;text-align:left!important;}
      .tl-row.left .tl-content::after{left:-30px;right:auto;}
      .tl-circle{grid-column:1!important;width:60px;height:60px;font-size:1.1rem;}
      .mat-grid{grid-template-columns:1fr;}
      .mat-card{height:280px;}
      .mat-card-d{max-height:120px!important;opacity:1!important;margin-top:.5rem!important;}
      .cnt-g{grid-template-columns:1fr;}
      .ftr-main-in{grid-template-columns:1fr;gap:2.5rem;}
      section{padding:5rem 1.2rem;}
    }
    @media(max-width:480px){
      .stats-g{grid-template-columns:1fr 1fr;gap:.5rem;}
      .stat::after{display:none!important;}
      .hero-h{font-size:clamp(2rem,8vw,2.8rem);}
    }
  `;

  const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.5 2C6.253 2 2 6.253 2 11.5c0 1.894.549 3.659 1.497 5.145L2 22l5.488-1.478A9.46 9.46 0 0 0 11.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2z";

  return (
    <>
      <style>{CSS}</style>

      {/* FLOATING SOCIAL (SAME AS HOME) */}
      <div className="float-social">
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="wa" title="WhatsApp">
          <svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d={WA_PATH}/></svg>
        </a>
        <a href={`mailto:info@saifeliteqs.com`} title="Email"><Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={18}/></a>
        <a href="https://www.linkedin.com/company/saif-elite-qs" target="_blank" rel="noreferrer" title="LinkedIn"><Svg d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" s={18}/></a>
        <a href="https://www.instagram.com/saifeliteqs/" target="_blank" rel="noreferrer" title="Instagram"><Svg d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" s={18}/></a>
        <a href="https://www.facebook.com/people/Saif-Elite-QS/61590199756177/" target="_blank" rel="noreferrer" title="Facebook"><Svg d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" s={18}/></a>
      </div>

      {/* MOB BUTTONS */}
      <a href={`tel:${PHONE}`} className="mob-call" aria-label="Call"><Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" s={22}/></a>
      <a href={WA_LINK} target="_blank" rel="noreferrer" className="mob-wa" aria-label="WhatsApp">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="white"><path d={WA_PATH}/></svg>
      </a>

      {/* DESKTOP CALL BUBBLE — Animated golden pulse phone (SAME AS HOME) */}
      <a href={`tel:${PHONE}`} className="call-bubble" aria-label="Call us">
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

      {/* NAV (SAME AS HOME) */}
      <nav className={`nav ${sc?'sc':''}`}>
        <Link href="/" className="nlogo">
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={100} height={100} style={{objectFit:'contain'}} priority/>
          <div className="nlogo-txt"><b>Saif Elite QS</b><span>Quantity Surveyor &amp; Cost Consultant</span></div>
        </Link>
        <ul className="nlinks">
          {NAV.map(n=>(
            <li key={n}>
              <Link href={n === 'Home' ? '/' : `/${n.toLowerCase()}`} style={n==='Procurement'?{color:'var(--gold-lt)'}:{}}>{n}</Link>
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
            <Link href={n==='Home'?'/':`/${n.toLowerCase()}`} onClick={()=>setMenu(false)} style={n==='Procurement'?{color:'var(--gold-lt)'}:{}}>{n}</Link>
          </div>
        ))}
        <Link href="/contact" className="btn-gold" onClick={()=>setMenu(false)}>Contact Us</Link>
      </div>

      {/* HERO (SAME AS HOME) */}
      <section className="hero">
        <div style={{position:'absolute',inset:0,zIndex:0}}>
          <Image src="/images/dubai_port.jpg" alt="Procurement" fill sizes="100vw" style={{objectFit:'cover',objectPosition:'center'}} priority/>
        </div>
        <div className="hero-overlay"/>
        <div className="hero-cnt">
          <div className="hero-tag">Procurement &amp; Supply Chain Excellence</div>
          <h1 className="hero-h"><span>Strategic Sourcing.</span><span>Delivered Globally.</span></h1>
          <p className="hero-sub">Building materials procurement and supply chain management across 18+ countries</p>
          <div className="hero-btns">
            <button className="btn-gold" >Request a Quote &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></button>
            <a href="#offer" className="btn-white">What We Offer</a>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <div className="statsband">
        <div className="stats-g">
          {SAVINGS.map((s,i)=>(<div key={s.l} className={`stat rv d${i+1}`}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>))}
        </div>
      </div>

      {/* ===== UNIQUE TEMPLATE 1: OFFERS - ALTERNATING SPLIT ===== */}
      <section id="offer" className="offers">
        <div className="wrap">
          <div className="offers-head rv">
            <div className="sec-tag">What We Offer</div>
            <h2 className="sec-h">Procurement Services</h2>
            <div className="sec-line"/>
            <p className="sec-p">From direct material supply to complete supply chain management — a full procurement service tailored to your project requirements.</p>
          </div>
          {OFFERS.map((o,i)=>(
            <div key={o.n} className={`offer-row rv ${i%2===1?'rev':''}`}>
              <div className="offer-img">
                <Image src={o.img} alt={o.t} fill sizes="50vw"/>
              </div>
              <div className="offer-txt">
                <span className="offer-n">{o.n}</span>
                <h3 className="offer-t">{o.t}</h3>
                <p className="offer-d">{o.d}</p>
                <ul className="offer-pts">
                  {o.pts.map(p=><li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== UNIQUE TEMPLATE 2: WHY US - IMAGE BG + FLOATING CARD ===== */}
      <section className="why">
        <div className="why-inner">
          <div className="why-img rv rl">
            <Image src="/images/image9.jpg" alt="Why Choose Us" fill sizes="50vw"/>
          </div>
          <div className="why-card rv rr">
            <div className="sec-tag">Why Choose Us</div>
            <h2 className="sec-h">Strategic Procurement Partner</h2>
            <div className="sec-line"/>
            <p className="sec-p" style={{marginBottom:'.6rem'}}>Saif Elite QS combines quantity surveying expertise with global procurement capability — delivering materials and services that drive genuine project value.</p>
            <div className="why-list-pro">
              {WHY_PROCURE.map((w,i)=>(
                <div key={i} className="why-li">
                  <span className="why-li-chk"><Svg d="M20 6 9 17l-5-5" s={14} w={2.5}/></span>
                  <span className="why-li-t">{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== UNIQUE TEMPLATE 3: PROCESS - VERTICAL TIMELINE ===== */}
      <section className="proc">
        <div className="wrap">
          <div className="proc-head rv">
            <div className="sec-tag">How We Work</div>
            <h2 className="sec-h">Our Procurement Process</h2>
            <div className="sec-line"/>
            <p className="sec-p">A structured five-stage approach giving you complete visibility from initial brief through to final delivery on site.</p>
          </div>
          <div className="timeline">
            {PROCESS_STEPS.map((s,i)=>(
              <div key={s.n} className={`tl-row ${i%2===0?'left':'right'} rv`}>
                <div className="tl-content">
                  <div className="tl-t">{s.t}</div>
                  <div className="tl-d">{s.d}</div>
                </div>
                <div className="tl-circle">{s.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UNIQUE TEMPLATE 4: MATERIALS - IMAGE CARDS HOVER ===== */}
      <section className="mat">
        <div className="mat-head rv">
          <div className="sec-tag" style={{color:'var(--gold-lt)'}}>What We Supply</div>
          <h2 className="sec-h">Building Materials</h2>
          <div className="sec-line"/>
          <p className="sec-p">A comprehensive range of construction materials sourced directly from certified manufacturers — covering every requirement of modern construction projects.</p>
        </div>
        <div className="mat-grid">
          {MATERIALS.map((m,i)=>(
            <div key={m.t} className="mat-card rv">
              <div className="mat-card-img">
                <Image src={m.img} alt={m.t} fill sizes="33vw"/>
              </div>
              <div className="mat-card-overlay">
                <div className="mat-card-tag">Category {String(i+1).padStart(2,'0')}</div>
                <div className="mat-card-t">{m.t}</div>
                <div className="mat-card-d">{m.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== UNIQUE TEMPLATE 5: GLOBAL NETWORK - MAP BG WITH PILLS ===== */}
      <section className="net">
        <div className="net-bg">
          <Image src="/images/image8.jpg" alt="Global Network" fill sizes="100vw"/>
        </div>
        <div className="net-inner">
          <div className="net-head rv">
            <div className="sec-tag">Global Reach</div>
            <h2 className="sec-h">Worldwide Supplier Network</h2>
            <div className="sec-line"/>
            <p className="sec-p">Direct supplier relationships across Europe, Asia-Pacific and the Middle East — sourcing materials where quality and value align.</p>
          </div>
          <div className="reg-blocks">
            {REGIONS.map((r,i)=>(
              <div key={r.region} className={`reg-block rv d${i+1}`}>
                <div className="reg-name">{r.region}</div>
                <div className="reg-pills">
                  {r.countries.map(c=>(<span key={c} className="reg-pill">{c}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (SAME AS HOME) */}
      <div className="cta" style={{backgroundImage:"url('/images/orig.jpg')",backgroundSize:'cover',backgroundPosition:'center'}}>
        <div className="cta-overlay"/>
        <div className="cta-in rv">
          <div className="cta-tag">Start Today</div>
          <h2 className="cta-h">Ready to Optimise Your Supply Chain?</h2>
          <p className="cta-p">Get in touch for a no-obligation procurement consultation. Our team will respond within one business day with a tailored solution.</p>
          <div className="cta-btns">
            <button className="btn-gold" >Request a Quote &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></button>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-white">WhatsApp Us</a>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section className="cnt">
        <div className="wrap">
          <div className="rv"><div className="sec-tag">Get in Touch</div><h2 className="sec-h">Contact Us</h2><div className="sec-line"/><p className="sec-p">Reach out for procurement and supply chain enquiries. Our team responds within one business day.</p></div>
          <div className="cnt-g">
            {CNTS.map((c,i)=>(<div key={c.l} className={`cnt-row rv d${i+1}`}><div className="cnt-ico"><Svg d={c.d} s={18}/></div><div><div className="cnt-lbl">{c.l}</div><div className="cnt-val">{c.v}</div></div></div>))}
          </div>
        </div>
      </section>

      {/* FOOTER (SAME AS HOME) */}
      <footer className="ftr">
        <div className="ftr-main">
          <div className="ftr-main-in">
            <div className="ftr-brand">
              <div className="ftr-brand-logo"><Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={80} height={80} style={{objectFit:'contain'}}/></div>
              <div className="ftr-brand-name">Saif Elite QS</div>
              <div className="ftr-brand-sub">Quantity Surveyor &amp; Cost Consultant</div>
              <p className="ftr-brand-p">Independent QS, cost consultancy and procurement services headquartered in Dubai, UAE, with global supplier network across 18+ countries.</p>
              <div className="ftr-brand-contact">
                <a href={`tel:${PHONE}`}><Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" s={15}/>{PHONE}</a>
                <a href="mailto:info@saifeliteqs.com"><Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={15}/>info@saifeliteqs.com</a>
              </div>
              <div className="fsoc">
                <a href="https://www.linkedin.com/company/saif-elite-qs" target="_blank" rel="noreferrer" className="fsc" aria-label="LinkedIn"><Svg d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" s={15}/></a>
                <a href="https://www.facebook.com/people/Saif-Elite-QS/61590199756177/" target="_blank" rel="noreferrer" className="fsc" aria-label="Facebook"><Svg d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" s={15}/></a>
                <a href="https://www.instagram.com/saifeliteqs/" target="_blank" rel="noreferrer" className="fsc" aria-label="Instagram"><Svg d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" s={15}/></a>
              </div>
            </div>
            <div className="fcol">
              <h4>Procurement</h4>
              <ul>
                <li><a href="#offer">Building Materials Supply</a></li>
                <li><a href="#offer">Procurement Strategy</a></li>
                <li><a href="#offer">Supply Chain Management</a></li>
                <li><a href="#offer">Cost Optimisation</a></li>
              </ul>
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><a >Services</a></li>
                <li><a >About Us</a></li>
                <li><a >Projects</a></li>
                <li><a >Contact</a></li>
              </ul>
            </div>
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
