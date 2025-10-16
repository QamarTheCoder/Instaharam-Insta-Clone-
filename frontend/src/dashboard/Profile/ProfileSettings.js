import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import { ToastContainer,toast } from "react-toastify";


export default function ProfileSettings(){
    
    const [user,Setuser]=useState(null)
    const [profile,Setprofile]=useState('')
    const [userprofile,Setuserprofile]=useState(null)
    const [bio,Setbio]=useState('')
    let navigate=useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:2020/user/settings',{withCredentials:true})
        .then((res)=>{
            Setuser(res.data.User)
            Setuserprofile(res.data.User.profile)
        })
    },[])

    const handleProfileChanges=(e)=>{
        e.preventDefault()
        const file = e.target.files[0]; 
    if (file) {
        const img = URL.createObjectURL(file);
        Setuserprofile(img); 
        Setprofile(file);    
    }
    }
    
    const handleChanges=(e)=>{
        e.preventDefault()
        
        const formData = new FormData();
    formData.append('bio', bio);
    if (profile) formData.append('profile', profile);

    axios.post(
      'http://localhost:2020/user/savedSettings',
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
        .then((res)=>{
            if(res.data.success){
                toast.success('Changes saved')
                setTimeout(()=>{
                    navigate('/Profile')
                },1500)
            }
            
        })
        

        

    }
    
    if (user===null){return null}
    return(
        <div className="vh-100">
            <ToastContainer position="top-right" autoClose={3000}/>
            <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
                <div className="hover-box">
                <label for="fileUpload" >
                    <i class="fa-regular fa-pen-to-square edit fs-2"></i>
                <img id="userprofile" src={userprofile} style={{width:'100px',borderRadius:'100%',aspectRatio: "1/1", objectFit: "cover", objectPosition: "center",}} className="mb-5 "/>
                <input onChange={(e)=>{handleProfileChanges(e)}} id="fileUpload" type="file"  hidden /> 
                </label>
                </div>

                <textarea value={bio} onChange={(e)=>{Setbio(e.target.value)}} placeholder={user.desc || 'write your bio'} style={{resize:'none', width:'400px',height:'150px'}}/>

                <button className="mt-3 " style={{border:'none', backgroundColor:'#4A5DF9' , color:'white', padding:'5px 15px', borderRadius:'8px'}} onClick={(e)=>{handleChanges(e)}}>Save Changes</button>

            </div>
         </div>
    )
}