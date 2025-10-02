import React, { Children } from "react";
import Navbar from "./Navbar";

export default function MainLayout({children}){
    return(
        <>
        <div className="d-flex min-vh-100">
            <Navbar/>
            <div className="flex-grow-1 overflow-auto">
                {children}
            </div>
        </div>
        </>
    )
}