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
    },
    password: {
      type: String,
      required: true,
    },
    cPassword: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
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
// userSchema.methods.generateAuthToken = async function () {
//   try {
//     const token = jwt.sign(
//       { _id: this._id },
//       process.env.SECRET_KEY,
//       {expiresIn : "24h"}
//     );
//     this.tokens = this.tokens.concat({token})
//     return token;
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// hashing password
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 4);
//     this.cPassword = undefined;
//   }
//   next();
// });

module.exports = mongoose.model("users", userSchema);
