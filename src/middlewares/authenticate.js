const jwt = require("jsonwebtoken");
const user = require("../models/user");
const dotnev = require("dotenv").config();

const authenticate = async (req, res, next) => {
        console.log("Inside token")
        const token = req.cookies.token;
        next();
        // if (!token)return res.status(401).send("Access denied...No token provided...");
        // try {
        // const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // const rootUser = await user.findOne({_id:verifyToken._id, "tokens.token":token});
        // if(!rootUser){throw new Error("User not found")}
        // req.token = token;
        // req.rootUser = rootUser;
        // req.userID = rootUser._id;
        // next();
    // } catch (error) {
    //     res.clearCookie("token");
    //     res.status(401).json("Unauthorized: No token provided")
    //     console.log(error);
    // }

}

module.exports = authenticate;