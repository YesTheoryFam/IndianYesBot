const messageCounterSchema = require('../Schemas/memberSchema');

module.exports = (bot) => {

    bot.on('message', async (message) => {
        if (message.channel.type === "dm") return;

        const memerBotChannel = message.guild.channels.cache.get('715171228046065775');

        if (message.channel === memerBotChannel) return;
        if (message.author.bot) return;

        const { author } = message;
        const { id: _id } = author
        const { username } = author
        const displayName = message.member.displayName;


        await messageCounterSchema.findOneAndUpdate({
            _id
        }, {
            name: displayName,
            currentUsername: username,
            $addToSet: {
                usernameHistory: username,
                nameHistory: displayName,
                userRoles: message.member.roles.cache.keyArray()
            },
            $inc: {
                "messageCount": 1
            }
        }, {
            upsert: true
        })
    });


};
