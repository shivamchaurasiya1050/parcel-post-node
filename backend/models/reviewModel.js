const mongoose= require("mongoose");

const revirwSchema= new mongoose.Schema({
    parcelId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"parcel"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"credential"
    },
    rating:{
        type:Number,
        default:0
    }
})

module.exports= mongoose.model("review",revirwSchema)