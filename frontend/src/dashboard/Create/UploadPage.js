import React from "react";

export default function UploadPage(){
    const img='./dummypic/pic2.jpg'
    return(
        <div className="vh-100 d-flex justify-content-center align-items-center">
           <div>
            <img src={img}  style={{ width: "390px",  aspectRatio: "9/16", objectFit: "cover", objectPosition: "center", borderRadius:'2px'}}/>
            </div>
            <div style={{height:'693px', width:'400px' , paddingLeft:'10px'}} className="border">
                            <div className="border-bottom">
                                <p>qamar</p>
                            </div>
                        <div className="mt-2">
                                <textarea placeholder="Write description" rows="3" cols="48"/>

                        </div>
                        <div className="d-flex align-items-end justify-content-end p-3" style={{width:"100%", height:'50%'}}>
                            <button className="btn btn-primary" style={{'width':'100px',height:'50px'}}>Upload</button>
                        </div>
            </div>
        </div>
    )
}