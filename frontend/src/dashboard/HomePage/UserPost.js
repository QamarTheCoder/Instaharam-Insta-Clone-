import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'


export default function UserPost({username,post,likes,comments,isitLiked}){
    const [isLiked,setIsLiked]=useState(isitLiked);
    const [likesCount, setLikesCount] = useState(likes.length);

    const handleIsLiked = async () => {
    try {
      const newLiked = !isLiked;
      setIsLiked(newLiked);

      const res = await axios.post(
        "http://localhost:2020/post/Liked",
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
    console.log('Helo')
  }
    return(
        <div className="container p-3" style={{width:'420px'}}>
            <div className="d-flex justify-content-between">
                <p>{username}</p>
                <div class="btn-group dropend">
                {/* <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> */}
                  <p  data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-bars"></i></p>
                {/* </button> */}
                <ul class="dropdown-menu">
                  <li onClick={(e)=>{handledelete(e)}}>Delete Post</li>
                </ul>
              </div>
                
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