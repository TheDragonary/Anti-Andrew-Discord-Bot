const { Events, MessageFlags } = require('discord.js');
const { generateChatCompletion } = require('../gpt/gpt.js');
const { generateImagePrompt } = require('../gpt/gptimage.js');
const { askIfToolIsNeeded } = require('../searchTools.js');
const { braveSearch } = require('../braveSearch.js');
const { googleImageSearch } = require('../googleImageSearch.js');
const { findUserIdentity } = require('../userIdentities.js');
const { gptModel, gptimageModel } = require('../aiSettings.js');

const messageBuffers = new Map();

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const isAndrewBot = message.author.bot && message.author.id === (process.env.ANDREW_ID ?? '');
        const isRealAndrew = message.author.id === (process.env.REAL_ANDREW ?? '');

        if ((message.author.bot && !isAndrewBot) || message.system) return;
        if (message.flags.has(MessageFlags.HasSnapshot)) return;

        console.log(`Message from ${message.author.tag} in ${message.guild.name} - ${message.channel.name}: ${message.content || '[No text]'}`);
        if (message.attachments.size > 0) console.log(`Attachments: ${message.attachments.map(a => a.url).join(', ')}`);

        try {
            const lowerCaseMessage = message.content.toLowerCase();
            const botWasMentioned = message.mentions.has(message.client.user);
            const triggerWords = ['anti'];
            const triggeredByKeyword = triggerWords.some(word => lowerCaseMessage.includes(word));
            const isReplyToBot = message.reference && (await message.fetchReference())?.author?.id === message.client.user.id;

            if (botWasMentioned || triggeredByKeyword || isReplyToBot || isAndrewBot || isRealAndrew) {
                const channelId = message.channel.id;
                if (!messageBuffers.has(channelId)) {
                    messageBuffers.set(channelId, {
                        messages: [],
                        timer: null,
                        attachments: [],
                        authors: new Set(),
                        references: [],
                    });
                }
                const buffer = messageBuffers.get(channelId);
                buffer.messages.push(message.content);
                buffer.authors.add(message.author.id);
                if (message.attachments.size > 0) buffer.attachments.push(...message.attachments.map(a => a.url));
                if (message.reference) buffer.references.push(message.reference);

                if (buffer.timer) clearTimeout(buffer.timer);
                buffer.timer = setTimeout(async () => {
                    let prompt = buffer.messages.join('\n');
                    let finalPrompt = prompt;
                    let imageUrl = buffer.attachments.length > 0 ? buffer.attachments[0] : null;
                    let model = gptModel;
                    let reply;

                    if (finalPrompt.toLowerCase().includes("hello")) {
                        return;
                    }
                    
                    await message.channel.sendTyping();

                    if (buffer.references.length > 0) {
                        try {
                            const refMsg = await message.fetchReference();
                            if (refMsg.attachments.size > 0) {
                                imageUrl = refMsg.attachments.first().url;
                            }
                            if (refMsg.content) {
                                finalPrompt = `Referenced message from ${refMsg.author.username}: ${refMsg.content}\nPrompt: ${prompt}`;
                                console.log(`Replying with context from previous message. ${finalPrompt}`);
                            }
                        } catch (err) {
                            console.error("Failed to fetch referenced message:", err);
                        }
                    }

                    if (!imageUrl) {
                        const toolDecision = await askIfToolIsNeeded(finalPrompt);
                        if (toolDecision.startsWith("WEB_SEARCH:")) {
                            const query = toolDecision.replace("WEB_SEARCH:", "").trim();
                            const searchResults = await braveSearch(query);
                            finalPrompt = `User asked: "${prompt}"\n\nRelevant web results:\n${searchResults}`;
                            console.log(`🔍 Web search used with query: "${query}"\n${searchResults}`);
                        } else if (toolDecision.startsWith("IMAGE_SEARCH:")) {
                            const query = toolDecision.replace("IMAGE_SEARCH:", "").trim();
                            const imageResults = await googleImageSearch(query);
                            finalPrompt = `User asked: "${prompt}"\n\nRelevant image links:\n${imageResults}`;
                            console.log(`🖼️ Image search used with query: "${query}"\n${imageResults}`);
                        } else {
                            console.log(`No internet tools used.`);
                        }
                    }

                    if (imageUrl) {
                        try {
                            model = gptimageModel;
                            console.log(`Model used: ${model}, Location: ${message.guild.name} - ${message.channel.name}, Prompt: ${prompt}\nImage URL: ${imageUrl}`);
                            reply = await generateImagePrompt(finalPrompt, imageUrl);
                        } catch (err) {
                            console.error("Image analysis failed:", err);
                            return message.reply("There was an issue analysing the image. Please try again later.");
                        }
                    }

                    const firstAuthorId = Array.from(buffer.authors)[0];
                    const userInfo = await findUserIdentity({ id: firstAuthorId, name: message.author.displayName, guild: message.guild });
                    const usernameForAI = userInfo?.displayName || message.author.username;

                    if (!reply) {
                        console.log(`Model used: ${model}, Location: ${message.guild.name} - ${message.channel.name}, Prompt: ${prompt}`);
                        reply = await generateChatCompletion(
                            firstAuthorId,
                            finalPrompt,
                            model,
                            usernameForAI,
                            message.guild
                        );
                        console.log(`AI response: ${reply}`);
                    }

                    if (reply) await message.reply(reply);
                    messageBuffers.delete(channelId);
                }, 5000); // 5 seconds
            }
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while sending the message.');
        }
    },
};