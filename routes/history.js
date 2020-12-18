const {Router} = require('express');
const router = Router();
const {Types} = require('mongoose');
const history = require('../models/UserHistory');
const basket = require('../models/UserBasket');
const product = require('../models/Product');
const path=require("path");
const fs=require('fs');

router.get('/getHistory', async (req, res) => {
    try {
        const userHistory = await history.findOne({user_id: Types.ObjectId(req.query.token)});

        const ids = [];
        userHistory.buys_list.forEach(buy => {
            buy.products.forEach(product => {
                if (!ids.includes(product._id)) {
                    ids.push(product._id);
                }
            })
        })

        const productsFullInfo = await product.find({_id: {$in: ids}}, {__v: 0, count: 0})

        const systemWay=path.resolve(__dirname,'../multer-config/uploads/');
        await fs.readdir(systemWay, (err, files) => {
            if (err) {
                console.log(err);
                return res.send({errMsg:err});
            }
            const buysListToSend = userHistory.buys_list.map(buy => {
                const products = buy.products.map(product => {
                    const image = files.find(file => file.indexOf(product._id.toString()) !== -1);
                    return {
                        image: image? 'images/'+image:'',
                        count: product.count,
                        ...productsFullInfo.find(el => el._id.toString() === product._id.toString())._doc,
                    }
                })
                return {
                    ...buy,
                    products: products,
                }
            })

            return res.send({buysList: buysListToSend});
        })
    } catch (err){
        console.log(err+' message')
        return res.send({errMsg: err});
    }
})

router.put('/setHistory', async (req, res) => {
    try {
        const user = await history.findOne({user_id: Types.ObjectId(req.body.token)});
        const userBasket = await basket.findOne({user_id: Types.ObjectId(req.body.token)});
        const productsFromStore = await product.find({_id: {$in: userBasket.products}});
        let errMsg='';
        const userBasketWithCost = userBasket.products.map(product => {
            const productFindFromStore=productsFromStore.find(
                productToFind => productToFind._id.toString() === product._id.toString()
            )
            if(product.count>productFindFromStore.count){
                errMsg= `Sorry but we have only 
                    ${productFindFromStore.count} of 
                    ${product.title}. Please, change count of this product in your basket and try again.`;
            }
            return {
                ...product,
                cost: productFindFromStore.cost,
            };
        })
        if(errMsg.length){
            return res.send({errMsg:errMsg});
        }
        const newBuyCost = userBasketWithCost.reduce((acc, curr) => {
            return acc + curr.cost * curr.count;
        }, 0)

        const newBuysList = [...user.buys_list, {
            products: userBasket.products,
            cost: newBuyCost
        }];

        await history.updateOne(
            {user_id: Types.ObjectId(req.body.token)},
            {buys_list: newBuysList}
        )

        await basket.updateOne(
            {user_id: Types.ObjectId(req.body.token)},
            {products: []}
        )

        productsFromStore.forEach(product=>{
            product.count-=userBasket.products.find(productFind=>product._id.toString()===productFind._id.toString()).count;
        })

        for(let i=0;i<productsFromStore.length; i++){
            await product.update(
                {_id: Types.ObjectId(productsFromStore[i]._id)},
                {count:productsFromStore[i].count});
        }

        return res.send({clearedBasket: []});
    } catch (err){
        console.log(err+' message')
        return res.send({errMsg: err});
    }
})


module.exports = router;