const key = "xai-3TWdrOchKXPputuujiU0RtE5eFYRXetfPeWXx9k4hu2PyPNwbwQoGHmT3fCHmkXI91pxRgvt5YZuJAPi";

async function testXAI() {
    try {
        const res = await fetch("https://api.x.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`
            },
            body: JSON.stringify({
                model: "grok-4-latest",
                messages: [{ role: "system", content: "You are a test assistant." }, { role: "user", content: "Testing. Just say hi and hello world and nothing else." }],
                stream: false,
                temperature: 0
            })
        });

        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error:", err);
    }
}

testXAI();
