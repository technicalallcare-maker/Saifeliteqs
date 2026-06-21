'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

// Data
const PROC_HERO = {
  tag: 'Procurement & Supply Chain Excellence',
  h1: 'Strategic Sourcing.',
  h2: 'Delivered Globally.',
  sub: 'Building materials procurement and supply chain management across 18+ countries',
};

const WHAT_WE_OFFER = [
  {
    title: 'Building Materials Supply',
    desc: 'Direct supply of premium building materials — structural steel, concrete, mechanical systems, electrical equipment, finishing materials and more. Direct relationships with manufacturers and suppliers globally.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Procurement Strategy & Management',
    desc: 'End-to-end procurement guidance — from procurement route selection, tender strategy, supplier evaluation, contract negotiation and supply chain management throughout your project.',
    icon: 'M9 11l3 3L22 4M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Supply Chain Visibility & Control',
    desc: 'Complete transparency on material sourcing, logistics, delivery timelines and cost. Real-time tracking of your supply chain from factory to site.',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5-2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  },
  {
    title: 'Cost Optimisation',
    desc: 'Leverage our global supplier relationships and negotiating power to secure best-in-class pricing without compromising quality or delivery reliability.',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
  },
];

const PROC_STEPS = [
  {
    num: '01',
    title: 'Initial Procurement Assessment',
    desc: 'We review your project specifications, budget, programme and procurement requirements to develop an optimal sourcing strategy.',
  },
  {
    num: '02',
    title: 'Supplier Identification & Evaluation',
    desc: 'We identify qualified suppliers from our global network, conduct due diligence and provide recommendations on supplier selection.',
  },
  {
    num: '03',
    title: 'Negotiation & Contracting',
    desc: 'We negotiate terms, pricing and delivery schedules with suppliers, preparing contracts that protect your interests and ensure compliance.',
  },
  {
    num: '04',
    title: 'Supply Chain Management',
    desc: 'We manage the supply chain throughout delivery — tracking shipments, managing logistics and ensuring materials arrive on schedule and on budget.',
  },
  {
    num: '05',
    title: 'Quality & Delivery Assurance',
    desc: 'We verify material quality upon receipt and manage any issues, ensuring what arrives on site meets specification and project requirements.',
  },
];

const MATERIALS = [
  { cat: 'Structural Materials', items: 'Reinforced steel, concrete beams, columns, structural frameworks' },
  { cat: 'Mechanical Systems', items: 'HVAC equipment, plumbing fixtures, pumps, compressors, boilers' },
  { cat: 'Electrical Systems', items: 'Cables, switchgear, lighting, transformers, distribution boards' },
  { cat: 'Finishing Materials', items: 'Marble, tiles, granite, paint, wood, insulation, glass' },
  { cat: 'Safety & Temporary Works', items: 'Scaffolding, safety equipment, temporary partitions, formwork' },
  { cat: 'Specialised Systems', items: 'Fire suppression, security systems, smart building controls' },
];

const REGIONS = [
  { region: 'Europe', countries: 'Germany, UK, Ireland, Italy, Spain, France, Belgium, Netherlands' },
  { region: 'Asia-Pacific', countries: 'China, India, Japan, Vietnam, Thailand, Singapore, Indonesia, Bangladesh, Australia, New Zealand' },
  { region: 'Middle East & Americas', countries: 'UAE, Qatar, Saudi Arabia, Kuwait, USA, Canada' },
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
  { metric: '15-25%', desc: 'Average cost reduction through strategic procurement' },
  { metric: '98%', desc: 'On-time delivery rate across all suppliers' },
  { metric: '18+', desc: 'Countries covered by our supplier network' },
  { metric: '200+', desc: 'Active supplier partnerships globally' },
];

const NAV = ['Home', 'Services', 'About', 'Procurement', 'Projects', 'Contact'];
const PHONE = '+971 56 465 5043';
const WA_LINK = 'https://wa.me/971564655043';

