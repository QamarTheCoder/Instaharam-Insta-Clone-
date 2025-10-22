import React,{useState} from "react";
import axios from "axios";
import { Navigate, useNavigate,Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm(){

    
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signupUser`,{
            email:email,
            username:username,
            password:password
        }, { withCredentials: true })
        .then((res)=>{
            if(res.data.success){

                toast.success(res.data.message)
                setTimeout(()=>{navigate('/')},1500)

            }else{
                toast.error(res.data.message )
            }
        }).catch((e)=>{
                toast.error(e.message )

        })
        

    }

    return (
        <div className="d-flex flex-column w-25 ">
          <div className="text-center  d-flex flex-column justify-content-center align-items-center border p-5">
            <ToastContainer position="top-right" autoClose={3000} />
            <img src="../Assets/instaharamLogo.png" style={{width:'250px'}} className="mb-4"/>
            <p style={{'color':'rgb(145, 144, 144)', fontSize:'17px', fontWeight:'600'}}>Sign up to see photos and videos from your friends.</p>
            <form className="mb-2">

                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="Email" style={{'padding':'5px 10px' , width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.23)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-2 mt-3 d-block"/>
                <input onChange={(e)=>{setUsername(e.target.value)}} value={username} placeholder="Username" style={{'padding':'5px 10px' , width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.23)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-2 mt-2 d-block"/>
                <input onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder="Password" style={{'padding':'5px 10px', width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.29)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-3 mt-2 d-block "/>
                
                <p style={{color:'black', fontWeight:'200', fontSize:'13px' , textDecoration:'none'}} >By signing up, you agree to our <a href="https://www.youtube.com/watch?v=M8KmP8bxNxk" style={{textDecoration:'none', fontWeight:'200'}}>Terms and Conditions</a></p>
                
                <button style={{width:'270px', height:'34px', border:'none' , borderRadius:'6px', backgroundColor:'#4A5DF9', color:'white', fontWeight:'500'}}  onClick={(e)=>{handleSubmit(e)}}>Sign Up</button>
            </form>

        </div>
        <div className="border p-3 mt-3 text-center">
            <p style={{color:'black', fontWeight:'400', fontSize:'14px' , textDecoration:'none'}} href="#" >Have an Account? <Link to={'/signin'}  style={{textDecoration:'none', fontWeight:'500'}}> <a href="#" style={{textDecoration:'none', fontWeight:'500'}}>Log in</a></Link></p>
        </div>
                </div>
    )
}