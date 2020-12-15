const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');

//routes
const routes = require('./routes');

//constants
const {port, mongoUri} = require('./config');

//models
const models = require('./models')

const app = express();



//middlewares
//app.use(express.static(__dirname,'uploads'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/auth/', routes.auth);
app.use('/products/', routes.products);
app.use('/basket/', async (req, res, next) => {

    if (!req.query.user_id && !req.body.user_id) {
        return res.send({errMsg: 'You are not authorized'});
    }
    const isBasketValidator = await models.userBasket.find({
        _id: req.method === 'GET' ? req.query.user_id : req.body.user_id
    });
    if (!isBasketValidator) {
        return res.send({errMsg: 'Server Error: basket cannot find'});
    }
    next();
}, routes.basket);
app.use('/admin/', async (req, res, next) => {
    if (!req.query._id) {
        return res.send({errMsg: 'You are not authorized'});
    }
    const isAdminValidator = await models.user.find({_id: req.query._id});
    if (!isAdminValidator) {
        return res.send({errMsg: 'You is not admin'});
    }
    next();
}, routes.admin);
app.use('/userHistory/',routes.history);

(async function () {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        app.listen(port, () => {
            console.log(`server started on ${port}th port`);
        })
    } catch (err) {
        console.log(`${err} message`)
        process.exit(1);
    }
}())

