const mongoose = require("mongoose");
const validator = require("validator");

const propertySchema = new mongoose.Schema(
  {
    currentOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 8,
    },

    type: {
      type: String,
      enum: ["beach", "mountain", "village"],
      required: true,
    },
    desc: {
      type: String,
      required: true,
      minLenght: 20,
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    },
    squareMeters: {
      type: Number,
      required: true,
    },
    continent: {
      type: String,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
      min: 2,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const propertyModel = new mongoose.model("properties", propertySchema);

module.exports = propertyModel;
