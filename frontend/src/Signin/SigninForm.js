import React from "react";

function SigninForm(){
    return(
        <div className="text-center">

            <img src="../Assets/instaharamLogo.png" style={{width:'200px'}} className="mb-4"/>

            <form className="mb-4">

                <input placeholder="Email" style={{'padding':'5px 10px' , width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.23)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-2 mt-3 d-block"/>
                <input placeholder="Password" style={{'padding':'5px 10px', width:'270px' , backgroundColor:'rgba(236, 236, 236, 0.29)' , border:'1px solid rgb(204, 201, 201)', borderRadius:'2px'}} className="mb-3 d-block "/>
                <button style={{width:'270px', height:'34px', border:'none' , borderRadius:'6px', backgroundColor:'#4A5DF9', color:'white', fontWeight:'490'}} className="mb-" >Log in</button>
            </form>

            <hr></hr>

            <a style={{color:'black', fontWeight:'500', fontSize:'14px' , textDecoration:'none'}} href="#" className="mb-5 d-block">Forgot Password?</a>
            
            <p style={{color:'black', fontWeight:'400', fontSize:'14px' , textDecoration:'none'}} href="#" >Don't have an Account? <a href="#" style={{textDecoration:'none', fontWeight:'500'}}>Signup</a></p>



        </div>
    )
}

export default SigninForm;