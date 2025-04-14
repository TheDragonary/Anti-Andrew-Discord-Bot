const { Events } = require('discord.js');
const OpenAI = require('openai');
require('dotenv').config();
const openai = new OpenAI({ 
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY 
});
const content = require('../characterPrompt.js');
const { userContextMap } = require('./userMessageListener.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (!message.author.bot || message.system) return;
        if (message.author.id !== '1357616229694705796') return;
        
        try {
            console.log(`Message from Andrew bot: ${message.content}`);
            let prompt = message.content.replace(/<@!?(\d+)>/, '').trim();
            const model = 'meta-llama/llama-4-maverick:free';
            console.log(`\nModel used: ${model}, Location: ${message.guild.name} - ${message.channel.name}, Prompt: ${prompt}`);

            let context = "No context provided.";
            const repliedToId = message.reference?.messageId;

            if (repliedToId) {
                const contextEntry = userContextMap.get(repliedToId);
                if (contextEntry) {
                    const { content: originalPrompt, username, displayName } = contextEntry;
                    context = `Message from ${displayName} (@${username}): ${originalPrompt}`;
                    console.log(`\nContext: ${context}`);
                }
            }

            const reply = await openai.chat.completions.create({
                model: model,
                messages: [
                    { role: "system", content: content },
                    { role: "user", content: context },
                    { role: "assistant", content: message.content }
                ]
            }) 

            const aiResponse = reply.choices[0]?.message?.content;
            console.log(`\nAI response: ${aiResponse}`);
            if (aiResponse) {
                message.reply(aiResponse);
            }
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while sending the message.');
        }
    },
};