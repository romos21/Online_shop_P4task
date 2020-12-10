const {Router} = require('express');
const userBasket = require('../models/UserBasket');
const {Types}=require('mongoose');
const product = require('../models/Product');

const router = Router();

router.get('/getBasket', async (req, res) => {
    try {
        const basket = await userBasket.findOne({user_id: Types.ObjectId(req.query.user_id)});
        if(!basket.products.length){
            return res.send({basket:[]})
        }
        let basketToSend=[];
        for (let i=0; i<basket.products.length;i++){
            basketToSend[i]=await product.findOne({_id: basket.products[i]._id});
            basketToSend[i].count=basket.products[i].count;
        }

        console.log(basketToSend);

        return res.send({basket:basketToSend})
    } catch (err) {
        console.log(err + 'message');
        return res.send(err);
    }
})

router.put('/change', async (req, res) => {
    try {

        const reqProductId=Types.ObjectId(req.body.product._id);
        const reqUserId=Types.ObjectId(req.body.user_id);

        let userBasketFind = await userBasket.findOne({user_id: reqUserId});

        let basket = userBasketFind.products.length
            ? userBasketFind
            : {
                user_id: reqUserId,
                products: [
                    {
                        _id: reqProductId,
                        count: 0,
                    }
                ],
            };

        const productToChange = await product.findOne({_id: reqProductId})

        if(productToChange.count-req.body.product.count<0){
            return res.send({errMsg: 'Too much product to add in basket'});
        }

        productToChange.count -= req.body.product.count;

        const productToFind = basket.products.find(product => product._id.toString() === reqProductId.toString());

        if(productToFind.count+req.body.product.count<0){
            return res.send({errMsg: 'Too much product to remove from basket'});
        }


        if (!productToFind) {
            basket.products.push({
                _id: reqProductId,
                count: req.body.product.count,
            })
        } else {
            basket.products=basket.products.map(product=>{
                if(product._id.toString()===reqProductId.toString()){
                    product.count+=req.body.product.count;
                }
                return product;
            })
            basket.products=basket.products.filter(product=> product.count!==0);
        }

        await userBasket.updateOne({user_id: reqUserId}, {products: basket.products});
        await product.updateOne({_id: reqProductId}, {count: productToChange.count});

        const productToSend = basket.products.find(product => product._id.toString() === reqProductId.toString());
        const productToSendCount=productToSend?productToSend.count:0;

        return res.send({
            basketLength: basket.products.length,
            product: {
                ...productToChange._doc,
                count: req.body.stateForReturn==='basket'?
                    productToSendCount
                    :productToChange.count,
            }
        });
    } catch (err) {
        console.log(err + 'message');
        return res.send(err);
    }
})
module.exports = router;