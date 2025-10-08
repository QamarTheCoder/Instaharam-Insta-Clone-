import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify'

export default function Menu(){
    let navigate=useNavigate()
    const handleOnClick=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:2020/user/Logout',{},{withCredentials:true})
        .then((res)=>{
            if (res.data.success){

                toast.success(res.data.message)
                setTimeout(() => {
                 navigate('/signin')
                }, 1500);

            }
        })
    }

    return(
        <div className="d-flex justify-content-center align-items-center flex-column vh-100">
            <ToastContainer position="top-right" autoClose={3000} />
            <h3>Sorry, too lazy to make the whole settings :p</h3>
            <button className="btn btn-danger" onClick={(e)=>{handleOnClick(e)}}>Logout</button>
        </div>
    )
}