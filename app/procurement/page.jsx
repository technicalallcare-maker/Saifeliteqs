'use client';
import { useState, useEffect, useRef } from 'react';
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

const WHAT_WE_OFFER = [
  { n:'01', t:'Building Materials Supply', d:'Direct supply of premium building materials — structural steel, concrete, mechanical systems, electrical equipment, finishing materials and more. Direct relationships with manufacturers and suppliers globally.' },
  { n:'02', t:'Procurement Strategy & Management', d:'End-to-end procurement guidance — from procurement route selection, tender strategy, supplier evaluation, contract negotiation and supply chain management throughout your project.' },
  { n:'03', t:'Supply Chain Visibility & Control', d:'Complete transparency on material sourcing, logistics, delivery timelines and cost. Real-time tracking of your supply chain from factory to site.' },
  { n:'04', t:'Cost Optimisation', d:'Leverage our global supplier relationships and negotiating power to secure best-in-class pricing without compromising quality or delivery reliability.' },
];

const PROC_STEPS = [
  { t:'Initial Procurement Assessment', d:'We review your project specifications, budget, programme and procurement requirements to develop an optimal sourcing strategy.' },
  { t:'Supplier Identification & Evaluation', d:'We identify qualified suppliers from our global network, conduct due diligence and provide recommendations on supplier selection.' },
  { t:'Negotiation & Contracting', d:'We negotiate terms, pricing and delivery schedules with suppliers, preparing contracts that protect your interests and ensure compliance.' },
  { t:'Supply Chain Management', d:'We manage the supply chain throughout delivery — tracking shipments, managing logistics and ensuring materials arrive on schedule and on budget.' },
  { t:'Quality & Delivery Assurance', d:'We verify material quality upon receipt and manage any issues, ensuring what arrives on site meets specification and project requirements.' },
];

const MATERIALS = [
  { n:'01', t:'Structural Materials', d:'Reinforced steel, concrete beams, columns and structural frameworks sourced from certified manufacturers globally.' },
  { n:'02', t:'Mechanical Systems', d:'HVAC equipment, plumbing fixtures, pumps, compressors and boilers from leading international brands.' },
  { n:'03', t:'Electrical Systems', d:'Cables, switchgear, lighting, transformers and distribution boards meeting international safety standards.' },
  { n:'04', t:'Finishing Materials', d:'Premium marble, tiles, granite, paint, wood, insulation and glass for luxury and commercial projects.' },
  { n:'05', t:'Safety & Temporary Works', d:'Scaffolding, safety equipment, temporary partitions and formwork systems for safe site delivery.' },
  { n:'06', t:'Specialised Systems', d:'Fire suppression, security systems and smart building controls for modern construction requirements.' },
];

const REGIONS = [
  { region:'Europe', countries:'Germany, UK, Ireland, Italy, Spain, France, Belgium, Netherlands' },
  { region:'Asia-Pacific', countries:'China, India, Japan, Vietnam, Thailand, Singapore, Indonesia, Bangladesh, Australia, New Zealand' },
  { region:'Middle East & Americas', countries:'UAE, Qatar, Saudi Arabia, Kuwait, USA, Canada' },
];

const WHY_PROCURE = [
  'Direct manufacturer relationships — eliminating middlemen and reducing costs',
  'Competitive pricing through volume negotiation and long-term partnerships',
  'Reliable delivery schedules with supply chain tracking and contingency planning',
  'Quality assurance and inspection protocols to ensure specification compliance',
  'Customs clearance and logistics management for international shipments',
  'Local market expertise combined with global sourcing capability',
];

