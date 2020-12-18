const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {jwtValidation,checkUserStatus}=require('./middlewares');
const cors=require('cors');
const path=require('path');

//routes
const routes = require('./routes');

//constants
const {port, mongoUri} = require('./config');

const app = express();



app.use('/images',express.static(path.join(__dirname,'multer-config/uploads/')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(jwtValidation());
app.use('/auth/', routes.auth);
app.use('/user/', routes.user);
app.use('/products/', routes.products);
app.use('/basket/', routes.basket);
app.use('/admin/', checkUserStatus(),routes.admin);
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

