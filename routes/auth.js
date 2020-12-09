const {Router} = require('express');
const bcrypt = require('bcrypt');
/*const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config')*/
const router = Router();
const user = require('../models/User');
const basket=require('../models/UserBasket');

router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body
        const userRegister = await user.findOne({email: email});
        if (userRegister) {
            return res.send('This user has been already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new user({
            ...req.body,
            password: hashedPassword,
        })

        await newUser.save();

        const newUserBasket=new basket({
            user_id:newUser._id,
        })
        await newUserBasket.save();

        const {_id,name, secName, country, phone} = newUser;
        return res.send({_id,name, secName, country, phone, email});
    } catch (err) {
        console.log(`${err} message`);
        return res.send('Ошибка!');
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const userLogin = await user.findOne({email: email});
        if (!userLogin) {
            return res.send({message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
            return res.send({message: `Not correct data for ${userLogin.name} ${userLogin.secName} account`});
        }

        const userBasket=await basket.findOne({user_id:userLogin._id})

        /*const token = jwt.sign(
            {userId: userRegister.id},
            jwtSecret,
        )*/
        const {_id,name, secName, country, phone} = userLogin;
        return res.send({_id,name, secName, country, phone, email, basketProductsCount: userBasket.products.length});
    } catch (err) {
        console.log(`${err} message`);
        return res.send('Error');
    }
})

module.exports = router;