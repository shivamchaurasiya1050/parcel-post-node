const Parcel= require("../models/parcelModel");
const Credentails= require("../models/credentailModel");
const crypto= require("crypto")
const nodemailer= require("nodemailer");
const fs= require("fs");
const ejs= require("ejs")
const catchAsyncError=require("../middlewares/catchAsyncError")




// create parcle=-&& user------------ &&  send mail user ,admin---------------------------------------------------

exports.createParcel=catchAsyncError(async(req,res)=>{
 
        // console.log(req.user.email)
        const {title,weight,address,pincode,state,city,name,email,phone,alt_phone}= req.body
        const input= Date.now()
        const trackid=()=>Math.floor(Math.random()*input )
        const trackId=trackid()
        const password= crypto.randomBytes(4).toString("hex")
        const price= weight*40+250
        console.log(req.files)
        if(req.files.length!==2){
            return res.status(400).json({message:"You can select maximum 2 image"})
        }else{

            const image_url=[`http://localhost:8000/public/uploads/${req.files[0].filename}`,
                              `http://localhost:8000/public/uploads/${req.files[1].filename}`]

            const user= await Credentails.create({
                              
                                 name:name,
                                 email:email,
                                 phone:phone,
                                 alt_phone:alt_phone,
                                 password:password,
                                 trackId:trackId
                          })
            const parcel= await Parcel.create({
                userId:user._id,
               title:title,
               weight:weight,
               price:price,
               address:address,
               pincode:pincode,
               state:state,
               city:city,
               image:image_url,
               trackId:trackId,
               password:password
            })

     const transporter= nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.AUTHOR_EMAIL,
            pass:process.env.AUTHOR_PASS
        }
    })
  const templateFile= fs.readFileSync("./views/index.ejs","utf-8")
  const renderdTamplet= ejs.render(templateFile,{data:{parcel,user}})
    const mailOptionUser={  //send mail user
        from:process.env.AUTHOR_EMAIL,
        to:user.email,  //user Email
        subject:"Your Parcel Confirmation",
        html:renderdTamplet
    }

    const mailOptionAdmin={  // send mail admin
            from:process.env.AUTHOR_EMAIL,
            to:req.user.email,// admin Email
            subject:"User Parcel Confirmation",
            html:renderdTamplet
   }

    transporter.sendMail(mailOptionUser,(err,info)=>{
        if(err){
            return res.status(400).json({error:err})
        }else{
            return res.status(200).json({message:"Mail send successfully of user",data:{user,info}})
        }

    })
    transporter.sendMail(mailOptionAdmin,(err,info)=>{
         if(err){
            return res.status(400).json({error:err})
         }else{
            return res.status(200).json({message:"Mail send successfully",data:{user,info}})
         }
    })

        }


    }) 
//post parcelDetails ---------user----------------------------------------------
exports.postDetails= catchAsyncError(async(req,res)=>{
  
    
    const parcel= await Parcel.findOne({trackId:req.body.trackId}).populate("userId")
    console.log(parcel)
    if(!parcel){
        return res.status(400).json({message:"Invalid TrackId or password "})
    }else{
        if(parcel.password!==req.body.password){
            return res.status(400).json({message:"Invalid TrackId or password "})
        }else{
            return res.status(200).json({message:"Parcel details", data:parcel})
        }
    }
    
  }) 

// update parcel status----- Admin-------------------------------------------------

exports.updateParcelStatus= catchAsyncError(async(req,res)=>{
    
        let parcel= await Parcel.findById(req.params.id)
        if(!parcel){
            return res.status(400).json({message:"message parcel not found"})
        }else{
          parcel= await Parcel.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true})
          return res.status(200).json({message:"Parcel status update successfully",data:parcel })
        }
        
    }) 

// soft delete parcel---------- admin----------------------------------
exports.softDeleteParcel=catchAsyncError(async(req,res)=>{
  
        let parcel= await Parcel.findById(req.params.id)
        if(!parcel){
            return res.status(400).json({message:"Parcel not found"})
        }else{
            parcel= await Parcel.findByIdAndUpdate(req.params.id,{
                isDeleted:true},{new:true})

                return res.status(200).json({message:"Parcel soft-deleted successfully",parcel})
        }
        
    }) 


// get all parcel-----------------------------------------------

exports.getAllParcel=catchAsyncError(async(req,res)=>{
    
        const parcels= await Parcel.find({isDeleted:false})
        if(!parcels){
            return res.status(400).json({message:"parcels not found"})
        }else{
            return res.status(200).json({message:"find all parcels",data:parcels})
        }
        
     })