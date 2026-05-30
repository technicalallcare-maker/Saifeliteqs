'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

/* ── tiny SVG icon ── */
const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

/* ── SLIDES  (replace bg with real images later) ── */
const SLIDES = [
  {
    tag:   'Quantity Surveying & Cost Consultancy',
    title: 'Global Vision.\nLocal Expertise.',
    sub:   'Precision cost management delivered across the UAE and GCC',
    hint:  'Scroll to explore',
  },
  {
    tag:   'Proactive Approach · Diligent Delivery',
    title: 'Protecting Your\nInvestment.',
    sub:   'From initial concept through to final account — complete cost control',
    hint:  'Our services',
  },
  {
    tag:   'Superior Results · Every Project',
    title: 'Expert QS Services\nYou Can Trust.',
    sub:   'Over a decade of excellence in the UAE built environment',
    hint:  'Meet our team',
  },
];

/* ── SERVICES ── */
const SVCS = [
  { n:'01', t:'Cost Planning',           d:'Detailed estimates and cost plans at every stage of design, from initial feasibility through to tender, providing reliable budget benchmarks throughout the project lifecycle.' },
  { n:'02', t:'Bill of Quantities',       d:'Precisely measured Bills of Quantities prepared to standard methods of measurement, forming a transparent basis for tendering, procurement and ongoing cost control.' },
  { n:'03', t:'Contract Administration', d:'Expert management of construction contracts — interim valuations, variation assessment, extension of time, claims handling and final account negotiation.' },
  { n:'04', t:'Project Cost Management', d:'Proactive monitoring, forecasting and reporting throughout construction, keeping your budget on track and identifying commercial risks before they become costly.' },
  { n:'05', t:'Dispute Resolution',       d:'Professional quantum preparation and independent review for disputes, adjudications and arbitrations, protecting your commercial position at every stage.' },
  { n:'06', t:'Feasibility Studies',      d:'Robust financial viability assessments and investment appraisals providing the clarity and confidence needed to make sound project decisions before committing capital.' },
  { n:'07', t:'Procurement Strategy',     d:'Guidance on the most appropriate procurement routes, contract forms and tendering strategies to achieve best value, minimise risk and align with your programme.' },
  { n:'08', t:'Value Engineering',         d:'Structured cost reduction exercises that identify opportunities to reduce expenditure without compromising design intent, quality standards or construction programme.' },
];

/* ── STATS ── */
const STATS = [
  { v:'10+',     l:'Years of Experience' },
  { v:'200+',    l:'Projects Delivered' },
  { v:'AED 2B+', l:'Total Value Managed' },
  { v:'98%',     l:'Client Satisfaction' },
];

/* ── WHY ── */
const WHY = [
  'RICS-aligned professional standards on every commission',
  'Dedicated senior QS assigned throughout your project',
  'Deep knowledge of UAE and GCC construction markets',
  'Transparent reporting — no surprises at final account',
  'Proactive risk identification before problems escalate',
  'Proven track record across all major construction sectors',
];

/* ── PROCESS ── */
const PROC = [
  { n:'01', t:'Initial Brief',      d:'Understanding your objectives, programme, budget and procurement strategy before anything else.' },
  { n:'02', t:'Cost Plan',          d:'Establishing a robust cost plan with appropriate risk allowances and contingencies from the outset.' },
  { n:'03', t:'Tender Management',  d:'Preparing documentation, managing the tender, evaluating returns and advising on selection.' },
  { n:'04', t:'Construction Phase', d:'Monitoring costs, valuing applications, assessing variations and reporting throughout construction.' },
  { n:'05', t:'Final Account',      d:'Negotiating and agreeing the final account, minimising liabilities and closing the project.' },
];

/* ── PROJECTS ── */
const PROJS = [
  { tag:'Residential',    n:'Luxury Villa Complex',         loc:'Dubai Hills, Dubai',  v:'AED 45M',  d:'24-unit luxury villa development including landscaping, pools and smart home systems. Full QS services from inception to final account.' },
  { tag:'Commercial',     n:'Grade A Office Tower',          loc:'DIFC, Dubai',         v:'AED 280M', d:'38-storey premium office tower. Complete cost management, BOQ preparation and contract administration throughout.' },
  { tag:'Mixed-Use',      n:'Retail & Hospitality Scheme',   loc:'JBR, Dubai',          v:'AED 120M', d:'Mixed-use retail and hotel development on the Jumeirah Beach Residence waterfront. Tender management and cost control.' },
  { tag:'Infrastructure', n:'Road & Utilities Package',      loc:'Abu Dhabi',           v:'AED 90M',  d:"Employer's QS services for a major road infrastructure and utilities upgrade covering 14km of dual carriageway." },
  { tag:'Residential',    n:'High-Rise Apartment Tower',     loc:'Business Bay, Dubai', v:'AED 175M', d:'52-storey residential tower. Post-contract cost management including variation control and monthly cost reporting.' },
  { tag:'Healthcare',     n:'Private Medical Centre',        loc:'Jumeirah, Dubai',     v:'AED 32M',  d:'Specialist fit-out QS services covering clinical areas, diagnostics, pharmacy and patient suite accommodation.' },
];

