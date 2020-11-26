const {Router} = require('express');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {jwtSecret}=require('../config')
const router = Router();
const user = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        console.log(req.body.email);
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
        const {name,secName,country,phone}=userRegister;
        return res.send({name,secName,country,phone,email});
    } catch (err) {
        console.log(`${err} message`);
        return res.send('Ошибка!');
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const userRegister = await user.findOne({email: email});
        console.log(userRegister,email);
        if (!userRegister ) {
            return res.send('Данный пользователь не зарегистрирован');
        }
        const isMatch=bcrypt.compare(password,userRegister.password);
        if(!isMatch){
            return res.send(`Не верный пароль для ${userRegister.name} ${userRegister.secName}`);
        }
        const token=jwt.sign(
            {userId:userRegister.id},
            jwtSecret,
        )
        const {name,secName,country,phone}=userRegister;
        return res.send({name,secName,country,phone,email});
    } catch (err) {
        console.log(`${err} message`);
        return res.send('Error');
    }
})

module.exports=router;