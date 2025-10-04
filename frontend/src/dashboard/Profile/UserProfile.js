import React from "react";
import {Users} from '../HomePage/DummyData.js'
import ProfileHeader from "./ProfileHeader.js";
import ProfileContent from './ProfileContent.js'

export default function UserProfile(){

   const user=Users[1]
   console.log(user)

    return(
        <div className="vh-100 d-flex flex-column align-items-center mt-5 ">
            <div>
                <ProfileHeader user={user}/>
                
            </div>
            <div className="w-50">
            <br/>
            <br/>
                <hr></hr>
                </div>
            <div>
                <ProfileContent user={user}/>

            </div>
        </div>
    )
}