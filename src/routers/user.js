const expres = require("express");
const User = expres.Router();
const {register, login} = require("../controllers/authController");

User.route("/register").post(register);
User.route("/login").post(login);


module.exports = User;

