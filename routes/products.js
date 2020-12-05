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
        const products = await product.find({});
        return res.send(products);
    } catch (err){
        console.log(err +'message');
        return res.send(err);
    }
})

module.exports=router;