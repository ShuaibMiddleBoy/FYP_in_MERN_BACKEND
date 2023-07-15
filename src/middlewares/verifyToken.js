const Jwt = require("jsonwebtoken");


const SECRET_KEY = process.env.SECRET_KEY;


const verifyToken = (req,res,next) => {
    let token = req.headers['authorization'];
    if(!token) return res.status(403).json({msg:"Not authorized, No Token"})
    if(token && token.startsWith("Bearer ")){
   token = token.split(" ")[1];
   Jwt.verify(token, SECRET_KEY, (err,data)=>{
        if(err){
            res.send({"result":"Please provide valid token"})
        }else{
          req.user = data;
            next();
        }
   })
    }else{
res.send({"result":"Please add token with header"})
    }
}

module.exports = verifyToken;