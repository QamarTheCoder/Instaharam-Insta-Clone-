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
const NotificationModel=require('./Model/NotificationSchema.js')
const wrapAsync=require('./wrapAsync.js')
const sessionOptions={
    secret:'mysupasceretkey',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() +7  * 24  * 60 * 60 *1000,
        maxAge:7  * 24  * 60 * 60 *1000,
        httpOnly:true
    },
    sameSite:'none',
    secure:true
}


const app=express()
const PORT= process.env.PORT || 2020;
const MONGO_URL=process.env.MONGO_URL



app.use(cors({ origin: [
    "http://localhost:3000", 
    "https://instaharam-frontend.onrender.com"
  ], credentials: true }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session(sessionOptions));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(UserModel.authenticate()))
passport.serializeUser(UserModel.serializeUser())
passport.deserializeUser(UserModel.deserializeUser())


app.post('/post/GetAllPosts', wrapAsync(async (req, res) => {
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    const AllPosts = await PostModel.find({}).populate('user');
    const userId = req.user ? req.user._id.toString() : null;

    const formattedPosts = AllPosts.map(post => ({
        ...post._doc,
        isLiked: userId ? post.likes.some(likeId => likeId.toString() === userId) : false,
    }));

    res.status(201).json({ Posts: formattedPosts ,currentUser:req.user});
}));
app.post('/post/Liked',wrapAsync( async (req, res) => {
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
  try {
    const { post, isLiked } = req.body;
    const ThePost = await PostModel.findOne({ "post.url": post }).populate('user');
    if (!ThePost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const postOwnerId = ThePost.user._id;
    const currentUserId = req.user._id;

    if (postOwnerId.toString() === currentUserId.toString()) {
      ThePost.likes = isLiked
        ? [...new Set([...ThePost.likes, currentUserId])]
        : ThePost.likes.filter(id => id.toString() !== currentUserId.toString());

      await ThePost.save();
      return res.status(200).json({ success: true, likesCount: ThePost.likes.length });
    }

    if (isLiked) {
      if (!ThePost.likes.includes(currentUserId)) {
        ThePost.likes.push(currentUserId);

        const notification = new NotificationModel({
          Notification: `${req.user.username} liked your post`,
          User: postOwnerId
        });
        await notification.save();

        const postOwner = await UserModel.findById(postOwnerId);
        postOwner.Notifications.push(notification._id);
        await postOwner.save();
      }
    } else {
      ThePost.likes.pull(currentUserId);
      await NotificationModel.findOneAndDelete({
        Notification: `${req.user.username} liked your post`,
        User: postOwnerId
      });
    }

    await ThePost.save();

    res.status(200).json({
      success: true,
      likesCount: ThePost.likes.length
    });
  } catch (err) {
    console.error("Error in /post/Liked:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}));

app.post('/post/deletePost',wrapAsync(async(req,res)=>{
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
  let {username,post}=req.body
  let deletedPost=await PostModel.findOneAndDelete({'post.url':post})
  res.status(201).json({
    success:true
  })
}))

app.post('/post/addComment',wrapAsync(async(req,res)=>{
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    let {post,comment}=req.body;
    const Notification= new NotificationModel({Notification:`${req.user.username} commented on your Post`,})

    const newComment= new CommentModel({
        user:req.user._id,
        comment:comment,
    })
    await newComment.save()
    let ThePost= await PostModel.findOne({"post.url":post.post.url}).populate('user')
    let TheUser= await UserModel.findById(ThePost.user._id)
    ThePost.comments.push(newComment._id)
    Notification.User=ThePost.user._id
    await Notification.save()

    TheUser.Notifications.push(Notification._id)

    await TheUser.save()

    await ThePost.save()
    res.status(201).json({
        success:true
    })
}))

app.get('/post/viewpost/:posturl',wrapAsync(async(req,res)=>{
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    const decodedUrl = decodeURIComponent(req.params.posturl);
    const Post=await PostModel.findOne({'post.url':decodedUrl}).populate({path:'comments',populate:{path:'user'}}).populate('user')
    console.log(Post)
    res.status(201).json({
        Post
    })
}))


app.post('/post/PostImg',upload.single('image'),wrapAsync(async(req,res)=>{
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    let {desc}=req.body;
    console.log("Image file:", req.file);
    console.log("Description:", desc);
    const User=await UserModel.findById(req.user._id);
    const newPost= new PostModel({
        user:req.user._id,
        post:{url:req.file.path, filename:req.file.filename},
        desc:desc
    })
    const NewPostsaved=await newPost.save();
    User.Posts.push(NewPostsaved._id)


    await User.save()
    res.status(201).json({
        success:true
    })
}))

app.post('/user/SearchallUsers',wrapAsync(async (req,res)=>{
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    const {searchedUser}=req.body;
    const Users=await UserModel.find({username:searchedUser});
    res.json({Users})
}))

app.post('/user/followed', wrapAsync(async (req, res) => {
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
  try {
    const { user } = req.body;
    const followedUser = await UserModel.findOne({ username: user.username });
    const currentUser = await UserModel.findById(req.user._id);
    const Notification= new NotificationModel({Notification:`${currentUser.username} has started following you`,})

    if (!followedUser.followers.includes(currentUser._id)) {
      followedUser.followers.push(currentUser._id);
      followedUser.Notifications.push(Notification._id);
    }

    if (!currentUser.followings.includes(followedUser._id)) {
      currentUser.followings.push(followedUser._id);
    }
    Notification.User=followedUser._id
    await followedUser.save();
    await Notification.save();
    await currentUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}));

app.post('/user/unfollow', wrapAsync(async (req, res) => {
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
  try {
    const { user } = req.body;
    const unfollowedUser = await UserModel.findOne({ username: user.username });
    const currentUser = await UserModel.findById(req.user._id);

      const notificationToRemove = await NotificationModel.findOneAndDelete({
      Notification: `${currentUser.username} started following you`,
      User: unfollowedUser._id
    });

    if (notificationToRemove) {
      unfollowedUser.Notifications.pull(notificationToRemove._id);
    }

    unfollowedUser.followers.pull(currentUser._id);
    currentUser.followings.pull(unfollowedUser._id);


    await unfollowedUser.save();
    await currentUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}));

app.post('/user/savedSettings', upload.single('profile'), wrapAsync( async (req, res) => {
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const theUser = await UserModel.findById(req.user._id);
        if (!theUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (req.body.bio) {
            theUser.desc = req.body.bio;
        }

        if (req.file) {
            theUser.profile = req.file.path;
            console.log('USER PROFILE NEW?',req.file)
        }

        await theUser.save();

        res.status(201).json({ success: true, message: 'Profile updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}));


app.get('/user/settings', wrapAsync( async (req, res) => {
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
  const User=await UserModel.findById(req.user._id)
  res.json({
    User
  })
}));


app.post('/user/signupUser',wrapAsync(async(req,res)=>{
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
}))

app.post('/user/login',passport.authenticate("local",{failureMessage:'Incorrect Credentials'}),wrapAsync(async(req,res)=>{
  
        console.log(` CURRENT USER FROM COOkIE${req.user}`)
        res.status(201).json({
            success:true,
            message:'User Loggedin Successfully'
        })
        
        
}))

app.post('/user/:username',wrapAsync(async(req,res)=>{
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    const {username}=req.params;
    const User= await UserModel.findOne({username:username}).populate('Posts')
    console.log(User)
    // console.log(current_user)
    res.status(201).json({
        user:User,
        curruser:req.user
    })
}))

app.get('/user/Notification',wrapAsync(async(req,res)=>{
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    const Notifications=await UserModel.findById(req.user._id).populate({path:'Notifications',options:{sort:{createdAt:-1}}} )
    res.status(201).json({
        Notifications:Notifications.Notifications
    })
}))


app.get('/user/getUserData',wrapAsync(async(req,res)=>{
  if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    const current_user=req.user
    const User= await UserModel.findById(current_user._id).populate('Posts')
    console.log(current_user)
    res.status(201).json({
        user:User
    })
}))


app.get('/user/Logout',(req,res)=>{
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

app.get('/user/Deleteaccount',async(req,res)=>{
  const userId = req.user._id;

    await UserModel.updateMany(
      { followers: userId },
      { $pull: { followers: userId } }
    );

    await UserModel.updateMany(
      { followings: userId },
      { $pull: { followings: userId } }
    );

      await PostModel.updateMany(
      { likes: userId },
      { $pull: { likes: userId } }
    );
    const userComments = await CommentModel.find({ user: userId });
    const commentIds = userComments.map(c => c._id);
    if (commentIds.length > 0) {
      await PostModel.updateMany(
        { comments: { $in: commentIds } },
        { $pull: { comments: { $in: commentIds } } }
      );

      await CommentModel.deleteMany({ _id: { $in: commentIds } });
    }
    await PostModel.deleteMany({ user: userId });
    
    await NotificationModel.deleteMany({ User: userId });

     const user = await UserModel.findById(userId);
    if (user) {
      await NotificationModel.deleteMany({
        Notification: { $regex: user.username, $options: 'i' }
      });
    }

    await UserModel.findByIdAndDelete(userId);

    req.logOut(() => {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(201).json({
          success: true,
        });
      });
    });
})

app.use((err,req,res,next)=>{
  console.log(err)
  next()
})

app.listen(PORT, ()=>{
    console.log('starting App')
    mongoose.connect(MONGO_URL)
    console.log('DB connected')

})


