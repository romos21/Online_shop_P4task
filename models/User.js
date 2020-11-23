const {Schema, model, Types}=require('mongoose');

const schema=new Schema({
    id: {type:Types.ObjectId},
    name:{type: String, required:true,trim:true},
    secName:{type: String, required:true,trim:true},
    email:{type: String, required:true,trim:true},
    phone:{type: String, required:true, trim:true, match:'/^[0-9]{8,20}$/'},
    country:{type: String, required:true, trim:true},
})

module.exports=model('User', schema);