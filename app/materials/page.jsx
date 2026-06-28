'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Svg = ({ d, s = 20, w = 1.5 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const CATEGORIES = [
  {
    id: 'structural',
    tag: '01',
    title: 'Structural Steel & Metal',
    desc: 'High-strength structural steel, rebar, aluminium profiles and metal frameworks sourced from certified mills across India, Spain, Germany and China.',
    icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    img: '/images/mat-steel.png',
    imgFallback: '/images/mat-steel.png',
    items: ['Structural Steel (I-Beams, H-Beams)', 'Rebar / Reinforcement Steel', 'Stainless Steel Sheets (SS 304 / SS 316L)', 'Aluminium Sections & Profiles', 'Aluminium Sheets', 'GI Steel Sheets', 'Steel Pipes & Hollow Sections', 'Copper & Brass Bars', 'Nylon & Teflon Bars', 'Acrylic Sheets'],
    brands: ['Certified UAE Mills', 'International Manufacturers'],
  },
  {
    id: 'structure-frame',
    tag: '02',
    title: 'Structure Frames & Support',
    desc: 'Complete structural framing systems including steel frames, scaffolding, formwork and temporary works for all construction types.',
    icon: 'M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zM4 13a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zM16 13a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6z',
    img: '/images/mat-frame.png',
    imgFallback: '/images/mat-frame.png',
    items: ['Steel Structure Frames', 'Light Steel Profile Accessories', 'Drywall Metal Profiles', 'Ceiling Metal Profiles', 'T-Grid Suspension Systems', 'Scaffolding Systems & Tubes', 'Formwork Panels', 'Shoring & Propping Systems', 'Temporary Works Equipment'],
    brands: ['Knauf', 'USG', 'Local Fabricators'],
  },
  {
    id: 'tile-marble',
    tag: '03',
    title: 'Tiles, Marble & Flooring',
    desc: 'Premium ceramic, porcelain and natural stone tiles alongside luxury SPC vinyl flooring — suitable for residential, commercial and hospitality projects.',
    icon: 'M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zM14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4zM14 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z',
    img: '/images/mat-tiles.png',
    imgFallback: '/images/mat-tiles.png',
    items: ['Ceramic Floor & Wall Tiles', 'Porcelain Tiles (Indoor & Outdoor)', 'Natural Stone (Marble, Granite, Travertine)', 'SPC Vinyl Flooring — Richmond Eco / Prime / Herringbone', 'Anti-Slip Tiles', 'Large Format Tiles (60x60, 80x80, 120x60)', 'Mosaic Tiles', 'Swimming Pool Tiles', 'Exterior Cladding Tiles'],
    brands: ['RAK Ceramics', 'Richmond', 'International Suppliers'],
  },
  {
    id: 'adhesives',
    tag: '04',
    title: 'Tile Adhesives & Glue',
    desc: 'Professional-grade tile adhesives, epoxy adhesives and bonding agents for all surface types — floors, walls, pools, facades and heavy-duty applications.',
    icon: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 6v4M12 16h.01',
    img: '/images/mat-adhesive.png',
    imgFallback: '/images/mat-adhesive.png',
    items: ['ADESILEX P7 Grey / White — Standard Tile Adhesive (25 kg)', 'ADESILEX P9 Grey / White — Improved Tile Adhesive (25 kg)', 'ADESILEX P10 White — Deformable Adhesive (25 kg)', 'ADESILEX PG4 — Epoxy Adhesive for Pools (6 kg)', 'ADESILEX PG2 TG — Epoxy Putty (6 kg)', 'Latapoxy 300 Adhesive (12.4 kg)', 'Latapoxy 310 Stone Adhesive (10L)', 'L 254 Tile Adhesive Grey / White (20 kg)', 'L 335 Premium Adhesive (20L)', 'Laticrete Bond Grey (20 kg)', 'Weber Tile Adhesives — Standard & Flexible', 'Epoxy Glue — Heavy Duty Bonding'],
    brands: ['MAPEI', 'LATICRETE', 'Weber', 'Fosroc'],
  },
  {
    id: 'grout',
    tag: '05',
    title: 'Grouts & Epoxy Grouts',
    desc: 'Full range of cementitious and epoxy grouts for joints from 1mm to 20mm, available in multiple colours for every application.',
    icon: 'M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10',
    img: '/images/mat-grout.png',
    imgFallback: '/images/mat-grout.png',
    items: ['KERAPOXY 100 White (5 kg / 10 kg)', 'KERAPOXY 110 Manhattan (5 kg / 10 kg)', 'KERAPOXY 111 Silver Grey (5 kg)', 'KERAPOXY 112 Medium Grey (10 kg)', 'KERAPOXY 113 Cement Grey (5 kg / 10 kg)', 'KERAPOXY 114 Anthracite (5 kg / 10 kg)', 'KERAPOXY 120 Black (5 kg)', 'Ultracolor Plus FA — Wide Joint Grout', 'Keracolor FF / SF — Fine & Standard Grout', 'Epoxy Grout Haze Cleaner', 'Cement Grouts — Multiple Colours'],
    brands: ['MAPEI', 'LATICRETE', 'Weber'],
  },
  {
    id: 'waterproofing',
    tag: '06',
    title: 'Waterproofing Systems',
    desc: 'Comprehensive waterproofing solutions for roofs, basements, pools, wet areas and facades — from liquid membranes to sheet systems.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    img: '/images/mat-waterproof.png',
    imgFallback: '/images/mat-waterproof.png',
    items: ['Aqua Barrier A+B — Cementitious Waterproofing (28 kg)', 'Aqua Barrier Net — Reinforcement Fabric (1×100 Mtr)', 'ADESILEX PG4 — Epoxy Waterproofing (6 kg)', 'L 9235 Waterproofing Membrane (20L, 1.27 Mtr)', 'Polyurethane Waterproofing Systems', 'Polyurea Coating Systems', 'Bituminous Waterproofing Membranes', 'Poly-Acrylic Waterproofing', 'Vinyl Ester Resin Systems', 'Crystalline Waterproofing Compounds', 'Epoxy Flooring Systems (Garage / Warehouse / Hospital)'],
    brands: ['MAPEI', 'LATICRETE', 'Fosroc', 'Dr. Fixit'],
  },
  {
    id: 'plaster',
    tag: '07',
    title: 'Plaster, Render & Gypsum',
    desc: 'Complete range of gypsum boards, plasterboards, ceiling systems and plastering products for interior and exterior applications.',
    icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2',
    img: '/images/mat-gypsum.png',
    imgFallback: '/images/mat-gypsum.png',
    items: ['Gypsum Board (Standard, Moisture-Resistant, Fire-Rated)', 'Gypsum Ceiling Tiles', 'PVC Laminated Gypsum Tiles', 'Perforated Acoustic Gypsum Tile', 'GRG Ceiling Tiles', 'Decorative Gypsum Cornice', 'Acoustic Mineral Fiber Tiles', 'Drywall Systems (Partitions & Ceilings)', 'Cement Render — Exterior Grade', 'Interior Plaster Finish Coat', 'Skim Coat & Putty', 'Premixed Plaster', 'Aluminum Composite Panels (ACP)'],
    brands: ['Knauf', 'USG', 'DONN', 'Boral', 'Mada Gypsum'],
  },
  {
    id: 'cement',
    tag: '08',
    title: 'Cement & Concrete Products',
    desc: 'OPC, SRC and blended cements from leading UAE and international manufacturers — strictly compliant with European and American standards.',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    img: '/images/mat-cement.png',
    imgFallback: '/images/mat-cement.png',
    items: ['OPC 42.5N / 52.5N Portland Cement', 'SRC Sulphate Resistant Cement', 'White Cement', 'Rapid Hardening Cement', 'Ready-Mix Concrete (Various Grades)', 'Concrete Repair Mortars', 'Non-Shrink Grout', 'Concrete Admixtures & Accelerators', 'Micro-Concrete for Precision Grouting'],
    brands: ['UltraTech', 'National Cement', 'Sharjah Cement Factory', 'Fosroc'],
  },
  {
    id: 'paints',
    tag: '09',
    title: 'Paints & Coatings',
    desc: 'Interior and exterior paints, primers and specialist coatings — for masonry, metal and concrete surfaces with Matt, Silk and Gloss finishes.',
    icon: 'M7 21a4 4 0 0 1-4-4V5a2 2 0 0 0 4 0v12a4 4 0 0 1-4 4zM7 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7',
    img: '/images/mat-paint.png',
    imgFallback: '/images/mat-paint.png',
    items: ['Exterior Masonry Paint — Matt / Silk', 'Interior Emulsion — Matt / Silk / Semi-Gloss', 'Primer — Alkali-Resistant', 'Skim Coat Putty', 'Epoxy Floor Paint', 'Anti-Corrosion Metal Primer', 'Textured Exterior Finish', 'Wood Primer & Topcoat', 'Waterproof Roof Paint'],
    brands: ['Jotun', 'Dulux', 'Asian Paints', 'National Paints', 'Berger', 'Conmix'],
  },
  {
    id: 'construction-chemicals',
    tag: '10',
    title: 'Construction Chemicals',
    desc: 'Specialist construction chemicals for concrete repair, surface treatment, anchoring and passive fire protection — from globally recognised manufacturers.',
    icon: 'M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 0-1.806.547M8 4h8l-1 1v5.172a2 2 0 0 0 .586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 0 9 10.172V5L8 4z',
    img: '/images/mat-chemicals.png',
    imgFallback: '/images/mat-chemicals.png',
    items: ['ECO PRIM GRIP PLUS — Primer/Bonding Agent (10 kg)', 'Concrete Repair Mortar', 'Structural Reinforcement Products', 'Anchoring & Grouting Compounds', 'Surface Treatment Chemicals', 'Metal Repair Epoxy', 'Passive Fire Protection Coatings', 'Epoxy Injection Resins', 'Expansion Joint Sealants', 'Silicone & Polyurethane Sealants'],
    brands: ['MAPEI', 'Fosroc', 'Master Builders', 'RAKAM', 'Henkel'],
  },
  {
    id: 'hardware-tools',
    tag: '11',
    title: 'Hardware & Tools',
    desc: 'Professional-grade hand tools, fixings and hardware from leading international brands — serving electricians, plumbers, contractors and site teams.',
    icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    img: '/images/mat-tools.png',
    imgFallback: '/images/mat-tools.png',
    items: ['Hammers & Mallets', 'Pliers & Cutters', 'Screwdrivers (Flat / Phillips / Torx)', 'Spanners & Wrenches (Full Sets)', 'Spirit Levels (Magnetic & Digital)', 'Tape Measures & Measuring Tapes', 'Painting Tools (Rollers, Brushes, Trays)', 'GI / SS Nuts, Bolts & Screws', 'Router Bits & Drill Bits', 'Cutting & Grinding Discs', 'Saws & Wood Cutting Blades', 'Knives & Utility Cutters', 'Ironmongery (Hinges, Locks, Handles)'],
    brands: ['Stanley', 'DeWalt', 'Bosch', 'Makita', 'Clarke'],
  },
  {
    id: 'power-tools',
    tag: '12',
    title: 'Power Tools',
    desc: 'Professional power tools for drilling, cutting, grinding and demolition — cordless and mains-powered from the world\'s leading manufacturers.',
    icon: 'M12 6V4m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4',
    img: '/images/mat-powertools.png',
    imgFallback: '/images/mat-powertools.png',
    items: ['Cordless Drills & Impact Drills', 'Hammer Drills & Rotary Hammers', 'Demolition Hammers (Electric)', 'Angle Grinders (4" / 5" / 9")', 'Tile Cutters', 'Circular Saws & Chopsaws (Metal Cutting)', 'Jig Saws', 'Chain Saws', 'Planers & Routers', 'Orbital Sanders', 'Nibblers & Sheet Metal Shears', 'Pneumatic Nail Guns', 'Heat Guns', 'Pressure Washers', 'Leaf Blowers (Electric)', 'Vacuum Cleaners (Industrial)', 'Measuring Lasers & Leveling Lasers'],
    brands: ['DeWalt', 'Bosch', 'Makita', 'Stanley', 'Clarke', 'Uken'],
  },
  {
    id: 'plumbing',
    tag: '13',
    title: 'Plumbing & Sanitaryware',
    desc: 'Complete plumbing solutions — pipes, fittings, faucets, sanitaryware and water systems from internationally certified manufacturers.',
    icon: 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0 2-2V9m0 0h14',
    img: '/images/mat-plumbing.png',
    imgFallback: '/images/mat-plumbing.png',
    items: ['uPVC Pipes & Fittings (Drainage & Water Supply)', 'PPR Hot & Cold Water Pipes', 'HDPE Pipes', 'GI & Copper Pipes', 'Ball Valves & Gate Valves', 'Water Tanks & Storage Solutions', 'Faucets & Mixers', 'Rain Showers & Shower Accessories', 'Sanitaryware (WC, Basin, Bathtub)', 'Vanity Units & Mirrors', 'Bathroom Accessories Sets', 'Kitchen Sinks & Mixers', 'Electric Water Heaters', 'Water Pumps & Pressure Controllers', 'Wellness & Spa Products'],
    brands: ['Cosmoplast', 'Wefatherm', 'RAKtherm', 'National Plastic', 'Grohe', 'Milano', 'Jaguar'],
  },
  {
    id: 'electrical',
    tag: '14',
    title: 'Electrical Products',
    desc: 'Full range of electrical materials for low and medium voltage — cables, switchgear, conduits, lighting and distribution systems.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    img: '/images/mat-electrical.png',
    imgFallback: '/images/mat-electrical.png',
    items: ['Electrical Cables (XLPE, PVC — Various Sizes)', 'Fire-Resistant Cables', 'MCB, ELCB & MCCB Breakers', 'Distribution Boards & Panels', 'LED Panel Lights & Downlights', 'Switches & Sockets (Single / Double / Gang)', 'Floor Boxes', 'Cable Trays & Cable Ladder', 'PVC & GI Conduits & Fittings', 'Ventilation Fans (Axial & Centrifugal)', 'Solar Inverters', 'EV Charging Infrastructure', 'Junction Boxes & Enclosures'],
    brands: ['ABB', 'Legrand', 'MK', 'KEDI Brooke', 'Decoduct', 'Ducab'],
  },
  {
    id: 'safety',
    tag: '15',
    title: 'Safety & PPE Products',
    desc: 'Comprehensive personal protective equipment and site safety solutions compliant with international standards — for all construction environments.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    img: '/images/mat-safety.png',
    imgFallback: '/images/mat-safety.png',
    items: ['Safety Helmets', 'Safety Shoes (Steel-Toe & Composite)', 'Safety Spectacles & Chemical Goggles', 'Face Shields & Welding Helmets', 'Ear Plugs & Ear Defenders', 'Face Masks & Disposable Respirators', 'Full Body Safety Harness', 'Fall Arresting Devices & Rescue Winches', 'Safety Gloves (PVC Dotted, Leather Rigger, Welding)', 'High Visibility Reflective Vests', 'Safety Coveralls (Cotton & Polyester)', 'Warning Tape & Safety Barriers', 'Eye Wash Stations', 'Scaffolding Safety Tags', 'Lifting Equipment & Tripods'],
    brands: ['3M', 'Voltex', 'International PPE Brands'],
  },
  {
    id: 'wood-timber',
    tag: '16',
    title: 'Wood & Timber',
    desc: 'All kinds of construction wood, plywood, hardwood and MDF from world-class manufacturers — for formwork, shuttering and finishing applications.',
    icon: 'M5 3l14 9-14 9V3z',
    img: '/images/mat-wood.png',
    imgFallback: '/images/mat-wood.png',
    items: ['Marine Plywood (Various Thickness)', 'Film-Face / Shuttering Plywood', 'Construction Plywood', 'Commercial Plywood', 'White Wood / Soft Wood', 'Hardwood Timber', 'MDF Boards (Standard & Moisture Resistant)', 'OSB Boards', 'Timber Battens & Joists'],
    brands: ['International Wood Suppliers'],
  },
  {
    id: 'tapes-consumables',
    tag: '17',
    title: 'Tapes & Consumables',
    desc: 'Professional adhesive tapes and site consumables for packing, protection, masking, HVAC, electrical and specialist applications.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    img: '/images/mat-tapes.png',
    imgFallback: '/images/mat-tapes.png',
    items: ['Packaging Tapes (Clear & Brown)', 'Masking Tapes (General & Automotive)', 'Protection / Surface Guard Tapes', 'HVAC Aluminium Tapes', 'Foam Tapes (Single & Double Sided)', 'Electrical Insulation Tapes', 'Double-Sided Adhesive Tapes', 'PET & Acrylic Adhesive Tapes', 'Flame Retardant Tissue Tapes', 'Warning / Hazard Tapes'],
    brands: ['Crown', 'International Brands'],
  },
  {
    id: 'polythene',
    tag: '18',
    title: 'Polythene Sheets',
    desc: '100% virgin raw material polythene sheets in various gauges (100–1000) and lengths (10–50 Mtr) — custom orders available.',
    icon: 'M4 6h16M4 12h16M4 18h7',
    img: '/images/mat-polythene.png',
    imgFallback: '/images/mat-polythene.png',
    items: ['Polythene Sheets — 200 Gauge', 'Polythene Sheets — 500 Gauge', 'Polythene Sheets — 800 Gauge', 'Polythene Sheets — 1000 Gauge', 'White Polythene Sheets', 'Blue / Clear Polythene Sheets', 'Custom Gauge & Length Orders (100–1000 Gauge, 10–50 Mtr)'],
    brands: ['UAE Manufacturers'],
  },
];

