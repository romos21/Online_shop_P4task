const {Schema, model}=require('mongoose');

const schema=new Schema({
    name:{type: String, required:true,trim:true},
    secName:{type: String, required:true,trim:true},
    email:{type: String, required:true,trim:true},
    phone:{type: String, required:true, trim:true, minlength:8,maxlength:20},
    password:{type: String, required:true,minlength:8},
    country:{type: String, required:true, trim:true},
})

module.exports=model('User', schema);