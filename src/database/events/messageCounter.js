const memberSchema = require('../Schemas/memberSchema');

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
        const nick = message.member.nickname || '';


        await memberSchema.findOneAndUpdate({
            _id
        }, {
            name: nick,
            currentUsername: username,
            $addToSet: {
                usernameHistory: username,
                nameHistory: nick,
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
