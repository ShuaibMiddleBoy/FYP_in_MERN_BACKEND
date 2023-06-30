const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
    currentOwner : {
        type : mongoose.Types.ObjectId,
        ref : "users"
    },
    title : {
        type : String,
        required : true
    },
    type : {
        type : String,
        enum : ["beach", "mountain", "village"],
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    squareMeters : {
        type : String,
        required : true
    },
    continent : {
        type : String,
        required : true
    },
    beds : {
        type : Number,
        require : true
    },
    featured : {
        type : Boolean,
        default : false
    }
},{timeStamps:true})

module.exports = mongoose.model("properties", propertySchema);