const contactUser = require("../controllers/contactController");
const express = require("express");
const contactRouter = express.Router();


contactRouter.post("/", contactUser);


module.exports = contactRouter;