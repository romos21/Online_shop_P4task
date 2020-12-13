const {Router} = require('express');
const userBasket = require('../models/UserBasket');
const {Types}=require('mongoose');
const product = require('../models/Product');

const router = Router();

router.get('/getBasket', async (req, res) => {
    try {
        const basket = await userBasket.findOne({user_id: Types.ObjectId(req.query.user_id)})

        if(!basket.products.length){
            return res.send({basket:[]})
        }
        let basketToSend=[];
        let j=0;
        for (let i=Number(req.query.skipValue); i<Number(req.query.skipValue)+Number(req.query.limit);i++){
            basketToSend[j]=await product.findOne({_id: basket.products[i]._id});
            basketToSend[j].count=basket.products[i].count;
            j++;
        }

        const pagesCount=Math.ceil(basket.products.length/Number(req.query.limit));
        console.log(pagesCount);

        return res.send({basket:basketToSend,pagesCount:pagesCount})
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


        if (!productToFind) {
            if(req.body.product.count<0){
                return res.send({errMsg: 'No count of this product in basket'});
            }
            basket.products.push({
                _id: reqProductId,
                count: req.body.product.count,
            })
        } else {
            if(productToFind.count+req.body.product.count<0){
                return res.send({errMsg: 'Too much product to remove from basket'});
            }
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