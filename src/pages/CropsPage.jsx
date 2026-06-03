import React, { useState } from 'react';
import { chatApi } from '../utils/api';
import { pj } from '../utils/helpers';
import { CROPS, ALL_CROP_LIST } from '../config/cropsData';
import { LANG_CONFIG } from '../config/langConfig';
import {
    Search, Sprout, X, AlertTriangle,
    Droplets, Layers, Wheat, Clock, DollarSign,
    TrendingUp, Bot, CalendarDays, Thermometer,
    Sun, Shield, Leaf, Info, ChevronRight
} from 'lucide-react';

// Static knowledge base — shown instantly when crop is tapped
const CROP_KB = {
    "Paddy": { soil: "Clay / Clay Loam", pH: "5.5–6.5", moisture: "High (60–80%)", water: "1200–2000 mm", temp: "22–35°C", npk: "N:120 P:60 K:60", yield: "40–60 q/acre", price: "₹2,100–2,500/qtl", profit: "High", diseases: ["Blast", "BLB", "Brown Spot"], benefits: ["Staple food crop", "High market demand", "Good MSP support"] },
    "Wheat": { soil: "Loamy / Clay Loam", pH: "6.0–7.5", moisture: "Moderate (50–70%)", water: "400–500 mm", temp: "15–25°C", npk: "N:120 P:60 K:40", yield: "30–50 q/acre", price: "₹2,200–2,500/qtl", profit: "High", diseases: ["Rust", "Powdery Mildew"], benefits: ["Major food crop", "Strong MSP ₹2275", "Export potential"] },
    "Maize": { soil: "Sandy Loam / Loam", pH: "6.0–7.5", moisture: "Moderate (50–65%)", water: "500–800 mm", temp: "20–35°C", npk: "N:120 P:60 K:40", yield: "25–40 q/acre", price: "₹1,900–2,200/qtl", profit: "Medium", diseases: ["Blight", "Rust"], benefits: ["Poultry feed demand", "Starch industry", "Low input cost"] },
    "Groundnut": { soil: "Sandy Loam", pH: "6.0–6.5", moisture: "Low-Medium (40–60%)", water: "500–700 mm", temp: "25–30°C", npk: "N:25 P:50 K:50", yield: "8–15 q/acre", price: "₹5,500–7,500/qtl", profit: "High", diseases: ["Tikka Leaf Spot", "Rust"], benefits: ["Edible oil crop", "Protein-rich", "Groundnut cake for fodder"] },
    "Sugarcane": { soil: "Loamy / Deep Clay", pH: "6.0–7.5", moisture: "High (70–80%)", water: "1500–2500 mm", temp: "25–35°C", npk: "N:200 P:100 K:100", yield: "300–400 qtl/acre", price: "₹300–350/qtl", profit: "High", diseases: ["Red Rot", "Smut"], benefits: ["Long-duration cash crop", "Sugar, jaggery, ethanol", "Crop residue as fuel"] },
    "Cotton": { soil: "Black Cotton Soil", pH: "6.0–8.0", moisture: "Low-Medium (35–60%)", water: "700–1200 mm", temp: "25–35°C", npk: "N:100 P:50 K:50", yield: "8–15 q/acre", price: "₹6,500–8,000/qtl", profit: "High", diseases: ["Bollworm", "Leaf Curl"], benefits: ["Textile industry demand", "Cottonseed oil", "Good export market"] },
    "Tomato": { soil: "Well-drained Loam", pH: "6.0–7.0", moisture: "Moderate (55–70%)", water: "400–600 mm", temp: "20–27°C", npk: "N:120 P:60 K:100", yield: "100–200 qtl/acre", price: "₹800–3,000/qtl", profit: "Medium-High", diseases: ["Early Blight", "Wilt"], benefits: ["High demand vegetable", "Multiple harvests/year", "Good farmgate value"] },
    "Onion": { soil: "Well-drained Sandy Loam", pH: "6.0–7.5", moisture: "Low (30–50%)", water: "350–500 mm", temp: "13–24°C", npk: "N:100 P:50 K:50", yield: "80–120 qtl/acre", price: "₹800–4,000/qtl", profit: "Medium", diseases: ["Purple Blotch", "Thrips"], benefits: ["Export crop", "Long shelf life", "Essential kitchen vegetable"] },
};

