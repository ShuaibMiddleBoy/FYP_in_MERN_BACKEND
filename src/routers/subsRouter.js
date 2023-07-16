const subs = require("../controllers/subsController");
const express = require("express");
const subsRouter = express.Router();


subsRouter.post("/", subs);


module.exports = subsRouter;