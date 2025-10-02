import React from "react";
import Navbar from "../Navbar";
import UserPost from "./UserPost";
import { Posts } from "./DummyData";
export default function Feed(){
    Posts.map((post)=>{
        console.log(post)
        console.log(post.post)
    })

    return (
        <>
       { Posts.map((post,key)=>(
            <UserPost post={post.post} username={post.user} likes={post.likes} comments={post.comments} />
        ))} 
        </>
    )
}