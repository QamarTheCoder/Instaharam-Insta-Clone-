import React from "react";

export default function CreatePage(){
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
            <h1 className="mb-3" style={{fontSize:'85px', transform: 'rotate(-2deg)' , opacity:'0.9'}}><i class="fa-solid fa-photo-film"></i></h1>
            <p className="fs-5">Upload Photos Here</p>
            <label for='fileUpload' className="btn" type="file" style={{border:'none', backgroundColor:'#4A5DF9' , color:'white', padding:'5px 15px', borderRadius:'8px'}}>Select From Computer</label>
            <input id="fileUpload" type="file" hidden /> 
        </div>
    )
} 