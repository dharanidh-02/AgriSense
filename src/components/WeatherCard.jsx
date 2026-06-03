import React from 'react';
import { LANG_CONFIG } from '../config/langConfig';

const wxIcon = t => {
    if (!t) return "🌤️";
    if (t.includes("Sun") || t.includes("Clear")) return "☀️";
    if (t.includes("Part")) return "⛅";
    if (t.includes("Cloud") || t.includes("Over")) return "☁️";
    if (t.includes("Mist") || t.includes("Fog")) return "🌫️";
    if (t.includes("Thunder") || t.includes("Storm")) return "⛈️";
    if (t.includes("Snow")) return "❄️";
    if (t.includes("Rain") || t.includes("Drizzle")) return "🌧️";
    return "🌤️";
};

export default function WeatherCard({ wx, loading, lang }) {
    const L = LANG_CONFIG[lang].wx;

    if (loading) return (
        <div className="wx-big">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><div className="skel" style={{ width: 120, height: 64, marginBottom: 8 }} /><div className="skel" style={{ width: 150, height: 18 }} /></div>
                <div className="skel" style={{ width: 64, height: 64, borderRadius: 12 }} />
            </div>
        </div>
    );
    if (!wx) return (
        <div className="wx-big"><p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600 }}>{L.na}</p></div>
    );

    const c = wx.current, fc = wx.forecast?.forecastday || [], loc = wx.location;

    return (
        <div className="wx-big">
            <div className="wx-temp-row">
                <div>
                    <div className="wx-loc">📍 {loc.name}, {loc.region}</div>
                    <div className="wx-temp">{Math.round(c.temp_c)}°C</div>
                    <div className="wx-cond">{c.condition.text}</div>
                </div>
                <div className="wx-emoji">{wxIcon(c.condition.text)}</div>
            </div>
            <div className="wx-pills">
                <div className="wx-pill">💧 {c.humidity}%</div>
                <div className="wx-pill">💨 {c.wind_kph} km/h</div>
                <div className="wx-pill">🌡️ {L.feels} {Math.round(c.feelslike_c)}°C</div>
            </div>
            {fc.length > 0 && (
                <div className="fc-row">
                    {fc.map((d, i) => (
                        <div key={i} className="fc-day">
                            <div className="fc-day-name">{i === 0 ? L.today : new Date(d.date).toLocaleDateString("en", { weekday: "short" })}</div>
                            <div style={{ fontSize: 20 }}>{wxIcon(d.day.condition.text)}</div>
                            <div className="fc-day-temp">{Math.round(d.day.maxtemp_c)}°/{Math.round(d.day.mintemp_c)}°</div>
                            <div className="fc-day-rain">🌧 {d.day.daily_chance_of_rain}%</div>
                        </div>
                    ))}
                </div>
            )}
            {c.precip_mm > 0.5 && <div className="wx-warn">{L.rainW}</div>}
            {c.temp_c > 38 && <div className="wx-warn" style={{ marginTop: 8 }}>{L.heatW}</div>}
            {wx.alerts && wx.alerts.alert && wx.alerts.alert.length > 0 && wx.alerts.alert.map((al, idx) => (
                <div key={`al-${idx}`} className="wx-warn" style={{ marginTop: 8, background: '#fee', color: '#c0392b', border: '1px solid #f5b7b1' }}>
                    ⚠️ {al.event}
                </div>
            ))}
        </div>
    );
}
