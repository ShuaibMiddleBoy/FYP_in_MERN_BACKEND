const express = require("express");
const propertyRoute = express.Router();
const {getProperty, deleteProperty, propertyDetails, updateProperty, searchProperty} = require("../controllers/property");


propertyRoute.route("/properties").get(getProperty);
propertyRoute.route("/property/:id").delete(deleteProperty);
propertyRoute.route("/property/:id").get(propertyDetails);
propertyRoute.route("/update-property/:id").put(updateProperty);
propertyRoute.route("/search/:key").get(searchProperty);


module.exports = propertyRoute;