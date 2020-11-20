// const Discord = require('discord.js');
// const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});

const serverRoles = require('../collections/Roles/Roles.json')
const PREFIX = "!";

const hobbiesGroupSchema = require('../database/Schemas/hobbiesGroupSchema');
const memberSchema = require('../database/Schemas/memberSchema');
const serverSchema = require('../database/Schemas/serverSchema');

const active = 'active';
const inactive = 'inactive';

module.exports = bot => {

    bot.on('message', async (message) => {
        if (message.channel.type === "dm") return;

        if (message.author.bot) return;

        const serverLogs = message.guild.channels.cache.get('747121287381516399');
        const betaTestChannel = message.guild.channels.cache.get('746755589895487488');
        const timeOutChannel = message.guild.channels.cache.get('749988359471890563');
        const gameSelectChannel = message.guild.channels.cache.get('766246855939588127');
        const hobbiesSelectChannel = message.guild.channels.cache.get('766284120497717249');

        const archiveCategory = '747111680168820766';
        const hobbiesParent = '766283162468614144';
        const gamesParent = '766246748049637386';

        const nisha = '572721594959659022';
        const niveditha = '640457436859334657';
        const ritika = '731818289717575770';
        const shreeya = '749624514425520168';
        const beta = '712795842083553363';

        if (message.content.startsWith(PREFIX)) {
            let args = message.content.substring(PREFIX.length).split(" ");
            switch (args[0]) {

                case 'setmainchannel':
                    if (message.member.hasPermission('ADMINISTRATOR')) {

                        const setChannelId = message.channel.id

                        await serverSchema.findOneAndUpdate({
                            _id: message.guild.id
                        }, {
                            $addToSet: {
                                mainChannels: setChannelId
                            },
                            serverName: message.guild.name
                        }, {
                            upsert: true
                        }).then(() => {
                            message.react('👍')
                            message.delete({ timeout: 5000 });
                        })
                    }
                    break;

                case 'removemainchannel':
                    if (message.member.hasPermission('ADMINISTRATOR')) {

                        const removeChannelId = message.channel.id

                        await serverSchema.findOneAndUpdate({
                            _id: message.guild.id
                        }, {
                            $addToSet: {
                                mainChannels: removeChannelId
                            },
                            serverName: message.guild.name
                        }, {
                            upsert: true
                        }).then(() => {
                            message.react('👍')
                            message.delete({ timeout: 5000 });
                        })
                    }
                    break;

                case 'ssrem':

                    if (message.author.id === nisha ||
                        message.author.id === ritika ||
                        message.author.id === niveditha ||
                        message.author.id === shreeya ||
                        message.author.id === beta ||
                        message.member.hasPermission('MANAGE_NICKNAMES')) {

                        var person = message.mentions.members.first();
                        if (!person) return message.channel.send("Please specify a valid user.").then(m => m.delete({ timeout: 5000 }))
                            .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                        const secretSantaChannel = message.guild.channels.cache.get('770336913752064100');
                        const secretSantaAnnouncementChannel = message.guild.channels.cache.get('770336984341938197');

                        secretSantaChannel.updateOverwrite(person.id, {
                            VIEW_CHANNEL: false
                        }).then(() => {
                            secretSantaAnnouncementChannel.updateOverwrite(person.id, {
                                VIEW_CHANNEL: false
                            })
                        }).then(() => {
                            message.react('👍');
                        }).then(() => message.delete({ timeout: 5000 }))

                    }

                    break;

                case 'ss':

                    if (message.author.id === nisha ||
                        message.author.id === ritika ||
                        message.author.id === niveditha ||
                        message.author.id === shreeya ||
                        message.author.id === beta ||
                        message.member.hasPermission('MANAGE_NICKNAMES')) {

                        var person = message.mentions.members.first();
                        if (!person) return message.channel.send("Please specify a valid user.").then(m => m.delete({ timeout: 5000 }))
                            .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                        const secretSantaChannel = message.guild.channels.cache.get('770336913752064100');
                        const secretSantaAnnouncementChannel = message.guild.channels.cache.get('770336984341938197');

                        secretSantaChannel.updateOverwrite(person.id, {
                            VIEW_CHANNEL: true
                        }).then(() => {
                            secretSantaAnnouncementChannel.updateOverwrite(person.id, {
                                VIEW_CHANNEL: true
                            })
                        }).then(() => {
                            message.react('👍');
                            person.send(`Thank you for signing up for the Secret Santa Event on Yes Fam India. You now have access to a secret channel ---> <#770336913752064100>.`);
                        }).then(() => message.delete({ timeout: 5000 }))

                    }

                    break;

                case 'timeout':

                    if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_NICKNAMES')) {
                        var person = message.mentions.members.first();
                        if (!person) return message.channel.send("Please specify a valid user.").then(m => m.delete({ timeout: 5000 }))
                            .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                        if (person.id === bot.user.id)
                            return message.react('👎')
                                .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                        if (person.id === message.author.id)
                            return message.react('👎')
                                .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                        if (person.hasPermission('MANAGE_NICKNAMES'))
                            return message.react('👎').then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                        if (person.roles.cache.has(serverRoles.timeOut)) {
                            message.react('👎').then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));
                            message.reply(`${person} is already on timeout!`).then(m => m.delete({ timeout: 5000 }))
                            return;
                        }


                        person.roles.add(serverRoles.timeOut).then(async () => {
                            await memberSchema.findOneAndUpdate({
                                _id: person.id
                            }, {
                                timeout: active
                            }, {
                                upsert: true
                            })
                        })

                        message.react('👍');
                        serverLogs.send("<@" + message.author.id + "> just put <@" + person + "> on Time Out from the <#" + message.channel.id + "> channel.");
                        message.delete({ timeout: 5000 }).catch(err => console.log(err));

                    };

                    break;

                case 'permit':

                    if (message.channel == timeOutChannel) {

                        if (message.member.hasPermission('MANAGE_NICKNAMES')) {
                            var person = message.mentions.members.first();
                            if (!person) return message.channel.send("Please specify a valid user.").then(m => m.delete({ timeout: 5000 }))
                                .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                            if (person.id === bot.user.id)
                                return message.react('👎')
                                    .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                            if (person.id === message.author.id)
                                return message.react('👎')
                                    .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                            if (person.hasPermission('MANAGE_NICKNAMES'))
                                return message.react('👎').then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                            if (!person.roles.cache.has(serverRoles.timeOut)) {
                                message.react('👎').then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));
                                message.reply(`${person} is not on timeout!`).then(m => m.delete({ timeout: 5000 }))
                                return;
                            }

                            person.roles.remove(serverRoles.timeOut).then(async () => {

                                await memberSchema.findOneAndUpdate({
                                    _id: person.id
                                }, {
                                    timeout: inactive
                                }, {
                                    upsert: true
                                })

                            })
                            message.react('👍');
                            serverLogs.send("<@" + message.author.id + "> just took out <@" + person + "> from Time Out");
                            message.delete({ timeout: 5000 }).catch(err => console.log(err));

                        };

                    };

                    break;

                case 'ping':
                    if (message.channel == betaTestChannel) {
                        message.channel.send('calculating ping ...').then(resultMessage => {
                            const pong = resultMessage.createdTimestamp - message.createdTimestamp;

                            resultMessage.delete();
                            message.channel.send("```Latency = " + pong + "ms``````API Latency = " + bot.ws.ping + "ms```");
                        })
                    } else if (message.channel !== betaTestChannel && message.member.hasPermission('ADMINISTRATOR')) {
                        message.channel.send('calculating ping ...').then(resultMessage => {
                            const pong = resultMessage.createdTimestamp - message.createdTimestamp;

                            resultMessage.delete();
                            message.channel.send("```Latency = " + pong + "ms``````API Latency = " + bot.ws.ping + "ms```").then(pongMessage => {
                                pongMessage.delete({ timeout: 5000 });
                                message.delete({ timeout: 5000 });
                                return;
                            })
                        })
                    } else {
                        return;
                    };
                    break;

                case 'archive':

                    if (message.member.hasPermission('ADMINISTRATOR')) {

                        await serverSchema.find({
                            _id: message.guild.id,
                            mainChannels: message.channel.id
                        })

                        if (serverSchema.length > 0) return message.reply('you cannot archive a mainchannel').then(m => m.delete({ timeout: 10000 }));

                        if (message.channel.parentID === hobbiesParent ||
                            message.channel.parentID === gamesParent) {

                            const findHobby = await hobbiesGroupSchema.find({
                                groupChannelId: message.channel.id
                            })

                            if (findHobby.length > 0) {

                                const [{ groupEmoji }] = findHobby

                                await hobbiesGroupSchema.findOneAndUpdate({
                                    groupChannelId: message.channel.id
                                }, {
                                    groupStatus: inactive
                                }).then(() => {

                                    if (message.channel.parentID === hobbiesParent) {

                                        hobbiesSelectChannel.messages.fetch({ limit: 1 }).then(m => {
                                            let lastMessage = m.first();

                                            lastMessage.reactions.cache.get(groupEmoji).remove()
                                        })

                                    }

                                    if (message.channel.parentID === gamesParent) {

                                        gameSelectChannel.messages.fetch({ limit: 1 }).then(m => {
                                            let lastMessage = m.first();

                                            lastMessage.reactions.cache.get(groupEmoji).remove()
                                        })

                                    }
                                });
                            }
                        }

                        message.channel.setParent(archiveCategory)
                        message.react('👍');
                        serverLogs.send(`${message.author} has archived ${message.channel} channel.`);

                    };

                    break;

            };
        }
    })

};
