'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const NAV = ['Home','Services','About','Procurement','Projects','Contact'];
const PHONE = '+971 50 505 3679';
const WA_LINK = 'https://wa.me/971505053679';
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.5 2C6.253 2 2 6.253 2 11.5c0 1.894.549 3.659 1.497 5.145L2 22l5.488-1.478A9.46 9.46 0 0 0 11.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2z";

export default function PrivacyPolicyPage() {
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    :root{--gold:#b8912a;--gold-lt:#d4aa40;--navy:#1a1f2e;--dark:#0e1118;--white:#fff;--off:#f7f6f3;--txt:#1e1e1e;--txt2:#444;--muted:#777;--border:#e2ddd6;--tr:.3s ease;}
    body{background:var(--white);color:var(--txt);font-family:'Segoe UI',system-ui,sans-serif;line-height:1.7;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--off)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}

    .float-social{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:500;display:flex;flex-direction:column;}
    .float-social a{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--navy);color:#fff;text-decoration:none;transition:all var(--tr);border-bottom:1px solid rgba(255,255,255,.1);}
    .float-social a:hover{background:var(--gold);width:52px;}.float-social a.wa{background:#25D366;}.float-social a.wa:hover{background:#1ebe5d;}
    .float-social a:first-child{border-radius:0 4px 0 0;}.float-social a:last-child{border-radius:0 0 4px 0;border-bottom:none;}
    .mob-call{position:fixed;left:1rem;bottom:1.4rem;z-index:500;width:48px;height:48px;border-radius:50%;background:var(--navy);color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.25);}
    .mob-wa{position:fixed;right:1rem;bottom:1.4rem;z-index:500;width:52px;height:52px;border-radius:50%;background:#25D366;color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(37,211,102,.4);}

    .nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;height:90px;padding:0 3rem;background:rgba(14,17,24,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(184,145,42,.2);transition:height .4s;}
    .nav.sc{height:72px;}
    .nlogo{display:flex;align-items:center;gap:.8rem;text-decoration:none;}
    .nlogo-txt b{font-size:.85rem;font-weight:700;color:#fff;letter-spacing:.05em;text-transform:uppercase;display:block;}
    .nlogo-txt span{font-size:.56rem;color:rgba(255,255,255,.5);letter-spacing:.2em;text-transform:uppercase;}
    .nlinks{display:flex;align-items:center;gap:2.2rem;list-style:none;}
    .nlinks a{color:rgba(255,255,255,.7);text-decoration:none;font-size:.7rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;transition:color var(--tr);position:relative;padding-bottom:3px;}
    .nlinks a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold-lt);transition:width var(--tr);}
    .nlinks a:hover{color:#fff;}.nlinks a:hover::after{width:100%;}
    .nbtn{background:var(--gold);color:#fff;border:none;padding:.46rem 1.4rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .nbtn:hover{background:var(--gold-lt);}
    .burger{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:4px;}
    .mob{display:none;position:fixed;inset:0;z-index:199;background:var(--dark);flex-direction:column;align-items:center;justify-content:center;gap:2rem;}
    .mob.on{display:flex;}
    .mob-x{position:absolute;top:1.4rem;right:1.6rem;background:none;border:none;color:rgba(255,255,255,.6);cursor:pointer;}
    .mob a{color:#fff;text-decoration:none;font-size:1.3rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;}
    .mob a:hover{color:var(--gold-lt);}
    .btn-gold{display:inline-flex;align-items:center;gap:.5rem;background:var(--gold);color:#fff;padding:.82rem 2.2rem;font-size:.74rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-gold:hover{background:var(--gold-lt);transform:translateY(-2px);}

    /* HERO */
    .page-hero{background:var(--navy);padding:10rem 1.5rem 5rem;position:relative;overflow:hidden;}
    .page-hero::before{content:'';position:absolute;top:-30%;right:-8%;width:500px;height:500px;border-radius:50%;border:1px solid rgba(184,145,42,.07);pointer-events:none;}
    .page-hero-in{max-width:1000px;margin:0 auto;position:relative;z-index:2;}
    .breadcrumb{display:flex;align-items:center;gap:.5rem;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:1.2rem;}
    .breadcrumb a{color:rgba(255,255,255,.4);text-decoration:none;transition:color var(--tr);}
    .breadcrumb a:hover{color:var(--gold-lt);}
    .breadcrumb span{color:var(--gold-lt);}
    .page-hero-tag{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1rem;display:flex;align-items:center;gap:.8rem;}
    .page-hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .page-hero h1{font-size:clamp(2rem,4.5vw,3.4rem);font-weight:700;color:#fff;font-family:Georgia,serif;line-height:1.1;margin-bottom:1.2rem;}
    .page-hero h1 span{color:var(--gold-lt);}
    .page-hero-p{font-size:.95rem;color:rgba(255,255,255,.62);max-width:620px;line-height:1.82;}
    .updated-date{margin-top:1.5rem;font-size:.75rem;color:rgba(255,255,255,.5);}
    .updated-date strong{color:var(--gold-lt);}

    /* CONTENT */
    .content{padding:5rem 1.5rem;background:var(--white);}
    .wrap{max-width:900px;margin:0 auto;}
    .toc{background:var(--off);border-left:3px solid var(--gold);padding:1.5rem 2rem;margin-bottom:3rem;}
    .toc-title{font-size:.68rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:1rem;}
    .toc ol{list-style:none;counter-reset:toc;display:grid;grid-template-columns:1fr 1fr;gap:.5rem 2rem;}
    .toc li{counter-increment:toc;font-size:.82rem;}
    .toc li a{color:var(--txt2);text-decoration:none;display:flex;align-items:baseline;gap:.5rem;transition:color var(--tr);padding:.15rem 0;}
    .toc li a::before{content:counter(toc,decimal-leading-zero);color:var(--gold);font-weight:700;font-size:.7rem;}
    .toc li a:hover{color:var(--gold);}

    .sec{margin-bottom:2.5rem;padding-bottom:2.5rem;border-bottom:1px solid var(--border);}
    .sec:last-child{border-bottom:none;}
    .sec-num{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:.5rem;}
    .sec h2{font-size:1.4rem;font-weight:700;color:var(--navy);font-family:Georgia,serif;margin-bottom:1rem;line-height:1.3;}
    .sec h3{font-size:1rem;font-weight:700;color:var(--navy);margin:1.4rem 0 .6rem;}
    .sec p{font-size:.9rem;color:var(--txt2);line-height:1.85;margin-bottom:1rem;}
    .sec ul{margin:.6rem 0 1.2rem 1.4rem;}
    .sec ul li{font-size:.88rem;color:var(--txt2);line-height:1.7;margin-bottom:.4rem;}
    .sec a{color:var(--gold);text-decoration:none;font-weight:500;transition:color var(--tr);}
    .sec a:hover{color:var(--gold-lt);text-decoration:underline;}
    .sec strong{color:var(--navy);font-weight:700;}

    .highlight{background:var(--off);border-left:3px solid var(--gold);padding:1.2rem 1.5rem;margin:1.2rem 0;}
    .highlight p{font-size:.85rem;color:var(--txt);margin-bottom:.5rem;}
    .highlight p:last-child{margin-bottom:0;}

    /* CONTACT CARD */
    .contact-card{background:var(--navy);color:#fff;padding:3rem 2.5rem;margin-top:3rem;text-align:center;}
    .contact-card h3{font-size:1.3rem;font-weight:700;color:#fff;font-family:Georgia,serif;margin-bottom:.6rem;}
    .contact-card p{font-size:.88rem;color:rgba(255,255,255,.65);margin-bottom:1.8rem;line-height:1.7;}
    .contact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:2rem;}
    .contact-item{padding:1rem;}
    .contact-item-label{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:.4rem;}
    .contact-item-val a{color:#fff;text-decoration:none;font-size:.86rem;font-weight:500;transition:color var(--tr);}
    .contact-item-val a:hover{color:var(--gold-lt);}

    /* FOOTER */
    .ftr{background:var(--dark);}
    .ftr-main{padding:4rem 1.5rem 2.5rem;}
    .ftr-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem;}
    .ftr-brand-name{font-size:1rem;font-weight:700;color:#fff;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.2rem;}
    .ftr-brand-sub{font-size:.58rem;color:rgba(255,255,255,.35);letter-spacing:.2em;text-transform:uppercase;margin-bottom:.8rem;}
    .ftr-brand-p{font-size:.8rem;color:rgba(255,255,255,.42);line-height:1.8;max-width:260px;}
    .fcol h4{font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1.2rem;font-weight:700;}
    .fcol ul{list-style:none;}.fcol li{margin-bottom:.6rem;}
    .fcol a{color:rgba(255,255,255,.5);text-decoration:none;font-size:.8rem;transition:color var(--tr);}
    .fcol a:hover{color:#fff;}
    .ftr-bot{padding:1.5rem;border-top:1px solid rgba(255,255,255,.07);}
    .ftr-bot-in{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;}
    .ftr-bot p{font-size:.7rem;color:rgba(255,255,255,.2);}
    .hl{color:var(--gold-lt);}

    @media(max-width:1100px){.ftr-in{grid-template-columns:1fr 1fr;}}
    @media(max-width:768px){.float-social{display:none;}.mob-call{display:flex;}.mob-wa{display:flex;}.nav{padding:0 1.2rem;height:70px;}.nav.sc{height:60px;}.nlinks,.nbtn{display:none;}.burger{display:flex;}.page-hero{padding:8rem 1.2rem 4rem;}.toc ol{grid-template-columns:1fr;}.contact-grid{grid-template-columns:1fr;gap:.5rem;}.ftr-in{grid-template-columns:1fr;}}

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
          {NAV.map(n=>(<li key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase()}`}>{n}</Link></li>))}
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
          <div className="breadcrumb">
            <Link href="/">Home</Link><Svg d="M9 18l6-6-6-6" s={12}/><span>Privacy Policy</span>
          </div>
          <div className="page-hero-tag">Legal</div>
          <h1>Privacy <span>Policy</span></h1>
          <p className="page-hero-p">Your privacy matters to us. This Privacy Policy explains how Saif Elite QS collects, uses, and protects your personal information when you visit our website or engage our services.</p>
          <div className="updated-date">
            <strong>Effective Date:</strong> 12 July 2026 &nbsp;·&nbsp; <strong>Last Updated:</strong> 12 July 2026
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="content">
        <div className="wrap">

          {/* TABLE OF CONTENTS */}
          <div className="toc">
            <div className="toc-title">Table of Contents</div>
            <ol>
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#information-collected">Information We Collect</a></li>
              <li><a href="#how-we-use">How We Use Your Information</a></li>
              <li><a href="#cookies">Cookies &amp; Tracking</a></li>
              <li><a href="#advertising">Advertising &amp; Analytics</a></li>
              <li><a href="#data-sharing">Data Sharing</a></li>
              <li><a href="#data-security">Data Security</a></li>
              <li><a href="#your-rights">Your Rights</a></li>
              <li><a href="#children">Children's Privacy</a></li>
              <li><a href="#international">International Transfers</a></li>
              <li><a href="#changes">Policy Changes</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ol>
          </div>

          {/* SECTIONS */}
          <div className="sec" id="introduction">
            <div className="sec-num">Section 01</div>
            <h2>Introduction</h2>
            <p>Saif Elite QS (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a professional Quantity Surveying and Cost Consultancy firm headquartered in Dubai, United Arab Emirates. We are committed to protecting your privacy and handling your personal data in an open and transparent manner.</p>
            <p>This Privacy Policy applies to all information collected through our website <a href="https://www.saifeliteqs.com">www.saifeliteqs.com</a>, our chatbot, contact forms, email correspondence, and any related services we offer.</p>
            <p>By using our website or services, you agree to the collection and use of information in accordance with this policy.</p>
          </div>

          <div className="sec" id="information-collected">
            <div className="sec-num">Section 02</div>
            <h2>Information We Collect</h2>

            <h3>Information You Provide Directly</h3>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
              <li><strong>Project Details:</strong> Project type, location, budget, timeline, requirements</li>
              <li><strong>Messages:</strong> Enquiries submitted through contact forms or chatbot conversations</li>
              <li><strong>Correspondence:</strong> Any information you share via email, WhatsApp, or phone</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li><strong>Device &amp; Browser Data:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns, referring URLs</li>
              <li><strong>Location Data:</strong> Approximate geographic location based on IP address</li>
              <li><strong>Cookies &amp; Similar Technologies:</strong> See our Cookies section below for details</li>
            </ul>
          </div>

          <div className="sec" id="how-we-use">
            <div className="sec-num">Section 03</div>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To respond to your enquiries and provide requested services</li>
              <li>To prepare quotations, cost estimates, and project proposals</li>
              <li>To communicate with you about your projects, updates, and business matters</li>
              <li>To improve our website, services, and customer experience</li>
              <li>To analyse website traffic and usage patterns</li>
              <li>To send marketing communications (only where you have opted in)</li>
              <li>To comply with legal obligations and enforce our terms</li>
              <li>To detect, prevent, and address fraud, security issues, and technical problems</li>
            </ul>
          </div>

          <div className="sec" id="cookies">
            <div className="sec-num">Section 04</div>
            <h2>Cookies &amp; Tracking Technologies</h2>
            <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyse site usage.</p>

            <h3>Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the site</li>
              <li><strong>Advertising Cookies:</strong> Used by third-party ad platforms (Meta, LinkedIn) to deliver relevant ads</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>

            <p>You can manage or disable cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.</p>
          </div>

          <div className="sec" id="advertising">
            <div className="sec-num">Section 05</div>
            <h2>Advertising &amp; Analytics Partners</h2>
            <p>We work with third-party advertising and analytics partners to deliver relevant content and measure the effectiveness of our marketing efforts. These partners may collect information about your online activities across different websites.</p>

            <h3>Meta (Facebook &amp; Instagram) Pixel</h3>
            <p>We use the Meta Pixel to track visitor activity on our website and deliver relevant ads on Facebook, Instagram, and Meta's advertising network. The Meta Pixel may collect:</p>
            <ul>
              <li>IP address and browser information</li>
              <li>Pages viewed and actions taken on our site</li>
              <li>Device information and identifiers</li>
              <li>Referral source</li>
            </ul>
            <p>For more information, please review the <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noreferrer">Meta Privacy Policy</a>. You can control ad preferences at <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noreferrer">Facebook Ad Preferences</a>.</p>

            <h3>LinkedIn Insight Tag</h3>
            <p>We use the LinkedIn Insight Tag to measure LinkedIn ad performance and enable retargeting to LinkedIn users who have visited our website. LinkedIn may collect:</p>
            <ul>
              <li>LinkedIn member ID (if logged in)</li>
              <li>Timestamp and URL of pages visited</li>
              <li>IP address and browser details</li>
            </ul>
            <p>Learn more in the <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noreferrer">LinkedIn Privacy Policy</a>. You can opt out at <a href="https://www.linkedin.com/psettings/guest-controls" target="_blank" rel="noreferrer">LinkedIn Privacy Settings</a>.</p>

            <h3>Google Analytics</h3>
            <p>We may use Google Analytics to understand how users engage with our website. Google Analytics uses cookies and similar technologies to analyse traffic and user behaviour. For details, see the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.</p>

            <div className="highlight">
              <p><strong>Your Choice:</strong> You can opt out of interest-based advertising at any time through:</p>
              <ul style={{marginBottom:0,marginTop:'.5rem'}}>
                <li><a href="https://optout.aboutads.info/" target="_blank" rel="noreferrer">Digital Advertising Alliance (DAA)</a></li>
                <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noreferrer">European Interactive Digital Advertising Alliance (EDAA)</a></li>
                <li>Your browser's "Do Not Track" setting</li>
              </ul>
            </div>
          </div>

          <div className="sec" id="data-sharing">
            <div className="sec-num">Section 06</div>
            <h2>How We Share Your Information</h2>
            <p>We do not sell, rent, or trade your personal information. We may share information only in the following limited circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate our website and business (e.g., hosting, analytics, email services)</li>
              <li><strong>Advertising Partners:</strong> Meta and LinkedIn (as described above) for advertising and remarketing purposes</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of business assets</li>
              <li><strong>With Your Consent:</strong> Any other sharing will only occur with your explicit consent</li>
            </ul>
          </div>

          <div className="sec" id="data-security">
            <div className="sec-num">Section 07</div>
            <h2>Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. These include:</p>
            <ul>
              <li>Encrypted data transmission (HTTPS/SSL)</li>
              <li>Secure server infrastructure</li>
              <li>Access controls and authentication</li>
              <li>Regular security reviews and updates</li>
            </ul>
            <p>However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
          </div>

          <div className="sec" id="your-rights">
            <div className="sec-num">Section 08</div>
            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests or direct marketing</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
              <li><strong>Complaint:</strong> Lodge a complaint with a data protection authority</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:info@saifeliteqs.com">info@saifeliteqs.com</a>. We will respond within 30 days.</p>
          </div>

          <div className="sec" id="children">
            <div className="sec-num">Section 09</div>
            <h2>Children's Privacy</h2>
            <p>Our services are intended for professionals and businesses. We do not knowingly collect personal information from children under 16 years of age. If we become aware that we have collected such information, we will take steps to delete it promptly.</p>
          </div>

          <div className="sec" id="international">
            <div className="sec-num">Section 10</div>
            <h2>International Data Transfers</h2>
            <p>As a firm serving clients across the UAE, GCC, UK, Ireland, New Zealand, and Australia, your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, in compliance with applicable data protection laws.</p>
          </div>

          <div className="sec" id="changes">
            <div className="sec-num">Section 11</div>
            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will post the updated version on this page with a revised &quot;Last Updated&quot; date. Significant changes will be communicated more prominently.</p>
            <p>We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
          </div>

          <div className="sec" id="contact">
            <div className="sec-num">Section 12</div>
            <h2>Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>

            <div className="contact-card">
              <h3>Get In Touch</h3>
              <p>We take privacy seriously and are happy to answer any questions you may have.</p>
              <div className="contact-grid">
                <div className="contact-item">
                  <div className="contact-item-label">Email</div>
                  <div className="contact-item-val"><a href="mailto:info@saifeliteqs.com">info@saifeliteqs.com</a></div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-label">Phone</div>
                  <div className="contact-item-val"><a href={`tel:${PHONE}`}>{PHONE}</a></div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-label">Address</div>
                  <div className="contact-item-val" style={{color:'#fff',fontSize:'.86rem'}}>Dubai, United Arab Emirates</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="ftr">
        <div className="ftr-main">
          <div className="ftr-in">
            <div>
              <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={70} height={70} style={{objectFit:'contain',marginBottom:'.6rem'}}/>
              <div className="ftr-brand-name">Saif Elite QS</div>
              <div className="ftr-brand-sub">Quantity Surveyor &amp; Cost Consultant</div>
              <p className="ftr-brand-p">Independent QS and cost consultancy headquartered in Dubai, UAE, providing services across the UAE, GCC, UK, Ireland, NZ, and Australia.</p>
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="fcol">
              <h4>Legal</h4>
              <ul>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><a href="mailto:info@saifeliteqs.com">Privacy Enquiries</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ftr-bot">
          <div className="ftr-bot-in">
            <p>© 2025 <span className="hl">Saif Elite QS</span>. All rights reserved.</p>
            <p>Dubai (HQ) · UAE · GCC · UK · Ireland · NZ · Australia</p>
          </div>
        </div>
      </footer>
    </>
  );
}
