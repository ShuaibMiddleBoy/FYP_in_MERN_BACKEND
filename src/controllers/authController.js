const User = require("../models/user");
const bcrypt = require("bcrypt");

const register =  async (req, res) => {
try {

    const isExisting = await User.findOne({email:req.body.email})
    if(isExisting){
        throw new Error("Already such an email registered");
    }
    const newUser =  new User(req.body);

    // generating token 
    const token = await newUser.generateAuthToken();

    // we hash the password here
    const registeredUser = await newUser.save();
    res.status(201).json(registeredUser);
} catch (error) {
    return res.status(500).json(error.message);
}
}

const login = async (req, res) => {
    try {
        const checkUser = await User.findOne({email:req.body.email});
        if(!checkUser){
            throw new Error("Wrong credentials");
        }
        const comparePassword = await bcrypt.compare(req.body.password, checkUser.password);
        if(!comparePassword){
            throw new Error("Wrong credentials");
        }
        const token = await checkUser.generateAuthToken();
        return res.status(201).json(token);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {register, login};