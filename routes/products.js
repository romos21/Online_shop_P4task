const {Router} = require('express');
const product = require('../models/Product');
const User = require('../models/User');
const ProductComments = require('../models/ProductComments');
const {ObjectId} = require('mongoose').Types;
const fs = require('fs');
const path = require('path');

const router = Router();

router.get('/get', async (req, res) => {
    try {
        let products = [];
        let productsCount = 0;

        if (!req.query.searchValue.length) {
            productsCount = await product.find({}).countDocuments();
            products = await product.find({}).skip(Number(req.query.skipValue)).limit(Number(req.query.limit));
        } else {
            const regExpToFind = new RegExp(req.query.searchValue, 'i');
            productsCount = await product.find({title: {$regex: regExpToFind}}).countDocuments();
            products = await product.find({title: {$regex: regExpToFind}}).skip(Number(req.query.skipValue)).limit(Number(req.query.limit));
        }

        if (!products) {
            return res.send({errMsg: 'Product List is Empty'});
        }

        const pagesCount = Math.ceil(productsCount / req.query.limit);

        console.log('pagesCount: ', pagesCount);

        const systemWay = path.resolve(__dirname, '../multer-config/uploads/');
        await fs.readdir(systemWay, (err, files) => {
            if (err) {
                console.log(err);
            }
            const productsToSend = products.map(product => {

                const image = files.find(file => file.indexOf(product._id.toString()) !== -1);
                console.log("image: ", 'images/' + image);


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

router.get('/getComments', async (req, res) => {
    console.log("HERE");
    const comments = await ProductComments.findOne({productId: ObjectId(req.query.product)},{_id:0, comments:1});
    if(!comments){
        return res.status(200).send([]);
    }
    const commentsObj = comments.map(async (comment) => {
        const userInfo = await User.find({_id: comment.userId},{_id:0, image:1, name:1, secName:1});
        return {
            ...userInfo,
            comment: comment.text,
        }
    });

    return res.status(200).send(commentsObj);
    //const user = await User.find({)
})

router.post('/addComment', async (req, res) => {
    console.log("HERE ADD");
    const comment = new ProductComments({
        productId: ObjectId(req.body.product),
        userId: ObjectId(req.body.token),
        text: ObjectId(req.body.text),
    })

    await comment.save();

    const comments = await ProductComments.findOne({productId: ObjectId(req.query.product)},{_id:0, comments:1});

    const commentsObj = comments.map(async (comment) => {
        const userInfo = await User.find({_id: comment.userId},{_id:0, image:1, name:1, secName:1});
        return {
            ...userInfo,
            comment: comment.text,
        }
    });

    return res.status(200).send(commentsObj);
    //const user = await User.find({)
})

module.exports = router;