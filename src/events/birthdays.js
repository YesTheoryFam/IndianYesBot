const Moment = require('moment-timezone');
const Chance = require('chance');

const chanceObj = new Chance();

const serverRoles = require('../collections/Roles/Roles.json');

const memberSchema = require('../database/Schemas/memberSchema');



module.exports = (bot) => {


    const checkBirthdays = async () => {

        const moment = Moment().tz('Asia/Kolkata');
        const todaysDate = moment.date();
        const month = moment.month() + 1;

        const yfi = await bot.guilds.fetch('701088725605548133');
        const bdayRole = yfi.roles.cache.get(serverRoles.birthday);

        const findTodaysBday = await memberSchema.find();

        if (findTodaysBday.length > 0) {

            const chatChannel = bot.channels.cache.get('701088725605548136');

            findTodaysBday.forEach(async (member) => {
                const { _id, bdayMonth, bdayDate } = member

                const fetchMemeber = await yfi.members.fetch(_id).catch((err) => { return });

                if (bdayMonth && bdayDate) {

                    if (fetchMemeber) {

                        if (bdayMonth === month && bdayDate === todaysDate) {
                            if (!fetchMemeber.roles.cache.has(serverRoles.birthday)) {

                                const birthdayPerson = `<@${_id}>`
                                const birthdayWish = chanceObj.pickone([
                                    `HOOORRRAAAYYY! It's ${birthdayPerson}'s birthday!🎉 🎊`,
                                    `OMG! Today is ${birthdayPerson}'s birthday!! 🎉 🎊`,
                                    `EVERYONE! It's ${birthdayPerson}'s birthday!!🎉 🎊`,
                                ]);

                                fetchMemeber.roles.add(serverRoles.birthday);
                                chatChannel.send(birthdayWish);

                            }
                        } else {

                            if (fetchMemeber.roles.cache.has(serverRoles)) {

                                fetchMemeber.roles.remove(serverRoles.birthday);

                            }

                        }

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