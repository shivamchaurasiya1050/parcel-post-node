const express= require("express");
const { createParcel, updateParcelStatus, postDetails, softDeleteParcel, getAllParcel } = require("../controllers/parcelController");
const {isAuthenticate, isAuthRole}= require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const router= express.Router();


router.post("/create-parcel",isAuthenticate,isAuthRole("admin"),upload,createParcel);
router.patch("/update-status/:id",isAuthenticate,isAuthRole("admin"),updateParcelStatus);
router.patch("/soft-delete/:id",isAuthenticate,isAuthRole("admin"),softDeleteParcel);
router.post("/post-details",isAuthenticate,postDetails)
router.get("/all-parcels",isAuthenticate,getAllParcel)


module.exports= router