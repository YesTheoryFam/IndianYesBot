const mongoose = require('mongoose');
const mongoCredential = process.env.mongoDBCred;

module.exports = async () => {
    await mongoose.connect(mongoCredential, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    return mongoose;
    };