const jwt = require("jsonwebtoken");
const UserModels = require("../models/UserModels");
const config = require("../config/config");

const Auth = async(req,res,next) => {

  try {
    const Token = req.cookies.Allah;
    const verifyuser = jwt.verify(Token,config.SEC_KEY)
    const user = await UserModels.findOne({_id:verifyuser._id});
    req.Token = Token;
    req.user = user
    next()
  } catch (error) {
    res.render("login",{msg : "Now You Are Logout Again login Here"})
  }

}

module.exports = Auth