import React from "react";
// import {Posts} from '../HomePage/DummyData.js'
import ExploreComponenet from "./ExploreComponent.js";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ExplorePage(){
    const [Posts,setPosts]=useState([])
    useEffect(()=>{
        axios.post("https://instaharam-insta-clone.onrender.com/post/GetAllPosts",{},{withCredentials:true})
        .then((res)=>{
            setPosts(res.data.Posts)
        })
    },[])
    return(
        <div  className="d-flex  justify-content-center mt-5 flex-wrap"  style={{maxWidth:"950px", margin:"0 auto"}}>
            { Posts.map((post)=>(
                <Link to={`/post/viewpost/${encodeURIComponent(post.post.url)}`}>
                    <ExploreComponenet post={post}/>
                    </Link>
                ))}
        </div>
    )
}