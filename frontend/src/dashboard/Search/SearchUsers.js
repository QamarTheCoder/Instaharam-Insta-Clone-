import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import '../Navbar.css'

export default function SearchUsers(){
  const [searchedUser, setSearchedUser] = useState("");
  const [displayedUser, setDisplayedUser] = useState([]);
    useEffect(() => {
    if (!searchedUser.trim()) {
      setDisplayedUser([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.post(
          "https://instaharam-insta-clone.onrender.com/user/SearchallUsers",
          { searchedUser },
          { withCredentials: true }
        );
        setDisplayedUser(res.data.Users || []);
      } catch (err) {
        console.error("Search error:", err);
        setDisplayedUser([]);
      }
    };

    fetchUsers();
  }, [searchedUser]);

     return(
      <div className="vh-100 border-end" style={{ width: "350px", position: "fixed",left: "70px",top: 0,background: "#fff",zIndex: 10, transition: "all 0.3s ease"}}>
      <div className="p-3 border-bottom">
        <h5>Search</h5>
        <input type="text" placeholder="Search users..." className="form-control mt-2" value={searchedUser} onChange={(e)=>{setSearchedUser(e.target.value)}}/>
      </div>
      <div  >
        <p className="text-muted p-3">Recent</p>
        
        {displayedUser.map((user)=>(
          <Link to={`/user/${user.username}`} style={{color:'black', textDecoration:'none'}}>
            <div className="d-flex p-2 text-center align-items-center hover-box">
              <img style={{height:'45px',borderRadius:'100%',aspectRatio: "1/1", objectFit: "cover", objectPosition: "center",}} src={user.profile}/>
              <p className="fs-6 p-2" style={{fontWeight:500}}>{user.username}</p>
            </div>
            </Link>
        ))}
      </div>
    </div>
    )
}