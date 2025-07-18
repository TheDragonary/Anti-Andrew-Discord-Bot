require('dotenv').config();

const { Events, MessageFlags, AttachmentBuilder } = require('discord.js');
const path = require('node:path');
const { generateChatCompletion } = require('../gpt/utility/gpt.js');
const { describeImage, generateImagePrompt } = require('../gpt/utility/gptimage.js');
const { askIfToolIsNeeded } = require('../searchTools.js');
const { braveSearch } = require('../braveSearch.js');
const { braveImageSearch } = require('../braveImageSearch.js');
const { googleImageSearch } = require('../googleImageSearch.js');
const { findUserIdentity } = require('../userIdentities.js');
const { messageModel, messageImageModel } = require('../aiSettings.js');
const { aiAttachment } = require('../aiAttachments.js');

const gods = [
    { user: 'thedragonary', display: 'dragonary' },
    { user: 'spookeddoor', display: 'spookeddoor' },
    { user: 'hellbeyv2', display: 'hellbey' },
    { user: 'sillyh.', display: 'trinke' },
    { user: 'nonamebadass', display: 'poncho' },
    { user: 'marv_mari', display: 'brit' },
];

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
    const isAndrewBot = message.author.bot && message.author.id === (process.env.ANDREW_ID ?? '');
    const isRealAndrew = message.author.id === (process.env.REAL_ANDREW ?? '');


        if ((message.author.bot && !isAndrewBot) || message.system) return;
        if (message.flags.has(MessageFlags.HasSnapshot)) return;

        console.log(`Message from ${message.author.tag} in ${message.guild.name} - ${message.channel.name}: ${message.content || '[No text]'}`);
        if (message.attachments.size > 0) {
            console.log(`Attachments: ${message.attachments.map(a => a.url).join(', ')}`);
        }

        const lowerCaseMessage = message.content.toLowerCase();

        try {
            const botWasMentioned = message.mentions.has(message.client.user);
            const triggerWords = ['anti'];
            const triggeredByKeyword = triggerWords.some(word => lowerCaseMessage.includes(word));
            const isReplyToBot = message.reference && (await message.fetchReference())?.author?.id === message.client.user.id;


            if (botWasMentioned || triggeredByKeyword || isReplyToBot || isAndrewBot || isRealAndrew) {
            await message.channel.sendTyping();

                let prompt = message.content.replace(/<@!?(\d+)>/, '').trim();
                let finalPrompt = prompt;
                let imageUrl = null;

                if (message.attachments.size > 0) imageUrl = message.attachments.first().url;
                if (message.reference) {
                    try {
                        const repliedMessage = await message.fetchReference();
                        if (repliedMessage.attachments.size > 0) {
                            imageUrl = repliedMessage.attachments.first().url;
                        }
                        if (repliedMessage.content) {
                            finalPrompt = `Referenced message from ${repliedMessage.author.username}: ${repliedMessage.content}\nPrompt: ${prompt}`;
                            console.log(`Replying with context from previous message. ${finalPrompt}`);
                        }
                    } catch (err) {
                        console.error("Failed to fetch referenced message:", err);
                    }
                }

                let model = messageModel;
                let reply;

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
                        model = messageImageModel;
                        console.log(`Model used: ${model}, Location: ${message.guild.name} - ${message.channel.name}, Prompt: ${prompt}\nImage URL: ${imageUrl}`);
                        reply = await generateImagePrompt(finalPrompt, imageUrl);
                    } catch (err) {
                        console.error("Image analysis failed:", err);
                        return message.reply("There was an issue analysing the image. Please try again later.");
                    }
                }

                const userInfo = await findUserIdentity({ id: message.author.id, name: message.author.displayName, guild: message.guild });
                const usernameForAI = userInfo?.displayName || message.author.username;

                if (!reply) {
                    console.log(`Model used: ${model}, Location: ${message.guild.name} - ${message.channel.name}, Prompt: ${prompt}`);
                    reply = await generateChatCompletion(
                        message.author.id,
                        finalPrompt,
                        model,
                        usernameForAI,
                        message.guild
                    );
                    console.log(`AI response: ${reply}`);
                }

                const attachments = aiAttachment(reply);
                if (reply) {
                    if (attachments) {
                        await message.reply({ content: reply, files: attachments });
                    } else {
                        await message.reply(reply);
                    }
                }
            }
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while sending the message.');
        }
    },
};
