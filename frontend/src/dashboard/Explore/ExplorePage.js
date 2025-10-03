import React from "react";
import {Posts} from '../HomePage/DummyData.js'
import ExploreComponenet from "./ExploreComponent.js";

export default function ExplorePage(){

    return(
        <div  className="d-flex  justify-content-center mt-5 flex-wrap"  style={{maxWidth:"950px", margin:"0 auto"}}>
            { Posts.map((post)=>(
                    <ExploreComponenet post={post}/>
                ))}
        </div>
    )
}