// const verifyToken = require("../middlewares/verifyToken");
const Property = require("../models/property");
const propertyController = require("express").Router();

// get all properties
propertyController.get("/getAll", async (req, res) => {
  try {
    const properties = await Property.find();
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get featured properties
propertyController.get("/find/featured", async (req, res) => {
  try {
    const properties = await Property.find({ featured: true }).populate(
      "currentOwner",
      "-password"
    );
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get all property from a specific type
propertyController.get("/find", async (req, res) => {
  const type = req.query;
  try {
    const properties = await Property.find(type).populate(
      "currentOwner",
      "-password"
    );
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get count types of properties
propertyController.get("/find/type", async (req, res) => {
  try {
    const beachType = await Property.countDocuments({ type: "beach" });
    const mountainType = await Property.countDocuments({ type: "mountain" });
    const villageType = await Property.countDocuments({ type: "village" });
    return res.status(200).json({
      beach: beachType,
      mountain: mountainType,
      village: villageType,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// get individual property 
propertyController.get("/find/:id", async (req,res)=>{
    console.log(req.params);
try {
    const property = await Property.find({_id:req.params.id}).populate("currentOwner", "-password");
    if(!property){
        throw new Error("No such property with this id");
    }else{
        res.status(200).json(property);
    }
} catch (error) {
    return res.status(500).json(error.message);
}
})

// create property
propertyController.post("/", async (req, res) => {
  try {
    const property = await Property.create(req.body);
    return res.status(200).json(property);
  } catch (error) {
  return res.status(500).json(error.message);
  }
});


// update property 
propertyController.put("/:id", async (req,res)=>{
  try {
    const property = await Property.findByIdAndUpdate({_id:req.params.id}, {$set:req.body}, {new : true});
    return res.status(201).json(property);
  } catch (error) {
  return res.status(500).json(error.message);
  }
});


// delete property
propertyController.delete("/:id", async (req,res)=>{
  try {
    const property = await Property.findByIdAndDelete({_id:req.params.id});
    return res.status(201).json(property);
  } catch (error) {
  return res.status(500).json(error.message);
  }
});


module.exports = propertyController;
