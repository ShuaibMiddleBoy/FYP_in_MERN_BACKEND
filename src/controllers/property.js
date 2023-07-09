const express = require("express");
const app = express();
const Property = require("../models/property");

const verifyToken = require("../middlewares/verifyToken");



const SECRET_KEY = process.env.SECRET_KEY;


// ADD PROPERTY ************************************************
const addProperty = async (req,res) => {
  try {
    const image = req.file.filename;
    const property = new Property({ ...req.body, image });
    const result = (await property.save());
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


// GET ALL PROPERTIES *******************************************
const properties = async (req,res) => {
  try {
    const property = await Property.find().populate("currentOwner");
    res.status(201).send(property);
  } catch (error) {
    res.status(500).send(error.message);
  }
}



// GET SPECIFIC PROPERTY DETAILS **********************************
const propertyDetails = async (req,res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById({ _id: id }).populate("currentOwner");
    res.status(201).send(property);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
// DELETE PROPERTY *************************************************
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.deleteOne({ _id: req.params.id }).populate("currentOwner");
    res.status(201).send(property);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// UPDATE PROPERTY ***************************************************
const updateProperty = async (req, res) => {
  try {
    const property = await Property.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(201).send(property);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// SEARCH PROPERTY ***********************************
const searchProperty = async (req, res) => {
  try {
    const property = await Property.find({
      $or: [{ type: { $regex: req.params.key } }],
    }).populate("currentOwner");
    res.status(201).send(property);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {

  deleteProperty,
  updateProperty,
  searchProperty,
  propertyDetails,
  properties,
  addProperty 
};
