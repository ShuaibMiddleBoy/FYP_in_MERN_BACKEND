const multer = require("multer");
const uploadController = require("express").Router();
const path = require("path");
const {v4 : uuidv4} = require("uuid");

const imagePath = path.join(__dirname, "../../public/images");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, imagePath);
  },
  filename: (req, file, callback) => {
    callback(null, `${uuidv4()}-${Date.now()}+${path.extname(file.originalname)}`);
  },
});


const fileFilter = (req, file, cb) => {
  const allowedFileType = ['image/png', 'image/jpeg', 'image/jpg'];
  if(allowedFileType.includes(file.mimetype)){
    cb(null, true);
  } else{
    cb(null, false)
  }
}

const upload = multer({ storage, fileFilter });

uploadController.post("/image", upload.single("image"), async (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// module.exports = uploadController;
