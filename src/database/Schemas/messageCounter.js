const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const messageCounterSchema = mongoose.Schema({

    _id: reqString,
    name: reqString,
    nameHistory: [String],
    currentUsername: reqString,
    usernameHistory: [String],
    userRoles: [String],
    messageCount: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('messageCount', messageCounterSchema);