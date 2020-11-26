// const Discord = require('discord.js');
// const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});

const serverRoles = require('../collections/Roles/Roles.json')
const PREFIX = "!";

const hobbiesGroupSchema = require('../database/Schemas/hobbiesGroupSchema');
const memberSchema = require('../database/Schemas/memberSchema');
const serverSchema = require('../database/Schemas/serverSchema');
const warningSchema = require('../database/Schemas/warningSchema');

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

        const hobbiesParent = '766283162468614144';
        const gamesParent = '766246748049637386';

        const currentMoment = Moment().tz('Asia/Kolkata');
        const currentHoour = currentMoment.hour();
        const currentMinute = currentMoment.minute();
        const currentSecond = currentMoment.second();
        const currentDate = currentMoment.date();
        const currentMonth = currentMoment.month() + 1;
        const currentYear = currentMoment.year();
        const currentDay = currentMoment.day();
        const rightNow = `${currentDate}/${currentMonth}/${currentYear} ${currentHoour}:${currentMinute}:${currentSecond}`;

        const nisha = '572721594959659022';
        const niveditha = '640457436859334657';
        const ritika = '731818289717575770';
        const shreeya = '749624514425520168';
        const beta = '712795842083553363';

        if (message.content.startsWith(PREFIX)) {
            let args = message.content.substring(PREFIX.length).split(" ");
            switch (args[0]) {

                case 'warn':
                    if (!message.member.hasPermission('MANAGE_NICKNAMES')) return;
                    var person = message.mentions.members.first();
                    if (!person) return message.channel.send("Please specify a valid user.").then(m => m.delete({ timeout: 5000 }))
                        .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                    const checkWarning = await memberSchema.find({
                        _id: person.id
                    })


                    const warning = message.content.split(' ').slice(2).join(' ');

                    const warningMessage = `You have been warned on the ${message.guild.name} Server for, "${warning}"\nPlease make sure that you follow the community rules, strictly.`;


                    if (warning) {
                        message.delete();

                        const warrningId = message.createdTimestamp;

                        await warningSchema.findOneAndUpdate({
                            warrningId
                        }, {
                            warrningId,
                            recipientId: person.id,
                            warnedByName: message.member.displayName,
                            warnedById: message.author.id,
                            warnedAt: rightNow,
                            warningReason: warning
                        }, {
                            upsert: true
                        }).then(async () => {
                            await memberSchema.findOneAndUpdate({
                                _id: person.id
                            }, {
                                $addToSet: {
                                    warningIds: warrningId
                                },
                                $inc: {
                                    "currentWarningCount": 1
                                }
                            }, {
                                upsert: true
                            })
                        }).then(() => {
                            // console.log(person)

                            const warn = () => {
                                person.send(warningMessage);
                                // console.log(warningMessage);
                            };

                            if (checkWarning.length > 0) {


                                const [{ currentWarningCount }] = checkWarning

                                if (currentWarningCount && currentWarningCount > 2) {
                                    // console.log('There are warnings issued before.');

                                    warn();
                                    person.roles.add(serverRoles.timeOut)
                                    serverLogs.send(`${message.author} has warned ${person} for "${warning}" and is now on timeout.`);

                                    return;
                                } else {
                                    // console.log('There is no warning issued before.');

                                    warn();
                                    serverLogs.send(`${message.author} has warned ${person} for "${warning}".`);

                                }
                            }
                        })

                    } else {

                        return message.reply('You need to specify a reason. Try ' + "`" + `!warn @member reason` + "`.").then((m) => {
                            m.delete({ timeout: 10000 });
                            message.delete({ timeout: 10000 });
                        })

                    }

                    break;

                case "bday":
                    if (message.member.hasPermission("MANAGE_NICKNAMES")) {
                        var person = message.mentions.members.first();
                        if (!person)
                            return message.channel.send("The command is `!bday @member set mmm-dd`")
                                .then((m) => m.delete({ timeout: 5000 }))
                                .then(message.delete({ timeout: 5000 }).catch((err) => console.log(err))
                                );

                        const content = message.content.split(' ').slice(1).join(' ');

                        if (content.includes(" set ")) {
                            if (content.includes("-")) {

                                const bdayCommand = message.content

                                const commandEdit = bdayCommand.toLowerCase().split(' ').slice(3).join('').split('-')

                                const extractedMonth = commandEdit[0]

                                let bdayDate

                                let bdayMonth

                                if (extractedMonth === 'jan') {
                                    bdayMonth = '01'
                                } else if (extractedMonth === 'feb') {
                                    bdayMonth = '02'
                                } else if (extractedMonth === 'mar') {
                                    bdayMonth = '03'
                                } else if (extractedMonth === 'apr') {
                                    bdayMonth = '04'
                                } else if (extractedMonth === 'may') {
                                    bdayMonth = '05'
                                } else if (extractedMonth === 'jun') {
                                    bdayMonth = '06'
                                } else if (extractedMonth === 'jul') {
                                    bdayMonth = '07'
                                } else if (extractedMonth === 'aug') {
                                    bdayMonth = '08'
                                } else if (extractedMonth === 'sep') {
                                    bdayMonth = '09'
                                } else if (extractedMonth === 'oct') {
                                    bdayMonth = '10'
                                } else if (extractedMonth === 'nov') {
                                    bdayMonth = '11'
                                } else if (extractedMonth === 'dec') {
                                    bdayMonth = '12'
                                } else {
                                    return message.channel.send("The command is `!bday @member set mmm-dd`. For example: `" + `!bday @${person.displayName} set jun-12` + "`.")
                                }

                                bdayDate = commandEdit[1]

                                if (parseFloat(bdayMonth) > 12 || parseFloat(bdayDate) > 31) {
                                    return message.channel.send("Date is not valid.\nThe command is `!bday @member set mmm-dd`. For example: `" + `!bday @${person.displayName} set jun-12` + "`.")
                                }

                                await memberSchema.findOneAndUpdate({
                                    _id: person.id
                                }, {
                                    bdayDate: parseFloat(bdayDate),
                                    bdayMonth: parseFloat(bdayMonth)
                                }, {
                                    upsert: true
                                }).then(() => {
                                    message.react("👍");
                                    message.channel.send(`I've noted down ${person}'s birthday.`);
                                })

                            } else {
                                message.react("👎");
                                message.channel.send("The command is `!bday @member set mmm-dd`. For example: `" + `!bday @${person.displayName} set jun-12` + "`.");
                            }
                        } else {
                            message.react("👎");
                            message.channel.send("The command is `!bday @member set mmm-dd`. For example: `" + `!bday @${person.displayName} set jun-12` + "`.");
                        }
                    } else {
                        message.reply(`One of the support team member has been notified regarding your request.`);
                    }

                    break;

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
                            $pull: {
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

                        const findaChannelToArchive = await serverSchema.find({
                            _id: message.guild.id,
                            mainChannels: message.channel.id
                        })

                        if (findaChannelToArchive.length > 0) return message.reply('you cannot archive a main channel').then(m => m.delete({ timeout: 10000 })).then(message.delete());

                        const searchArchiveCategory = await serverSchema.find({
                            _id: message.guild.id
                        })

                        if (searchArchiveCategory.length > 0) {
                            const [{ channelArchiveCategory }] = searchArchiveCategory

                            if (channelArchiveCategory) {

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

                                message.channel.setParent(channelArchiveCategory)
                                message.react('👍');
                                serverLogs.send(`${message.author} has archived ${message.channel} channel.`);


                            } else {
                                return message.reply('please set an archive category by doing ```\n!setarchivecategory <category id>\n```')
                            }
                        }
                    };

                    break;

                case 'setarchivecategory':

                    const getArchiveId = message.content.split(' ').slice(1).join(' ')

                    if (message.member.hasPermission('ADMINISTRATOR')) {

                        if (getArchiveId) {

                            await serverSchema.findOneAndUpdate({
                                _id: message.guild.id
                            }, {
                                channelArchiveCategory: getArchiveId,
                                serverName: message.guild.name
                            }, {
                                upsert: true
                            }).then(() => {
                                message.react('👍');
                                message.delete({ timeout: 5000 });
                            })

                        } else {
                            message.reply('the command is, ```\n!setarchivecategory <categoryId>\n```');
                        }
                    }

                    break;

            };
        }
    })

};
