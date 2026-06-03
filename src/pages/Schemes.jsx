import React, { useState } from 'react';
import { LANG_CONFIG } from '../config/langConfig';
import {
  Landmark, FileText, HandCoins, CheckCircle, Shield,
  ArrowRight, Building2, Users, Banknote, Tractor, Droplets, Sun, ChevronRight
} from 'lucide-react';

const SCHEMES_DATA = {
  gov: [
    {
      id: 1,
      title: "PM-KISAN",
      subtitle: "Pradhan Mantri Kisan Samman Nidhi",
      desc: "Direct income support for small and marginal farmer families across India.",
      eligibility: "Small & Marginal Farmers",
      benefits: "₹6,000/year in 3 equal installments",
      apply: "pmkisan.gov.in or nearest CSC",
      tag: "Income Support",
      tagColor: "#16a34a",
      tagBg: "#dcfce7",
      accent: "#0f5132",
      light: "#f0fdf4",
      icon: <Banknote size={22} color="#16a34a" />,
      coverage: 88,
    },
    {
      id: 2,
      title: "PMFBY",
      subtitle: "Pradhan Mantri Fasal Bima Yojana",
      desc: "Comprehensive crop insurance covering pre-sowing to post-harvest losses.",
      eligibility: "Farmers growing notified crops",
      benefits: "Full risk cover against natural calamities",
      apply: "Bank branch / PACs / CSC / online portal",
      tag: "Crop Insurance",
      tagColor: "#0369a1",
      tagBg: "#dbeafe",
      accent: "#0284c7",
      light: "#f0f9ff",
      icon: <Shield size={22} color="#0369a1" />,
      coverage: 72,
    },
    {
      id: 3,
      title: "Soil Health Card",
      subtitle: "Soil Health Card Scheme",
      desc: "Soil nutrient status reports with crop-specific fertilizer recommendations.",
      eligibility: "All farmers",
      benefits: "Optimized fertilizer use, increased productivity",
      apply: "State Agriculture Department",
      tag: "Soil & Nutrients",
      tagColor: "#92400e",
      tagBg: "#fef3c7",
      accent: "#d97706",
      light: "#fffbeb",
      icon: <CheckCircle size={22} color="#92400e" />,
      coverage: 95,
    },
  ],
  pvt: [
    {
      id: 4,
      title: "Agri-Tech Farmer Support",
      subtitle: "NGO & Private Sector Programme",
      desc: "Modern farming training, precision agriculture kits, and free seed distribution for registered community farmers.",
      eligibility: "Registered community farmers",
      benefits: "Free seeds, training, precision farming kits",
      apply: "Contact your local NGO branch",
      tag: "Private / NGO",
      tagColor: "#6d28d9",
      tagBg: "#ede9fe",
      accent: "#7c3aed",
      light: "#f5f3ff",
      icon: <Users size={22} color="#6d28d9" />,
      coverage: 60,
    },
  ],
};

const SUBSIDY_DATA = [
  {
    title: "Drip Irrigation",
    scheme: "PMKSY",
    amount: "50–90%",
    amountColor: "#16a34a",
    amountBg: "#dcfce7",
    equipment: "Micro-irrigation systems",
    process: "PMKSY state portal",
    docs: "Land doc, Aadhar, Bank Passbook, Quotation",
    icon: <Droplets size={28} color="#0284c7" />,
    iconBg: "#dbeafe",
    bar: 75,
    barColor: "#0284c7",
  },
  {
    title: "Solar Pump",
    scheme: "KUSUM",
    amount: "Up to 60%",
    amountColor: "#92400e",
    amountBg: "#fef3c7",
    equipment: "Solar water pumps",
    process: "State electricity board / Renewable energy dept",
    docs: "Aadhar, Land records, Passport photo",
    icon: <Sun size={28} color="#d97706" />,
    iconBg: "#fef3c7",
    bar: 60,
    barColor: "#f59e0b",
  },
  {
    title: "Farm Mechanization",
    scheme: "SMAM",
    amount: "40–80%",
    amountColor: "#0f5132",
    amountBg: "#d1fae5",
    equipment: "Tractors, Harvesters, Tillers",
    process: "SMAM scheme portal",
    docs: "Aadhar, Land details, Machinery quotation",
    icon: <Tractor size={28} color="#059669" />,
    iconBg: "#d1fae5",
    bar: 65,
    barColor: "#059669",
  },
];

