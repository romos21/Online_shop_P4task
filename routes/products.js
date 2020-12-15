const {Router}=require('express');
const product=require('../models/Product');
const upload=require('../multer-config');
const fs=require('fs');
const path=require('path');

const router=Router();

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
        console.log(addawdawd);
        return res.send(products);
    }catch (err){
        console.log(err +'message');
        return res.send(err);
    }
})

router.get('/get',async (req,res)=>{
    try {
        console.log(req.query);

        const products = await product.find({

        }).skip(Number(req.query.skipValue)).limit(Number(req.query.limit));

        const productsCount = await product.find({}).countDocuments();
        const pagesCount=Math.ceil(productsCount/1);

        return res.send({products:products, pagesCount: pagesCount});
    } catch (err){
        console.log(err +'message');
        return res.send(err);
    }
})

module.exports=router;