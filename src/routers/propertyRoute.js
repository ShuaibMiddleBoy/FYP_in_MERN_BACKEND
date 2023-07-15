const express = require("express");
const propertyRoute = express.Router();
const {
  deleteProperty,
  updateProperty,
  searchProperty,
  propertyDetails,
  getAll,
  featuredProperties,
  addProperty,
  specificTypeProperty,
  countTypesProperty,
} = require("../controllers/propertyController");
const verifyToken = require("../middlewares/verifyToken");

propertyRoute.get("/search/:key", searchProperty);
propertyRoute.get("/find", specificTypeProperty);
propertyRoute.get("/find/types", countTypesProperty);
propertyRoute.get("/find/featured", featuredProperties);
propertyRoute.get("/find/:id", propertyDetails);
propertyRoute.get("/getAll", getAll);
propertyRoute.post("/", verifyToken, addProperty);
propertyRoute.patch("/:id", verifyToken ,updateProperty);
propertyRoute.delete("/:id",verifyToken, deleteProperty);

module.exports = propertyRoute;
