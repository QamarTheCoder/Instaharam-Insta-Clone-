import React from "react";

export default function SearchUsers(){
     return(
      <div className="vh-100 border-end" style={{ width: "350px", position: "fixed",left: "70px",top: 0,background: "#fff",zIndex: 10, transition: "all 0.3s ease"}}>
      <div className="p-3 border-bottom">
        <h5>Search</h5>
        <input type="text" placeholder="Search users..." className="form-control mt-2"/>
      </div>
      <div className="p-3">
        <p className="text-muted">Recent</p>
        {/* Map through search results here */}
      </div>
    </div>
    )
}