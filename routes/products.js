const {Router} = require('express');
const product = require('../models/Product');
const fs = require('fs');
const path=require('path');

const router = Router();

router.get('/get', async (req, res) => {
    try {
        const products = await product.find({}).skip(Number(req.query.skipValue)).limit(Number(req.query.limit));
        if(!products){
            return res.send({errMsg: 'Product List is Empty'});
        }
        const productsCount = await product.find({}).countDocuments();
        const pagesCount = Math.ceil(productsCount / req.query.limit);

        const systemWay=path.resolve(__dirname,'../multer-config/uploads/');
        await fs.readdir(systemWay, (err, files) => {
            if (err) {
                console.log(err);
            }
           const productsToSend = products.map(product => {

                const image = files.find(file => file.indexOf(product._id.toString()) !== -1);

                return {
                    ...product._doc,
                    image: image? 'images/'+image:'',
                }
            })

            return res.send({products: productsToSend, pagesCount: pagesCount});
        })

    }catch (err){
        console.log(err+' message')
        return res.send({errMsg: err});
    }
})

module.exports = router;