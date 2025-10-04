import React from "react";
import ExploreComponenet from "../Explore/ExploreComponent";
export default function ProfileContent({user}){
    return(
        <div  className="d-flex  justify-content-center mt-5 flex-wrap"  style={{maxWidth:"950px", margin:"0 auto"}}>
            
            {user.post.map((post)=>(
                <ExploreComponenet post={post}/>
            ))}
        </div>
    )
}