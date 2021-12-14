const {Router} = require('express');
const router = Router();
const user = require('../models/User');
const product=require('../models/Product');
const upload=require('../multer-config');
const fs=require('fs');
const path=require('path');



router.get('/getAdmins',async (req,res)=>{
    try {
        const admins = await user.find({isAdmin: true});
        const otherAdmins = admins.filter(admin => admin._id.toString() !== req.query.token);

        const adminsToSend = otherAdmins.map(admin => {
            return {
                name: admin.name,
                secName: admin.secName,
                email: admin.email,
                isAdmin: admin.isAdmin,
            }
        })
        return res.send({admins: adminsToSend});
    } catch (err){
        console.log(err+' message')
        res.status(404).send({errMsg: err});
    }
})

router.get('/getUsers',async (req,res)=>{
    try {
        const regExpToFind = new RegExp(req.query.searchValue);
        const users = await user.find({email: {$regex: regExpToFind}});
        const otherUsers = users.filter(user => user._id.toString() !== req.query.token);
        const usersToSend = otherUsers.map(user => {
            return {
                name: user.name,
                secName: user.secName,
                email: user.email,
                isAdmin: user.isAdmin,
            }
        })
        return res.send({users: usersToSend})
    } catch (err){
        console.log(err+' message')
        res.status(404).send({errMsg: err});
    }
})

router.get('/setUserStatus',async (req,res)=>{
    try {

        const userQuery = await user.findOne({email: req.query.email});
        const userToSend = await user.findOneAndUpdate(
            {email: req.query.email},
            {isAdmin: !userQuery.isAdmin},
            {new: true, useFindAndModify: false}
        );

        return res.send({status: userToSend.isAdmin});
    } catch (err){
        console.log(err+' message')
        res.status(400).send({errMsg: err});
    }
})

router.post('/addProduct',  upload.single('image'), async (req,res)=>{
    try {
        const newProductInfo={
            title: req.body.title,
            description: req.body.description,
            cost: Number(req.body.cost),
            count: Number(req.body.count),
        }
        const newProduct=new product({
            ...newProductInfo
        });
        await newProduct.save();

        const prevFileName=path.resolve(__dirname,'../multer-config/uploads', req.body.title+req.file.originalname);
        const newFileName=path.resolve(__dirname,'../multer-config/uploads', newProduct._id+req.file.originalname);
        await fs.rename(prevFileName,newFileName, (err)=>{
            if(err){
                console.log(err);
                return({errMsg:err});
            }
            return res.send({...newProduct._doc, image:'images/'+newProduct._id+req.file.originalname});
        })
    }catch (err){
        console.log(err+' message')
        res.status(400).send({errMsg: err});
    }
})

module.exports = router;