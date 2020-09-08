const mongooseTest = require('mongoose');
const mongoCred = process.env.mongoDBCred;

module.exports = async () => {
    await mongooseTest.connect(mongoCred, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    return mongooseTest;
    };