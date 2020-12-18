const {Schema,model}=require('mongoose')

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
        min: 0,
    },
    count: {
        type:Number,
        required: true,
        min: 0,
    },
})

module.exports=model('Product',schema);