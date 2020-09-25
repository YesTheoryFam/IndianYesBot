const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const presenceGroupSchema = mongoose.Schema({
    appName: String,
    userIDs: [String],

})


module.exports = mongoose.model("presenceGroup", presenceGroupSchema);