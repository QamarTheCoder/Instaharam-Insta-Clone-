import React, { useState } from "react";


export default function UserPost({username,post,likes,comments}){
    return(
        <div className="container p-3">
            <div>
                <p>{username}</p>
                <p><i class="fa-solid fa-bars"></i></p>
            </div>

            <div>
            <img src={post}  style={{ width: "300px",  aspectRatio: "9/16", objectFit: "cover", objectPosition: "center", borderRadius:'10px'}}/>
            </div>

            <div>
                <p><i class="fa-regular fa-heart"></i></p>
                <p><i class="fa-regular fa-comment"></i></p>
                <p><i class="fa-regular fa-paper-plane"></i></p>
            </div>

            <div>
                <p><b>{likes} likes</b></p>

                <p>View all {comments.length} comments</p>
            </div>


        </div>
    )
}