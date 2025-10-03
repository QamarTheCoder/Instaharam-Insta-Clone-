import React, { useState } from "react";
import "./Navbar.css"
import SearchUsers from "./Search/SearchUsers";
import { Link } from "react-router-dom";

export default function Navbar(){

    const [showSearch,setShowSearch]=useState(false)

    const itemStyle = {
        fontSize: showSearch ? "20px" : "16px",
        padding: showSearch ? "12px" : "18px",
        textAlign: showSearch ? "center" : "left",
        transition: "all 0.2s ease"
    }

    return(
        <div className="d-flex flex-column vh-100 border-end justify-content-between" style={{'width': showSearch ? '70px':'280px',position:'sticky', top:0,transition: "width 0.3s" }}>
            <div>
                <div className="p-3">
                    {showSearch ? <p className="mt-3 mb-2 fs-3" ><i class="fa-brands fa-instagram"></i></p> : <img src="./Assets/instaharamLogo.png" className="mt-3 mb-2" style={{width:'115px'}}/>}
                </div>

                <div>
                <Link to={'/'} style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="fw-bold hover-box" onClick={()=>{setShowSearch(false)}}><i class="fa-solid fa-house fs-4" ></i> {!showSearch && " Home"}</p></Link>
                <p style={itemStyle} className="hover-box" onClick={()=>{setShowSearch(!showSearch)}}><i class="fa-solid fa-magnifying-glass fs-4" ></i> {!showSearch && "Search"} </p>
                <Link to={'/explore'} style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="hover-box" ><i class="fa-regular fa-compass fs-4"></i> {!showSearch && " Explore"} </p></Link>
                <Link style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="hover-box"><i class="fa-regular fa-comment fs-4"></i> {!showSearch && " Messages"} </p></Link>
                <Link style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="hover-box"><i class="fa-regular fa-heart fs-4"></i> {!showSearch && " Notifications"} </p></Link>
                <Link style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="hover-box"><i class="fa-regular fa-square-plus fs-4"></i> {!showSearch && " Create"} </p></Link>
                <Link style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="hover-box"><i class="fa-regular fa-user fs-4"></i> {!showSearch && " Profile"}</p></Link>

                </div>
            </div>
            <div>
            <p style={itemStyle} className="hover-box "><i class="fa-solid fa-bars fs-5"></i> {!showSearch && " Menu"}</p>
            </div>
        {showSearch && <SearchUsers/>}

        </div>
    )
}
