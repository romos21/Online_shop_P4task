const {Router} = require('express');
const router = Router();
const user = require('../models/User');

router.get('/getAdmins',async (req,res)=>{

    const admins=await user.find({isAdmin:true});

    const otherAdmins=admins.filter(admin=>admin._id.toString()!==req.query._id);

    const adminsToSend=otherAdmins.map(admin=>{
        return {
            _id:admin._id,
            name:admin.name,
            secName:admin.secName,
            email:admin.email,
            isAdmin: admin.isAdmin,
        }
    })
    return res.send({admins:adminsToSend});
})

router.get('/getUsers',async (req,res)=>{

    const regExpToFind=new RegExp(req.query.inputValue);
    const users=await user.find({email: { $regex: regExpToFind}});
    const otherUsers=users.filter(user=>user._id.toString()!==req.query._id)
    const usersToSend=otherUsers.map(user=>{
        return {
            _id:user._id,
            name:user.name,
            secName:user.secName,
            email:user.email,
            isAdmin: user.isAdmin,
        }
    })
    return res.send({users:usersToSend});
})

router.get('/setUserStatus',async (req,res)=>{

    const userQuery=await user.findOne({_id:req.query._id});

    const userToSend=await user.findOneAndUpdate(
        {_id:req.query._id},
        {isAdmin: !userQuery.isAdmin},
        {new: true, useFindAndModify: false}
        );

    return res.send({status: userToSend.isAdmin});
})

module.exports = router;