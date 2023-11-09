const mongoose= require("mongoose");
 

const databaseConnection=()=>{

    mongoose.connect("mongodb://127.0.0.1:27017/post-office-3",{}).then((result) => {
        console.log(`database connected successfully ${result.connection.host}`)
    }).catch((err) => {
        console.log(err)
    });
}

module.exports= databaseConnection