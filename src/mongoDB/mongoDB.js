const mongoose = require('mongoose');


const mongoDb = async () => {
    try {
        await  mongoose.connect("mongodb://127.0.0.1:27017/realEstateSite");
        console.log("DB Connected");   
    } catch (error) {
        console.log(`DB Connection Failed: ${error}`);
    }
}


mongoDb();

module.exports = mongoDb;