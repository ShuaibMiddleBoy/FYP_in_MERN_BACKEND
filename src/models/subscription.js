const mongoose = require("mongoose");
const validator =  require("validator")


const subscriptionSchema = new mongoose.Schema({
    "email" : {
     type : String,
     require : true,
     validata(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is invalid");
      }
     }
    },
})


module.exports = mongoose.model("subscription", subscriptionSchema);