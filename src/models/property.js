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
    min : 8
  },
  type: {
    type : String,
    required : true,
    enum : ["home", "house"]
  },
  desc: {
    type : String,
    required : true,
    min : 20
  },
  price: {
    type : String,
    required : true
  },
  image: {
    type : String,
    required : true,
    default : ""
  },
  area : {
    type : String,
    required : true,
  },
  beds : {
    type : String,
    min : 1,
  },
  city : {
    type : String,
    required : true,
  },
  featured : {
    type : Boolean,
    default : false
  }

});

module.exports = mongoose.model("properties", propertySchema);