export default function ProcurementPage() {
  const [scrollPos, setScrollPos] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#f8f9fa', color: '#1a1a1a', fontFamily: 'system-ui, -apple-system' }}>
      {/* HEADER */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: scrollPos > 50 ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        padding: '16px 0',
        borderBottom: scrollPos > 50 ? '1px solid #e0e0e0' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#c9a84c' }}>Saif Elite QS</div>
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {NAV.map(n => (
              <a key={n} href={n === 'Home' ? '/' : `/${n.toLowerCase()}`} style={{
                textDecoration: 'none',
                color: n === 'Procurement' ? '#c9a84c' : '#1a1a1a',
                fontSize: '14px',
                fontWeight: n === 'Procurement' ? '600' : '400',
                cursor: 'pointer'
              }}>{n}</a>
            ))}
          </nav>
          <a href={WA_LINK} style={{
            background: '#c9a84c',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600'
          }}>Contact Us</a>
        </div>
      </header>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #060a19 0%, #0d1526 100%)',
        color: '#fff',
        padding: '140px 24px 80px',
        textAlign: 'center',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '5px', color: '#00c2cb', textTransform: 'uppercase', marginBottom: '16px' }}>
            {PROC_HERO.tag}
          </div>
          <h1 style={{ fontSize: '64px', fontWeight: '900', lineHeight: '1.1', marginBottom: '12px' }}>
            {PROC_HERO.h1}
          </h1>
          <h2 style={{ fontSize: '64px', fontWeight: '700', color: '#c9a84c', lineHeight: '1.1', marginBottom: '24px' }}>
            {PROC_HERO.h2}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
            {PROC_HERO.sub}
          </p>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '12px' }}>What We Offer</h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(to right, #c9a84c, #00c2cb)', margin: '0 auto' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px' }}>
          {WHAT_WE_OFFER.map((item, i) => (
            <div key={i} style={{
              background: '#fff',
              padding: '32px 24px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{ width: '48px', height: '48px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#c9a84c' }}>
                <Svg d={item.icon} s={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCUREMENT PROCESS */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '12px' }}>Our Procurement Process</h2>
            <div style={{ width: '60px', height: '3px', background: 'linear-gradient(to right, #c9a84c, #00c2cb)', margin: '0 auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            {PROC_STEPS.map((step, i) => (
              <div key={i} style={{
                background: '#f8f9fa',
                padding: '32px 24px',
                borderRadius: '8px',
                borderTop: '3px solid #c9a84c',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '36px', fontWeight: '900', color: '#c9a84c', marginBottom: '12px' }}>{step.num}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILDING MATERIALS */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '12px' }}>Building Materials We Supply</h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(to right, #c9a84c, #00c2cb)', margin: '0 auto' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {MATERIALS.map((mat, i) => (
            <div key={i} style={{
              background: '#fff',
              padding: '28px 24px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#c9a84c', marginBottom: '10px' }}>{mat.cat}</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{mat.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL NETWORK */}
      <section style={{ padding: '80px 24px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '12px' }}>Global Supplier Network</h2>
            <p style={{ fontSize: '16px', color: '#666' }}>Direct relationships with suppliers across 18+ countries</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {REGIONS.map((r, i) => (
              <div key={i} style={{
                background: '#fff',
                padding: '32px 24px',
                borderRadius: '8px',
                border: 'left 4px solid #c9a84c'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#c9a84c' }}>{r.region}</h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.7' }}>{r.countries}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '12px' }}>Why Choose Saif Elite QS for Procurement</h2>
          <div style={{ width: '60px', height: '3px', background: 'linear-gradient(to right, #c9a84c, #00c2cb)', margin: '0 auto' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {WHY_PROCURE.map((item, i) => (
            <div key={i} style={{
              background: '#f8f9fa',
              padding: '24px 20px',
              borderRadius: '8px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: '#c9a84c',
                borderRadius: '50%',
                flexShrink: 0,
                marginTop: '2px'
              }}></div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAVINGS */}
      <section style={{ padding: '80px 24px', background: '#fff', borderTop: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '12px' }}>Procurement Impact</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            {SAVINGS.map((item, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '32px 24px'
              }}>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#c9a84c', marginBottom: '12px' }}>
                  {item.metric}
                </div>
                <p style={{ fontSize: '15px', color: '#666' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #060a19 0%, #0d1526 100%)',
        color: '#fff',
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '16px' }}>Ready to Optimise Your Supply Chain?</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', lineHeight: '1.7' }}>
            Let's discuss how Saif Elite QS can deliver cost-effective procurement solutions tailored to your project.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_LINK} style={{
              background: '#c9a84c',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>WhatsApp Us</a>
            <a href="mailto:info@saifeliteqs.com" style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '600',
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer'
            }}>Email Us</a>
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <footer style={{
        background: '#f8f9fa',
        padding: '40px 24px',
        borderTop: '1px solid #e0e0e0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Location</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>Dubai, United Arab Emirates</p>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Phone</h4>
              <a href={`tel:${PHONE}`} style={{ fontSize: '13px', color: '#c9a84c', textDecoration: 'none' }}>{PHONE}</a>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Email</h4>
              <a href="mailto:info@saifeliteqs.com" style={{ fontSize: '13px', color: '#c9a84c', textDecoration: 'none' }}>info@saifeliteqs.com</a>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Website</h4>
              <a href="https://www.saifeliteqs.com" style={{ fontSize: '13px', color: '#c9a84c', textDecoration: 'none' }}>www.saifeliteqs.com</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '24px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
            <p>&copy; 2024 Saif Elite QS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
