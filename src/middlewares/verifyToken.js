const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(403).json({ msg: "Not authorized. No token" });
//   }
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     const token = req.headers.authorization.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
//       if (err) {
//         return res.status(403).json({ msg: "Wrong or expired token." });
//       } else {
//         req.user = data;
//         next();
//       }
//     });
//   }
// };

const verifyToken = (req, res, next) => {
  console.log("Verify Token");
  let token = req.headers['authorization'];
  if(token){
    token = token.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, valid)=>{
      if(err){
        res.status(401).json({result:"please provide valid token"})
      }else{
        next()
      }
    })
  }else{
    res.status(401).json({result:"please add token with header"})
  }
}
module.exports = verifyToken;
