const {Router} = require('express');
const router = Router();
const {user,products} = require('../models');
const upload=require('../multer-config');
const fs=require('fs');
const path=require('path');


router.get('/getAdmins',async (req,res)=>{

    const admins=await user.find({isAdmin:true});
    const otherAdmins=admins.filter(admin=>admin._id.toString()!==req.query.token);

    const adminsToSend=otherAdmins.map(admin=>{
        return {
            name:admin.name,
            secName:admin.secName,
            email:admin.email,
            isAdmin: admin.isAdmin,
        }
    })
    return res.send({admins:adminsToSend});
})

router.get('/getUsers',async (req,res)=>{

    const regExpToFind=new RegExp(req.query.inputValue);
    const users=await user.find({email: { $regex: regExpToFind}});
    const otherUsers=users.filter(user=>user._id.toString()!==req.query.token);
    const usersToSend=otherUsers.map(user=>{
        return {
            name:user.name,
            secName:user.secName,
            email:user.email,
            isAdmin: user.isAdmin,
        }
    })
    return res.send({users:usersToSend});
})

router.get('/setUserStatus',async (req,res)=>{

    const userQuery=await user.findOne({email:req.query.email});
    const userToSend=await user.findOneAndUpdate(
        {email:req.query.email},
        {isAdmin: !userQuery.isAdmin},
        {new: true, useFindAndModify: false}
        );

    return res.send({status: userToSend.isAdmin});
})

router.post('/add',  upload.single('image'), async (req,res)=>{
    try {
        console.log(req.body);
        const newProduct=new product({
            ...req.body,
        });
        await newProduct.save();
        await fs.rename(path.resolve(req.file.filename),
            `${newProduct._id.toString()+req.file.originalname}`,
            (err)=>{
                if(err){
                    console.log(err);
                    return err;
                }
            })
        return res.send(products);
    }catch (err){
        console.log(err +'message');
        return res.send(err);
    }
})

module.exports = router;