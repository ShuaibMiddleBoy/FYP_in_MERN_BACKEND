const expres = require("express");
const userRoute = expres.Router();
const { register, login } = require("../controllers/authController");

userRoute.route("/register").post(register);
userRoute.route("/login").post(login);

module.exports = userRoute;
