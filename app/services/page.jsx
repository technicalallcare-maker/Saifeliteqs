'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const PILLARS = [
  {
    num: '01', title: 'Pre-Contract Services', slug: 'pre-contract',
    icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2',
    tag: 'Everything before a contract is signed',
    desc: 'From initial feasibility through to tender documentation — complete pre-contract QS services that establish robust financial benchmarks and protect your position before any commitment is made.',
    count: '16 Services',
    services: ['Feasibility Studies & Development Appraisals','Order of Cost Estimates','Elemental Cost Planning','Whole Life Costing (WLC)','Bill of Quantities (BoQ) Preparation','Pre-Tender Estimates (PTE)','Procurement Strategy & Route Advice','Contract Form Selection','Tender Documentation & Administration','Contractor Pre-Qualification','Tender Analysis & Tender Reports','Tender Negotiation & Bid Award Support','Value Engineering & Cost Optimisation','Design & Specification Peer Review','Verification of Tender BoQ Quantities','Contract Document Preparation'],
  },
  {
    num: '02', title: 'Post-Contract Services', slug: 'post-contract',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    tag: 'From site mobilisation to final account',
    desc: 'Proactive cost management throughout the construction phase — interim valuations, variation assessment, monthly cost reporting and final account negotiation to keep your project on budget.',
    count: '12 Services',
    services: ['Interim Payment Valuations','Variation Order Assessment & Management','Provisional Sum & PC Item Administration','Re-measurement of Quantities','Monthly Cost Reporting','Cash Flow Forecasting & Cost Control','Risk & Opportunity Register Management','Change Management Procedures','Extension of Time (EOT) Assessment','Final Account Preparation & Negotiation','Retention & Defects Liability Administration','Secondment of Quantity Surveyors'],
  },
  {
    num: '03', title: 'Contract Administration', slug: 'contract-admin',
    icon: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
    tag: 'Commercial oversight across the full programme',
    desc: "Acting as Employer's Agent or Commercial Manager — complete contract administration under FIDIC, JCT or NEC, with rigorous claims management and programme oversight.",
    count: '6 Services',
    services: ["Contract Administration (Employer's Agent / Engineer's Rep)",'Commercial Management','Claims Preparation & Management','Notice & Correspondence Management','Insurance & Bonds Advisory','Programme & Delay Analysis'],
  },
  {
    num: '04', title: 'Dispute Resolution & Claims', slug: 'dispute',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    tag: 'Protecting your commercial position',
    desc: 'Expert quantum preparation, independent review and expert witness reports for adjudications, arbitrations and UAE court proceedings — RICS-standard evidence for every forum.',
    count: '6 Services',
    services: ['Quantum Preparation','Independent Quantum Review','Expert Witness Reports','Adjudication Support','Mediation & Negotiation Support','Delay & Disruption Analysis'],
  },
];

