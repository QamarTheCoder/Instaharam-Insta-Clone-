import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://instaharam-insta-clone.onrender.com/user/getUserData", { withCredentials: true });
        if (res.data.user) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <p className="d-flex align-items-center justify-content-center vh-100">Checking authentication...</p>;

  if (!isLoggedIn) return <Navigate to="/signin" replace />;

  return children;
}
