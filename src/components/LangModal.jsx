import React from 'react';
import { LANG_CONFIG } from '../config/langConfig';

export default function LangModal({ currentLang, onSelect, onClose }) {
    const L = LANG_CONFIG[currentLang] || LANG_CONFIG.en;

    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 300, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
            <div style={{ background: "#fff", borderRadius: "28px 28px 0 0", padding: "24px 20px 36px", width: "100%", maxWidth: 430, margin: "0 auto" }} onClick={e => e.stopPropagation()}>
                <div style={{ width: 40, height: 4, background: "#d4e8d8", borderRadius: 4, margin: "0 auto 20px" }} />
                <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 20, fontWeight: 900, color: "#1a2e1e", marginBottom: 6, textAlign: "center" }}>🌐 {L.voice.changeLang || "Language"}</div>
                <div style={{ fontSize: 14, color: "#7a9a7e", textAlign: "center", marginBottom: 20, fontWeight: 600 }}>Select your language / अपनी भाषा चुनें</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {["ta", "hi", "te", "kn", "ml", "en"].map(code => {
                        const l = LANG_CONFIG[code];
                        const active = currentLang === code;
                        return (
                            <div key={code} onClick={() => onSelect(code)} style={{
                                background: active ? "#1e7a3e" : "#f5f7f5",
                                border: `3px solid ${active ? "#1e7a3e" : "#d4e8d8"}`,
                                borderRadius: 16, padding: "16px 14px", cursor: "pointer",
                                display: "flex", alignItems: "center", gap: 10,
                                transition: "all 0.15s",
                            }}>
                                <div style={{ fontSize: 28 }}>{l.flag}</div>
                                <div>
                                    <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 18, fontWeight: 900, color: active ? "#fff" : "#1a2e1e" }}>{l.label}</div>
                                    {active && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 700, marginTop: 2 }}>✓ Selected</div>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
