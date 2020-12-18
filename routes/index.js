const auth = require('./auth');
const user = require('./user');
const products = require('./products');
const basket = require('./basket');
const admin = require('./admin');
const history=require('./history');

module.exports = {
    auth,
    products,
    basket,
    admin,
    history,
    user,
}