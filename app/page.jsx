'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

/* ── SVG helper ── */
const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

/* ── Process Icons (SVG paths) ── */
const PROC_ICONS = [
  "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2", // clipboard
  "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83", // target/brief
  "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8", // document
  "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", // construction/book
  "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3", // checkmark/final
];

/* ── DATA ── */
const SLIDES = [
  { tag: 'Quantity Surveying & Cost Consultancy', h1: 'Global Vision.', h2: 'Local Expertise.', sub: 'Precision cost management delivered across the UAE and GCC', img: '/images/hero_section1.jpg' },
  { tag: 'Proactive Approach · Diligent Delivery', h1: 'Protecting Your', h2: 'Investment.', sub: 'From initial concept through to final account — complete cost control', img: '/images/hero_section2.jpg' },
  { tag: 'Superior Results · Every Project', h1: 'Expert QS Services', h2: 'You Can Trust.', sub: 'Over a decade of excellence in the UAE built environment', img: '/images/hero_section3.jpeg' },
];

const SVCS = [
  { n: '01', t: 'Cost Planning & Estimation', d: 'Detailed estimates and cost plans at every design stage — from initial feasibility through to tender, providing reliable budget benchmarks throughout the project lifecycle.' },
  { n: '02', t: 'Bill of Quantities', d: 'Precisely measured Bills of Quantities prepared to standard methods of measurement, forming a transparent basis for tendering, procurement and ongoing cost control.' },
  { n: '03', t: 'Contract Administration', d: 'Expert management of construction contracts — interim valuations, variation assessment, claims handling and final account negotiation to protect your interests.' },
  { n: '04', t: 'Project Cost Management', d: 'Proactive monitoring, forecasting and reporting throughout construction, keeping your budget on track and identifying commercial risks before they become costly.' },
  { n: '05', t: 'Dispute Resolution', d: 'Professional quantum preparation and independent review for disputes, adjudications and arbitrations — protecting your commercial position at every stage.' },
  { n: '06', t: 'Feasibility Studies', d: 'Robust financial viability assessments and investment appraisals providing the clarity needed to make sound project decisions before committing capital.' },
  { n: '07', t: 'Procurement Strategy', d: 'Guidance on the most appropriate procurement routes, contract forms and tendering strategies to achieve best value and minimise commercial risk.' },
  { n: '08', t: 'Value Engineering', d: 'Structured cost reduction exercises identifying opportunities to reduce expenditure without compromising design intent, quality or construction programme.' },
];

const STATS = [
  { v: '10+', l: 'Years of Experience' },
  { v: '200+', l: 'Projects Delivered' },
  { v: 'AED 2B+', l: 'Total Value Managed' },
  { v: '98%', l: 'Client Satisfaction' },
];

const PROC = [
  { t: 'Initial Brief', d: 'We begin by fully understanding your project objectives, programme, budget parameters and procurement strategy before anything else.' },
  { t: 'Cost Plan', d: 'A robust cost plan is established with appropriate risk allowances and contingencies, setting clear financial benchmarks from the outset.' },
  { t: 'Tender Management', d: 'We prepare tender documentation, manage the process, evaluate returns and provide a recommendation on contractor selection.' },
  { t: 'Construction Phase', d: 'Ongoing cost monitoring, variation assessment, interim valuations and regular cost reporting throughout the build programme.' },
  { t: 'Final Account', d: 'We negotiate and agree the final account, ensuring all entitlements are properly assessed and financial exposure minimised.' },
];

