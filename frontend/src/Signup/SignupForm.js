import React from "react";

export default function SignupForm(){
    return (
        <div className="d-flex flex-column w-25 ">
          <div className="text-center  d-flex flex-column justify-content-center align-items-center border p-5">

            <img src="../Assets/instaharamLogo.png" style={{width:'250px'}} className="mb-4"/>
            <p style={{'color':'rgb(145, 144, 144)', fontSize:'17px', fontWeight:'600'}}>Sign up to see photos and videos from your friends.</p>
            <form className="mb-2">

                <input placeholder="Email" style={{'padding':'5px 10px' , width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.23)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-2 mt-3 d-block"/>
                <input placeholder="Username" style={{'padding':'5px 10px' , width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.23)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-2 mt-2 d-block"/>
                <input placeholder="Password" style={{'padding':'5px 10px', width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.29)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-3 mt-2 d-block "/>
                
                <p style={{color:'black', fontWeight:'200', fontSize:'13px' , textDecoration:'none'}} >By signing up, you agree to our <a href="https://www.youtube.com/watch?v=M8KmP8bxNxk" style={{textDecoration:'none', fontWeight:'200'}}>Terms and Conditions</a></p>
                
                <button style={{width:'270px', height:'34px', border:'none' , borderRadius:'6px', backgroundColor:'#4A5DF9', color:'white', fontWeight:'500'}}  >Sign Up</button>
            </form>

        </div>
        <div className="border p-3 mt-3 text-center">
            <p style={{color:'black', fontWeight:'400', fontSize:'14px' , textDecoration:'none'}} href="#" >Have an Account? <a href="#" style={{textDecoration:'none', fontWeight:'500'}}>Log in</a></p>
        </div>
                </div>
    )
}