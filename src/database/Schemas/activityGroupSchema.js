const mongoose = require('mongoose');

const activityGroupSchema = mongoose.Schema({
    appName: String,
    userIDs: [String],
}, {
    timestamps: true
})


module.exports = mongoose.model("presenceGroup", activityGroupSchema);