/* ── CONTACTS ── */
const CNTS = [
  { i:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'Office',  v:'Dubai, United Arab Emirates' },
  { i:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z', l:'Phone',  v:'+971 XX XXX XXXX' },
  { i:'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6', l:'Email',   v:'info@saifeliteqs.com' },
  { i:'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z', l:'Website', v:'www.saifeliteqs.com' },
];

const NAV_LINKS = ['Home','Services','About','Process','Projects','Contact'];

/* ════════════════════════════════════════════════ */
export default function Page() {
  const [sl,    setSl]    = useState(0);
  const [anim,  setAnim]  = useState(true);
  const [menu,  setMenu]  = useState(false);
  const [sc,    setSc]    = useState(false);
  const [form,  setForm]  = useState({ fn:'',ln:'',email:'',svc:'',msg:'' });
  const timer = useRef(null);

  /* scroll detection */
  useEffect(() => {
    const h = () => setSc(window.scrollY > 80);
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h);
  }, []);

  /* slide auto-advance */
  const nextSlide = useCallback(() => {
    setAnim(false);
    setTimeout(() => { setSl(p => (p + 1) % SLIDES.length); setAnim(true); }, 350);
  }, []);
  useEffect(() => {
    timer.current = setInterval(nextSlide, 6000);
    return () => clearInterval(timer.current);
  }, [nextSlide]);

  /* scroll-reveal */
  useEffect(() => {
    const run = () => document.querySelectorAll('.rv').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('on');
    });
    run();
    window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  const go = (id) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  /* ── CSS ── */
  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    :root{
      --g:#c9a84c;--gl:#e8c86a;--gd:#8a6820;
      --t:#2bb5c8;--tl:#56cfe1;
      --bk:#0a0a0a;--d1:#111;--d2:#171717;--d3:#1f1f1f;--d4:#272727;
      --wh:#fff;--w1:#f0ebe0;--w2:#cdc5b4;--mu:#88807a;
      --bd:rgba(201,168,76,.16);--bdl:rgba(201,168,76,.08);
      --tr:.28s ease;
    }
    body{background:var(--d1);color:var(--w2);font-family:system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bk)}::-webkit-scrollbar-thumb{background:var(--gd);border-radius:2px}

    /* REVEAL */
    .rv{opacity:0;transform:translateY(26px);transition:opacity .6s ease,transform .6s ease;}
    .rv.on{opacity:1;transform:none;}
    .rv.rl{transform:translateX(-26px);}.rv.rl.on{transform:none;}
    .rv.rr{transform:translateX(26px);}.rv.rr.on{transform:none;}
    .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}
    .d4{transition-delay:.28s}.d5{transition-delay:.35s}.d6{transition-delay:.42s}

    /* ── NAV ── */
    .nav{
      position:fixed;top:0;left:0;right:0;z-index:100;
      display:flex;align-items:center;justify-content:space-between;
      padding:0 3rem;height:80px;
      transition:all .4s;
    }
    .nav.sc{background:rgba(10,10,10,.96);backdrop-filter:blur(14px);border-bottom:1px solid var(--bd);height:64px;}
    .nlogo{display:flex;align-items:center;gap:.8rem;cursor:pointer;text-decoration:none;}
    .nlogo-text{display:flex;flex-direction:column;line-height:1.15;}
    .nlogo-text b{font-size:.82rem;font-weight:700;color:var(--wh);letter-spacing:.05em;text-transform:uppercase;}
    .nlogo-text span{font-size:.56rem;color:var(--mu);letter-spacing:.2em;text-transform:uppercase;}
    .nlinks{display:flex;align-items:center;gap:2.4rem;list-style:none;}
    .nlinks a{
      color:rgba(255,255,255,.55);text-decoration:none;
      font-size:.7rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;
      transition:color var(--tr);position:relative;padding-bottom:3px;
    }
    .nlinks a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--g);transition:width var(--tr);}
    .nlinks a:hover,.nlinks a:hover::after{color:var(--wh);width:100%;}
    .nlinks a:hover{color:var(--wh);}
    .nbtn{
      background:transparent;border:1px solid var(--g);color:var(--g);
      padding:.44rem 1.4rem;font-size:.68rem;font-weight:600;letter-spacing:.14em;
      text-transform:uppercase;cursor:pointer;font-family:inherit;
      transition:all var(--tr);
    }
    .nbtn:hover{background:var(--g);color:var(--bk);}
    .burger{display:none;background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;padding:4px;}

    /* MOB */
    .mob{display:none;position:fixed;inset:0;z-index:99;background:var(--bk);flex-direction:column;align-items:center;justify-content:center;gap:2.2rem;}
    .mob.on{display:flex;}
    .mob-x{position:absolute;top:1.4rem;right:1.6rem;background:none;border:none;color:var(--mu);cursor:pointer;}
    .mob a{color:var(--wh);text-decoration:none;font-size:1.4rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:color var(--tr);}
    .mob a:hover{color:var(--g);}

    /* ── HERO (Northcroft full-screen split) ── */
    .hero{position:relative;width:100%;height:100vh;min-height:640px;overflow:hidden;background:var(--bk);}

    /* Background placeholder — replace with <Image> when real photo available */
    .hero-bg{
      position:absolute;inset:0;z-index:0;
      background:
        linear-gradient(135deg,rgba(12,12,12,.9) 0%,rgba(12,12,12,.55) 60%,rgba(12,12,12,.3) 100%),
        repeating-linear-gradient(45deg,rgba(201,168,76,.02) 0px,rgba(201,168,76,.02) 1px,transparent 1px,transparent 60px),
        repeating-linear-gradient(-45deg,rgba(43,181,200,.015) 0px,rgba(43,181,200,.015) 1px,transparent 1px,transparent 60px),
        var(--d2);
    }
    /* Gold accent line — left edge like Northcroft */
    .hero-accent{position:absolute;top:0;left:0;width:4px;height:100%;background:linear-gradient(to bottom,transparent,var(--g),transparent);z-index:2;}

    .hero-cnt{
      position:relative;z-index:3;
      height:100%;display:flex;flex-direction:column;justify-content:center;
      padding:0 4rem;max-width:780px;
    }
    .hero-eyebrow{
      display:inline-flex;align-items:center;gap:.7rem;
      font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;
      color:var(--g);margin-bottom:1.6rem;
      transition:opacity .35s,transform .35s;
    }
    .hero-eyebrow::before{content:'';display:block;width:32px;height:1px;background:var(--g);}
    .hero-eyebrow.out{opacity:0;transform:translateY(8px);}
    .hero-title{
      font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:700;
      line-height:1.1;color:var(--wh);
      font-family:Georgia,'Times New Roman',serif;
      white-space:pre-line;margin-bottom:1.4rem;
      transition:opacity .35s,transform .35s;
    }
    .hero-title.out{opacity:0;transform:translateY(14px);}
    .hero-sub{
      font-size:.98rem;color:var(--w2);font-weight:300;
      max-width:480px;margin-bottom:2.8rem;line-height:1.75;opacity:.85;
      transition:opacity .35s,transform .35s;
    }
    .hero-sub.out{opacity:0;transform:translateY(10px);}
    .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;}

    /* Slide indicators — bottom left like Northcroft */
    .hero-ind{
      position:absolute;bottom:2.8rem;left:4rem;z-index:4;
      display:flex;align-items:center;gap:1rem;
    }
    .hind{
      display:flex;align-items:center;gap:.5rem;cursor:pointer;
      font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;
      color:rgba(255,255,255,.3);transition:color var(--tr);
    }
    .hind.a{color:var(--g);}
    .hind-bar{width:24px;height:1px;background:currentColor;transition:width var(--tr);}
    .hind.a .hind-bar{width:40px;}
    /* scroll hint */
    .hero-scroll{
      position:absolute;bottom:2.8rem;right:4rem;z-index:4;
      display:flex;flex-direction:column;align-items:center;gap:.5rem;
    }
    .hscrl-line{width:1px;height:44px;background:linear-gradient(to bottom,rgba(255,255,255,.15),var(--g));animation:scrl 2.4s ease-in-out infinite;}
    @keyframes scrl{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
    .hscrl-txt{font-size:.52rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.25);writing-mode:vertical-rl;}

    /* ── BUTTONS ── */
    .btn-g{
      display:inline-flex;align-items:center;gap:.5rem;
      background:var(--g);color:var(--bk);
      padding:.8rem 2rem;font-size:.74rem;font-weight:700;
      letter-spacing:.12em;text-transform:uppercase;border:none;
      cursor:pointer;font-family:inherit;
      transition:background var(--tr),transform var(--tr),box-shadow var(--tr);
      position:relative;overflow:hidden;
    }
    .btn-g::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .5s;}
    .btn-g:hover{background:var(--gl);transform:translateY(-2px);box-shadow:0 10px 28px rgba(201,168,76,.3);}
    .btn-g:hover::before{left:100%;}
    .btn-o{
      display:inline-flex;align-items:center;gap:.5rem;
      background:transparent;color:rgba(255,255,255,.8);
      padding:.8rem 2rem;font-size:.74rem;font-weight:500;
      letter-spacing:.12em;text-transform:uppercase;
      border:1px solid rgba(255,255,255,.2);
      cursor:pointer;font-family:inherit;transition:all var(--tr);
    }
    .btn-o:hover{border-color:var(--g);color:var(--g);}
    .btn-w{
      display:inline-flex;align-items:center;gap:.5rem;
      background:transparent;color:var(--g);
      padding:.76rem 1.8rem;font-size:.72rem;font-weight:700;
      letter-spacing:.12em;text-transform:uppercase;
      border:1px solid var(--g);
      cursor:pointer;font-family:inherit;transition:all var(--tr);
    }
    .btn-w:hover{background:var(--g);color:var(--bk);}
    .btn-full{width:100%;justify-content:center;padding:.88rem;}

    /* ── INTRO BAND (below hero, like Northcroft) ── */
    .intro{background:var(--d2);border-bottom:1px solid var(--bd);padding:5rem 1.5rem;}
    .intro-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
    .intro-tag{font-size:.62rem;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--t);margin-bottom:.8rem;}
    .intro-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--wh);line-height:1.2;margin-bottom:1rem;font-family:Georgia,serif;}
    .intro-h .gy{color:var(--g);}
    .intro-line{width:36px;height:2px;background:linear-gradient(to right,var(--g),var(--t));margin-bottom:1.2rem;}
    .intro-p{color:var(--w2);font-size:.88rem;line-height:1.82;font-weight:300;}
    .intro-stats{display:grid;grid-template-columns:1fr 1fr;gap:2rem;}
    .istat{border-left:2px solid var(--bd);padding-left:1.2rem;}
    .istat-v{font-size:2.2rem;font-weight:700;color:var(--g);line-height:1;font-family:Georgia,serif;margin-bottom:.3rem;}
    .istat-l{font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:var(--mu);}

    /* ── SECTION BASE ── */
    section{padding:8rem 1.5rem;}
    .wrap{max-width:1100px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--t);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.5rem,2.8vw,2.3rem);font-weight:700;color:var(--wh);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-h .gy{color:var(--g);}
    .sec-line{width:36px;height:2px;background:linear-gradient(to right,var(--g),var(--t));margin-bottom:1.1rem;}
    .sec-p{color:var(--w2);font-size:.88rem;font-weight:300;line-height:1.82;max-width:540px;}

    /* ── SERVICES ── */
    .svc{background:var(--d1);}
    .svc-hd{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem;margin-bottom:4rem;}
    .svc-grid{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--bd);}
    .svc-card{
      padding:2rem 1.6rem;border-right:1px solid var(--bd);border-bottom:1px solid var(--bd);
      position:relative;overflow:hidden;transition:background var(--tr);
    }
    .svc-card:nth-child(4n){border-right:none;}
    .svc-card:nth-last-child(-n+4){border-bottom:none;}
    .svc-card::after{content:'';position:absolute;top:0;left:0;width:0;height:2px;background:var(--g);transition:width .45s ease;}
    .svc-card:hover{background:var(--d2);}.svc-card:hover::after{width:100%;}
    .svc-n{font-size:.58rem;color:var(--g);letter-spacing:.22em;font-weight:600;margin-bottom:.9rem;opacity:.65;}
    .svc-t{font-size:.9rem;font-weight:700;color:var(--wh);margin-bottom:.6rem;font-family:Georgia,serif;line-height:1.3;}
    .svc-d{font-size:.78rem;color:var(--w2);line-height:1.75;}

    /* ── ABOUT ── */
    .abt{background:var(--d2);}
    .abt-g{display:grid;grid-template-columns:1fr 1fr;gap:0;}
    /* Left image panel */
    .abt-img-panel{
      position:relative;min-height:540px;
      background:var(--d3);overflow:hidden;
      display:flex;align-items:center;justify-content:center;
    }
    .abt-img-panel::before{content:'';position:absolute;top:0;right:0;width:3px;height:100%;background:linear-gradient(to bottom,transparent,var(--g),transparent);}
    .abt-img-ph{text-align:center;color:var(--mu);font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;opacity:.35;}
    /* Right text panel */
    .abt-txt{padding:5rem 4rem;}
    .why-list{margin-top:1.8rem;display:flex;flex-direction:column;gap:.8rem;}
    .why-row{display:flex;align-items:flex-start;gap:.8rem;}
    .why-chk{color:var(--g);flex-shrink:0;margin-top:1px;}
    .why-t{font-size:.83rem;color:var(--w2);line-height:1.6;}

    /* ── PROCESS ── */
    .proc{background:var(--d1);}
    .proc-hd{margin-bottom:4rem;}
    .proc-steps{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid var(--bd);}
    .pstep{
      padding:2.2rem 1.4rem;border-right:1px solid var(--bd);
      position:relative;transition:background var(--tr);
    }
    .pstep:last-child{border-right:none;}
    .pstep:hover{background:var(--d2);}
    .pstep-bar{position:absolute;bottom:0;left:0;width:0;height:2px;background:linear-gradient(to right,var(--g),var(--t));transition:width .5s ease;}
    .pstep:hover .pstep-bar{width:100%;}
    .pstep-n{font-size:3.2rem;font-weight:700;color:rgba(201,168,76,.08);font-family:Georgia,serif;line-height:1;margin-bottom:.9rem;}
    .pstep-t{font-size:.86rem;font-weight:700;color:var(--wh);margin-bottom:.6rem;font-family:Georgia,serif;}
    .pstep-d{font-size:.76rem;color:var(--w2);line-height:1.72;}

    /* ── PROJECTS ── */
    .prj{background:var(--d2);}
    .prj-hd{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3.5rem;}
    .prj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bd);}
    .prj-card{background:var(--d2);overflow:hidden;transition:all var(--tr);}
    .prj-card:hover{background:var(--d3);}
    .prj-img{
      width:100%;aspect-ratio:16/10;
      background:var(--d4);
      display:flex;align-items:center;justify-content:center;
      position:relative;overflow:hidden;
    }
    .prj-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(10,10,10,.8));}
    .prj-img-tag{
      position:absolute;bottom:.8rem;left:.8rem;z-index:1;
      font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;
      color:var(--g);background:rgba(10,10,10,.7);padding:.25rem .7rem;
    }
    .prj-img-ph{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.1);}
    .prj-body{padding:1.6rem;}
    .prj-name{font-size:.95rem;font-weight:700;color:var(--wh);margin-bottom:.25rem;font-family:Georgia,serif;line-height:1.3;}
    .prj-loc{font-size:.72rem;color:var(--mu);margin-bottom:.5rem;}
    .prj-val{font-size:.76rem;color:var(--g);font-weight:700;margin-bottom:.55rem;}
    .prj-desc{font-size:.76rem;color:var(--w2);line-height:1.68;}

    /* ── CTA (Northcroft style full-width dark panel) ── */
    .cta{
      background:var(--bk);
      border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);
      padding:7rem 1.5rem;
      position:relative;overflow:hidden;
    }
    .cta::before{
      content:'';position:absolute;inset:0;
      background:
        radial-gradient(ellipse 60% 80% at 50% 50%,rgba(201,168,76,.05),transparent),
        radial-gradient(ellipse 40% 60% at 80% 20%,rgba(43,181,200,.03),transparent);
    }
    .cta-in{position:relative;z-index:1;text-align:center;max-width:680px;margin:0 auto;}
    .cta-tag{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--t);margin-bottom:1rem;}
    .cta-h{font-size:clamp(1.8rem,3.5vw,3rem);font-weight:700;color:var(--wh);margin-bottom:1rem;font-family:Georgia,serif;line-height:1.15;}
    .cta-p{color:var(--w1);font-size:.9rem;font-weight:300;margin-bottom:2.5rem;line-height:1.8;opacity:.85;}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

    /* ── CONTACT ── */
    .cnt{background:var(--d2);}
    .cnt-g{display:grid;grid-template-columns:1fr 1.4fr;gap:6rem;margin-top:4rem;}
    .cnt-row{display:flex;gap:1rem;align-items:flex-start;margin-bottom:2rem;}
    .cnt-ico{
      width:44px;height:44px;flex-shrink:0;
      border:1px solid var(--bd);
      display:flex;align-items:center;justify-content:center;color:var(--g);
    }
    .cnt-lbl{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--t);margin-bottom:.2rem;}
    .cnt-val{font-size:.88rem;color:var(--wh);}
    .cnt-note{background:var(--d3);border-left:2px solid var(--g);padding:1.1rem 1.3rem;margin-top:1.8rem;}
    .cnt-note p{font-size:.8rem;color:var(--w2);line-height:1.7;}
    .frow{display:grid;grid-template-columns:1fr 1fr;gap:.9rem;}
    .fg{display:flex;flex-direction:column;gap:.3rem;margin-bottom:.8rem;}
    .fg label{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mu);}
    .fg input,.fg textarea,.fg select{
      background:var(--d3);border:1px solid var(--bdl);color:var(--wh);
      padding:.7rem .9rem;font-size:.86rem;font-family:inherit;
      outline:none;transition:border-color var(--tr);resize:none;
    }
    .fg input::placeholder,.fg textarea::placeholder{color:rgba(136,128,122,.35);}
    .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--g);}
    .fg select option{background:var(--d3);}

    /* ── FOOTER ── */
    .ftr{background:var(--bk);border-top:1px solid var(--bd);padding:5rem 1.5rem 2rem;}
    .ftr-inner{max-width:1100px;margin:0 auto;}
    .ftr-top{display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid var(--bdl);margin-bottom:2rem;}
    .fbrand p{font-size:.8rem;color:var(--mu);line-height:1.78;margin-top:1rem;max-width:255px;}
    .fsoc{display:flex;gap:.6rem;margin-top:1.4rem;}
    .fsc{
      width:32px;height:32px;border:1px solid var(--bdl);
      display:flex;align-items:center;justify-content:center;
      color:var(--mu);transition:all var(--tr);text-decoration:none;
    }
    .fsc:hover{border-color:var(--g);color:var(--g);}
    .fcol h4{font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--g);margin-bottom:1.2rem;font-weight:700;}
    .fcol ul{list-style:none;}.fcol li{margin-bottom:.65rem;}
    .fcol a{color:var(--mu);text-decoration:none;font-size:.8rem;transition:color var(--tr);}
    .fcol a:hover{color:var(--g);}
    .ftr-bot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;}
    .ftr-bot p{font-size:.68rem;color:rgba(136,128,122,.35);}

    /* ── RESPONSIVE ── */
    @media(max-width:1100px){
      .nav{padding:0 2rem;}
      .hero-cnt{padding:0 2rem;}
      .hero-ind{left:2rem;}.hero-scroll{right:2rem;}
      .svc-grid{grid-template-columns:repeat(2,1fr);}
      .svc-card:nth-child(4n){border-right:1px solid var(--bd);}
      .svc-card:nth-child(2n){border-right:none;}
      .abt-g{grid-template-columns:1fr;}
      .abt-img-panel{min-height:320px;}
      .abt-txt{padding:3.5rem 2rem;}
      .proc-steps{grid-template-columns:repeat(3,1fr);}
      .pstep:nth-child(3){border-right:none;}
      .prj-grid{grid-template-columns:repeat(2,1fr);}
      .cnt-g{grid-template-columns:1fr;gap:3rem;}
      .ftr-top{grid-template-columns:1fr 1fr;}
      .intro-g{grid-template-columns:1fr;gap:3rem;}
    }
    @media(max-width:768px){
      .nav{padding:0 1.2rem;height:64px;}
      .nav.sc{height:56px;}
      .nlinks,.nbtn{display:none;}.burger{display:flex;}
      .hero-cnt{padding:0 1.4rem;}
      .svc-grid{grid-template-columns:1fr;}
      .svc-card{border-right:none!important;}
      .svc-card:nth-last-child(-n+4){border-bottom:1px solid var(--bd);}
      .svc-card:last-child{border-bottom:none!important;}
      .proc-steps{grid-template-columns:1fr;}
      .pstep{border-right:none;border-bottom:1px solid var(--bd);}
      .pstep:last-child{border-bottom:none;}
      .prj-grid{grid-template-columns:1fr;}
      .frow{grid-template-columns:1fr;}
      .ftr-top{grid-template-columns:1fr;gap:2rem;}
      section{padding:5rem 1.2rem;}
      .svc-hd,.prj-hd{flex-direction:column;align-items:flex-start;}
    }
    @media(max-width:480px){
      .hero-ind{display:none;}
      .hero-scroll{display:none;}
    }
  `;

  /* ── RENDER ── */
  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav ${sc ? 'sc' : ''}`}>
        <div className="nlogo" onClick={() => go('home')}>
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={56} height={56} style={{ objectFit: 'contain' }} priority />
          <div className="nlogo-text">
            <b>Saif Elite QS</b>
            <span>Quantity Surveyor &amp; Cost Consultant</span>
          </div>
        </div>
        <ul className="nlinks">
          {NAV_LINKS.map(n => (
            <li key={n}>
              <a href={`#${n.toLowerCase()}`} onClick={e => { e.preventDefault(); go(n.toLowerCase()); }}>{n}</a>
            </li>
          ))}
        </ul>
        <button className="nbtn" onClick={() => go('contact')}>Contact Us</button>
        <button className="burger" onClick={() => setMenu(true)}>
          <Svg d="M3 12h18M3 6h18M3 18h18" s={24} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob ${menu ? 'on' : ''}`}>
        <button className="mob-x" onClick={() => setMenu(false)}><Svg d="M18 6 6 18M6 6l12 12" s={26} /></button>
        {NAV_LINKS.map(n => (
          <a key={n} href="#" onClick={e => { e.preventDefault(); go(n.toLowerCase()); }}>{n}</a>
        ))}
        <button className="btn-g" onClick={() => { go('contact'); setMenu(false); }}>Contact Us</button>
      </div>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-accent" />
        <div className="hero-cnt">
          <div className={`hero-eyebrow ${anim ? '' : 'out'}`}>{SLIDES[sl].tag}</div>
          <h1 className={`hero-title ${anim ? '' : 'out'}`}>{SLIDES[sl].title}</h1>
          <p className={`hero-sub ${anim ? '' : 'out'}`}>{SLIDES[sl].sub}</p>
          <div className="hero-btns">
            <button className="btn-g" onClick={() => go('contact')}>
              Free Consultation&nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14} />
            </button>
            <button className="btn-o" onClick={() => go('services')}>Our Services</button>
          </div>
        </div>
        {/* slide indicators */}
        <div className="hero-ind">
          {SLIDES.map((_, i) => (
            <div key={i} className={`hind ${i === sl ? 'a' : ''}`}
              onClick={() => { clearInterval(timer.current); setAnim(false); setTimeout(() => { setSl(i); setAnim(true); }, 350); }}>
              <div className="hind-bar" />
              <span>{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
        <div className="hero-scroll">
          <div className="hscrl-line" />
          <div className="hscrl-txt">Scroll</div>
        </div>
      </section>

      {/* ── INTRO BAND ── */}
      <div className="intro">
        <div className="intro-g">
          <div className="rv rl">
            <div className="intro-tag">About Saif Elite QS</div>
            <h2 className="intro-h">Independent <span className="gy">Quantity Surveyors</span> &amp; Cost Consultants</h2>
            <div className="intro-line" />
            <p className="intro-p">
              Saif Elite QS is a specialist quantity surveying and cost consultancy practice based in Dubai,
              serving clients across the UAE and GCC. We combine rigorous commercial discipline with deep local
              market knowledge — delivering measurable value on every project from initial feasibility through to final account.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <button className="btn-w" onClick={() => go('about')}>
                Learn More&nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={13} />
              </button>
            </div>
          </div>
          <div className="intro-stats rv rr">
            {STATS.map((s, i) => (
              <div key={s.l} className={`istat rv d${i + 1}`}>
                <div className="istat-v">{s.v}</div>
                <div className="istat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="svc">
        <div className="wrap">
          <div className="svc-hd">
            <div className="rv">
              <div className="sec-tag">What We Do</div>
              <h2 className="sec-h">Our <span className="gy">Services</span></h2>
              <div className="sec-line" />
              <p className="sec-p">From initial feasibility through to final account — a complete range of quantity surveying and cost consultancy services tailored to your project needs.</p>
            </div>
            <button className="btn-w rv d2" onClick={() => go('contact')}>
              Discuss Your Project&nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={13} />
            </button>
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

      {/* ── ABOUT ── */}
      <section id="about" className="abt">
        <div className="wrap" style={{ maxWidth: '100%', padding: 0 }}>
          <div className="abt-g">
            {/* image panel */}
            <div className="abt-img-panel rv rl">
              <div className="abt-img-ph">Project / Team Image</div>
            </div>
            {/* text panel */}
            <div className="abt-txt rv rr">
              <div className="sec-tag">Who We Are</div>
              <h2 className="sec-h">About <span className="gy">Saif Elite QS</span></h2>
              <div className="sec-line" />
              <p className="sec-p" style={{ marginBottom: '1rem' }}>
                Saif Elite QS is a specialist quantity surveying and cost consultancy practice based in Dubai,
                serving clients across the UAE and GCC. We bring rigorous commercial discipline to every project —
                whether a boutique residential development or a landmark commercial scheme.
              </p>
              <p className="sec-p" style={{ marginBottom: '1rem' }}>
                Founded on the principles of transparency, accuracy and client-first service, our qualified team
                delivers measurable value at every stage of the construction process. We work alongside developers,
                contractors, architects and project managers to ensure cost is always controlled and every decision
                is fully informed.
              </p>
              <p className="sec-p">
                Our approach combines deep local market knowledge with internationally recognised professional
                standards — giving clients the confidence that their investment is in expert hands from day one.
              </p>
              <div className="why-list">
                {WHY.map((w, i) => (
                  <div key={i} className="why-row">
                    <span className="why-chk"><Svg d="M20 6 9 17l-5-5" s={14} /></span>
                    <span className="why-t">{w}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2.2rem' }}>
                <button className="btn-g" onClick={() => go('contact')}>
                  Work With Us&nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="proc">
        <div className="wrap">
          <div className="proc-hd rv">
            <div className="sec-tag">How We Work</div>
            <h2 className="sec-h">Our <span className="gy">Process</span></h2>
            <div className="sec-line" />
            <p className="sec-p">A structured, transparent approach that gives you complete visibility and control over your project costs from inception through to final account.</p>
          </div>
          <div className="proc-steps">
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

      {/* ── PROJECTS ── */}
      <section id="projects" className="prj">
        <div className="wrap">
          <div className="prj-hd">
            <div className="rv">
              <div className="sec-tag">Our Work</div>
              <h2 className="sec-h">Featured <span className="gy">Projects</span></h2>
              <div className="sec-line" />
            </div>
            <button className="btn-w rv d2" style={{ fontSize: '.7rem' }}>
              View All&nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={13} />
            </button>
          </div>
          <div className="prj-grid">
            {PROJS.map((p, i) => (
              <div key={p.n} className={`prj-card rv d${(i % 3) + 1}`}>
                <div className="prj-img">
                  <span className="prj-img-ph">Project Image</span>
                  <div className="prj-img-tag">{p.tag}</div>
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

      {/* ── CTA ── */}
      <div className="cta">
        <div className="cta-in rv">
          <div className="cta-tag">Start Today</div>
          <h2 className="cta-h">Ready to Control Your Project Costs?</h2>
          <p className="cta-p">
            Get in touch for a free, no-obligation initial consultation. Our senior QS consultants will
            respond within one business day to discuss how we can help protect your investment.
          </p>
          <div className="cta-btns">
            <button className="btn-g" onClick={() => go('contact')}>
              Request a Consultation&nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14} />
            </button>
            <button className="btn-o" onClick={() => go('services')}>View Our Services</button>
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="cnt">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">Get in Touch</div>
            <h2 className="sec-h">Contact <span className="gy">Us</span></h2>
            <div className="sec-line" />
          </div>
          <div className="cnt-g">
            {/* left info */}
            <div className="rv rl">
              <p className="sec-p" style={{ marginBottom: '2.5rem' }}>
                Have a project in mind? Reach out and a senior consultant will respond within one business
                day with a no-obligation discussion of how we can support you.
              </p>
              {CNTS.map(c => (
                <div key={c.l} className="cnt-row">
                  <div className="cnt-ico"><Svg d={c.i} s={17} /></div>
                  <div>
                    <div className="cnt-lbl">{c.l}</div>
                    <div className="cnt-val">{c.v}</div>
                  </div>
                </div>
              ))}
              <div className="cnt-note">
                <p><strong style={{ color: 'var(--g)' }}>Response Guarantee —</strong> We respond to every enquiry within one business day. For urgent requirements please call us directly.</p>
              </div>
            </div>
            {/* right form */}
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
                <textarea rows={5} placeholder="Tell us about your project — type, location, approximate value and programme..."
                  value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
              </div>
              <button className="btn-g btn-full">
                Send Enquiry&nbsp;<Svg d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z" s={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ftr">
        <div className="ftr-inner">
          <div className="ftr-top">
            <div className="fbrand">
              <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={72} height={72} style={{ objectFit: 'contain' }} />
              <p>Professional Quantity Surveying and Cost Consultancy across the UAE and GCC. Trusted by developers, contractors and investors to deliver commercial clarity on every project.</p>
              <div className="fsoc">
                {[
                  "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
                  "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"
                ].map((d, i) => (
                  <a key={i} href="#" className="fsc" aria-label="social"><Svg d={d} s={14} /></a>
                ))}
              </div>
            </div>
            <div className="fcol">
              <h4>Services</h4>
              <ul>{SVCS.slice(0, 6).map(s => <li key={s.n}><a href="#services" onClick={e => { e.preventDefault(); go('services'); }}>{s.t}</a></li>)}</ul>
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <ul>
                {[['About Us', 'about'], ['Our Process', 'process'], ['Projects', 'projects'], ['Contact', 'contact']].map(([t, h]) => (
                  <li key={t}><a href={`#${h}`} onClick={e => { e.preventDefault(); go(h); }}>{t}</a></li>
                ))}
              </ul>
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
            <p>© 2025 <span style={{ color: 'var(--g)' }}>Saif Elite QS</span>. All rights reserved.</p>
            <p>Quantity Surveyor &amp; Cost Consultant — Dubai, UAE</p>
          </div>
        </div>
      </footer>
    </>
  );
}
