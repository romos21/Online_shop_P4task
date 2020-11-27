const express = require('express');
const auth=require('./routes/auth');
const products=require('./routes/products');
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const {port, mongoUri}=require('./config');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/auth/',auth);
app.use('/products',products);

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

