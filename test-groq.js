import { KEYS } from './src/config/keys.js';

fetch("https://api.groq.com/openai/v1/models", {
    headers: { "Authorization": `Bearer ${KEYS.groq}` }
})
    .then(r => r.json())
    .then(d => {
        // Check if *any* vision models exist
        const allModels = d.data?.map(m => m.id) || [];
        console.log("All Models:", allModels.filter(m => m.includes('vision') || m.includes('llava')));
    }).catch(console.error);
