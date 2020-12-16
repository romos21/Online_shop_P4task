const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config');

const jwtValidation = () => {
    return function (req,res,next) {
        if (!(req.url.match(/^\/(products\/get)|auth/i))) {

            const token = req.query.token ? req.query.token : req.body.token;
            if (!token) {
                return res.send({errMsg: 'user not authorized'});
            }

            const decoded = jwt.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    return res.send({errMsg: err});
                }
                return decoded.userId;
            });
            if(req.body.token){
                req.body.token=decoded;
            } else if(req.query.token){
                req.query.token=decoded;
            }
        }
        next();
    }
}

module.exports = jwtValidation;
