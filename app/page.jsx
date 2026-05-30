'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const ICONS = {
  ruler:     "M2 20h20M6 20V8l4-4h8v16M10 8h4M10 12h4M10 16h4",
  file:      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  clipboard: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2m-6 9l2 2 4-4",
  chart:     "M18 20V10M12 20V4M6 20v-6",
  scale:     "M12 3v18M3 6l9-3 9 3M5 10a7 7 0 0 0 14 0",
  trending:  "M22 7l-8.5 8.5-5-5L2 17M16 7h6v6",
  check:     "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  phone:     "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  mail:      "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  mappin:    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  globe:     "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  clock:     "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
  star:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  award:     "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89 7 23l5-3 5 3-1.21-9.12",
  building:  "M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16",
  users:     "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  shield:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  target:    "M22 12A10 10 0 1 1 12 2M22 12h-4M12 2v4M16.24 7.76l-2.83 2.83",
  close:     "M18 6 6 18M6 6l12 12",
  arrow:     "M5 12h14M12 5l7 7-7 7",
  chevdown:  "M6 9l6 6 6-6",
  send:      "M22 2 11 13M22 2 15 22 11 13 2 9l20-7z",
  linkedin:  "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  facebook:  "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  instagram: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
};

const NAV = [
  {label:'Home',href:'#home'},{label:'Services',href:'#services'},
  {label:'About',href:'#about'},{label:'Process',href:'#process'},
  {label:'Projects',href:'#projects'},{label:'Contact',href:'#contact'},
];
const SERVICES = [
  {icon:'ruler',    title:'Cost Planning & Estimation', desc:'Accurate pre-contract cost plans and detailed estimates at every design stage — from initial feasibility through to tender. We ensure your budget is realistic from day one.'},
  {icon:'file',     title:'Bill of Quantities',          desc:'Precisely measured and prepared Bills of Quantities in accordance with standard methods of measurement, providing a clear basis for tendering and cost control.'},
  {icon:'clipboard',title:'Contract Administration',     desc:'Expert contract management, interim valuations, variation assessments, claims handling and final account negotiations to protect your commercial interests throughout.'},
  {icon:'chart',    title:'Project Cost Management',     desc:'Proactive cost monitoring, forecasting and reporting throughout construction. We identify risks early and keep your project on budget from groundbreaking to handover.'},
  {icon:'scale',    title:'Dispute Resolution & Claims', desc:'Professional claims preparation, review and quantum support for contractual disputes, adjudications and arbitrations — protecting your position at every stage.'},
  {icon:'trending', title:'Feasibility Studies',         desc:'Robust financial viability assessments and investment appraisals that give you the confidence to proceed — or the clarity to reconsider — before committing capital.'},
];
const STATS = [
  {icon:'clock',   value:'10+',    label:'Years Experience'},
  {icon:'building',value:'200+',   label:'Projects Delivered'},
  {icon:'star',    value:'98%',    label:'Client Satisfaction'},
  {icon:'award',   value:'AED 2B+',label:'Projects Valued'},
];
const WHY = [
  {icon:'shield', title:'RICS Aligned Standards',  desc:'Every service we deliver follows RICS best practice and internationally recognised measurement standards, ensuring consistency, accuracy and professional credibility.'},
  {icon:'target', title:'Transparent Reporting',   desc:'Clear, detailed cost reports delivered on programme — our clients always know exactly where their budget stands, with no surprises at final account.'},
  {icon:'building',title:'Local Market Expertise', desc:'Deep knowledge of UAE and GCC construction costs, procurement routes, subcontract markets and regulatory requirements built over a decade of active practice.'},
  {icon:'users',  title:'Dedicated Client Focus',  desc:'Every client receives a dedicated senior QS who understands their project from start to finish. No handoffs, no juniors — consistent expert attention throughout.'},
];
const PROCESS = [
  {num:'01', title:'Initial Consultation',   desc:'We begin with a thorough discussion of your project scope, programme, procurement strategy and commercial objectives — ensuring our approach is perfectly aligned with your goals.'},
  {num:'02', title:'Cost Plan & Strategy',   desc:'We develop a robust cost plan with appropriate contingencies and risk allowances, establishing a solid financial baseline from which to control and monitor your project.'},
  {num:'03', title:'Tender & Procurement',   desc:'We prepare detailed tender documentation, manage the procurement process, evaluate returns, and advise on contractor selection to achieve best value and reduce risk.'},
  {num:'04', title:'Construction Phase',     desc:'Throughout construction we monitor costs, assess variations, value interim applications, and report regularly — keeping you informed and in control at every stage.'},
  {num:'05', title:'Final Account & Close',  desc:'We negotiate and agree the final account with the contractor, ensuring all contractual entitlements are properly assessed and your financial exposure is minimised.'},
];
const PROJECTS = [
  {tag:'Residential',    name:'Luxury Villa Complex — Dubai Hills',       value:'AED 45M',  desc:'Cost management and contract administration for a 24-unit luxury villa development including landscaping, pools and smart home systems.'},
  {tag:'Commercial',     name:'Grade A Office Tower — DIFC',              value:'AED 280M', desc:'Full QS services from feasibility through to final account for a 38-storey premium office tower in the heart of the financial district.'},
  {tag:'Mixed-Use',      name:'Retail & Hospitality Development — JBR',   value:'AED 120M', desc:'Bill of quantities, tender management and cost control for a mixed-use retail and hotel scheme on the Jumeirah Beach Residence waterfront.'},
  {tag:'Infrastructure', name:'Road & Utilities Package — Abu Dhabi',     value:'AED 90M',  desc:'Employer\'s QS services for a major road infrastructure and utilities upgrade programme covering 14km of dual carriageway.'},
  {tag:'Residential',    name:'High-Rise Apartment Tower — Business Bay', value:'AED 175M', desc:'Post-contract cost management including variation control and monthly reporting for a 52-storey residential tower in Business Bay.'},
  {tag:'Healthcare',     name:'Medical Centre Fit-out — Jumeirah',        value:'AED 32M',  desc:'Specialist fit-out QS services for a state-of-the-art private medical facility covering clinical areas, diagnostics and patient suites.'},
];
const CONTACTS = [
  {icon:'mappin',label:'Office', value:'Dubai, United Arab Emirates'},
  {icon:'phone', label:'Phone',  value:'+971 XX XXX XXXX'},
  {icon:'mail',  label:'Email',  value:'info@saifeliteqs.com'},
  {icon:'globe', label:'Website',value:'www.saifeliteqs.com'},
];

