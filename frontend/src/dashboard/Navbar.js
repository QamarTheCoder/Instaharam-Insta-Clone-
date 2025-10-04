import React, { useState } from "react";
import "./Navbar.css"
import SearchUsers from "./Search/SearchUsers";
import { Link } from "react-router-dom";
import NotificationBar from "./NotificationBar/NotificationBar";

export default function Navbar(){

    const [activePanel,setActivePanel]=useState(null)

    const togglePanel=(panel)=>{ 
        setActivePanel(activePanel===panel ? null : panel) 
    }

    const isCollapsed=activePanel!==null

    const itemStyle = {
        fontSize: isCollapsed ? "20px" : "16px",
        padding: isCollapsed ? "12px" : "18px",
        textAlign: isCollapsed ? "center" : "left",
        transition: "all 0.2s ease"
    }

    return(
        <div className="d-flex flex-column vh-100 border-end justify-content-between" style={{'width': isCollapsed ? '70px':'280px',position:'sticky', top:0,transition: "width 0.3s" }}>
            <div>
                <div className="p-3">
                    {isCollapsed ? <p className="mt-3 mb-2 fs-3"><i class="fa-brands fa-instagram"></i></p> : <img src="./Assets/instaharamLogo.png" className="mt-3 mb-2" style={{width:'115px'}}/>}
                </div>

                <div>
                <Link to={'/'} style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="fw-bold hover-box" onClick={()=>setActivePanel(null)}><i class="fa-solid fa-house fs-4" ></i> {!isCollapsed && " Home"}</p></Link>
                <p style={itemStyle} className="hover-box" onClick={()=>togglePanel("search")}><i class="fa-solid fa-magnifying-glass fs-4" ></i> {!isCollapsed && "Search"} </p>
                <Link to={'/explore'} style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="hover-box" ><i class="fa-regular fa-compass fs-4"></i> {!isCollapsed && " Explore"} </p></Link>
                <Link style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="hover-box"><i class="fa-regular fa-comment fs-4"></i> {!isCollapsed && " Messages"} </p></Link>
                <p style={itemStyle} className="hover-box" onClick={()=>togglePanel("notifi")}><i class="fa-regular fa-heart fs-4"></i> {!isCollapsed && " Notifications"} </p>
                <Link to={'/Upload'} style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="hover-box"><i class="fa-regular fa-square-plus fs-4"></i> {!isCollapsed && " Create"} </p></Link>
                <Link to={'/Profile'} style={{textDecoration:'none', color:'black'}}><p style={itemStyle} className="hover-box"><i class="fa-regular fa-user fs-4"></i> {!isCollapsed && " Profile"}</p></Link>
                </div>
            </div>
            <div>
            <p style={itemStyle} className="hover-box "><i class="fa-solid fa-bars fs-5"></i> {!isCollapsed && " Menu"}</p>
            </div>
        {activePanel==="search" && <SearchUsers/>}
        {activePanel==="notifi" && <NotificationBar/>}

        </div>
    )
}