const SAVINGS = [
  { v:'15-25%', l:'Average Cost Reduction' },
  { v:'98%', l:'On-Time Delivery Rate' },
  { v:'18+', l:'Countries Covered' },
  { v:'200+', l:'Active Suppliers' },
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

  /* scroll reveal */
  useEffect(() => {
    const run = () => document.querySelectorAll('.rv').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('on');
    });
    run(); window.addEventListener('scroll', run, { passive: true });
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

    /* FLOATING SOCIAL — desktop only */
    .float-social{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:500;display:flex;flex-direction:column;gap:0;}
    .float-social a{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--navy);color:#fff;text-decoration:none;transition:all var(--tr);border-bottom:1px solid rgba(255,255,255,.1);}
    .float-social a:hover{background:var(--gold);width:52px;}
    .float-social a.wa{background:#25D366;}
    .float-social a.wa:hover{background:#1ebe5d;}
    .float-social a:first-child{border-radius:0 4px 0 0;}
    .float-social a:last-child{border-radius:0 0 4px 0;border-bottom:none;}

    /* MOBILE FIXED BUTTONS */
    .mob-call{position:fixed;left:1rem;bottom:1.4rem;z-index:500;width:48px;height:48px;border-radius:50%;background:var(--navy);color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25);}
    .mob-wa{position:fixed;right:1rem;bottom:1.4rem;z-index:500;width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(37,211,102,.4);}

    /* NAV — SAME AS HOME PAGE */
    .nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;height:90px;padding:0 3rem;transition:all .4s;background:rgba(14,17,24,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(184,145,42,.2);}
    .nav.sc{height:72px;}
    .nlogo{display:flex;align-items:center;gap:.8rem;cursor:pointer;}
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

    /* BUTTONS — SAME AS HOME */
    .btn-gold{display:inline-flex;align-items:center;gap:.5rem;background:var(--gold);color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;font-family:inherit;transition:all var(--tr);position:relative;overflow:hidden;text-decoration:none;}
    .btn-gold::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transition:left .5s;}
    .btn-gold:hover{background:var(--gold-lt);transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,145,42,.3);}
    .btn-gold:hover::before{left:100%;}
    .btn-ol-gold{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold);padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid var(--gold);cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-ol-gold:hover{background:var(--gold);color:#fff;}
    .btn-white{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(255,255,255,.4);cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-white:hover{background:rgba(255,255,255,.1);border-color:#fff;}

    /* HERO — SAME STYLE AS HOME */
    .hero{position:relative;width:100%;height:100vh;min-height:640px;overflow:hidden;}
    .hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(10,13,20,.88) 50%,rgba(10,13,20,.45) 100%);}
    .hero-cnt{position:relative;z-index:2;height:100%;max-width:1200px;margin:0 auto;padding:0 3rem;display:flex;flex-direction:column;justify-content:center;}
    .hero-tag{display:inline-flex;align-items:center;gap:.8rem;font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1.8rem;}
    .hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .hero-h{font-size:clamp(2.8rem,6vw,5rem);font-weight:700;line-height:1.08;color:#fff;font-family:Georgia,serif;margin-bottom:1.4rem;}
    .hero-h span{display:block;}.hero-h span:last-child{color:var(--gold-lt);}
    .hero-sub{font-size:1rem;color:rgba(255,255,255,.72);font-weight:300;max-width:500px;margin-bottom:3rem;line-height:1.75;}
    .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;}

    /* STATS BAND */
    .statsband{background:var(--white);padding:3.5rem 1.5rem;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
    .stat{text-align:center;padding:1rem 1.5rem;position:relative;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:var(--border);}
    .stat-v{font-size:2.6rem;font-weight:700;color:var(--gold);font-family:Georgia,serif;line-height:1;margin-bottom:.5rem;}
    .stat-l{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--txt2);}

    /* SECTION — SAME AS HOME */
    section{padding:8rem 1.5rem;}
    .wrap{max-width:1100px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.2rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;font-weight:400;line-height:1.82;max-width:560px;}

    /* SERVICES (What We Offer) — SAME AS HOME SVC */
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

    /* ABOUT (About Procurement) — SAME AS HOME ABT */
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

    /* PROCESS — SAME AS HOME PROC */
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

    /* MATERIALS — Using SVC style on light bg */
    .mat{background:var(--off);}
    .mat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid var(--border);margin-top:3.5rem;background:var(--white);}
    .mat-card{padding:2.2rem 1.8rem;border-right:1px solid var(--border);border-bottom:1px solid var(--border);position:relative;overflow:hidden;transition:background var(--tr),transform var(--tr);}
    .mat-card:nth-child(3n){border-right:none;}
    .mat-card:nth-last-child(-n+3){border-bottom:none;}
    .mat-card::after{content:'';position:absolute;top:0;left:0;width:0;height:3px;background:linear-gradient(to right,var(--gold),var(--gold-lt));transition:width .5s ease;}
    .mat-card:hover{background:var(--off);transform:translateY(-3px);}
    .mat-card:hover::after{width:100%;}
    .mat-n{font-size:.58rem;color:var(--gold);letter-spacing:.22em;font-weight:700;margin-bottom:.9rem;}
    .mat-t{font-size:.9rem;font-weight:700;color:var(--navy);margin-bottom:.6rem;font-family:Georgia,serif;}
    .mat-d{font-size:.8rem;color:var(--txt2);line-height:1.75;}

    /* REGIONS */
    .reg{background:var(--dark);}
    .reg .sec-h{color:#fff;}.reg .sec-p{color:rgba(255,255,255,.6);}
    .reg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:3.5rem;}
    .reg-card{padding:2.4rem 1.8rem;border-right:1px solid rgba(255,255,255,.08);position:relative;transition:background var(--tr);}
    .reg-card:last-child{border-right:none;}
    .reg-card:hover{background:rgba(255,255,255,.03);}
    .reg-card::after{content:'';position:absolute;top:0;left:0;width:0;height:3px;background:linear-gradient(to right,var(--gold),var(--gold-lt));transition:width .5s ease;}
    .reg-card:hover::after{width:100%;}
    .reg-name{font-size:1.1rem;font-weight:700;color:var(--gold-lt);font-family:Georgia,serif;margin-bottom:.8rem;}
    .reg-c{font-size:.82rem;color:rgba(255,255,255,.6);line-height:1.85;}

    /* CTA */
    .cta{position:relative;overflow:hidden;padding:8rem 1.5rem;text-align:center;}
    .cta-overlay{position:absolute;inset:0;z-index:1;background:rgba(10,13,20,.82);}
    .cta-in{position:relative;z-index:2;max-width:700px;margin:0 auto;}
    .cta-tag{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(212,170,64,.85);margin-bottom:1rem;}
    .cta-h{font-size:clamp(1.8rem,3.5vw,3rem);font-weight:700;color:#fff;margin-bottom:1rem;font-family:Georgia,serif;line-height:1.15;}
    .cta-p{color:rgba(255,255,255,.65);font-size:.9rem;font-weight:300;margin-bottom:2.5rem;line-height:1.8;}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

    /* CONTACT — SAME AS HOME CNT */
    .cnt{background:var(--white);}
    .cnt-g{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;margin-top:4rem;}
    .cnt-row{display:flex;gap:1rem;align-items:flex-start;}
    .cnt-ico{width:44px;height:44px;flex-shrink:0;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--gold);}
    .cnt-lbl{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.2rem;}
    .cnt-val{font-size:.82rem;color:var(--txt);font-weight:500;}

    /* FOOTER — SAME AS HOME */
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

    /* RESPONSIVE */
    @media(max-width:1100px){
      .nav{padding:0 2rem;}
      .hero-cnt{padding:0 2rem;}
      .svc-grid{grid-template-columns:repeat(2,1fr);}
      .svc-card:nth-child(4n){border-right:1px solid rgba(255,255,255,.08);}
      .svc-card:nth-child(2n){border-right:none!important;}
      .abt-g{grid-template-columns:1fr;}
      .abt-img{min-height:280px;}
      .abt-img::after{width:100%;height:50%;top:auto;bottom:0;background:linear-gradient(to bottom,transparent 0%,var(--off) 100%);}
      .abt-txt{padding:2rem 1.4rem 4rem;margin-left:0!important;}
      .proc-grid{grid-template-columns:repeat(3,1fr);}
      .mat-grid{grid-template-columns:repeat(2,1fr);}
      .mat-card:nth-child(3n){border-right:1px solid var(--border);}
      .mat-card:nth-child(2n){border-right:none;}
      .reg-grid{grid-template-columns:1fr;}
      .reg-card{border-right:none;border-bottom:1px solid rgba(255,255,255,.08);}
      .reg-card:last-child{border-bottom:none;}
      .cnt-g{grid-template-columns:repeat(2,1fr);}
      .ftr-main-in{grid-template-columns:1fr 1fr;}
    }
    @media(max-width:768px){
      .float-social{display:none;}
      .mob-call{display:flex;}
      .mob-wa{display:flex;}
      .nav{padding:0 1.2rem;height:70px;}.nav.sc{height:60px;}
      .nlinks,.nbtn{display:none;}.burger{display:flex;}
      .hero-cnt{padding:0 1.4rem;}
      .stats-g{grid-template-columns:1fr 1fr;}
      .stat:nth-child(2)::after{display:none;}
      .svc-grid{grid-template-columns:1fr;}
      .svc-card{border-right:none!important;}
      .proc-grid{grid-template-columns:1fr;}
      .pstep{border-right:none;border-bottom:1px solid var(--border);}
      .pstep:last-child{border-bottom:none;}
      .mat-grid{grid-template-columns:1fr;}
      .mat-card{border-right:none!important;}
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

      {/* NAV — SAME AS HOME PAGE */}
      <nav className={`nav ${sc?'sc':''}`}>
        <Link href="/" className="nlogo" style={{textDecoration:'none'}}>
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={100} height={100} style={{objectFit:'contain'}} priority/>
          <div className="nlogo-txt"><b>Saif Elite QS</b><span>Quantity Surveyor &amp; Cost Consultant</span></div>
        </Link>
        <ul className="nlinks">
          {NAV.map(n=>(
            <li key={n}>
              {n === 'Procurement' ? (
                <a className="active">{n}</a>
              ) : n === 'Home' ? (
                <Link href="/">{n}</Link>
              ) : (
                <a onClick={()=>goHome(n.toLowerCase())}>{n}</a>
              )}
            </li>
          ))}
        </ul>
        <button className="nbtn" onClick={()=>goHome('contact')}>Contact Us</button>
        <button className="burger" onClick={()=>setMenu(true)}><Svg d="M3 12h18M3 6h18M3 18h18" s={24}/></button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob ${menu?'on':''}`}>
        <button className="mob-x" onClick={()=>setMenu(false)}><Svg d="M18 6 6 18M6 6l12 12" s={26}/></button>
        {NAV.map(n=>(
          <div key={n}>
            {n === 'Procurement' ? (
              <a style={{color:'var(--gold-lt)'}}>{n}</a>
            ) : n === 'Home' ? (
              <Link href="/" onClick={()=>setMenu(false)}>{n}</Link>
            ) : (
              <a onClick={()=>goHome(n.toLowerCase())}>{n}</a>
            )}
          </div>
        ))}
        <button className="btn-gold" onClick={()=>goHome('contact')}>Contact Us</button>
      </div>

      {/* HERO — SAME STYLE AS HOME, using existing image */}
      <section className="hero">
        <div style={{position:'absolute',inset:0,zIndex:0}}>
          <Image src="/images/hero_section2.jpg" alt="Procurement" fill sizes="100vw" style={{objectFit:'cover',objectPosition:'center'}} priority/>
        </div>
        <div className="hero-overlay"/>
        <div className="hero-cnt">
          <div className="hero-tag">Procurement &amp; Supply Chain Excellence</div>
          <h1 className="hero-h"><span>Strategic Sourcing.</span><span>Delivered Globally.</span></h1>
          <p className="hero-sub">Building materials procurement and supply chain management across 18+ countries</p>
          <div className="hero-btns">
            <button className="btn-gold" onClick={()=>goHome('contact')}>Request a Quote &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></button>
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

      {/* WHAT WE OFFER — SAME STYLE AS HOME SERVICES */}
      <section id="offer" className="svc">
        <div className="wrap">
          <div className="svc-hd">
            <div className="rv">
              <div className="sec-tag">What We Offer</div>
              <h2 className="sec-h">Procurement Services</h2>
              <div className="sec-line"/>
              <p className="sec-p">From building material supply to complete supply chain management — a full procurement service tailored to your project requirements.</p>
            </div>
            <button className="btn-ol-gold rv d2" onClick={()=>goHome('contact')}>Discuss Your Project &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={13}/></button>
          </div>
          <div className="svc-grid">
            {WHAT_WE_OFFER.map((s,i)=>(<div key={s.n} className={`svc-card rv d${(i%4)+1}`}><div className="svc-n">{s.n}</div><div className="svc-t">{s.t}</div><div className="svc-d">{s.d}</div></div>))}
          </div>
        </div>
      </section>

      {/* ABOUT — SAME STYLE AS HOME ABOUT, using existing image */}
      <section className="abt">
        <div style={{maxWidth:'100%'}}>
          <div className="abt-g">
            <div className="abt-img rv rl" style={{position:'relative'}}>
              <Image src="/images/about_section1.jpeg" alt="About Procurement" fill sizes="50vw" style={{objectFit:'cover',objectPosition:'center'}}/>
            </div>
            <div className="abt-txt rv rr">
              <div className="sec-tag">Why Choose Us</div>
              <h2 className="sec-h">Strategic Procurement Partner</h2>
              <div className="sec-line"/>
              <p className="sec-p" style={{marginBottom:'1rem'}}>Saif Elite QS provides comprehensive procurement and building materials supply services backed by our quantity surveying expertise — ensuring every material sourced delivers value, quality and reliability.</p>
              <p className="sec-p" style={{marginBottom:'1rem'}}>With direct manufacturer relationships across 18+ countries and a deep understanding of construction project requirements, we deliver procurement solutions that reduce costs and minimise supply chain risk.</p>
              <div className="why-list">
                {WHY_PROCURE.map((w,i)=>(<div key={i} className="why-row"><span className="why-chk"><Svg d="M20 6 9 17l-5-5" s={14} w={2.5}/></span><span className="why-t">{w}</span></div>))}
              </div>
              <div style={{marginTop:'2.2rem'}}><button className="btn-gold" onClick={()=>goHome('contact')}>Work With Us &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></button></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS — SAME STYLE AS HOME PROCESS */}
      <section className="proc">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">How We Work</div>
            <h2 className="sec-h">Our Procurement Process</h2>
            <div className="sec-line"/>
            <p className="sec-p">A structured, transparent approach to procurement giving you complete visibility from initial assessment through to final delivery.</p>
          </div>
          <div className="proc-grid">
            {PROC_STEPS.map((p,i)=>(<div key={p.t} className={`pstep rv d${i+1}`}><div className="pstep-bar"/><div className="pstep-ico"><Svg d={PROC_ICONS[i]} s={22} w={1.5}/></div><div className="pstep-t">{p.t}</div><div className="pstep-d">{p.d}</div></div>))}
          </div>
        </div>
      </section>

      {/* MATERIALS — SAME STYLE AS HOME SECTIONS */}
      <section className="mat">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">What We Supply</div>
            <h2 className="sec-h">Building Materials</h2>
            <div className="sec-line"/>
            <p className="sec-p">A comprehensive range of construction materials sourced directly from certified manufacturers — covering every requirement of modern construction projects.</p>
          </div>
          <div className="mat-grid">
            {MATERIALS.map((m,i)=>(<div key={m.n} className={`mat-card rv d${(i%3)+1}`}><div className="mat-n">{m.n}</div><div className="mat-t">{m.t}</div><div className="mat-d">{m.d}</div></div>))}
          </div>
        </div>
      </section>

      {/* REGIONS — DARK SECTION */}
      <section className="reg">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag" style={{color:'var(--gold-lt)'}}>Global Reach</div>
            <h2 className="sec-h">Supplier Network</h2>
            <div className="sec-line"/>
            <p className="sec-p">Direct relationships with certified suppliers across Europe, Asia-Pacific and the Middle East — sourcing materials where quality and value align.</p>
          </div>
          <div className="reg-grid">
            {REGIONS.map((r,i)=>(<div key={r.region} className={`reg-card rv d${i+1}`}><div className="reg-name">{r.region}</div><div className="reg-c">{r.countries}</div></div>))}
          </div>
        </div>
      </section>

      {/* CTA — SAME STYLE AS HOME, using existing image */}
      <div className="cta" style={{backgroundImage:"url('/images/last_hero_section1.jpeg')",backgroundSize:'cover',backgroundPosition:'center'}}>
        <div className="cta-overlay"/>
        <div className="cta-in rv">
          <div className="cta-tag">Start Today</div>
          <h2 className="cta-h">Ready to Optimise Your Supply Chain?</h2>
          <p className="cta-p">Get in touch for a no-obligation procurement consultation. Our team will respond within one business day with a tailored solution.</p>
          <div className="cta-btns">
            <button className="btn-gold" onClick={()=>goHome('contact')}>Request a Quote &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></button>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-white">WhatsApp Us</a>
          </div>
        </div>
      </div>

      {/* CONTACT — SAME STYLE AS HOME */}
      <section className="cnt">
        <div className="wrap">
          <div className="rv"><div className="sec-tag">Get in Touch</div><h2 className="sec-h">Contact Us</h2><div className="sec-line"/><p className="sec-p">Reach out for procurement and supply chain enquiries. Our team responds within one business day.</p></div>
          <div className="cnt-g">
            {CNTS.map((c,i)=>(<div key={c.l} className={`cnt-row rv d${i+1}`}><div className="cnt-ico"><Svg d={c.d} s={18}/></div><div><div className="cnt-lbl">{c.l}</div><div className="cnt-val">{c.v}</div></div></div>))}
          </div>
        </div>
      </section>

      {/* FOOTER — SAME STYLE AS HOME */}
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
                <li><a onClick={()=>goHome('services')}>Services</a></li>
                <li><a onClick={()=>goHome('about')}>About Us</a></li>
                <li><a onClick={()=>goHome('projects')}>Projects</a></li>
                <li><a onClick={()=>goHome('contact')}>Contact</a></li>
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
