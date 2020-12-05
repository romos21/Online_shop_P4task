const {Router} = require('express');
const userBasket = require('../models/UserBasket');
const product = require('../models/Product');

const router = Router();

router.post('/getBasket', async (req, res) => {
    try {
        const basket = await userBasket.findOne({user_id: req.body.user_id});
        let productsResIds = [];
        let productsResCount = [];
        basket.products.forEach(product => {
            productsResIds.push(product.id);
            productsResCount.push(product.count);
        })
        console.log(basket);
        const productsRes = await product.find({_id: {$in: productsResIds}})
        let basketRes = [];
        for (let i = 0; i < productsRes.length; i++) {
            basketRes[i] = {
                ...productsRes[i]._doc,
                count: productsResCount[i],
            }
        }
        return res.send(basketRes);
    } catch (err) {
        console.log(err + 'message');
        return res.send(err);
    }
})

router.post('/change', async (req, res) => {
    try {

        const basket = await userBasket.findOne({user_id: req.body.user_id})
        const productToChangeCount = await product.findOne({_id: req.body.product._id})
        console.log(basket.products);
        const productIndex = basket.products.findIndex((product,index )=> {
            if(product.id === req.body.product._id){
                return index;
            }
        })

        if (productIndex === -1) {
            basket.products.push({
                id: req.body.product._id,
                count: req.body.product.count,
            })
        } else {
            basket.products[productIndex].count += req.body.product.count;
        }

        productToChangeCount.count -= req.body.product.count;
        await userBasket.findOneAndUpdate({id: req.body.user_id}, {products: basket.products}, {
            new: true,
            useFindAndModify: false
        })
        await product.findOneAndUpdate({_id: req.body.product.id}, {count: productToChangeCount.count}, {
            new: true,
            useFindAndModify: false
        })

        console.log(basket);

        return res.send(basket.products.length);
    } catch (err) {
        console.log(err + 'message');
        return res.send(err);
    }
})
module.exports = router;