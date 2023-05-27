const multer = require("multer");
const uploadController = require("express").Router();


const storage = multer.diskStorage({
    destination : (req, file, callback)=>{
        callback(null, "/public/images");
    },
    filename : (req, file, callback)=>{
        callback(null, req.body.filename);
    }
});

const upload = multer({storage});

uploadController.post("/image", upload.single("image"), async (req, res)=>{
    try {
        return res.status(200).json("File uploaded successfully")
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
})


module.exports = uploadController;