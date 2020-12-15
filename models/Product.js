const {Schema,model,Types}=require('mongoose')

const schema=new Schema({
    title: {
        type:String,
        required: true,
        trim: true,
    },
    description: {
        type:String,
        trim: true,
    },
    cost: {
        type:Number,
        required: true,
    },
    count: {
        type:Number,
        required: true,
    },
})

module.exports=model('Product',schema);