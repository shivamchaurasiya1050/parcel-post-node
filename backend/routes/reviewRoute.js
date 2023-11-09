const express= require("express");
const { isAuthenticate, singleParcel,isParcelStatus } = require("../middlewares/auth");
const {createReview, deleteLoginUser,getRatingParcel, averageRating}= require("../controllers/reviewController")
const router= express.Router();

router.post("/parcel/:id/createreview",isAuthenticate,singleParcel,isParcelStatus("delivered"),createReview,deleteLoginUser)
router.get("/all-rating",isAuthenticate,getRatingParcel);
router.get("/average-rating",isAuthenticate,averageRating)

module.exports=router