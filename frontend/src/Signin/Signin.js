import React from "react";
import SigninForm from "./SigninForm";
import SigninImage from "./SigninImage";
import SigninFooter from "./SigninFooter";

function Signin(){
    return (
        <div className="d-flex flex-column vh-100 text-center">
        <div className="container flex-grow-1 d-flex justify-content-evenly align-items-center">
        <SigninImage/>
        <SigninForm/>
        </div>
        <SigninFooter/>

        </div>
    )
}

export default Signin;