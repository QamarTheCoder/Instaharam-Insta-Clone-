import React from "react";
import {Posts} from './DummyData'
import Comment from "./Comment";
export default function FullPostView(){
    const post=Posts[0]
    return(
        <div className="vh-100 d-flex justify-content-center align-items-center">
           <div>
            <img src={post.post}  style={{ width: "390px",  aspectRatio: "9/16", objectFit: "cover", objectPosition: "center", borderRadius:'2px'}}/>
            </div>
            <div style={{height:'693px', width:'400px' , paddingLeft:'10px'}} className="border">
                <div className="border-bottom">
                    <p>{post.user}</p>
                </div>
            <div className="mt-2">
                {post.comments.map((comment)=>(
                    <Comment user={comment.name} comment={comment.comment} profile={comment.profile}/>
                ))}
            </div>
            </div>
        </div>
    )
}