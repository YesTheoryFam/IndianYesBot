const Chance = require('chance');
const chanceObj = new Chance();

const states = require('../collections/Roles/stateTags.json');
const serverRoles = require('../collections/Roles/Roles.json');

const memberSchema = require('../database/Schemas/memberSchema');
const serverSchema = require('../database/Schemas/serverSchema')


module.exports = bot => {

    bot.on('guildMemberRemove', async (member) => {
        const serverEntryLog = bot.channels.cache.get('715183025607934033');
        serverEntryLog.send(`${member}(${member.user.tag}) just left ${member.guild.name} Server.`);

        await serverSchema.findOneAndUpdate({
            _id: member.guild.id
        }, {
            $pull: {
                activeUsers: member.id
            }
        }, {
            upsert: true
        })

    });

};