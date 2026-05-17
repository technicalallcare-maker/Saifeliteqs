'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/* ─── INLINE SVG ICONS ─────────────────────────── */
const Icon = ({ d, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  ruler: 'M2 20h20M6 20V8l4-4h8v16M10 8h4M10 12h4M10 16h4',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  clipboard:
    'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2m-6 9l2 2 4-4',
  chart: 'M18 20V10M12 20V4M6 20v-6',
  scale: 'M12 3v18M3 6l9-3 9 3M5 10a7 7 0 0 0 14 0',
  trending: 'M22 7l-8.5 8.5-5-5L2 17M16 7h6v6',
  check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
  phone:
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  mappin:
    'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  globe:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  award:
    'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89 7 23l5-3 5 3-1.21-9.12',
  building:
    'M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16',
  menu: 'M3 12h18M3 6h18M3 18h18',
  close: 'M18 6 6 18M6 6l12 12',
  arrow: 'M5 12h14M12 5l7 7-7 7',
  chevdown: 'M6 9l6 6 6-6',
  send: 'M22 2 11 13M22 2 15 22 11 13 2 9l20-7z',
  linkedin:
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  instagram:
    'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
};

/* ─── DATA ─────────────────────────────────────── */
const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    icon: 'ruler',
    title: 'Cost Planning & Estimation',
    desc: 'Accurate pre-contract cost plans and detailed estimates at every design stage — from feasibility through tender.',
  },
  {
    icon: 'file',
    title: 'Bill of Quantities',
    desc: 'Precisely measured and prepared Bills of Quantities in accordance with standard methods of measurement.',
  },
  {
    icon: 'clipboard',
    title: 'Contract Administration',
    desc: 'Expert contract management, progress valuations, variation assessments, and final account settlements.',
  },
  {
    icon: 'chart',
    title: 'Project Cost Management',
    desc: 'End-to-end cost monitoring and control throughout the construction lifecycle to protect your budget.',
  },
  {
    icon: 'scale',
    title: 'Dispute Resolution',
    desc: 'Professional claims preparation, review, and quantum support for contractual disputes and adjudications.',
  },
  {
    icon: 'trending',
    title: 'Feasibility Studies',
    desc: 'Robust financial viability assessments and investment appraisals to support sound decision-making.',
  },
];

const STATS = [
  { icon: 'clock', value: '10+', label: 'Years Experience' },
  { icon: 'building', value: '200+', label: 'Projects Delivered' },
  { icon: 'star', value: '98%', label: 'Client Satisfaction' },
  { icon: 'award', value: 'AED 2B+', label: 'Projects Valued' },
];

const WHY = [
  {
    title: 'RICS Aligned Standards',
    desc: 'All services follow internationally recognised best practices and measurement standards.',
  },
  {
    title: 'Transparent Reporting',
    desc: 'Clear, concise cost reports delivered on time — no surprises at final account.',
  },
  {
    title: 'Local Market Expertise',
    desc: 'Deep knowledge of UAE and GCC construction markets, rates, and procurement routes.',
  },
  {
    title: 'Technology Driven',
    desc: 'Latest QS software and BIM integration for speed and accuracy.',
  },
];

const PROJECTS = [
  {
    tag: 'Residential',
    name: 'Luxury Villa Complex — Dubai Hills',
    value: 'AED 45M',
  },
  { tag: 'Commercial', name: 'Grade A Office Tower — DIFC', value: 'AED 280M' },
  {
    tag: 'Mixed-Use',
    name: 'Retail & Hospitality Development — JBR',
    value: 'AED 120M',
  },
  {
    tag: 'Infrastructure',
    name: 'Road & Utilities Package — Abu Dhabi',
    value: 'AED 90M',
  },
  {
    tag: 'Residential',
    name: 'High-Rise Apartment Tower — Business Bay',
    value: 'AED 175M',
  },
  {
    tag: 'Healthcare',
    name: 'Medical Centre Fit-out — Jumeirah',
    value: 'AED 32M',
  },
];

const CONTACTS = [
  { icon: 'mappin', label: 'Office', value: 'Dubai, United Arab Emirates' },
  { icon: 'phone', label: 'Phone', value: '+971 XX XXX XXXX' },
  { icon: 'mail', label: 'Email', value: 'info@saifeliteqs.com' },
  { icon: 'globe', label: 'Website', value: 'www.saifeliteqs.com' },
];

