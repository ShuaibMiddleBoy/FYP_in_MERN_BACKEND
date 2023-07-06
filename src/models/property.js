const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    currentOwner : String,
    title : String,
    type : String,
    desc: String,
    price : String,
    image : String
})

module.exports = mongoose.model("properties", propertySchema);