const Jwt = require("jsonwebtoken");


const SECRET_KEY = process.env.SECRET_KEY;


const verifyToken = (req,res,next) => {
    console.log("Middleware Called");
    let token = req.headers['authorization'];
    if(token){
   token = token.split(" ")[1];
   Jwt.verify(token, SECRET_KEY, (err,valid)=>{
        if(err){
            res.send({"result":"Please provide valid token"})
        }else{
            next();
        }
   })
    }else{
res.send({"result":"Please add token with header"})
    }
    console.log(token);
    // next();
}

module.exports = verifyToken;