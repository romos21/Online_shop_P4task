const {Router}=require('express');
const product=require('../models/Product');

const router=Router();

router.get('/get',async (req,res)=>{
    try {
        console.log(req.query);

        const products = await product.find({

        }).skip(Number(req.query.skipValue)).limit(Number(req.query.limit));

        const productsCount = await product.find({}).countDocuments();
        const pagesCount=Math.ceil(productsCount/req.query.limit);

        return res.send({products:products, pagesCount: pagesCount});
    } catch (err){
        console.log(err +'message');
        return res.send(err);
    }
})

module.exports=router;