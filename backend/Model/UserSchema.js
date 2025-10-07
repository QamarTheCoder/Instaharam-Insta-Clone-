const {Schema} = require('mongoose')
const {model} = require('mongoose')

const UserSchema= new Schema({
    name:{type:String,required:true} ,
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    profile:String,
    desc:String,
    followers:[{
        type:Schema.ObjectId,
        ref:'User'
    }],
    followings:[{
        type:Schema.ObjectId,
        ref:'User'
    }],
    Posts:[{
        type:Schema.ObjectId,
        ref:'Post'
    }]
    
})

const UserModel=model('User',UserSchema)

module.exports= UserModel