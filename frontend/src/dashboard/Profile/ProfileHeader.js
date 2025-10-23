import axios from "axios";
import React, { use, useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'

export default function ProfileHeader({user,ownprofile, curruser}){
    
    
  const [followed, Setfollowed] = useState(false);
 const navigate = useNavigate()
 const [currentuser,setCurrentuser]=useState(null)

 useEffect(() => {
  if (user && user.followers && curruser) {
    const isFollowed = user.followers.some(follower => {
      const followerId = follower._id ? follower._id.toString() : follower.toString();
      const currUserId = curruser._id ? curruser._id.toString() : curruser.toString();
      setCurrentuser(currUserId)
      return followerId === currUserId;
    });
    Setfollowed(isFollowed);
  }
}, [user, curruser]);

    const handleClick=(e)=>{
            e.preventDefault()
            if (!followed){
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/followed`,{user},{withCredentials:true})
            .then((res)=>{
                if(res.data.success){
                    Setfollowed(true)
                }
            })
        }else{
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/unfollow`,{user},{withCredentials:true})
            .then((res)=>{
                if(res.data.success){
                    Setfollowed(false)
                }
            })
        }

    }
    if (!user ) return null;
    return(
        <div className="d-flex "> 
            <div style={{marginRight:'110px'}}>
            <img src={user.profile} style={{width:'180px',borderRadius:'100%',aspectRatio: "1/1", objectFit: "cover", objectPosition: "center",}}/>
            </div>
            <div className="d-flex flex-column ">
                <div className="d-flex mb-2">
                <p style={{fontSize:'22px'}}>{user.username}</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                { ownprofile ? 
                 <button style={{border:'none', backgroundColor:"rgb(235, 235, 235)" , color:'black', padding:'3px 10px', borderRadius:'8px', width:'90px', height:'30px', fontWeight:'400'}} onClick={()=>navigate(`/user/settings`)}>Settings</button>
                 : 
                 <button style={{border:'none', backgroundColor: followed? "rgb(235, 235, 235)" :'#4A5DF9' , color:followed? 'black':'white', padding:'3px 10px', borderRadius:'8px', width:'90px', height:'30px', fontWeight:'400'}} onClick={(e)=>{handleClick(e)}}>{followed? "Unfollow" : "Follow"}</button>
                    }
                 </div>
                <div className=" d-flex justify-content-between mb-2">
                    <b style={{fontSize:'17px'}}>{user.Posts.length}</b>  &nbsp; <p  style={{fontSize:'17px'}} className="text-muted"> Posts</p> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <b style={{fontSize:'17px'}}>{user.followers.length}</b> &nbsp; <p  style={{fontSize:'17px'}} className="text-muted"> Followers</p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                     <b style={{fontSize:'17px'}}>{user.followings.length}</b>  &nbsp; <p style={{fontSize:'17px'}} className="text-muted"> Followings</p>
                </div>
                 <div>
                <p style={{ wordBreak: "break-word", overflowWrap: "break-word",whiteSpace: "pre-wrap",maxWidth: "400px", }}>{user.desc}</p>
            </div>

            </div>
           
        </div>
        
    )
}