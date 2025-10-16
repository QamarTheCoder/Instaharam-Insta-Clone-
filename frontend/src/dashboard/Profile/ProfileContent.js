import React from "react";
import ExploreComponenet from "../Explore/ExploreComponent";
import { Link } from "react-router-dom";
export default function ProfileContent({user}){
    if (!user) return null;

    return(
        <div  className="d-flex  justify-content-center mt-5 flex-wrap"  style={{maxWidth:"950px", margin:"0 auto"}}>
            
           
            {
            user.Posts.map((post)=>(
                <Link to={`/post/viewpost/${encodeURIComponent(post.post.url)}`}>
                <ExploreComponenet post={post}/>
                </Link>
            ))}


        </div>
    )
}