/* ─── MAIN COMPONENT ───────────────────────────── */
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf,
      t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 3D projection helper
    const project = (x, y, z, cx, cy) => {
      const fov = 500;
      const f = fov / (fov + z);
      return { x: cx + x * f, y: cy + y * f, f, z };
    };

    // Rotate point around Y and X axes
    const rotY = (x, y, z, a) => ({
      x: x * Math.cos(a) + z * Math.sin(a),
      y,
      z: -x * Math.sin(a) + z * Math.cos(a),
    });
    const rotX = (x, y, z, a) => ({
      x,
      y: y * Math.cos(a) - z * Math.sin(a),
      z: y * Math.sin(a) + z * Math.cos(a),
    });

    // Build icosahedron vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoVerts = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ].map(([x, y, z]) => {
      const l = Math.sqrt(x * x + y * y + z * z);
      return [x / l, y / l, z / l];
    });

    const icoEdges = [
      [0, 1],
      [0, 5],
      [0, 7],
      [0, 10],
      [0, 11],
      [1, 5],
      [1, 7],
      [1, 8],
      [1, 9],
      [2, 3],
      [2, 4],
      [2, 6],
      [2, 10],
      [2, 11],
      [3, 4],
      [3, 6],
      [3, 8],
      [3, 9],
      [4, 5],
      [4, 9],
      [4, 11],
      [5, 9],
      [5, 11],
      [6, 7],
      [6, 8],
      [6, 10],
      [7, 8],
      [7, 10],
      [8, 9],
      [10, 11],
    ];

    // Floating particles
    const PARTS = Array.from({ length: 60 }, () => ({
      x: (Math.random() - 0.5) * canvas.width * 1.6,
      y: (Math.random() - 0.5) * canvas.height * 1.6,
      z: Math.random() * 600 - 300,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.5,
      gold: Math.random() > 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Second smaller wireframe cube
    const cubeV = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];
    const cubeE = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];

    const draw = () => {
      const W = canvas.width,
        H = canvas.height;
      const cx = W / 2,
        cy = H / 2;
      t += 0.005;

      ctx.clearRect(0, 0, W, H);

      // Background radial glow
      const grd = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(W, H) * 0.7
      );
      grd.addColorStop(0, 'rgba(201,168,76,0.04)');
      grd.addColorStop(0.5, 'rgba(43,181,200,0.02)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // ── MAIN ICOSAHEDRON (left-center) ──
      const iR = Math.min(W, H) * 0.22;
      const iOx = cx - W * 0.18,
        iOy = cy + H * 0.04;
      const iPts = icoVerts.map(([x, y, z]) => {
        let p = rotY(x * iR, y * iR, z * iR, t * 0.7);
        p = rotX(p.x, p.y, p.z, t * 0.4);
        return project(p.x, p.y, p.z, iOx, iOy);
      });

      // Draw ico edges
      icoEdges.forEach(([a, b]) => {
        const pa = iPts[a],
          pb = iPts[b];
        const depth = (pa.f + pb.f) / 2;
        const alpha = 0.12 + depth * 0.35;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Glow at ico center
      const iGlow = ctx.createRadialGradient(iOx, iOy, 0, iOx, iOy, iR * 0.6);
      iGlow.addColorStop(0, 'rgba(201,168,76,0.08)');
      iGlow.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.fillStyle = iGlow;
      ctx.beginPath();
      ctx.arc(iOx, iOy, iR * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // ── CUBE (right side) ──
      const cR = Math.min(W, H) * 0.14;
      const cOx = cx + W * 0.22,
        cOy = cy - H * 0.05;
      const cPts = cubeV.map(([x, y, z]) => {
        let p = rotY(x * cR, y * cR, z * cR, -t * 0.5);
        p = rotX(p.x, p.y, p.z, t * 0.3);
        return project(p.x, p.y, p.z, cOx, cOy);
      });

      cubeE.forEach(([a, b]) => {
        const pa = cPts[a],
          pb = cPts[b];
        const depth = (pa.f + pb.f) / 2;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(43,181,200,${0.1 + depth * 0.3})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // ── RING / TORUS approximation ──
      const rR = Math.min(W, H) * 0.16;
      const rOx = cx + W * 0.06,
        rOy = cy + H * 0.28;
      const RSEG = 40;
      ctx.beginPath();
      for (let i = 0; i <= RSEG; i++) {
        const angle = (i / RSEG) * Math.PI * 2 + t * 0.6;
        const tiltX = Math.sin(t * 0.3) * 0.5;
        const rx = Math.cos(angle) * rR;
        const ry = Math.sin(angle) * rR * Math.cos(tiltX);
        const rz = Math.sin(angle) * rR * Math.sin(tiltX) * 0.5;
        const p = project(rx, ry, rz, rOx, rOy);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(43,181,200,0.18)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      for (let i = 0; i <= RSEG; i++) {
        const angle = (i / RSEG) * Math.PI * 2 - t * 0.4;
        const tiltX = Math.sin(t * 0.25) * 0.4;
        const r2 = rR * 0.55;
        const rx = Math.cos(angle) * r2;
        const ry = Math.sin(angle) * r2 * Math.cos(tiltX);
        const rz = Math.sin(angle) * r2 * Math.sin(tiltX) * 0.5;
        const p = project(rx, ry, rz, rOx, rOy);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(201,168,76,0.14)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // ── CONNECTING LINES between shapes ──
      [
        [iOx, iOy, cOx, cOy, 'rgba(201,168,76,0.06)'],
        [cOx, cOy, rOx, rOy, 'rgba(43,181,200,0.05)'],
      ].forEach(([x1, y1, x2, y2, col]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = col;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ── PARTICLES ──
      PARTS.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        const hw = W * 0.8,
          hh = H * 0.8;
        if (Math.abs(p.x) > hw) p.vx *= -1;
        if (Math.abs(p.y) > hh) p.vy *= -1;
        if (Math.abs(p.z) > 300) p.vz *= -1;
        p.pulse += 0.03;

        const pp = project(p.x, p.y, p.z, cx, cy);
        const alpha = pp.f * (0.5 + 0.3 * Math.sin(p.pulse));
        const radius = pp.f * p.r;

        if (p.gold) {
          const g = ctx.createRadialGradient(
            pp.x,
            pp.y,
            0,
            pp.x,
            pp.y,
            radius * 4
          );
          g.addColorStop(0, `rgba(201,168,76,${alpha * 0.9})`);
          g.addColorStop(1, 'rgba(201,168,76,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, radius * 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const g = ctx.createRadialGradient(
            pp.x,
            pp.y,
            0,
            pp.x,
            pp.y,
            radius * 3
          );
          g.addColorStop(0, `rgba(43,181,200,${alpha * 0.8})`);
          g.addColorStop(1, 'rgba(43,181,200,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(pp.x, pp.y, Math.max(0.3, radius), 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(201,168,76,${alpha})`
          : `rgba(43,181,200,${alpha})`;
        ctx.fill();
      });

      // Particle connections
      for (let i = 0; i < PARTS.length; i++) {
        const a = project(PARTS[i].x, PARTS[i].y, PARTS[i].z, cx, cy);
        for (let j = i + 1; j < PARTS.length; j++) {
          const b = project(PARTS[j].x, PARTS[j].y, PARTS[j].z, cx, cy);
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15 * Math.min(a.f, b.f);
            const isG = PARTS[i].gold || PARTS[j].gold;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isG
              ? `rgba(201,168,76,${alpha})`
              : `rgba(43,181,200,${alpha * 0.7})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }

        :root {
          --gold:        #c9a84c;
          --gold-lt:     #e2c06a;
          --gold-dk:     #9a7a2e;
          --teal:        #2bb5c8;
          --teal-lt:     #56cfe1;
          --black:       #0f0f0f;
          --dark:        #161616;
          --dark2:       #1e1e1e;
          --dark3:       #272727;
          --warm:        #faf8f5;
          --txt:         #e8e2d8;
          --muted:       #a09888;
          --bdr:         rgba(201,168,76,0.18);
          --bdr-lt:      rgba(201,168,76,0.10);
          --r:           4px;
          --t:           0.3s ease;
        }

        body {
          background:var(--dark); color:var(--txt);
          font-family:system-ui,-apple-system,sans-serif;
          line-height:1.65; overflow-x:hidden;
        }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:var(--black)}
        ::-webkit-scrollbar-thumb{background:var(--gold-dk);border-radius:3px}

        /* NAV */
        .nav {
          position:fixed;top:0;left:0;right:0;z-index:1000;
          display:flex;align-items:center;justify-content:space-between;
          padding:1rem 4rem; transition:all 0.4s;
        }
        .nav.up {
          background:rgba(15,15,15,0.96);
          backdrop-filter:blur(12px);
          border-bottom:1px solid var(--bdr);
          padding:0.65rem 4rem;
        }
        .nav-logo{display:flex;align-items:center;cursor:pointer;}
        .nav-links{display:flex;align-items:center;gap:2.5rem;list-style:none;}
        .nav-links a {
          color:var(--muted);text-decoration:none;
          font-size:0.78rem;font-weight:500;
          letter-spacing:0.14em;text-transform:uppercase;
          transition:color var(--t);position:relative;
        }
        .nav-links a::after{
          content:'';position:absolute;bottom:-3px;left:0;
          width:0;height:1px;background:var(--gold);transition:width var(--t);
        }
        .nav-links a:hover{color:var(--gold);}
        .nav-links a:hover::after{width:100%;}
        .btn-q {
          background:transparent;border:1px solid var(--gold);
          color:var(--gold);padding:0.5rem 1.4rem;
          font-size:0.75rem;font-weight:600;letter-spacing:0.12em;
          text-transform:uppercase;cursor:pointer;border-radius:var(--r);
          font-family:inherit;transition:all var(--t);
        }
        .btn-q:hover{background:var(--gold);color:var(--black);}
        .burger{
          display:none;background:none;border:none;cursor:pointer;
          flex-direction:column;gap:5px;padding:4px;
        }
        .burger span{display:block;width:24px;height:1.5px;background:var(--gold);}

        /* MOBILE MENU */
        .mob{
          display:none;position:fixed;inset:0;z-index:999;
          background:rgba(15,15,15,0.98);
          flex-direction:column;align-items:center;justify-content:center;gap:2rem;
        }
        .mob.on{display:flex;}
        .mob-x{
          position:absolute;top:1.2rem;right:1.5rem;
          background:none;border:none;color:var(--muted);cursor:pointer;
          display:flex;align-items:center;justify-content:center;
        }
        .mob a{
          color:var(--txt);text-decoration:none;
          font-size:1.5rem;font-weight:500;
          letter-spacing:0.06em;text-transform:uppercase;transition:color var(--t);
        }
        .mob a:hover{color:var(--gold);}

        /* BUTTONS */
        .btn-p {
          display:inline-flex;align-items:center;gap:0.5rem;
          background:linear-gradient(135deg,var(--gold-lt),var(--gold-dk));
          color:var(--black);padding:0.85rem 2.2rem;
          font-size:0.8rem;font-weight:600;letter-spacing:0.1em;
          text-transform:uppercase;border:none;border-radius:var(--r);
          cursor:pointer;font-family:inherit;transition:all var(--t);
        }
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(201,168,76,0.25);}
        .btn-o {
          display:inline-flex;align-items:center;gap:0.5rem;
          background:transparent;color:var(--txt);
          padding:0.85rem 2.2rem;font-size:0.8rem;font-weight:500;
          letter-spacing:0.1em;text-transform:uppercase;
          border:1px solid rgba(232,226,216,0.2);border-radius:var(--r);
          cursor:pointer;font-family:inherit;transition:all var(--t);
        }
        .btn-o:hover{border-color:var(--teal);color:var(--teal-lt);}
        .btn-full{width:100%;padding:0.95rem;justify-content:center;}

        /* HERO */
        .hero{
          height:100vh;min-height:600px;
          display:flex;align-items:center;justify-content:center;
          position:relative;overflow:hidden;background:var(--black);
        }
        #hero-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;}
        .hero-box{
          position:relative;z-index:2;text-align:center;
          padding:0 1.5rem;max-width:820px;width:100%;
        }
        .badge{
          display:inline-flex;align-items:center;gap:0.6rem;
          border:1px solid rgba(43,181,200,0.3);background:rgba(43,181,200,0.07);
          padding:0.3rem 1rem;font-size:0.63rem;letter-spacing:0.2em;
          text-transform:uppercase;color:var(--teal-lt);border-radius:2px;
          margin-bottom:1.2rem;animation:fu 0.9s 0.1s both;
        }
        .dot{width:5px;height:5px;border-radius:50%;background:var(--teal);animation:pulse 2.5s infinite;}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(0.75);}}
        .hero-h{
          font-size:clamp(1.5rem,3.2vw,2.4rem);font-weight:700;
          line-height:1.2;color:var(--warm);
          margin-bottom:0.9rem;animation:fu 0.9s 0.25s both;font-family:Georgia,serif;
        }
        .cg{color:var(--gold);}
        .ct{color:var(--teal-lt);}
        .hero-p{
          font-size:0.86rem;color:var(--muted);
          max-width:460px;margin:0 auto 1.8rem;font-weight:300;line-height:1.7;
          animation:fu 0.9s 0.4s both;
        }
        .hero-btns{display:flex;gap:0.9rem;justify-content:center;flex-wrap:wrap;animation:fu 0.9s 0.55s both;}
        .scroll-hint{
          position:absolute;bottom:1.2rem;left:50%;transform:translateX(-50%);
          display:flex;flex-direction:column;align-items:center;gap:0.3rem;
          animation:fu 0.9s 1s both;
        }
        .scroll-hint span{font-size:0.56rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(160,152,136,0.4);}
        .scroll-bar{
          width:1px;height:32px;background:linear-gradient(to bottom,var(--gold),transparent);
          animation:sb 2.2s ease-in-out infinite;
        }
        @keyframes sb{
          0%{transform:scaleY(0);transform-origin:top;}45%{transform:scaleY(1);transform-origin:top;}
          55%{transform:scaleY(1);transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}
        }
        @keyframes fu{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}

        /* STATS */
        .stats{
          background:var(--dark2);
          border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);
          padding:2.8rem 1.5rem;
        }
        .stats-g{
          max-width:1100px;margin:0 auto;
          display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;text-align:center;
        }
        .stat{position:relative;}
        .stat:not(:last-child)::after{
          content:'';position:absolute;right:0;top:15%;
          height:70%;width:1px;background:var(--bdr);
        }
        .stat-ico{display:flex;align-items:center;justify-content:center;margin-bottom:0.6rem;color:var(--gold);}
        .stat-v{font-size:1.8rem;font-weight:700;color:var(--gold);line-height:1;margin-bottom:0.3rem;font-family:Georgia,serif;}
        .stat-l{font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);}

        /* SECTION */
        section{padding:7rem 1.5rem;}
        .wrap{max-width:1100px;margin:0 auto;}
        .slabel{font-size:0.65rem;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:var(--teal);margin-bottom:0.6rem;}
        .stitle{font-size:clamp(1.4rem,2.5vw,2rem);font-weight:700;color:var(--warm);line-height:1.2;margin-bottom:0.8rem;font-family:Georgia,serif;}
        .sline{width:40px;height:2px;background:linear-gradient(to right,var(--gold),var(--teal));margin-bottom:1rem;}
        .sdesc{color:var(--muted);font-size:0.88rem;font-weight:300;line-height:1.75;max-width:500px;}

        /* SERVICES */
        .svc-sec{background:var(--dark);}
        .svc-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem;margin-bottom:3.5rem;}
        .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bdr);border:1px solid var(--bdr);}
        .svc-card{
          background:var(--dark);padding:2.2rem 1.8rem;
          position:relative;overflow:hidden;transition:background var(--t);
        }
        .svc-card::before{
          content:'';position:absolute;top:0;left:0;
          width:2px;height:0;background:linear-gradient(to bottom,var(--gold),var(--teal));
          transition:height 0.4s ease;
        }
        .svc-card:hover{background:var(--dark2);}
        .svc-card:hover::before{height:100%;}
        .svc-ico{
          width:44px;height:44px;border:1px solid var(--bdr);
          display:flex;align-items:center;justify-content:center;
          margin-bottom:1.2rem;color:var(--gold);transition:all var(--t);
        }
        .svc-card:hover .svc-ico{border-color:var(--gold);background:rgba(201,168,76,0.08);}
        .svc-t{font-size:0.95rem;font-weight:700;color:var(--warm);margin-bottom:0.6rem;font-family:Georgia,serif;}
        .svc-d{font-size:0.82rem;color:var(--muted);line-height:1.7;}
        .svc-a{
          display:inline-flex;align-items:center;gap:0.3rem;
          margin-top:1.3rem;font-size:0.72rem;letter-spacing:0.14em;
          text-transform:uppercase;color:var(--gold);opacity:0;transition:opacity var(--t);
        }
        .svc-card:hover .svc-a{opacity:1;}

        /* ABOUT */
        .abt{background:var(--dark2);}
        .abt-g{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
        .abt-wrap{position:relative;}
        .abt-box{
          width:100%;aspect-ratio:4/3;background:var(--dark3);
          border:1px solid var(--bdr);
          display:flex;align-items:center;justify-content:center;overflow:hidden;
        }
        .abt-ph{text-align:center;color:var(--muted);}
        .abt-ph p{font-size:0.75rem;letter-spacing:0.18em;text-transform:uppercase;opacity:0.4;margin-top:0.5rem;}
        .c-br{position:absolute;bottom:-1.2rem;right:-1.2rem;width:150px;height:150px;border:1px solid var(--bdr-lt);z-index:-1;}
        .c-tl{position:absolute;top:-1.2rem;left:-1.2rem;width:70px;height:70px;border:1px solid rgba(43,181,200,0.15);}
        .why-l{margin-top:2.2rem;display:flex;flex-direction:column;gap:1.3rem;}
        .why-i{display:flex;gap:0.9rem;align-items:flex-start;}
        .why-chk{color:var(--gold);flex-shrink:0;margin-top:2px;}
        .why-t{font-size:0.85rem;font-weight:600;color:var(--warm);margin-bottom:0.2rem;}
        .why-d{font-size:0.8rem;color:var(--muted);line-height:1.65;}

        /* PROJECTS */
        .prj{background:var(--dark);}
        .prj-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3rem;}
        .prj-g{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
        .prj-card{
          background:var(--dark2);border:1px solid var(--bdr-lt);
          overflow:hidden;transition:all var(--t);
        }
        .prj-card:hover{border-color:var(--gold-dk);transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,0.35);}
        .prj-thumb{
          width:100%;aspect-ratio:16/10;background:var(--dark3);
          border-bottom:1px solid var(--bdr-lt);
          display:flex;align-items:center;justify-content:center;position:relative;
        }
        .prj-lbl{
          position:absolute;bottom:0.7rem;left:0.7rem;
          font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(200,190,170,0.25);
        }
        .prj-body{padding:1.4rem;}
        .prj-tag{font-size:0.63rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--teal);margin-bottom:0.45rem;}
        .prj-name{font-size:0.9rem;font-weight:700;color:var(--warm);margin-bottom:0.4rem;line-height:1.3;font-family:Georgia,serif;}
        .prj-val{font-size:0.75rem;color:var(--gold);font-weight:500;}

        /* CTA */
        .cta{
          background:linear-gradient(135deg,var(--dark2),var(--dark3));
          border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);
          padding:6rem 1.5rem;text-align:center;position:relative;overflow:hidden;
        }
        .cta::before{
          content:'';position:absolute;inset:0;
          background:radial-gradient(ellipse 55% 80% at 50% 50%,rgba(201,168,76,0.06),transparent);
        }
        .cta h2{font-size:clamp(1.4rem,2.5vw,2rem);font-weight:700;color:var(--warm);margin-bottom:0.8rem;position:relative;font-family:Georgia,serif;}
        .cta p{color:var(--muted);font-size:0.88rem;font-weight:300;max-width:440px;margin:0 auto 2rem;position:relative;}

        /* CONTACT */
        .cnt{background:var(--dark2);}
        .cnt-g{display:grid;grid-template-columns:1fr 1.5fr;gap:5rem;}
        .cdet{display:flex;gap:1rem;align-items:flex-start;margin-bottom:1.8rem;}
        .cico{width:42px;height:42px;flex-shrink:0;border:1px solid var(--bdr);display:flex;align-items:center;justify-content:center;color:var(--gold);}
        .clbl{font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--teal);margin-bottom:0.25rem;}
        .cval{font-size:0.9rem;color:var(--txt);}
        .frow{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        .fg{display:flex;flex-direction:column;gap:0.35rem;margin-bottom:1rem;}
        .fg label{font-size:0.67rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted);}
        .fg input,.fg textarea,.fg select{
          background:var(--dark3);border:1px solid var(--bdr-lt);
          color:var(--txt);padding:0.75rem 1rem;font-size:0.9rem;
          font-family:inherit;outline:none;transition:border-color var(--t);
          border-radius:var(--r);resize:none;
        }
        .fg input::placeholder,.fg textarea::placeholder{color:rgba(160,152,136,0.4);}
        .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--gold);}
        .fg select option{background:var(--dark3);}

        /* FOOTER */
        .ftr{background:var(--black);border-top:1px solid var(--bdr);padding:4rem 1.5rem 1.8rem;}
        .ftr-g{
          max-width:1100px;margin:0 auto;
          display:grid;grid-template-columns:2fr 1fr 1fr 1fr;
          gap:3rem;padding-bottom:3rem;border-bottom:1px solid var(--bdr-lt);margin-bottom:1.8rem;
        }
        .fbrand p{font-size:0.84rem;color:var(--muted);line-height:1.75;margin-top:1rem;max-width:270px;}
        .fsocial{display:flex;gap:0.8rem;margin-top:1.4rem;}
        .fsoc{
          width:34px;height:34px;border:1px solid var(--bdr-lt);
          display:flex;align-items:center;justify-content:center;
          color:var(--muted);transition:all var(--t);cursor:pointer;text-decoration:none;
        }
        .fsoc:hover{border-color:var(--gold);color:var(--gold);}
        .fcol h4{font-size:0.68rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);margin-bottom:1.2rem;font-weight:600;}
        .fcol ul{list-style:none;}
        .fcol li{margin-bottom:0.65rem;}
        .fcol a{color:var(--muted);text-decoration:none;font-size:0.84rem;transition:color var(--t);}
        .fcol a:hover{color:var(--gold);}
        .fbot{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.8rem;}
        .fbot p{font-size:0.74rem;color:rgba(160,152,136,0.4);}

        /* RESPONSIVE */
        @media(max-width:1024px){
          .nav{padding:1rem 2rem;} .nav.up{padding:0.65rem 2rem;}
          .svc-grid{grid-template-columns:repeat(2,1fr);}
          .abt-g{grid-template-columns:1fr;gap:3rem;}
          .cnt-g{grid-template-columns:1fr;gap:3rem;}
          .ftr-g{grid-template-columns:1fr 1fr;}
          .prj-g{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:768px){
          .nav{padding:0.9rem 1.2rem;} .nav.up{padding:0.6rem 1.2rem;}
          .nav-links,.btn-q{display:none;}
          .burger{display:flex;}
          .stats-g{grid-template-columns:repeat(2,1fr);}
          .stat:nth-child(2)::after{display:none;}
          .svc-grid{grid-template-columns:1fr;}
          .prj-g{grid-template-columns:1fr;}
          .frow{grid-template-columns:1fr;}
          .ftr-g{grid-template-columns:1fr;gap:2rem;}
          section{padding:5rem 1.2rem;}
          .svc-head,.prj-head{flex-direction:column;align-items:flex-start;}
        }
        @media(max-width:480px){
          .stats-g{grid-template-columns:repeat(2,1fr);gap:1rem;}
          .stat::after{display:none!important;}
          .hero-box{padding-top:7rem;}
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'up' : ''}`}>
        <div className="nav-logo" onClick={() => go('#home')}>
          <Image
            src="/images/QS_logo_bg.png"
            alt="Saif Elite QS"
            width={58}
            height={58}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <ul className="nav-links">
          {NAV.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="btn-q" onClick={() => go('#contact')}>
          Get a Quote
        </button>
        <button className="burger" onClick={() => setMenuOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob ${menuOpen ? 'on' : ''}`}>
        <button className="mob-x" onClick={() => setMenuOpen(false)}>
          <Icon d={ICONS.close} size={28} />
        </button>
        {NAV.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => {
              e.preventDefault();
              go(l.href);
            }}
          >
            {l.label}
          </a>
        ))}
        <button
          className="btn-p"
          onClick={() => {
            go('#contact');
            setMenuOpen(false);
          }}
        >
          Get a Quote
        </button>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <canvas id="hero-canvas" />
        <div className="hero-box">
          <div className="badge">
            <span className="dot" />
            Quantity Surveyor &amp; Cost Consultant — UAE
          </div>
          <h1 className="hero-h">
            Precision in Every
            <br />
            <span className="cg">Cost.</span> Clarity in Every
            <br />
            <span className="ct">Contract.</span>
          </h1>
          <p className="hero-p">
            Delivering expert quantity surveying and cost management services
            across the UAE and GCC. We protect your investment from concept to
            completion.
          </p>
          <div className="hero-btns">
            <button className="btn-p" onClick={() => go('#contact')}>
              Free Consultation&nbsp;
              <Icon d={ICONS.arrow} size={15} />
            </button>
            <button className="btn-o" onClick={() => go('#services')}>
              Our Services&nbsp;
              <Icon d={ICONS.chevdown} size={15} />
            </button>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-bar" />
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stats-g">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat-ico">
                <Icon d={ICONS[s.icon]} size={20} />
              </div>
              <div className="stat-v">{s.value}</div>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="svc-sec">
        <div className="wrap">
          <div className="svc-head">
            <div>
              <div className="slabel">What We Do</div>
              <h2 className="stitle">
                Our <span className="cg">Services</span>
              </h2>
              <div className="sline" />
            </div>
            <p className="sdesc">
              From early-stage budgeting to final account — comprehensive QS
              services tailored to your project.
            </p>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="svc-card">
                <div className="svc-ico">
                  <Icon d={ICONS[s.icon]} size={20} />
                </div>
                <div className="svc-t">{s.title}</div>
                <div className="svc-d">{s.desc}</div>
                <div className="svc-a">
                  Learn More&nbsp;
                  <Icon d={ICONS.arrow} size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="abt">
        <div className="wrap">
          <div className="abt-g">
            <div className="abt-wrap">
              <div className="c-tl" />
              <div className="abt-box">
                <div className="abt-ph">
                  <Icon d={ICONS.building} size={52} />
                  <p>Project Image</p>
                </div>
              </div>
              <div className="c-br" />
            </div>
            <div>
              <div className="slabel">Who We Are</div>
              <h2 className="stitle">
                Why Choose <span className="cg">Saif Elite QS</span>
              </h2>
              <div className="sline" />
              <p className="sdesc">
                A specialist QS practice committed to accurate, transparent, and
                commercially astute services. Our team brings deep expertise
                across residential, commercial, and infrastructure projects
                throughout the UAE.
              </p>
              <div className="why-l">
                {WHY.map((w) => (
                  <div key={w.title} className="why-i">
                    <div className="why-chk">
                      <Icon d={ICONS.check} size={17} />
                    </div>
                    <div>
                      <div className="why-t">{w.title}</div>
                      <div className="why-d">{w.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="prj">
        <div className="wrap">
          <div className="prj-head">
            <div>
              <div className="slabel">Our Work</div>
              <h2 className="stitle">
                Featured <span className="cg">Projects</span>
              </h2>
              <div className="sline" />
            </div>
            <button className="btn-o" style={{ fontSize: '0.75rem' }}>
              View All&nbsp;
              <Icon d={ICONS.arrow} size={13} />
            </button>
          </div>
          <div className="prj-g">
            {PROJECTS.map((p) => (
              <div key={p.name} className="prj-card">
                <div className="prj-thumb">
                  <div style={{ color: 'rgba(201,168,76,0.12)' }}>
                    <Icon d={ICONS.building} size={40} />
                  </div>
                  <span className="prj-lbl">Project Image</span>
                </div>
                <div className="prj-body">
                  <div className="prj-tag">{p.tag}</div>
                  <div className="prj-name">{p.name}</div>
                  <div className="prj-val">{p.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta">
        <h2>Ready to Start Your Project?</h2>
        <p>
          Let us provide the cost certainty your project deserves — from day
          one.
        </p>
        <button className="btn-p" onClick={() => go('#contact')}>
          Request a Consultation&nbsp;
          <Icon d={ICONS.arrow} size={15} />
        </button>
      </div>

      {/* CONTACT */}
      <section id="contact" className="cnt">
        <div className="wrap">
          <div className="slabel">Get in Touch</div>
          <h2 className="stitle">
            Contact <span className="cg">Us</span>
          </h2>
          <div className="sline" />
          <div className="cnt-g" style={{ marginTop: '3rem' }}>
            <div>
              <p className="sdesc" style={{ marginBottom: '2.5rem' }}>
                Have a project in mind? Reach out and one of our consultants
                will respond within 24 hours.
              </p>
              {CONTACTS.map((c) => (
                <div key={c.label} className="cdet">
                  <div className="cico">
                    <Icon d={ICONS[c.icon]} size={17} />
                  </div>
                  <div>
                    <div className="clbl">{c.label}</div>
                    <div className="cval">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="frow">
                <div className="fg">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="fg">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="fg">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="fg">
                <label>Service Required</label>
                <select
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div className="fg">
                <label>Project Details</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project, location, and approximate value..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>
              <button className="btn-p btn-full">
                Send Enquiry&nbsp;
                <Icon d={ICONS.send} size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ftr">
        <div className="ftr-g">
          <div className="fbrand">
            <Image
              src="/images/QS_logo_bg.png"
              alt="Saif Elite QS"
              width={64}
              height={64}
              style={{ objectFit: 'contain' }}
            />
            <p>
              Professional Quantity Surveying and Cost Consultancy across the
              UAE and GCC. Trusted by developers, contractors, and investors.
            </p>
            <div className="fsocial">
              {['linkedin', 'facebook', 'instagram'].map((k) => (
                <a key={k} href="#" className="fsoc" aria-label={k}>
                  <Icon d={ICONS[k]} size={15} />
                </a>
              ))}
            </div>
          </div>
          <div className="fcol">
            <h4>Services</h4>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      go('#services');
                    }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4>Company</h4>
            <ul>
              {[
                ['About Us', '#about'],
                ['Projects', '#projects'],
                ['Contact', '#contact'],
              ].map(([t, h]) => (
                <li key={t}>
                  <a
                    href={h}
                    onClick={(e) => {
                      e.preventDefault();
                      go(h);
                    }}
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">WhatsApp</a>
              </li>
              <li>
                <a href="mailto:info@saifeliteqs.com">Email Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <p>
            © 2025 <span className="cg">Saif Elite QS</span>. All rights
            reserved.
          </p>
          <p>Quantity Surveyor &amp; Cost Consultant — Dubai, UAE</p>
        </div>
      </footer>
    </>
  );
}
