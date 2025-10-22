import React from "react";
import Navbar from "../Navbar";
import UserPost from "./UserPost";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

// import { Posts } from "./DummyData";
export default function Feed(){
    const [Posts,setPosts]=useState(null)
    const [curruser,setCurruser]=useState(null)
    const navigate=useNavigate()
    useEffect(()=>{
        const fetch=async()=>{
        try{
        const res= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/post/GetAllPosts`,{},{withCredentials:true})
        if (res){
            console.log("Fetched posts:", res.data.Posts);
            setPosts(res.data.Posts)
            setCurruser(res.data.currentUser)
        }}
        catch(err){
            console.log(err)
            toast.error(err.message)
            setTimeout(()=>{
                navigate('/signin')
            },1500)
        }
    };
    fetch()
    },[])
    // Posts.map((post)=>{
    //     console.log(post)
    //     console.log(post.post)
    // })
    if (!Posts || !curruser ) return null;

    return (
        <>
        <ToastContainer position="top-right" autoClose={3000}/>
       { Posts.map((post,key)=>(
            <UserPost post={post?.post?.url} username={post?.user?.username} likes={post?.likes} comments={post?.comments} isitLiked={post?.isLiked ?? false} currUser={curruser} profile={post.user.profile}  />
        ))} 
        </>
    )
}