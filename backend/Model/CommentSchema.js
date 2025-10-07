const {Schema}= require("mongoose")
const {model}= require("mongoose")

const CommentSchema=new Schema({
    user:{
        type:Schema.ObjectId,
        ref:'User'
    },
    
    likes:[{
        type:Schema.ObjectId,
        ref:'User'
    }],
    comment:{type:String, required:true}
})

const CommentModel=model('Comment',CommentSchema)

module.exports= CommentModel