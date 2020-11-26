const hobbiesGroupSchema = require('../database/Schemas/hobbiesGroupSchema');
const active = 'active';
const inactive = 'inactive';

module.exports = bot => {

    bot.on('messageReactionRemove', async (reaction, user) => {

        const gameSelectChannel = reaction.message.guild.channels.cache.get('766246855939588127');
        const hobbiesSelectChannel = reaction.message.guild.channels.cache.get('766284120497717249');

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel === gameSelectChannel ||
            reaction.message.channel === hobbiesSelectChannel) {

            let groupType

            if (reaction.message.channel === gameSelectChannel) {
                groupType = 'game'
            }
            if (reaction.message.channel === hobbiesSelectChannel) {
                groupType = 'hobby'
            }

            const reactionEmoji = reaction.emoji.name;

            const dbGroupLookup = await hobbiesGroupSchema.find({
                groupEmoji: reactionEmoji,
                groupType,
                groupStatus: active
            });

            if (dbGroupLookup.length > 0) {

                const [{ groupChannelId, groupEmoji }] = dbGroupLookup

                const dbResulChannel = reaction.message.guild.channels.cache.get(groupChannelId);

                if (reaction.emoji.name === groupEmoji) {

                    await hobbiesGroupSchema.findOneAndUpdate({
                        groupEmoji,
                        groupStatus: active
                    }, {
                        $pull: {
                            groupMemberIds: user.id
                        }
                    }, {
                        upsert: true
                    })

                    dbResulChannel.updateOverwrite(user.id, {
                        VIEW_CHANNEL: false
                    });

                }

            } else {
                return console.log('That group does not exist');
            };
        };
    });

}