const ALL_TAGS = ['All', 'Structural', 'Finishes', 'Chemicals', 'MEP', 'Safety', 'Consumables'];

const TAG_MAP = {
  'structural': 'Structural',
  'structure-frame': 'Structural',
  'tile-marble': 'Finishes',
  'adhesives': 'Chemicals',
  'grout': 'Chemicals',
  'waterproofing': 'Chemicals',
  'plaster': 'Finishes',
  'cement': 'Structural',
  'paints': 'Finishes',
  'construction-chemicals': 'Chemicals',
  'hardware-tools': 'Consumables',
  'power-tools': 'Consumables',
  'plumbing': 'MEP',
  'electrical': 'MEP',
  'safety': 'Safety',
  'wood-timber': 'Structural',
  'tapes-consumables': 'Consumables',
  'polythene': 'Consumables',
};

const NAV = ['Home','Services','About','Procurement','Projects','Contact'];
const PHONE = '+97156465 5043';
const WA_LINK = 'https://wa.me/971564655043';
const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.5 2C6.253 2 2 6.253 2 11.5c0 1.894.549 3.659 1.497 5.145L2 22l5.488-1.478A9.46 9.46 0 0 0 11.5 21C16.747 21 21 16.747 21 11.5S16.747 2 11.5 2z";

