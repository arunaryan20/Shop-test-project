const jwt=require("jsonwebtoken");
const env=require("../config/env");

exports.genereateAccessToken=(payload)=>{
    return jwt.sign(payload,env.JWT_SECRET,{
        expiresIn:"5m"
    })
}
exports.generateRefereshToken=(payload)=>{
       return jwt.sign(payload,env.JWT_SECRET,{
        expiresIn:"7d"
       })
}

