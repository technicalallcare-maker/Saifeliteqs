'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const WHY = [
  'RICS-aligned professional standards on every commission',
  'Developing under RICS & AIQS guidance — committed to the highest international benchmarks',
  'Dedicated senior QS assigned throughout your project',
  'Deep knowledge of UAE, GCC, UK, Ireland, NZ & Australia construction markets',
  'Transparent reporting — no surprises at final account',
  'Proactive risk identification before problems escalate',
  'Proven track record across all major construction sectors',
];

const STATS = [
  { v:'10+', l:'Years of Experience' },
  { v:'200+', l:'Projects Delivered' },
  { v:'AED 2B+', l:'Total Value Managed' },
  { v:'98%', l:'Client Satisfaction' },
];

const VALUES = [
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', t:'Integrity', d:'We act honestly and transparently in all our professional dealings — our clients always know exactly where they stand.' },
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', t:'Precision', d:'Every estimate, BoQ and report we produce is subject to rigorous internal review — accuracy is non-negotiable in cost consultancy.' },
  { icon:'M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z', t:'Partnership', d:'We work alongside our clients as trusted advisors — not just consultants — invested in the success of every project we touch.' },
  { icon:'M3.055 11H5a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 1 2 2v2.945M8 3.935V5.5A2.5 2.5 0 0 0 10.5 8h.5a2 2 0 0 1 2 2 2 2 0 0 0 4 0 2 2 0 0 1 2-2h1.064M15 20.488V18a2 2 0 0 1 2-2h3.064M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', t:'Global Reach', d:'Headquartered in Dubai with active presence across UK, Ireland, New Zealand and Australia — we bring international perspective to every brief.' },
];

const OFFICES = [
  { flag:'🇦🇪', loc:'Dubai, UAE', role:'Head Office', detail:'Our primary base — home to our senior QS team serving the UAE and GCC markets.' },
  { flag:'🇬🇧', loc:'United Kingdom', role:'Remote QS Services', detail:'Supporting UK-based clients and developers with full QS services delivered remotely.' },
  { flag:'🇮🇪', loc:'Ireland', role:'Remote QS Services', detail:'Serving Irish construction projects with the same rigour as our UAE operations.' },
  { flag:'🇳🇿', loc:'New Zealand', role:'Remote QS Services', detail:'Providing NZ market expertise and cost consultancy for projects across the country.' },
  { flag:'🇦🇺', loc:'Australia', role:'Remote QS Services', detail:'Delivering AIQS-aligned QS services to Australian developers and contractors.' },
];

const NAV = ['Home','Services','About','Procurement','Projects','Contact'];
const PHONE = '+971 50 505 3679';
const WA_LINK = 'https://wa.me/971505053679';
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.5 2C6.253 2 2 6.253 2 11.5c0 1.894.549 3.659 1.497 5.145L2 22l5.488-1.478A9.46 9.46 0 0 0 11.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2z";

