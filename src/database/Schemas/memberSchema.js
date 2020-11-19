const mongoose = require('mongoose');


const memberSchema = mongoose.Schema({

    _id: String,
    name: String,
    nameHistory: [String],
    currentUsername: String,
    usernameHistory: [String],
    userRoles: [String],
    messageCount: Number,
    timeout: String,
    suspicion: String,
    currentWarningCount: Number,
    totalWarningCount: Number,
    warningIds: [String],
    servers: [String]
})

module.exports = mongoose.model('member', memberSchema);