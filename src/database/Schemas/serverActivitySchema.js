const mongoose = require('mongoose');

const serverActivitySchema = mongoose.Schema({
    type: String,
    messageCount: Number,
    date: Number,
    month: Number,
    year: Number,
    hour: Number,
    members: [String],
    unix: Number
})

module.exports = mongoose.model('serveractivity', serverActivitySchema);