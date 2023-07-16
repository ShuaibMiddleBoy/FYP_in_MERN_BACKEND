const mongoose = require("mongoose");
const validator =  require("validator")


const contactSchema = new mongoose.Schema({
    "firstName" : {
        type : String,
        minlength : 3,
        require : true
    },
    "lastName" : {
        type : String,
        minlength : 3,
        require : true
    },
    "email" : {
     type : String,
     require : true,
     validata(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is invalid");
      }
     }
    },
    phone : String,
    message : {
        type : String,
        minlength : 10
    }
})


module.exports = mongoose.model("contact", contactSchema);