const {Schema,model}=require('mongoose')

const schema=new Schema({
    user_id:Object,
    products:{
        type: [Object],
        default:[],
        _id: {type:Object},
        count:{type:Number},
    },
})

module.exports=model('UserBasket',schema);