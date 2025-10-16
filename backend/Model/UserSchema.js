const {Schema} = require('mongoose')
const {model} = require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')

const UserSchema= new Schema({
    email:{type:String,required:true, unique:true},
    profile:{
        type:String,
        default:'https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png'
    },
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
    }],
    Notifications:[{type:Schema.ObjectId,ref:'Notification'}]
    
})

UserSchema.plugin(passportLocalMongoose);
const UserModel=model('User',UserSchema)

module.exports= UserModel