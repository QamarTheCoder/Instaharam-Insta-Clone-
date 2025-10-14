import React from "react";

export default function Comment({user,comment,profile}){
    return(
        <div className="d-flex flex-column justify-content-center align-items-start ">
            <div>
            <div className="d-flex p-2">
                <span className="d-flex align-items-start">
            <img src={profile} style={{width:'30px',height:'30px',borderRadius:'100%'}}/>
            <p className="d-inline" style={{paddingLeft:'10px', fontSize:'14px'}} ><b>{user}</b></p>

            <p className="d-inline" style={{paddingLeft:'10px',  fontSize:'14px', wordBreak: "break-word", overflowWrap: "break-word" }} >{comment}</p>
            </span>

            
            </div>
            </div>

        </div>
    )
}