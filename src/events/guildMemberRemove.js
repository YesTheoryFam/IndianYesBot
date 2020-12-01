const Chance = require('chance');
const chanceObj = new Chance();

const states = require('../collections/Roles/stateTags.json');
const serverRoles = require('../collections/Roles/Roles.json');

const memberSchema = require('../database/Schemas/memberSchema');
const hobbiesGroupSchema = require('../database/Schemas/hobbiesGroupSchema');
const serverSchema = require('../database/Schemas/serverSchema')

const active = 'active';
const inactive = 'inactive';

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
        }).then(async () => {

            const checkHobbies = await hobbiesGroupSchema.find({
                groupMemberIds: member.id,
                groupStatus: active
            })

            if (checkHobbies.length > 0) {

                checkHobbies.forEach(async (hobbies) => {
                    const { _id } = hobbies

                    await hobbiesGroupSchema.findOneAndUpdate({
                        _id,
                    }, {
                        $pull: {
                            groupMemberIds: member.id
                        }
                    })

                })
            }
        })

    });

};