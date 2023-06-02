const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
require("./mongoDB/mongoDB");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController");
const propertyController = require("./controllers/propertyController");
// const uploadController = require("./controllers/uploadController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const authenticate = require("./middlewares/authenticate");
const verifyToken = require("./middlewares/verifyToken");
const imagesPath = path.join(__dirname, "../public/images");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/auth", authController);
app.use("/property", propertyController);
// app.use("/upload", uploadController);
app.use(cookieParser());
app.use("/images", express.static(imagesPath))



app.get("/about",verifyToken, (req,res)=>{
  res.send("About page")

})

app.listen(process.env.PORT, () => {
  console.log(`Server start at port no ${process.env.PORT}`);
});
