const Chance = require('chance');

const chanceObj = new Chance();

const states = require('../collections/Roles/stateTags.json');
const serverRoles = require("../collections/Roles/Roles.json");

const usersMap = new Map();
const LIMIT = 5;
const TIME = 30000;
const DIFF = 3000;


module.exports = bot => {
    bot.on('message', message => {
        if (message.channel.type === "dm") return;

        const betaTestChannel = message.guild.channels.cache.get('746755589895487488');
        const pollsChannel = message.guild.channels.cache.get('720682985581707325');
        const featureRequestChannel = message.guild.channels.cache.get('715200556817317940');
        const serverLogs = message.guild.channels.cache.get('747121287381516399');

        if (message.author.bot) return;

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
        if (message.content.includes(`https://discord.gg/`)) {
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
