const dotenv = require("dotenv").config();
require("./mongoDB/mongoDB")
const express = require("express");
const app = express();
const userRouter = require("./routers/user");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use( "/auth", userRouter);


app.get("/", (req,res)=>{
  res.send("Hello world");
})

const port = process.env.PORT;
app.listen(port, ()=>{
  console.log(`Server has been started Successfully at port no ${port}`);
})
