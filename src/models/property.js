const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  currentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required : true
  },
  title: {
    type : String,
    required: true,
    uppercase : true,
    trim : true
  },
  type: {
    type : String,
    required : true,
    enum : ["HOME", "HOUSE"],
    uppercase : true ,
    trim : true
  },
  desc: {
    type : String,
    required : true,
    lowercase : true,
    trim : true 
  },
  price: {
    type : String,
    required : true,
    uppercase : true,
    trim : true 
  },
  image: {
    type : String,
    required : true,
    default : ""
  },
  area : {
    type : String,
    required : true,
    uppercase : true,
    trim : true
  },
  beds : {
    type : Number,
    validate(value){
      if(value<0){
        throw new Error("Number should not be negative");
      }
    }
  },
  city : {
    type : String,
    required : true,
    lowercase : true
  },
  featured : {
    type : Boolean,
    default : false
  }

});

module.exports = mongoose.model("properties", propertySchema);
