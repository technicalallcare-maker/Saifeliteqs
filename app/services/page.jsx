'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const SVCS = [
  { n:'01', t:'Cost Planning & Estimation', icon:'M9 7H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 7h6', d:'Detailed estimates and cost plans at every design stage — from initial feasibility through to tender, providing reliable budget benchmarks throughout the project lifecycle. Our estimates are grounded in live market data and current contractor pricing across the UAE and GCC.', pts:['Initial feasibility estimates','Elemental cost plans','Tender cost checks','Budget reconciliation'] },
  { n:'02', t:'RICS-AIQS Professional Standards', icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', d:'Saif Elite QS is actively developing under the guidance and standards of RICS (Royal Institution of Chartered Surveyors) and AIQS (Australian Institute of Quantity Surveyors) — ensuring our practice meets the highest internationally recognised benchmarks of quality, ethics and professional competence.', pts:['RICS-aligned methodology','AIQS standard compliance','Ethical professional practice','International benchmark quality'] },
  { n:'03', t:'Bill of Quantities', icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8', d:'Precisely measured Bills of Quantities prepared to standard methods of measurement, forming a transparent basis for tendering, procurement and ongoing cost control. Our BoQs are detailed, auditable and compliant with recognised international measurement standards.', pts:['SMM7 & NRM2 compliant','Full trade breakdown','Electronic & hard copy formats','Transparent measurement'] },
  { n:'04', t:'Contract Administration', icon:'M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16', d:'Expert management of construction contracts — interim valuations, variation assessment, claims handling and final account negotiation to protect your interests throughout the construction programme.', pts:['Interim payment valuations','Variation account management','Extension of time assessment','Final account negotiation'] },
  { n:'05', t:'Project Cost Management', icon:'M18 20V10M12 20V4M6 20v-6', d:'Proactive monitoring, forecasting and reporting throughout construction, keeping your budget on track and identifying commercial risks before they become costly problems. Monthly cost reports give you complete financial visibility at every stage.', pts:['Monthly cost reporting','Cash flow forecasting','Risk & opportunity tracking','Earned value analysis'] },
  { n:'06', t:'Dispute Resolution', icon:'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v4M12 16h.01', d:'Professional quantum preparation and independent review for disputes, adjudications and arbitrations — protecting your commercial position at every stage. We provide clear, evidence-based quantum analysis and expert witness support.', pts:['Quantum preparation','Adjudication support','Expert witness reports','Independent quantum review'] },
  { n:'07', t:'Feasibility Studies', icon:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', d:'Robust financial viability assessments and investment appraisals providing the clarity needed to make sound project decisions before committing capital. Our feasibility studies consider all costs from construction through to lifecycle and operational expenditure.', pts:['Development appraisals','Lifecycle cost analysis','Investment return modelling','Risk-adjusted projections'] },
  { n:'08', t:'Procurement Strategy', icon:'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0', d:'Guidance on the most appropriate procurement routes, contract forms and tendering strategies to achieve best value and minimise commercial risk across your project portfolio.', pts:['Procurement route selection','Contract form advice','Tender strategy development','Contractor pre-qualification'] },
  { n:'09', t:'Value Engineering', icon:'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83', d:'Structured cost reduction exercises identifying opportunities to reduce expenditure without compromising design intent, quality or construction programme. Our value engineering workshops deliver measurable savings before costs are committed.', pts:['Cost reduction workshops','Specification review','Alternative material analysis','Design optimisation'] },
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
  const [active, setActive] = useState(null);

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
    :root{
      --gold:#b8912a;--gold-lt:#d4aa40;--gold-dk:#8a6820;
      --navy:#1a1f2e;--navy2:#252b3a;--dark:#0e1118;
      --white:#fff;--off:#f7f6f3;--light:#efefed;
      --txt:#1e1e1e;--txt2:#444;--muted:#777;--border:#e2ddd6;--tr:.3s ease;
    }
    body{background:var(--white);color:var(--txt);font-family:'Segoe UI',system-ui,sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--light)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}

    .rv{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease;}
    .rv.on{opacity:1;transform:none;}
    .rv.rl{transform:translateX(-26px);}.rv.rl.on{transform:none;}
    .rv.rr{transform:translateX(26px);}.rv.rr.on{transform:none;}
    .d1{transition-delay:.06s}.d2{transition-delay:.12s}.d3{transition-delay:.18s}
    .d4{transition-delay:.24s}.d5{transition-delay:.3s}.d6{transition-delay:.36s}

    .float-social{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:500;display:flex;flex-direction:column;gap:0;}
    .float-social a{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--navy);color:#fff;text-decoration:none;transition:all var(--tr);border-bottom:1px solid rgba(255,255,255,.1);}
    .float-social a:hover{background:var(--gold);width:52px;}
    .float-social a.wa{background:#25D366;}.float-social a.wa:hover{background:#1ebe5d;}
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
    .nbtn{background:var(--gold);color:#fff;border:none;padding:.46rem 1.4rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);}
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

    /* PAGE HERO */
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

    /* STATS BAND */
    .statsband{background:var(--white);padding:3rem 1.5rem;border-bottom:1px solid var(--border);}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
    .stat{text-align:center;padding:1rem 1.5rem;position:relative;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:var(--border);}
    .stat-v{font-size:2.4rem;font-weight:700;color:var(--gold);font-family:Georgia,serif;line-height:1;margin-bottom:.4rem;}
    .stat-l{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--txt2);}

    /* SERVICES GRID */
    .svc-section{padding:6rem 1.5rem;}
    .wrap{max-width:1100px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.2rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;line-height:1.82;max-width:580px;}

    .svc-full-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-top:4rem;}
    .svc-full-card{background:var(--white);padding:2.5rem 2rem;position:relative;overflow:hidden;cursor:pointer;transition:background var(--tr);}
    .svc-full-card::before{content:'';position:absolute;top:0;left:0;width:0;height:3px;background:linear-gradient(to right,var(--gold),var(--gold-lt));transition:width .5s;}
    .svc-full-card:hover,.svc-full-card.open{background:var(--off);}
    .svc-full-card:hover::before,.svc-full-card.open::before{width:100%;}
    .svc-ico{width:50px;height:50px;border:1px solid rgba(184,145,42,.3);display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:1.2rem;transition:all var(--tr);}
    .svc-full-card:hover .svc-ico,.svc-full-card.open .svc-ico{background:var(--gold);color:#fff;border-color:var(--gold);}
    .svc-n{font-size:.56rem;color:var(--gold-lt);letter-spacing:.22em;font-weight:700;margin-bottom:.6rem;opacity:.7;}
    .svc-t{font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:.7rem;font-family:Georgia,serif;line-height:1.3;}
    .svc-d{font-size:.82rem;color:var(--txt2);line-height:1.75;margin-bottom:1rem;}
    .svc-pts{list-style:none;display:flex;flex-direction:column;gap:.5rem;}
    .svc-pts li{font-size:.78rem;color:var(--txt2);display:flex;align-items:flex-start;gap:.5rem;}
    .svc-pts li::before{content:'';display:block;width:6px;height:6px;background:var(--gold);border-radius:50%;flex-shrink:0;margin-top:.45rem;}

    /* CTA BAND */
    .cta-band{background:var(--navy);padding:6rem 1.5rem;text-align:center;}
    .cta-band h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:#fff;font-family:Georgia,serif;margin-bottom:1rem;line-height:1.2;}
    .cta-band p{color:rgba(255,255,255,.6);font-size:.9rem;max-width:520px;margin:0 auto 2.5rem;line-height:1.8;}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
    .cta-tag{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:.8rem;}

    /* FOOTER */
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

    @media(max-width:1100px){.svc-full-grid{grid-template-columns:repeat(2,1fr);}.ftr-main-in{grid-template-columns:1fr 1fr;}.stats-g{grid-template-columns:1fr 1fr;}.stat:nth-child(2)::after{display:none;}}
    @media(max-width:768px){.float-social{display:none;}.mob-call{display:flex;}.mob-wa{display:flex;}.nav{padding:0 1.2rem;height:70px;}.nlinks,.nbtn{display:none;}.burger{display:flex;}.svc-full-grid{grid-template-columns:1fr;}.page-hero{padding:8rem 1.2rem 4rem;}}

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
    @media(max-width:768px){.call-bubble{display:none!important;}}
  `;


  return (
    <>
      <style>{CSS}</style>

      <div className="float-social">
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="wa" title="WhatsApp">
          <svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d={WA_PATH}/></svg>
        </a>
        <a href="mailto:info@saifeliteqs.com" title="Email"><Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={18}/></a>
        <a href="https://www.linkedin.com/company/saif-elite-qs" target="_blank" rel="noreferrer" title="LinkedIn"><Svg d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" s={18}/></a>
        <a href="https://www.instagram.com/saifeliteqs/" target="_blank" rel="noreferrer" title="Instagram"><Svg d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" s={18}/></a>
      </div>

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

      <nav className={`nav ${sc?'sc':''}`}>
        <Link href="/" className="nlogo">
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={80} height={80} style={{objectFit:'contain'}} priority/>
          <div className="nlogo-txt"><b>Saif Elite QS</b><span>Quantity Surveyor &amp; Cost Consultant</span></div>
        </Link>
        <ul className="nlinks">
          {NAV.map(n=>(
            <li key={n}>
              <Link href={n==='Home'?'/':`/${n.toLowerCase()}`} className={n==='Services'?'active':''}>{n}</Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="nbtn" style={{textDecoration:'none'}}>Contact Us</Link>
        <button className="burger" onClick={()=>setMenu(true)}><Svg d="M3 12h18M3 6h18M3 18h18" s={24}/></button>
      </nav>

      <div className={`mob ${menu?'on':''}`}>
        <button className="mob-x" onClick={()=>setMenu(false)}><Svg d="M18 6 6 18M6 6l12 12" s={26}/></button>
        {NAV.map(n=>(
          <div key={n}>
            <Link href={n==='Home'?'/':`/${n.toLowerCase()}`} onClick={()=>setMenu(false)}>{n}</Link>
          </div>
        ))}
        <Link href="/contact" className="btn-gold" onClick={()=>setMenu(false)}>Contact Us</Link>
      </div>

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-in">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <Svg d="M9 18l6-6-6-6" s={12}/>
            <span>Services</span>
          </div>
          <div className="page-hero-tag">What We Offer</div>
          <h1>Our <span>QS Services</span></h1>
          <p className="page-hero-p">From initial feasibility through to final account — a complete range of quantity surveying and cost consultancy services tailored to projects of every scale across the UAE, GCC and internationally.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="statsband">
        <div className="stats-g">
          {STATS.map((s,i)=>(<div key={s.l} className={`stat rv d${i+1}`}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>))}
        </div>
      </div>

      {/* SERVICES FULL GRID */}
      <section className="svc-section">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">Our Expertise</div>
            <h2 className="sec-h">Complete Quantity Surveying Services</h2>
            <div className="sec-line"/>
            <p className="sec-p">Every service is delivered by qualified professionals committed to RICS and AIQS standards — giving you measurable confidence at every stage of your project.</p>
          </div>
          <div className="svc-full-grid">
            {SVCS.map((s,i)=>(
              <div key={s.n} className={`svc-full-card rv d${(i%3)+1} ${active===i?'open':''}`} onClick={()=>setActive(active===i?null:i)}>
                <div className="svc-ico"><Svg d={s.icon} s={22}/></div>
                <div className="svc-n">{s.n}</div>
                <div className="svc-t">{s.t}</div>
                <div className="svc-d">{s.d}</div>
                <ul className="svc-pts">
                  {s.pts.map(p=><li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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

      {/* FOOTER */}
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
              <ul>{SVCS.slice(0,6).map(s=>(<li key={s.n}><Link href="/services">{s.t}</Link></li>))}</ul>
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/procurement">Procurement</Link></li>
                <li><Link href="/contact">Contact</Link></li>
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
