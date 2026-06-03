import { chatApi } from './api';

export async function getDashboardData(weather, soil, lang) {
    if (!weather) return null;

    const wxSummary = {
        temp: weather.current?.temp_c,
        humid: weather.current?.humidity,
        wind: weather.current?.wind_kph,
        rain: weather.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain || 0,
        condition: weather.current?.condition?.text
    };

    const langName = lang === 'ta' ? 'Tamil' : lang === 'te' ? 'Telugu' : lang === 'hi' ? 'Hindi' : lang === 'ml' ? 'Malayalam' : lang === 'kn' ? 'Kannada' : 'English';

    const prompt = `You are an expert Indian agricultural AI. Analyze this data and generate a dashboard JSON.
Weather: temp=${wxSummary.temp}C, humidity=${wxSummary.humid}%, rain_chance=${wxSummary.rain}%, condition="${wxSummary.condition}"
Soil: pH=${soil.pH}, N=${soil.nitrogen}, P=${soil.phosphorus}, K=${soil.potassium}, moisture=${soil.moisture}%, type="${soil.type}"
Language for text fields: ${langName}

Return ONLY this JSON (no markdown, no explanation):
{"crops":[{"n":"LocalName | EnglishName","s":"Season","pct":85,"c":"#198754"},{"n":"LocalName | EnglishName","s":"Season","pct":74,"c":"#d97706"},{"n":"LocalName | EnglishName","s":"Season","pct":62,"c":"#0284c7"}],"tiles":{"risk":{"val":"18\\nLow","sub":"Stable conditions","bg":"#dcfce7","vc":"#166534","bc":"#86efac"},"profit":{"val":"₹48K","sub":"Expected this season","bg":"#fef9c3","vc":"#713f12","bc":"#fde047"},"pest":{"val":"None","sub":"No alerts","bg":"#dcfce7","vc":"#166534","bc":"#86efac"},"water":{"val":"22mm","sub":"Next 3 days","bg":"#e0f2fe","vc":"#0c4a6e","bc":"#7dd3fc"}},"advisory":"One practical farming tip in ${langName}."}`;

    try {
        let result = await chatApi([{ role: "user", content: prompt }]);
        result = result.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
        const parsed = JSON.parse(result);
        parsed.isLive = true;
        return parsed;
    } catch (e) {
        console.error("Decision Engine Error:", e);
        return null;
    }
}
