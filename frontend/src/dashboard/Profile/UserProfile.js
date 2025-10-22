import React, { useEffect, useState } from "react";
import {Users} from '../HomePage/DummyData.js'
import ProfileHeader from "./ProfileHeader.js";
import ProfileContent from './ProfileContent.js'
import axios from 'axios'
import { ToastContainer,toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function UserProfile(){
    const[user,Setuser]=useState(null);
    const [ownProfile,setOwnProfile]=useState(false);
    const {username}=useParams();
    const [curruser,setcurruser]=useState(null)

   useEffect(()=>{
    if (username){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/${username}`,{},{withCredentials:true})
    .then((res)=>{
        console.log(res.data.user)
        Setuser(res.data.user)
        setcurruser(res.data.curruser)
        if (username===res.data.curruser.username){
            setOwnProfile(true)
        }else{
            setOwnProfile(false)
        }
    })
    .catch((err)=>{
        toast.error(err)
    })
    }else{
        
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getUserData`,{withCredentials:true})
    .then((res)=>{
        console.log(res.data.user)
        Setuser(res.data.user)
        setOwnProfile(true)
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
                <ProfileHeader ownprofile={ownProfile} user={user} curruser={curruser} />
                
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