/* ── Scheme Card ── */
function SchemeCard({ s }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: s.light,
        border: `1.5px solid ${s.accent}22`,
        borderRadius: 16,
        padding: '16px',
        marginBottom: 12,
        cursor: 'pointer',
        transition: 'box-shadow 0.18s, transform 0.15s',
        boxShadow: expanded ? `0 8px 24px ${s.accent}22` : '0 2px 8px rgba(0,0,0,0.05)',
        transform: expanded ? 'scale(1.01)' : 'scale(1)',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: `0 2px 8px ${s.accent}20`,
          border: `1px solid ${s.accent}18`,
        }}>
          {s.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: s.accent, letterSpacing: '-0.3px' }}>{s.title}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500, marginTop: 1 }}>{s.subtitle}</div>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, color: s.tagColor,
              background: s.tagBg, padding: '3px 9px', borderRadius: 20,
              flexShrink: 0, marginLeft: 8, letterSpacing: 0.3,
            }}>{s.tag}</div>
          </div>
          <div style={{ fontSize: 12.5, color: '#475569', marginTop: 6, lineHeight: 1.5 }}>{s.desc}</div>
        </div>
      </div>

      {/* Coverage bar */}
      <div style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Farmer Coverage</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: s.accent }}>{s.coverage}%</span>
        </div>
        <div style={{ height: 5, background: `${s.accent}18`, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${s.coverage}%`, background: s.accent, borderRadius: 4, transition: 'width 1s ease' }} />
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{
          marginTop: 14, borderTop: `1px solid ${s.accent}18`,
          paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 9,
        }}>
          <DetailRow icon={<CheckCircle size={14} color="#16a34a" />} label="Eligibility" value={s.eligibility} />
          <DetailRow icon={<Shield size={14} color="#0369a1" />} label="Benefits" value={s.benefits} />
          <DetailRow icon={<ArrowRight size={14} color="#d97706" />} label="How to Apply" value={s.apply} />
          <div style={{
            marginTop: 4, background: s.accent, borderRadius: 8, padding: '9px 14px',
            fontSize: 12, fontWeight: 600, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            Apply Now <ChevronRight size={14} />
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <div style={{ marginTop: 2, flexShrink: 0 }}>{icon}</div>
      <div style={{ fontSize: 12.5 }}>
        <span style={{ fontWeight: 700, color: '#0f172a' }}>{label}: </span>
        <span style={{ color: '#475569' }}>{value}</span>
      </div>
    </div>
  );
}

/* ── Subsidy Card ── */
function SubsidyCard({ s }) {
  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid #e2e8f0',
      borderRadius: 16,
      padding: '16px',
      marginBottom: 12,
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: s.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {s.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>{s.title}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginTop: 1 }}>Scheme: {s.scheme}</div>
        </div>
        <div style={{
          fontSize: 13, fontWeight: 800,
          color: s.amountColor, background: s.amountBg,
          padding: '5px 11px', borderRadius: 20,
        }}>{s.amount}</div>
      </div>

      {/* Visual bar */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ height: 8, background: '#f1f5f9', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${s.bar}%`,
            background: `linear-gradient(90deg, ${s.barColor}aa, ${s.barColor})`,
            borderRadius: 8, transition: 'width 1s ease',
          }} />
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3, fontWeight: 600 }}>Coverage: ~{s.bar}% subsidy</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '7px 6px', fontSize: 12.5 }}>
        <span style={{ fontWeight: 700, color: '#64748b' }}>Equipment</span>
        <span style={{ color: '#0f172a' }}>{s.equipment}</span>
        <span style={{ fontWeight: 700, color: '#64748b' }}>Process</span>
        <span style={{ color: '#0f172a' }}>{s.process}</span>
        <span style={{ fontWeight: 700, color: '#64748b' }}>Documents</span>
        <span style={{ color: '#0f172a' }}>{s.docs}</span>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function Schemes({ lang }) {
  const [tab, setTab] = useState('schemes');
  const [schemeType, setSchemeType] = useState('gov');
  const Lcfg = LANG_CONFIG[lang] || LANG_CONFIG.en;

  return (
    <div className="page" style={{ padding: '0 0 100px', background: 'var(--page-bg)' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f5132 0%, #064e3b 60%, #1a3a2a 100%)',
        padding: '22px 18px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: -30, right: -30,
          width: 140, height: 140, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />
        <div style={{
          position: 'absolute', bottom: -20, left: 60,
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, position: 'relative' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Landmark size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.4px' }}>Govt. Schemes</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>Subsidies & Benefits for Farmers</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
          {[
            { val: '4+', lbl: 'Active Schemes' },
            { val: '₹6K', lbl: 'Direct Benefit' },
            { val: '90%', lbl: 'Max Subsidy' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10, padding: '10px 8px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{s.val}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* Main Tab Switcher */}
        <div style={{
          display: 'flex', background: '#f1f5f9',
          borderRadius: 12, padding: 4, gap: 4, marginBottom: 16,
          border: '1px solid #e2e8f0',
        }}>
          {[
            { id: 'schemes', label: 'Schemes', icon: <FileText size={14} /> },
            { id: 'subsidy', label: 'Subsidies', icon: <HandCoins size={14} /> },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 6, padding: '10px',
                borderRadius: 9, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 700,
                background: tab === t.id ? '#0f5132' : 'transparent',
                color: tab === t.id ? '#fff' : '#64748b',
                transition: 'all 0.2s',
                boxShadow: tab === t.id ? '0 2px 8px rgba(15,81,50,0.25)' : 'none',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* SCHEMES TAB */}
        {tab === 'schemes' && (
          <div>
            {/* Sub-type pill switcher */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {[
                { id: 'gov', label: '🏛️ Government', color: '#0f5132' },
                { id: 'pvt', label: '🏢 Private / NGO', color: '#6d28d9' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setSchemeType(t.id)}
                  style={{
                    flex: 1, padding: '8px 10px',
                    borderRadius: 10,
                    border: `1.5px solid ${schemeType === t.id ? t.color : '#e2e8f0'}`,
                    background: schemeType === t.id ? `${t.color}12` : '#fff',
                    color: schemeType === t.id ? t.color : '#94a3b8',
                    fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.18s',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Section label */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
            }}>
              {schemeType === 'gov'
                ? <Building2 size={15} color="#0f5132" />
                : <Users size={15} color="#6d28d9" />
              }
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: 0.8,
                color: schemeType === 'gov' ? '#0f5132' : '#6d28d9',
              }}>
                {schemeType === 'gov' ? 'Government Schemes' : 'Private & NGO Schemes'}
              </span>
              <span style={{
                marginLeft: 'auto', fontSize: 11, fontWeight: 700,
                color: '#94a3b8',
              }}>
                {SCHEMES_DATA[schemeType].length} schemes
              </span>
            </div>

            {SCHEMES_DATA[schemeType].map(s => <SchemeCard key={s.id} s={s} />)}

            {/* Tip box */}
            <div style={{
              background: '#fffbeb', border: '1.5px solid #fcd34d',
              borderRadius: 12, padding: '12px 14px',
              display: 'flex', gap: 10, marginTop: 4,
            }}>
              <span style={{ fontSize: 16 }}>💡</span>
              <div style={{ fontSize: 12, color: '#92400e', lineHeight: 1.6 }}>
                <strong>Tip:</strong> Tap any scheme card to expand details and see how to apply.
              </div>
            </div>
          </div>
        )}

        {/* SUBSIDY TAB */}
        {tab === 'subsidy' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <HandCoins size={15} color="#0f5132" />
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: 0.8, color: '#0f5132',
              }}>Machinery & Resource Subsidies</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
                {SUBSIDY_DATA.length} programs
              </span>
            </div>
            {SUBSIDY_DATA.map((s, i) => <SubsidyCard key={i} s={s} />)}

            {/* Info banner */}
            <div style={{
              background: 'linear-gradient(135deg, #0f5132, #064e3b)',
              borderRadius: 14, padding: '16px',
              display: 'flex', gap: 12, alignItems: 'center',
            }}>
              <span style={{ fontSize: 26 }}>📋</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Apply at your nearest CSC</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  Visit the Common Service Centre or respective scheme portals with your documents ready.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
