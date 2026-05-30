'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const SLIDES = [
  { tag: 'Quantity Surveying & Cost Consultancy', h1: 'Global Vision.', h2: 'Local Expertise.', sub: 'Precision cost management delivered across the UAE and GCC' },
  { tag: 'Proactive Approach · Diligent Delivery', h1: 'Protecting Your', h2: 'Investment.', sub: 'From initial concept through to final account — complete cost control' },
  { tag: 'Superior Results · Every Project', h1: 'Expert QS Services', h2: 'You Can Trust.', sub: 'Over a decade of excellence in the UAE built environment' },
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
  { n: '01', t: 'Initial Brief', d: 'We begin by fully understanding your project objectives, programme, budget parameters and procurement strategy.' },
  { n: '02', t: 'Cost Plan', d: 'A robust cost plan is established with appropriate risk allowances and contingencies, setting clear financial benchmarks.' },
  { n: '03', t: 'Tender Management', d: 'We prepare tender documentation, manage the process, evaluate returns and provide recommendation on contractor selection.' },
  { n: '04', t: 'Construction Phase', d: 'Ongoing monitoring, variation assessment, interim valuations and regular cost reporting throughout the build.' },
  { n: '05', t: 'Final Account', d: 'We negotiate and agree the final account, ensuring all entitlements are assessed and financial exposure minimised.' },
];

