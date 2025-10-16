const {Schema}= require('mongoose')
const {model}= require('mongoose')

const NotificationSchema=new Schema({
    Notification:{
        type:String
    },
    User:{
        type:Schema.ObjectId,
        ref:'User'
    },
    }, { timestamps: true })
const NotificationModel=model('Notification', NotificationSchema)
module.exports=NotificationModel