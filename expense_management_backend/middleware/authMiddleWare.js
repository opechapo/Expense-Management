const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModels = require("../model/userModels");

const protectUser = asyncHandler(async(req,res,next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") ||
    req.cookies.token
  ) {
    try{
      token = req.headers?.authorization?.split("")[1] || req.cookies.token;
      const decoded = jwt.verify(token, process.env.ACCES_TOKEN);

    }catch(error){
      console.error(error);
      return res.status(401).json({ message: "Invalid token" });
    }

}
if (!token) {
  return res.status(401).json({ message: "Not authorized, token is required" });
}
})

module.exports = {protectUser};