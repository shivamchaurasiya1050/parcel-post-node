const express= require("express");
const app= express()
require("dotenv").config()
const PORT= process.env.PORT;
const databaseConnection= require("./config/conn")
const parcel= require("./routes/parcelRoute")
const admin= require("./routes/adminRoute")
const review= require("./routes/reviewRoute")
const cookieParser= require("cookie-parser")
const errorMiddleware= require("./middlewares/error");
const rateLimit= require("express-rate-limit")
const logger= require("morgan")

const limiter= rateLimit({
    windowMs:15*60*1000,
    max:10,
    message: "Rate limit exceeded. Please try again later."
})


app.use(express.json())
app.use(cookieParser())
app.use(logger('dev')); 

databaseConnection();
// index route---------------------------
app.get("/",(req,res)=>{
res.send({message:"hello from index"})
})
app.use("/public",express.static(__dirname + "/public"))
app.set("view engine","ejs")
// use route--------------------------------------
app.use("/api/v1",limiter,parcel)
app.use("/api/v1",limiter,admin)
app.use("/api/v1",limiter,review)
app.use(errorMiddleware);


app.listen(PORT,()=>{
    console.log(`sever is running on the http://localhost:${PORT}`)
})

 