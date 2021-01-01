
module.exports = async (message, server, dmParent, existingDM, dmChannelSchema) => {
    if (message.author.bot) return;

    const checkIfExisting = server.members.fetch(message.author.id);
    if (checkIfExisting) {
        const checkDMChannel = await dmChannelSchema.find({
            _id: message.author.id
        })

        if (checkDMChannel.length > 0) {
            const [{ dmChannelId }] = checkDMChannel

            const fetchedChannel = bot.channels.cache.get(dmChannelId)

            if (fetchedChannel) {
                fetchedChannel.send(message.content || '`file`');
                if (message.attachments) {
                    message.attachments.forEach((attachment) => {
                        fetchedChannel.send(attachment.url);
                    })
                }
            } else {
                server.channels.create(`${message.author.username}`, {
                    parent: dmParent
                }).then(async (newChannel) => {

                    newChannel.send(message.content || '`file`')
                    if (message.attachments) {
                        message.attachments.forEach((attachment) => {
                            newChannel.send(attachment.url);
                        })
                    }

                    await dmChannelSchema.findOneAndUpdate({
                        _id: message.author.id
                    }, {
                        dmChannelId: newChannel.id
                    }, {
                        upsert: true
                    })
                })
            }

        } else {
            server.channels.create(`${message.author.username}`, {
                parent: dmParent
            }).then(async (newChannel) => {
                newChannel.send(message.content || '`file`')
                if (message.attachments) {
                    message.attachments.forEach((attachment) => {
                        newChannel.send(attachment.url);
                    })
                }
                await dmChannelSchema.findOneAndUpdate({
                    _id: message.author.id
                }, {
                    dmChannelId: newChannel.id
                }, {
                    upsert: true
                })
            })
        }

    } else {
        if (!existingDM.has(message.author.id)) {
            message.author.send(`You have to be a member of ${server.name} Server to have a conversation with me.`);
            existingDM.add(message.author.id);
        }
    }
};
