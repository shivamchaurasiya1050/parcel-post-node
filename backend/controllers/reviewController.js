const Review = require("../models/reviewModel");

const Credentails = require("../models/credentailModel")
const catchAsyncError= require("../middlewares/catchAsyncError")

// create rating----------user------------------------

exports.createReview = catchAsyncError( async (req, res, next) => {
    
        req.body.userId = req.user.id // login user id
        req.body.parcelId = req.params.id // parcel id
        const {rating} = req.body

        if (rating >= 1 && rating <= 5) {
            const review = await Review.create({parcelId: req.body.parcelId, userId: req.body.userId, rating: req.body.rating})
            next()
        } else {
            return res.status(400).json({message: "Rating should be 1-5"})
        }


    }) 
// delete user ----------pramanent--------------------

exports.deleteLoginUser = catchAsyncError(async (req, res) => {
    
        const user = await Credentails.findByIdAndDelete(req.user.id)
        return res.status(200).json({message: "User deleted successfully", data: user})

    }) 

// get rating with parcel--------------------------------------------------------------
exports.getRatingParcel = catchAsyncError( async (req, res) => {
  
        const ratings = await Review.find().populate("parcelId")
        if (! ratings) {
            return res.status(400).json({message: "Ratings not founds"})
        } else {

            return res.status(200).json({message: "All ratings", data: ratings})
        }}
        
        )
   

// average rating total parcel --------------------------------------------------

exports.averageRating = catchAsyncError(async (req, res) => {
   
        const totalRatings = await Review.find()

        if (! totalRatings) {
            return res.status(400).json({message: "Ratings not founds"})
        } else {

            const total = totalRatings.map((rat) => {
                return(rat.rating)

            })

            if (total.length === 0) {
                return 0;
            } else {

                const sum = total.reduce((item, curItme) => item + curItme, 0)
    
                const averageRatings = sum / total.length

                // console.log(sum)
                // console.log(avr)
                // console.log(averageRatings)
                return res.status(200).json({message: "Total average ratings", rating: averageRatings})
            }

        }

      }) 
 
