const jwt= require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_KEY= process.env.EXPIRES_KEY

const generateToken=(id)=>{
 return jwt.sign({id},SECRET_KEY,{expiresIn:EXPIRES_KEY})
}

module.exports= generateToken