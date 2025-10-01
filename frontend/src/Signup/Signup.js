import React from "react";
import SigninFooter from "../Signin/SigninFooter";
import SignupForm from '../Signup/SignupForm'
function Signup(){
    return (
       <div className="d-flex flex-column vh-100 text-center">
        <div className="container flex-grow-1 d-flex justify-content-evenly align-items-center">
        <SignupForm/>
        </div>
        <SigninFooter/>
        </div>
    )
}
export default Signup;  