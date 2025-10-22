import React, { useEffect, useState } from "react";
import {Posts} from './DummyData'
import Comment from "./Comment";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
export default function FullPostView(){
    const [post,setPost]=useState(null)
    const [comment,setComment]=useState('')
    const navigate=useNavigate()
    const {posturl}=useParams();
    const fetchPost=()=>{
        axios.get(`https://instaharam-insta-clone.onrender.com/post/viewpost/${encodeURIComponent(posturl)}`,{withCredentials:true})
        .then((res)=>{
            console.log(res.data.Post)
            setPost(res.data.Post)
        })
    }
    useEffect(()=>{
        fetchPost()
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:2020/post/addComment',{post,comment},{withCredentials:true})
        .then((res)=>{
            if (res.data.success){
                toast.success('Comment was added')
                setComment('')
                fetchPost()
            }
        })
    }
    if (post===null){return null}

    return(
        <div className="vh-100 d-flex justify-content-center align-items-center ">
            <ToastContainer position="top-right" autoClose={3000}/>
           <div>
            <img src={post.post.url}  style={{ width: "390px",  aspectRatio: "9/16", objectFit: "cover", objectPosition: "center", borderRadius:'2px'}}/>
            </div>
            <div style={{height: "693px",width: "400px",paddingLeft: "10px",display: "flex",flexDirection: "column",justifyContent: "space-between",border: "1px solid #ccc"}} className="border">
                <div className="border-bottom mb-2 mt-2">
                    <p>{post.user.username}</p>
                </div>
                
            <div  style={{flex: 1, overflowY: "auto",OverflowX:'hidden',marginBottom: "1px",}}>
{post.desc &&
<div className="mb-2 mt-2 p-2">
                    <p>{post.desc}</p>
                </div>
                }

                {post.comments.map((comment)=>(

                    <Comment user={comment.user.username} comment={comment.comment} profile={comment.user.profile} />

                ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #ccc", paddingTop: "5px" }}>
                <input value={comment} onChange={(e)=>{setComment(e.target.value)}} style={{ flex: 1, padding: "5px", border: "none", marginRight: "10px" }} placeholder="Add a comment"/>
                <button onClick={(e)=>{handleSubmit(e)}} style={{border:'none', fontWeight:'500', color:'blue'}}>Post</button>
            </div>
            </div>
        </div>
    )
}
