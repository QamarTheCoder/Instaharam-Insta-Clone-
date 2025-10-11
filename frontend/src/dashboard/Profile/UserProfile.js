import React, { useEffect, useState } from "react";
import {Users} from '../HomePage/DummyData.js'
import ProfileHeader from "./ProfileHeader.js";
import ProfileContent from './ProfileContent.js'
import axios from 'axios'
import { ToastContainer,toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function UserProfile(){
    const[user,Setuser]=useState(null);
    const {username}=useParams();

   useEffect(()=>{
    if (username){
        axios.post(`http://localhost:2020/user/${username}`,{},{withCredentials:true})
    .then((res)=>{
        console.log(res.data.user)
        Setuser(res.data.user)
    })
    .catch((err)=>{
        toast.error(err)
    })
    }else{
        
    axios.get('http://localhost:2020/user/getUserData',{withCredentials:true})
    .then((res)=>{
        console.log(res.data.user)
        Setuser(res.data.user)
    })
    .catch((err)=>{
        toast.error(err)
    })
}
}
   ,[])

    return(
        <div className="vh-100 d-flex flex-column align-items-center mt-5 ">
            <ToastContainer position="top-right" autoClose={3000}/>
            <div>
                <ProfileHeader user={user}/>
                
            </div>
            <div className="w-50">
            <br/>
            <br/>
                <hr></hr>
                </div>
            <div>
                <ProfileContent user={user}/>

            </div>
        </div>
    )
}