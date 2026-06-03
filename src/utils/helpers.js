/* pj: parse JSON with fallback */
export const pj = (s, fb) => {
    if (!s) return fb;
    try { return JSON.parse(s); } catch { }
    // Try stripping markdown fences
    try {
        const clean = s.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
        return JSON.parse(clean);
    } catch { }
    // Extract first JSON object/array block
    const match = s.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) { try { return JSON.parse(match[1]); } catch { } }
    return fb;
};
