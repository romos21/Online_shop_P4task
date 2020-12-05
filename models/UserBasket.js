const {Schema,model}=require('mongoose')

const schema=new Schema({
    user_id:String,
    products:{
        type: [Object],
        default:[],
        id: {type:String},
        count:{type:Number},
    },
})

module.exports=model('UserBasket',schema);