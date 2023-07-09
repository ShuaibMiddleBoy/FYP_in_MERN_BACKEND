const express = require("express");
const propertyRoute = express.Router();
const {
  deleteProperty,
  updateProperty,
  searchProperty,
  propertyDetails,
  properties,
  addProperty,
} = require("../controllers/property");
const upload = require("../multer");
const verifyToken = require("../middlewares/verifyToken");

propertyRoute.get("/search/:key").get(searchProperty);
propertyRoute.get("/property/:id", propertyDetails);
propertyRoute.get("/properties", properties);
propertyRoute.post("/add-property", upload.single("image"), addProperty);
propertyRoute.post("/update-property/:id", updateProperty);
propertyRoute.delete("/property/:id", deleteProperty);

module.exports = propertyRoute;
