const mongoose = require('mongoose');

const warningSchema = mongoose.Schema({
    warrningId: String,
    recipientId: String,
    warnedByName: String,
    warnedById: String,
    warnedAt: String,
    warningReason: String,
})

module.exports = mongoose.model('warning', warningSchema);