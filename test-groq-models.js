import fetch from 'node-fetch';
import { KEYS } from './src/config/keys.js';

fetch("https://api.groq.com/openai/v1/models", {
    headers: { "Authorization": `Bearer ${KEYS.groq}` }
})
    .then(r => r.json())
    .then(d => {
        const visionModels = d.data?.filter(m => m.id.includes('vision')) || [];
        console.log("Vision Models:", visionModels.map(m => m.id));
    });
