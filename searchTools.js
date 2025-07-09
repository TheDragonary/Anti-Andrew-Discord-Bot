const OpenAI = require('openai');
require('dotenv').config();
const { baseURL, apiKey, gptModel } = require('./aiSettings.js');
const openai = new OpenAI({ 
    baseURL,
    apiKey
});

module.exports.askIfToolIsNeeded = async function (prompt) {
    const toolPrompt = `
		A user asked Anti-Andrew this: "${prompt}". If this prompt contains the bot's name, which is "Anti", that should not be added to the search.

		Decide what tool (if any) is needed to answer.
		- If you need to search the web for context, reply with: WEB_SEARCH: <query>
		- If you need to find image results, reply with: IMAGE_SEARCH: <query>
		- If you can answer without using the internet, reply with: NO_SEARCH

		Only respond with one of the above formats. Do not include any extra text.
	`;

    const result = await openai.chat.completions.create({
        model: gptModel,
        messages: [
            { role: 'system', content: "You're an assistant that helps decide when external tools are needed to answer." },
            { role: 'user', content: toolPrompt }
        ],
        temperature: 0.2
    });

    return result.choices[0]?.message?.content.trim() || "NO_SEARCH";
}