const authController = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");

// register
authController.post("/register", async (req, res) => {
  try {
    const isExisting = await user.findOne({ email: req.body.email });
    if (isExisting) {
      throw new Error("Already such an email is registered");
    }
    if (req.body.password === req.body.confirmPassword) {
      const newUser = new user(req.body);
      const token = await newUser.generateToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 50000),
        httpOnly : true
      });
      const saveUser = await newUser.save();
      return res.status(201).json(saveUser);
    } else {
      res.json("Password are not matching");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});


// login
authController.post("/login", async (req, res) => {
  try {
    const findUser = await user.findOne({ email: req.body.email });
    if (!findUser) {
      throw new Error("Wrong credentials");
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (!comparePassword) {
      throw new Error("Wrong Credentials");
    }



    const token = await findUser.generateToken();
     res.cookie("jwt", token, {
        expires : new Date(Date.now() + 50000),
        httpOnly : true
     })
    res.status(201).json(findUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});


module.exports = authController;
