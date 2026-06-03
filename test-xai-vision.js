import fs from 'fs';
import { KEYS } from './src/config/keys.js';

async function testXAIVision() {
    try {
        console.log("Testing xAI Vision with key:", KEYS.xai.slice(0, 5) + "...");

        // Use a dummy base64 string for testing
        const dummyBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

        const response = await fetch("https://api.x.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${KEYS.xai}`
            },
            body: JSON.stringify({
                model: "grok-2-vision-1212",
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

testXAIVision();
