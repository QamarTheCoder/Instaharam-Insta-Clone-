const {Schema} = require('mongoose')
const {model} = require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')

const UserSchema= new Schema({
    email:{type:String,required:true, unique:true},
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

UserSchema.plugin(passportLocalMongoose);
const UserModel=model('User',UserSchema)

module.exports= UserModel