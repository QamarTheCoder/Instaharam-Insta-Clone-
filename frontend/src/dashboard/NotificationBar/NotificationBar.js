import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NotificationBar() {
  const [notifications, setNotifications] = useState([]);
  

  useEffect(() => {
    axios
      .get("https://instaharam-insta-clone.onrender.com/user/Notification", { withCredentials: true })
      .then((res) => {
        setNotifications(res.data.Notifications || []);
      })
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);
  function timeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now - then) / 1000);

  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "m", seconds: 2592000 },
    { label: "w", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return ` ${count}${interval.label}`;
    }
  }
  return "just now";
}


  return (
    <div
      className="vh-100 border-end"
      style={{
        position: "fixed",
        left: "80px",
        width: "300px",
        background: "#fff",
        transition: "all 0.3s ease",
      }}
    >
      <div>
        <h3 className="p-3"><b>Notifications</b></h3>
        {notifications.length === 0 ? (
          <p className="text-muted mt-3">No notifications yet</p>
        ) : (
          notifications.map((noti, index) => {
             let username = noti.Notification.split(" ")[0];
             return(
            <Link to={`/user/${username}`} style={{color:'black', textDecoration:'none'}}>
            <div key={index} className="d-flex p-2 text-center align-items-center hover-box border-bottom">
              <p className="fs-6 p-2 mb-0" style={{ fontWeight: 400 }}>
                {noti.Notification}
                <p className="text-muted d-inline" style={{fontSize:'13px'}}>{timeAgo(noti.createdAt)}</p>
              </p>
            </div>
            </Link>)
})
        )}
      </div>
    </div>
  );
}