export default function MaterialsPage() {
  const [menu, setMenu] = useState(false);
  const [sc, setSc] = useState(false);
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const run = () => document.querySelectorAll('.rv').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('on');
    });
    run(); window.addEventListener('scroll', run, { passive: true });
    return () => window.removeEventListener('scroll', run);
  }, []);

  const filtered = filter === 'All' ? CATEGORIES : CATEGORIES.filter(c => TAG_MAP[c.id] === filter);

  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    :root{--gold:#b8912a;--gold-lt:#d4aa40;--navy:#1a1f2e;--dark:#0e1118;--white:#fff;--off:#f7f6f3;--txt:#1e1e1e;--txt2:#444;--border:#e2ddd6;--tr:.3s ease;}
    body{background:var(--white);color:var(--txt);font-family:'Segoe UI',system-ui,sans-serif;line-height:1.65;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--off)}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
    .rv{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}.rv.on{opacity:1;transform:none;}
    .d1{transition-delay:.05s}.d2{transition-delay:.1s}.d3{transition-delay:.15s}.d4{transition-delay:.2s}.d5{transition-delay:.25s}.d6{transition-delay:.3s}

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
    .nlinks a.active{color:var(--gold-lt);}.nlinks a.active::after{width:100%;}
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
    .btn-ol-gold{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:var(--gold);padding:.78rem 2rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:2px solid var(--gold);cursor:pointer;font-family:inherit;transition:all var(--tr);text-decoration:none;}
    .btn-ol-gold:hover{background:var(--gold);color:#fff;}

    /* HERO */
    .page-hero{background:var(--navy);padding:10rem 1.5rem 5rem;position:relative;overflow:hidden;}
    .page-hero::before{content:'';position:absolute;top:-30%;right:-8%;width:500px;height:500px;border-radius:50%;border:1px solid rgba(184,145,42,.07);pointer-events:none;}
    .page-hero::after{content:'';position:absolute;bottom:-20%;left:-5%;width:350px;height:350px;border-radius:50%;border:1px solid rgba(184,145,42,.05);pointer-events:none;}
    .page-hero-in{max-width:1100px;margin:0 auto;position:relative;z-index:2;}
    .breadcrumb{display:flex;align-items:center;gap:.5rem;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:1.2rem;}
    .breadcrumb a{color:rgba(255,255,255,.4);text-decoration:none;transition:color var(--tr);}.breadcrumb a:hover{color:var(--gold-lt);}
    .breadcrumb span{color:var(--gold-lt);}
    .page-hero-tag{font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1rem;display:flex;align-items:center;gap:.8rem;}
    .page-hero-tag::before{content:'';display:block;width:36px;height:1px;background:var(--gold);}
    .page-hero h1{font-size:clamp(2rem,4.5vw,3.6rem);font-weight:700;color:#fff;font-family:Georgia,serif;line-height:1.1;margin-bottom:1.2rem;}
    .page-hero h1 span{color:var(--gold-lt);}
    .page-hero-p{font-size:.95rem;color:rgba(255,255,255,.62);max-width:620px;line-height:1.82;}

    /* STATS BAND */
    .stats-band{background:var(--gold);padding:2rem 1.5rem;}
    .stats-in{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem;}
    .stat-item{text-align:center;color:#fff;}
    .stat-v{font-size:1.9rem;font-weight:700;font-family:Georgia,serif;line-height:1;}
    .stat-l{font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;opacity:.85;margin-top:.2rem;}

    /* MAIN SECTION */
    .mat-section{padding:6rem 1.5rem;}
    .wrap{max-width:1200px;margin:0 auto;}
    .sec-tag{font-size:.6rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem;}
    .sec-h{font-size:clamp(1.6rem,2.8vw,2.3rem);font-weight:700;color:var(--navy);line-height:1.18;margin-bottom:.9rem;font-family:Georgia,serif;}
    .sec-line{width:40px;height:3px;background:var(--gold);margin-bottom:1.4rem;}
    .sec-p{color:var(--txt2);font-size:.9rem;line-height:1.82;max-width:580px;}

    /* FILTER TABS */
    .filters{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:3rem;}
    .f-btn{background:transparent;border:1px solid var(--border);color:var(--txt2);padding:.4rem 1.2rem;font-size:.65rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:all var(--tr);}
    .f-btn.a,.f-btn:hover{background:var(--gold);border-color:var(--gold);color:#fff;}

    /* CATEGORY GRID */
    .cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
    .cat-card{border:1px solid var(--border);overflow:hidden;cursor:pointer;transition:all var(--tr);background:var(--white);}
    .cat-card:hover{box-shadow:0 12px 36px rgba(0,0,0,.1);transform:translateY(-4px);border-color:rgba(184,145,42,.4);}
    .cat-card.open{border-color:var(--gold);}
    .cat-img{position:relative;height:200px;overflow:hidden;background:var(--off);}
    .cat-img img{object-fit:cover;object-position:center;transition:transform .6s ease;}
    .cat-card:hover .cat-img img{transform:scale(1.05);}
    .cat-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,13,20,.7) 0%,transparent 60%);}
    .cat-img-tag{position:absolute;top:1rem;left:1rem;font-size:.54rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-lt);background:rgba(14,17,24,.85);padding:.25rem .7rem;border-left:2px solid var(--gold);}
    .cat-img-num{position:absolute;bottom:1rem;right:1rem;font-size:1.8rem;font-weight:700;color:rgba(255,255,255,.12);font-family:Georgia,serif;line-height:1;}
    .cat-body{padding:1.5rem 1.6rem;}
    .cat-ico{width:38px;height:38px;border:1px solid rgba(184,145,42,.25);display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:.9rem;transition:all var(--tr);}
    .cat-card:hover .cat-ico,.cat-card.open .cat-ico{background:var(--gold);color:#fff;border-color:var(--gold);}
    .cat-title{font-size:1rem;font-weight:700;color:var(--navy);font-family:Georgia,serif;margin-bottom:.4rem;line-height:1.2;}
    .cat-desc{font-size:.8rem;color:var(--txt2);line-height:1.7;margin-bottom:.9rem;}
    .cat-meta{display:flex;align-items:center;justify-content:space-between;}
    .cat-count{font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:700;}
    .cat-toggle{font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--txt2);display:flex;align-items:center;gap:.3rem;transition:color var(--tr);}
    .cat-card:hover .cat-toggle{color:var(--gold);}

    /* EXPANDED ITEMS */
    .cat-items{background:var(--off);border-top:1px solid var(--border);padding:0;max-height:0;overflow:hidden;transition:max-height .5s ease,padding .4s ease;}
    .cat-items.open{max-height:600px;padding:1.4rem 1.6rem;}
    .cat-items-title{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.9rem;font-weight:700;}
    .items-list{display:grid;grid-template-columns:1fr 1fr;gap:.35rem .8rem;margin-bottom:1rem;}
    .item-row{display:flex;align-items:flex-start;gap:.5rem;font-size:.78rem;color:var(--txt2);line-height:1.5;}
    .item-dot{width:5px;height:5px;background:var(--gold);border-radius:50%;flex-shrink:0;margin-top:.5rem;}
    .brands-row{display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.5rem;}
    .brand-pill{font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;background:rgba(184,145,42,.1);border:1px solid rgba(184,145,42,.25);color:var(--gold);padding:.18rem .6rem;}

    /* CTA BAND */
    .cta-band{background:var(--navy);padding:6rem 1.5rem;text-align:center;}
    .cta-band h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:#fff;font-family:Georgia,serif;margin-bottom:1rem;}
    .cta-band p{color:rgba(255,255,255,.6);font-size:.9rem;max-width:520px;margin:0 auto 2.5rem;line-height:1.8;}
    .cta-tag{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:.8rem;}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

    /* FOOTER */
    .ftr{background:var(--dark);}
    .ftr-main{padding:4rem 1.5rem 2.5rem;}
    .ftr-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem;}
    .ftr-brand-name{font-size:1rem;font-weight:700;color:#fff;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.2rem;}
    .ftr-brand-sub{font-size:.58rem;color:rgba(255,255,255,.35);letter-spacing:.2em;text-transform:uppercase;margin-bottom:.8rem;}
    .ftr-brand-p{font-size:.8rem;color:rgba(255,255,255,.42);line-height:1.8;max-width:260px;}
    .ftr-contact{margin-top:1.2rem;display:flex;flex-direction:column;gap:.4rem;}
    .ftr-contact a{font-size:.8rem;color:rgba(255,255,255,.5);text-decoration:none;display:flex;align-items:center;gap:.5rem;transition:color var(--tr);}
    .ftr-contact a:hover{color:var(--gold-lt);}
    .fsoc{display:flex;gap:.5rem;margin-top:1.2rem;}
    .fsc{width:34px;height:34px;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);transition:all var(--tr);text-decoration:none;}
    .fsc:hover{border-color:var(--gold-lt);color:var(--gold-lt);}
    .fcol h4{font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:1.2rem;font-weight:700;}
    .fcol ul{list-style:none;}.fcol li{margin-bottom:.6rem;}
    .fcol a{color:rgba(255,255,255,.5);text-decoration:none;font-size:.8rem;transition:color var(--tr);}
    .fcol a:hover{color:#fff;}
    .ftr-bot{padding:1.5rem;border-top:1px solid rgba(255,255,255,.07);}
    .ftr-bot-in{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;}
    .ftr-bot p{font-size:.7rem;color:rgba(255,255,255,.2);}
    .hl{color:var(--gold-lt);}

    @media(max-width:1100px){.cat-grid{grid-template-columns:repeat(2,1fr);}.ftr-in{grid-template-columns:1fr 1fr;}}
    @media(max-width:768px){.float-social{display:none;}.mob-call{display:flex;}.mob-wa{display:flex;}.nav{padding:0 1.2rem;height:70px;}.nav.sc{height:60px;}.nlinks,.nbtn{display:none;}.burger{display:flex;}.page-hero{padding:8rem 1.2rem 4rem;}.cat-grid{grid-template-columns:1fr;}.items-list{grid-template-columns:1fr;}.stats-in{justify-content:center;gap:2rem;}.ftr-in{grid-template-columns:1fr;}}
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

      {/* NAV */}
      <nav className={`nav ${sc?'sc':''}`}>
        <Link href="/" className="nlogo">
          <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={80} height={80} style={{objectFit:'contain'}} priority/>
          <div className="nlogo-txt"><b>Saif Elite QS</b><span>Quantity Surveyor &amp; Cost Consultant</span></div>
        </Link>
        <ul className="nlinks">
          {NAV.map(n=>(<li key={n}><Link href={n==='Home'?'/':`/${n.toLowerCase()}`} className={n==='Procurement'?'active':''}>{n}</Link></li>))}
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
            <Link href="/">Home</Link><Svg d="M9 18l6-6-6-6" s={12}/>
            <Link href="/procurement">Procurement</Link><Svg d="M9 18l6-6-6-6" s={12}/>
            <span>Materials</span>
          </div>
          <div className="page-hero-tag">Complete Catalogue</div>
          <h1>Building <span>Materials & Products</span></h1>
          <p className="page-hero-p">A comprehensive catalogue of construction materials, tools and products sourced from globally certified manufacturers — covering every phase of your project from structure to finish.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-band">
        <div className="stats-in">
          {[{v:'18+',l:'Categories'},{v:'200+',l:'Active Suppliers'},{v:'18+',l:'Countries Sourced'},{v:'100%',l:'Quality Assured'}].map(s=>(
            <div key={s.l} className="stat-item rv">
              <div className="stat-v">{s.v}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MATERIALS */}
      <section className="mat-section">
        <div className="wrap">
          <div className="rv" style={{marginBottom:'2.5rem'}}>
            <div className="sec-tag">Product Categories</div>
            <h2 className="sec-h">Complete Materials Catalogue</h2>
            <div className="sec-line"/>
            <p className="sec-p">Click any category to expand the full product list. All materials are sourced from internationally recognised brands and certified suppliers.</p>
          </div>

          {/* FILTERS */}
          <div className="filters rv">
            {ALL_TAGS.map(t=>(<button key={t} className={`f-btn ${filter===t?'a':''}`} onClick={()=>setFilter(t)}>{t}</button>))}
          </div>

          {/* GRID */}
          <div className="cat-grid">
            {filtered.map((cat,i)=>(
              <div key={cat.id} className={`cat-card rv d${(i%3)+1} ${expanded===cat.id?'open':''}`}>
                {/* IMAGE */}
                <div className="cat-img" onClick={()=>setExpanded(expanded===cat.id?null:cat.id)}>
                  <img
                    src={cat.img}
                    alt={cat.title}
                    style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}}
                    onError={e=>{e.target.src=cat.imgFallback;}}
                  />
                  <div className="cat-img-overlay"/>
                  <div className="cat-img-tag">{TAG_MAP[cat.id]}</div>
                  <div className="cat-img-num">{cat.tag}</div>
                </div>

                {/* BODY */}
                <div className="cat-body" onClick={()=>setExpanded(expanded===cat.id?null:cat.id)}>
                  <div className="cat-ico"><Svg d={cat.icon} s={18}/></div>
                  <div className="cat-title">{cat.title}</div>
                  <div className="cat-desc">{cat.desc}</div>
                  <div className="cat-meta">
                    <span className="cat-count">{cat.items.length} Products</span>
                    <span className="cat-toggle">
                      {expanded===cat.id?'Collapse':'View List'} <Svg d={expanded===cat.id?"M18 15l-6-6-6 6":"M6 9l6 6 6-6"} s={13}/>
                    </span>
                  </div>
                </div>

                {/* EXPANDED LIST */}
                <div className={`cat-items ${expanded===cat.id?'open':''}`}>
                  <div className="cat-items-title">Products in this Category</div>
                  <div className="items-list">
                    {cat.items.map(item=>(
                      <div key={item} className="item-row">
                        <div className="item-dot"/>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="brands-row">
                    {cat.brands.map(b=>(<span key={b} className="brand-pill">{b}</span>))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="rv">
          <div className="cta-tag">Request a Quote</div>
          <h2>Need Materials for Your Project?</h2>
          <p>Contact our procurement team for sourcing, pricing and delivery across UAE and GCC. We respond within one business day.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-gold">Request a Quotation &nbsp;<Svg d="M5 12h14M12 5l7 7-7 7" s={14}/></Link>
            <Link href="/procurement" className="btn-ol-gold">Back to Procurement</Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="ftr">
        <div className="ftr-main">
          <div className="ftr-in">
            <div>
              <Image src="/images/QS_logo_bg.png" alt="Saif Elite QS" width={70} height={70} style={{objectFit:'contain',marginBottom:'.6rem'}}/>
              <div className="ftr-brand-name">Saif Elite QS</div>
              <div className="ftr-brand-sub">Quantity Surveyor &amp; Cost Consultant</div>
              <p className="ftr-brand-p">Independent QS and cost consultancy headquartered in Dubai, UAE, providing services across the UK, Ireland, New Zealand and Australia.</p>
              <div className="ftr-contact">
                <a href={`tel:${PHONE}`}><Svg d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.93 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" s={14}/>{PHONE}</a>
                <a href="mailto:info@saifeliteqs.com"><Svg d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" s={14}/>info@saifeliteqs.com</a>
              </div>
              <div className="fsoc">
                <a href="https://www.linkedin.com/company/saif-elite-qs" target="_blank" rel="noreferrer" className="fsc"><Svg d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" s={14}/></a>
                <a href="https://www.facebook.com/people/Saif-Elite-QS/61590199756177/" target="_blank" rel="noreferrer" className="fsc"><Svg d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" s={14}/></a>
                <a href="https://www.instagram.com/saifeliteqs/" target="_blank" rel="noreferrer" className="fsc"><Svg d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" s={14}/></a>
              </div>
            </div>
            <div className="fcol">
              <h4>Materials</h4>
              <ul>
                <li><Link href="/materials">Structural Steel</Link></li>
                <li><Link href="/materials">Tiles & Flooring</Link></li>
                <li><Link href="/materials">Adhesives & Grout</Link></li>
                <li><Link href="/materials">Waterproofing</Link></li>
                <li><Link href="/materials">Electrical & MEP</Link></li>
              </ul>
            </div>
            <div className="fcol">
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/procurement">Procurement</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ftr-bot">
          <div className="ftr-bot-in">
            <p>© 2025 <span className="hl">Saif Elite QS</span>. All rights reserved.</p>
            <p>Quantity Surveyor &amp; Cost Consultant — Dubai (HQ) · UAE · GCC</p>
          </div>
        </div>
      </footer>
    </>
  );
}