const PROJS = [
  { tag: 'Residential', n: 'Luxury Villa Complex', loc: 'Dubai Hills, Dubai', v: 'AED 45M', d: '24-unit luxury villa development. Full QS services from inception to final account.', img: '/images/project1.jpg' },
  { tag: 'Commercial', n: 'Grade A Office Tower', loc: 'DIFC, Dubai', v: 'AED 280M', d: '38-storey premium office tower. Complete cost management and contract administration.', img: '/images/project2.jpg' },
  { tag: 'Mixed-Use', n: 'Retail & Hospitality Scheme', loc: 'JBR, Dubai', v: 'AED 120M', d: 'Mixed-use retail and hotel development. Tender management and cost control.', img: '/images/project3.jpeg' },
  { tag: 'Infrastructure', n: 'Road & Utilities Package', loc: 'Abu Dhabi', v: 'AED 90M', d: "Employer's QS services for a major road infrastructure and utilities upgrade.", img: '/images/project4.jpeg' },
  { tag: 'Residential', n: 'High-Rise Apartment Tower', loc: 'Business Bay, Dubai', v: 'AED 175M', d: '52-storey residential tower. Post-contract cost management and monthly reporting.', img: '/images/project5.jpeg' },
  { tag: 'Construction', n: 'Mixed Development', loc: 'Dubai, UAE', v: 'AED 32M', d: 'Specialist QS services covering all phases from feasibility to final account.', img: '/images/project6.jpeg' },
];

const WHY = [
  'RICS-aligned professional standards on every commission',
  'Dedicated senior QS assigned throughout your project',
  'Deep knowledge of UAE and GCC construction markets',
  'Transparent reporting — no surprises at final account',
  'Proactive risk identification before problems escalate',
  'Proven track record across all major construction sectors',
];

