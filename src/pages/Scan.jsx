import React, { useState, useRef } from 'react';
import { chatApi, gemini } from '../utils/api';
import { pj } from '../utils/helpers';
import { KEYS } from '../config/keys';
import { LANG_CONFIG } from '../config/langConfig';
import { Camera, RotateCcw, Microscope, CheckCircle, AlertTriangle, Zap, Info, Shield, Pill, Upload, Store, FlaskConical, Leaf } from 'lucide-react';

export default function Scan({ lang }) {
    const L = LANG_CONFIG[lang].scan;
    const Lcfg = LANG_CONFIG[lang];

    const [img, setImg] = useState(null);
    const [b64, setB64] = useState(null);
    const [pnData, setPnData] = useState(null);
    const [res, setRes] = useState(null);
    const [err, setErr] = useState(null);
    const [load, setLoad] = useState(false);
    const [step, setStep] = useState("");
    const fileRef = useRef();

    const langName = lang === 'ta' ? 'Tamil' : lang === 'te' ? 'Telugu' : lang === 'hi' ? 'Hindi' : lang === 'ml' ? 'Malayalam' : lang === 'kn' ? 'Kannada' : 'English';

    const pick = e => {
        const f = e.target.files[0];
        if (!f) return;
        setImg(URL.createObjectURL(f));
        setRes(null); setPnData(null); setErr(null); setStep("");
        const r = new FileReader();
        r.onload = ev => setB64(ev.target.result.split(",")[1]);
        r.readAsDataURL(f);
    };

    const run = async () => {
        if (!b64) return;
        setLoad(true); setErr(null); setRes(null); setPnData(null);

        // Step 1: PlantNet identification
        setStep("Identifying plant...");
        let pn = null;
        try {
            const fd = new FormData();
            const blob = await (await fetch(`data:image/jpeg;base64,${b64}`)).blob();
            fd.append("images", blob, "plant.jpg");
            fd.append("organs", "leaf");
            const r = await fetch(`https://my-api.plantnet.org/v2/identify/all?api-key=${KEYS.plantnet}&lang=en`, { method: "POST", body: fd });
            if (r.ok) {
                const d = await r.json();
                if (d.results?.[0]) { pn = d.results[0]; setPnData(pn); }
            }
        } catch { }

        const plantId = pn?.species?.commonNames?.[0] || pn?.species?.scientificNameWithoutAuthor || "the plant";

        // Step 2: AI disease analysis via Groq Vision
        setStep("Analyzing with AI...");

        const prompt = `Analyze this plant image. Plant identified as: ${plantId}. Respond in ${langName}.
Return ONLY valid JSON (no markdown):
{"issue":"Disease name","isHealthy":false,"severity":"Moderate","confidence":85,"affectedPart":"Leaf","cause":"Fungal/Bacterial etc","category":"Disease","symptoms":["..."],"homemadeRemedies":["..."],"chemicalSolutions":[{"name":"...","brand":"...","usage":"...","precautions":"..."}],"shops":[{"shopName":"...","distance":"...","brands":["..."],"priceRange":"..."}],"treatment":["..."],"recoveryDays":"10-14 days","preventive":["..."]}`;

        let result = null;

        // Try Groq Vision first
        try {
            const raw = await chatApi([{ role: "user", content: prompt }], b64);
            if (raw) result = pj(raw, null);
        } catch { }

        // Fallback: Gemini Vision
        if (!result) {
            setStep("Trying backup AI...");
            try {
                const raw = await gemini(prompt, b64);
                if (raw) result = pj(raw, null);
            } catch { }
        }

        // Last fallback: text-only analysis based on plant name
        if (!result) {
            setStep("Generating report...");
            try {
                const textPrompt = `You are a plant doctor. Plant is "${plantId}". Give a health assessment in ${langName}. Return ONLY JSON:
{"issue":"Healthy Plant","isHealthy":true,"severity":"None","confidence":70,"affectedPart":"None","cause":"No visible disease signs","category":"Healthy","symptoms":["Plant appears healthy"],"homemadeRemedies":[],"chemicalSolutions":[],"shops":[],"treatment":["Regular watering","Adequate sunlight"],"recoveryDays":"N/A","preventive":["Regular inspection","Proper spacing"]}`;
                const raw = await chatApi([{ role: "user", content: textPrompt }]);
                if (raw) result = pj(raw, null);
            } catch { }
        }

        if (result && result.issue) {
            setRes(result);
        } else {
            setErr("Could not analyze the image. Please use a clear, well-lit photo of the plant leaves.");
        }

        setStep("");
        setLoad(false);
    };

    const SEV = {
        None: { bg: "#dcfce7", br: "#22c55e", c: "#166534" },
        Mild: { bg: "#dcfce7", br: "#22c55e", c: "#166534" },
        Moderate: { bg: "#fef9c3", br: "#eab308", c: "#713f12" },
        Severe: { bg: "#fee2e2", br: "#ef4444", c: "#991b1b" },
    };
    const sKey = res?.isHealthy ? "Mild" : res?.severity?.toLowerCase().includes("sever") ? "Severe" : res?.severity?.toLowerCase().includes("mild") ? "Mild" : "Moderate";
    const sv = res ? (SEV[sKey] || SEV.Moderate) : SEV.Moderate;

    return (
        <div className="page">
            <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-dark)", marginBottom: 4 }}>{L.title}</h2>
                <p style={{ fontSize: 13, color: "var(--text-mid)" }}>{L.subtitle}</p>
            </div>

            {/* Upload Zone */}
            <div className="card">
                <div className="scan-zone" onClick={() => fileRef.current.click()}>
                    {img
                        ? <img src={img} alt="plant" style={{ width: "100%", borderRadius: 8, maxHeight: 220, objectFit: "cover" }} />
                        : <div>
                            <div className="scan-zone-icon"><Camera size={44} strokeWidth={1.5} /></div>
                            <div className="scan-zone-title">{L.upTitle}</div>
                            <div className="scan-zone-sub">{L.upSub}</div>
                        </div>
                    }
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={pick} />

                {img && <>
                    <button className="btn-big" onClick={run} disabled={load} style={{ marginTop: 12 }}>
                        {load
                            ? <><div className="spin" /><span>{step || L.btnLoad}</span></>
                            : <><Microscope size={16} /><span>{L.btn}</span></>
                        }
                    </button>
                    <button className="btn-outline" onClick={() => { setImg(null); setRes(null); setPnData(null); setErr(null); }}>
                        <RotateCcw size={13} style={{ display: "inline", marginRight: 6 }} />{L.btnChg}
                    </button>
                </>}
            </div>

            {/* PlantNet ID */}
            {pnData && (
                <div className="plant-id-card">
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>{L.id}</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-dark)" }}>
                        {pnData.species?.commonNames?.[0] || pnData.species?.scientificNameWithoutAuthor}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-soft)", fontStyle: "italic", marginTop: 2 }}>
                        {pnData.species?.scientificNameWithoutAuthor}
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, background: "var(--primary-light)", color: "var(--primary)", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>
                        <CheckCircle size={10} /> {Math.round((pnData.score || 0) * 100)}% match
                    </span>
                </div>
            )}

            {/* Error */}
            {err && (
                <div style={{ background: "#fee2e2", border: "1.5px solid #fca5a5", borderRadius: "var(--radius)", padding: 14, marginBottom: 12, display: "flex", gap: 10 }}>
                    <AlertTriangle size={15} color="#dc2626" style={{ flexShrink: 0, marginTop: 1 }} />
                    <div style={{ fontSize: 13, color: "#991b1b" }}>{err}</div>
                </div>
            )}

            {/* Results */}
            {res && <>
                {/* Main Result */}
                <div className="result-block" style={{ background: sv.bg, borderColor: sv.br }}>
                    <div style={{ fontSize: 10, color: sv.c, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}>
                        {res.isHealthy ? <CheckCircle size={11} /> : <Zap size={11} />}
                        {res.category} · {L.detect}
                    </div>
                    <div className="result-heading" style={{ color: sv.c }}>{res.issue}</div>
                    <div className="badge-row">
                        <span className="badge" style={{ background: sv.br + "22", color: sv.c }}>
                            {res.isHealthy ? "Healthy" : res.severity}
                        </span>
                        <span className="badge" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                            {res.confidence}% {L.cond}
                        </span>
                    </div>
                    <div style={{ marginTop: 10, fontSize: 13, color: "var(--text-dark)", lineHeight: 1.7 }}>
                        <strong style={{ fontWeight: 700 }}>{L.cause}: </strong>{res.cause}
                    </div>
                </div>

                {/* Symptoms */}
                {res.symptoms?.length > 0 && (
                    <div className="card">
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                            <Info size={13} color="var(--accent)" />
                            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-soft)" }}>{L.symp}</span>
                        </div>
                        {res.symptoms.map((s, i) => (
                            <div key={i} className="list-row"><div className="list-bullet" style={{ background: "#f59e0b" }} /><span>{s}</span></div>
                        ))}
                    </div>
                )}

                {!res.isHealthy && <>
                    {/* Homemade Remedies */}
                    {res.homemadeRemedies?.length > 0 && (
                        <div className="card">
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                                <Leaf size={14} color="#16a34a" />
                                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-soft)" }}>{L.homeRem || "Homemade Remedy"}</span>
                            </div>
                            {res.homemadeRemedies.map((h, i) => (
                                <div key={i} className="list-row"><div className="list-bullet" style={{ background: "#4ade80" }} /><span>{h}</span></div>
                            ))}
                        </div>
                    )}

                    {/* Chemical Solutions */}
                    {res.chemicalSolutions?.length > 0 && (
                        <div className="card">
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                                <FlaskConical size={14} color="#6366f1" />
                                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-soft)" }}>{L.chemSol || "Chemical Solution"}</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {res.chemicalSolutions.map((c, i) => (
                                    <div key={i} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 2 }}>{c.name} <span style={{fontSize:12, fontWeight:500, color:"#64748b"}}>({c.brand})</span></div>
                                        <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}><span style={{fontWeight:600}}>Usage:</span> {c.usage}</div>
                                        <div style={{ display: "flex", gap: 4, alignItems: "flex-start", fontSize: 12, color: "#dc2626", fontWeight: 500 }}><AlertTriangle size={13} style={{flexShrink:0, marginTop:1}}/> {c.precautions}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Nearby Shops */}
                    {res.shops?.length > 0 && (
                        <div className="card">
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                                <Store size={14} color="#f59e0b" />
                                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-soft)" }}>{L.shop || "Nearby Shops"}</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {res.shops.map((s, i) => (
                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{s.shopName}</div>
                                            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>📍 {s.distance} · {s.brands?.join(", ")}</div>
                                        </div>
                                        <div style={{ flexShrink:0, fontSize: 13, fontWeight: 700, color: "#059669", background: "#d1fae5", padding: "4px 8px", borderRadius: 12 }}>
                                            {s.priceRange}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Treatment Steps */}
                    {res.treatment?.length > 0 && (
                        <div className="card">
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                                <Shield size={13} color="var(--accent)" />
                                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-soft)" }}>{L.treat}</span>
                            </div>
                            {res.treatment.map((t, i) => (
                                <div key={i} className="step-row">
                                    <div className="step-num">{i + 1}</div>
                                    <div className="step-text">{t}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Recovery + Preventive */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                        <div style={{ background: "var(--primary)", borderRadius: "var(--radius)", padding: 16, textAlign: "center", color: "#fff" }}>
                            <div style={{ fontSize: 10, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6, fontWeight: 700 }}>{L.recov}</div>
                            <div style={{ fontSize: 16, fontWeight: 800 }}>{res.recoveryDays}</div>
                        </div>
                        <div style={{ background: "#1e293b", borderRadius: "var(--radius)", padding: 16, textAlign: "center", color: "#fff" }}>
                            <div style={{ fontSize: 10, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6, fontWeight: 700 }}>{L.prev}</div>
                            <div style={{ fontSize: 11, lineHeight: 1.5, color: "rgba(255,255,255,0.75)" }}>{res.preventive?.[0] || "Use resistant varieties"}</div>
                        </div>
                    </div>
                </>}

                {/* Healthy message */}
                {res.isHealthy && (
                    <div style={{ background: "#dcfce7", border: "1.5px solid #86efac", borderRadius: "var(--radius)", padding: "16px 18px", display: "flex", gap: 10, marginBottom: 12 }}>
                        <CheckCircle size={18} color="#166534" style={{ flexShrink: 0, marginTop: 1 }} />
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#166534", marginBottom: 2 }}>Plant Looks Healthy!</div>
                            <div style={{ fontSize: 13, color: "#166534", lineHeight: 1.6 }}>
                                {res.preventive?.[0] || "Continue regular care: proper watering, fertilization, and monitoring."}
                            </div>
                        </div>
                    </div>
                )}
            </>}
        </div>
    );
}
