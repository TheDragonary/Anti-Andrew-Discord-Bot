const { Events } = require('discord.js');

const userContextMap = new Map();

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot || message.system) return;

        if (message.content.toLowerCase().includes("andrew") || message.content.toLowerCase().includes("androo")) {
            console.log("Storing user message for Andrew context.");
            userContextMap.set(message.id, {
                content: message.content,
                authorId: message.author.id,
                username: message.author.username,
                displayName: message.member?.displayName || message.author.username
            });
        }
    },
    userContextMap
};