import React from "react";
import './ExploreComponent.css'

export default function ExploreComponenet({post}){
    return(
        <div className="p-1 explore-container">
            <div className="explore-overlay">
                <p><i className="fa-solid fa-heart"></i> {post.likes.length}</p>
                <p><i className="fa-solid fa-comment"></i> {post.comments.length}</p>
            </div>
            <img  
                src={post.post.url} 
                style={{
                    width:"100%",
                    height:"100%",
                    objectFit:"cover",
                    objectPosition:"center"
                }}
            />
        </div>
        
    )
}
