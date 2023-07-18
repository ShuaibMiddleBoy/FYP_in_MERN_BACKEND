const dotenv = require("dotenv").config();
require("./mongoDB/mongoDB")
const express = require("express");
const app = express();
const authRouter = require("./routers/authRoute");
const propertyRouter = require("./routers/propertyRoute");
const uploadController = require("./controllers/uploadController");
const contactRouter = require("./routers/contactRouter");
const subsRouter = require("./routers/subsRouter");
const cors = require("cors");
const path = require("path");


const filePath = path.join(__dirname, "../public/images");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/auth",authRouter);
app.use("/property",propertyRouter);
app.use("/contact", contactRouter)
app.use("/subs", subsRouter)
app.use("/upload", uploadController);
app.use("/images", express.static(filePath))



const port = process.env.PORT;
app.listen(port, ()=>{
  console.log(`Server has been started Successfully at port no ${port}`);
})
