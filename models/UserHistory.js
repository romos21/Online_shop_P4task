const {Schema,model}=require('mongoose')

const schema=new Schema({
    user_id:Object,
    buys_list:{
        type: [Object],
        default:[],
        buy: {
            type:Object,
            date: {
                type:Date,
                default: Date.now()
            },
            products:{
                type:[Object],
                _id:{type:Object},
                count: Number
            },
            cost: {type:Number},
        },
    },
})

module.exports=model('UserHistory',schema);