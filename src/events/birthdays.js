const Moment = require('moment-timezone');
const Chance = require('chance');

const chanceObj = new Chance();

const serverRoles = require('../collections/Roles/Roles.json')

const memberSchema = require('../database/Schemas/memberSchema');



module.exports = (bot) => {


    const checkBirthdays = async () => {

        const moment = Moment().tz('Asia/Kolkata');
        const todaysDate = moment.date();
        const yesterdaysDate = moment.date() - 1;
        const month = moment.month() + 1;

        const yfi = bot.guilds.cache.get('701088725605548133');
        const bdayRole = yfi.roles.cache.get(serverRoles.birthday);
        const chatChannel = bot.channels.cache.get('701088725605548136');

        const findTodaysBday = await memberSchema.find({
            bdayDate: todaysDate,
            bdayMonth: month
        });

        const findBelatedBday = await memberSchema.find({
            bdayDate: yesterdaysDate,
            bdayMonth: month
        });

        if (findTodaysBday.length > 0) {

            findTodaysBday.forEach(async (bdayData) => {
                const { _id } = bdayData
                const bdayMember = await yfi.members.fetch(_id).catch((err) => { return; });

                if (bdayMember) {
                    if (!bdayMember.roles.cache.has(bdayRole.id)) {
                        const birthdayPerson = `<@${_id}>`
                        const birthdayWish = chanceObj.pickone([
                            `HOOORRRAAAYYY! It's ${birthdayPerson}'s birthday!🎉 🎊`,
                            `OMG! Today is ${birthdayPerson}'s birthday!! 🎉 🎊`,
                            `EVERYONE! It's ${birthdayPerson}'s birthday!!🎉 🎊`,
                        ])

                        bdayMember.roles.add(bdayRole)
                        chatChannel.send(`**${birthdayWish}**`)
                    }
                }
            })

        } else if (findBelatedBday.length > 0) {

            findBelatedBday.forEach(async (bdayData) => {
                const { _id } = bdayData
                const belatedBdayMember = await yfi.members.fetch(_id).catch((err) => { return; });

                if (belatedBdayMember) {
                    if (belatedBdayMember.roles.cache.has(bdayRole.id)) {
                        belatedBdayMember.roles.remove(bdayRole)
                    }
                }
            })

        }
    }

    const work = async () => {
        const minutes = .5
        setInterval(() => {
            checkBirthdays()
        }, 60000 * minutes)
    }

    work();

}