require('dotenv').config()

const express= require("express")
const cors= require('cors')
const mongoose= require('mongoose')
const session=require('express-session')
const UserModel=require('./Model/UserSchema')
const PostModel=require('./Model/PostSchema')
const CommentModel=require('./Model/CommentSchema')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const multer=require('multer')
const {storage}=require('./CloudConfig.js')
const upload=multer({storage})
const sessionOptions={
    secret:'mysupasceretkey',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() +7  * 24  * 60 * 60 *1000,
        maxAge:7  * 24  * 60 * 60 *1000,
        httpOnly:true
    }
}


const app=express()
const PORT= process.env.PORT || 2020;
const MONGO_URL=process.env.MONGO_URL



app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session(sessionOptions));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(UserModel.authenticate()))
passport.serializeUser(UserModel.serializeUser())
passport.deserializeUser(UserModel.deserializeUser())


app.post('/post/GetAllPosts',async(req,res)=>{
    const AllPosts= await PostModel.find({}).populate('user')
    console.log(AllPosts)
    res.status(201).json({
        Posts:AllPosts
    })
})

app.post('/post/PostImg',upload.single('image'),async(req,res)=>{
    let {desc}=req.body;
    console.log("Image file:", req.file);
    console.log("Description:", desc);
    const User=await UserModel.findById(req.user._id);
    const newPost= new PostModel({
        user:req.user._id,
        post:{url:req.file.path, filename:req.file.filename},
    })
    const NewPostsaved=await newPost.save();
    User.Posts.push(NewPostsaved._id)
    await User.save()
    res.status(201).json({
        success:true
    })
})

app.post('/user/SearchallUsers',async (req,res)=>{
    const {searchedUser}=req.body;
    const Users=await UserModel.find({username:searchedUser});
    res.json({Users})
})


app.post('/user/signupUser',async(req,res)=>{
    try{
    const {email,username,password}=req.body;
    const User= new UserModel({
        email,
        username
    })
    const registeredUser=await UserModel.register(User,password)
    req.login(registeredUser,(e)=>{
        if (e){
 res.status(400).json({
            success:false,
            message:'User Already Exists'
        })
        }else{

              res.status(201).json({
                success:true,
                message:'User Registered & loggedin Successfully'
            })

        }
       
      
    })
    
    }catch(e){
        res.status(400).json({
            success:false,
            message: e.message
        })
    }
})

app.post('/user/login',passport.authenticate("local",{failureMessage:'Incorrect Credentials'}),async(req,res)=>{
  
        console.log(` CURRENT USER FROM COOkIE${req.user}`)
        res.status(201).json({
            success:true,
            message:'User Loggedin Successfully'
        })
        
        
})

app.post('/user/:username',async(req,res)=>{
    const {username}=req.params;
    const User= await UserModel.findOne({username:username}).populate('Posts')
    console.log(User)
    // console.log(current_user)
    res.status(201).json({
        user:User
    })
})


app.get('/user/getUserData',async(req,res)=>{
    const current_user=req.user
    const User= await UserModel.findById(current_user._id).populate('Posts')
    console.log(current_user)
    res.status(201).json({
        user:User
    })
})


app.post('/user/Logout',(req,res)=>{
    req.logOut((err)=>{
        if (err){
        return next(err)
        }
        req.session.destroy(()=>{
            res.clearCookie('connect.sid')
            return res.status(201).json({
                success:true,
                message:'LoggedOut Successfully'
            })
        })
    })
})

app.listen(PORT, ()=>{
    console.log('starting App')
    mongoose.connect(MONGO_URL)
    console.log('DB connected')

})


