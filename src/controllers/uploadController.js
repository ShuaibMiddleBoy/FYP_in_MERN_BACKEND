const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const uploadController = require("express").Router();

const filePath = path.join(__dirname, "../../public/images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

uploadController.post("/image", upload.single("image"), async (req, res) => {
  try {
    res.status(201).json("File Uploaded Successfully!");
  } catch (error) {
    console.error(error);
  }
});

module.exports = uploadController;
