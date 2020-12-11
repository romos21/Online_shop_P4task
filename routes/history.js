const {Router} = require('express');
const router = Router();
const {Types} = require('mongoose');
const history = require('../models/UserHistory');
const basket = require('../models/UserBasket');

router.get('/getHistory', async (req, res) => {
    const user = await history.findOne({user_id: Types.ObjectId(req.query.user_id)});
    return res.send({buysList:user.buys_list});
})

router.put('/setHistory', async (req, res) => {
    const user = await history.findOne({user_id: Types.ObjectId(req.body.user_id)});
    const newBuyCost=req.body.newBuy.reduce((acc,curr)=>{
        return acc+curr.cost*curr.count;
    },0)
    const newBuysList=[...user.buys_list, {
        products:req.body.newBuy,
        cost:newBuyCost
    }];
    console.log(newBuysList);


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