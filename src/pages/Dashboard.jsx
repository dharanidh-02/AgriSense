import React, { useState, useEffect } from 'react';
import { LANG_CONFIG } from '../config/langConfig';
import WeatherCard from '../components/WeatherCard';
import { getDashboardData } from '../utils/decisionEngine';
import { AlertTriangle, Droplets, Bug, TrendingUp, Leaf, Wifi, WifiOff } from 'lucide-react';

export default function Dashboard({ wx, wxLoading, lang }) {
    const L = LANG_CONFIG[lang].dash;
    const LGreet = LANG_CONFIG[lang].voice.greeting;
    const hr = new Date().getHours();
    const greet = hr < 12 ? LGreet[0] : hr < 17 ? LGreet[1] : LGreet[2];

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let interval;
        const fetchData = async () => {
            setLoading(true);
            const soilData = JSON.parse(localStorage.getItem('agrisense_soil')) || { type: "Clay", pH: 6.5, moisture: 40, nitrogen: 45, phosphorus: 20, potassium: 30 };
            const result = await getDashboardData(wx, soilData, lang);
            if (result) setData(result);
            setLoading(false);
        };

        if (wx && !wxLoading) {
            fetchData();
            interval = setInterval(fetchData, 10 * 60 * 1000);
        }
        return () => clearInterval(interval);
    }, [wx, wxLoading, lang]);

    const crops = data?.crops || [
        { n: "நெல் | Paddy", s: "Kharif", pct: 88, c: "#198754" },
        { n: "நிலக்கடலை | Groundnut", s: "Rabi", pct: 76, c: "#d97706" },
        { n: "மக்காச்சோளம் | Maize", s: "Kharif", pct: 68, c: "#0284c7" },
    ];

    const TILE_ICONS = {
        risk: <AlertTriangle size={18} />,
        profit: <TrendingUp size={18} />,
        pest: <Bug size={18} />,
        water: <Droplets size={18} />,
    };

    const fallbackTiles = [
        { id: "risk", val: "—\n—", name: L.rRisk, sub: L.rRiskSub, bg: "#f8fafc", vc: "#64748b", bc: "#e2e8f0" },
        { id: "profit", val: "—", name: L.rProf, sub: L.rProfSub, bg: "#f8fafc", vc: "#64748b", bc: "#e2e8f0" },
        { id: "pest", val: "—", name: L.rPest, sub: L.rPestSub, bg: "#f8fafc", vc: "#64748b", bc: "#e2e8f0" },
        { id: "water", val: "—", name: L.rWater, sub: L.rWaterSub, bg: "#f8fafc", vc: "#64748b", bc: "#e2e8f0" },
    ];

    const tiles = fallbackTiles.map(ft => {
        if (data?.tiles?.[ft.id]) return { ...ft, ...data.tiles[ft.id] };
        return ft;
    });

    const advisoryText = data?.advisory || (lang === "en" ? "Loading farm recommendations..." : "பரிந்துரைகள் ஏற்றப்படுகின்றன...");

    return (
        <div className="page">
            {/* HEADER CARD */}
            <div className="card-green" style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 600, marginBottom: 4, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                            {L.live} · Tamil Nadu
                        </div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>{greet}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{L.farmer}</div>
                    </div>
                    <div>
                        {loading ? (
                            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "4px 10px" }}>
                                <div className="spin" style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>UPDATING</span>
                            </div>
                        ) : data?.isLive ? (
                            <span className="live-badge"><Wifi size={9} /> LIVE</span>
                        ) : (
                            <span className="cached-badge"><WifiOff size={9} /> CACHED</span>
                        )}
                    </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                    {[
                        ["Temp", wx ? `${Math.round(wx.current.temp_c)}°` : "—"],
                        ["Humid", wx ? `${wx.current.humidity}%` : "—"],
                        ["Rain", wx ? `${wx.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain ?? 0}%` : "—"],
                    ].map(([l, v]) => (
                        <div key={l} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 6px", textAlign: "center" }}>
                            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{v}</div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.4px" }}>{l}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WEATHER */}
            <div className="section-title" style={{ marginTop: 0 }}>{L.wxTitle}</div>
            <WeatherCard wx={wx} loading={wxLoading} lang={lang} />

            {/* FARM OVERVIEW */}
            <div className="section-title">{L.farmTitle}</div>
            <div className="stat-grid">
                {tiles.map(t => (
                    <div key={t.id} className="stat-tile" style={{ background: t.bg, borderColor: t.bc }}>
                        <div className="stat-icon" style={{ color: t.vc }}>{TILE_ICONS[t.id]}</div>
                        <div>
                            <div className="stat-val" style={{ color: t.vc, whiteSpace: "pre-line", fontSize: t.val.includes("\n") ? 16 : 22 }}>{t.val}</div>
                            <div className="stat-name" style={{ color: t.vc }}>{t.name}</div>
                            <div className="stat-sub" style={{ color: t.vc }}>{t.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* TOP CROPS */}
            <div className="section-title">{L.cropTitle}</div>
            {crops.map(cr => {
                const cname = cr.n.split(" | ");
                const dname = lang === "en" ? (cname[1] || cname[0]) : (cname[0] || cr.n);
                return (
                    <div key={cr.n} className="crop-rec">
                        <div className="crop-rec-icon" style={{ background: cr.c + "18" }}>
                            <Leaf size={22} color={cr.c} />
                        </div>
                        <div className="crop-rec-info">
                            <div className="crop-rec-name">{dname}</div>
                            <div className="crop-rec-meta">Season: {cr.s}</div>
                            <div className="crop-bar">
                                <div className="crop-bar-fill" style={{ width: `${cr.pct}%`, background: cr.c }} />
                            </div>
                        </div>
                        <div className="crop-rec-score" style={{ color: cr.c }}>{cr.pct}%</div>
                    </div>
                );
            })}

            {/* ADVISORY */}
            <div className="advisory">
                <div className="advisory-icon"><AlertTriangle size={16} /></div>
                <div>
                    <div className="advisory-title">{L.advTitle}</div>
                    <div className="advisory-text">{advisoryText}</div>
                </div>
            </div>
        </div>
    );
}
