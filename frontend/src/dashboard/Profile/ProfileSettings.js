import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ProfileSettings(){
    const [user,Setuser]=useState(null)
    useEffect(()=>{
        axios.get('http://localhost:2020/user/settings',{withCredentials:true})
        .then((res)=>{
            Setuser(res.data.User)
        })
    },[])
    if (user===null){return null}
    return(
        <div>Settings of {user.profile} DESC {user.desc} </div>
    )
}