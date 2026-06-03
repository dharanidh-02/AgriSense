import fs from 'fs';
import { KEYS } from './src/config/keys.js';

async function testGroqVision() {
    try {
        console.log("Testing Groq Vision...");

        // Dummy 1x1 png base64
        const dummyBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${KEYS.groq}`
            },
            body: JSON.stringify({
                model: "llama-3.2-11b-vision-preview",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "What is this image? Reply in 5 words." },
                            { type: "image_url", image_url: { url: `data:image/png;base64,${dummyBase64}` } }
                        ]
                    }
                ]
            })
        });

        console.log("Status:", response.status);
        if (!response.ok) {
            const err = await response.text();
            console.error("Error Text:", err);
            return;
        }

        const data = await response.json();
        console.log("Success:", data.choices[0].message.content);
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

testGroqVision();
