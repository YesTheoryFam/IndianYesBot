const mongoose = require('mongoose');

const hobbiesGroupSchema = mongoose.Schema({
    groupName: String,
    groupEmoji: String,
    groupChannelId: String,
    groupType: String,
    groupMemberIds: [String],
    groupStatus: String
})


module.exports = mongoose.model('hobbiesGroup', hobbiesGroupSchema)