const key = "AIzaSyD8Xie5or7qIawmZCmgflAuAj0JkPZZyHk";

async function testGem() {
    const body = {
        contents: [
            { role: "user", parts: [{ text: "Say hello!" }] }
        ],
        systemInstruction: { parts: [{ text: "You are a farmer assistant." }] }
    };

    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error:", err);
    }
}

testGem();
