const user=require('../models/User');
const {Types}=require('mongoose');

const checkUserStatus = () => {
    return async function (req,res,next) {
        const token=req.body.token?req.body.token:req.query.token;
        const userToCheck=await user.findOne({_id:Types.ObjectId(token)});
        if(!userToCheck.isAdmin){
            return res.send({errMsg:'available only for admins'})
        }
        next();
    }
}

module.exports = checkUserStatus;
