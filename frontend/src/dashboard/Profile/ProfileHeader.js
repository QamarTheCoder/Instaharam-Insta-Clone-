import React, { use } from "react";

export default function ProfileHeader({user}){
    return(
        <div className="d-flex "> 
            <div style={{marginRight:'110px'}}>
            <img src={user.profile} style={{width:'180px', height:'180px', borderRadius:'100%'}}/>
            </div>
            <div className="d-flex flex-column ">
                <div className="d-flex mb-2">
                <p style={{fontSize:'22px'}}>{user.name}</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <button style={{border:'none', backgroundColor:'#4A5DF9' , color:'white', padding:'3px 10px', borderRadius:'8px', width:'90px', height:'30px', fontWeight:'400'}}>Follow</button>
                </div>
                <div className=" d-flex justify-content-between mb-2">
                    <b style={{fontSize:'17px'}}>{user.post.length}</b>  &nbsp; <p  style={{fontSize:'17px'}} className="text-muted"> Posts</p> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <b style={{fontSize:'17px'}}>{user.followers.length}</b> &nbsp; <p  style={{fontSize:'17px'}} className="text-muted"> Followers</p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                     <b style={{fontSize:'17px'}}>{user.following.length}</b>  &nbsp; <p style={{fontSize:'17px'}} className="text-muted"> Followings</p>
                </div>
                 <div>
                <p>{user.desc}</p>
            </div>

            </div>
           
        </div>
        
    )
}