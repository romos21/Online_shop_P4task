const {Schema,model}=require('mongoose')

const schema=new Schema({
    user_id:Object,
    buys_list:{
        type: [Object],
        default:[],
        buy: {
            type:Object,
            products:{
                type:[Object],
                _id:{type:Object},
                count: {type:Number, min:0}
            },
            cost: {type:Number, min:0},
        },
    },
})

module.exports=model('UserHistory',schema);