const jwt= require("jsonwebtoken");
const Credential= require("../models/credentailModel");
const parcelModel = require("../models/parcelModel");
const catchAsyncError= require("./catchAsyncError")
const SECRET_KEY= process.env.SECRET_KEY;

exports.isAuthenticate=catchAsyncError(async(req,res,next)=>{
 
    const {token}= req.cookies;
    
    if(!token){
        return res.status(400).json({message:"Please login to access resoures"})
    }else{
        const decodedData= jwt.verify(token,SECRET_KEY);
       // console.log(decodedData);

        req.user= await Credential.findById(decodedData.id)
        next()
        //console.log(req.user)
    }
    
  })       

// role authentictaion----------------------------------

exports.isAuthRole=(...roles)=>{
  return(req,res,next)=>{
     if(!roles.includes(req.user.role)){
          return res.status(400).json({message:"Your role can not access this resources"})
     }else{
        next()
     }
  }
}

// check parcel status-------------------------------------------
exports.singleParcel=catchAsyncError(async(req,res,next)=>{
  
    req.parcel= await parcelModel.findById(req.params.id)
    //console.log(req.parcel)
    if(!req.parcel){
      return res.status(400).json({message:"parcel not found"})
    }
    else{
      next()
    }
    
  } )
// check parcel status-------------------------------
exports.isParcelStatus=(...ststus)=>{
  return(req,res,next)=>{
     if(!ststus.includes(req.parcel.status)){
          return res.status(400).json({message:"Your parcel status not delivered please wait"})
     }else{
      
        next()
     }
  }
}

