import React from "react";
import "./Navbar.css"

export default function Navbar(){
    return(
        <div className="d-flex flex-column vh-100 border-end justify-content-between" style={{'width':'280px'}}>
            <div>
                <div className="p-3">
                    <img src="./Assets/instaharamLogo.png" className="mt-3 mb-2" style={{width:'115px'}}/>
                </div>

                <div >
                <p style={{'fontSize':'14px', padding:'18px'}} className="fw-bold hover-box"><i class="fa-solid fa-house fs-5"></i> &nbsp; Home</p>
                <p style={{'fontSize':'14px', padding:'18px'}} className="hover-box" ><i class="fa-solid fa-magnifying-glass fs-5"></i>  &nbsp; Search</p>
                <p style={{'fontSize':'14px', padding:'18px'}} className="hover-box" ><i class="fa-regular fa-compass fs-5"></i>  &nbsp; Explore</p>
                <p style={{'fontSize':'14px', padding:'18px'}} className="hover-box"><i class="fa-solid fa-film fs-5"></i>  &nbsp; Reels</p>
                <p style={{'fontSize':'14px', padding:'18px'}} className="hover-box"><i class="fa-regular fa-comment fs-5"></i>  &nbsp; Messages</p>
                <p style={{'fontSize':'14px', padding:'18px'}} className="hover-box"><i class="fa-regular fa-heart fs-5"></i>  &nbsp; Notifications</p>
                <p style={{'fontSize':'14px', padding:'18px'}} className="hover-box"><i class="fa-regular fa-square-plus fs-5"></i>  &nbsp; Create</p>
                </div>
            </div>
            <div>
            <p style={{'fontSize':'14px', padding:'18px'}} className="hover-box "><i class="fa-solid fa-bars fs-5"></i>  &nbsp; Menu</p>
            </div>
        </div>
    )
}