const Discord = require('discord.js');
const Chance = require('chance');
const Moment = require('moment-timezone');

const chanceObj = new Chance();

const states = require('../collections/Roles/stateTags.json');
const serverRoles = require("../collections/Roles/Roles.json");

const PREFIX = "!";

const hobbiesGroupSchema = require('../database/Schemas/hobbiesGroupSchema');
const memberSchema = require('../database/Schemas/memberSchema');
const serverSchema = require('../database/Schemas/serverSchema');
const warningSchema = require('../database/Schemas/warningSchema');
const presenceSchema = require('../database/Schemas/activityGroupSchema');

const active = 'active';
const inactive = 'inactive';

const usersMap = new Map();
const LIMIT = 5;
const TIME = 30000;
const DIFF = 3000;

const gamerSet = new Set();
const gamer = new Set();

module.exports = bot => {
    bot.on('message', async (message) => {
        if (message.channel.type === "dm") return;
        if (message.author.bot) return;

        const messageContent = message.content.toLowerCase();
        const pollsChannel = message.guild.channels.cache.get('720682985581707325');
        const featureRequestChannel = message.guild.channels.cache.get('715200556817317940');
        const serverLogs = message.guild.channels.cache.get('747121287381516399');
        const betaTestChannel = message.guild.channels.cache.get('746755589895487488');
        const timeOutChannel = message.guild.channels.cache.get('749988359471890563');
        const gameSelectChannel = message.guild.channels.cache.get('766246855939588127');
        const hobbiesSelectChannel = message.guild.channels.cache.get('766284120497717249');
        const adminBotCommands = message.guild.channels.cache.get('781499532692160522');
        const botCommands = message.guild.channels.cache.get('781521410497576960');

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

        const secretSantaChannel = message.guild.channels.cache.get('770336913752064100');
        const nisha = '572721594959659022';
        const niveditha = '640457436859334657';
        const ritika = '731818289717575770';
        const shreeya = '749624514425520168';
        const beta = '712795842083553363';


        // Message Counter 
        // =====================

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

        // ======================

        // Commands
        // =================================
        if (message.content.startsWith(PREFIX)) {
            let args = message.content.substring(PREFIX.length).split(" ");
            switch (args[0]) {

                // games and hobbies
                // =====================================
                case 'newhobby':
                    if (!message.member.hasPermission('ADMINISTRATOR')) return;
                    if (!message.channel.parentID === hobbiesParent) return;

                    const hobbyGroupName = messageContent.split(' ').slice(1).join(' ');

                    if (hobbyGroupName.length < 1) return message.reply(`Please specify a name for this hobby. Here's an example` + "```\n!newhobby <hobby name>\n```");

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

                    if (gameGroupName.length < 1) return message.reply(`Please specify a name for this game. Here's an example` + "```\n!newgame <game name>\n```");

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

                        if (channelEmoji.length < 1) return message.reply(`Please specify aa emoji for this channel. Here's an example` + "```\n!setemoji 🔫\n```");

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

                // =====================================

                case 'profile':

                    if (message.channel === botCommands ||
                        message.channel === adminBotCommands ||
                        message.channel === betaTestChannel) {

                        var person = message.mentions.members.first();

                        let profileOfId,
                            profileUserTag,
                            profileUserPFP,
                            profileUserDisplayName,
                            profileUserJoinedAt,
                            profileUserColour,
                            profileUserBdayDay,
                            profileUserBdayMonth,
                            profileTarget,
                            groupsImin;
                        const imfrom = []
                        const gameIPlay = []
                        const presenceRecord = []
                        // const groupsImin = []

                        if (person) {
                            if (person.user.bot) return;
                            profileTarget = person
                            profileOfId = person.id;
                            profileUserTag = person.user.tag;
                            profileUserPFP = person.user.avatarURL();
                            profileUserDisplayName = person.displayName
                            profileUserJoinedAt = person.joinedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", }) + " (IST)";
                            profileUserColour = person.displayColor
                        } else {
                            profileTarget = message.author
                            profileOfId = message.author.id;
                            profileUserTag = message.member.user.tag;
                            profileUserPFP = message.author.avatarURL();
                            profileUserDisplayName = message.member.displayName;
                            profileUserJoinedAt = message.member.joinedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", }) + " (IST)";
                            profileUserColour = message.member.displayColor
                        }

                        const findPerson = await memberSchema.find({
                            _id: profileOfId
                        })

                        const presenceFind = await presenceSchema.find({
                            userIDs: profileOfId
                        })

                        const gamesSchema = await hobbiesGroupSchema.find({
                            groupMemberIds: profileOfId,
                            groupType: 'game',
                            groupStatus: active
                        })

                        if (presenceFind.length > 0) {
                            presenceFind.forEach((activity) => {
                                const { appName } = activity

                                presenceRecord.push(appName)
                            })
                        }

                        if (gamesSchema.length > 0) {

                            gamesSchema.forEach((gameData) => {
                                const { groupName } = gameData

                                gameIPlay.push(groupName)
                            })

                        } else {
                            gameIPlay.push('no games')
                        }

                        if (findPerson.length > 0) {

                            const [{ timeout, userRoles, suspicion, nameHistory, usernameHistory, warningIds, bdayDate, bdayMonth }] = findPerson

                            let profileEmbed,
                                profileEmbedAdmin

                            userRoles.forEach((loaclity) => {
                                const localityRoles = message.guild.roles.cache.get(loaclity);

                                // console.log(localityRoles);
                                if (localityRoles) {
                                    if (localityRoles.name.startsWith(`I'm`)) {
                                        imfrom.push(localityRoles.name)
                                    }
                                } else {
                                    // imfrom.push('.')
                                    return;
                                }
                            })

                            if (bdayDate && bdayMonth) {

                                if (bdayMonth === 1) {
                                    profileUserBdayMonth = 'Jan'
                                } else if (bdayMonth === 2) {
                                    profileUserBdayMonth = 'Feb'
                                } else if (bdayMonth === 3) {
                                    profileUserBdayMonth = 'Mar'
                                } else if (bdayMonth === 4) {
                                    profileUserBdayMonth = 'Apr'
                                } else if (bdayMonth === 5) {
                                    profileUserBdayMonth = 'May'
                                } else if (bdayMonth === 6) {
                                    profileUserBdayMonth = 'Jun'
                                } else if (bdayMonth === 7) {
                                    profileUserBdayMonth = 'Jul'
                                } else if (bdayMonth === 8) {
                                    profileUserBdayMonth = 'Aug'
                                } else if (bdayMonth === 9) {
                                    profileUserBdayMonth = 'Sep'
                                } else if (bdayMonth === 10) {
                                    profileUserBdayMonth = 'Oct'
                                } else if (bdayMonth === 11) {
                                    profileUserBdayMonth = 'Nov'
                                } else if (bdayMonth === 12) {
                                    profileUserBdayMonth = 'Dec'
                                }

                                profileUserBdayDay = bdayDate

                            } else {

                                profileUserBdayMonth = ""
                                profileUserBdayDay = ""
                            }
                            groupsImin = '*coming soon*'

                            if (message.member.hasPermission('ADMINISTRATOR')) {

                                profileEmbedAdmin = new Discord.MessageEmbed()
                                    .setThumbnail(profileUserPFP)
                                    .setColor(profileUserColour)
                                    .setTitle(`${profileUserTag}`)
                                    .setDescription(`Here is ${profileTarget}'s profile.`)
                                    .addField('My name is', profileUserDisplayName, true)
                                    .addField(`Where am I from?`, chanceObj.shuffle(imfrom).join('\n'), true)
                                    .addField(`Groups I'm in`, groupsImin, true)
                                    .addField('Joined on', profileUserJoinedAt, true)
                                    .addField('Birthday', `${profileUserBdayMonth}-${profileUserBdayDay}`, true)
                                    .addField('Games I play', gameIPlay.join(', '), true)
                                    .addField('Usernames', usernameHistory.join(', '), true)
                                    .addField('Nicknames', nameHistory.join(', '), true)
                                    .addField('Time Out Status', timeout || 'inactive', true)
                                    .addField('Warnings', `${warningIds.length}`, true)
                                    .addField('Activity', chanceObj.shuffle(presenceRecord).join(', ') || "no activity", true)
                                    .setFooter(`Requested by ${message.member.displayName}`, message.author.avatarURL())

                                // message.author.send(`Here's an admin version of ${profileUserDisplayName}'s profile.`);
                            } else if (message.member.hasPermission('MANAGE_NICKNAMES')) {

                                profileEmbedAdmin = new Discord.MessageEmbed()
                                    .setThumbnail(profileUserPFP)
                                    .setColor(profileUserColour)
                                    .setTitle(`${profileUserTag}`)
                                    .setDescription(`Here is ${profileTarget}'s profile.`)
                                    .addField('My name is', profileUserDisplayName, true)
                                    .addField(`Where am I from?`, imfrom.join('\n'), true)
                                    .addField(`Groups I'm in`, groupsImin, true)
                                    .addField('Joined on', profileUserJoinedAt, true)
                                    .addField('Birthday', `${profileUserBdayMonth}-${profileUserBdayDay}`, true)
                                    .addField('Games I play', gameIPlay.join(', '), true)
                                    .addField('Usernames', usernameHistory.join(', '), true)
                                    .addField('Time Out Status', timeout || 'inactive', true)
                                    .addField('Warnings', `${warningIds.length}`, true)
                                    .setFooter(`Requested by ${message.member.displayName}`, message.author.avatarURL())

                                // message.author.send(`Here's an admin version of ${profileUserDisplayName}'s profile.`);
                            }

                            profileEmbed = new Discord.MessageEmbed()
                                .setThumbnail(profileUserPFP)
                                .setColor(profileUserColour)
                                .setTitle(`${profileUserTag}`)
                                .setDescription(`Here is ${profileTarget}'s profile.`)
                                .addField('My name is', profileUserDisplayName, true)
                                .addField(`Where am I from?`, imfrom.join('\n'), true)
                                .addField(`Groups I'm in`, groupsImin, true)
                                .addField('Joined on', profileUserJoinedAt, true)
                                .addField('Birthday', `${profileUserBdayMonth}-${profileUserBdayDay}`, true)
                                .addField('Games I play', gameIPlay.join(', '), true)
                                .setFooter(`Requested by ${message.member.displayName}`, message.author.avatarURL())

                            message.author.send(profileEmbedAdmin);
                            message.channel.send(profileEmbed)

                        }
                    }
                    break;

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

                        let warningEmbed,
                            timeoutstatus;

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
                        }).then(async () => {
                            // console.log(person)

                            const warn = () => {
                                person.send(warningMessage);
                                // console.log(warningMessage);
                            };

                            if (checkWarning.length > 0) {


                                const [{ currentWarningCount }] = checkWarning

                                if (currentWarningCount && currentWarningCount > 2) {
                                    // console.log('There are warnings issued before.');

                                    timeoutstatus = active

                                    warn();
                                    person.roles.add(serverRoles.timeOut)

                                    await memberSchema.findOneAndUpdate({
                                        _id: person.id
                                    }, {
                                        timeout: active
                                    }, {
                                        upsert: true
                                    })




                                } else {
                                    // console.log('There is no warning issued before.');
                                    timeoutstatus = inactive

                                    warn();


                                }
                            }

                            warningEmbed = new Discord.MessageEmbed()
                                .setAuthor('🚨 New Warning Issued')
                                .setDescription('A new warning has been issued.')
                                .setThumbnail(message.guild.iconURL())
                                .addField(`Warned Member`, person, true)
                                .addField('Warned By', message.author, true)
                                .addField('Reason', warning, true)
                                .addField('Time Out Status', timeoutstatus, true)
                                .setTimestamp()

                            serverLogs.send(warningEmbed);
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

                case 'sssuc':
                    if (message.channel === secretSantaChannel) {

                        if (message.member.roles.cache.has('780457639485243422') ||
                            message.member.hasPermission('ADMINISTRATOR')) {

                            var person = message.mentions.members.first();
                            if (!person) return message.channel.send("Please specify a valid user.").then(m => m.delete({ timeout: 5000 }))
                                .then(message.delete({ timeout: 5000 }).catch(err => console.log(err)));

                            person.roles.add('781061710542274560');
                            message.react('👍').then(() => {
                                serverLogs.send(`${message.author} has confirmed that ${person} is a secret santa.`)
                                message.delete({ timeout: 5000 });
                            })
                        }

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
        // =====================================


        // Summon Gamers
        // ===================================
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
        // ===================================


        // Beta Test Channel
        // ==========================================

        if (message.channel == betaTestChannel) {

            // reply for hi
            if (message.content.includes('hi')) {

                if (message.member.hasPermission('KICK_MEMBERS')) {
                    message.channel.send(`Hi there, ${message.author}`);
                };
            };



        };

        //    ============================================


        //    Reaction for F 
        if (message.content.toLowerCase() === 'F'.toLocaleLowerCase()) {
            message.react('🇫');
        };
        if (message.content.startsWith('F ')) (
            message.react('🇫')
        );
        if (message.content.startsWith('f ')) (
            message.react('🇫')
        );

        //      Reaction of F ends here ----------------

        // Reaction in #polls
        if (message.channel == pollsChannel) {
            message.react('🇦').then(() => message.react('🅱️'));
        };

        // Reaction in #feature-request
        if (message.channel == featureRequestChannel) {
            message.react('👍').then(() => message.react('👎'));
        };

        //deleting server invites
        if (message.content.toLowerCase().includes(`https://discord.gg/`) ||
            message.content.toLowerCase().includes('discord.gg')) {
            message.delete();
        };

        // ===============================================

        // Spam mesages
        if (usersMap.has(message.author.id)) {


            const randomSpamAlert = chanceObj.pickone([
                'that is spam!',
                'can you not spam?',
                'SPAMMER',
                `that's not nice!`
            ]);

            const userData = usersMap.get(message.author.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            let msgCount = userData.msgCount;
            // console.log(difference);
            if (difference > DIFF) {
                clearTimeout(timer);
                // console.log('Cleared timeout');
                userData.msgCount = 1;
                userData.lastMessage = message;
                userData.timer = setTimeout(() => {
                    usersMap.delete(message.author.id);
                    // console.log('Removed from RESET.');
                }, TIME);
                usersMap.set(message.author.id, userData);
            }
            else {
                ++msgCount;
                if (parseInt(msgCount) === LIMIT) {
                    const timeOutRole = message.guild.roles.cache.get(serverRoles.timeOut);
                    message.member.roles.add(timeOutRole);
                    message.channel.send(`${message.author}, ${randomSpamAlert}`);
                    serverLogs.send(`${message.author} is in temporary timeout for spamming in ${message.channel}`)
                    setTimeout(() => {
                        message.member.roles.remove(timeOutRole);
                    }, TIME);
                } else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData);
                }
            }
        }
        else {
            if (message.author.bot) return;
            let fn = setTimeout(() => {
                usersMap.delete(message.author.id);
                // console.log('Removed from map.');
            }, TIME);
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: fn
            });
        }

    })
};
