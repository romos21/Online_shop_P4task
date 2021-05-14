const {Schema,model}=require('mongoose')

const schema=new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    comments: [
        {
            text: String,
            userId: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
        }
    ],

})

module.exports=model('ProductComments',schema);