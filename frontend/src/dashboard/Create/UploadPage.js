import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";


export default function UploadPage(){

    const location=useLocation();
    const navigate= useNavigate();
    const {file,previewURL}=location.state || {};
    const [desc,Setdesc]=useState('')
    const img=previewURL;

    const handleUpload=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('image',file)
        formData.append('desc',desc)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/post/PostImg`, formData, {headers: { "Content-Type": "multipart/form-data" },withCredentials:true})
        .then((res)=>{
            if (res.data.success){
                toast.success('Post Uploaded')
                setTimeout(()=>{
                    navigate('/')
                },3000)
            }
        })
        .catch((err)=>{
            toast.error(err.message)
        })

    }



    return(
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <ToastContainer position="top-right" autoClose={3000} />
           <div>
            <img src={img}  style={{ width: "390px",  aspectRatio: "9/16", objectFit: "cover", objectPosition: "center", borderRadius:'2px'}}/>
            </div>
            <div style={{height:'693px', width:'400px' , paddingLeft:'10px'}} className="border">
                            <div className="border-bottom">
                                <p>qamar</p>
                            </div>
                        <div className="mt-2">
                                <textarea placeholder="Write description" style={{resize:'none', height:'300px',width:'380px'}} value={desc} onChange={(e)=>{Setdesc(e.target.value)}}/>

                        </div>
                        <div className="d-flex align-items-end justify-content-end p-3" style={{width:"100%", height:'50%'}}>
                            <button className="btn btn-primary" style={{'width':'100px',height:'50px'}} onClick={(e)=>{handleUpload(e)}}>Upload</button>
                        </div>
            </div>
        </div>
    )
}