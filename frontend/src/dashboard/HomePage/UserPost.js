import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'


export default function UserPost({username,post,likes,comments,isitLiked,currUser,profile}){
    const [isLiked,setIsLiked]=useState(isitLiked);
    const [likesCount, setLikesCount] = useState(likes.length);
    let navigate=useNavigate()

    const handleIsLiked = async () => {
    try {
      const newLiked = !isLiked;
      setIsLiked(newLiked);

      const res = await axios.post(
        "https://instaharam-insta-clone.onrender.com/post/Liked",
        { username, post, isLiked: newLiked },
        { withCredentials: true }
      );

      if (res.data.success) {
        setLikesCount(res.data.likesCount);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handledelete=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:2020/post/deletePost',{username,post},{withCredentials:true})
    .then((res)=>{
      if (res.data.success){
        toast.success('Post deleted')
        setTimeout(() => {
          navigate('/')
        }, 1500);
      }
    })
  }
    return(
        <div className="container p-3" style={{width:'420px'}}>
          <ToastContainer position="top-right" autoClose={3000}/>
            <div className="d-flex justify-content-between">
                <Link to={`/user/${username}`} style={{textDecoration:'none', color:'black'}}><p><img src={profile} style={{height:'39px',borderRadius:'100%',aspectRatio: "1/1", objectFit: "cover", objectPosition: "center",}} /> &nbsp; {username}</p></Link>
                {currUser.username===username &&
                <div class="btn-group dropend">
                  <p  data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-bars"></i></p>
                <ul class="dropdown-menu">
                  <li onClick={(e)=>{handledelete(e)}}>Delete Post</li>
                </ul>
              </div> }
                
                
            </div>

            <div>
            <img src={post}  style={{ width: "390px",  aspectRatio: "9/16", objectFit: "cover", objectPosition: "center", borderRadius:'2px'}}/>
            </div>

            <div className="d-flex mt-3 justify-content-between">
                <div className="d-flex ">
                    <p onClick={handleIsLiked}><i style={{color: isLiked ? 'red' : 'black'}} className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart fs-4`}></i></p> &nbsp; 
                    <Link to={`/post/viewpost/${encodeURIComponent(post)}`} style={{textDecoration:'none' , color:'black'}}><p><i class="fa-regular fa-comment fs-4"></i></p></Link>&nbsp;
                    <p><i class="fa-regular fa-paper-plane fs-4"></i></p>
                </div>

                <div>
                    <i class="fa-regular fa-bookmark fs-4"></i>
                </div>
            </div>

            <div>
                <p style={{fontSize:'16px', fontWeight:'500'}}>{likesCount} likes</p>

                <Link to={`/post/viewpost/${encodeURIComponent(post)}`} style={{textDecoration:'none' , color:'gray'}}><p style={{fontSize:'15px', fontWeight:'400' , color:'rgb(136, 135, 135)'}}>View all {comments.length} comments</p></Link>
            </div>

        <hr/>
        </div>
    )
}