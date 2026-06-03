import { KEYS } from '../config/keys';

/* ─────────────────────────────────────────────
   Safe JSON extractor — handles partial JSON and
   markdown code fences returned by LLMs
────────────────────────────────────────────── */
function extractJSON(text) {
    if (!text) return null;
    // Strip markdown fences
    let s = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
    // Try direct parse
    try { return JSON.parse(s); } catch { }
    // Extract first {...} or [...] block from the text
    const match = s.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) { try { return JSON.parse(match[1]); } catch { } }
    return null;
}

/* ── Groq — used for vision (plant scan) with image ── */
export async function gemini(prompt, imgB64 = null) {
    try {
        // Groq supports vision via llama-4-scout-17b-16e-instruct
        const content = imgB64
            ? [
                { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imgB64}` } },
                { type: "text", text: prompt }
              ]
            : [{ type: "text", text: prompt }];

        const payload = {
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [{ role: "user", content }],
            max_tokens: 4096,
            temperature: 0.7,
            stream: false
        };

        const r = await fetch("/api/groq/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${KEYS.groq}`
            },
            body: JSON.stringify(payload)
        });

        if (!r.ok) {
            const err = await r.text();
            throw new Error(`Groq API Error: ${err}`);
        }

        const d = await r.json();
        const text = (d?.choices?.[0]?.message?.content || "").replace(/```json|```/g, "").trim();
        if (!text) throw new Error("Groq API returned empty text");
        return text;
    } catch (e) {
        console.error("Groq vision error:", e);
        throw e;
    }
}

/* ── Chat API — Groq ── */
export async function chatApi(messages, imgB64 = null) {
    try {
        let finalMessages = [];

        messages.forEach(m => {
            if (m === messages[messages.length - 1] && imgB64) {
                const textStr = typeof m.content === 'string' ? m.content : JSON.stringify(m.content);
                finalMessages.push({
                    role: m.role,
                    content: [
                        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imgB64}` } },
                        { type: "text", text: textStr }
                    ]
                });
            } else {
                finalMessages.push({
                    role: m.role,
                    content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
                });
            }
        });

        // Use llama-4-scout for vision, llama-3.3-70b for chat
        const hasVision = imgB64 != null;
        const model = hasVision
            ? "meta-llama/llama-4-scout-17b-16e-instruct"
            : "llama-3.3-70b-versatile";

        const payload = {
            model,
            messages: finalMessages,
            max_tokens: 4096,
            temperature: 0.7,
            stream: false
        };

        const r = await fetch("/api/groq/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${KEYS.groq}`
            },
            body: JSON.stringify(payload)
        });

        if (!r.ok) {
            const err = await r.text();
            console.error("Chat API error:", r.status, err);
            return "";
        }
        const d = await r.json();
        return d?.choices?.[0]?.message?.content?.trim() || "";
    } catch (e) {
        console.error("Chat fetch error:", e);
        return "";
    }
}

/* Re-export extractJSON for components that need it */
export { extractJSON };
