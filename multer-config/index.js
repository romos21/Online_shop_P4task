const multer=require('multer');

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        console.log(req.body);
        cb(null,__dirname+'/uploads');
    },
    filename: async (req,file,cb)=>{
        //const token=req.body.token?req.body.token:req.query.token;
        /*const name=await bcrypt.hash(token,12);
        console.log(name);*/
        console.log(file);
        cb(null, req.body.title+file.originalname);
    },
})

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
    storage: storage,
    fileFilter: fileFilter,
});

module.exports=upload;


