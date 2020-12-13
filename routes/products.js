const {Router}=require('express');
const product=require('../models/Product');

const router=Router();

router.post('/add',async (req,res)=>{
    try {
        const newProduct=new product({
            ...req.body,
        });
        await newProduct.save();
        const products=await product.find({});
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