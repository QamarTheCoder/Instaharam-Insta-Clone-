require('dotenv').config()

const express= require("express")
const mongoose= require('mongoose')
const UserModel=require('./Model/UserSchema')
const PostModel=require('./Model/PostSchema')
const CommentModel=require('./Model/CommentSchema')

const app=express()
const PORT= process.env.PORT || 2020;
const MONGO_URL=process.env.MONGO_URL 
app.listen(PORT, ()=>{
    console.log('starting App')
    mongoose.connect(MONGO_URL)
    console.log('DB connected')

})