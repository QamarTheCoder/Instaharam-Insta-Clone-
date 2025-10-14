import React from "react";
import Navbar from "../Navbar";
import UserPost from "./UserPost";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// import { Posts } from "./DummyData";
export default function Feed(){
    const [Posts,setPosts]=useState(null)
    useEffect(()=>{
        axios.post('http://localhost:2020/post/GetAllPosts',{},{withCredentials:true})
        .then((res)=>{
            console.log("Fetched posts:", res.data.Posts);
            setPosts(res.data.Posts)
        })
    },[])
    // Posts.map((post)=>{
    //     console.log(post)
    //     console.log(post.post)
    // })
    if (!Posts) return null;

    return (
        <>
        
       { Posts.map((post,key)=>(
            <UserPost post={post.post.url} username={post.user.username} likes={post.likes} comments={post.comments} isitLiked={post.isLiked ?? false} />
        ))} 
        </>
    )
}