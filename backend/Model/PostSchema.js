const {Schema}= require("mongoose")
const {model}= require("mongoose")

const PostSchema=new Schema({
    user:{
        type:Schema.ObjectId,
        ref:'User'
    },
    post:{type:String, required:true},
    likes:[{
        type:Schema.ObjectId,
        ref:'User'
    }],
    comments:[{
        type:Schema.ObjectId,
        ref:'Comment'
    }]
})

const PostModel=model('Post',PostSchema)

module.exports= PostModel