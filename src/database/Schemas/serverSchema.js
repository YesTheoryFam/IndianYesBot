const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
    _id: String,
    serverName: String,
    activeUsers: [String],
    mainChannels: [String],
    channelArchiveCategory: String
});

module.exports = mongoose.model('server', serverSchema);