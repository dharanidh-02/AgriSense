import React, { useState } from 'react';
import { chatApi } from '../utils/api';
import { pj } from '../utils/helpers';
import { CROP_EMOJI_MAP } from '../config/cropsData';
import { LANG_CONFIG } from '../config/langConfig';

export default function Soil({ lang }) {
    const L = LANG_CONFIG[lang].soil;
    const Lgem = LANG_CONFIG[lang].geminiLang;

    const [s, setS] = useState(() => {
        const saved = localStorage.getItem('agrisense_soil');
        return saved ? JSON.parse(saved) : { ph: "6.5", n: "240", p: "18", k: "200", moisture: "42", type: "Loamy" };
    });
    const [res, setRes] = useState(null);
    const [load, setLoad] = useState(false);

    const updateSoil = (key, value) => {
        const newS = { ...s, [key]: value };
        setS(newS);
        localStorage.setItem('agrisense_soil', JSON.stringify(newS));
    };

    const fetchAutoData = () => {
        setLoad(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Mocking SoilGrids API / Bhuvan Satellite fetch for current coord
                    setTimeout(() => {
                        const newSoil = {
                            ph: (6.0 + Math.random() * 1.5).toFixed(1),
                            n: Math.floor(200 + Math.random() * 80).toString(),
                            p: Math.floor(15 + Math.random() * 15).toString(),
                            k: Math.floor(180 + Math.random() * 60).toString(),
                            moisture: Math.floor(35 + Math.random() * 25).toString(),
                            type: ["Loamy", "Clay", "Red Laterite", "Black Cotton"][Math.floor(Math.random() * 4)]
                        };
                        setS(newSoil);
                        localStorage.setItem('agrisense_soil', JSON.stringify(newSoil));
                        setLoad(false);
                    }, 1200);
                },
                (error) => {
                    alert(lang === "en" ? "Location access denied." : "இருப்பிட அனுமதி மறுக்கப்பட்டது.");
                    setLoad(false);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
            setLoad(false);
        }
    };

    const run = async () => {
        setLoad(true);
        const raw = await chatApi([{ role: "user", content: `Agricultural AI. Soil: pH:${s.ph}, N:${s.n}kg/ha, P:${s.p}kg/ha, K:${s.k}kg/ha, moisture:${s.moisture}%, type:${s.type}. Reply ONLY in ${Lgem}. valid JSON: {"soilHealth":"Good","healthScore":78,"status":"Suitable for Kharif crops","insights":["i1","i2","i3"],"amendments":["a1","a2"],"suitableCrops":["Paddy","Groundnut","Maize"],"warnings":["w1"]}` }]);
        setRes(pj(raw, { soilHealth: "Good", healthScore: 76, status: lang === "en" ? "Suitable for cultivation" : "நல்ல நிலை", insights: [lang === "en" ? "pH is in optimal range (6–7.5)" : "pH சரியான அளவில் உள்ளது", "Nitrogen levels adequate"], amendments: ["25 kg/acre potash fertilizer", "5 tonnes/acre FYM"], suitableCrops: ["Paddy", "Groundnut", "Maize", "Ragi"], warnings: [lang === "en" ? "Monitor moisture bi-weekly" : "ஈரப்பதத்தை கண்காணியுங்கள்"] }));
        setLoad(false);
    };

    const sc = res ? (res.healthScore > 70 ? "#1a6b3c" : res.healthScore > 50 ? "#c8620a" : "#c0392b") : "#1a6b3c";
    const sb = res ? (res.healthScore > 70 ? "#e6f7ed" : res.healthScore > 50 ? "#fff8eb" : "#fdf0ee") : "#e6f7ed";

    return (
        <div className="page">
            <div className="section-title" style={{ margin: "0 0 4px" }}>{L.title}</div>
            <p style={{ fontSize: 14, color: "#7a9a7e", marginBottom: 18, fontWeight: 600 }}>{L.subtitle}</p>

            <div className="card">
                <div className="section-title" style={{ fontSize: 16, margin: "0 0 14px" }}>{L.params}</div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                    <button onClick={fetchAutoData} disabled={load} style={{
                        background: "rgba(39, 174, 96, 0.15)", border: "1.5px solid #27ae60",
                        color: "#27ae60", padding: "8px 14px", borderRadius: 20,
                        fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 800,
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 6
                    }}>
                        📍 {lang === "en" ? "Auto Fetch Data" : "தானாக தரவு பெறு"}
                    </button>
                </div>
                
                <div className="field-grid">
                    {[["ph", L.ph, "6.0 – 7.5"],
                    ["n", L.n, "200 – 300"],
                    ["p", L.p, "10 – 25"],
                    ["k", L.k, "150 – 250"],
                    ["moisture", L.moist, "30 – 60"]
                    ].map(([k, l, ph]) => (
                        <div key={k} className="field">
                            <div className="field-label">{l}</div>
                            <input className="field-input" value={s[k]} placeholder={ph} onChange={e => updateSoil(k, e.target.value)} />
                        </div>
                    ))}
                    <div className="field">
                        <div className="field-label">{L.type}</div>
                        <select className="field-input" value={s.type} onChange={e => updateSoil('type', e.target.value)}>
                            {["Loamy", "Sandy", "Clay", "Silty", "Black Cotton", "Red Laterite", "Alluvial"].map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                </div>
                <button className="btn-big" onClick={run} disabled={load}>
                    {load ? <><div className="spin" /><span>{L.btnLoad}</span></> : <><span>🔬</span><span>{L.btn}</span></>}
                </button>
            </div>

            {res && (<>
                <div className="card" style={{ border: `3px solid ${sc}` }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <div className="health-ring" style={{ borderColor: sc, background: sb, color: sc }}>
                            <div className="health-ring-n">{res.healthScore}</div>
                            <div className="health-ring-l">/100</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 12, color: "#7a9a7e", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>{L.health}</div>
                            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 28, fontWeight: 900, color: sc, marginTop: 2 }}>{res.soilHealth}</div>
                            <div style={{ fontSize: 14, color: "#4a6b4f", marginTop: 4, fontWeight: 600 }}>{res.status}</div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="section-title" style={{ fontSize: 16, margin: "0 0 12px" }}>{L.insights}</div>
                    {res.insights.map((ins, i) => (
                        <div key={i} className="list-row"><div className="list-bullet" /><span>{ins}</span></div>
                    ))}
                </div>

                {res.warnings?.filter(Boolean).length > 0 && (
                    <div className="advisory">
                        <div className="advisory-icon">⚠️</div>
                        <div><div className="advisory-title">{L.warn}</div><div className="advisory-text">{res.warnings.join(" · ")}</div></div>
                    </div>
                )}

                <div className="card">
                    <div className="section-title" style={{ fontSize: 16, margin: "0 0 12px" }}>{L.amend}</div>
                    {res.amendments.map((a, i) => (
                        <div key={i} style={{ background: i % 2 === 0 ? "#e6f7ed" : "#f5f7f5", borderRadius: 12, padding: "12px 14px", marginBottom: 8, display: "flex", gap: 10, alignItems: "center", fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 700, color: "#1a2e1e" }}>
                            <span style={{ fontSize: 20 }}>🧪</span>{a}
                        </div>
                    ))}
                </div>

                <div className="card">
                    <div className="section-title" style={{ fontSize: 16, margin: "0 0 12px" }}>{L.crops}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {res.suitableCrops.map((c, i) => (
                            <div key={i} style={{ background: c === "Paddy" || c === "Rice" || c === "நெல்" ? "#e6f7ed" : "#fff8eb", border: "2px solid", borderColor: c === "Paddy" || c === "Rice" || c === "நெல்" ? "#a8ddb8" : "#ffd480", borderRadius: 30, padding: "8px 18px", fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 800, color: "#1a2e1e", display: "flex", alignItems: "center", gap: 6 }}>
                                {CROP_EMOJI_MAP[c] || CROP_EMOJI_MAP[`${c}`] || "🌱"} {c}
                            </div>
                        ))}
                    </div>
                </div>
            </>)}
        </div>
    );
}
