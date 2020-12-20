const Moment = require('moment-timezone');

const serverActivitySchema = require('../../database/Schemas/serverActivitySchema');

module.exports = async (bot) => {

    const updateServerActivity = async () => {
        const currentMoment = Moment().tz('Asia/Kolkata');

        const update = async () => {

            const checkCurrentHour = await serverActivitySchema.find({
                type: 'hourly',
                date: currentMoment.date(),
                month: currentMoment.month(),
                year: currentMoment.year(),
                hour: currentMoment.hour()
            })

            const checkCurrentMonth = await serverActivitySchema.find({
                type: 'daily',
                date: currentMoment.date(),
                month: currentMoment.month(),
                year: currentMoment.year(),
            })

            if (checkCurrentHour.length < 1 ||
                checkCurrentMonth.length < 1) {

                if (checkCurrentHour.length < 1) {

                    await serverActivitySchema.findOneAndUpdate({
                        type: 'hourly',
                        date: currentMoment.date(),
                        month: currentMoment.month(),
                        year: currentMoment.year(),
                        hour: currentMoment.hour()
                    }, {
                        messageCount: 0,
                        unix: currentMoment.unix()
                    }, {
                        upsert: true
                    })

                } else if (checkCurrentMonth.length < 1) {

                    await serverActivitySchema.findOneAndUpdate({
                        type: 'daily',
                        date: currentMoment.date(),
                        month: currentMoment.month(),
                        year: currentMoment.year(),
                    }, {
                        messageCount: 0,
                        unix: currentMoment.unix()
                    }, {
                        upsert: true
                    })

                }

            }

        }

        const updateCharts = async () => {

            const hourlyActivityChannel = bot.channels.cache.get('790202661236375582')
            const weeklyActivityChannel = bot.channels.cache.get('790202711353982977')
            const monthlyActivityChannel = bot.channels.cache.get('790202761412608051')


            await update();

            // hourly
            const checkHourlyActivity = await serverActivitySchema.find({
                type: 'hourly',
                date: currentMoment.date(),
                month: currentMoment.month(),
                year: currentMoment.year(),
            }).sort({
                unix: 1
            }).limit(24)

            // week
            const checkWeekActivity = await serverActivitySchema.find({
                type: 'daily',
                date: currentMoment.date(),
                month: currentMoment.month(),
                year: currentMoment.year(),
            }).sort({
                unix: 1
            }).limit(7)

            // month
            const checkMonthActivity = await serverActivitySchema.find({
                type: 'daily',
                month: currentMoment.month(),
                year: currentMoment.year(),
            }).sort({
                unix: 1
            }).limit(24)

            if (checkHourlyActivity.length > 0) {

                const messageCounts = []
                const hours = []

                checkHourlyActivity.forEach((activity) => {
                    const { messageCount, hour } = activity

                    messageCounts.push(messageCount)
                    hours.push(hour)

                })


                if (hourlyActivityChannel) {
                    const hourChart = `https://quickchart.io/chart?bkg=transparent&c={%0A%20type%3A'line'%2C%0A%20data%3A{%0A%20%20%20labels%3A[${hours.join('%2C')}]%2C%0A%20%20%20datasets%3A[{%0A%20%20%20%20%20data%3A[${messageCounts.join('%2C')}]%2C%0A%20%20%20%20%20fill%3Afalse%2C%0A%20%20%20%20%20borderColor%3AgetGradientFillHelper('vertical'%2C['%2336a2eb'%2C'%23a336eb'%2C'%23eb3639'])%2C%0A%20%20%20%20%20borderWidth%3A2%2C%0A%20%20%20%20%20pointRadius%3A0%2C%0A%20%20%20}]%0A%20}%2C%0A%20options%3A{%0A%20%20%20legend%3A{%0A%20%20%20%20%20display%3Afalse%0A%20%20%20}%2C%0A%09scales%3A{%0A%20%20%20}%0A%20}%0A}`
                    const hourChartLong = `https://quickchart.io/chart?bkg=transparent&w=800&c={%0A%20type%3A'line'%2C%0A%20data%3A{%0A%20%20%20labels%3A[${hours.join('%2C')}]%2C%0A%20%20%20datasets%3A[{%0A%20%20%20%20%20data%3A[${messageCounts.join('%2C')}]%2C%0A%20%20%20%20%20fill%3Afalse%2C%0A%20%20%20%20%20borderColor%3AgetGradientFillHelper('vertical'%2C['%2336a2eb'%2C'%23a336eb'%2C'%23eb3639'])%2C%0A%20%20%20%20%20borderWidth%3A2%2C%0A%20%20%20%20%20pointRadius%3A0%2C%0A%20%20%20}]%0A%20}%2C%0A%20options%3A{%0A%20%20%20legend%3A{%0A%20%20%20%20%20display%3Afalse%0A%20%20%20}%2C%0A%09scales%3A{%0A%20%20%20}%0A%20}%0A}`

                    hourlyActivityChannel.messages.fetch({ limit: 1 }).then(m => {
                        let lastMessage = m.first();
                        if (lastMessage) {
                            if (lastMessage.author.bot) {
                                if (messageCounts.length < 12) {
                                    lastMessage.edit(hourChart)
                                } else {
                                    lastMessage.edit(hourChartLong);
                                }
                            } else {
                                lastMessage.delete()
                            }
                        } else {
                            if (messageCounts.length < 12) {
                                hourlyActivityChannel.send(hourChart)
                            } else {
                                hourlyActivityChannel.send(hourChartLong)
                            }
                        }
                    })

                }

            }

            if (checkWeekActivity.length > 0) {

                const messageCounts = []
                const dates = []
                checkWeekActivity.forEach((activity) => {
                    const { messageCount, date } = activity

                    messageCounts.push(messageCount);
                    dates.push(date)

                })

                if (weeklyActivityChannel) {
                    const weeklyChart = `https://quickchart.io/chart?bkg=transparent&w=800&c={%0A%20type%3A'line'%2C%0A%20data%3A{%0A%20%20%20labels%3A[${dates.join('%2C')}]%2C%0A%20%20%20datasets%3A[{%0A%20%20%20%20%20data%3A[${messageCounts.join('%2C')}]%2C%0A%20%20%20%20%20fill%3Afalse%2C%0A%20%20%20%20%20borderColor%3AgetGradientFillHelper('vertical'%2C['%2336a2eb'%2C'%23a336eb'%2C'%23eb3639'])%2C%0A%20%20%20%20%20borderWidth%3A2%2C%0A%20%20%20%20%20pointRadius%3A0%2C%0A%20%20%20}]%0A%20}%2C%0A%20options%3A{%0A%20%20%20legend%3A{%0A%20%20%20%20%20display%3Afalse%0A%20%20%20}%2C%0A%09scales%3A{%0A%20%20%20}%0A%20}%0A}`

                    weeklyActivityChannel.messages.fetch({ limit: 1 }).then(m => {
                        let lastMessage = m.first();
                        if (lastMessage) {
                            if (lastMessage.author.bot) {
                                lastMessage.edit(weeklyChart)
                            } else {
                                lastMessage.delete()
                            }
                        } else {
                            weeklyActivityChannel.send(weeklyChart)
                        }
                    })

                }

            }

            if (checkMonthActivity.length > 0) {

                const messageCounts = []
                const dates = []
                checkMonthActivity.forEach((activity) => {
                    const { messageCount, date } = activity

                    messageCounts.push(messageCount)
                    dates.push(date)

                })

                if (monthlyActivityChannel) {
                    const monthlyChart = `https://quickchart.io/chart?bkg=transparent&w=800&c={%0A%20type%3A'line'%2C%0A%20data%3A{%0A%20%20%20labels%3A[${dates.join('%2C')}]%2C%0A%20%20%20datasets%3A[{%0A%20%20%20%20%20data%3A[${messageCounts.join('%2C')}]%2C%0A%20%20%20%20%20fill%3Afalse%2C%0A%20%20%20%20%20borderColor%3AgetGradientFillHelper('vertical'%2C['%2336a2eb'%2C'%23a336eb'%2C'%23eb3639'])%2C%0A%20%20%20%20%20borderWidth%3A2%2C%0A%20%20%20%20%20pointRadius%3A0%2C%0A%20%20%20}]%0A%20}%2C%0A%20options%3A{%0A%20%20%20legend%3A{%0A%20%20%20%20%20display%3Afalse%0A%20%20%20}%2C%0A%09scales%3A{%0A%20%20%20}%0A%20}%0A}`

                    monthlyActivityChannel.messages.fetch({ limit: 1 }).then(m => {
                        let lastMessage = m.first();
                        if (lastMessage) {
                            if (lastMessage.author.bot) {
                                lastMessage.edit(monthlyChart)
                            } else {
                                lastMessage.delete()
                            }
                        } else {
                            monthlyActivityChannel.send(monthlyChart)
                        }
                    })
                }
            }

        }

        updateCharts()

    }


    updateServerActivity();

    setInterval(() => {
        updateServerActivity();
    }, 1000 * 3600 * 0.5 - 3);

}