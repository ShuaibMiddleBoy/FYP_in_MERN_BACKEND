const express = require("express");
const router = new express.Router();
const app = express();
const Property = require("../models/property");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, "../../public/images");
// console.log(filePath);

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, filePath)
    },
    filename : function(req, file, cb){
        cb(null, uuidv4()+'-'+ Date.now() + path.extname(file.originalname))
    }
})




const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else{
        cb(null, false);
    }
}

let upload = multer({storage})


router.post("/add-property", upload.single("image"), async (req, res)=>{
    try {
        const image = req.file.filename;
        const property = new Property({...req.body, image});
        const result = await property.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

const getProperty = async (req, res) => {
    try {
        const property = await Property.find();
        res.status(201).send(property);   
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const propertyDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const property = await Property.findById({_id:id});
        res.status(201).send(property);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const deleteProperty = async (req, res) => {
    try {
        const property = await Property.deleteOne({_id:req.params.id});
        res.status(201).send(property)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {router, getProperty, propertyDetails, deleteProperty};