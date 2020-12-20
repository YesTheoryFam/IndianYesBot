module.exports = async (message, memberSchema) => {

    await memberSchema.findOneAndUpdate({
        _id: message.author.id
    }, {
        name: message.member.nickname || '',
        currentUsername: message.author.username,
        $addToSet: {
            usernameHistory: message.author.username,
            nameHistory: message.member.nickname || '',
            userRoles: message.member.roles.cache.keyArray(),
            servers: message.guild.id
        },
        $inc: {
            "messageCount": 1
        }
    }, {
        upsert: true
    })

}