const SPECIALIST = [
  { t:'BIM / 5D Cost Estimating', d:'Quantity take-off and cost linked directly to the BIM model', icon:'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { t:'Digital Cost Management', d:'Live dashboards, cloud-based reporting and cost benchmarking', icon:'M18 20V10M12 20V4M6 20v-6' },
  { t:'Sustainability Cost Advisory', d:'Cost implications of green building, Estidama & LEED compliance', icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { t:'Insurance Reinstatement Assessments', d:'ICA reports for existing buildings and asset owners', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { t:'Fit-Out & Interior Cost Consultancy', d:'Specialist BoQs and cost management for fit-out packages', icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { t:"Owner's Representative Services", d:'Independent cost oversight for investors and funders', icon:'M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0' },
];

const STATS = [
  { v:'10+', l:'Years of Experience' },
  { v:'200+', l:'Projects Delivered' },
  { v:'AED 2B+', l:'Total Value Managed' },
  { v:'98%', l:'Client Satisfaction' },
];

const NAV = ['Home','Services','About','Procurement','Projects','Contact'];
const PHONE = '+971 50 505 3679';
const WA_LINK = 'https://wa.me/971505053679';
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.5 2C6.253 2 2 6.253 2 11.5c0 1.894.549 3.659 1.497 5.145L2 22l5.488-1.478A9.46 9.46 0 0 0 11.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2z";

export default function ServicesPage() {
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [openPillar, setOpenPillar] = useState(null);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const run = () => document.querySelectorAll('.rv').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('on');
    });
    run(); window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    :root{--gold:#b8912a;--gold-lt:#d4aa40;--gold-dk:#8a6820;--navy:#1a1f2e;--navy2:#252b3a;--dark:#0e1118;--white:#fff;--off:#f7f6f3;--light:#efefed;--txt:#1e1e1e;--txt2:#444;--muted:#777;--border:#e2ddd6;--tr:.3s ease;}
    body{background:var(--white);color:var(--txt);font-family:'Segoe UI',system-ui,sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--light)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
    .rv{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease;}.rv.on{opacity:1;transform:none;}
    .d1{transition-delay:.06s}.d2{transition-delay:.12s}.d3{transition-delay:.18s}.d4{transition-delay:.24s}
    .float-social{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:500;display:flex;flex-direction:column;gap:0;}
    .float-social a{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--navy);color:#fff;text-decoration:none;transition:all var(--tr);border-bottom:1px solid rgba(255,255,255,.1);}
    .float-social a:hover{background:var(--gold);width:52px;}.float-social a.wa{background:#25D366;}.float-social a.wa:hover{background:#1ebe5d;}
    .float-social a:first-child{border-radius:0 4px 0 0;}.float-social a:last-child{border-radius:0 0 4px 0;border-bottom:none;}
    .mob-call{position:fixed;left:1rem;bottom:1.4rem;z-index:500;width:48px;height:48px;border-radius:50%;background:var(--navy);color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25);}
    .mob-wa{position:fixed;right:1rem;bottom:1.4rem;z-index:500;width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(37,211,102,.4);}
    .nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;height:90px;padding:0 3rem;transition:all .4s;background:rgba(14,17,24,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(184,145,42,.2);}
    .nav.sc{height:72px;}
    .nlogo{display:flex;align-items:center;gap:.8rem;cursor:pointer;text-decoration:none;}
    .nlogo-txt{display:flex;flex-direction:column;line-height:1.2;}
    .nlogo-txt b{font-size:.85rem;font-weight:700;color:#fff;letter-spacing:.05em;text-transform:uppercase;}
    .nlogo-txt span{font-size:.56rem;color:rgba(255,255,255,.5);letter-spacing:.2em;text-transform:uppercase;}
    .nlinks{display:flex;align-items:center;gap:2.2rem;list-style:none;}
    .nlinks a{color:rgba(255,255,255,.7);text-decoration:none;font-size:.7rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;transition:color var(--tr);position:relative;padding-bottom:3px;}
    .nlinks a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold-lt);transition:width var(--tr);}
    .nlinks a:hover,.nlinks a.active{color:#fff;}.nlinks a:hover::after,.nlinks a.active::after{width:100%;}
    .nlinks a.active{color:var(--gold-lt);}
    .nbtn{background:var(--gold);color:#fff;border:none;padding:.46rem 1.4rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;display:inline-flex;align-items:center;}
    .nbtn:hover{background:var(--gold-lt);}
    .burger{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:4px;}
    .mob{display:none;position:fixed;inset:0;z-index:199;background:var(--dark);flex-direction:column;align-items:center;justify-content:center;gap:2rem;}
    .mob.on{display:flex;}
    .mob-x{position:absolute;top:1.4rem;right:1.6rem;background:none;border:none;color:rgba(255,255,255,.6);cursor:pointer;}
    .mob a{color:#fff;text-decoration:none;font-size:1.3rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:color var(--tr);}
    .mob a:hover{color:var(--gold-lt);}
    .btn-gold{display:inline-flex;align-items:center;gap:.5rem;background:var(--gold);color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-gold:hover{background:var(--gold-lt);transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,145,42,.3);}
    .btn-ol-gold{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold);padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid var(--gold);cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-ol-gold:hover{background:var(--gold);color:#fff;}
    .page-hero{background:var(--navy);padding:10rem 1.5rem 6rem;position:relative;overflow:hidden;}
    .page-hero::before{content:'';position:absolute;top:-40%;right:-10%;width:600px;height:600px;border-radius:50%;border:1px solid rgba(184,145,42,.08);pointer-events:none;}
    .page-hero::after{content:'';position:absolute;bottom:-20%;left:-5%;width:400px;height:400px;border-radius:50%;border:1px solid rgba(184,145,42,.06);pointer-events:none;}
    .page-hero-in{max-width:1100px;margin:0 auto;position:relative;z-index:2;}
    .breadcrumb{display:flex;align-items:center;gap:.5rem;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:1.2rem;}
    .breadcrumb a{color:rgba(255,255,255,.4);text-decoration:none;transition:color var(--tr);}.breadcrumb a:hover{color:var(--gold-lt);}
    .breadcrumb span{color:var(--gold-lt);}
    .page-hero-tag{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1rem;display:flex;align-items:center;gap:.8rem;}
    .page-hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .page-hero h1{font-size:clamp(2.2rem,5vw,4rem);font-weight:700;color:#fff;font-family:Georgia,serif;line-height:1.1;margin-bottom:1.2rem;}
    .page-hero h1 span{color:var(--gold-lt);}
    .page-hero-p{font-size:1rem;color:rgba(255,255,255,.65);max-width:600px;line-height:1.8;}
    .statsband{background:var(--white);padding:3rem 1.5rem;border-bottom:1px solid var(--border);}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
    .stat{text-align:center;padding:1rem 1.5rem;position:relative;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:var(--border);}
    .stat-v{font-size:2.4rem;font-weight:700;color:var(--gold);font-family:Georgia,serif;line-height:1;margin-bottom:.4rem;}
    .stat-l{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--txt2);}
    .pillars-sec{padding:6rem 1.5rem;background:var(--white);}
    .wrap{max-width:1100px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.2rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;line-height:1.82;max-width:580px;}
    .pillars-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-top:3.5rem;}
    .pillar-card{border:1px solid var(--border);overflow:hidden;transition:all var(--tr);}
    .pillar-card:hover{box-shadow:0 12px 40px rgba(0,0,0,.1);transform:translateY(-3px);}
    .pillar-top{padding:2.5rem 2.2rem;position:relative;}
    .pillar-num{font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:1rem;opacity:.8;}
    .pillar-ico{width:52px;height:52px;border:1px solid rgba(184,145,42,.3);display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:1.2rem;transition:all var(--tr);}
    .pillar-card:hover .pillar-ico{background:var(--gold);color:#fff;border-color:var(--gold);}
    .pillar-title{font-size:1.3rem;font-weight:700;color:var(--navy);font-family:Georgia,serif;margin-bottom:.4rem;line-height:1.2;}
    .pillar-tag{font-size:.72rem;color:var(--gold);font-style:italic;margin-bottom:.8rem;}
    .pillar-desc{font-size:.86rem;color:var(--txt2);line-height:1.75;margin-bottom:1.4rem;}
    .pillar-count{display:inline-flex;align-items:center;gap:.4rem;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:700;background:rgba(184,145,42,.08);padding:.35rem .8rem;border:1px solid rgba(184,145,42,.2);}
    .pillar-actions{display:flex;align-items:center;justify-content:space-between;margin-top:1.5rem;flex-wrap:wrap;gap:.8rem;}
    .pillar-link{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--navy);text-decoration:none;transition:color var(--tr);}
    .pillar-link:hover{color:var(--gold);}
    .pillar-toggle{background:none;border:1px solid var(--border);color:var(--txt2);padding:.35rem .8rem;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);display:flex;align-items:center;gap:.4rem;}
    .pillar-toggle:hover{border-color:var(--gold);color:var(--gold);}
    .pillar-expand{background:var(--off);border-top:1px solid var(--border);max-height:0;overflow:hidden;transition:max-height .5s ease,padding .4s ease;}
    .pillar-expand.open{max-height:800px;padding:1.8rem 2.2rem;}
    .expand-title{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:1rem;}
    .expand-list{display:grid;grid-template-columns:1fr 1fr;gap:.45rem .8rem;}
    .expand-item{display:flex;align-items:flex-start;gap:.5rem;font-size:.8rem;color:var(--txt2);line-height:1.5;}
    .expand-dot{width:5px;height:5px;background:var(--gold);border-radius:50%;flex-shrink:0;margin-top:.45rem;}
    .specialist-sec{background:var(--navy);padding:6rem 1.5rem;}
    .specialist-sec .sec-h{color:#fff;}.specialist-sec .sec-p{color:rgba(255,255,255,.6);}
    .spec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);margin-top:3rem;}
    .spec-card{background:var(--navy);padding:2rem 1.8rem;transition:background var(--tr);position:relative;overflow:hidden;}
    .spec-card::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--gold);transition:width .4s;}
    .spec-card:hover{background:rgba(255,255,255,.04);}.spec-card:hover::after{width:100%;}
    .spec-ico{width:44px;height:44px;border:1px solid rgba(184,145,42,.3);display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:1rem;transition:all var(--tr);}
    .spec-card:hover .spec-ico{background:var(--gold);color:#fff;border-color:var(--gold);}
    .spec-t{font-size:.92rem;font-weight:700;color:#fff;font-family:Georgia,serif;margin-bottom:.5rem;line-height:1.3;}
    .spec-d{font-size:.78rem;color:rgba(255,255,255,.55);line-height:1.7;}
    .cta-band{background:var(--off);padding:6rem 1.5rem;text-align:center;border-top:1px solid var(--border);}
    .cta-band h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:var(--navy);font-family:Georgia,serif;margin-bottom:1rem;line-height:1.2;}
    .cta-band p{color:var(--txt2);font-size:.9rem;max-width:520px;margin:0 auto 2.5rem;line-height:1.8;}
    .cta-tag{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.8rem;}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
    .ftr{background:var(--dark);}
    .ftr-main{padding:5rem 1.5rem 3rem;}
    .ftr-main-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:3.5rem;}
    .ftr-brand-name{font-size:1rem;font-weight:700;color:#fff;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.2rem;}
    .ftr-brand-sub{font-size:.58rem;color:rgba(255,255,255,.35);letter-spacing:.2em;text-transform:uppercase;margin-bottom:1rem;}
    .ftr-brand-p{font-size:.82rem;color:rgba(255,255,255,.45);line-height:1.8;max-width:280px;}
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
    .ftr-bot{padding:1.8rem 1.5rem;border-top:1px solid rgba(255,255,255,.07);}
    .ftr-bot-in{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.6rem;}
    .ftr-bot p{font-size:.7rem;color:rgba(255,255,255,.2);}
    .hl{color:var(--gold-lt);}
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
    @media(max-width:1100px){.pillars-grid{grid-template-columns:1fr;}.ftr-main-in{grid-template-columns:1fr 1fr;}.stats-g{grid-template-columns:1fr 1fr;}.stat:nth-child(2)::after{display:none;}.spec-grid{grid-template-columns:repeat(2,1fr);}}
    @media(max-width:768px){.float-social{display:none;}.mob-call{display:flex;}.mob-wa{display:flex;}.nav{padding:0 1.2rem;height:70px;}.nlinks,.nbtn{display:none;}.burger{display:flex;}.page-hero{padding:8rem 1.2rem 4rem;}.expand-list{grid-template-columns:1fr;}.spec-grid{grid-template-columns:1fr;}.call-bubble{display:none!important;}}
  `;

  return (
    <>
      <style>{CSS}</style>
      <div className="float-social">
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="wa" title="WhatsApp"><svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d={WA_PATH}/></svg></a>
        <a href="mailto:info@saifeliteqs.com" title="Email"><Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={18}/></a>
        <a href="https://www.linkedin.com/company/saif-elite-qs" target="_blank" rel="noreferrer" title="LinkedIn"><Svg d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" s={18}/></a>
        <a href="https://www.instagram.com/saifeliteqs/" target="_blank" rel="noreferrer" title="Instagram"><Svg d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" s={18}/></a>
      </div>
      <a href={`tel:${PHONE}`} className="mob-call" aria-label="Call"><Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" s={22}/></a>
      <a href={WA_LINK} target="_blank" rel="noreferrer" className="mob-wa" aria-label="WhatsApp"><svg width={24} height={24} viewBox="0 0 24 24" fill="white"><path d={WA_PATH}/></svg></a>

      <a href={`tel:${PHONE}`} className="call-bubble" aria-label="Call us" style={{textDecoration:'none'}}>
        <div className="call-bubble-label"><span>Call Us Now</span><span>{PHONE}</span></div>
        <div className="call-bubble-ring">
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
          </svg>
        </div>
      </a>

      <nav className={`nav ${sc?'sc':''}`}>
        <Link href="/" className="nlogo">
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={80} height={80} style={{objectFit:'contain'}} priority/>
          <div className="nlogo-txt"><b>Saif Elite QS</b><span>Quantity Surveyor &amp; Cost Consultant</span></div>
        </Link>
        <ul className="nlinks">
          {NAV.map(n=>(<li key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase()}`} className={n==='Services'?'active':''}>{n}</Link></li>))}
        </ul>
        <Link href="/contact" className="nbtn">Contact Us</Link>
        <button className="burger" onClick={()=>setMenu(true)}><Svg d="M3 12h18M3 6h18M3 18h18" s={24}/></button>
      </nav>
      <div className={`mob ${menu?'on':''}`}>
        <button className="mob-x" onClick={()=>setMenu(false)}><Svg d="M18 6 6 18M6 6l12 12" s={26}/></button>
        {NAV.map(n=>(<div key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase()}`} onClick={()=>setMenu(false)}>{n}</Link></div>))}
        <Link href="/contact" className="btn-gold" onClick={()=>setMenu(false)}>Contact Us</Link>
      </div>

      <div className="page-hero">
        <div className="page-hero-in">
          <div className="breadcrumb"><Link href="/">Home</Link><Svg d="M9 18l6-6-6-6" s={12}/><span>Services</span></div>
          <div className="page-hero-tag">Complete QS Lifecycle</div>
          <h1>Our <span>QS Services</span></h1>
          <p className="page-hero-p">From initial feasibility through to final account — a complete range of quantity surveying and cost consultancy services structured around the full project lifecycle, aligned with RICS and AIQS standards.</p>
        </div>
      </div>

      <div className="statsband">
        <div className="stats-g">
          {STATS.map((s,i)=>(<div key={s.l} className={`stat rv d${i+1}`}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>))}
        </div>
      </div>

      <section className="pillars-sec">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">Our Service Structure</div>
            <h2 className="sec-h">Four Service Pillars</h2>
            <div className="sec-line"/>
            <p className="sec-p">Our services are organised around the full project lifecycle — from early feasibility through to dispute resolution. Each pillar covers a distinct phase, staffed by qualified QS professionals committed to RICS and AIQS standards.</p>
          </div>
          <div className="pillars-grid">
            {PILLARS.map((p,i)=>(
              <div key={p.num} className={`pillar-card rv d${i+1}`}>
                <div className="pillar-top">
                  <div className="pillar-num">Pillar {p.num}</div>
                  <div className="pillar-ico"><Svg d={p.icon} s={22}/></div>
                  <div className="pillar-title">{p.title}</div>
                  <div className="pillar-tag">{p.tag}</div>
                  <div className="pillar-desc">{p.desc}</div>
                  <div className="pillar-count"><Svg d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2" s={13}/>&nbsp;{p.count}</div>
                  <div className="pillar-actions">
                    <Link href={`/services/${p.slug}`} className="pillar-link">View All Services <Svg d="M5 12h14M12 5l7 7-7 7" s={13}/></Link>
                    <button className="pillar-toggle" onClick={()=>setOpenPillar(openPillar===p.num?null:p.num)}>
                      {openPillar===p.num?'Hide':'Preview'} <Svg d={openPillar===p.num?"M18 15l-6-6-6 6":"M6 9l6 6 6-6"} s={12}/>
                    </button>
                  </div>
                </div>
                <div className={`pillar-expand ${openPillar===p.num?'open':''}`}>
                  <div className="expand-title">Services Included</div>
                  <div className="expand-list">
                    {p.services.map(s=>(<div key={s} className="expand-item"><div className="expand-dot"/><span>{s}</span></div>))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="specialist-sec">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag" style={{color:'var(--gold-lt)'}}>Value-Added</div>
            <h2 className="sec-h">Specialist Services</h2>
            <div className="sec-line"/>
            <p className="sec-p">Beyond the core pillars — specialist services that differentiate Saif Elite QS from smaller local competitors and put us on equal footing with international firms.</p>
          </div>
          <div className="spec-grid">
            {SPECIALIST.map((s,i)=>(<div key={s.t} className={`spec-card rv d${(i%3)+1}`}><div className="spec-ico"><Svg d={s.icon} s={20}/></div><div className="spec-t">{s.t}</div><div className="spec-d">{s.d}</div></div>))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="rv">
          <div className="cta-tag">Start Today</div>
          <h2>Ready to Discuss Your Project?</h2>
          <p>Get in touch for a free, no-obligation initial consultation. Our senior consultants will respond within one business day.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-gold">Request a Consultation &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></Link>
            <Link href="/projects" className="btn-ol-gold">View Our Projects</Link>
          </div>
        </div>
      </div>

      <footer className="ftr">
        <div className="ftr-main">
          <div className="ftr-main-in">
            <div>
              <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={70} height={70} style={{objectFit:'contain',marginBottom:'.6rem'}}/>
              <div className="ftr-brand-name">Saif Elite QS</div>
              <div className="ftr-brand-sub">Quantity Surveyor &amp; Cost Consultant</div>
              <p className="ftr-brand-p">Independent QS and cost consultancy headquartered in Dubai, UAE, providing remote QS services across the UK, Ireland, New Zealand and Australia.</p>
              <div className="ftr-brand-contact">
                <a href={`tel:${PHONE}`}><Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" s={15}/>{PHONE}</a>
                <a href="mailto:info@saifeliteqs.com"><Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={15}/>info@saifeliteqs.com</a>
              </div>
              <div className="fsoc">
                <a href="https://www.linkedin.com/company/saif-elite-qs" target="_blank" rel="noreferrer" className="fsc"><Svg d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" s={15}/></a>
                <a href="https://www.facebook.com/people/Saif-Elite-QS/61590199756177/" target="_blank" rel="noreferrer" className="fsc"><Svg d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" s={15}/></a>
                <a href="https://www.instagram.com/saifeliteqs/" target="_blank" rel="noreferrer" className="fsc"><Svg d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" s={15}/></a>
              </div>
            </div>
            <div className="fcol">
              <h4>Services</h4>
              <ul>
                <li><Link href="/services/pre-contract">Pre-Contract Services</Link></li>
                <li><Link href="/services/post-contract">Post-Contract Services</Link></li>
                <li><Link href="/services/contract-admin">Contract Administration</Link></li>
                <li><Link href="/services/dispute">Dispute Resolution</Link></li>
              </ul>
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/procurement">Procurement</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ftr-bot">
          <div className="ftr-bot-in">
            <p>© 2025 <span className="hl">Saif Elite QS</span>. All rights reserved.</p>
            <p>Quantity Surveyor &amp; Cost Consultant — Dubai (HQ) · UK · Ireland · NZ · Australia</p>
          </div>
        </div>
      </footer>
    </>
  );
}
