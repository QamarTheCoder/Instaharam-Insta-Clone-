import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function CreatePage(){
    const navigate=useNavigate()
    const handleOnchange=(e)=>{
        try{
        e.preventDefault()
        const imageData=e.target.files[0]
        
        if (imageData){
            const previewURL=URL.createObjectURL(imageData)
            navigate('/Uploadpreview',{state:{file:imageData,previewURL}})
        }}catch(err){
            toast.error('Something went wrong')
        }
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
            <h1 className="mb-3" style={{fontSize:'85px', transform: 'rotate(-2deg)' , opacity:'0.9'}}><i class="fa-solid fa-photo-film"></i></h1>
            <p className="fs-5">Upload Photos Here</p>
            <label for='fileUpload' className="btn" type="file" style={{border:'none', backgroundColor:'#4A5DF9' , color:'white', padding:'5px 15px', borderRadius:'8px'}}>Select From Computer</label>
            <input id="fileUpload" type="file"  onChange={(e)=>{handleOnchange(e)}} hidden /> 
        {/* <Link to={'/Uploadpreview'}>Link</Link> */}

        </div>
    )
} 