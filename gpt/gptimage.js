const { baseURL, apiKey, gptModel, gptimageModel } = require('../aiSettings.js');
const OpenAI = require('openai');
const openai = new OpenAI({ baseURL, apiKey });
const content = require('../characterPrompt.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');

module.exports.describeImage = async function (prompt = "Describe this image", imageUrl, model) {
    try {
        if (prompt == "Hey Anti-Andrew, describe this image and tell me what you think of this?") prompt = "Describe this image";

        let cleanPrompt;
        const referencedMatch = prompt.match(/(Referenced message from Andrew:[^\n]*)/i);

        if (referencedMatch) {
            const referenced = referencedMatch[1];
            let rest = prompt.replace(referenced, '');
            rest = rest.replace(/andrew/gi, '').replace(/\s+/g, ' ').trim();
            cleanPrompt = `${referenced} ${rest}`.trim();
        } else {
            cleanPrompt = prompt.replace(/andrew/gi, '').replace(/\s+/g, ' ').trim();
            if (cleanPrompt === '' || cleanPrompt === ',') cleanPrompt = 'Describe this image';
        }

        console.log(`Prompt: ${cleanPrompt}`);

        const responseImg = await fetch(imageUrl);
        const arrayBuffer = await responseImg.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const ext = path.extname(imageUrl).toLowerCase();

        let mimeType = 'image/png';
        if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
        else if (ext === '.webp') mimeType = 'image/webp';
        else if (ext === '.gif') mimeType = 'image/gif';
        
        const base64 = buffer.toString('base64');
        const base64Url = `data:${mimeType};base64,${base64}`;

        const response = await openai.chat.completions.create({
            model,
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: cleanPrompt },
                        { type: 'image_url', image_url: { url: base64Url } }
                    ]
                }
            ],
            temperature: 0.2
        });

        return response.choices[0]?.message?.content;
    } catch (err) {
        console.error(err);
    }
}

module.exports.generateImagePrompt = async function (prompt, imageUrl) {
    try {
        const preresponse = await module.exports.describeImage(prompt, imageUrl, gptimageModel);
        console.log(`\nResponse from vision model: ${preresponse}\n`);

        const fullPrompt = `Another person has described this image for you, put it in your own words as Anti-Andrew. Keep it short.
        Here's the description: ${preresponse}\nPrompt: ${prompt}`;

        const response = await openai.chat.completions.create({
            model: gptModel,
            messages: [
                { role: 'system', content },
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: fullPrompt },
                    ]
                }
            ],
            temperature: 0.9
        });

        const reply = response.choices[0]?.message?.content || "Couldn't describe the image";
        console.log(`Model used: ${gptModel}\nResponse: ${reply}`);

        if (reply.length > 2000) {
            return reply.slice(0, 1997) + '...';
        }
        return reply;

    } catch (err) {
        console.error("Image prompt failed:", err);
        throw new Error("Image analysis failed.");
    }
};