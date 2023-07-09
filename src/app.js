const dotenv = require("dotenv").config();
require("./mongoDB/mongoDB")
const express = require("express");
const app = express();
const userRouter = require("./routers/user");
const propertyRouter = require("./routers/property");
const cors = require("cors");
const path = require("path");
const verifyToken = require("./middlewares/verifyToken");


const filePath = path.join(__dirname, "../public/images");

app.use(cors());
app.use(express.json());
app.use( "/auth",userRouter);
app.use(propertyRouter);

app.use("/images", express.static(filePath))



const port = process.env.PORT;
app.listen(port, ()=>{
  console.log(`Server has been started Successfully at port no ${port}`);
})
