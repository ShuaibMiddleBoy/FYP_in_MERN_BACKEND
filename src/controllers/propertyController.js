const Property = require("../models/property");

const SECRET_KEY = process.env.SECRET_KEY;

// ADD PROPERTY ************************************************
const addProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      currentOwner: req.user.id,
    });
    const result = await property.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET ALL PROPERTIES *******************************************
const getAll = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(201).send(properties);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET FEATURED PROPERY **************************************
const featuredProperties = async (req, res) => {
  try {
    const property = await Property.find({ featured: true }).populate(
      "currentOwner",
      "-password -cPassword"
    );
    res.status(201).send(property);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET ALL FROM SPECIFIC TYPE *******************************
const specificTypeProperty = async (req, res) => {
  const type = req.query;
  try {
    if (type) {
      const properties = await Property.find(type).populate(
        "currentOwner",
        "-password -cPassword"
      );
      return res.status(201).json(properties);
    } else {
      return res.status(500).json({ msg: "No Such Type" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET COUNT OF TYPES --> EX: {home : 2, house : 5} ******************
const countTypesProperty = async (req, res) => {
  try {
    const homeType = await Property.countDocuments({ type: "home" });
    const houseType = await Property.countDocuments({ type: "house" });
    return res.status(201).json({
      home: homeType,
      house: houseType,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET SPECIFIC PROPERTY DETAILS **********************************
const propertyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById({ _id: id }).populate(
      "currentOwner",
      "-password, -cPassword"
    );
    if (!property) {
      throw new Error("No such property this id");
    } else {
      res.status(201).send(property);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// DELETE PROPERTY *************************************************
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.currentOwner.toString() !== req.user.id.toString()) {
      throw new Error("You are not allowed to delete other people properties");
    } else {
      const DeleteProperty = await Property.deleteOne({ _id: req.params.id });
    }

    res.status(201).send({ msg: "Successfully deleted property" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// UPDATE PROPERTY ***************************************************
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    // console.log(property.currentOwner);
    // console.log(req.user.id);
    if (property.currentOwner.toString() !== req.user.id.toString()) {
      throw new Error("You are not allowed to upadate other people properties");
    } else {
      const updatedProperty = await Property.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      res.status(201).send(updatedProperty);
    }
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
  getAll,
  addProperty,
  specificTypeProperty,
  featuredProperties,
  countTypesProperty,
};