const PROJS = [
  { tag: 'Residential', n: 'Luxury Villa Complex', loc: 'Dubai Hills, Dubai', v: 'AED 45M', d: '24-unit luxury villa development including landscaping, pools and smart home systems. Full QS services from inception to final account.' },
  { tag: 'Commercial', n: 'Grade A Office Tower', loc: 'DIFC, Dubai', v: 'AED 280M', d: '38-storey premium office tower in the financial district. Complete cost management, BOQ preparation and contract administration.' },
  { tag: 'Mixed-Use', n: 'Retail & Hospitality Scheme', loc: 'JBR, Dubai', v: 'AED 120M', d: 'Mixed-use retail and hotel development on the Jumeirah Beach Residence waterfront. Tender management and cost control.' },
  { tag: 'Infrastructure', n: 'Road & Utilities Package', loc: 'Abu Dhabi', v: 'AED 90M', d: "Employer's QS services for a major road infrastructure and utilities upgrade covering 14km of dual carriageway." },
  { tag: 'Residential', n: 'High-Rise Apartment Tower', loc: 'Business Bay, Dubai', v: 'AED 175M', d: '52-storey residential tower. Post-contract cost management including variation control and monthly reporting.' },
  { tag: 'Healthcare', n: 'Private Medical Centre', loc: 'Jumeirah, Dubai', v: 'AED 32M', d: 'Specialist fit-out QS services covering clinical areas, diagnostics, pharmacy and patient suites.' },
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
    setTimeout(() => { setSl(p => (p + 1) % SLIDES.length); setAnim(true); }, 350);
  }, []);

  useEffect(() => {
    timer.current = setInterval(next, 6000);
    return () => clearInterval(timer.current);
  }, [next]);

  useEffect(() => {
    const run = () => document.querySelectorAll('.rv').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('on');
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
      --gold:#b8912a;
      --gold-lt:#d4aa40;
      --navy:#1a1f2e;
      --navy2:#252b3a;
      --dark:#111418;
      --white:#ffffff;
      --off:#f7f6f3;
      --light:#efefed;
      --txt:#2c2c2c;
      --txt2:#4a4a4a;
      --muted:#7a7a7a;
      --border:#e0ddd8;
      --tr:.28s ease;
    }
    body{background:var(--white);color:var(--txt);font-family:'Segoe UI',system-ui,-apple-system,sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:var(--light)}
    ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}

    /* REVEAL */
    .rv{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease;}
    .rv.on{opacity:1;transform:none;}
    .rv.rl{transform:translateX(-24px);}.rv.rl.on{transform:none;}
    .rv.rr{transform:translateX(24px);}.rv.rr.on{transform:none;}
    .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}
    .d4{transition-delay:.28s}.d5{transition-delay:.35s}.d6{transition-delay:.42s}

    /* ── NAV ── */
    .nav{
      position:fixed;top:0;left:0;right:0;z-index:200;
      display:flex;align-items:center;justify-content:space-between;
      height:80px;padding:0 3rem;
      transition:all .35s;
    }
    .nav.sc{
      background:var(--navy);
      height:68px;
      box-shadow:0 2px 20px rgba(0,0,0,.25);
    }
    .nlogo{display:flex;align-items:center;gap:.75rem;cursor:pointer;text-decoration:none;}
    .nlogo-txt{display:flex;flex-direction:column;line-height:1.2;}
    .nlogo-txt b{font-size:.82rem;font-weight:700;color:#fff;letter-spacing:.05em;text-transform:uppercase;}
    .nlogo-txt span{font-size:.55rem;color:rgba(255,255,255,.5);letter-spacing:.2em;text-transform:uppercase;}
    .nlinks{display:flex;align-items:center;gap:2.4rem;list-style:none;}
    .nlinks a{
      color:rgba(255,255,255,.7);text-decoration:none;
      font-size:.7rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
      transition:color var(--tr);position:relative;padding-bottom:3px;
    }
    .nlinks a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold-lt);transition:width var(--tr);}
    .nlinks a:hover{color:#fff;}.nlinks a:hover::after{width:100%;}
    .nbtn{
      background:var(--gold);color:#fff;border:none;
      padding:.46rem 1.4rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;
      text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);
    }
    .nbtn:hover{background:var(--gold-lt);}
    .burger{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:4px;}

    /* MOB */
    .mob{display:none;position:fixed;inset:0;z-index:199;background:var(--navy);flex-direction:column;align-items:center;justify-content:center;gap:2.2rem;}
    .mob.on{display:flex;}
    .mob-x{position:absolute;top:1.4rem;right:1.6rem;background:none;border:none;color:rgba(255,255,255,.6);cursor:pointer;}
    .mob a{color:#fff;text-decoration:none;font-size:1.3rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:color var(--tr);}
    .mob a:hover{color:var(--gold-lt);}

    /* BUTTONS */
    .btn-gold{
      display:inline-flex;align-items:center;gap:.5rem;
      background:var(--gold);color:#fff;
      padding:.8rem 2.2rem;font-size:.74rem;font-weight:700;
      letter-spacing:.1em;text-transform:uppercase;border:none;
      cursor:pointer;font-family:inherit;transition:all var(--tr);
    }
    .btn-gold:hover{background:var(--gold-lt);transform:translateY(-1px);box-shadow:0 6px 20px rgba(184,145,42,.3);}
    .btn-dark{
      display:inline-flex;align-items:center;gap:.5rem;
      background:var(--navy);color:#fff;
      padding:.8rem 2.2rem;font-size:.74rem;font-weight:700;
      letter-spacing:.1em;text-transform:uppercase;border:none;
      cursor:pointer;font-family:inherit;transition:all var(--tr);
    }
    .btn-dark:hover{background:var(--navy2);}
    .btn-outline-dark{
      display:inline-flex;align-items:center;gap:.5rem;
      background:transparent;color:var(--navy);
      padding:.76rem 2rem;font-size:.72rem;font-weight:700;
      letter-spacing:.1em;text-transform:uppercase;
      border:2px solid var(--navy);
      cursor:pointer;font-family:inherit;transition:all var(--tr);
    }
    .btn-outline-dark:hover{background:var(--navy);color:#fff;}
    .btn-outline-gold{
      display:inline-flex;align-items:center;gap:.5rem;
      background:transparent;color:var(--gold);
      padding:.76rem 2rem;font-size:.72rem;font-weight:700;
      letter-spacing:.1em;text-transform:uppercase;
      border:2px solid var(--gold);
      cursor:pointer;font-family:inherit;transition:all var(--tr);
    }
    .btn-outline-gold:hover{background:var(--gold);color:#fff;}
    .btn-white{
      display:inline-flex;align-items:center;gap:.5rem;
      background:transparent;color:#fff;
      padding:.8rem 2.2rem;font-size:.74rem;font-weight:600;
      letter-spacing:.1em;text-transform:uppercase;
      border:1px solid rgba(255,255,255,.4);
      cursor:pointer;font-family:inherit;transition:all var(--tr);
    }
    .btn-white:hover{background:rgba(255,255,255,.1);border-color:#fff;}
    .btn-full{width:100%;justify-content:center;padding:.9rem;}

    /* ── HERO — dark full screen with photo placeholder ── */
    .hero{
      position:relative;width:100%;height:100vh;min-height:640px;overflow:hidden;
      background:var(--dark);
    }
    /* dark overlay — when real image added, this sits on top of it */
    .hero-overlay{
      position:absolute;inset:0;z-index:1;
      background:linear-gradient(to right,rgba(10,13,20,.88) 55%,rgba(10,13,20,.4) 100%);
    }
    /* placeholder bg — remove when real image is set */
    .hero-photo{
      position:absolute;inset:0;z-index:0;
      background:
        linear-gradient(135deg,#0d1117 0%,#1a2030 50%,#0d1520 100%);
    }
    /* Decorative lines like Northcroft */
    .hero-photo::before{
      content:'';position:absolute;inset:0;
      background-image:
        linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
      background-size:60px 60px;
    }
    .hero-photo::after{
      content:'';position:absolute;right:0;top:0;bottom:0;width:45%;
      background:linear-gradient(to left,rgba(184,145,42,.06),transparent);
    }

    /* Content */
    .hero-cnt{
      position:relative;z-index:2;
      height:100%;max-width:1200px;margin:0 auto;padding:0 3rem;
      display:flex;flex-direction:column;justify-content:center;
    }
    .hero-eyebrow{
      display:inline-flex;align-items:center;gap:.8rem;
      font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);
      margin-bottom:1.8rem;
    }
    .hero-eyebrow::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .hero-eyebrow.out{opacity:0;} .hero-eyebrow{transition:opacity .35s;}

    .hero-h{
      font-size:clamp(2.8rem,6vw,5rem);font-weight:700;line-height:1.08;
      color:#fff;font-family:Georgia,'Times New Roman',serif;
      margin-bottom:1.4rem;
      transition:opacity .35s,transform .35s;
    }
    .hero-h.out{opacity:0;transform:translateY(12px);}
    .hero-h span{display:block;}
    .hero-h span:last-child{color:var(--gold-lt);}

    .hero-sub{
      font-size:1rem;color:rgba(255,255,255,.7);font-weight:300;
      max-width:500px;margin-bottom:3rem;line-height:1.75;
      transition:opacity .35s,transform .35s;
    }
    .hero-sub.out{opacity:0;transform:translateY(8px);}
    .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;}

    /* slide nav — bottom */
    .hero-nav{
      position:absolute;bottom:3rem;left:3rem;z-index:3;
      display:flex;align-items:center;gap:1.4rem;
      max-width:1200px;
    }
    .hbtn{
      display:flex;align-items:center;gap:.6rem;cursor:pointer;
      font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;
      color:rgba(255,255,255,.35);transition:color var(--tr);border:none;background:none;
      font-family:inherit;
    }
    .hbtn.a{color:var(--gold-lt);}
    .hbar{width:28px;height:1px;background:currentColor;transition:width var(--tr);}
    .hbtn.a .hbar{width:48px;}
    /* scroll indicator */
    .hero-scrl{
      position:absolute;right:3rem;bottom:3rem;z-index:3;
      display:flex;flex-direction:column;align-items:center;gap:.5rem;
    }
    .scrl-line{width:1px;height:48px;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.4));animation:scrl 2.5s ease-in-out infinite;}
    @keyframes scrl{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
    .scrl-txt{font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.25);writing-mode:vertical-rl;}

    /* ── STATS BAND — dark navy ── */
    .statsband{background:var(--navy);padding:3.5rem 1.5rem;}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
    .stat{text-align:center;padding:1rem 1.5rem;position:relative;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:rgba(255,255,255,.1);}
    .stat-v{font-size:2.6rem;font-weight:700;color:var(--gold-lt);font-family:Georgia,serif;line-height:1;margin-bottom:.3rem;}
    .stat-l{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);}

    /* ── SECTION BASE ── */
    section{padding:8rem 1.5rem;}
    .wrap{max-width:1100px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.2rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;font-weight:400;line-height:1.82;max-width:560px;}

    /* ── SERVICES — white bg ── */
    .svc{background:var(--white);}
    .svc-hd{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem;margin-bottom:4rem;padding-bottom:2rem;border-bottom:1px solid var(--border);}
    .svc-grid{display:grid;grid-template-columns:repeat(4,1fr);}
    .svc-card{
      padding:2rem 1.6rem;border-right:1px solid var(--border);border-bottom:1px solid var(--border);
      position:relative;overflow:hidden;transition:background var(--tr),box-shadow var(--tr);
    }
    .svc-card:nth-child(4n){border-right:none;}
    .svc-card:nth-last-child(-n+4){border-bottom:none;}
    .svc-card::after{content:'';position:absolute;top:0;left:0;width:0;height:3px;background:var(--gold);transition:width .45s ease;}
    .svc-card:hover{background:var(--off);}.svc-card:hover::after{width:100%;}
    .svc-n{font-size:.58rem;color:var(--gold);letter-spacing:.22em;font-weight:700;margin-bottom:.9rem;opacity:.8;}
    .svc-t{font-size:.9rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;font-family:Georgia,serif;line-height:1.3;}
    .svc-d{font-size:.8rem;color:var(--txt2);line-height:1.75;}

    /* ── ABOUT — light grey bg ── */
    .abt{background:var(--off);padding:0;}
    .abt-g{display:grid;grid-template-columns:1fr 1fr;min-height:600px;}
    .abt-img{
      background:var(--navy2);
      display:flex;align-items:center;justify-content:center;
      position:relative;overflow:hidden;min-height:500px;
    }
    .abt-img::after{content:'';position:absolute;top:0;right:0;width:4px;height:100%;background:var(--gold);}
    .abt-img-ph{text-align:center;color:rgba(255,255,255,.2);font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;}
    .abt-txt{padding:6rem 4rem 6rem 5rem;display:flex;flex-direction:column;justify-content:center;}
    .why-list{margin-top:1.8rem;display:flex;flex-direction:column;gap:.9rem;}
    .why-row{display:flex;align-items:flex-start;gap:.8rem;}
    .why-chk{color:var(--gold);flex-shrink:0;margin-top:2px;}
    .why-t{font-size:.84rem;color:var(--txt2);line-height:1.6;}

    /* ── PROCESS — white bg ── */
    .proc{background:var(--white);}
    .proc-grid{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid var(--border);margin-top:3.5rem;}
    .pstep{
      padding:2.2rem 1.6rem;border-right:1px solid var(--border);
      position:relative;transition:background var(--tr);
    }
    .pstep:last-child{border-right:none;}
    .pstep:hover{background:var(--off);}
    .pstep-bar{position:absolute;bottom:0;left:0;width:0;height:3px;background:var(--gold);transition:width .5s ease;}
    .pstep:hover .pstep-bar{width:100%;}
    .pstep-n{font-size:3rem;font-weight:700;color:rgba(26,31,46,.06);font-family:Georgia,serif;line-height:1;margin-bottom:.9rem;}
    .pstep-t{font-size:.88rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;font-family:Georgia,serif;}
    .pstep-d{font-size:.78rem;color:var(--txt2);line-height:1.72;}

    /* ── PROJECTS — light grey ── */
    .prj{background:var(--off);}
    .prj-hd{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3.5rem;padding-bottom:2rem;border-bottom:1px solid var(--border);}
    .prj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);}
    .prj-card{background:var(--white);overflow:hidden;transition:box-shadow var(--tr);}
    .prj-card:hover{box-shadow:0 8px 32px rgba(0,0,0,.1);}
    .prj-img{
      width:100%;aspect-ratio:16/10;background:var(--navy);
      display:flex;align-items:center;justify-content:center;
      position:relative;overflow:hidden;
    }
    .prj-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,rgba(10,13,20,.7));}
    .prj-tag-badge{
      position:absolute;bottom:.8rem;left:.8rem;z-index:1;
      font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;
      color:var(--gold-lt);background:rgba(10,13,20,.75);padding:.22rem .6rem;
      border-left:2px solid var(--gold);
    }
    .prj-img-ph{font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.15);}
    .prj-body{padding:1.6rem;}
    .prj-name{font-size:.95rem;font-weight:700;color:var(--navy);margin-bottom:.2rem;font-family:Georgia,serif;}
    .prj-loc{font-size:.7rem;color:var(--muted);margin-bottom:.5rem;}
    .prj-val{font-size:.76rem;color:var(--gold);font-weight:700;margin-bottom:.55rem;}
    .prj-desc{font-size:.78rem;color:var(--txt2);line-height:1.68;}

    /* ── CTA — dark navy ── */
    .cta{background:var(--navy);padding:8rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
    .cta::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(to right,transparent,var(--gold),transparent);}
    .cta-in{position:relative;z-index:1;max-width:680px;margin:0 auto;}
    .cta-tag{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(212,170,64,.8);margin-bottom:1rem;}
    .cta-h{font-size:clamp(1.8rem,3.5vw,3rem);font-weight:700;color:#fff;margin-bottom:1rem;font-family:Georgia,serif;line-height:1.15;}
    .cta-p{color:rgba(255,255,255,.65);font-size:.9rem;font-weight:300;margin-bottom:2.5rem;line-height:1.8;}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

    /* ── CONTACT — white ── */
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
    .fg input,.fg textarea,.fg select{
      background:var(--off);border:1px solid var(--border);
      color:var(--txt);padding:.72rem .9rem;font-size:.88rem;
      font-family:inherit;outline:none;transition:border-color var(--tr);resize:none;
    }
    .fg input::placeholder,.fg textarea::placeholder{color:rgba(122,122,122,.5);}
    .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--gold);}
    .fg select option{background:var(--white);}

    /* ── FOOTER — dark navy ── */
    .ftr{background:var(--dark);padding:5rem 1.5rem 2rem;}
    .ftr-in{max-width:1100px;margin:0 auto;}
    .ftr-top{display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:2rem;}
    .fbrand p{font-size:.8rem;color:rgba(255,255,255,.4);line-height:1.78;margin-top:1rem;max-width:255px;}
    .fsoc{display:flex;gap:.6rem;margin-top:1.4rem;}
    .fsc{width:32px;height:32px;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);transition:all var(--tr);text-decoration:none;}
    .fsc:hover{border-color:var(--gold-lt);color:var(--gold-lt);}
    .fcol h4{font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1.2rem;font-weight:700;}
    .fcol ul{list-style:none;}.fcol li{margin-bottom:.65rem;}
    .fcol a{color:rgba(255,255,255,.4);text-decoration:none;font-size:.8rem;transition:color var(--tr);}
    .fcol a:hover{color:var(--gold-lt);}
    .ftr-bot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;}
    .ftr-bot p{font-size:.68rem;color:rgba(255,255,255,.22);}

    /* RESPONSIVE */
    @media(max-width:1100px){
      .nav{padding:0 2rem;}.hero-cnt{padding:0 2rem;}.hero-nav{left:2rem;}.hero-scrl{right:2rem;}
      .svc-grid{grid-template-columns:repeat(2,1fr);}
      .svc-card:nth-child(4n){border-right:1px solid var(--border);}
      .svc-card:nth-child(2n){border-right:none!important;}
      .svc-card:nth-last-child(-n+4){border-bottom:1px solid var(--border);}
      .svc-card:nth-last-child(-n+2){border-bottom:none!important;}
      .abt-g{grid-template-columns:1fr;} .abt-img{min-height:320px;}
      .abt-txt{padding:3.5rem 2rem;}
      .proc-grid{grid-template-columns:repeat(3,1fr);}
      .pstep:nth-child(3){border-right:none;}
      .prj-grid{grid-template-columns:repeat(2,1fr);}
      .cnt-g{grid-template-columns:1fr;gap:3rem;}
      .ftr-top{grid-template-columns:1fr 1fr;}
    }
    @media(max-width:768px){
      .nav{padding:0 1.2rem;height:64px;}.nav.sc{height:56px;}
      .nlinks,.nbtn{display:none;}.burger{display:flex;}
      .hero-cnt{padding:0 1.4rem;}
      .hero-nav{left:1.4rem;bottom:2rem;}.hero-scrl{right:1.4rem;bottom:2rem;}
      .stats-g{grid-template-columns:1fr 1fr;}
      .stat:nth-child(2)::after{display:none;}
      .svc-grid{grid-template-columns:1fr;}
      .svc-card{border-right:none!important;}
      .proc-grid{grid-template-columns:1fr;border:1px solid var(--border);}
      .pstep{border-right:none;border-bottom:1px solid var(--border);}
      .pstep:last-child{border-bottom:none;}
      .prj-grid{grid-template-columns:1fr;}
      .frow{grid-template-columns:1fr;}
      .ftr-top{grid-template-columns:1fr;gap:2rem;}
      section{padding:5rem 1.2rem;}
      .svc-hd,.prj-hd{flex-direction:column;align-items:flex-start;}
    }
  `;

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav ${sc ? 'sc' : ''}`}>
        <div className="nlogo" onClick={() => go('home')}>
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={54} height={54} style={{ objectFit: 'contain' }} priority />
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

      {/* HERO — dark, full screen */}
      <section id="home" className="hero">
        <div className="hero-photo" />
        <div className="hero-overlay" />
        <div className="hero-cnt">
          <div className={`hero-eyebrow ${anim ? '' : 'out'}`}>{SLIDES[sl].tag}</div>
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
            <button key={i} className={`hbtn ${i === sl ? 'a' : ''}`}
              onClick={() => { clearInterval(timer.current); setAnim(false); setTimeout(() => { setSl(i); setAnim(true); }, 350); }}>
              <div className="hbar" /><span>{String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
        <div className="hero-scrl"><div className="scrl-line" /><div className="scrl-txt">Scroll</div></div>
      </section>

      {/* STATS — dark navy */}
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

      {/* SERVICES — white */}
      <section id="services" className="svc">
        <div className="wrap">
          <div className="svc-hd">
            <div className="rv">
              <div className="sec-tag">What We Do</div>
              <h2 className="sec-h">Our Services</h2>
              <div className="sec-line" />
              <p className="sec-p">From initial feasibility through to final account — a complete range of quantity surveying and cost consultancy services tailored to your project needs.</p>
            </div>
            <button className="btn-outline-dark rv d2" onClick={() => go('contact')}>Discuss Your Project &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={13} /></button>
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

      {/* ABOUT — light grey */}
      <section id="about" className="abt">
        <div style={{ maxWidth: '100%' }}>
          <div className="abt-g">
            <div className="abt-img rv rl"><div className="abt-img-ph">Team / Project Image</div></div>
            <div className="abt-txt rv rr">
              <div className="sec-tag">Who We Are</div>
              <h2 className="sec-h">About Saif Elite QS</h2>
              <div className="sec-line" />
              <p className="sec-p" style={{ marginBottom: '1rem' }}>
                Saif Elite QS is a specialist quantity surveying and cost consultancy practice based in Dubai, serving clients across the UAE and GCC. We bring rigorous commercial discipline to every project — whether a boutique residential development or a landmark commercial scheme.
              </p>
              <p className="sec-p" style={{ marginBottom: '1rem' }}>
                Founded on the principles of transparency, accuracy and client-first service, our qualified team delivers measurable value at every stage. We work alongside developers, contractors, architects and project managers to ensure cost is always controlled and every decision is informed.
              </p>
              <p className="sec-p">Our approach combines deep local market knowledge with internationally recognised professional standards — giving clients confidence that their investment is in expert hands.</p>
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

      {/* PROCESS — white */}
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
              <div key={p.n} className={`pstep rv d${i + 1}`}>
                <div className="pstep-bar" />
                <div className="pstep-n">{p.n}</div>
                <div className="pstep-t">{p.t}</div>
                <div className="pstep-d">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS — light grey */}
      <section id="projects" className="prj">
        <div className="wrap">
          <div className="prj-hd">
            <div className="rv">
              <div className="sec-tag">Our Work</div>
              <h2 className="sec-h">Featured Projects</h2>
              <div className="sec-line" />
            </div>
            <button className="btn-outline-dark rv d2" style={{ fontSize: '.7rem' }}>View All &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={13} /></button>
          </div>
          <div className="prj-grid">
            {PROJS.map((p, i) => (
              <div key={p.n} className={`prj-card rv d${(i % 3) + 1}`}>
                <div className="prj-img">
                  <span className="prj-img-ph">Project Image</span>
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

      {/* CTA — dark navy */}
      <div className="cta">
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

      {/* CONTACT — white */}
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
                  <div className="cnt-ico"><Svg d={c.d} s={18} w={1.5} /></div>
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
                <textarea rows={5} placeholder="Tell us about your project — type, location, value and programme..."
                  value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
              </div>
              <button className="btn-gold btn-full">Send Enquiry &nbsp;<Svg d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z" s={14} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ftr">
        <div className="ftr-in">
          <div className="ftr-top">
            <div className="fbrand">
              <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={72} height={72} style={{ objectFit: 'contain' }} />
              <p>Professional Quantity Surveying and Cost Consultancy across the UAE and GCC. Trusted by developers, contractors and investors to deliver commercial clarity on every project.</p>
              <div className="fsoc">
                {["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                  "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"
                ].map((d, i) => (<a key={i} href="#" className="fsc" aria-label="social"><Svg d={d} s={14} /></a>))}
              </div>
            </div>
            <div className="fcol">
              <h4>Services</h4>
              <ul>{SVCS.slice(0, 6).map(s => <li key={s.n}><a href="#" onClick={e => { e.preventDefault(); go('services'); }}>{s.t}</a></li>)}</ul>
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <ul>{[['About Us', 'about'], ['Our Process', 'process'], ['Projects', 'projects'], ['Contact', 'contact']].map(([t, h]) => (
                <li key={t}><a href={`#${h}`} onClick={e => { e.preventDefault(); go(h); }}>{t}</a></li>
              ))}</ul>
            </div>
            <div className="fcol">
              <h4>Connect</h4>
              <ul>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">WhatsApp</a></li>
                <li><a href="mailto:info@saifeliteqs.com">Email Us</a></li>
                <li><a href="tel:+971000000000">Call Us</a></li>
              </ul>
            </div>
          </div>
          <div className="ftr-bot">
            <p>© 2025 <span style={{ color: 'var(--gold-lt)' }}>Saif Elite QS</span>. All rights reserved.</p>
            <p>Quantity Surveyor &amp; Cost Consultant — Dubai, UAE</p>
          </div>
        </div>
      </footer>
    </>
  );
}
