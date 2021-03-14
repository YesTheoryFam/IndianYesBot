const { default: axios } = require("axios")
const memberSchema = require("../../database/Schemas/memberSchema")

const birthdayImport = async (message) => {
    await axios.get(' https://mohammedfarish-public-api.herokuapp.com/v1/prisonserverbirthday/member/' + message.author.id, {
        headers: {
            "x-auth-token": process.env.API_TOKEN
        }
    })
        .then(async (response) => {
            if (response.data) {
                const { bDay, bMonth, requested, added, name, id: _id } = response.data
                if (requested) {
                    if (added === null) {
                        if (message.content.toLowerCase() === 'yes') {
                            await axios.post(` https://mohammedfarish-public-api.herokuapp.com/v1/prisonserverbirthday/update?id=${_id}&added=1`, null, {
                                headers: {
                                    "x-auth-token": process.env.API_TOKEN
                                }
                            })

                            await memberSchema.findOneAndUpdate({
                                _id
                            }, {
                                bdayDate: bDay,
                                bdayMonth: bMonth
                            }, {
                                upsert: true
                            })

                            return message.channel.send(`Great! I've migrated it to the Yes Fam India Server. :smiley:. Thank you ${name} for taking your time to consider this request.`)
                        } else if (message.content.toLowerCase() === 'no') {
                            await axios.post(` https://mohammedfarish-public-api.herokuapp.com/v1/prisonserverbirthday/update?id=${_id}&added=0`, null, {
                                headers: {
                                    "x-auth-token": process.env.API_TOKEN
                                }
                            })
                            return message.channel.send(`Alright! The data stays in the database! Thank you ${name} for taking your time to consider this request.`)
                        } else if (message.content.toLowerCase() === 'delete') {
                            await axios.post(` https://mohammedfarish-public-api.herokuapp.com/v1/prisonserverbirthday/update?id=${_id}&delete=1`, null, {
                                headers: {
                                    "x-auth-token": process.env.API_TOKEN
                                }
                            })
                            return message.channel.send(`Done! It's gone now, puff! Thank you ${name} for taking your time to consider this request.`)
                        } else {
                            return message.channel.send(`Just reply with a **YES**, **NO** or **DELETE**. It's that simple`)
                        }
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err)
        })
};

module.exports = birthdayImport;