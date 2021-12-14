const bcrypt = require('bcrypt');
const {user, userBasket, userHistory} = require('../models');
const basket = require("../models/UserBasket");
const history = require("../models/UserHistory");
const mongoose = require("mongoose");
const {mongoUri} = require("../config");

const users = [
    {
        name: "admin",
        secName: "first",
        email: "admin111@gmail.com",
        phone: "+12345678",
        password: "11111111",
        country: "Belarus",
        isAdmin: true,
    },
    {
        name: "admin",
        secName: "first",
        email: "admin222@gmail.com",
        phone: "+12345678",
        password: "11111111",
        country: "Belarus",
        isAdmin: true,
    },
    {
        name: "admin",
        secName: "first",
        email: "admin333@gmail.com",
        phone: "+12345678",
        password: "11111111",
        country: "Belarus",
        isAdmin: true,
    },
    {
        name: "admin",
        secName: "first",
        email: "admin4441@gmail.com",
        phone: "+12345678",
        password: "11111111",
        country: "Belarus",
        isAdmin: true,
    },
]

usersMigration = async () => {
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    for(let newUser of users) {
        //await user.deleteOne({email: newUser.email});
        const hashedPassword = await bcrypt.hash(newUser.password, 12);
        const newUserSaved = new user({
            ...newUser,
            password: hashedPassword,
        })

        await newUserSaved.save();

        const newUserBasket = new userBasket({
            user_id: newUserSaved._id,
        })
        await newUserBasket.save();

        const newUserHistory = new userHistory({
            user_id: newUserSaved._id,
        })

        await newUserHistory.save();
    }
    await mongoose.connection.close();
}

(async function () {
    await usersMigration();
})()