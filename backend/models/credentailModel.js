const mongoose = require("mongoose");
const validator= require("validator")

const credetailSchema= new mongoose.Schema({

name:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    validate:{validator:validator.isEmail}
},
phone:{
    type:Number,
    required:true
},
alt_phone:{
    type:Number,

},
password:{
    type:String,
    required:true
},
trackId:{
    type:Object,
    required:true
},
role:{
    type:Object,
    default:"user"
},
createdAt:{
    type:Date,
    default:new Date(Date.now())
}
})

module.exports= mongoose.model("credential",credetailSchema)
