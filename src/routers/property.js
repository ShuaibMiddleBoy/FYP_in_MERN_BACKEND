const express = require("express");
const propertyRoute = express.Router();
const {getProperty, deleteProperty, propertyDetails} = require("../controllers/property");


propertyRoute.route("/properties").get(getProperty);
propertyRoute.route("/property/:id").delete(deleteProperty)
propertyRoute.route("/property/:id").get(propertyDetails);


module.exports = propertyRoute;