const multer= require("multer");

const storage= multer.diskStorage({
    destination:function(req,res,cb){
       cb(null,"./public/uploads")
    },
    filename:function(req,files,cb){
        cb(null,files.fieldname+"_"+Date.now()+"_"+files.originalname )
    }
})

exports.upload=multer({storage:storage,fileFilter: (req, files, cb) => {
    if (files.mimetype == "image/png" || files.mimetype == "image/jpg" || files.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },  limits:
  {fileSize: 1*1024*1024}  // 2mb
}).array("image")