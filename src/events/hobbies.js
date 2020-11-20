module.exports = bot => {

    const hobbiesParent = '766283162468614144';
    const gamesParent = '766246748049637386';
    const hobbiesGroupSchema = require('../database/Schemas/hobbiesGroupSchema');
    // const hobbiesGroupSchema = require('./src/database/Schemas/hobbiesGroupSchema');
    const PREFIX = "!";
    const active = 'active';
    const inactive = 'inactive';

    bot.on('messageReactionAdd', async (reaction, user) => {

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

            const userId = user.id

            const reactionEmoji = reaction.emoji.name;

            const dbGroupLookup = await hobbiesGroupSchema.find({
                groupEmoji: reactionEmoji,
                groupType
            });

            if (dbGroupLookup.length > 0) {

                const [{ groupChannelId, groupEmoji }] = dbGroupLookup

                const dbResulChannel = reaction.message.guild.channels.cache.get(groupChannelId);

                if (reaction.emoji.name === groupEmoji) {

                    await hobbiesGroupSchema.findOneAndUpdate({
                        groupEmoji,
                        groupStatus: active
                    }, {
                        $addToSet: {
                            groupMemberIds: userId
                        }
                    }, {
                        upsert: true
                    })

                    dbResulChannel.updateOverwrite(user.id, {
                        VIEW_CHANNEL: true
                    });

                }

            } else {
                return console.log('That group does not exist');
            };
        };
    });

    bot.on('messageReactionRemove', async (reaction, user) => {

        const gameSelectChannel = reaction.message.guild.channels.cache.get('766246855939588127');
        const hobbiesSelectChannel = reaction.message.guild.channels.cache.get('766284120497717249');

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel === gameSelectChannel || reaction.message.channel === hobbiesSelectChannel) {

            const reactionEmoji = reaction.emoji.name;

            const dbGroupLookup = await hobbiesGroupSchema.find({
                groupEmoji: reactionEmoji
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

    const gamerSet = new Set();
    const gamer = new Set();
    bot.on('message', async (message) => {
        if (message.channel.type === "dm") return;


        if (message.author.bot) return;
        const messageContent = message.content.toLowerCase();
        const gameSelectChannel = message.guild.channels.cache.get('766246855939588127');
        const hobbiesSelectChannel = message.guild.channels.cache.get('766284120497717249');

        if (messageContent.startsWith(PREFIX)) {
            let args = messageContent.substring(PREFIX.length).split(" ");
            switch (args[0]) {

                case 'newhobby':
                    if (!message.member.hasPermission('ADMINISTRATOR')) return;
                    if (!message.channel.parentID === hobbiesParent) return;

                    const hobbyGroupName = messageContent.split(' ').slice(1).join(' ');

                    const hobbySearch = await hobbiesGroupSchema.find({
                        groupChannelId: message.channel.id
                    })

                    if (hobbySearch.length > 0) return message.reply(`This channel is already assigned.`);

                    await hobbiesGroupSchema.findOneAndUpdate({
                        groupChannelId: message.channel.id
                    }, {
                        groupName: hobbyGroupName,
                        groupType: 'hobby',
                        groupStatus: active
                    }, {
                        upsert: true
                    }).then(() => message.reply(`this channel has now been assigned to ${hobbyGroupName}.`)).then(() => message.react('👍')).then(() => message.channel.send('Now set an emoji for this channel so people can react to gain access, by doing```!setemoji <emoji>```'));

                    break;

                case 'newgame':
                    if (!message.member.hasPermission('ADMINISTRATOR')) return;
                    if (!message.channel.parentID === gamesParent) return;


                    const gameGroupName = messageContent.split(' ').slice(1).join(' ');

                    const gameSearch = await hobbiesGroupSchema.find({
                        groupChannelId: message.channel.id
                    })

                    if (gameSearch.length > 0) return message.reply(`This channel is already assigned.`);

                    await hobbiesGroupSchema.findOneAndUpdate({
                        groupChannelId: message.channel.id
                    }, {
                        groupName: gameGroupName,
                        groupType: 'game',
                        groupStatus: active
                    }, {
                        upsert: true
                    }).then(() => message.reply(`this channel has now been assigned to ${gameGroupName} players.`)).then(() => message.react('👍')).then(() => message.channel.send('Now set an emoji for this channel so people can react to gain access, by doing```!setemoji <emoji>```'));

                    break;

                case 'setemoji':
                    if (!message.member.hasPermission('ADMINISTRATOR')) return;

                    if (message.channel.parentID === hobbiesParent || message.channel.parentID === gamesParent) {

                        const channelEmoji = messageContent.replace('!setemoji ', '');

                        console.log(/\p{Emoji}/u.test(channelEmoji))

                        if (/\p{Emoji}/u.test(channelEmoji)) {
                            const fetchedChannel = await hobbiesGroupSchema.find({
                                groupChannelId: message.channel.id
                            });

                            if (fetchedChannel.length < 1) return message.reply('you should first declare this channel as a game or hobby channel. In order to do that, do```!newgame <name of the game>\n!newhobby <name of hobby>```');

                            await hobbiesGroupSchema.findOneAndUpdate({
                                groupChannelId: message.channel.id
                            }, {
                                groupEmoji: channelEmoji
                            }).then(() => {
                                message.react('👍');
                            })

                            if (message.channel.parentID === gamesParent) {
                                gameSelectChannel.messages.fetch({ limit: 1 }).then(m => {
                                    let lastMessage = m.first();

                                    lastMessage.react(channelEmoji);
                                })
                            }

                            if (message.channel.parentID === hobbiesParent) {
                                hobbiesSelectChannel.messages.fetch({ limit: 1 }).then(m => {
                                    let lastMessage = m.first();

                                    lastMessage.react(channelEmoji);
                                })
                            }
                        } else {
                            message.reply(`that's not an emoji.`)
                        }
                    }
                    break;

            }
        };


        if (message.content === '<@&766278005583642644>' || message.content === '<@766278005583642644>') {

            if (message.channel.parentID === gamesParent) {

                const gameGroup = await hobbiesGroupSchema.find({
                    groupChannelId: message.channel.id
                })

                if (gameGroup.length < 1) return message.channel.send(`This channels has not been set up for gaming, yet. Go ahead and and set it up by doing` + "```!newgame <name of game>```");

                const [{ groupMemberIds, groupName }] = gameGroup;

                if (!gamer.has(message.author.id)) {
                    if (!gamerSet.has(message.channel.id)) {

                        if (gameGroup.length > 0) {

                            var gamerCalls = "";
                            for (i in groupMemberIds) {
                                gamerCalls += "<@!" + groupMemberIds[i] + "> ";
                            }
                            message.channel.send(`**@${groupName}** ${gamerCalls}`);

                            gamerSet.add(message.channel.id)
                            gamer.add(message.author.id)
                            setTimeout(() => {
                                gamerSet.delete(message.channel.id);
                                gamer.delete(message.author.id);
                            }, 3600000);
                        }
                    } else {
                        message.reply(`${groupName} players were already summoned once in the past 1 hour. Try again later`).then(m => m.delete({ timeout: 10000 }));
                        message.delete({ timeout: 10000 });
                    }
                } else {
                    message.reply(`slow down sport! You've pinged the gamers just a while back. Try that again in an hour.`).then(m => m.delete({ timeout: 10000 }));
                    message.delete({ timeout: 10000 });
                    return;
                }
            } else {
                message.reply(`You cannot tag the gamers here. Go ahead and try it in one of the game channels.`).then(m => m.delete({ timeout: 10000 }));
                message.delete();
            }
        }
    })


}
