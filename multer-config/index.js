const multer=require('multer');

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,__dirname+'/uploads');
    },
    filename: async (req,file,cb)=>{
        cb(null, req.body.title+file.originalname);
    },
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload=multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports=upload;


