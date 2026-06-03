const key = "xai-3TWdrOchKXPputuujiU0RtE5eFYRXetfPeWXx9k4hu2PyPNwbwQoGHmT3fCHmkXI91pxRgvt5YZuJAPi";

async function testXAIVision() {
    try {
        const res = await fetch("https://api.x.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`
            },
            body: JSON.stringify({
                model: "grok-2-vision-1212",
                messages: [{
                    role: "user",
                    content: [
                        { type: "text", text: "What is this? Reply short." },
                        { type: "image_url", image_url: { url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=" } }
                    ]
                }]
            })
        });

        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error:", err);
    }
}
testXAIVision();