/* 3D Canvas helper */
function init3D(id, ca, cb) {
  const canvas = document.getElementById(id);
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  let raf, t = 0;
  const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
  resize();
  window.addEventListener('resize', resize);
  const rY=(x,y,z,a)=>({x:x*Math.cos(a)+z*Math.sin(a),y,z:-x*Math.sin(a)+z*Math.cos(a)});
  const rX=(x,y,z,a)=>({x,y:y*Math.cos(a)-z*Math.sin(a),z:y*Math.sin(a)+z*Math.cos(a)});
  const pr=(x,y,z,cx,cy)=>{const f=500/(500+z);return{x:cx+x*f,y:cy+y*f,f};};
  const phi=(1+Math.sqrt(5))/2;
  const iV=[[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]].map(([x,y,z])=>{const l=Math.sqrt(x*x+y*y+z*z);return[x/l,y/l,z/l];});
  const iE=[[0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],[2,3],[2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],[4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11]];
  const cV=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  const cE=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  const PT=Array.from({length:50},()=>({x:(Math.random()-.5)*800,y:(Math.random()-.5)*600,z:Math.random()*400-200,r:Math.random()*1.6+0.4,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,vz:(Math.random()-.5)*.5,gold:Math.random()>.5,pulse:Math.random()*Math.PI*2}));
  const draw=()=>{
    const W=canvas.width,H=canvas.height,cx=W/2,cy=H/2;t+=.005;
    ctx.clearRect(0,0,W,H);
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*.7);
    g.addColorStop(0,`rgba(${ca},.05)`);g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    const iR=Math.min(W,H)*.2,iOx=cx-W*.2,iOy=cy;
    const iP=iV.map(([x,y,z])=>{let p=rY(x*iR,y*iR,z*iR,t*.7);p=rX(p.x,p.y,p.z,t*.4);return pr(p.x,p.y,p.z,iOx,iOy);});
    iE.forEach(([a,b])=>{const pa=iP[a],pb=iP[b],d=(pa.f+pb.f)/2;ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.strokeStyle=`rgba(${ca},${.1+d*.4})`;ctx.lineWidth=.8;ctx.stroke();});
    const cR=Math.min(W,H)*.13,cOx=cx+W*.2,cOy=cy;
    const cP=cV.map(([x,y,z])=>{let p=rY(x*cR,y*cR,z*cR,-t*.5);p=rX(p.x,p.y,p.z,t*.3);return pr(p.x,p.y,p.z,cOx,cOy);});
    cE.forEach(([a,b])=>{const pa=cP[a],pb=cP[b],d=(pa.f+pb.f)/2;ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.strokeStyle=`rgba(${cb},${.1+d*.3})`;ctx.lineWidth=.7;ctx.stroke();});
    const rR=Math.min(W,H)*.15,rOx=cx,rOy=cy;
    for(let ring=0;ring<2;ring++){ctx.beginPath();for(let i=0;i<=40;i++){const a=(i/40)*Math.PI*2+(ring?-t*.4:t*.6),tl=Math.sin(t*(ring?.25:.3))*.5,r=rR*(ring?.55:1),rx=Math.cos(a)*r,ry=Math.sin(a)*r*Math.cos(tl),rz=Math.sin(a)*r*Math.sin(tl)*.5,p=pr(rx,ry,rz,rOx,rOy);i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);}ctx.strokeStyle=ring?`rgba(${ca},.15)`:`rgba(${cb},.2)`;ctx.lineWidth=ring?.7:1.1;ctx.stroke();}
    PT.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.z+=p.vz;p.pulse+=.03;if(Math.abs(p.x)>W*.7)p.vx*=-1;if(Math.abs(p.y)>H*.7)p.vy*=-1;if(Math.abs(p.z)>250)p.vz*=-1;const pp=pr(p.x,p.y,p.z,cx,cy),al=pp.f*(.5+.3*Math.sin(p.pulse)),col=p.gold?ca:cb,gg=ctx.createRadialGradient(pp.x,pp.y,0,pp.x,pp.y,pp.f*p.r*4);gg.addColorStop(0,`rgba(${col},${al*.9})`);gg.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=gg;ctx.beginPath();ctx.arc(pp.x,pp.y,pp.f*p.r*4,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(pp.x,pp.y,Math.max(.3,pp.f*p.r),0,Math.PI*2);ctx.fillStyle=`rgba(${col},${al})`;ctx.fill();});
    for(let i=0;i<PT.length;i++){const a=pr(PT[i].x,PT[i].y,PT[i].z,cx,cy);for(let j=i+1;j<PT.length;j++){const b=pr(PT[j].x,PT[j].y,PT[j].z,cx,cy),dx=a.x-b.x,dy=a.y-b.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<90){const al=(1-dist/90)*.14*Math.min(a.f,b.f),col=PT[i].gold||PT[j].gold?ca:cb;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(${col},${al})`;ctx.lineWidth=.5;ctx.stroke();}}}
    raf=requestAnimationFrame(draw);
  };
  draw();
  return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({firstName:'',lastName:'',email:'',service:'',message:''});

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60);
    window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn);
  },[]);

  useEffect(()=>{
    const c1=init3D('hero-canvas','201,168,76','43,181,200');
    const c2=init3D('cta-canvas','201,168,76','43,181,200');
    return()=>{c1?.();c2?.();};
  },[]);

  /* Scroll reveal — watches ALL reveal classes */
  useEffect(()=>{
    const sel='.rv';
    const run=()=>{
      document.querySelectorAll(sel).forEach(el=>{
        const rect=el.getBoundingClientRect();
        if(rect.top<window.innerHeight-60) el.classList.add('vis');
      });
    };
    run();
    window.addEventListener('scroll',run,{passive:true});
    return()=>window.removeEventListener('scroll',run);
  },[]);

  const go=(href)=>{setMenuOpen(false);document.querySelector(href)?.scrollIntoView({behavior:'smooth'});};

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        :root{
          --gold:#c9a84c;--gold-lt:#e8c96a;--gold-dk:#9a7a2e;
          --teal:#2bb5c8;--teal-lt:#56cfe1;
          --black:#0f0f0f;--dark:#161616;--dark2:#1e1e1e;--dark3:#272727;
          --white:#ffffff;--warm:#f0ebe0;--txt:#d8d0c4;--muted:#a8a090;
          --bdr:rgba(201,168,76,0.2);--bdr-lt:rgba(201,168,76,0.1);
          --r:4px;--t:0.3s ease;
        }
        body{background:var(--dark);color:var(--txt);font-family:system-ui,-apple-system,sans-serif;line-height:1.65;overflow-x:hidden;}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--black)}::-webkit-scrollbar-thumb{background:var(--gold-dk);border-radius:3px}

        /* REVEAL */
        .rv{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease;}
        .rv.vis{opacity:1;transform:translateY(0);}
        .rv-l{opacity:0;transform:translateX(-30px);transition:opacity .7s ease,transform .7s ease;}
        .rv-l.vis{opacity:1;transform:translateX(0);}
        .rv-r{opacity:0;transform:translateX(30px);transition:opacity .7s ease,transform .7s ease;}
        .rv-r.vis{opacity:1;transform:translateX(0);}
        .d1{transition-delay:.1s}.d2{transition-delay:.18s}.d3{transition-delay:.26s}.d4{transition-delay:.34s}.d5{transition-delay:.42s}.d6{transition-delay:.5s}

        /* NAV */
        .nav{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:1rem 4rem;transition:all .4s;}
        .nav.up{background:rgba(15,15,15,.97);backdrop-filter:blur(14px);border-bottom:1px solid var(--bdr);padding:.6rem 4rem;}
        .nav-logo{display:flex;align-items:center;cursor:pointer;}
        .nav-links{display:flex;align-items:center;gap:2rem;list-style:none;}
        .nav-links a{color:var(--muted);text-decoration:none;font-size:.75rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;transition:color var(--t);position:relative;}
        .nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--gold);transition:width var(--t);}
        .nav-links a:hover{color:var(--gold);}.nav-links a:hover::after{width:100%;}
        .btn-q{background:transparent;border:1px solid var(--gold);color:var(--gold);padding:.48rem 1.3rem;font-size:.72rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;border-radius:var(--r);font-family:inherit;transition:all var(--t);}
        .btn-q:hover{background:var(--gold);color:var(--black);}
        .burger{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:4px;}
        .burger span{display:block;width:24px;height:1.5px;background:var(--gold);}

        /* MOBILE */
        .mob{display:none;position:fixed;inset:0;z-index:999;background:rgba(15,15,15,.98);flex-direction:column;align-items:center;justify-content:center;gap:2rem;}
        .mob.on{display:flex;}
        .mob-x{position:absolute;top:1.2rem;right:1.5rem;background:none;border:none;color:var(--muted);cursor:pointer;display:flex;}
        .mob a{color:var(--white);text-decoration:none;font-size:1.4rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;transition:color var(--t);}
        .mob a:hover{color:var(--gold);}

        /* BUTTONS */
        .btn-p{display:inline-flex;align-items:center;gap:.5rem;background:linear-gradient(135deg,var(--gold-lt),var(--gold-dk));color:var(--black);padding:.82rem 2rem;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;border-radius:var(--r);cursor:pointer;font-family:inherit;transition:transform var(--t),box-shadow var(--t);position:relative;overflow:hidden;}
        .btn-p::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);transition:left .5s ease;}
        .btn-p:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(201,168,76,.4);}
        .btn-p:hover::before{left:100%;}
        .btn-p:active{transform:translateY(-1px);}
        .btn-o{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--warm);padding:.82rem 2rem;font-size:.78rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(240,235,224,.22);border-radius:var(--r);cursor:pointer;font-family:inherit;transition:all var(--t);}
        .btn-o:hover{border-color:var(--teal);color:var(--teal-lt);box-shadow:0 0 20px rgba(43,181,200,.18);}
        .btn-full{width:100%;padding:.9rem;justify-content:center;}

        /* HERO */
        .hero{height:100vh;min-height:620px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background:var(--black);}
        #hero-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;}
        .hero-box{position:relative;z-index:2;text-align:center;padding:0 1.5rem;max-width:820px;width:100%;}
        .badge{display:inline-flex;align-items:center;gap:.6rem;border:1px solid rgba(43,181,200,.35);background:rgba(43,181,200,.08);padding:.3rem 1rem;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--teal-lt);border-radius:2px;margin-bottom:1.3rem;animation:fu .9s .1s both;}
        .dot{width:5px;height:5px;border-radius:50%;background:var(--teal);animation:pulse 2.5s infinite;}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.75);}}
        .hero-h{font-size:clamp(1.6rem,3.5vw,2.6rem);font-weight:700;line-height:1.25;color:var(--white);margin-bottom:1rem;font-family:Georgia,serif;}
        .hw{display:inline-block;opacity:0;transform:translateY(20px);animation:wordIn .5s forwards;}
        .hw.cg{color:var(--gold);}.hw.ct{color:var(--teal-lt);}
        @keyframes wordIn{to{opacity:1;transform:translateY(0);}}
        .hero-p{font-size:.88rem;color:var(--muted);max-width:480px;margin:0 auto 2rem;font-weight:300;line-height:1.78;animation:fu .9s 1.8s both;}
        .hero-btns{display:flex;gap:.9rem;justify-content:center;flex-wrap:wrap;animation:fu .9s 2s both;}
        .scroll-hint{position:absolute;bottom:1.2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.3rem;animation:fu .9s 2.2s both;}
        .scroll-hint span{font-size:.55rem;letter-spacing:.25em;text-transform:uppercase;color:rgba(168,160,144,.45);}
        .scroll-bar{width:1px;height:32px;background:linear-gradient(to bottom,var(--gold),transparent);animation:sb 2.2s ease-in-out infinite;}
        @keyframes sb{0%{transform:scaleY(0);transform-origin:top;}45%{transform:scaleY(1);transform-origin:top;}55%{transform:scaleY(1);transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
        @keyframes fu{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}

        /* STATS */
        .stats{background:var(--dark2);border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);padding:2.8rem 1.5rem;}
        .stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;text-align:center;}
        .stat{position:relative;}
        .stat:not(:last-child)::after{content:'';position:absolute;right:0;top:15%;height:70%;width:1px;background:var(--bdr);}
        .stat-ico{display:flex;align-items:center;justify-content:center;margin-bottom:.6rem;color:var(--gold);}
        .stat-v{font-size:1.9rem;font-weight:700;color:var(--gold);line-height:1;margin-bottom:.3rem;font-family:Georgia,serif;}
        .stat-l{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);}

        /* SECTION */
        section{padding:7rem 1.5rem;}
        .wrap{max-width:1100px;margin:0 auto;}
        .slabel{font-size:.64rem;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--teal);margin-bottom:.7rem;}
        .stitle{font-size:clamp(1.5rem,2.6vw,2.1rem);font-weight:700;color:var(--white);line-height:1.2;margin-bottom:.9rem;font-family:Georgia,serif;}
        .sline{width:40px;height:2px;background:linear-gradient(to right,var(--gold),var(--teal));margin-bottom:1.1rem;}
        .sdesc{color:var(--txt);font-size:.9rem;font-weight:300;line-height:1.8;max-width:520px;}

        /* SERVICES */
        .svc-sec{background:var(--dark);}
        .svc-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem;margin-bottom:3.5rem;}
        .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bdr);border:1px solid var(--bdr);}
        .svc-card{background:var(--dark);padding:2.2rem 1.8rem;position:relative;overflow:hidden;transition:background var(--t);}
        .svc-card::before{content:'';position:absolute;top:0;left:0;width:2px;height:0;background:linear-gradient(to bottom,var(--gold),var(--teal));transition:height .4s ease;}
        .svc-card:hover{background:var(--dark2);}.svc-card:hover::before{height:100%;}
        .svc-ico{width:44px;height:44px;border:1px solid var(--bdr);display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;color:var(--gold);transition:all var(--t);}
        .svc-card:hover .svc-ico{border-color:var(--gold);background:rgba(201,168,76,.1);}
        .svc-t{font-size:.95rem;font-weight:700;color:var(--white);margin-bottom:.65rem;font-family:Georgia,serif;}
        .svc-d{font-size:.83rem;color:var(--txt);line-height:1.75;}
        .svc-a{display:inline-flex;align-items:center;gap:.3rem;margin-top:1.2rem;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);opacity:0;transition:opacity var(--t);}
        .svc-card:hover .svc-a{opacity:1;}

        /* ABOUT */
        .abt{background:var(--dark2);}
        .abt-g{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;}
        .abt-wrap{position:relative;}
        .abt-box{width:100%;aspect-ratio:4/3;background:var(--dark3);border:1px solid var(--bdr);display:flex;align-items:center;justify-content:center;overflow:hidden;}
        .abt-ph{text-align:center;color:var(--muted);}
        .abt-ph p{font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;opacity:.45;margin-top:.5rem;}
        .c-br{position:absolute;bottom:-1.2rem;right:-1.2rem;width:150px;height:150px;border:1px solid var(--bdr-lt);z-index:-1;}
        .c-tl{position:absolute;top:-1.2rem;left:-1.2rem;width:70px;height:70px;border:1px solid rgba(43,181,200,.15);}
        .abt-body{padding-top:.5rem;}
        .why-l{margin-top:2rem;display:flex;flex-direction:column;gap:1.5rem;}
        .why-i{display:flex;gap:1rem;align-items:flex-start;}
        .why-ico{width:36px;height:36px;border:1px solid var(--bdr);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--gold);}
        .why-t{font-size:.88rem;font-weight:700;color:var(--white);margin-bottom:.3rem;}
        .why-d{font-size:.82rem;color:var(--txt);line-height:1.7;}

        /* PROCESS */
        .proc{background:var(--dark);}
        .proc-g{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--bdr);border:1px solid var(--bdr);margin-top:3rem;}
        .proc-card{background:var(--dark);padding:2rem 1.4rem;position:relative;overflow:hidden;transition:background var(--t);}
        .proc-card:hover{background:var(--dark2);}
        .proc-num{font-size:2.5rem;font-weight:700;color:rgba(201,168,76,.12);font-family:Georgia,serif;line-height:1;margin-bottom:.8rem;}
        .proc-t{font-size:.88rem;font-weight:700;color:var(--white);margin-bottom:.6rem;font-family:Georgia,serif;}
        .proc-d{font-size:.8rem;color:var(--txt);line-height:1.7;}
        .proc-line{position:absolute;bottom:0;left:0;width:0;height:2px;background:linear-gradient(to right,var(--gold),var(--teal));transition:width .5s ease;}
        .proc-card:hover .proc-line{width:100%;}

        /* PROJECTS */
        .prj{background:var(--dark2);}
        .prj-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3rem;}
        .prj-g{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
        .prj-card{background:var(--dark3);border:1px solid var(--bdr-lt);overflow:hidden;transition:all var(--t);}
        .prj-card:hover{border-color:var(--gold-dk);transform:translateY(-5px);box-shadow:0 18px 44px rgba(0,0,0,.4);}
        .prj-thumb{width:100%;aspect-ratio:16/10;background:var(--dark);border-bottom:1px solid var(--bdr-lt);display:flex;align-items:center;justify-content:center;position:relative;}
        .prj-lbl{position:absolute;bottom:.7rem;left:.7rem;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,190,170,.25);}
        .prj-body{padding:1.4rem;}
        .prj-tag{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--teal);margin-bottom:.4rem;}
        .prj-name{font-size:.9rem;font-weight:700;color:var(--white);margin-bottom:.4rem;line-height:1.3;font-family:Georgia,serif;}
        .prj-val{font-size:.78rem;color:var(--gold);font-weight:600;margin-bottom:.5rem;}
        .prj-desc{font-size:.78rem;color:var(--txt);line-height:1.65;}

        /* CTA */
        .cta{position:relative;overflow:hidden;padding:6rem 1.5rem;text-align:center;background:var(--black);}
        #cta-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;}
        .cta-inner{position:relative;z-index:2;}
        .cta h2{font-size:clamp(1.5rem,2.8vw,2.2rem);font-weight:700;color:var(--white);margin-bottom:.9rem;font-family:Georgia,serif;}
        .cta p{color:var(--warm);font-size:.9rem;font-weight:300;max-width:440px;margin:0 auto 2.2rem;line-height:1.75;}

        /* CONTACT */
        .cnt{background:var(--dark2);}
        .cnt-g{display:grid;grid-template-columns:1fr 1.5fr;gap:5rem;}
        .cdet{display:flex;gap:1rem;align-items:flex-start;margin-bottom:1.8rem;}
        .cico{width:42px;height:42px;flex-shrink:0;border:1px solid var(--bdr);display:flex;align-items:center;justify-content:center;color:var(--gold);}
        .clbl{font-size:.63rem;letter-spacing:.2em;text-transform:uppercase;color:var(--teal);margin-bottom:.25rem;}
        .cval{font-size:.9rem;color:var(--white);}
        .cnt-note{background:var(--dark3);border:1px solid var(--bdr-lt);padding:1.2rem 1.4rem;margin-top:2rem;border-left:3px solid var(--gold);}
        .cnt-note p{font-size:.83rem;color:var(--txt);line-height:1.7;}
        .frow{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        .fg{display:flex;flex-direction:column;gap:.35rem;margin-bottom:1rem;}
        .fg label{font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);}
        .fg input,.fg textarea,.fg select{background:var(--dark3);border:1px solid var(--bdr-lt);color:var(--white);padding:.75rem 1rem;font-size:.9rem;font-family:inherit;outline:none;transition:border-color var(--t);border-radius:var(--r);resize:none;}
        .fg input::placeholder,.fg textarea::placeholder{color:rgba(168,160,144,.4);}
        .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--gold);}
        .fg select option{background:var(--dark3);}

        /* FOOTER */
        .ftr{background:var(--black);border-top:1px solid var(--bdr);padding:4rem 1.5rem 1.8rem;}
        .ftr-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid var(--bdr-lt);margin-bottom:1.8rem;}
        .fbrand p{font-size:.84rem;color:var(--muted);line-height:1.75;margin-top:1rem;max-width:270px;}
        .fsocial{display:flex;gap:.8rem;margin-top:1.4rem;}
        .fsoc{width:34px;height:34px;border:1px solid var(--bdr-lt);display:flex;align-items:center;justify-content:center;color:var(--muted);transition:all var(--t);cursor:pointer;text-decoration:none;}
        .fsoc:hover{border-color:var(--gold);color:var(--gold);}
        .fcol h4{font-size:.67rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:1.2rem;font-weight:600;}
        .fcol ul{list-style:none;}.fcol li{margin-bottom:.65rem;}
        .fcol a{color:var(--muted);text-decoration:none;font-size:.83rem;transition:color var(--t);}
        .fcol a:hover{color:var(--gold);}
        .fbot{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;}
        .fbot p{font-size:.72rem;color:rgba(168,160,144,.4);}

        /* RESPONSIVE */
        @media(max-width:1024px){
          .nav{padding:1rem 2rem;}.nav.up{padding:.65rem 2rem;}
          .svc-grid{grid-template-columns:repeat(2,1fr);}
          .abt-g{grid-template-columns:1fr;gap:3rem;}
          .proc-g{grid-template-columns:repeat(3,1fr);}
          .cnt-g{grid-template-columns:1fr;gap:3rem;}
          .ftr-g{grid-template-columns:1fr 1fr;}
          .prj-g{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:768px){
          .nav{padding:.9rem 1.2rem;}.nav.up{padding:.6rem 1.2rem;}
          .nav-links,.btn-q{display:none;}.burger{display:flex;}
          .stats-g{grid-template-columns:repeat(2,1fr);}
          .stat:nth-child(2)::after{display:none;}
          .svc-grid,.prj-g,.proc-g{grid-template-columns:1fr;}
          .frow{grid-template-columns:1fr;}
          .ftr-g{grid-template-columns:1fr;gap:2rem;}
          section{padding:5rem 1.2rem;}
          .svc-head,.prj-head{flex-direction:column;align-items:flex-start;}
        }
        @media(max-width:480px){
          .stats-g{grid-template-columns:repeat(2,1fr);gap:1rem;}
          .stat::after{display:none!important;}
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled?'up':''}`}>
        <div className="nav-logo" onClick={()=>go('#home')}>
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={100} height={100} style={{objectFit:'contain'}} priority/>
        </div>
        <ul className="nav-links">
          {NAV.map(l=>(<li key={l.label}><a href={l.href} onClick={e=>{e.preventDefault();go(l.href);}}>{l.label}</a></li>))}
        </ul>
        <button className="btn-q" onClick={()=>go('#contact')}>Get a Quote</button>
        <button className="burger" onClick={()=>setMenuOpen(true)}><span/><span/><span/></button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob ${menuOpen?'on':''}`}>
        <button className="mob-x" onClick={()=>setMenuOpen(false)}><Icon d={ICONS.close} size={28}/></button>
        {NAV.map(l=>(<a key={l.label} href={l.href} onClick={e=>{e.preventDefault();go(l.href);}}>{l.label}</a>))}
        <button className="btn-p" onClick={()=>{go('#contact');setMenuOpen(false);}}>Get a Quote</button>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <canvas id="hero-canvas"/>
        <div className="hero-box">
          <div className="badge"><span className="dot"/>Quantity Surveyor &amp; Cost Consultant — UAE</div>
          <h1 className="hero-h">
            {[{t:'Precision',c:'',d:.3},{t:'in',c:'',d:.42},{t:'Every',c:'',d:.54},{t:'|',c:'br',d:0},
              {t:'Cost.',c:'cg',d:.66},{t:'Clarity',c:'',d:.78},{t:'in',c:'',d:.9},{t:'Every',c:'',d:1.02},{t:'|',c:'br',d:0},
              {t:'Contract.',c:'ct',d:1.14}
            ].map((w,i)=>w.c==='br'?<br key={i}/>:<span key={i} className={`hw ${w.c}`} style={{animationDelay:`${w.d}s`}}>{w.t}&nbsp;</span>)}
          </h1>
          <p className="hero-p">Delivering expert quantity surveying and cost management services across the UAE and GCC. We protect your investment — from initial concept through to final account.</p>
          <div className="hero-btns">
            <button className="btn-p" onClick={()=>go('#contact')}>Free Consultation&nbsp;<Icon d={ICONS.arrow} size={15}/></button>
            <button className="btn-o" onClick={()=>go('#services')}>Our Services&nbsp;<Icon d={ICONS.chevdown} size={15}/></button>
          </div>
        </div>
        <div className="scroll-hint"><span>Scroll</span><div className="scroll-bar"/></div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stats-g">
          {STATS.map((s,i)=>(<div key={s.label} className={`stat rv d${i+1}`}><div className="stat-ico"><Icon d={ICONS[s.icon]} size={20}/></div><div className="stat-v">{s.value}</div><div className="stat-l">{s.label}</div></div>))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="svc-sec">
        <div className="wrap">
          <div className="svc-head">
            <div className="rv">
              <div className="slabel">What We Do</div>
              <h2 className="stitle">Our <span style={{color:'var(--gold)'}}>Services</span></h2>
              <div className="sline"/>
            </div>
            <p className="sdesc rv d2">From early-stage budgeting to final account — we provide the full range of QS services your project needs.</p>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s,i)=>(<div key={s.title} className={`svc-card rv d${(i%3)+1}`}><div className="svc-ico"><Icon d={ICONS[s.icon]} size={20}/></div><div className="svc-t">{s.title}</div><div className="svc-d">{s.desc}</div><div className="svc-a">Learn More&nbsp;<Icon d={ICONS.arrow} size={12}/></div></div>))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="abt">
        <div className="wrap">
          <div className="abt-g">
            <div className="abt-wrap rv-l">
              <div className="c-tl"/><div className="abt-box"><div className="abt-ph"><Icon d={ICONS.building} size={52}/><p>Project Image</p></div></div><div className="c-br"/>
            </div>
            <div className="abt-body rv-r">
              <div className="slabel">Who We Are</div>
              <h2 className="stitle">About <span style={{color:'var(--gold)'}}>Saif Elite QS</span></h2>
              <div className="sline"/>
              <p className="sdesc">Saif Elite QS is a specialist quantity surveying and cost consultancy practice based in Dubai, serving clients across the UAE and wider GCC region. We bring rigorous commercial discipline to every project — whether a boutique residential development or a landmark commercial scheme.</p>
              <p className="sdesc" style={{marginTop:'1rem'}}>Founded on the principles of transparency, accuracy and client-first service, our team of qualified surveyors delivers measurable value at every stage of the construction process. We work closely with developers, contractors, architects and project managers to ensure that cost is always controlled, risk is always understood, and decisions are always informed.</p>
              <div className="why-l">
                {WHY.map(w=>(<div key={w.title} className="why-i"><div className="why-ico"><Icon d={ICONS[w.icon]} size={17}/></div><div><div className="why-t">{w.title}</div><div className="why-d">{w.desc}</div></div></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="proc">
        <div className="wrap">
          <div className="rv">
            <div className="slabel">How We Work</div>
            <h2 className="stitle">Our <span style={{color:'var(--gold)'}}>Process</span></h2>
            <div className="sline"/>
            <p className="sdesc">A structured, transparent approach that keeps your project on budget and on programme from day one through to final account.</p>
          </div>
          <div className="proc-g">
            {PROCESS.map((p,i)=>(<div key={p.num} className={`proc-card rv d${i+1}`}><div className="proc-num">{p.num}</div><div className="proc-t">{p.title}</div><div className="proc-d">{p.desc}</div><div className="proc-line"/></div>))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="prj">
        <div className="wrap">
          <div className="prj-head">
            <div className="rv"><div className="slabel">Our Work</div><h2 className="stitle">Featured <span style={{color:'var(--gold)'}}>Projects</span></h2><div className="sline"/></div>
            <button className="btn-o rv d2" style={{fontSize:'.75rem'}}>View All&nbsp;<Icon d={ICONS.arrow} size={13}/></button>
          </div>
          <div className="prj-g">
            {PROJECTS.map((p,i)=>(<div key={p.name} className={`prj-card rv d${(i%3)+1}`}><div className="prj-thumb"><div style={{color:'rgba(201,168,76,.12)'}}><Icon d={ICONS.building} size={40}/></div><span className="prj-lbl">Project Image</span></div><div className="prj-body"><div className="prj-tag">{p.tag}</div><div className="prj-name">{p.name}</div><div className="prj-val">{p.value}</div><div className="prj-desc">{p.desc}</div></div></div>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta">
        <canvas id="cta-canvas"/>
        <div className="cta-inner rv">
          <h2>Ready to Start Your Project?</h2>
          <p>Let us provide the cost certainty your project deserves — from day one to final account. Get in touch today for a free initial consultation.</p>
          <button className="btn-p" onClick={()=>go('#contact')}>Request a Consultation&nbsp;<Icon d={ICONS.arrow} size={15}/></button>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="cnt">
        <div className="wrap">
          <div className="slabel rv">Get in Touch</div>
          <h2 className="stitle rv d1">Contact <span style={{color:'var(--gold)'}}>Us</span></h2>
          <div className="sline rv d2"/>
          <div className="cnt-g" style={{marginTop:'3rem'}}>
            <div className="rv-l">
              <p className="sdesc" style={{marginBottom:'2rem'}}>Have a project in mind? Reach out and one of our senior consultants will respond within 24 hours with a no-obligation discussion of how we can help.</p>
              {CONTACTS.map(c=>(<div key={c.label} className="cdet"><div className="cico"><Icon d={ICONS[c.icon]} size={17}/></div><div><div className="clbl">{c.label}</div><div className="cval">{c.value}</div></div></div>))}
              <div className="cnt-note"><p><strong style={{color:'var(--gold)'}}>Response Guarantee:</strong> We respond to every enquiry within one business day. For urgent project needs, please call us directly.</p></div>
            </div>
            <div className="rv-r d2">
              <div className="frow">
                <div className="fg"><label>First Name</label><input type="text" placeholder="John" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})}/></div>
                <div className="fg"><label>Last Name</label><input type="text" placeholder="Smith" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})}/></div>
              </div>
              <div className="fg"><label>Email Address</label><input type="email" placeholder="john@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              <div className="fg"><label>Service Required</label>
                <select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>
                  <option value="">Select a service...</option>
                  {SERVICES.map(s=><option key={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div className="fg"><label>Project Details</label><textarea rows={5} placeholder="Tell us about your project — location, approximate value, programme and any specific requirements..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></div>
              <button className="btn-p btn-full">Send Enquiry&nbsp;<Icon d={ICONS.send} size={14}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ftr">
        <div className="ftr-g">
          <div className="fbrand">
            <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={80} height={80} style={{objectFit:'contain'}}/>
            <p>Professional Quantity Surveying and Cost Consultancy across the UAE and GCC. Trusted by developers, contractors, and investors to deliver commercial clarity on every project.</p>
            <div className="fsocial">{['linkedin','facebook','instagram'].map(k=>(<a key={k} href="#" className="fsoc" aria-label={k}><Icon d={ICONS[k]} size={15}/></a>))}</div>
          </div>
          <div className="fcol"><h4>Services</h4><ul>{SERVICES.map(s=>(<li key={s.title}><a href="#services" onClick={e=>{e.preventDefault();go('#services');}}>{s.title}</a></li>))}</ul></div>
          <div className="fcol"><h4>Company</h4><ul>{[['About Us','#about'],['Our Process','#process'],['Projects','#projects'],['Contact','#contact']].map(([t,h])=>(<li key={t}><a href={h} onClick={e=>{e.preventDefault();go(h);}}>{t}</a></li>))}</ul></div>
          <div className="fcol"><h4>Connect</h4><ul><li><a href="#">LinkedIn</a></li><li><a href="#">WhatsApp</a></li><li><a href="mailto:info@saifeliteqs.com">Email Us</a></li><li><a href="tel:+971000000000">Call Us</a></li></ul></div>
        </div>
        <div className="fbot">
          <p>© 2025 <span style={{color:'var(--gold)'}}>Saif Elite QS</span>. All rights reserved.</p>
          <p>Quantity Surveyor &amp; Cost Consultant — Dubai, UAE</p>
        </div>
      </footer>
    </>
  );
}