function getStaticInfo(engName) {
    const key = Object.keys(CROP_KB).find(k =>
        engName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(engName.toLowerCase().split(" ")[0])
    );
    return key ? CROP_KB[key] : null;
}

export default function CropsPage({ lang }) {
    const L = LANG_CONFIG[lang].crops;
    const Lc = LANG_CONFIG[lang].common;

    const [view, setView] = useState("portfolio");
    const [f, setF] = useState({ season: "Kharif", state: "Tamil Nadu", land: "3", budget: "50000" });
    const [res, setRes] = useState(null);
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState("");
    const [cat, setCat] = useState("All");
    const [selected, setSelected] = useState(null);
    const [aiTip, setAiTip] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);

    const cats = ["All", ...Object.keys(CROPS)];
    const langName = lang === 'ta' ? 'Tamil' : lang === 'te' ? 'Telugu' : lang === 'hi' ? 'Hindi' : lang === 'ml' ? 'Malayalam' : lang === 'kn' ? 'Kannada' : 'English';

    const getDName = (n) => {
        const p = n.split("|");
        return p.length > 1 ? (lang === "en" ? p[1].trim() : p[0].trim()) : n;
    };
    const getEngName = (n) => {
        const p = n.split("|");
        return p.length > 1 ? p[1].trim() : n;
    };

    const filtered = () => {
        let list = cat === "All"
            ? Object.entries(CROPS).flatMap(([c, items]) => items.map(i => ({ ...i, cat: c })))
            : (CROPS[cat] || []).map(i => ({ ...i, cat }));
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(c => getDName(c.n).toLowerCase().includes(q) || c.r?.toLowerCase().includes(q) || c.n.toLowerCase().includes(q));
        }
        return list;
    };

    const COLORS = ["#198754", "#d97706", "#0284c7", "#7c3aed", "#db2777"];
    const RISK = { Low: { bg: "#dcfce7", c: "#166534" }, Medium: { bg: "#fef9c3", c: "#713f12" }, High: { bg: "#fee2e2", c: "#991b1b" } };

    // Load AI tips asynchronously in background
    const loadAiTip = async (engName) => {
        setAiLoading(true); setAiTip(null);
        try {
            const raw = await chatApi([{ role: "user", content: `Give 2 practical farming tips for ${engName} crop in India. In ${langName}. JSON: {"tip1":"...","tip2":"...","advisory":"One sentence selling advice in ${langName}"}` }]);
            const p = pj(raw, null);
            if (p?.tip1) setAiTip(p);
        } catch { }
        setAiLoading(false);
    };

    const openCrop = (crop) => {
        setSelected(crop);
        setAiTip(null);
        const eng = getEngName(crop.n);
        loadAiTip(eng);
    };

    const run = async () => {
        setLoad(true);
        try {
            const prompt = `Indian crop advisor. Season=${f.season}, State=${f.state}, Land=${f.land} acres, Budget=Rs ${f.budget}. In ${langName}.
JSON only: {"portfolio":[{"crop":"Paddy","allocation":60,"yield":"45 q/acre","roi":"175%","risk":"Low","season":"Jun-Oct","investment":"18000","profit":"31500"}],"strategy":"one sentence","totalInvestment":"38000","expectedProfit":"85000","tips":["tip1","tip2"]}`;
            const raw = await chatApi([{ role: "user", content: prompt }]);
            const parsed = pj(raw, null);
            if (parsed?.portfolio?.length > 0) setRes(parsed); else throw new Error();
        } catch {
            setRes({ portfolio: [{ crop: "Paddy", allocation: 60, yield: "45 q/acre", roi: "175%", risk: "Low", season: "Jun-Oct", investment: "18000", profit: "31500" }, { crop: "Groundnut", allocation: 30, yield: "12 q/acre", roi: "140%", risk: "Medium", season: "Jun-Sep", investment: "12000", profit: "16800" }, { crop: "Maize", allocation: 10, yield: "28 q/acre", roi: "120%", risk: "Low", season: "Jun-Sep", investment: "8000", profit: "9600" }], strategy: lang === "en" ? "Diversified Kharif portfolio for maximum return." : "அதிக லாபத்திற்காக பன்முக கரீஃப் திட்டம்.", totalInvestment: "38000", expectedProfit: "85000", tips: [lang === "en" ? "Sow after first rain for best germination" : "முதல் மழைக்கு பின் விதைக்கவும்", lang === "en" ? "Use certified seeds for higher yield" : "தரமான விதைகளை பயன்படுத்தவும்"] });
        }
        setLoad(false);
    };

    const KB_FIELDS = [
        [Layers, "Best Soil", "soil"], [Info, "Soil pH", "pH"],
        [Droplets, "Moisture", "moisture"], [Droplets, "Water Need", "water"],
        [Thermometer, "Temperature", "temp"], [Sun, "NPK Fertilizer", "npk"],
        [TrendingUp, "Avg Yield", "yield"], [DollarSign, "Market Price", "price"],
    ];

    const staticInfo = selected ? getStaticInfo(getEngName(selected.n)) : null;

    return (
        <div className="page">
            <div style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-dark)", marginBottom: 4 }}>{L.title}</h2>
                <p style={{ fontSize: 13, color: "var(--text-mid)" }}>{L.subtitle}</p>
            </div>

            <div className="toggle-bar">
                {[["portfolio", L.tabAI || "AI Portfolio"], ["browse", L.tabAll || "Browse Crops"]].map(([v, l]) => (
                    <div key={v} className={`toggle-opt${view === v ? " active" : ""}`} onClick={() => setView(v)}>{l}</div>
                ))}
            </div>

            {/* ─── CROP DETAIL SHEET ─── */}
            {selected && (
                <div className="detail-overlay" onClick={() => setSelected(null)}>
                    <div className="detail-sheet" onClick={e => e.stopPropagation()}>
                        <div className="detail-sheet-handle" />

                        {/* Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <Sprout size={20} color="var(--primary)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-dark)" }}>{getDName(selected.n)}</div>
                                    {lang !== "en" && selected.n?.includes("|") && (
                                        <div style={{ fontSize: 12, color: "var(--text-soft)", marginTop: 1 }}>{selected.n.split("|")[1]?.trim()}</div>
                                    )}
                                </div>
                            </div>
                            <button onClick={() => setSelected(null)} style={{ width: 32, height: 32, borderRadius: "50%", background: "#f1f5f9", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                <X size={14} />
                            </button>
                        </div>

                        {/* Season + Region + Profitability pills */}
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                            <span style={{ background: "var(--primary-light)", color: "var(--primary)", borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                                <CalendarDays size={10} /> {selected.s}
                            </span>
                            <span style={{ background: "#e0f2fe", color: "#0369a1", borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>
                                {selected.r}
                            </span>
                            {staticInfo && (
                                <span style={{ background: staticInfo.profit?.includes("High") ? "#dcfce7" : staticInfo.profit?.includes("Low") ? "#fee2e2" : "#fef9c3", color: staticInfo.profit?.includes("High") ? "#166534" : staticInfo.profit?.includes("Low") ? "#991b1b" : "#713f12", borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 700 }}>
                                    {staticInfo.profit} Profit
                                </span>
                            )}
                        </div>

                        {/* Static info grid — shows instantly */}
                        {staticInfo ? (
                            <>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                                    <Info size={10} /> Growing Conditions
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
                                    {KB_FIELDS.map(([Icon, label, key]) => (
                                        <div key={key} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 11px", border: "1px solid var(--border)" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}>
                                                <Icon size={9} color="var(--text-soft)" />
                                                <span style={{ fontSize: 9, color: "var(--text-soft)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px" }}>{label}</span>
                                            </div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.3 }}>{staticInfo[key]}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Benefits */}
                                <div style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                                        <Shield size={10} /> Key Benefits
                                    </div>
                                    {staticInfo.benefits.map((b, i) => (
                                        <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: i < staticInfo.benefits.length - 1 ? "1px solid var(--border)" : "none", fontSize: 13, color: "var(--text-dark)" }}>
                                            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, fontWeight: 800, color: "var(--primary)" }}>{i + 1}</div>
                                            {b}
                                        </div>
                                    ))}
                                </div>

                                {/* Common Diseases */}
                                <div style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                                        <AlertTriangle size={10} /> Common Pests & Diseases
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                        {staticInfo.diseases.map(d => (
                                            <span key={d} style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>{d}</span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* Generic fallback for crops not in KB */
                            <div style={{ background: "var(--primary-pale)", borderRadius: 8, padding: 14, marginBottom: 14, border: "1px solid var(--border)" }}>
                                <div style={{ fontSize: 13, color: "var(--text-dark)", lineHeight: 1.7 }}>
                                    <strong>{getDName(selected.n)}</strong> is cultivated across {selected.r}. Best planted in {selected.s} season. Ensure proper soil preparation, irrigation, and pest management for a good yield.
                                </div>
                            </div>
                        )}

                        {/* AI Tips — loads in background */}
                        <div style={{ background: aiLoading ? "#f8fafc" : aiTip ? "var(--amber-light)" : "#f8fafc", border: `1px solid ${aiTip ? "#fcd34d" : "var(--border)"}`, borderRadius: 8, padding: "12px 14px" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                                <Bot size={10} /> AI Farming Tips
                                {aiLoading && <span style={{ fontSize: 10, color: "var(--text-soft)", fontWeight: 500, marginLeft: 4 }}>Loading...</span>}
                            </div>
                            {aiLoading && <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <div className="skel" style={{ height: 12, width: "85%" }} />
                                <div className="skel" style={{ height: 12, width: "70%" }} />
                            </div>}
                            {aiTip && !aiLoading && <>
                                <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.6, marginBottom: 5, display: "flex", gap: 5 }}><span style={{ fontWeight: 800 }}>→</span> {aiTip.tip1}</div>
                                <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.6, marginBottom: 8, display: "flex", gap: 5 }}><span style={{ fontWeight: 800 }}>→</span> {aiTip.tip2}</div>
                                {aiTip.advisory && <div style={{ fontSize: 12, color: "#713f12", fontWeight: 700, borderTop: "1px solid #fcd34d", paddingTop: 8 }}>{aiTip.advisory}</div>}
                            </>}
                            {!aiLoading && !aiTip && <div style={{ fontSize: 12, color: "var(--text-soft)" }}>Follow standard agronomic practices for best results. Consult your local KVK for region-specific guidance.</div>}
                        </div>
                    </div>
                </div>
            )}

            {/* ─── PORTFOLIO VIEW ─── */}
            {view === "portfolio" && <>
                <div className="card">
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-dark)", marginBottom: 12 }}>{L.farmDet || "Farm Details"}</div>
                    <div className="field-grid">
                        {[["season", Lc.season || "Season", ["Kharif","Rabi","Zaid","Perennial"]], ["state", Lc.state || "State", ["Tamil Nadu","Punjab","Maharashtra","Karnataka","Andhra Pradesh","Uttar Pradesh","Gujarat","Rajasthan","Madhya Pradesh","Bihar","West Bengal","Odisha","Kerala","Assam","Telangana","Haryana"]]].map(([key, label, opts]) => (
                            <div key={key} className="field">
                                <div className="field-label">{label}</div>
                                <select className="field-input" value={f[key]} onChange={e => setF({ ...f, [key]: e.target.value })}>
                                    {opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            </div>
                        ))}
                        <div className="field">
                            <div className="field-label">{L.land || "Land (acres)"}</div>
                            <input className="field-input" value={f.land} type="number" onChange={e => setF({ ...f, land: e.target.value })} />
                        </div>
                        <div className="field">
                            <div className="field-label">{L.budget || "Budget (₹)"}</div>
                            <input className="field-input" value={f.budget} type="number" onChange={e => setF({ ...f, budget: e.target.value })} />
                        </div>
                    </div>
                    <button className="btn-big" onClick={run} disabled={load}>
                        {load ? <><div className="spin" /><span>{L.btnLoad || "Generating..."}</span></> : <><Bot size={15} /><span>{L.btn || "Generate AI Portfolio"}</span></>}
                    </button>
                </div>

                {res && <>
                    <div className="card-green">
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 6 }}>AI Portfolio Strategy</div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 12 }}>{res.strategy}</div>
                        <div className="alloc-bar">{res.portfolio.map((c, i) => <div key={c.crop} className="alloc-seg" style={{ width: `${c.allocation}%`, background: COLORS[i % 5] }} />)}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8, marginBottom: 14 }}>
                            {res.portfolio.map((c, i) => (
                                <span key={c.crop} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i % 5], display: "inline-block" }} /> {c.crop} {c.allocation}%
                                </span>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                            {[["Investment", `₹${parseInt(res.totalInvestment).toLocaleString()}`], ["Expected Profit", `₹${parseInt(res.expectedProfit).toLocaleString()}`]].map(([l, v]) => (
                                <div key={l} style={{ flex: 1, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "11px 8px", textAlign: "center" }}>
                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: 4, textTransform: "uppercase" }}>{l}</div>
                                    <div style={{ fontSize: 19, fontWeight: 800, color: "#fff" }}>{v}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {res.portfolio.map((c, i) => {
                        const rs = RISK[c.risk] || RISK.Low;
                        return (
                            <div key={c.crop} className="portfolio-card" onClick={() => openCrop({ n: c.crop, s: c.season || "Annual", r: f.state })}>
                                <div className="portfolio-card-head">
                                    <div className="portfolio-crop-name">
                                        <div style={{ width: 30, height: 30, borderRadius: 6, background: COLORS[i % 5] + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Sprout size={14} color={COLORS[i % 5]} />
                                        </div>
                                        {c.crop}
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div className="portfolio-alloc" style={{ color: COLORS[i % 5] }}>{c.allocation}%</div>
                                        <span className="risk-tag" style={{ background: rs.bg, color: rs.c }}>{c.risk} Risk</span>
                                    </div>
                                </div>
                                <div className="crop-metrics">
                                    <div className="crop-metric"><div className="crop-metric-val">{c.yield}</div><div className="crop-metric-lbl">Yield</div></div>
                                    <div className="crop-metric"><div className="crop-metric-val" style={{ color: "#198754" }}>{c.roi}</div><div className="crop-metric-lbl">ROI</div></div>
                                    <div className="crop-metric"><div className="crop-metric-val" style={{ color: "#d97706" }}>₹{parseInt(c.investment || 0).toLocaleString()}</div><div className="crop-metric-lbl">Cost</div></div>
                                </div>
                                <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-soft)", display: "flex", alignItems: "center", gap: 4 }}>
                                    <ChevronRight size={11} /> Tap for full details
                                </div>
                            </div>
                        );
                    })}

                    {res.tips?.length > 0 && (
                        <div className="card">
                            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
                                <Leaf size={10} /> Farmer Tips
                            </div>
                            {res.tips.map((t, i) => (
                                <div key={i} className="list-row"><div className="list-bullet" /><span style={{ fontSize: 13 }}>{t}</span></div>
                            ))}
                        </div>
                    )}
                </>}
            </>}

            {/* ─── BROWSE VIEW ─── */}
            {view === "browse" && <>
                <div className="search-wrap">
                    <div className="search-ico"><Search size={15} /></div>
                    <input className="search-input" placeholder={L.search || "Search crops..."} value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="cat-strip">
                    {cats.map((c, i) => (
                        <div key={i} className={`cat-chip${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>
                            {c === "All" ? `All (${ALL_CROP_LIST.length})` : getDName(c)}
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-soft)", marginBottom: 10 }}>
                    {filtered().length} crops {search ? `matching "${search}"` : ""}
                </div>
                <div className="crop-grid">
                    {filtered().map((crop, i) => (
                        <div key={`${crop.n}-${i}`} className="crop-tile" onClick={() => openCrop(crop)}>
                            <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                                <Sprout size={18} strokeWidth={1.8} color="var(--primary)" />
                            </div>
                            <div className="crop-tile-name">{getDName(crop.n)}</div>
                            <span style={{ display: "inline-block", background: "var(--primary-pale)", color: "var(--primary)", borderRadius: 10, padding: "2px 7px", fontSize: 10, fontWeight: 600, marginTop: 4 }}>{crop.s}</span>
                            <div className="crop-tile-region" style={{ marginTop: 3 }}>{crop.r?.split(",")[0]?.trim()}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 6, color: "var(--text-soft)", fontSize: 11 }}>
                                <ChevronRight size={9} /> Tap for info
                            </div>
                        </div>
                    ))}
                </div>
                {filtered().length === 0 && (
                    <div className="empty">
                        <div className="empty-icon"><Search size={32} strokeWidth={1.5} /></div>
                        <div className="empty-title">{L.no || "No crops found"}</div>
                        <div className="empty-sub">{L.noSub || "Try a different search"}</div>
                    </div>
                )}
            </>}
        </div>
    );
}
