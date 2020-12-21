const {Router} = require('express');
const {Types}=require('mongoose');
const router = Router();
const {user,userBasket} = require('../models');

router.get('/getUserInfo',async (req,res)=>{
    try {
        const reqUserId = Types.ObjectId(req.query.token);
        const userAuth = await user.findOne({_id: reqUserId}, {_v: 0});
        const basket = await userBasket.findOne({user_id: reqUserId})
        const {name, isAdmin, secName, country, phone, email} = userAuth;
        return res.send({
            name, isAdmin, secName, country, phone, email,
            basketProductsCount: basket.products.length,
        });
    } catch (err){
        res.status(400).send({errMsg: err});
    }
})

module.exports = router;