import React, { useState, useRef, useEffect } from 'react';
import { chatApi } from '../utils/api';
import { LANG_CONFIG } from '../config/langConfig';
import {
    Mic, MicOff, Send, Bot, Globe, MessageSquare,
    Volume2, VolumeX, User, Wheat, Leaf, CloudRain,
    ShoppingCart, Bug, Droplets, RotateCcw
} from 'lucide-react';

const QUICK_ICONS = [Wheat, Leaf, Bug, CloudRain, Droplets, ShoppingCart];

export default function Voice({ lang, onChangeLang }) {
    const Lcfg = LANG_CONFIG[lang];
    const L = Lcfg.voice;

    const [voiceStatus, setVoiceStatus] = useState("idle"); // idle | starting | listening | error
    const [inp, setInp] = useState("");
    const [chat, setChat] = useState([{ role: "ai", text: L.welcome }]);
    const [load, setLoad] = useState(false);
    const [muted, setMuted] = useState(false);
    const chatRef = useRef();
    const inputRef = useRef();
    const recognitionRef = useRef(null);
    const silenceTimer = useRef(null);

    useEffect(() => { setChat([{ role: "ai", text: L.welcome }]); }, [lang]);
    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [chat, load]);
    useEffect(() => () => {
        if (recognitionRef.current) try { recognitionRef.current.abort(); } catch { }
        if (silenceTimer.current) clearTimeout(silenceTimer.current);
        window.speechSynthesis?.cancel();
    }, []);

    const speak = (text) => {
        if (!window.speechSynthesis || muted) return;
        window.speechSynthesis.cancel();
        const clean = text.replace(/[*#_`]/g, '');
        const u = new SpeechSynthesisUtterance(clean);
        u.lang = Lcfg.bcp; u.rate = 0.88; u.pitch = 1.05; u.volume = 1;
        const voices = window.speechSynthesis.getVoices();
        const bcpPrefix = Lcfg.bcp.split("-")[0];
        const match = voices.find(v => v.lang === Lcfg.bcp) || voices.find(v => v.lang.startsWith(bcpPrefix));
        if (match) u.voice = match;
        window.speechSynthesis.speak(u);
    };

    const sendMessage = async (msg) => {
        const text = (msg || "").trim();
        if (!text || load) return;
        setChat(c => [...c, { role: "user", text }]);
        setInp("");
        setLoad(true);
        const langName = lang === 'ta' ? 'Tamil' : lang === 'te' ? 'Telugu' : lang === 'hi' ? 'Hindi' : lang === 'ml' ? 'Malayalam' : lang === 'kn' ? 'Kannada' : 'English';
        const system = {
            role: "system",
            content: `You are AgriSense, a friendly AI farming assistant for Indian rural farmers. Always respond ONLY in ${langName}. Use simple words a farmer understands. Be warm and practical. Give specific actionable advice. Keep responses under 90 words. Cover topics like crops, soil, pests, weather, fertilizers, market prices, irrigation.`
        };
        const history = chat.slice(-8).map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));
        try {
            const reply = await chatApi([system, ...history, { role: "user", content: text }]);
            setChat(c => [...c, { role: "ai", text: reply || L.voiceError }]);
            speak(reply);
        } catch {
            setChat(c => [...c, { role: "ai", text: L.voiceError }]);
        }
        setLoad(false);
    };

    const startVoice = () => {
        window.speechSynthesis?.cancel();
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) { setChat(c => [...c, { role: "ai", text: L.voiceNotSupported }]); return; }
        if (recognitionRef.current) { try { recognitionRef.current.abort(); } catch { } recognitionRef.current = null; }
        setVoiceStatus("starting");
        const r = new SR();
        r.lang = Lcfg.bcp; r.continuous = false; r.interimResults = false; r.maxAlternatives = 1;
        r.onstart = () => { setVoiceStatus("listening"); silenceTimer.current = setTimeout(() => { try { r.stop(); } catch { } }, 8000); };
        r.onresult = (e) => { clearTimeout(silenceTimer.current); const t = e.results[0][0].transcript; setVoiceStatus("idle"); if (t.trim()) sendMessage(t); };
        r.onerror = (e) => {
            clearTimeout(silenceTimer.current); setVoiceStatus("error"); setTimeout(() => setVoiceStatus("idle"), 2500);
            if (e.error !== "aborted" && e.error !== "no-speech") {
                const msg = e.error === "not-allowed" ? "Microphone access blocked. Please allow in browser settings." : e.error === "network" ? "Network error. Chrome needs internet for voice." : `Voice error: ${e.error}`;
                setChat(c => [...c, { role: "ai", text: msg }]);
            }
        };
        r.onend = () => { clearTimeout(silenceTimer.current); setVoiceStatus(s => s === "listening" ? "idle" : s); };
        recognitionRef.current = r;
        try { r.start(); } catch { setVoiceStatus("idle"); setChat(c => [...c, { role: "ai", text: L.voiceNotSupported }]); }
    };

    const stopVoice = () => {
        if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch { } recognitionRef.current = null; }
        clearTimeout(silenceTimer.current); setVoiceStatus("idle");
    };

    const listening = voiceStatus === "listening";
    const MicBtn = listening
        ? { bg: "#dc2626", shadow: "0 0 0 8px rgba(220,38,38,0.15), 0 4px 15px rgba(220,38,38,0.3)", label: L.tapStop }
        : voiceStatus === "starting"
            ? { bg: "#d97706", shadow: "0 4px 15px rgba(217,119,6,0.3)", label: L.start }
            : voiceStatus === "error"
                ? { bg: "#7c3aed", shadow: "0 4px 15px rgba(124,58,237,0.3)", label: L.voiceError }
                : { bg: "var(--primary)", shadow: "0 4px 15px rgba(15,81,50,0.3)", label: L.tapSpeak };

    return (
        <div className="page" style={{ display: "flex", flexDirection: "column", gap: 0, paddingBottom: 110 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-dark)", marginBottom: 2 }}>{L.title}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-soft)", fontWeight: 500 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                        Groq Llama-3 · Multilingual
                    </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setMuted(m => !m)} style={{ width: 36, height: 36, borderRadius: 8, background: muted ? "#fee2e2" : "var(--primary-pale)", border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        {muted ? <VolumeX size={16} color="#dc2626" /> : <Volume2 size={16} color="var(--primary)" />}
                    </button>
                    <button onClick={onChangeLang} style={{ height: 36, borderRadius: 8, background: "var(--primary-pale)", border: "1.5px solid var(--accent-light)", padding: "0 12px", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: "var(--primary)", cursor: "pointer" }}>
                        <Globe size={13} /> {L.changeLang}
                    </button>
                </div>
            </div>

            {/* Chat Messages */}
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 10 }}>
                <div ref={chatRef} style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 340, overflowY: "auto", padding: "14px 14px 10px", background: "#f8fafc" }}>
                    {chat.map((m, i) => (
                        <div key={i} style={{
                            display: "flex", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-end"
                        }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: m.role === "user" ? "var(--primary)" : "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {m.role === "user" ? <User size={13} color="#fff" /> : <Bot size={13} color="#22c55e" />}
                            </div>
                            <div style={{
                                maxWidth: "78%",
                                background: m.role === "user" ? "var(--primary)" : "#fff",
                                color: m.role === "user" ? "#fff" : "var(--text-dark)",
                                border: m.role === "user" ? "none" : "1px solid var(--border)",
                                borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                                padding: "9px 13px",
                                fontSize: 14, fontWeight: 400, lineHeight: 1.6,
                                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                            }}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {load && (
                        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Bot size={13} color="#22c55e" />
                            </div>
                            <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "14px 14px 14px 4px", padding: "12px 16px", display: "flex", gap: 4 }}>
                                {[0, 0.2, 0.4].map((d, i) => (
                                    <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-soft)", animation: `bounce 1s ${d}s infinite` }} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Bar */}
                <div style={{ padding: "10px 12px 12px", borderTop: "1px solid var(--border)", background: "#fff", display: "flex", gap: 8 }}>
                    <input
                        ref={inputRef}
                        className="field-input"
                        style={{ flex: 1, margin: 0, padding: "10px 14px" }}
                        placeholder={L.typeHere}
                        value={inp}
                        onChange={e => setInp(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && !load && sendMessage(inp)}
                    />
                    <button
                        onClick={() => sendMessage(inp)}
                        disabled={load || !inp.trim()}
                        style={{
                            width: 42, height: 42, borderRadius: 8, border: "none",
                            background: inp.trim() && !load ? "var(--primary)" : "var(--border)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: inp.trim() && !load ? "pointer" : "default", flexShrink: 0,
                            transition: "background 0.15s",
                        }}
                    >
                        <Send size={16} color={inp.trim() && !load ? "#fff" : "var(--text-soft)"} />
                    </button>
                </div>
            </div>

            {/* Voice Button */}
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "20px 16px", marginBottom: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <button
                        onClick={listening ? stopVoice : startVoice}
                        style={{
                            width: 90, height: 90, borderRadius: "50%", border: "none",
                            background: MicBtn.bg, boxShadow: MicBtn.shadow,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "all 0.2s",
                            animation: listening ? "orbpulse 1.2s infinite" : "none",
                        }}
                    >
                        {listening ? <MicOff size={32} color="#fff" /> : <Mic size={32} color="#fff" />}
                    </button>
                    <div style={{ fontSize: 13, fontWeight: 600, color: listening ? "#dc2626" : "var(--text-mid)", textAlign: "center" }}>
                        {MicBtn.label}
                    </div>

                    {/* Waveform animation while listening */}
                    {listening && (
                        <div style={{ display: "flex", gap: 3, height: 28, alignItems: "center" }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                                <div key={i} style={{
                                    width: 3, borderRadius: 2, background: "#dc2626",
                                    animation: `wave 0.8s ${i * 0.1}s infinite ease-in-out`,
                                    height: `${12 + Math.random() * 16}px`,
                                }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Questions */}
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "14px 14px 8px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>{L.quickTitle}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {(L.quickQ || []).map((q, i) => {
                        const Icon = QUICK_ICONS[i % QUICK_ICONS.length];
                        return (
                            <button key={q} onClick={() => !load && sendMessage(q)} disabled={load} style={{
                                display: "flex", alignItems: "center", gap: 5,
                                background: "var(--primary-pale)", border: "1.5px solid var(--border)",
                                borderRadius: 20, padding: "6px 12px",
                                fontSize: 12, fontWeight: 600, color: "var(--primary)",
                                cursor: load ? "default" : "pointer", opacity: load ? 0.6 : 1,
                                transition: "all 0.15s",
                            }}>
                                <Icon size={11} /> {q}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Clear chat */}
            <button onClick={() => setChat([{ role: "ai", text: L.welcome }])} style={{
                marginTop: 8, background: "none", border: "none", cursor: "pointer",
                color: "var(--text-soft)", fontSize: 12, fontWeight: 600, display: "flex",
                alignItems: "center", gap: 4, justifyContent: "center",
            }}>
                <RotateCcw size={11} /> Clear conversation
            </button>

            <style>{`
                @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
                @keyframes wave { 0%,100%{height:6px} 50%{height:22px} }
                @keyframes orbpulse { 0%,100%{box-shadow: 0 0 0 8px rgba(220,38,38,0.15)} 50%{box-shadow: 0 0 0 16px rgba(220,38,38,0.08)} }
            `}</style>
        </div>
    );
}
