'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ── SVG ICONS ─────────────────────────────────── */
const Ico = ({ d, size = 20, stroke = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const I = {
  menu:    "M3 12h18M3 6h18M3 18h18",
  close:   "M18 6 6 18M6 6l12 12",
  arrow:   "M5 12h14M12 5l7 7-7 7",
  arrowup: "M12 19V5M5 12l7-7 7 7",
  check:   "M20 6 9 17l-5-5",
  phone:   "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z",
  mail:    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  pin:     "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  globe:   "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10A15.3 15.3 0 0 1 8 12a15.3 15.3 0 0 1 4-10z",
  send:    "M22 2 11 13M22 2 15 22 11 13 2 9l20-7z",
  li:      "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  fb:      "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  ig:      "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
};

/* ── DATA ───────────────────────────────────────── */
const NAV = ['Home','Services','About','Process','Projects','Contact'];

const SLIDES = [
  { tag:'Quantity Surveying', title:'Global Vision.\nLocal Expertise.', sub:'Precision cost management across UAE & GCC' },
  { tag:'Cost Consultancy',   title:'Proactive Approach.\nDiligent Delivery.', sub:'Protecting your investment from concept to completion' },
  { tag:'Project Management', title:'Superior Results.\nEvery Time.', sub:'Over a decade of excellence in the built environment' },
];

const SERVICES = [
  { num:'01', title:'Cost Planning & Estimation',   desc:'Accurate pre-contract cost plans at every stage of design — from initial feasibility through detailed design to tender, providing reliable budget benchmarks throughout.' },
  { num:'02', title:'Bill of Quantities',            desc:'Precisely measured Bills of Quantities prepared in accordance with standard methods of measurement, forming a clear basis for tendering and ongoing cost control.' },
  { num:'03', title:'Contract Administration',       desc:'Expert contract management throughout the construction phase — interim valuations, variation assessment, claims handling and final account negotiation.' },
  { num:'04', title:'Project Cost Management',       desc:'Proactive monitoring, forecasting and reporting that keeps budgets on track, identifies risks early, and gives clients clear visibility of their financial position.' },
  { num:'05', title:'Dispute Resolution & Claims',   desc:'Professional quantum preparation and review for disputes, adjudications and arbitrations — protecting your commercial position at every stage.' },
  { num:'06', title:'Feasibility Studies',           desc:'Robust financial viability assessments and investment appraisals providing the clarity needed to make confident go/no-go decisions before committing capital.' },
  { num:'07', title:'Procurement Strategy',         desc:'Guidance on the most appropriate procurement routes, contract forms and tendering strategies to achieve best value and minimise commercial risk.' },
  { num:'08', title:'Value Engineering',             desc:'Structured cost reduction exercises identifying opportunities to reduce expenditure without compromising design intent, quality or programme.' },
];

const STATS = [
  { value:'10+',    label:'Years of Experience' },
  { value:'200+',   label:'Projects Delivered' },
  { value:'AED 2B+',label:'Total Value Managed' },
  { value:'98%',    label:'Client Satisfaction' },
];

const PROCESS = [
  { n:'01', t:'Initial Brief',        d:'Understanding your project objectives, programme, budget parameters and procurement strategy before anything else.' },
  { n:'02', t:'Cost Plan',            d:'Establishing a robust and well-structured cost plan with appropriate risk allowances and contingencies from the outset.' },
  { n:'03', t:'Tender Management',    d:'Preparing documentation, managing the tender process, evaluating returns and advising on contractor selection.' },
  { n:'04', t:'Construction Phase',   d:'Monitoring costs, assessing variations, valuing interim applications and reporting regularly throughout construction.' },
  { n:'05', t:'Final Account',        d:'Negotiating and agreeing the final account, ensuring all entitlements are properly assessed and liabilities minimised.' },
];

const PROJECTS = [
  { tag:'Residential',    name:'Luxury Villa Complex',        loc:'Dubai Hills, Dubai',    val:'AED 45M',   desc:'24-unit luxury villa development including landscaping, pools and smart home systems. Full QS services from inception to final account.' },
  { tag:'Commercial',     name:'Grade A Office Tower',        loc:'DIFC, Dubai',           val:'AED 280M',  desc:'38-storey premium office tower. Complete cost management, BOQ preparation and contract administration services.' },
  { tag:'Mixed-Use',      name:'Retail & Hospitality Scheme', loc:'JBR, Dubai',            val:'AED 120M',  desc:'Mixed-use retail and hotel development on the Jumeirah Beach Residence waterfront. Tender management and cost control.' },
  { tag:'Infrastructure', name:'Road & Utilities Package',    loc:'Abu Dhabi',             val:'AED 90M',   desc:"Employer's QS services for a major road infrastructure and utilities upgrade covering 14km of dual carriageway." },
  { tag:'Residential',    name:'High-Rise Apartment Tower',   loc:'Business Bay, Dubai',   val:'AED 175M',  desc:'52-storey residential tower. Post-contract cost management including variation control and monthly cost reporting.' },
  { tag:'Healthcare',     name:'Private Medical Centre',      loc:'Jumeirah, Dubai',       val:'AED 32M',   desc:'Specialist fit-out QS services covering clinical areas, diagnostics, pharmacy and patient suite accommodation.' },
];

const WHY = [
  'RICS-aligned professional standards on every commission',
  'Dedicated senior QS assigned to your project throughout',
  'Deep knowledge of UAE and GCC construction markets',
  'Clear, transparent reporting — no surprises at final account',
  'Proactive risk identification before problems become costly',
  'Proven track record across residential, commercial and infrastructure',
];

const CONTACTS = [
  { icon:'pin',   label:'Office',   val:'Dubai, United Arab Emirates' },
  { icon:'phone', label:'Phone',    val:'+971 XX XXX XXXX' },
  { icon:'mail',  label:'Email',    val:'info@saifeliteqs.com' },
  { icon:'globe', label:'Website',  val:'www.saifeliteqs.com' },
];

/* ── CANVAS 3D ──────────────────────────────────── */
function startCanvas(id) {
  const cv = document.getElementById(id); if (!cv) return null;
  const ctx = cv.getContext('2d'); let raf, t = 0;
  const sz = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
  sz(); window.addEventListener('resize', sz);
  const rY=(x,y,z,a)=>({x:x*Math.cos(a)+z*Math.sin(a),y,z:-x*Math.sin(a)+z*Math.cos(a)});
  const rX=(x,y,z,a)=>({x,y:y*Math.cos(a)-z*Math.sin(a),z:y*Math.sin(a)+z*Math.cos(a)});
  const pj=(x,y,z,cx,cy)=>{const f=500/(500+z);return{x:cx+x*f,y:cy+y*f,f};};
  const phi=(1+Math.sqrt(5))/2;
  const iV=[[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]].map(([x,y,z])=>{const l=Math.sqrt(x*x+y*y+z*z);return[x/l,y/l,z/l];});
  const iE=[[0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],[2,3],[2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],[4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11]];
  const cV=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  const cE=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  const PT=Array.from({length:50},()=>({x:(Math.random()-.5)*800,y:(Math.random()-.5)*600,z:Math.random()*400-200,r:Math.random()*1.6+0.4,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,vz:(Math.random()-.5)*.45,g:Math.random()>.5,p:Math.random()*Math.PI*2}));
  const draw=()=>{
    const W=cv.width,H=cv.height,cx=W/2,cy=H/2; t+=.005;
    ctx.clearRect(0,0,W,H);
    const gr=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*.65);
    gr.addColorStop(0,'rgba(201,168,76,.04)');gr.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    const iR=Math.min(W,H)*.18,iOx=cx-W*.18,iOy=cy;
    const iP=iV.map(([x,y,z])=>{let p=rY(x*iR,y*iR,z*iR,t*.7);p=rX(p.x,p.y,p.z,t*.4);return pj(p.x,p.y,p.z,iOx,iOy);});
    iE.forEach(([a,b])=>{const pa=iP[a],pb=iP[b],d=(pa.f+pb.f)/2;ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.strokeStyle=`rgba(201,168,76,${.08+d*.3})`;ctx.lineWidth=.8;ctx.stroke();});
    const cR=Math.min(W,H)*.12,cOx=cx+W*.2,cOy=cy;
    const cP=cV.map(([x,y,z])=>{let p=rY(x*cR,y*cR,z*cR,-t*.5);p=rX(p.x,p.y,p.z,t*.3);return pj(p.x,p.y,p.z,cOx,cOy);});
    cE.forEach(([a,b])=>{const pa=cP[a],pb=cP[b],d=(pa.f+pb.f)/2;ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.strokeStyle=`rgba(43,181,200,${.08+d*.25})`;ctx.lineWidth=.7;ctx.stroke();});
    const rR=Math.min(W,H)*.14,rOx=cx,rOy=cy;
    for(let rn=0;rn<2;rn++){ctx.beginPath();for(let i=0;i<=40;i++){const a=(i/40)*Math.PI*2+(rn?-t*.4:t*.55),tl=Math.sin(t*(rn?.22:.28))*.5,r=rR*(rn?.52:1),rx=Math.cos(a)*r,ry=Math.sin(a)*r*Math.cos(tl),rz=Math.sin(a)*r*Math.sin(tl)*.5,p=pj(rx,ry,rz,rOx,rOy);i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);}ctx.strokeStyle=rn?'rgba(201,168,76,.12)':'rgba(43,181,200,.16)';ctx.lineWidth=rn?.7:1;ctx.stroke();}
    PT.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.z+=p.vz;p.p+=.03;if(Math.abs(p.x)>W*.7)p.vx*=-1;if(Math.abs(p.y)>H*.7)p.vy*=-1;if(Math.abs(p.z)>250)p.vz*=-1;const pp=pj(p.x,p.y,p.z,cx,cy),al=pp.f*(.45+.28*Math.sin(p.p)),col=p.g?'201,168,76':'43,181,200',gg=ctx.createRadialGradient(pp.x,pp.y,0,pp.x,pp.y,pp.f*p.r*4);gg.addColorStop(0,`rgba(${col},${al*.8})`);gg.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=gg;ctx.beginPath();ctx.arc(pp.x,pp.y,pp.f*p.r*4,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(pp.x,pp.y,Math.max(.3,pp.f*p.r),0,Math.PI*2);ctx.fillStyle=`rgba(${col},${al})`;ctx.fill();});
    for(let i=0;i<PT.length;i++){const a=pj(PT[i].x,PT[i].y,PT[i].z,cx,cy);for(let j=i+1;j<PT.length;j++){const b=pj(PT[j].x,PT[j].y,PT[j].z,cx,cy),dx=a.x-b.x,dy=a.y-b.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<90){const al=(1-dist/90)*.12*Math.min(a.f,b.f),col=PT[i].g||PT[j].g?'201,168,76':'43,181,200';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(${col},${al})`;ctx.lineWidth=.5;ctx.stroke();}}}
    raf=requestAnimationFrame(draw);
  };
  draw();
  return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',sz);};
}

/* ── COMPONENT ──────────────────────────────────── */
export default function Home() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [slide,     setSlide]     = useState(0);
  const [slideAnim, setSlideAnim] = useState(true);
  const [form, setForm] = useState({fn:'',ln:'',email:'',svc:'',msg:''});
  const timerRef = useRef(null);

  /* scroll */
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>80);
    window.addEventListener('scroll',fn); return ()=>window.removeEventListener('scroll',fn);
  },[]);

  /* hero slider */
  useEffect(()=>{
    timerRef.current=setInterval(()=>{
      setSlideAnim(false);
      setTimeout(()=>{setSlide(s=>(s+1)%SLIDES.length);setSlideAnim(true);},400);
    },5000);
    return ()=>clearInterval(timerRef.current);
  },[]);

  /* canvas */
  useEffect(()=>{
    const c1=startCanvas('cv-hero');
    const c2=startCanvas('cv-cta');
    return ()=>{c1?.();c2?.();};
  },[]);

  /* scroll reveal */
  useEffect(()=>{
    const run=()=>document.querySelectorAll('.rv').forEach(el=>{
      if(el.getBoundingClientRect().top<window.innerHeight-50) el.classList.add('on');
    });
    run(); window.addEventListener('scroll',run,{passive:true});
    return ()=>window.removeEventListener('scroll',run);
  },[]);

  const go=(id)=>{setMenuOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};
  const goN=(n)=>{const m={'Home':'home','Services':'services','About':'about','Process':'process','Projects':'projects','Contact':'contact'};go(m[n]||'home');};

  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;font-size:16px;}
    :root{
      --g:#c9a84c;--gl:#e8c86a;--gd:#8a6820;
      --t:#2bb5c8;--tl:#56cfe1;
      --bk:#0c0c0c;--d1:#111;--d2:#181818;--d3:#222;--d4:#2a2a2a;
      --wh:#fff;--w1:#f5f0e8;--w2:#ddd5c4;--mu:#9a9080;
      --bd:rgba(201,168,76,.18);--bdl:rgba(201,168,76,.09);
      --tr:.28s ease;
    }
    body{background:var(--d1);color:var(--w2);font-family:system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bk)}::-webkit-scrollbar-thumb{background:var(--gd);border-radius:2px}

    /* REVEAL */
    .rv{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease;}
    .rv.on{opacity:1;transform:none;}
    .rv.rl{transform:translateX(-28px);}.rv.rl.on{transform:none;}
    .rv.rr{transform:translateX(28px);}.rv.rr.on{transform:none;}
    .d1x{transition-delay:.08s}.d2x{transition-delay:.16s}.d3x{transition-delay:.24s}.d4x{transition-delay:.32s}.d5x{transition-delay:.4s}.d6x{transition-delay:.48s}

    /* NAV */
    .nav{position:fixed;top:0;left:0;right:0;z-index:999;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 4rem;transition:all .4s;}
    .nav.up{background:rgba(12,12,12,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--bd);padding:.7rem 4rem;}
    .nlogo{display:flex;align-items:center;cursor:pointer;gap:.7rem;}
    .nlogo-txt{display:flex;flex-direction:column;line-height:1.1;}
    .nlogo-txt span:first-child{font-size:.78rem;font-weight:700;color:var(--wh);letter-spacing:.06em;text-transform:uppercase;}
    .nlogo-txt span:last-child{font-size:.55rem;color:var(--mu);letter-spacing:.18em;text-transform:uppercase;}
    .nlinks{display:flex;align-items:center;gap:2.2rem;list-style:none;}
    .nlinks a{color:var(--mu);text-decoration:none;font-size:.72rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;transition:color var(--tr);position:relative;padding-bottom:2px;}
    .nlinks a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--g);transition:width var(--tr);}
    .nlinks a:hover{color:var(--g);}.nlinks a:hover::after{width:100%;}
    .nbtn{background:var(--g);color:var(--bk);border:none;padding:.46rem 1.3rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .nbtn:hover{background:var(--gl);transform:translateY(-1px);}
    .burger{display:none;background:none;border:none;cursor:pointer;color:var(--g);}

    /* MOB MENU */
    .mob{display:none;position:fixed;inset:0;z-index:998;background:rgba(12,12,12,.98);flex-direction:column;align-items:center;justify-content:center;gap:2rem;}
    .mob.on{display:flex;}
    .mob-x{position:absolute;top:1.4rem;right:1.8rem;background:none;border:none;color:var(--mu);cursor:pointer;}
    .mob a{color:var(--wh);text-decoration:none;font-size:1.3rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transition:color var(--tr);}
    .mob a:hover{color:var(--g);}

    /* BUTTONS */
    .btn-g{display:inline-flex;align-items:center;gap:.5rem;background:var(--g);color:var(--bk);padding:.78rem 2rem;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:none;cursor:pointer;font-family:inherit;transition:all var(--tr);position:relative;overflow:hidden;}
    .btn-g::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);transition:left .5s;}
    .btn-g:hover{background:var(--gl);transform:translateY(-2px);box-shadow:0 10px 28px rgba(201,168,76,.3);}
    .btn-g:hover::before{left:100%;}
    .btn-o{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--w1);padding:.78rem 2rem;font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(245,240,232,.2);cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .btn-o:hover{border-color:var(--t);color:var(--tl);box-shadow:0 0 18px rgba(43,181,200,.15);}
    .btn-w{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--g);padding:.78rem 2rem;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--g);cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .btn-w:hover{background:var(--g);color:var(--bk);}
    .btn-full{width:100%;justify-content:center;padding:.88rem;}

    /* HERO */
    .hero{height:100vh;min-height:640px;position:relative;overflow:hidden;background:var(--bk);}
    #cv-hero{position:absolute;inset:0;width:100%;height:100%;z-index:0;}
    .hero-over{position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(12,12,12,.75) 45%,rgba(12,12,12,.2));}
    .hero-cnt{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:center;padding:0 4rem;max-width:860px;}
    .hero-tag{display:inline-flex;align-items:center;gap:.5rem;font-size:.65rem;letter-spacing:.25em;text-transform:uppercase;color:var(--tl);margin-bottom:1.4rem;animation:fu .8s .2s both;}
    .hero-tag::before{content:'';display:block;width:28px;height:1px;background:var(--t);}
    .hero-h{font-size:clamp(2.2rem,5vw,4rem);font-weight:700;line-height:1.12;color:var(--wh);margin-bottom:1.2rem;font-family:Georgia,'Times New Roman',serif;white-space:pre-line;transition:opacity .4s,transform .4s;}
    .hero-h.out{opacity:0;transform:translateY(12px);}
    .hero-h.in{opacity:1;transform:none;}
    .hero-sub{font-size:1rem;color:var(--w2);font-weight:300;margin-bottom:2.5rem;opacity:.88;animation:fu .8s .6s both;}
    .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;animation:fu .8s .8s both;}
    .hero-dots{position:absolute;bottom:2.5rem;left:4rem;z-index:2;display:flex;gap:.6rem;}
    .hdot{width:28px;height:2px;background:rgba(255,255,255,.25);cursor:pointer;transition:all var(--tr);}
    .hdot.a{background:var(--g);width:44px;}
    .hero-scroll{position:absolute;bottom:2.2rem;right:4rem;z-index:2;display:flex;flex-direction:column;align-items:center;gap:.4rem;animation:fu .8s 1.2s both;}
    .hero-scroll span{font-size:.52rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.3);writing-mode:vertical-rl;}
    .scrl-line{width:1px;height:40px;background:linear-gradient(to bottom,transparent,var(--g));animation:scrl 2s ease-in-out infinite;}
    @keyframes scrl{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
    @keyframes fu{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:none;}}

    /* TICKER */
    .ticker{background:var(--g);padding:.55rem 0;overflow:hidden;}
    .ticker-track{display:flex;gap:4rem;animation:tick 30s linear infinite;width:max-content;}
    .ticker-track span{font-size:.7rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--bk);white-space:nowrap;}
    .ticker-sep{color:var(--bk);opacity:.4;}
    @keyframes tick{from{transform:translateX(0);}to{transform:translateX(-50%)}}

    /* STATS */
    .stats{background:var(--d2);border-bottom:1px solid var(--bd);}
    .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);padding:3.5rem 1.5rem;}
    .stat{text-align:center;position:relative;padding:1rem;}
    .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:var(--bd);}
    .stat-v{font-size:2.6rem;font-weight:700;color:var(--g);line-height:1;margin-bottom:.35rem;font-family:Georgia,serif;}
    .stat-l{font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--mu);}

    /* SECTION BASE */
    section{padding:8rem 1.5rem;}
    .wrap{max-width:1100px;margin:0 auto;}
    .sec-tag{font-size:.62rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--t);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:700;color:var(--wh);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-h .gy{color:var(--g);}
    .sec-line{width:40px;height:2px;background:linear-gradient(to right,var(--g),var(--t));margin-bottom:1.2rem;}
    .sec-p{color:var(--w2);font-size:.92rem;font-weight:300;line-height:1.82;max-width:560px;}

    /* SERVICES */
    .svc-sec{background:var(--d1);}
    .svc-hd{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem;margin-bottom:4rem;}
    .svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);border:1px solid var(--bd);}
    .svc-card{background:var(--d1);padding:2rem 1.6rem;position:relative;overflow:hidden;transition:background var(--tr);cursor:default;}
    .svc-card::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:linear-gradient(to right,var(--g),var(--t));transition:width .45s ease;}
    .svc-card:hover{background:var(--d2);}.svc-card:hover::after{width:100%;}
    .svc-n{font-size:.62rem;color:var(--g);letter-spacing:.2em;font-weight:600;margin-bottom:1rem;opacity:.7;}
    .svc-t{font-size:.95rem;font-weight:700;color:var(--wh);margin-bottom:.65rem;font-family:Georgia,serif;line-height:1.3;}
    .svc-d{font-size:.8rem;color:var(--w2);line-height:1.75;}

    /* ABOUT */
    .abt{background:var(--d2);}
    .abt-g{display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start;}
    .abt-img{width:100%;aspect-ratio:3/4;background:var(--d3);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
    .abt-img::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(to right,var(--g),var(--t));}
    .abt-img-ph{text-align:center;color:var(--mu);}
    .abt-img-ph p{font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;margin-top:.5rem;opacity:.4;}
    .abt-corner{position:absolute;bottom:-1rem;right:-1rem;width:120px;height:120px;border:1px solid var(--bdl);}
    .abt-body{padding-top:.5rem;}
    .why-list{margin-top:2rem;display:flex;flex-direction:column;gap:.9rem;}
    .why-row{display:flex;align-items:flex-start;gap:.8rem;}
    .why-chk{color:var(--g);flex-shrink:0;margin-top:2px;}
    .why-txt{font-size:.85rem;color:var(--w2);line-height:1.6;}

    /* PROCESS */
    .proc{background:var(--d1);}
    .proc-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--bd);border:1px solid var(--bd);margin-top:3.5rem;}
    .proc-card{background:var(--d1);padding:2.2rem 1.5rem;position:relative;transition:background var(--tr);}
    .proc-card:hover{background:var(--d2);}
    .proc-num{font-size:3rem;font-weight:700;color:rgba(201,168,76,.1);font-family:Georgia,serif;line-height:1;margin-bottom:.9rem;}
    .proc-t{font-size:.88rem;font-weight:700;color:var(--wh);margin-bottom:.6rem;font-family:Georgia,serif;}
    .proc-d{font-size:.78rem;color:var(--w2);line-height:1.72;}
    .proc-bar{position:absolute;top:0;left:0;width:0;height:2px;background:var(--g);transition:width .5s ease;}
    .proc-card:hover .proc-bar{width:100%;}

    /* PROJECTS */
    .prj{background:var(--d2);}
    .prj-hd{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3.5rem;}
    .prj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
    .prj-card{background:var(--d3);border:1px solid var(--bdl);overflow:hidden;transition:all var(--tr);}
    .prj-card:hover{border-color:var(--gd);transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.4);}
    .prj-img{width:100%;aspect-ratio:16/10;background:var(--d4);border-bottom:1px solid var(--bdl);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
    .prj-img::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,168,76,.05),transparent);}
    .prj-img-ph{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.12);}
    .prj-body{padding:1.5rem;}
    .prj-tag{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--t);margin-bottom:.4rem;}
    .prj-name{font-size:.95rem;font-weight:700;color:var(--wh);margin-bottom:.2rem;font-family:Georgia,serif;line-height:1.3;}
    .prj-loc{font-size:.75rem;color:var(--mu);margin-bottom:.6rem;}
    .prj-val{font-size:.78rem;color:var(--g);font-weight:700;margin-bottom:.6rem;}
    .prj-desc{font-size:.78rem;color:var(--w2);line-height:1.68;}

    /* CTA */
    .cta{position:relative;overflow:hidden;padding:7rem 1.5rem;text-align:center;background:var(--bk);}
    #cv-cta{position:absolute;inset:0;width:100%;height:100%;z-index:0;}
    .cta-in{position:relative;z-index:2;}
    .cta-tag{font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:var(--t);margin-bottom:1rem;}
    .cta-h{font-size:clamp(1.8rem,3.5vw,3rem);font-weight:700;color:var(--wh);margin-bottom:1rem;font-family:Georgia,serif;}
    .cta-p{color:var(--w1);font-size:.9rem;font-weight:300;max-width:480px;margin:0 auto 2.5rem;line-height:1.78;opacity:.88;}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

    /* CONTACT */
    .cnt{background:var(--d2);}
    .cnt-g{display:grid;grid-template-columns:1fr 1.4fr;gap:6rem;margin-top:4rem;}
    .cnt-detail{display:flex;gap:1rem;align-items:flex-start;margin-bottom:2rem;}
    .cnt-ico{width:44px;height:44px;border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--g);}
    .cnt-lbl{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--t);margin-bottom:.25rem;}
    .cnt-val{font-size:.9rem;color:var(--wh);}
    .cnt-note{background:var(--d3);border-left:3px solid var(--g);padding:1.2rem 1.4rem;margin-top:2rem;}
    .cnt-note p{font-size:.82rem;color:var(--w2);line-height:1.72;}
    .frow{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
    .fg{display:flex;flex-direction:column;gap:.32rem;margin-bottom:.9rem;}
    .fg label{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mu);}
    .fg input,.fg textarea,.fg select{background:var(--d3);border:1px solid var(--bdl);color:var(--wh);padding:.72rem 1rem;font-size:.88rem;font-family:inherit;outline:none;transition:border-color var(--tr);resize:none;}
    .fg input::placeholder,.fg textarea::placeholder{color:rgba(154,144,128,.4);}
    .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--g);}
    .fg select option{background:var(--d3);}

    /* FOOTER */
    .ftr{background:var(--bk);border-top:1px solid var(--bd);padding:5rem 1.5rem 2rem;}
    .ftr-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid var(--bdl);margin-bottom:2rem;}
    .fbrand p{font-size:.82rem;color:var(--mu);line-height:1.8;margin-top:1rem;max-width:260px;}
    .fsoc{display:flex;gap:.7rem;margin-top:1.5rem;}
    .fsc{width:34px;height:34px;border:1px solid var(--bdl);display:flex;align-items:center;justify-content:center;color:var(--mu);transition:all var(--tr);text-decoration:none;}
    .fsc:hover{border-color:var(--g);color:var(--g);}
    .fcol h4{font-size:.62rem;letter-spacing:.24em;text-transform:uppercase;color:var(--g);margin-bottom:1.3rem;font-weight:700;}
    .fcol ul{list-style:none;}.fcol li{margin-bottom:.7rem;}
    .fcol a{color:var(--mu);text-decoration:none;font-size:.82rem;transition:color var(--tr);}
    .fcol a:hover{color:var(--g);}
    .fbot{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;}
    .fbot p{font-size:.7rem;color:rgba(154,144,128,.4);}

    /* RESPONSIVE */
    @media(max-width:1100px){
      .nav{padding:1rem 2rem;}.nav.up{padding:.65rem 2rem;}
      .hero-cnt{padding:0 2rem;}
      .hero-dots,.hero-scroll{left:2rem;}
      .hero-scroll{right:2rem;left:auto;}
      .svc-grid{grid-template-columns:repeat(2,1fr);}
      .abt-g{grid-template-columns:1fr;gap:3rem;}
      .proc-grid{grid-template-columns:repeat(3,1fr);}
      .prj-grid{grid-template-columns:repeat(2,1fr);}
      .cnt-g{grid-template-columns:1fr;gap:3rem;}
      .ftr-g{grid-template-columns:1fr 1fr;}
    }
    @media(max-width:768px){
      .nav{padding:.85rem 1.2rem;}.nav.up{padding:.6rem 1.2rem;}
      .nlinks,.nbtn{display:none;}.burger{display:flex;}
      .stats-g{grid-template-columns:repeat(2,1fr);}
      .stat:nth-child(2)::after{display:none;}
      .svc-grid,.prj-grid,.proc-grid{grid-template-columns:1fr;}
      .frow{grid-template-columns:1fr;}
      .ftr-g{grid-template-columns:1fr;gap:2rem;}
      section{padding:5rem 1.2rem;}
      .svc-hd,.prj-hd{flex-direction:column;align-items:flex-start;}
      .hero-cnt{padding:0 1.2rem;}
    }
    @media(max-width:480px){
      .stats-g{grid-template-columns:1fr 1fr;gap:.5rem;}
      .stat::after{display:none!important;}
    }
  `;

  const tickItems = ['Quantity Surveying','Cost Planning','Bill of Quantities','Contract Administration','Feasibility Studies','Dispute Resolution','Value Engineering','Procurement Strategy'];

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled?'up':''}`}>
        <div className="nlogo" onClick={()=>go('home')}>
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={72} height={72} style={{objectFit:'contain'}} priority/>
          <div className="nlogo-txt">
            <span>Saif Elite QS</span>
            <span>Quantity Surveyor & Cost Consultant</span>
          </div>
        </div>
        <ul className="nlinks">
          {NAV.map(n=>(<li key={n}><a href={`#${n.toLowerCase()}`} onClick={e=>{e.preventDefault();goN(n);}}>{n}</a></li>))}
        </ul>
        <button className="nbtn" onClick={()=>go('contact')}>Get a Quote</button>
        <button className="burger" onClick={()=>setMenuOpen(true)}><Ico d={I.menu} size={24}/></button>
      </nav>

      {/* MOBILE */}
      <div className={`mob ${menuOpen?'on':''}`}>
        <button className="mob-x" onClick={()=>setMenuOpen(false)}><Ico d={I.close} size={26}/></button>
        {NAV.map(n=>(<a key={n} href="#" onClick={e=>{e.preventDefault();goN(n);}}>{n}</a>))}
        <button className="btn-g" onClick={()=>{go('contact');setMenuOpen(false);}}>Get a Quote</button>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <canvas id="cv-hero"/>
        <div className="hero-over"/>
        <div className="hero-cnt">
          <div className="hero-tag">{SLIDES[slide].tag}</div>
          <h1 className={`hero-h ${slideAnim?'in':'out'}`}>{SLIDES[slide].title}</h1>
          <p className="hero-sub">{SLIDES[slide].sub}</p>
          <div className="hero-btns">
            <button className="btn-g" onClick={()=>go('contact')}>Free Consultation&nbsp;<Ico d={I.arrow} size={14}/></button>
            <button className="btn-o" onClick={()=>go('services')}>Our Services</button>
          </div>
        </div>
        <div className="hero-dots">
          {SLIDES.map((_,i)=>(<div key={i} className={`hdot ${i===slide?'a':''}`} onClick={()=>{clearInterval(timerRef.current);setSlide(i);}}/>))}
        </div>
        <div className="hero-scroll">
          <div className="scrl-line"/>
          <span>Scroll</span>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...tickItems,...tickItems].map((s,i)=>(
            <span key={i}>{s}<span className="ticker-sep">&nbsp;·&nbsp;</span></span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stats-g">
          {STATS.map((s,i)=>(<div key={s.label} className={`stat rv d${i+1}x`}><div className="stat-v">{s.value}</div><div className="stat-l">{s.label}</div></div>))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="svc-sec">
        <div className="wrap">
          <div className="svc-hd">
            <div className="rv">
              <div className="sec-tag">What We Do</div>
              <h2 className="sec-h">Our <span className="gy">Services</span></h2>
              <div className="sec-line"/>
              <p className="sec-p">From initial feasibility through to final account — a complete range of quantity surveying and cost consultancy services tailored to your project.</p>
            </div>
            <button className="btn-w rv d2x" onClick={()=>go('contact')}>Discuss Your Project&nbsp;<Ico d={I.arrow} size={13}/></button>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s,i)=>(<div key={s.num} className={`svc-card rv d${(i%4)+1}x`}><div className="svc-n">{s.num}</div><div className="svc-t">{s.title}</div><div className="svc-d">{s.desc}</div></div>))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="abt">
        <div className="wrap">
          <div className="abt-g">
            <div className="rv rl">
              <div className="abt-img">
                <div className="abt-img-ph">
                  <Ico d={I.globe} size={48}/>
                  <p>About Image</p>
                </div>
                <div className="abt-corner"/>
              </div>
            </div>
            <div className="abt-body rv rr">
              <div className="sec-tag">Who We Are</div>
              <h2 className="sec-h">About <span className="gy">Saif Elite QS</span></h2>
              <div className="sec-line"/>
              <p className="sec-p" style={{marginBottom:'1rem'}}>Saif Elite QS is a specialist quantity surveying and cost consultancy practice based in Dubai, serving clients across the UAE and wider GCC region. We bring rigorous commercial discipline to every project — whether a boutique residential development or a landmark commercial scheme worth hundreds of millions.</p>
              <p className="sec-p" style={{marginBottom:'1rem'}}>Founded on the principles of transparency, accuracy and client-first service, our qualified team delivers measurable value at every stage of the construction process. We work alongside developers, contractors, architects and project managers to ensure cost is always controlled, risk is always understood, and every decision is fully informed.</p>
              <p className="sec-p">Our approach combines deep local market knowledge with internationally recognised professional standards — giving our clients the confidence that their investment is in expert hands from the very first day.</p>
              <div className="why-list">
                {WHY.map((w,i)=>(<div key={i} className="why-row"><span className="why-chk"><Ico d={I.check} size={15}/></span><span className="why-txt">{w}</span></div>))}
              </div>
              <div style={{marginTop:'2rem'}}><button className="btn-g" onClick={()=>go('contact')}>Work With Us&nbsp;<Ico d={I.arrow} size={14}/></button></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="proc">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">How We Work</div>
            <h2 className="sec-h">Our <span className="gy">Process</span></h2>
            <div className="sec-line"/>
            <p className="sec-p">A structured, transparent approach that gives clients complete visibility and control over their project costs from inception through to final account.</p>
          </div>
          <div className="proc-grid">
            {PROCESS.map((p,i)=>(<div key={p.n} className={`proc-card rv d${i+1}x`}><div className="proc-bar"/><div className="proc-num">{p.n}</div><div className="proc-t">{p.t}</div><div className="proc-d">{p.d}</div></div>))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="prj">
        <div className="wrap">
          <div className="prj-hd">
            <div className="rv">
              <div className="sec-tag">Our Work</div>
              <h2 className="sec-h">Featured <span className="gy">Projects</span></h2>
              <div className="sec-line"/>
            </div>
            <button className="btn-w rv d2x" style={{fontSize:'.72rem'}}>View All Projects&nbsp;<Ico d={I.arrow} size={13}/></button>
          </div>
          <div className="prj-grid">
            {PROJECTS.map((p,i)=>(<div key={p.name} className={`prj-card rv d${(i%3)+1}x`}>
              <div className="prj-img"><span className="prj-img-ph">Project Image</span></div>
              <div className="prj-body">
                <div className="prj-tag">{p.tag}</div>
                <div className="prj-name">{p.name}</div>
                <div className="prj-loc">{p.loc}</div>
                <div className="prj-val">{p.val}</div>
                <div className="prj-desc">{p.desc}</div>
              </div>
            </div>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta">
        <canvas id="cv-cta"/>
        <div className="cta-in rv">
          <div className="cta-tag">Start Today</div>
          <h2 className="cta-h">Ready to Control Your Project Costs?</h2>
          <p className="cta-p">Get in touch for a free, no-obligation consultation. Our senior consultants will respond within one business day.</p>
          <div className="cta-btns">
            <button className="btn-g" onClick={()=>go('contact')}>Request a Consultation&nbsp;<Ico d={I.arrow} size={14}/></button>
            <button className="btn-o" onClick={()=>go('services')}>View Our Services</button>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="cnt">
        <div className="wrap">
          <div className="rv">
            <div className="sec-tag">Get in Touch</div>
            <h2 className="sec-h">Contact <span className="gy">Us</span></h2>
            <div className="sec-line"/>
          </div>
          <div className="cnt-g">
            <div className="rv rl">
              <p className="sec-p" style={{marginBottom:'2.5rem'}}>Have a project in mind? Reach out and a senior consultant will respond within one business day with a no-obligation discussion of how we can help.</p>
              {CONTACTS.map(c=>(<div key={c.label} className="cnt-detail"><div className="cnt-ico"><Ico d={I[c.icon]} size={17}/></div><div><div className="cnt-lbl">{c.label}</div><div className="cnt-val">{c.val}</div></div></div>))}
              <div className="cnt-note"><p><strong style={{color:'var(--g)'}}>Response Guarantee:</strong> We respond to every enquiry within one business day. For urgent requirements, please call us directly.</p></div>
            </div>
            <div className="rv rr d2x">
              <div className="frow">
                <div className="fg"><label>First Name</label><input type="text" placeholder="John" value={form.fn} onChange={e=>setForm({...form,fn:e.target.value})}/></div>
                <div className="fg"><label>Last Name</label><input type="text" placeholder="Smith" value={form.ln} onChange={e=>setForm({...form,ln:e.target.value})}/></div>
              </div>
              <div className="fg"><label>Email Address</label><input type="email" placeholder="john@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              <div className="fg"><label>Service Required</label>
                <select value={form.svc} onChange={e=>setForm({...form,svc:e.target.value})}>
                  <option value="">Select a service...</option>
                  {SERVICES.map(s=><option key={s.num}>{s.title}</option>)}
                </select>
              </div>
              <div className="fg"><label>Project Details</label><textarea rows={5} placeholder="Tell us about your project — location, type, approximate value and any specific requirements..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/></div>
              <button className="btn-g btn-full">Send Enquiry&nbsp;<Ico d={I.send} size={14}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ftr">
        <div className="ftr-g">
          <div className="fbrand">
            <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={80} height={80} style={{objectFit:'contain'}}/>
            <p>Professional Quantity Surveying and Cost Consultancy across the UAE and GCC. Trusted by developers, contractors and investors to deliver commercial clarity on every project.</p>
            <div className="fsoc">
              {[['li',I.li],['fb',I.fb],['ig',I.ig]].map(([k,d])=>(<a key={k} href="#" className="fsc" aria-label={k}><Ico d={d} size={14}/></a>))}
            </div>
          </div>
          <div className="fcol"><h4>Services</h4><ul>{SERVICES.slice(0,6).map(s=>(<li key={s.num}><a href="#" onClick={e=>{e.preventDefault();go('services');}}>{s.title}</a></li>))}</ul></div>
          <div className="fcol"><h4>Company</h4><ul>{[['About Us','about'],['Our Process','process'],['Projects','projects'],['Contact','contact']].map(([t,h])=>(<li key={t}><a href={`#${h}`} onClick={e=>{e.preventDefault();go(h);}}>{t}</a></li>))}</ul></div>
          <div className="fcol"><h4>Connect</h4><ul><li><a href="#">LinkedIn</a></li><li><a href="#">WhatsApp</a></li><li><a href="mailto:info@saifeliteqs.com">Email Us</a></li><li><a href="tel:+971000000000">Call Us</a></li></ul></div>
        </div>
        <div className="fbot">
          <p>© 2025 <span style={{color:'var(--g)'}}>Saif Elite QS</span>. All rights reserved.</p>
          <p>Quantity Surveyor &amp; Cost Consultant — Dubai, UAE</p>
        </div>
      </footer>
    </>
  );
}
