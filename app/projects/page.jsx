'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const PROJS = [
  { tag:'Residential', n:'Luxury Villa Complex', loc:'Dubai Hills, Dubai', v:'AED 45M', y:'2023', d:'24-unit luxury villa development including landscaping, pools and smart home systems. Full cost management from concept to final account.', img:'/images/project1.jpg', scope:['Cost Planning','Bill of Quantities','Contract Administration','Final Account'] },
  { tag:'Commercial', n:'Grade A Office Tower', loc:'DIFC, Dubai', v:'AED 280M', y:'2023', d:'38-storey premium office tower. Complete cost management and contract administration throughout the entire construction programme.', img:'/images/project2.jpg', scope:['Feasibility Study','Cost Planning','Tender Management','Contract Administration'] },
  { tag:'Mixed-Use', n:'Retail & Hospitality Scheme', loc:'JBR, Dubai', v:'AED 120M', y:'2022', d:'Mixed-use retail and hotel development on the Jumeirah Beach Residence waterfront, including podium retail and 4-star hotel tower.', img:'/images/project3.jpeg', scope:['Cost Planning','Bill of Quantities','Procurement Strategy','Final Account'] },
  { tag:'Infrastructure', n:'Road & Utilities Package', loc:'Abu Dhabi', v:'AED 90M', y:'2022', d:"Employer's QS services for a major road infrastructure and utilities upgrade covering 14km across Abu Dhabi.", img:'/images/project4.jpeg', scope:['Employer\'s QS','Cost Management','Variation Assessment','Final Account'] },
  { tag:'Residential', n:'High-Rise Apartment Tower', loc:'Business Bay, Dubai', v:'AED 175M', y:'2021', d:'52-storey residential tower. Post-contract cost management and monthly reporting throughout the entire build programme.', img:'/images/project5.jpeg', scope:['Post-Contract QS','Monthly Reporting','Variation Assessment','Final Account'] },
  { tag:'Construction', n:'Mixed Development', loc:'Dubai, UAE', v:'AED 32M', y:'2021', d:'Specialist QS services covering all phases from feasibility to final account for a mixed residential and retail development.', img:'/images/project6.jpeg', scope:['Full QS Services','Cost Planning','Tender Management','Final Account'] },
];

const STATS = [
  { v:'200+', l:'Projects Delivered' },
  { v:'AED 2B+', l:'Total Value Managed' },
  { v:'10+', l:'Years Experience' },
  { v:'98%', l:'Client Satisfaction' },
];

const NAV = ['Home','Services','About','Procurement','Projects','Contact'];
const PHONE = '+97156465 5043';
const WA_LINK = 'https://wa.me/971564655043';
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.5 2C6.253 2 2 6.253 2 11.5c0 1.894.549 3.659 1.497 5.145L2 22l5.488-1.478A9.46 9.46 0 0 0 11.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2z";

