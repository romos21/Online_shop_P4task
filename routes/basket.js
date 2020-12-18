const {Router} = require('express');
const userBasket = require('../models/UserBasket');
const {Types} = require('mongoose');
const product = require('../models/Product');
const path=require("path");
const fs=require('fs');

const router = Router();

router.get('/getBasket', async (req, res) => {
    try {
        const basket = await userBasket.findOne({user_id: Types.ObjectId(req.query.token)})

        if (!basket.products.length) {
            return res.send({basket: []})
        }

        let basketToSend = [];
        let j = 0;
        let lastIndex = 0;
        if (Number(req.query.limit) > basket.products.length) {
            lastIndex = basket.products.length;
        } else {
            lastIndex = Number(req.query.skipValue) + Number(req.query.limit);
        }
        for (let i = Number(req.query.skipValue); i < lastIndex; i++) {
            basketToSend[j] = await product.findOne({_id: basket.products[i]._id});
            basketToSend[j].count = basket.products[i].count;
            j++;
        }
        const systemWay=path.resolve(__dirname,'../multer-config/uploads/');
        await fs.readdir(systemWay, (err, files) => {
            if (err) {
                console.log(err);
            }
            basketToSend = basketToSend.map(product => {
                const image = files.find(file => file.indexOf(product._id.toString()) !== -1);
                return {
                    ...product._doc,
                    image: image? 'images/'+image:'',
                }
            })

            const pagesCount = Math.ceil(basket.products.length / Number(req.query.limit));
            return res.send({basket: basketToSend, pagesCount: pagesCount})
        })

    } catch (err) {
        console.log(err + 'message');
        return res.send({errMsg: err});
    }
})

router.put('/change', async (req, res) => {
        try {
            const reqProductId = Types.ObjectId(req.body.product._id);
            const reqUserToken = Types.ObjectId(req.body.token);

            let userBasketFind = await userBasket.findOne({user_id: reqUserToken});
            let basketProducts = userBasketFind.products;
            let productToChangeCount={};
            if (!basketProducts.length) {
                basketProducts.push(
                    {
                        _id: reqProductId,
                        count: req.body.product.count,
                    }
                );
            } else {
                productToChangeCount = basketProducts.find(product => product._id.toString() === reqProductId.toString())
                if (!productToChangeCount) {
                    basketProducts = [...basketProducts,
                        {
                            _id: reqProductId,
                            count: req.body.product.count,
                        }
                    ]
                } else {
                    productToChangeCount.count += req.body.product.count;
                    basketProducts = basketProducts.map(product => {
                        if (product._id === reqProductId.toString()) {
                            return productToChangeCount;
                        }
                        return product;
                    })
                }
            }
            await userBasket.updateOne({user_id: reqUserToken}, {products: basketProducts});
            const responseSend = {basketLength: basketProducts.length};
            if (req.body.stateForReturn === 'basket') {
                const productFind = await product.findOne({_id: reqProductId});
                responseSend.product = {
                    ...productFind._doc,
                    count:productToChangeCount.count,
                };
            }
            return res.send(responseSend);
        } catch
            (err) {
            console.log(err + 'message');
            return res.send({errMsg: err});
        }
    }
)

module.exports = router;