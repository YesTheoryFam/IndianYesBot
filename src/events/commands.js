// const Discord = require('discord.js');
// const bot = new Discord.Client({partials: ["MESSAGE", "REACTION", "CHANNEL"]});

const serverRoles = require('../collections/Roles/Roles.json')
const PREFIX = "!";


module.exports = bot => {

    bot.on('message', message => {
        if (message.channel.type === "dm") return;

        if (message.author.bot) return;

        const serverLogs = message.guild.channels.cache.get('747121287381516399');
        const betaTestChannel = message.guild.channels.cache.get('746755589895487488');
        const timeOutChannel = message.guild.channels.cache.get('749988359471890563');
        const archiveCategory = '747111680168820766';

        if (message.content.startsWith(PREFIX)) {
            let args = message.content.substring(PREFIX.length).split(" ");
            switch (args[0]) {

                case 'ss':

                    const nisha = '572721594959659022';
                    const niveditha = '640457436859334657';
                    const ritika = '731818289717575770';
                    const shreeya = '749624514425520168';
                    const beta = '712795842083553363';
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


                        person.roles.add(serverRoles.timeOut);
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


                            person.roles.remove(serverRoles.timeOut);
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

                        message.channel.setParent(archiveCategory);
                        message.react('👍');
                        message.channel.setPosition(0);
                        serverLogs.send(`${message.author} has archived ${message.channel} channel.`);

                    };

                    break;

            };
        }
    })

};
