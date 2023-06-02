const authController = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const imagePath = path.join(__dirname, "../../public/images");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, imagePath);
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${uuidv4()}-${Date.now()}+${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileType = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedFileType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

// register
authController.post(
  "/register",
  upload.single("profileImage"),
  async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body;
    const profileImage = req.file.filename;
    try {
      if (req.body.password === req.body.confirmPassword) {
        const newUser = new user({ ...req.body, profileImage });

      //   const token = await newUser.generateToken();
      //   res.cookie("token", token, {
      //     httpOnly: true,
      //   });
        const saveUser = await newUser.save();
        jwt.sign(
          {_id:saveUser._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "2h" },
          (err, token) => {
            if (err) {
              res.send({ result: "something went wrong. please try again leter" });
            }
            res.send({ saveUser, auth: token });
          }
        );
      //   return res
      //     .status(201)
      //     .json({ message: "User registered successfully!" });
      }
      //  else {
      //   res.json("Password are not matching");
      // }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
);

// login
authController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Wrong credentials");
    }
    const findUser = await user.findOne({ email: req.body.email });
    if (!findUser) {
      throw new Error("Not find User");
    }

    // console.log(findUser.password);
    // console.log(password);
    // const comparePassword = await bcrypt.compare(
    //   password,
    //   findUser.password
    // );
    // if (!comparePassword) {
    //   throw new Error("password not match");
    // }

    jwt.sign(
      {_id:findUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          res.send({ result: "something went wrong. please try again leter" });
        }
        res.send({ findUser, auth: token });
      }
    );
    // const token = await findUser.generateToken();
    // res.cookie("toekn", token, {
    //   httpOnly: true
    // });
    // res.status(201).json(findUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = authController;
