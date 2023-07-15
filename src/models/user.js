const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique : true
    },
    password: {
      type: String,
      required: true,
      min : 6
    },
    cPassword: {
      type: String,
      required: true,
      min : 6
    },
    profileImage: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

// hashing password
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 4);
//     this.cPassword = undefined;
//   }
//   next();
// });

module.exports = mongoose.model("users", userSchema);
