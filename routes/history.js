const {Router} = require('express');
const router = Router();
const {Types} = require('mongoose');
const history = require('../models/UserHistory');
const basket = require('../models/UserBasket');
const product = require('../models/Product');

router.get('/getHistory', async (req, res) => {

    console.log(req.query.token);
    const userHistory = await history.findOne({user_id: Types.ObjectId(req.query.token)});

    const ids=[];
    userHistory.buys_list.forEach(buy=>{
        buy.products.forEach(product=>{
            if(!ids.includes(product._id)){
                ids.push(product._id);
            }
        })
    })

    const productsFullInfo=await product.find({_id: {$in: ids}}, {__v:0, count:0})
    const buysListToSend= userHistory.buys_list.map(buy=>{
        const products = buy.products.map(product=>{
            return {
                count: product.count,
                ...productsFullInfo.find(el => el._id.toString() === product._id.toString())._doc,
            }
        })
        return {
            ...buy,
            products: products,
        }
    })
    return res.send({buysList:buysListToSend});
})

router.put('/setHistory', async (req, res) => {
    const user = await history.findOne({user_id: Types.ObjectId(req.body.token)});
    const userBasket=await basket.findOne({user_id: Types.ObjectId(req.body.user_id)});
    const productsCost=await product.find({_id: {$in: userBasket.products}},{cost:1,_id:1});
    const userBasketWithCost=userBasket.products.map(product=>{
        return {
            ...product,
            cost: productsCost.find(productToFind=>productToFind._id.toString()===product._id.toString()).cost
        };
    })

    const newBuyCost=userBasketWithCost.reduce((acc,curr)=>{
        return acc+curr.cost*curr.count;
    },0)

    const newBuysList=[...user.buys_list, {
        products:userBasket.products,
        cost:newBuyCost
    }];

    const newHisTmp=await history.findOneAndUpdate(
        {user_id:Types.ObjectId(req.body.user_id)},
        {buys_list: newBuysList}
        )
    console.log(newHisTmp);

    await basket.updateOne(
        {user_id:Types.ObjectId(req.body.user_id)},
        {products:[]}
    )

    return res.send({clearedBasket: []});
})


module.exports = router;