const mongoose = require('mongoose');


const messageCounterSchema = mongoose.Schema({

    _id: String,
    name: String,
    nameHistory: [String],
    currentUsername: String,
    usernameHistory: [String],
    userRoles: [String],
    messageCount: Number,
    suspicion: Boolean,
    currentWarningCount: Number,
    totalWarningCount: Number,
    warningIds: [String]
})

module.exports = mongoose.model('messageCount', messageCounterSchema);