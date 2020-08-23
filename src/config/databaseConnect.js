const mongoCred = require('./config.json');

const mongooseTest = require('mongoose');
const mongoTestCred = mongoCred.mongoDB.testDB;

module.exports = async () => {
    await mongooseTest.connect(mongoTestCred, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    return mongooseTest;
    };


