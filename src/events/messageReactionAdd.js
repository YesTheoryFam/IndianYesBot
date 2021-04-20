const Chance = require('chance');

const chanceObj = new Chance();

const states = require('../collections/Roles/stateTags.json');
const serverRoles = require('../collections/Roles/Roles.json');

const memberSchema = require('../database/Schemas/memberSchema');
const serverSchema = require('../database/Schemas/serverSchema')
const hobbiesGroupSchema = require('../database/Schemas/hobbiesGroupSchema');

const active = 'active';
const inactive = 'inactive';

module.exports = bot => {

    bot.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.channel.type === 'dm') return;

        // server Join Event
        // ====================================

        const regionSelectChannel = reaction.message.guild.channels.cache.get('746849042197118987');
        const southRegion = reaction.message.guild.channels.cache.get('747508674205057145');
        const northeastRegion = reaction.message.guild.channels.cache.get('747509081362792639');
        const northRegion = reaction.message.guild.channels.cache.get('747508740714135672');
        const centralRegion = reaction.message.guild.channels.cache.get('747508926936907787');
        const eastRegion = reaction.message.guild.channels.cache.get('747508785115037828');
        const westRegion = reaction.message.guild.channels.cache.get('747508857726566460');
        const islandRegion = reaction.message.guild.channels.cache.get('747508979931939038');
        const welcomeChat = reaction.message.guild.channels.cache.get('721050178794291292');

        var welcomMessage = chanceObj.pickone([`
        A wild ${user} appeared.`,
        `${user} joined the party.`,
        `${user} just landed.`,
        `${user} just *sliiid* into the server.`,
        `${user} is here.`,
        `Welcome, ${user}. We hope you brought pizza 🍕.`,
        `${user} just showed up!`,
        `Everyone welcome ${user}`,
        `Good to see you, ${user}`
        ]);

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        // Select Region
        if (reaction.message.guild.members.cache.get(user.id).roles.cache.has(serverRoles.unasigned)) {

            if (reaction.message.channel === regionSelectChannel) {

                // north
                if (reaction.emoji.name === states.north.emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.role);
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.unasigned)
                    northRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());

                    return;
                };

                // central
                if (reaction.emoji.name === states.central.emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.role);
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.unasigned)
                    centralRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());

                    return;
                };

                // east
                if (reaction.emoji.name === states.east.emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.role);
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.unasigned)
                    eastRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());

                    return;
                };

                // west
                if (reaction.emoji.name === states.west.emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.role);
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.unasigned)
                    westRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());

                    return;
                };

                // south
                if (reaction.emoji.name === states.south.emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.role);
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.unasigned)
                    southRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());

                    return;
                };

                // islands 
                if (reaction.emoji.name === states.islands.emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(states.islands.role);
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.unasigned)
                    islandRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());

                    return;
                };

                // northeast 
                if (reaction.emoji.name === states.northeast.emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.role);
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.unasigned)
                    northeastRegion.send(`Great! Now select your state, ${user}.`).then(m => m.delete());

                    return;
                };

                if (reaction.emoji.name === states.foreigner.emoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(states.foreigner.role);
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(serverRoles.unasigned)
                    await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                    await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                    welcomeChat.send(welcomMessage);

                    return;
                };

            };

        }

        // north region
        if (reaction.message.channel === northRegion) {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has(states.north.role)) return;

            // ladhak
            if (reaction.emoji.name === states.north.ladhak.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.ladhak.role)
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // Chandigarh
            if (reaction.emoji.name === states.north.chandigarh.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.chandigarh.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // delhi
            if (reaction.emoji.name === states.north.delhi.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.delhi.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // haryana
            if (reaction.emoji.name === states.north.haryana.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.haryana.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // himachal pradesh
            if (reaction.emoji.name === states.north.himachalPradesh.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.himachalPradesh.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // Jammu and Kashmir
            if (reaction.emoji.name === states.north.jammuandkashmir.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.jammuandkashmir.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // punjab
            if (reaction.emoji.name === states.north.punjab.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.punjab.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // rejasthan
            if (reaction.emoji.name === states.north.rajasthan.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.north.rajasthan.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // back
            if (reaction.emoji.name === '◀️') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.unasigned);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.north.role);

                regionSelectChannel.send(`Select your region, ${user}.`).then(m => m.delete());

                return;
            };

        };

        // South Region
        if (reaction.message.channel === southRegion) {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has(states.south.role)) return;

            // Andra Pradesh
            if (reaction.emoji.name === states.south.andraPradesh.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.andraPradesh.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // karnataka
            if (reaction.emoji.name === states.south.karnataka.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.karnataka.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // kerala
            if (reaction.emoji.name === states.south.kerala.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.kerala.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // puduchery
            if (reaction.emoji.name === states.south.puduchery.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.puduchery.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // Tamil Nadu
            if (reaction.emoji.name === states.south.tamilNadu.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.tamilNadu.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // telengana
            if (reaction.emoji.name === states.south.telengana.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.south.telengana.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // back
            if (reaction.emoji.name === '◀️') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.unasigned);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.south.role);

                regionSelectChannel.send(`Select your region, ${user}.`).then(m => m.delete());

                return;
            };

        };

        // Northeast Region
        if (reaction.message.channel === northeastRegion) {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has(states.northeast.role)) return;

            if (reaction.emoji.name === states.northeast.arunachalPradesh.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.arunachalPradesh.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.northeast.assam.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.assam.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.northeast.manipur.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.manipur.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.northeast.nagaland.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.nagaland.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.northeast.meghalaya.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.meghalaya.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.northeast.sikkim.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.sikkim.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.northeast.tripura.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.northeast.tripura.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // back
            if (reaction.emoji.name === '◀️') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.unasigned);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.northeast.role);

                regionSelectChannel.send(`Select your region, ${user}.`).then(m => m.delete());

                return;
            };
        };

        // Central Region
        if (reaction.message.channel === centralRegion) {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has(states.central.role)) return;

            if (reaction.emoji.name === states.central.chhattisgarh.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.chhattisgarh.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.central.madhyaPradesh.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.madhyaPradesh.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.central.uttarPradesh.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.uttarPradesh.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.central.uttarakhand.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.central.uttarakhand.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // back
            if (reaction.emoji.name === '◀️') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.unasigned);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.central.role);

                regionSelectChannel.send(`Select your region, ${user}.`).then(m => m.delete());

                return;
            };
        };

        // East Region
        if (reaction.message.channel === eastRegion) {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has(states.east.role)) return;

            if (reaction.emoji.name === states.east.bihar.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.bihar.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.east.jharkhand.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.jharkhand.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.east.odisha.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.jharkhand.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.east.westBengal.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.east.westBengal.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // back
            if (reaction.emoji.name === '◀️') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.unasigned);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.east.role);

                regionSelectChannel.send(`Select your region, ${user}.`).then(m => m.delete());

                return;
            };


        };

        // West Region
        if (reaction.message.channel === westRegion) {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has(states.west.role)) return;

            if (reaction.emoji.name === states.west.DNH_DnD.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.DNH_DnD.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.west.goa.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.goa.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.west.gujarat.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.gujarat.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.west.maharashtra.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.west.maharashtra.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // back
            if (reaction.emoji.name === '◀️') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.unasigned);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.west.role);

                regionSelectChannel.send(`Select your region, ${user}.`).then(m => m.delete());

                return;
            };
        };

        // Island Region
        if (reaction.message.channel === islandRegion) {
            if (!reaction.message.guild.members.cache.get(user.id).roles.cache.has(states.islands.role)) return;

            if (reaction.emoji.name === states.islands.andamanNicobar.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.islands.andamanNicobar.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.islands.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };
            if (reaction.emoji.name === states.islands.lakshadweep.emoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(states.islands.lakshadweep.role);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.islands.role);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.YesFamMember);
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.badgeSeparator);

                welcomeChat.send(welcomMessage);

                return;
            };

            // back
            if (reaction.emoji.name === '◀️') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(serverRoles.unasigned);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(states.islands.role);

                regionSelectChannel.send(`Select your region, ${user}.`).then(m => m.delete());

                return;
            };

        };

        // =======================================

        const gameSelectChannel = reaction.message.guild.channels.cache.get('766246855939588127');
        const hobbiesSelectChannel = reaction.message.guild.channels.cache.get('766284120497717249');

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

};