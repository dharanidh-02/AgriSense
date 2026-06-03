import React, { useState, useEffect } from 'react';
import './index.css';
import { KEYS } from './config/keys';
import { LANG_CONFIG } from './config/langConfig';
import LangModal from './components/LangModal';
import { Home, Layers, Sprout, ScanLine, BarChart2, Mic, Thermometer, Leaf, Globe, Landmark } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import Soil from './pages/Soil';
import CropsPage from './pages/CropsPage';
import Scan from './pages/Scan';
import Market from './pages/Market';
import Voice from './pages/Voice';
import Landing from './pages/Landing';
import Schemes from './pages/Schemes';

const TABS = [
    { id: "home", Icon: Home },
    { id: "soil", Icon: Layers },
    { id: "crops", Icon: Sprout },
    { id: "scan", Icon: ScanLine },
    { id: "market", Icon: BarChart2 },
    { id: "schemes", Icon: Landmark },
    { id: "voice", Icon: Mic },
];

export default function App() {
    const [showLanding, setShowLanding] = useState(true);
    const [tab, setTab] = useState("home");
    const [appLang, setAppLang] = useState("ta");
    const [showLangModal, setShowLangModal] = useState(false);
    const [wx, setWx] = useState(null);
    const [wxLoad, setWxLoad] = useState(true);

    const L = LANG_CONFIG[appLang];

    useEffect(() => {
        (async () => {
            try {
                // Free tier only supports 3 days of forecast
                const r = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEYS.weather}&q=Chennai,India&days=3&aqi=no&alerts=yes`);
                if (r.ok) {
                    setWx(await r.json());
                } else {
                    throw new Error("Weather API Unauthorized/Forbidden");
                }
            } catch {
                // Fallback mock weather for demo or invalid key scenarios
                setWx({
                    location: { name: "Chennai", region: "Tamil Nadu", country: "India" },
                    current: { temp_c: 32.5, condition: { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" }, humidity: 62, wind_kph: 14.5 },
                    forecast: { forecastday: [
                        { date: "Day 1", day: { maxtemp_c: 34, mintemp_c: 26, condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" }, daily_chance_of_rain: 10 } },
                        { date: "Day 2", day: { maxtemp_c: 33, mintemp_c: 25, condition: { text: "Cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/119.png" }, daily_chance_of_rain: 40 } },
                        { date: "Day 3", day: { maxtemp_c: 31, mintemp_c: 25, condition: { text: "Patchy rain", icon: "//cdn.weatherapi.com/weather/64x64/day/176.png" }, daily_chance_of_rain: 75 } }
                    ]}
                });
            }
            setWxLoad(false);
        })();
    }, []);

    const temp = wx ? `${Math.round(wx.current.temp_c)}°C` : null;

    const pages = {
        home: <Dashboard wx={wx} wxLoading={wxLoad} lang={appLang} />,
        soil: <Soil lang={appLang} />,
        crops: <CropsPage lang={appLang} />,
        scan: <Scan lang={appLang} />,
        market: <Market lang={appLang} />,
        schemes: <Schemes lang={appLang} />,
        voice: <Voice lang={appLang} onChangeLang={() => setShowLangModal(true)} />,
    };

    if (showLanding) {
        return <Landing onStart={() => setShowLanding(false)} />;
    }

    return (
        <div className="app">
            {showLangModal && (
                <LangModal
                    currentLang={appLang}
                    onSelect={code => { setAppLang(code); setShowLangModal(false); }}
                    onClose={() => setShowLangModal(false)}
                />
            )}

            {/* TOP BAR */}
            <div className="topbar">
                <div className="topbar-brand">
                    <div className="topbar-icon">
                        <Leaf size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                        <div className="topbar-name">AgriSense</div>
                        <div className="topbar-tagline">{L.voice.farmAssistant}</div>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => setShowLangModal(true)} style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: 20, padding: "5px 11px",
                        display: "flex", alignItems: "center", gap: 5,
                        fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
                        color: "#fff", cursor: "pointer",
                    }}>
                        <Globe size={13} /> {L.label}
                    </button>
                    {temp && (
                        <div className="topbar-weather">
                            <Thermometer size={13} /> {temp}
                        </div>
                    )}
                </div>
            </div>

            {/* PAGE CONTENT */}
            <div key={`${tab}-${appLang}`}>{pages[tab]}</div>

            {/* BOTTOM NAV */}
            <nav className="bottom-nav">
                {TABS.map(({ id, Icon }) => (
                    <button key={id} className={`nav-btn${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
                        <span className="nav-icon">
                            <Icon size={20} strokeWidth={tab === id ? 2.5 : 1.8} />
                        </span>
                        <span>{L.nav[id]}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