const CNTS = [
  { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l: 'Office', v: 'Dubai, United Arab Emirates' },
  { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z', l: 'Phone', v: '+971 XX XXX XXXX' },
  { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6', l: 'Email', v: 'info@saifeliteqs.com' },
  { d: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z', l: 'Website', v: 'www.saifeliteqs.com' },
];

const NAV = ['Home', 'Services', 'About', 'Process', 'Projects', 'Contact'];

/* ════════════════════════════════════ */
export default function Page() {
  const [sl, setSl] = useState(0);
  const [anim, setAnim] = useState(true);
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [form, setForm] = useState({ fn: '', ln: '', email: '', svc: '', msg: '' });
  const timer = useRef(null);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const next = useCallback(() => {
    setAnim(false);
    setTimeout(() => { setSl(p => (p + 1) % SLIDES.length); setAnim(true); }, 400);
  }, []);

  useEffect(() => {
    timer.current = setInterval(next, 6000);
    return () => clearInterval(timer.current);
  }, [next]);

  useEffect(() => {
    const run = () => document.querySelectorAll('.rv').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('on');
    });
    run();
    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  const go = (id) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    :root{
      --gold:#b8912a;--gold-lt:#d4aa40;--gold-dk:#8a6820;
      --navy:#1a1f2e;--navy2:#252b3a;
      --dark:#0e1118;
      --white:#ffffff;--off:#f7f6f3;--light:#efefed;
      --txt:#1e1e1e;--txt2:#444;--muted:#777;
      --border:#e2ddd6;
      --tr:.3s ease;
    }
    body{background:var(--white);color:var(--txt);font-family:'Segoe UI',system-ui,-apple-system,sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--light)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}

    /* REVEAL */
    .rv{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease;}
    .rv.on{opacity:1;transform:none;}
    .rv.rl{transform:translateX(-28px);}.rv.rl.on{transform:none;}
    .rv.rr{transform:translateX(28px);}.rv.rr.on{transform:none;}
    .rv.scale{transform:scale(.95);}.rv.scale.on{transform:scale(1);}
    .d1{transition-delay:.06s}.d2{transition-delay:.12s}.d3{transition-delay:.18s}
    .d4{transition-delay:.24s}.d5{transition-delay:.3s}.d6{transition-delay:.36s}

    /* NAV */
    .nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;height:80px;padding:0 3rem;transition:all .4s;}
    .nav.sc{background:rgba(14,17,24,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(184,145,42,.2);height:68px;}
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

    /* MOBILE */
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
    .btn-dark{display:inline-flex;align-items:center;gap:.5rem;background:var(--navy);color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .btn-dark:hover{background:var(--navy2);transform:translateY(-1px);}
    .btn-ol-dark{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--navy);padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid var(--navy);cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .btn-ol-dark:hover{background:var(--navy);color:#fff;}
    .btn-ol-gold{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold);padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid var(--gold);cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .btn-ol-gold:hover{background:var(--gold);color:#fff;}
    .btn-white{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(255,255,255,.4);cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .btn-white:hover{background:rgba(255,255,255,.1);border-color:#fff;}
    .btn-full{width:100%;justify-content:center;padding:.9rem;}

    /* HERO */
    .hero{position:relative;width:100%;height:100vh;min-height:640px;overflow:hidden;}
    .hero-bg{position:absolute;inset:0;z-index:0;transition:opacity .6s ease;}
    .hero-bg img{object-fit:cover;object-position:center;}
    .hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(10,13,20,.88) 50%,rgba(10,13,20,.45) 100%);}
    .hero-cnt{position:relative;z-index:2;height:100%;max-width:1200px;margin:0 auto;padding:0 3rem;display:flex;flex-direction:column;justify-content:center;}
    .hero-tag{display:inline-flex;align-items:center;gap:.8rem;font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1.8rem;transition:opacity .4s,transform .4s;}
    .hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .hero-tag.out,.hero-h.out,.hero-sub.out{opacity:0;transform:translateY(12px);}
    .hero-h{font-size:clamp(2.8rem,6vw,5rem);font-weight:700;line-height:1.08;color:#fff;font-family:Georgia,'Times New Roman',serif;margin-bottom:1.4rem;transition:opacity .4s,transform .4s;}
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

    /* STATS */
    .statsband{background:var(--navy);padding:3.5rem 1.5rem;}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
    .stat{text-align:center;padding:1rem 1.5rem;position:relative;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:rgba(255,255,255,.1);}
    .stat-v{font-size:2.6rem;font-weight:700;color:var(--gold-lt);font-family:Georgia,serif;line-height:1;margin-bottom:.3rem;}
    .stat-l{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);}

    /* SECTION */
    section{padding:8rem 1.5rem;}
    .wrap{max-width:1100px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.2rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;font-weight:400;line-height:1.82;max-width:560px;}

    /* SERVICES — dark navy bg */
    .svc{background:var(--navy);}
    .svc .sec-h{color:#fff;}
    .svc .sec-p{color:rgba(255,255,255,.6);}
    .svc-hd{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem;margin-bottom:4rem;padding-bottom:2rem;border-bottom:1px solid rgba(255,255,255,.1);}
    .svc-grid{display:grid;grid-template-columns:repeat(4,1fr);}
    .svc-card{
      padding:2rem 1.6rem;border-right:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);
      position:relative;overflow:hidden;transition:background var(--tr),transform var(--tr);
      cursor:default;
    }
    .svc-card:nth-child(4n){border-right:none;}
    .svc-card:nth-last-child(-n+4){border-bottom:none;}
    .svc-card::after{content:'';position:absolute;top:0;left:0;width:0;height:3px;background:linear-gradient(to right,var(--gold),var(--gold-lt));transition:width .5s ease;}
    .svc-card:hover{background:rgba(255,255,255,.04);transform:translateY(-3px);}
    .svc-card:hover::after{width:100%;}
    .svc-n{font-size:.58rem;color:var(--gold-lt);letter-spacing:.22em;font-weight:700;margin-bottom:.9rem;opacity:.7;}
    .svc-t{font-size:.9rem;font-weight:700;color:#fff;margin-bottom:.6rem;font-family:Georgia,serif;line-height:1.3;}
    .svc-d{font-size:.8rem;color:rgba(255,255,255,.55);line-height:1.75;}

    /* ABOUT */
    .abt{background:var(--off);padding:0;}
    .abt-g{display:grid;grid-template-columns:1fr 1fr;min-height:580px;}
    .abt-img{position:relative;overflow:hidden;min-height:500px;}
    .abt-img img{object-fit:cover;object-position:center;}
    .abt-img::after{content:'';position:absolute;top:0;right:0;width:4px;height:100%;background:var(--gold);}
    .abt-txt{padding:6rem 4.5rem;display:flex;flex-direction:column;justify-content:center;}
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

    /* PROJECTS */
    .prj{background:var(--off);}
    .prj-hd{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3.5rem;padding-bottom:2rem;border-bottom:1px solid var(--border);}
    .prj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
    .prj-card{background:var(--white);overflow:hidden;transition:all var(--tr);box-shadow:0 2px 12px rgba(0,0,0,.06);}
    .prj-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.12);}
    .prj-img{width:100%;aspect-ratio:16/10;position:relative;overflow:hidden;}
    .prj-img img{object-fit:cover;object-position:center;transition:transform .6s ease;}
    .prj-card:hover .prj-img img{transform:scale(1.05);}
    .prj-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(10,13,20,.65));}
    .prj-tag-badge{position:absolute;bottom:.8rem;left:.8rem;z-index:1;font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-lt);background:rgba(10,13,20,.75);padding:.22rem .65rem;border-left:2px solid var(--gold);}
    .prj-body{padding:1.6rem;}
    .prj-name{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.2rem;font-family:Georgia,serif;}
    .prj-loc{font-size:.7rem;color:var(--muted);margin-bottom:.5rem;}
    .prj-val{font-size:.76rem;color:var(--gold);font-weight:700;margin-bottom:.5rem;}
    .prj-desc{font-size:.78rem;color:var(--txt2);line-height:1.68;}

    /* CTA — bg image */
    .cta{position:relative;overflow:hidden;padding:8rem 1.5rem;text-align:center;}
    .cta-bg{position:absolute;inset:0;z-index:0;}
    .cta-bg img{object-fit:cover;object-position:center;}
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

    /* FOOTER — dark, pure white text */
    .ftr{background:var(--dark);padding:0;}
    .ftr-top{background:var(--navy);padding:4rem 1.5rem;}
    .ftr-top-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:4rem;align-items:start;}
    .ftr-brand p{font-size:.84rem;color:rgba(255,255,255,.55);line-height:1.8;margin-top:1rem;max-width:280px;}
    .ftr-brand-name{font-size:1.1rem;font-weight:700;color:#fff;letter-spacing:.05em;text-transform:uppercase;margin-top:1rem;}
    .ftr-brand-sub{font-size:.6rem;color:rgba(255,255,255,.4);letter-spacing:.18em;text-transform:uppercase;}
    .fsoc{display:flex;gap:.7rem;margin-top:1.6rem;}
    .fsc{width:36px;height:36px;border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.45);transition:all var(--tr);text-decoration:none;}
    .fsc:hover{border-color:var(--gold-lt);color:var(--gold-lt);}
    .fcol h4{font-size:.62rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1.4rem;font-weight:700;}
    .fcol ul{list-style:none;}.fcol li{margin-bottom:.8rem;}
    .fcol a{color:rgba(255,255,255,.55);text-decoration:none;font-size:.84rem;transition:color var(--tr);}
    .fcol a:hover{color:#fff;}
    .ftr-bot{background:var(--dark);padding:1.4rem 1.5rem;border-top:1px solid rgba(255,255,255,.06);}
    .ftr-bot-in{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;}
    .ftr-bot p{font-size:.72rem;color:rgba(255,255,255,.25);}
    .ftr-bot .hl{color:var(--gold-lt);}

    /* RESPONSIVE */
    @media(max-width:1100px){
      .nav{padding:0 2rem;}.hero-cnt{padding:0 2rem;}
      .hero-nav{left:2rem;}.hero-scrl{right:2rem;}
      .svc-grid{grid-template-columns:repeat(2,1fr);}
      .svc-card:nth-child(4n){border-right:1px solid rgba(255,255,255,.08);}
      .svc-card:nth-child(2n){border-right:none!important;}
      .svc-card:nth-last-child(-n+4){border-bottom:1px solid rgba(255,255,255,.08);}
      .svc-card:nth-last-child(-n+2){border-bottom:none!important;}
      .abt-g{grid-template-columns:1fr;}.abt-img{min-height:350px;}
      .abt-txt{padding:4rem 2.5rem;}
      .proc-grid{grid-template-columns:repeat(3,1fr);}
      .pstep:nth-child(3){border-right:none;}
      .prj-grid{grid-template-columns:repeat(2,1fr);}
      .cnt-g{grid-template-columns:1fr;gap:3rem;}
      .ftr-top-in{grid-template-columns:1fr 1fr;}
    }
    @media(max-width:768px){
      .nav{padding:0 1.2rem;height:66px;}.nav.sc{height:58px;}
      .nlinks,.nbtn{display:none;}.burger{display:flex;}
      .hero-cnt{padding:0 1.4rem;max-width:100%;}
      .hero-nav{left:1.4rem;bottom:2rem;}.hero-scrl{right:1.4rem;bottom:2rem;display:none;}
      .stats-g{grid-template-columns:1fr 1fr;}
      .stat:nth-child(2)::after{display:none;}
      .svc-grid{grid-template-columns:1fr;}
      .svc-card{border-right:none!important;}
      .proc-grid{grid-template-columns:1fr;}
      .pstep{border-right:none;border-bottom:1px solid var(--border);}
      .pstep:last-child{border-bottom:none;}
      .prj-grid{grid-template-columns:1fr;}
      .frow{grid-template-columns:1fr;}
      .ftr-top-in{grid-template-columns:1fr;gap:2.5rem;}
      section{padding:5rem 1.2rem;}
      .svc-hd,.prj-hd{flex-direction:column;align-items:flex-start;}
      .abt-txt{padding:3rem 1.4rem;}
    }
    @media(max-width:480px){
      .stats-g{grid-template-columns:1fr 1fr;gap:.5rem;}
      .stat::after{display:none!important;}
      .hero-h{font-size:clamp(2rem,8vw,2.8rem);}
    }
  `;

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav ${sc ? 'sc' : ''}`}>
        <div className="nlogo" onClick={() => go('home')}>
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={90} height={90} style={{ objectFit: 'contain' }} priority />
          <div className="nlogo-txt">
            <b>Saif Elite QS</b>
            <span>Quantity Surveyor &amp; Cost Consultant</span>
          </div>
        </div>
        <ul className="nlinks">
          {NAV.map(n => (
            <li key={n}><a href={`#${n.toLowerCase()}`} onClick={e => { e.preventDefault(); go(n.toLowerCase()); }}>{n}</a></li>
          ))}
        </ul>
        <button className="nbtn" onClick={() => go('contact')}>Contact Us</button>
        <button className="burger" onClick={() => setMenu(true)}><Svg d="M3 12h18M3 6h18M3 18h18" s={24} /></button>
      </nav>

      {/* MOBILE */}
      <div className={`mob ${menu ? 'on' : ''}`}>
        <button className="mob-x" onClick={() => setMenu(false)}><Svg d="M18 6 6 18M6 6l12 12" s={26} /></button>
        {NAV.map(n => (<a key={n} href="#" onClick={e => { e.preventDefault(); go(n.toLowerCase()); }}>{n}</a>))}
        <button className="btn-gold" onClick={() => { go('contact'); setMenu(false); }}>Contact Us</button>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        {SLIDES.map((s, i) => (
          <div key={i} className="hero-bg" style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: i === sl ? 1 : 0, transition: 'opacity .6s ease' }}>
            <Image src={s.img} alt={s.tag} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} priority={i === 0} />
          </div>
        ))}
        <div className="hero-overlay" />
        <div className="hero-cnt">
          <div className={`hero-tag ${anim ? '' : 'out'}`}>{SLIDES[sl].tag}</div>
          <h1 className={`hero-h ${anim ? '' : 'out'}`}>
            <span>{SLIDES[sl].h1}</span>
            <span>{SLIDES[sl].h2}</span>
          </h1>
          <p className={`hero-sub ${anim ? '' : 'out'}`}>{SLIDES[sl].sub}</p>
          <div className="hero-btns">
            <button className="btn-gold" onClick={() => go('contact')}>Free Consultation &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14} /></button>
            <button className="btn-white" onClick={() => go('services')}>Our Services</button>
          </div>
        </div>
        <div className="hero-nav">
          {SLIDES.map((_, i) => (
            <button key={i} className={`hnav-btn ${i === sl ? 'a' : ''}`}
              onClick={() => { clearInterval(timer.current); setAnim(false); setTimeout(() => { setSl(i); setAnim(true); }, 400); }}>
              <div className="hnav-bar" /><span>{String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
        <div className="hero-scrl"><div className="scrl-ln" /><div className="scrl-txt">Scroll</div></div>
      </section>

      {/* STATS */}
      <div className="statsband">
        <div className="stats-g">
          {STATS.map((s, i) => (
            <div key={s.l} className={`stat rv d${i + 1}`}>
              <div className="stat-v">{s.v}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="svc">
        <div className="wrap">
          <div className="svc-hd">
            <div className="rv">
              <div className="sec-tag">What We Do</div>
              <h2 className="sec-h">Our Services</h2>
              <div className="sec-line" />
              <p className="sec-p">From initial feasibility through to final account — a complete range of QS and cost consultancy services tailored to your project.</p>
            </div>
            <button className="btn-ol-gold rv d2" onClick={() => go('contact')}>Discuss Your Project &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={13} /></button>
          </div>
          <div className="svc-grid">
            {SVCS.map((s, i) => (
              <div key={s.n} className={`svc-card rv d${(i % 4) + 1}`}>
                <div className="svc-n">{s.n}</div>
                <div className="svc-t">{s.t}</div>
                <div className="svc-d">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="abt">
        <div style={{ maxWidth: '100%' }}>
          <div className="abt-g">
            <div className="abt-img rv rl" style={{ position: 'relative' }}>
              <Image src="/images/about_section1.jpeg" alt="About Saif Elite QS" fill sizes="50vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
            </div>
            <div className="abt-txt rv rr">
              <div className="sec-tag">Who We Are</div>
              <h2 className="sec-h">About Saif Elite QS</h2>
              <div className="sec-line" />
              <p className="sec-p" style={{ marginBottom: '1rem' }}>Saif Elite QS is a specialist quantity surveying and cost consultancy practice based in Dubai, serving clients across the UAE and GCC. We bring rigorous commercial discipline to every project — whether a boutique residential development or a landmark commercial scheme.</p>
              <p className="sec-p" style={{ marginBottom: '1rem' }}>Founded on the principles of transparency, accuracy and client-first service, our qualified team delivers measurable value at every stage. We work alongside developers, contractors, architects and project managers to ensure cost is always controlled and every decision is fully informed.</p>
              <p className="sec-p">Our approach combines deep local market knowledge with internationally recognised professional standards.</p>
              <div className="why-list">
                {WHY.map((w, i) => (
                  <div key={i} className="why-row">
                    <span className="why-chk"><Svg d="M20 6 9 17l-5-5" s={14} w={2.5} /></span>
                    <span className="why-t">{w}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2.2rem' }}>
                <button className="btn-gold" onClick={() => go('contact')}>Work With Us &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="proc">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">How We Work</div>
            <h2 className="sec-h">Our Process</h2>
            <div className="sec-line" />
            <p className="sec-p">A structured, transparent approach that gives you complete visibility and control over your project costs from inception through to final account.</p>
          </div>
          <div className="proc-grid">
            {PROC.map((p, i) => (
              <div key={p.t} className={`pstep rv d${i + 1}`}>
                <div className="pstep-bar" />
                <div className="pstep-ico">
                  <Svg d={PROC_ICONS[i]} s={22} w={1.5} />
                </div>
                <div className="pstep-t">{p.t}</div>
                <div className="pstep-d">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="prj">
        <div className="wrap">
          <div className="prj-hd">
            <div className="rv">
              <div className="sec-tag">Our Work</div>
              <h2 className="sec-h">Featured Projects</h2>
              <div className="sec-line" />
            </div>
            <button className="btn-ol-dark rv d2" style={{ fontSize: '.7rem' }}>View All &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={13} /></button>
          </div>
          <div className="prj-grid">
            {PROJS.map((p, i) => (
              <div key={p.n} className={`prj-card rv d${(i % 3) + 1}`}>
                <div className="prj-img">
                  <Image src={p.img} alt={p.n} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  <div className="prj-tag-badge">{p.tag}</div>
                </div>
                <div className="prj-body">
                  <div className="prj-name">{p.n}</div>
                  <div className="prj-loc">{p.loc}</div>
                  <div className="prj-val">{p.v}</div>
                  <div className="prj-desc">{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — real bg image */}
      <div className="cta">
        <div className="cta-bg" style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/last_hero_section1.jpeg" alt="CTA background" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
        </div>
        <div className="cta-overlay" />
        <div className="cta-in rv">
          <div className="cta-tag">Start Today</div>
          <h2 className="cta-h">Ready to Control Your Project Costs?</h2>
          <p className="cta-p">Get in touch for a free, no-obligation initial consultation. Our senior consultants will respond within one business day.</p>
          <div className="cta-btns">
            <button className="btn-gold" onClick={() => go('contact')}>Request a Consultation &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14} /></button>
            <button className="btn-white" onClick={() => go('services')}>View Our Services</button>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="cnt">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">Get in Touch</div>
            <h2 className="sec-h">Contact Us</h2>
            <div className="sec-line" />
          </div>
          <div className="cnt-g">
            <div className="rv rl">
              <p className="sec-p" style={{ marginBottom: '2.5rem' }}>Have a project in mind? Reach out and a senior consultant will respond within one business day with a no-obligation discussion of how we can help.</p>
              {CNTS.map(c => (
                <div key={c.l} className="cnt-row">
                  <div className="cnt-ico"><Svg d={c.d} s={18} /></div>
                  <div><div className="cnt-lbl">{c.l}</div><div className="cnt-val">{c.v}</div></div>
                </div>
              ))}
              <div className="cnt-note">
                <p><strong style={{ color: 'var(--gold)' }}>Response Guarantee —</strong> We respond to every enquiry within one business day. For urgent requirements please call us directly.</p>
              </div>
            </div>
            <div className="rv rr d2">
              <div className="frow">
                <div className="fg"><label>First Name</label><input type="text" placeholder="John" value={form.fn} onChange={e => setForm({ ...form, fn: e.target.value })} /></div>
                <div className="fg"><label>Last Name</label><input type="text" placeholder="Smith" value={form.ln} onChange={e => setForm({ ...form, ln: e.target.value })} /></div>
              </div>
              <div className="fg"><label>Email</label><input type="email" placeholder="john@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div className="fg">
                <label>Service Required</label>
                <select value={form.svc} onChange={e => setForm({ ...form, svc: e.target.value })}>
                  <option value="">Select a service...</option>
                  {SVCS.map(s => <option key={s.n}>{s.t}</option>)}
                </select>
              </div>
              <div className="fg"><label>Project Details</label>
                <textarea rows={5} placeholder="Tell us about your project — type, location, value and programme..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
              </div>
              <button className="btn-gold btn-full">Send Enquiry &nbsp;<Svg d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z" s={14} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ftr">
        <div className="ftr-top">
          <div className="ftr-top-in">
            <div className="ftr-brand">
              <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={80} height={80} style={{ objectFit: 'contain' }} />
              <div className="ftr-brand-name">Saif Elite QS</div>
              <div className="ftr-brand-sub">Quantity Surveyor &amp; Cost Consultant</div>
              <p>Professional QS and cost consultancy across the UAE and GCC. Trusted by developers, contractors and investors on every project.</p>
              <div className="fsoc">
                {["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                  "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"
                ].map((d, i) => (<a key={i} href="#" className="fsc" aria-label="social"><Svg d={d} s={15} /></a>))}
              </div>
            </div>
            <div className="fcol">
              <h4>Services</h4>
              <ul>{SVCS.slice(0, 6).map(s => <li key={s.n}><a href="#" onClick={e => { e.preventDefault(); go('services'); }}>{s.t}</a></li>)}</ul>
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <ul>
                {[['About Us', 'about'], ['Our Process', 'process'], ['Projects', 'projects'], ['Contact', 'contact']].map(([t, h]) => (
                  <li key={t}><a href={`#${h}`} onClick={e => { e.preventDefault(); go(h); }}>{t}</a></li>
                ))}
              </ul>
              <h4 style={{ marginTop: '2rem' }}>Connect</h4>
              <ul>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">WhatsApp</a></li>
                <li><a href="mailto:info@saifeliteqs.com">Email Us</a></li>
                <li><a href="tel:+971000000000">Call Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ftr-bot">
          <div className="ftr-bot-in">
            <p>© 2025 <span className="hl">Saif Elite QS</span>. All rights reserved.</p>
            <p>Quantity Surveyor &amp; Cost Consultant — Dubai, UAE</p>
          </div>
        </div>
      </footer>
    </>
  );
}
