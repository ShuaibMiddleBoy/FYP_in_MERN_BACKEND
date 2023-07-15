const User = require("../models/user");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (user) {
      throw new Error("Already such an email registered");
    }

    if(req.body.password === req.body.cPassword){
      const hashPassowrd = await bcrypt.hash(req.body.password, 10);
    const hashConfirmPassword = await bcrypt.hash(req.body.cPassword, 10);
    const newUser = new User({
      ...req.body,
      password: hashPassowrd,
      cPassword: hashConfirmPassword,
    });
    let registeredUser = await newUser.save();
    const { password, cPassword, ...userData } = newUser._doc;
    if (userData) {
      Jwt.sign({id: registeredUser._id }, SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          throw new Error("Something went wrong, please try after some time");
        }
        return res.status(201).json({ user: userData, auth: token });
      });
    }
    }else{
      throw new Error("Wrong Credentials!")
    }
  
  
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Wrong Credentials!");
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      throw new Error("Wrong Credentials!");
    }

    Jwt.sign({id: user._id }, SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        throw new Error("Something went wrong, please try after some time");
      }
      const { password, cPassword, ...userData } = user._doc;
      return res.status(201).json({ user: userData, auth: token });
    });

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { register, login };
