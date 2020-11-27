const {Router}=require('express');
const product=require('../models/Product');

const router=Router();

router.post('/add',async (req,res)=>{
    const newProduct=new product({
        ...req.body,
    });
    await newProduct.save();
    return res.send(`Added new Product ${newProduct.title}`);
})

module.exports=router;