const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, "minimum 3 letters"],
      validate(val) {
        if (validator.isEmpty(val)) {
          throw new Error("Please write the user name");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Email is invalid");
        }
      },
      validate(val) {
        if (validator.isEmpty(val)) {
          throw new Error("Please write the email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 20,
      validate(val) {
        if (validator.isEmpty(val)) {
          throw new Error("Please write the password");
        }
      },
    },
    confirmPassword: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 20,
      validate(val) {
        if (validator.isEmpty(val)) {
          throw new Error("Please write the confirm password");
        }
      },
    },
    profileImage: {
      type: String,
      default: "",
    }
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

// generating token
userSchema.methods.generateToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    this.tokens = this.tokens.concat({ token: token });
    return token;
  } catch (error) {
    res.send("the error part:" + error);
    console.log("the error part:" + error);
  }
};

// hash password
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//     this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
//   }
//   next();
// });
const userModel = new mongoose.model("users", userSchema);

module.exports = userModel;
