const activityGroupSchema = require("../database/Schemas/activityGroupSchema");
const serverSchema = require('../database/Schemas/serverSchema')

const serverRoles = require('../collections/Roles/Roles.json')


module.exports = (bot) => {

    bot.on('presenceUpdate', async (oldPresence, newPresence) => {
        if (newPresence.user.bot) return;

        const activities = newPresence.activities
        const [Activity] = newPresence.activities;
        if (Activity) {

            activities.forEach(async (eachActivity) => {
                if (eachActivity.name === 'Custom Status') return;

                const appName = eachActivity.name

                await activityGroupSchema.findOneAndUpdate(
                    {
                        appName
                    },
                    {
                        $addToSet: {
                            userIDs: newPresence.member.id,
                        },
                    },
                    {
                        upsert: true,
                    }
                );

            })

        }

        if (newPresence.member.roles.cache.has(serverRoles.YesFamMember)) {

            const userOnline = async () => {

                await serverSchema.findOneAndUpdate({
                    _id: newPresence.guild.id
                }, {
                    serverName: newPresence.guild.name,
                    $addToSet: {
                        activeUsers: newPresence.userID
                    }
                }, {
                    upsert: true
                })

            }

            const userOffline = async () => {

                await serverSchema.findOneAndUpdate({
                    _id: newPresence.guild.id
                }, {
                    serverName: newPresence.guild.name,
                    $pull: {
                        activeUsers: newPresence.userID
                    }
                }, {
                    upsert: true
                })

            }

            if (oldPresence) {

                if (newPresence.status === 'offline' ||
                    newPresence.status === 'invisible') {
                    // console.log(newPresence.member.displayName, 'went offline')
                    userOffline();
                }

                if (oldPresence.status === 'online' ||
                    oldPresence.status === 'dnd' ||
                    oldPresence.status === 'idle') {
                    return;
                }

                if (newPresence.status === 'online' ||
                    newPresence.status === 'dnd' ||
                    newPresence.status === 'idle') {
                    // console.log(newPresence.member.displayName, 'is online')
                    userOnline();
                }

            } else {
                // console.log(newPresence.member.displayName, 'is also online')
                userOnline();
            }

        }

    })

};