export default function ProjectsPage() {
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

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

  const tags = ['All', ...Array.from(new Set(PROJS.map(p => p.tag)))];
  const filtered = filter === 'All' ? PROJS : PROJS.filter(p => p.tag === filter);

  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    :root{--gold:#b8912a;--gold-lt:#d4aa40;--gold-dk:#8a6820;--navy:#1a1f2e;--navy2:#252b3a;--dark:#0e1118;--white:#fff;--off:#f7f6f3;--light:#efefed;--txt:#1e1e1e;--txt2:#444;--muted:#777;--border:#e2ddd6;--tr:.3s ease;}
    body{background:var(--white);color:var(--txt);font-family:'Segoe UI',system-ui,sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--light)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
    .rv{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease;}.rv.on{opacity:1;transform:none;}
    .d1{transition-delay:.06s}.d2{transition-delay:.12s}.d3{transition-delay:.18s}.d4{transition-delay:.24s}.d5{transition-delay:.3s}.d6{transition-delay:.36s}

    .float-social{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:500;display:flex;flex-direction:column;gap:0;}
    .float-social a{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--navy);color:#fff;text-decoration:none;transition:all var(--tr);border-bottom:1px solid rgba(255,255,255,.1);}
    .float-social a:hover{background:var(--gold);width:52px;}.float-social a.wa{background:#25D366;}.float-social a.wa:hover{background:#1ebe5d;}
    .float-social a:first-child{border-radius:0 4px 0 0;}.float-social a:last-child{border-radius:0 0 4px 0;border-bottom:none;}
    .mob-call{position:fixed;left:1rem;bottom:1.4rem;z-index:500;width:48px;height:48px;border-radius:50%;background:var(--navy);color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25);}
    .mob-wa{position:fixed;right:1rem;bottom:1.4rem;z-index:500;width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(37,211,102,.4);}

    .nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;height:90px;padding:0 3rem;transition:all .4s;background:rgba(14,17,24,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(184,145,42,.2);}
    .nav.sc{height:72px;}
    .nlogo{display:flex;align-items:center;gap:.8rem;cursor:pointer;text-decoration:none;}
    .nlogo-txt b{font-size:.85rem;font-weight:700;color:#fff;letter-spacing:.05em;text-transform:uppercase;display:block;}
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
    .btn-gold:hover{background:var(--gold-lt);transform:translateY(-2px);}
    .btn-ol-gold{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold);padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid var(--gold);cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-ol-gold:hover{background:var(--gold);color:#fff;}

    .page-hero{background:var(--dark);padding:10rem 1.5rem 6rem;position:relative;overflow:hidden;}
    .page-hero::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(184,145,42,.06) 0%,transparent 60%);pointer-events:none;}
    .page-hero-in{max-width:1100px;margin:0 auto;position:relative;z-index:2;}
    .breadcrumb{display:flex;align-items:center;gap:.5rem;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:1.2rem;}
    .breadcrumb a{color:rgba(255,255,255,.4);text-decoration:none;transition:color var(--tr);}.breadcrumb a:hover{color:var(--gold-lt);}
    .breadcrumb span{color:var(--gold-lt);}
    .page-hero-tag{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1rem;display:flex;align-items:center;gap:.8rem;}
    .page-hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .page-hero h1{font-size:clamp(2.2rem,5vw,4rem);font-weight:700;color:#fff;font-family:Georgia,serif;line-height:1.1;margin-bottom:1.2rem;}
    .page-hero h1 span{color:var(--gold-lt);}
    .page-hero-p{font-size:1rem;color:rgba(255,255,255,.6);max-width:600px;line-height:1.8;}

    .statsband{background:var(--navy);padding:3rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.08);}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
    .stat{text-align:center;padding:1rem 1.5rem;position:relative;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:rgba(255,255,255,.1);}
    .stat-v{font-size:2.4rem;font-weight:700;color:var(--gold-lt);font-family:Georgia,serif;line-height:1;margin-bottom:.4rem;}
    .stat-l{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.5);}

    /* PROJECTS SECTION */
    .prj-section{background:var(--white);padding:6rem 0;}
    .prj-header{max-width:1100px;margin:0 auto;padding:0 1.5rem;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3.5rem;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.2rem;}
    .filters{display:flex;gap:.5rem;flex-wrap:wrap;}
    .pf-btn{background:transparent;border:1px solid var(--border);color:var(--txt2);padding:.4rem 1.1rem;font-size:.65rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .pf-btn.a,.pf-btn:hover{background:var(--gold);border-color:var(--gold);color:#fff;}

    .prj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--border);}
    .prj-card{position:relative;overflow:hidden;cursor:pointer;background:var(--dark);}
    .prj-img{position:relative;height:320px;overflow:hidden;}
    .prj-img img{object-fit:cover;object-position:center;transition:transform .7s ease;}
    .prj-card:hover .prj-img img{transform:scale(1.06);}
    .prj-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,13,20,.95) 0%,rgba(10,13,20,.2) 55%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.8rem;transition:background var(--tr);}
    .prj-card:hover .prj-overlay{background:linear-gradient(to top,rgba(10,13,20,.98) 0%,rgba(10,13,20,.6) 70%,rgba(10,13,20,.1) 100%);}
    .prj-tag{font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:.4rem;border-left:2px solid var(--gold);padding-left:.5rem;}
    .prj-name{font-size:1.1rem;font-weight:700;color:#fff;font-family:Georgia,serif;margin-bottom:.2rem;line-height:1.2;}
    .prj-loc{font-size:.7rem;color:rgba(255,255,255,.5);margin-bottom:.35rem;}
    .prj-val{font-size:.78rem;color:var(--gold-lt);font-weight:700;margin-bottom:.5rem;}
    .prj-desc{font-size:.76rem;color:rgba(255,255,255,.6);line-height:1.65;max-height:0;overflow:hidden;transition:max-height .4s,opacity .4s;opacity:0;}
    .prj-card:hover .prj-desc{max-height:80px;opacity:1;}
    .prj-scope{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.7rem;max-height:0;overflow:hidden;transition:max-height .4s,opacity .4s;opacity:0;}
    .prj-card:hover .prj-scope{max-height:60px;opacity:1;}
    .prj-scope-tag{font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;background:rgba(184,145,42,.2);border:1px solid rgba(184,145,42,.3);color:var(--gold-lt);padding:.15rem .5rem;}
    .prj-arrow{display:inline-flex;align-items:center;gap:.4rem;font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-lt);margin-top:.6rem;opacity:0;transform:translateY(6px);transition:all var(--tr);}
    .prj-card:hover .prj-arrow{opacity:1;transform:translateY(0);}

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

    @media(max-width:1100px){.prj-grid{grid-template-columns:repeat(2,1fr);}.stats-g{grid-template-columns:1fr 1fr;}.stat:nth-child(2)::after{display:none;}.ftr-main-in{grid-template-columns:1fr 1fr;}}
    @media(max-width:768px){.float-social{display:none;}.mob-call{display:flex;}.mob-wa{display:flex;}.nav{padding:0 1.2rem;height:70px;}.nlinks,.nbtn{display:none;}.burger{display:flex;}.prj-grid{grid-template-columns:1fr;}.prj-desc,.prj-scope{max-height:80px!important;opacity:1!important;}.prj-arrow{opacity:1!important;transform:none!important;}.page-hero{padding:8rem 1.2rem 4rem;}}
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
          {NAV.map(n=>(<li key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase()}`} className={n==='Projects'?'active':''}>{n}</Link></li>))}
        </ul>
        <Link href="/contact" className="nbtn" style={{textDecoration:'none'}}>Contact Us</Link>
        <button className="burger" onClick={()=>setMenu(true)}><Svg d="M3 12h18M3 6h18M3 18h18" s={24}/></button>
      </nav>
      <div className={`mob ${menu?'on':''}`}>
        <button className="mob-x" onClick={()=>setMenu(false)}><Svg d="M18 6 6 18M6 6l12 12" s={26}/></button>
        {NAV.map(n=>(<div key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase()}`} onClick={()=>setMenu(false)}>{n}</Link></div>))}
        <Link href="/contact" className="btn-gold" onClick={()=>setMenu(false)}>Contact Us</Link>
      </div>

      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-in">
          <div className="breadcrumb"><Link href="/">Home</Link><Svg d="M9 18l6-6-6-6" s={12}/><span>Projects</span></div>
          <div className="page-hero-tag">Our Work</div>
          <h1>Featured <span>Projects</span></h1>
          <p className="page-hero-p">A selection of projects across the UAE and GCC where Saif Elite QS has delivered rigorous cost management, independent QS services and measurable commercial value.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="statsband">
        <div className="stats-g">
          {STATS.map((s,i)=>(<div key={s.l} className={`stat rv d${i+1}`}><div className="stat-v">{s.v}</div><div className="stat-l">{s.l}</div></div>))}
        </div>
      </div>

      {/* PROJECTS */}
      <section className="prj-section">
        <div className="prj-header">
          <div className="rv">
            <div className="sec-tag">Portfolio</div>
            <h2 className="sec-h">Our Project Portfolio</h2>
            <div className="sec-line"/>
          </div>
          <div className="filters rv d2">
            {tags.map(t=>(<button key={t} className={`pf-btn ${filter===t?'a':''}`} onClick={()=>setFilter(t)}>{t}</button>))}
          </div>
        </div>
        <div className="prj-grid">
          {filtered.map((p,i)=>(
            <div key={p.n} className={`prj-card rv d${(i%3)+1}`}>
              <div className="prj-img">
                <Image src={p.img} alt={p.n} fill sizes="(max-width:768px) 100vw, 33vw" style={{objectFit:'cover'}}/>
              </div>
              <div className="prj-overlay">
                <div className="prj-tag">{p.tag}</div>
                <div className="prj-name">{p.n}</div>
                <div className="prj-loc"><Svg d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" s={11}/> {p.loc} &nbsp;·&nbsp; {p.y}</div>
                <div className="prj-val">{p.v}</div>
                <div className="prj-desc">{p.d}</div>
                <div className="prj-scope">{p.scope.map(s=>(<span key={s} className="prj-scope-tag">{s}</span>))}</div>
                <div className="prj-arrow">View Details <Svg d="M5 12h14M12 5l7 7-7 7" s={13}/></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="rv">
          <div className="cta-tag">Start Today</div>
          <h2>Have a Project in Mind?</h2>
          <p>Get in touch for a free, no-obligation initial consultation. Our senior consultants will respond within one business day.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-gold">Discuss Your Project &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></Link>
            <Link href="/services" className="btn-ol-gold">Our Services</Link>
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
                <li><Link href="/services">Value Engineering</Link></li>
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