export default function AboutPage() {
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
    .rv.rl{transform:translateX(-26px);}.rv.rl.on{transform:none;}.rv.rr{transform:translateX(26px);}.rv.rr.on{transform:none;}
    .d1{transition-delay:.06s}.d2{transition-delay:.12s}.d3{transition-delay:.18s}.d4{transition-delay:.24s}.d5{transition-delay:.3s}

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
    .nlinks a:hover{color:#fff;}.nlinks a:hover::after{width:100%;}
    .nlinks a.active{color:var(--gold-lt);}.nlinks a.active::after{width:100%;}
    .nbtn{background:var(--gold);color:#fff;border:none;padding:.46rem 1.4rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
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
    .btn-ol-white{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:#fff;padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid rgba(255,255,255,.4);cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-ol-white:hover{border-color:#fff;background:rgba(255,255,255,.08);}

    .page-hero{background:var(--navy);padding:10rem 1.5rem 6rem;position:relative;overflow:hidden;}
    .page-hero::before{content:'';position:absolute;top:-40%;right:-10%;width:600px;height:600px;border-radius:50%;border:1px solid rgba(184,145,42,.08);pointer-events:none;}
    .page-hero-in{max-width:1100px;margin:0 auto;position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
    .breadcrumb{display:flex;align-items:center;gap:.5rem;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:1.2rem;}
    .breadcrumb a{color:rgba(255,255,255,.4);text-decoration:none;transition:color var(--tr);}.breadcrumb a:hover{color:var(--gold-lt);}
    .breadcrumb span{color:var(--gold-lt);}
    .page-hero-tag{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1rem;display:flex;align-items:center;gap:.8rem;}
    .page-hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .page-hero h1{font-size:clamp(2rem,4.5vw,3.5rem);font-weight:700;color:#fff;font-family:Georgia,serif;line-height:1.1;margin-bottom:1.2rem;}
    .page-hero h1 span{color:var(--gold-lt);}
    .page-hero-p{font-size:.95rem;color:rgba(255,255,255,.65);line-height:1.82;margin-bottom:2rem;}
    .hero-img-wrap{position:relative;height:400px;border:1px solid rgba(184,145,42,.2);}

    .statsband{background:var(--white);padding:3rem 1.5rem;border-bottom:1px solid var(--border);}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
    .stat{text-align:center;padding:1rem 1.5rem;position:relative;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:var(--border);}
    .stat-v{font-size:2.4rem;font-weight:700;color:var(--gold);font-family:Georgia,serif;line-height:1;margin-bottom:.4rem;}
    .stat-l{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--txt2);}

    section{padding:7rem 1.5rem;}
    .wrap{max-width:1100px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.2rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;line-height:1.82;max-width:580px;}

    /* STORY */
    .story{background:var(--off);}
    .story-g{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
    .story-img{position:relative;height:520px;}
    .story-img-badge{position:absolute;bottom:2rem;left:-2rem;background:var(--gold);color:#fff;padding:1.5rem;z-index:2;text-align:center;}
    .story-img-badge .big{font-size:2rem;font-weight:700;font-family:Georgia,serif;line-height:1;}
    .story-img-badge .sm{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;opacity:.9;}
    .why-list{margin-top:1.8rem;display:flex;flex-direction:column;gap:.9rem;}
    .why-row{display:flex;align-items:flex-start;gap:.8rem;}
    .why-chk{color:var(--gold);flex-shrink:0;margin-top:2px;}
    .why-t{font-size:.84rem;color:var(--txt2);line-height:1.6;}

    /* VALUES */
    .values{background:var(--navy);}
    .values .sec-h{color:#fff;}.values .sec-p{color:rgba(255,255,255,.6);}
    .values-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);margin-top:3.5rem;}
    .val-card{background:var(--navy);padding:2.5rem 2rem;position:relative;overflow:hidden;transition:background var(--tr);}
    .val-card::after{content:'';position:absolute;bottom:0;left:0;width:0;height:3px;background:var(--gold);transition:width .5s;}
    .val-card:hover{background:rgba(255,255,255,.04);}.val-card:hover::after{width:100%;}
    .val-ico{width:52px;height:52px;border:1px solid rgba(184,145,42,.3);display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:1.4rem;transition:all var(--tr);}
    .val-card:hover .val-ico{background:var(--gold);color:#fff;border-color:var(--gold);}
    .val-t{font-size:1rem;font-weight:700;color:#fff;font-family:Georgia,serif;margin-bottom:.7rem;}
    .val-d{font-size:.8rem;color:rgba(255,255,255,.55);line-height:1.75;}

    /* OFFICES */
    .offices{background:var(--white);}
    .offices-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1.5rem;margin-top:3rem;}
    .office-card{padding:2rem 1.5rem;border:1px solid var(--border);position:relative;transition:all var(--tr);}
    .office-card::before{content:'';position:absolute;top:0;left:0;width:0;height:3px;background:var(--gold);transition:width .4s;}
    .office-card:hover{background:var(--off);box-shadow:0 8px 24px rgba(0,0,0,.06);transform:translateY(-4px);}
    .office-card:hover::before{width:100%;}
    .office-flag{font-size:2.2rem;margin-bottom:.8rem;}
    .office-loc{font-size:.92rem;font-weight:700;color:var(--navy);font-family:Georgia,serif;margin-bottom:.2rem;}
    .office-role{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .office-detail{font-size:.78rem;color:var(--txt2);line-height:1.6;}

    /* CTA */
    .cta-band{background:var(--navy);padding:6rem 1.5rem;text-align:center;}
    .cta-band h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:#fff;font-family:Georgia,serif;margin-bottom:1rem;line-height:1.2;}
    .cta-band p{color:rgba(255,255,255,.6);font-size:.9rem;max-width:520px;margin:0 auto 2.5rem;line-height:1.8;}
    .cta-tag{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:.8rem;}
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

    @media(max-width:1100px){.page-hero-in{grid-template-columns:1fr;}.hero-img-wrap{display:none;}.story-g{grid-template-columns:1fr;}.values-grid{grid-template-columns:repeat(2,1fr);}.offices-grid{grid-template-columns:repeat(3,1fr);}.stats-g{grid-template-columns:1fr 1fr;}.stat:nth-child(2)::after{display:none;}.ftr-main-in{grid-template-columns:1fr 1fr;}}
    @media(max-width:768px){.float-social{display:none;}.mob-call{display:flex;}.mob-wa{display:flex;}.nav{padding:0 1.2rem;height:70px;}.nlinks,.nbtn{display:none;}.burger{display:flex;}.values-grid{grid-template-columns:1fr;}.offices-grid{grid-template-columns:1fr 1fr;}.page-hero{padding:8rem 1.2rem 4rem;}.story-img-badge{left:0;}}
    @media(max-width:480px){.offices-grid{grid-template-columns:1fr;}}
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

      <nav className={`nav ${sc?'sc':''}`}>
        <Link href="/" className="nlogo">
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={80} height={80} style={{objectFit:'contain'}} priority/>
          <div className="nlogo-txt"><b>Saif Elite QS</b><span>Quantity Surveyor &amp; Cost Consultant</span></div>
        </Link>
        <ul className="nlinks">
          {NAV.map(n=>(<li key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase()}`} className={n==='About'?'active':''}>{n}</Link></li>))}
        </ul>
        <Link href="/contact" className="nbtn" style={{textDecoration:'none'}}>Contact Us</Link>
        <button className="burger" onClick={()=>setMenu(true)}><Svg d="M3 12h18M3 6h18M3 18h18" s={24}/></button>
      </nav>
      <div className={`mob ${menu?'on':''}`}>
        <button className="mob-x" onClick={()=>setMenu(false)}><Svg d="M18 6 6 18M6 6l12 12" s={26}/></button>
        {NAV.map(n=>(<div key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase()}`} onClick={()=>setMenu(false)}>{n}</Link></div>))}
        <Link href="/contact" className="btn-gold" onClick={()=>setMenu(false)}>Contact Us</Link>
      </div>

      {/* PAGE HERO */}
      <div className="page-hero">
        <div className="page-hero-in">
          <div>
            <div className="breadcrumb"><Link href="/">Home</Link><Svg d="M9 18l6-6-6-6" s={12}/><span>About</span></div>
            <div className="page-hero-tag">Who We Are</div>
            <h1>About <span>Saif Elite QS</span></h1>
            <p className="page-hero-p">A specialist quantity surveying and cost consultancy practice headquartered in Dubai, UAE — delivering rigorous commercial discipline to projects across the UAE, GCC and internationally.</p>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
              <Link href="/contact" className="btn-gold">Work With Us &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></Link>
              <Link href="/services" className="btn-ol-white">Our Services</Link>
            </div>
          </div>
          <div className="hero-img-wrap rv rr">
            <Image src="/images/about_section1.jpeg" alt="About Saif Elite QS" fill style={{objectFit:'cover',objectPosition:'center'}}/>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="statsband">
        <div className="stats-g">
          {STATS.map((s,i)=>(<div key={s.l} className={`stat rv d${i+1}`}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>))}
        </div>
      </div>

      {/* STORY */}
      <section className="story">
        <div className="wrap">
          <div className="story-g">
            <div className="rv rl" style={{position:'relative'}}>
              <div className="story-img">
                <Image src="/images/about_section1.jpeg" alt="Our Story" fill style={{objectFit:'cover',objectPosition:'center'}}/>
              </div>
              <div className="story-img-badge">
                <div className="big">10+</div>
                <div className="sm">Years of Excellence</div>
              </div>
            </div>
            <div className="rv rr">
              <div className="sec-tag">Our Story</div>
              <h2 className="sec-h">Built on Expertise. Trusted by Industry.</h2>
              <div className="sec-line"/>
              <p className="sec-p" style={{marginBottom:'1rem'}}>Saif Elite QS was founded with a clear mission: to bring the discipline of independent, expert quantity surveying to projects across the UAE and beyond. Over a decade of practice has built a reputation grounded in precision, transparency and client focus.</p>
              <p className="sec-p" style={{marginBottom:'1rem'}}>Our qualified team works alongside developers, contractors, architects and project managers to deliver measurable value at every stage — from initial feasibility through to final account.</p>
              <p className="sec-p" style={{marginBottom:'1.8rem'}}>We are actively developing under the guidance and standards of RICS and AIQS, ensuring our practice meets the highest internationally recognised benchmarks of quality, ethics and professional competence.</p>
              <div className="why-list">
                {WHY.map((w,i)=>(<div key={i} className="why-row"><span className="why-chk"><Svg d="M20 6 9 17l-5-5" s={14} w={2.5}/></span><span className="why-t">{w}</span></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <div className="wrap">
          <div className="rv" style={{textAlign:'center',marginBottom:'0'}}>
            <div className="sec-tag" style={{justifyContent:'center',display:'flex'}}>Our Values</div>
            <h2 className="sec-h" style={{color:'#fff',textAlign:'center'}}>What Drives Us</h2>
            <div className="sec-line" style={{margin:'0 auto 0'}}/>
          </div>
          <div className="values-grid">
            {VALUES.map((v,i)=>(
              <div key={v.t} className={`val-card rv d${i+1}`}>
                <div className="val-ico"><Svg d={v.icon} s={22}/></div>
                <div className="val-t">{v.t}</div>
                <div className="val-d">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="offices">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">Global Presence</div>
            <h2 className="sec-h">Where We Operate</h2>
            <div className="sec-line"/>
            <p className="sec-p">Headquartered in Dubai with active remote QS capabilities across the UK, Ireland, New Zealand and Australia — we bring global reach to every project.</p>
          </div>
          <div className="offices-grid">
            {OFFICES.map((o,i)=>(
              <div key={o.loc} className={`office-card rv d${i+1}`}>
                <div className="office-flag">{o.flag}</div>
                <div className="office-loc">{o.loc}</div>
                <div className="office-role">{o.role}</div>
                <div className="office-detail">{o.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="rv">
          <div className="cta-tag">Let's Work Together</div>
          <h2>Ready to Work With Us?</h2>
          <p>Get in touch for a free, no-obligation initial consultation. Our senior consultants will respond within one business day.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-gold">Contact Us Today &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></Link>
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
              <ul>
                <li><Link href="/services">Cost Planning & Estimation</Link></li>
                <li><Link href="/services">Bill of Quantities</Link></li>
                <li><Link href="/services">Contract Administration</Link></li>
                <li><Link href="/services">Project Cost Management</Link></li>
                <li><Link href="/services">Feasibility Studies</Link></li>
              </ul>
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
