const User = require("../models/user");
const bcrypt = require("bcrypt");

const register =  async (req, res) => {
try {

    const user = await User.findOne(req.body)
    if(user){
        throw new Error("Already such an email registered");
    }

    const newUser =  new User(req.body);

    let registeredUser = await newUser.save();
    registeredUser = registeredUser.toObject();
    delete registeredUser.password;
    delete registeredUser.cPassword;
    res.status(201).json(registeredUser);
} catch (error) {
    return res.status(500).json(error.message);
}
}

const login = async (req, res) => {
    try {
        const user = await User.findOne(req.body).select("-password -cPassword");
        if(req.body.password && req.body.email){
        if(user){
        return res.status(201).json(user);
        }else{
            throw new Error("Wrong Credentials")
        }
    }else{
        throw new Error("Wrong Credentials")
    }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {register, login};