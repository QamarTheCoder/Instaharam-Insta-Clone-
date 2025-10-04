import React from "react";

export default function NotificationBar(){
    return(
        <div className="vh-100 border-end" style={{position:'fixed',left:'80px', width:'300px'}}>
            <div className="p-3">
                <b><h3>Notifications</h3></b>
            </div>
            <div></div>
        </div>
    )
}