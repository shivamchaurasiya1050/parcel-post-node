const Credentails = require("../models/credentailModel");
const generateToken= require("../utils/createToken");
const catchAsyncError= require("../middlewares/catchAsyncError")

// login controll-----------------------------
exports.loginUser = catchAsyncError(async (req, res) => {
   

        const {email, password} = req.body

        const user = await Credentails.findOne({email: email})
        if (! user) {
            return res.status(400).json({message: "Invalid Email"})
        } else {
            if (user.password !== password) {
                return res.status(400).json({message: "Invalid passwprd"})
            } else {
                const token= generateToken(user.id)
                return res.status(200).cookie("token",token).json({message: "Logged in successfully", data: user})
            }
        }
    } )

// logout user------------------------------------------------
exports.logoutUser=catchAsyncError(async(req,res)=>{
   
        res.cookie("tokon",null,{expires:new Date(Date.now()),httpOnly:true})
        return res.status(200).json({message:"logged out seccessfully"})
    }) 