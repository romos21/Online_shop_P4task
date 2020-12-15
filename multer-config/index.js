const multer=require('multer');

/*const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        console.log(req.body);
        cb(null,__dirname+'/uploads');
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+file.originalname);
    },
})*/

const fileFilter=(req,file,cb)=>{
    console.log(file.mimetype);
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
    dest: __dirname+'/uploads',
    fileFilter: fileFilter,
});

module.exports=upload;


