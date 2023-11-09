const express= require("express");
const { loginUser, logoutUser } = require("../controllers/adminController");
const {isAuthenticate}= require("../middlewares/auth")
const router= express.Router()


router.post("/login",loginUser);
router.get("/logout",logoutUser)

module.exports= router