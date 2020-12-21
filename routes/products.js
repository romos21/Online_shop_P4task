const {Router} = require('express');
const product = require('../models/Product');
const fs = require('fs');
const path = require('path');

const router = Router();

router.get('/get', async (req, res) => {
    try {
        let products = [];
        let productsCount=0;

        if(!req.query.searchValue.length){
            productsCount = await product.find({}).countDocuments();
            products = await product.find({}).skip(Number(req.query.skipValue)).limit(Number(req.query.limit));
        } else {
            const regExpToFind = new RegExp(req.query.searchValue,'i');
            productsCount = await product.find({title: {$regex: regExpToFind}}).countDocuments();
            products = await product.find({title: {$regex: regExpToFind}}).skip(Number(req.query.skipValue)).limit(Number(req.query.limit));
        }

        if (!products) {
            return res.send({errMsg: 'Product List is Empty'});
        }

        const pagesCount = Math.ceil(productsCount / req.query.limit);

        console.log('pagesCount: ',pagesCount);

        const systemWay = path.resolve(__dirname, '../multer-config/uploads/');
        await fs.readdir(systemWay, (err, files) => {
            if (err) {
                console.log(err);
            }
            const productsToSend = products.map(product => {

                const image = files.find(file => file.indexOf(product._id.toString()) !== -1);

                return {
                    ...product._doc,
                    image: image ? 'images/' + image : '',
                }
            })

            return res.send({products: productsToSend, pagesCount: pagesCount});
        })

    } catch (err) {
        console.log(err + ' message')
        return res.status(400).send({errMsg: err});
    }
})

module.exports = router;