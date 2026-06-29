'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const SVCS = [
  'Cost Planning & Estimation','RICS-AIQS Professional Standards','Bill of Quantities',
  'Contract Administration','Project Cost Management','Dispute Resolution',
  'Feasibility Studies','Procurement Strategy','Value Engineering',
];

const OFFICES = [
  { icon:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'Head Office', v:'Dubai, United Arab Emirates', flag:'🇦🇪' },
  { icon:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'UK Office', v:'United Kingdom (Remote QS Services)', flag:'🇬🇧' },
  { icon:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'Ireland Office', v:'Ireland (Remote QS Services)', flag:'🇮🇪' },
  { icon:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'NZ Office', v:'New Zealand (Remote QS Services)', flag:'🇳🇿' },
  { icon:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', l:'Australia Office', v:'Australia (Remote QS Services)', flag:'🇦🇺' },
];

const NAV = ['Home','Services','About','Procurement','Projects','Contact'];
const PHONE = '+971 50 505 3679';
const WA_LINK = 'https://wa.me/971505053679';
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.5 2C6.253 2 2 6.253 2 11.5c0 1.894.549 3.659 1.497 5.145L2 22l5.488-1.478A9.46 9.46 0 0 0 11.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2z";

export default function ContactPage() {
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [form, setForm] = useState({ fn:'', ln:'', email:'', phone:'', svc:'', msg:'' });
  const [sent, setSent] = useState(false);

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

  const handleSubmit = () => {
    if (form.fn && form.email && form.msg) {
      setSent(true);
    }
  };

  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    :root{--gold:#b8912a;--gold-lt:#d4aa40;--gold-dk:#8a6820;--navy:#1a1f2e;--navy2:#252b3a;--dark:#0e1118;--white:#fff;--off:#f7f6f3;--light:#efefed;--txt:#1e1e1e;--txt2:#444;--muted:#777;--border:#e2ddd6;--tr:.3s ease;}
    body{background:var(--white);color:var(--txt);font-family:'Segoe UI',system-ui,sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--light)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
    .rv{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease;}.rv.on{opacity:1;transform:none;}
    .rv.rl{transform:translateX(-26px);}.rv.rl.on{transform:none;}.rv.rr{transform:translateX(26px);}.rv.rr.on{transform:none;}
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
    .nlogo-txt b{font-size:.85rem;font-weight:700;color:#fff;letter-spacing:.05em;text-transform:uppercase;display:block;}
    .nlogo-txt span{font-size:.56rem;color:rgba(255,255,255,.5);letter-spacing:.2em;text-transform:uppercase;}
    .nlinks{display:flex;align-items:center;gap:2.2rem;list-style:none;}
    .nlinks a{color:rgba(255,255,255,.7);text-decoration:none;font-size:.7rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;transition:color var(--tr);position:relative;padding-bottom:3px;}
    .nlinks a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold-lt);transition:width var(--tr);}
    .nlinks a:hover{color:#fff;}.nlinks a:hover::after,.nlinks a.active::after{width:100%;}
    .nlinks a.active{color:var(--gold-lt);}
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
    .btn-full{width:100%;justify-content:center;padding:.9rem;}

    .page-hero{background:var(--navy);padding:10rem 1.5rem 6rem;position:relative;overflow:hidden;}
    .page-hero::before{content:'';position:absolute;top:-40%;right:-10%;width:600px;height:600px;border-radius:50%;border:1px solid rgba(184,145,42,.08);pointer-events:none;}
    .page-hero-in{max-width:1100px;margin:0 auto;position:relative;z-index:2;}
    .breadcrumb{display:flex;align-items:center;gap:.5rem;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:1.2rem;}
    .breadcrumb a{color:rgba(255,255,255,.4);text-decoration:none;transition:color var(--tr);}.breadcrumb a:hover{color:var(--gold-lt);}
    .breadcrumb span{color:var(--gold-lt);}
    .page-hero-tag{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1rem;display:flex;align-items:center;gap:.8rem;}
    .page-hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .page-hero h1{font-size:clamp(2.2rem,5vw,4rem);font-weight:700;color:#fff;font-family:Georgia,serif;line-height:1.1;margin-bottom:1.2rem;}
    .page-hero h1 span{color:var(--gold-lt);}
    .page-hero-p{font-size:1rem;color:rgba(255,255,255,.6);max-width:600px;line-height:1.8;}

    /* QUICK CONTACT BAND */
    .quick-band{background:var(--gold);padding:2rem 1.5rem;}
    .quick-in{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem;}
    .quick-item{display:flex;align-items:center;gap:.8rem;color:#fff;text-decoration:none;transition:opacity var(--tr);}
    .quick-item:hover{opacity:.8;}
    .quick-item-label{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;opacity:.8;margin-bottom:.15rem;}
    .quick-item-val{font-size:.9rem;font-weight:700;}
    .quick-div{width:1px;height:40px;background:rgba(255,255,255,.3);}

    /* MAIN CONTACT */
    .cnt-main{padding:7rem 1.5rem;background:var(--white);}
    .wrap{max-width:1100px;margin:0 auto;}
    .cnt-g{display:grid;grid-template-columns:1fr 1.4fr;gap:6rem;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.4rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;line-height:1.82;}
    .cnt-row{display:flex;gap:1rem;align-items:flex-start;margin-bottom:1.6rem;}
    .cnt-ico{width:44px;height:44px;flex-shrink:0;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--gold);}
    .cnt-lbl{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.2rem;}
    .cnt-val{font-size:.88rem;color:var(--txt);font-weight:500;}
    .cnt-note{background:var(--off);border-left:3px solid var(--gold);padding:1.2rem 1.4rem;margin-top:2rem;}
    .cnt-note p{font-size:.82rem;color:var(--txt2);line-height:1.7;}

    /* FORM */
    .frow{display:grid;grid-template-columns:1fr 1fr;gap:.9rem;}
    .fg{display:flex;flex-direction:column;gap:.32rem;margin-bottom:.85rem;}
    .fg label{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);}
    .fg input,.fg textarea,.fg select{background:var(--off);border:1px solid var(--border);color:var(--txt);padding:.72rem .9rem;font-size:.88rem;font-family:inherit;outline:none;transition:border-color var(--tr);resize:none;}
    .fg input::placeholder,.fg textarea::placeholder{color:rgba(119,119,119,.5);}
    .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--gold);}
    .fg select option{background:var(--white);}

    .success-box{background:var(--off);border:1px solid rgba(184,145,42,.4);border-left:4px solid var(--gold);padding:2rem;text-align:center;}
    .success-box h3{font-size:1.1rem;font-weight:700;color:var(--navy);font-family:Georgia,serif;margin-bottom:.5rem;}
    .success-box p{font-size:.85rem;color:var(--txt2);line-height:1.7;}

    /* OFFICES */
    .offices-sec{background:var(--off);padding:6rem 1.5rem;}
    .offices-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1.5rem;margin-top:3rem;}
    .office-card{background:var(--white);padding:1.8rem 1.4rem;border:1px solid var(--border);position:relative;transition:all var(--tr);}
    .office-card::before{content:'';position:absolute;top:0;left:0;width:0;height:3px;background:var(--gold);transition:width .4s;}
    .office-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.06);transform:translateY(-4px);}
    .office-card:hover::before{width:100%;}
    .office-flag{font-size:1.8rem;margin-bottom:.7rem;}
    .office-loc{font-size:.88rem;font-weight:700;color:var(--navy);font-family:Georgia,serif;margin-bottom:.2rem;}
    .office-role{font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;}
    .office-detail{font-size:.76rem;color:var(--txt2);line-height:1.6;}

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

    @media(max-width:1100px){.cnt-g{grid-template-columns:1fr;gap:3.5rem;}.offices-grid{grid-template-columns:repeat(3,1fr);}.ftr-main-in{grid-template-columns:1fr 1fr;}.quick-div{display:none;}}
    @media(max-width:768px){.float-social{display:none;}.mob-call{display:flex;}.mob-wa{display:flex;}.nav{padding:0 1.2rem;height:70px;}.nlinks,.nbtn{display:none;}.burger{display:flex;}.offices-grid{grid-template-columns:1fr 1fr;}.frow{grid-template-columns:1fr;}.page-hero{padding:8rem 1.2rem 4rem;}.quick-in{flex-direction:column;align-items:flex-start;gap:1rem;}}
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
          {NAV.map(n=>(<li key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase()}`} className={n==='Contact'?'active':''}>{n}</Link></li>))}
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
          <div className="breadcrumb"><Link href="/">Home</Link><Svg d="M9 18l6-6-6-6" s={12}/><span>Contact</span></div>
          <div className="page-hero-tag">Get In Touch</div>
          <h1>Contact <span>Saif Elite QS</span></h1>
          <p className="page-hero-p">Have a project in mind? Reach out and a senior consultant will respond within one business day with a no-obligation discussion of how we can help.</p>
        </div>
      </div>

      {/* QUICK CONTACT BAND */}
      <div className="quick-band">
        <div className="quick-in">
          <a href={`tel:${PHONE}`} className="quick-item">
            <Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" s={20}/>
            <div><div className="quick-item-label">Call Us</div><div className="quick-item-val">{PHONE}</div></div>
          </a>
          <div className="quick-div"/>
          <a href="mailto:info@saifeliteqs.com" className="quick-item">
            <Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={20}/>
            <div><div className="quick-item-label">Email</div><div className="quick-item-val">info@saifeliteqs.com</div></div>
          </a>
          <div className="quick-div"/>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="quick-item">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d={WA_PATH}/></svg>
            <div><div className="quick-item-label">WhatsApp</div><div className="quick-item-val">Message Us</div></div>
          </a>
          <div className="quick-div"/>
          <div className="quick-item" style={{cursor:'default'}}>
            <Svg d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" s={20}/>
            <div><div className="quick-item-label">Head Office</div><div className="quick-item-val">Dubai, UAE</div></div>
          </div>
        </div>
      </div>

      {/* MAIN CONTACT */}
      <section className="cnt-main">
        <div className="wrap">
          <div className="cnt-g">
            {/* LEFT: Contact Info */}
            <div className="rv rl">
              <div className="sec-tag">Reach Us</div>
              <h2 className="sec-h">Let's Discuss Your Project</h2>
              <div className="sec-line"/>
              <p className="sec-p" style={{marginBottom:'2rem'}}>Our team of qualified quantity surveyors is ready to assist with any project — large or small, residential or commercial, UAE or international.</p>

              <div className="cnt-row">
                <div className="cnt-ico"><Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" s={18}/></div>
                <div><div className="cnt-lbl">Phone</div><div className="cnt-val"><a href={`tel:${PHONE}`} style={{color:'inherit',textDecoration:'none'}}>{PHONE}</a></div></div>
              </div>
              <div className="cnt-row">
                <div className="cnt-ico"><Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={18}/></div>
                <div><div className="cnt-lbl">Email</div><div className="cnt-val"><a href="mailto:info@saifeliteqs.com" style={{color:'inherit',textDecoration:'none'}}>info@saifeliteqs.com</a></div></div>
              </div>
              <div className="cnt-row">
                <div className="cnt-ico"><svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d={WA_PATH} fill="currentColor"/></svg></div>
                <div><div className="cnt-lbl">WhatsApp</div><div className="cnt-val"><a href={WA_LINK} target="_blank" rel="noreferrer" style={{color:'inherit',textDecoration:'none'}}>+971 50 505 3679</a></div></div>
              </div>
              <div className="cnt-row">
                <div className="cnt-ico"><Svg d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" s={18}/></div>
                <div><div className="cnt-lbl">Head Office</div><div className="cnt-val">Dubai, United Arab Emirates</div></div>
              </div>
              <div className="cnt-row">
                <div className="cnt-ico"><Svg d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z" s={18}/></div>
                <div><div className="cnt-lbl">Remote Services</div><div className="cnt-val">UK · Ireland · New Zealand · Australia</div></div>
              </div>
              <div className="cnt-note">
                <p><strong style={{color:'var(--gold)'}}>Response Guarantee —</strong> We respond to every enquiry within one business day. For urgent requirements, please call us directly.</p>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="rv rr d2">
              {sent ? (
                <div className="success-box">
                  <Svg d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" s={40} w={1.5}/>
                  <h3 style={{marginTop:'1rem'}}>Enquiry Sent Successfully</h3>
                  <p>Thank you for getting in touch. A senior consultant will respond within one business day.</p>
                </div>
              ) : (
                <>
                  <div className="frow">
                    <div className="fg"><label>First Name *</label><input type="text" placeholder="John" value={form.fn} onChange={e=>setForm({...form,fn:e.target.value})}/></div>
                    <div className="fg"><label>Last Name</label><input type="text" placeholder="Smith" value={form.ln} onChange={e=>setForm({...form,ln:e.target.value})}/></div>
                  </div>
                  <div className="frow">
                    <div className="fg"><label>Email Address *</label><input type="email" placeholder="john@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
                    <div className="fg"><label>Phone Number</label><input type="tel" placeholder="+971 ..." value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
                  </div>
                  <div className="fg">
                    <label>Service Required</label>
                    <select value={form.svc} onChange={e=>setForm({...form,svc:e.target.value})}>
                      <option value="">Select a service...</option>
                      {SVCS.map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="fg"><label>Project Details *</label><textarea rows={6} placeholder="Tell us about your project — type, location, approximate value and timeline..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/></div>
                  <button className="btn-gold btn-full" onClick={handleSubmit}>Send Enquiry &nbsp;<Svg d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z" s={14}/></button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="offices-sec">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">Global Presence</div>
            <h2 className="sec-h">Our Offices</h2>
            <div className="sec-line"/>
          </div>
          <div className="offices-grid">
            {OFFICES.map((o,i)=>(
              <div key={o.l} className={`office-card rv d${i+1}`}>
                <div className="office-flag">{o.flag}</div>
                <div className="office-loc">{o.v.split(' (')[0]}</div>
                <div className="office-role">{o.l}</div>
                {o.v.includes('Remote') && <div className="office-detail">Remote QS services available for all project types.</div>}
                {!o.v.includes('Remote') && <div className="office-detail">Primary base — all senior QS staff located here.</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

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
