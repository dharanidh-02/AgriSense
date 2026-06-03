const key = "AIzaSyD8Xie5or7qIawmZCmgflAuAj0JkPZZyHk";

async function listModels() {
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await res.json();
        console.log("Models:", data.models?.map(m => m.name).join("\n"));
    } catch (err) {
        console.error("Error:", err);
    }
}

listModels();
