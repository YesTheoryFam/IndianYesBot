const mongoose = require('mongoose');

const dmChannel = mongoose.Schema({
    _id: String,
    dmChannelId: String
})

module.exports = mongoose.model('dmChannel', dmChannel);