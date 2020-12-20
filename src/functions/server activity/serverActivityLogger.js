
module.exports = async (message, currentMoment, serverActivitySchema) => {

    // hourly
    await serverActivitySchema.findOneAndUpdate({
        type: 'hourly',
        date: currentMoment.date(),
        month: currentMoment.month(),
        year: currentMoment.year(),
        hour: currentMoment.hour()
    }, {
        $inc: {
            'messageCount': 1
        },
        $addToSet: {
            members: message.author.id
        },
        unix: currentMoment.unix()
    }, {
        upsert: true
    })

    // daily
    await serverActivitySchema.findOneAndUpdate({
        type: 'daily',
        date: currentMoment.date(),
        month: currentMoment.month(),
        year: currentMoment.year(),
    }, {
        $inc: {
            'messageCount': 1
        },
        $addToSet: {
            members: message.author.id
        },
        unix: currentMoment.unix()
    }, {
        upsert: true
    })

    // monthly
    await serverActivitySchema.findOneAndUpdate({
        type: 'monthly',
        month: currentMoment.month(),
        year: currentMoment.year(),
    }, {
        $inc: {
            'messageCount': 1
        },
        $addToSet: {
            members: message.author.id
        },
        unix: currentMoment.unix()
    }, {
        upsert: true
    })

    // yearly
    await serverActivitySchema.findOneAndUpdate({
        type: 'yearly',
        year: currentMoment.year(),
    }, {
        $inc: {
            'messageCount': 1
        },
        $addToSet: {
            members: message.author.id
        },
        unix: currentMoment.unix()
    }, {
        upsert: true
    })

}