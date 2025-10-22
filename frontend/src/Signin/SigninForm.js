import React,{useState} from "react";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


function SigninForm(){

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`,{username,password},{withCredentials:true})
        .then((res)=>{
            if (res.data.success){
                toast.success('User Logged In Successfully')
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }else{
                toast.error(res.data.message)
            }
        }).catch((error)=>{
            toast.error("Incorrect credentials")
        })
    }
    return(
        <div className="text-center">
            <ToastContainer  position="top-right" autoClose={3000} />
            <img src="../Assets/instaharamLogo.png" style={{width:'200px'}} className="mb-4"/>

            <form className="mb-4">

                <input value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Username" style={{'padding':'5px 10px' , width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.23)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-2 mt-3 d-block"/>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" style={{'padding':'5px 10px', width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.29)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-3 d-block "/>
                <button onClick={(e)=>{handleSubmit(e)}} style={{width:'270px', height:'34px', border:'none' , borderRadius:'6px', backgroundColor:'#4A5DF9', color:'white', fontWeight:'490'}} className="mb-" >Log in</button>
            </form>

            <hr></hr>

            <a style={{color:'black', fontWeight:'500', fontSize:'14px' , textDecoration:'none'}} href="#" className="mb-5 d-block">Forgot Password?</a>
            
           <p style={{color:'black', fontWeight:'400', fontSize:'14px' , textDecoration:'none'}} href="#" >Don't have an Account? <Link to={'/signup'}  style={{textDecoration:'none', fontWeight:'500'}}> <a href="#" style={{textDecoration:'none', fontWeight:'500'}}>Signup</a></Link></p>



        </div>
    )
}

export default SigninForm;