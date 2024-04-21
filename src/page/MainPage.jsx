import React, { useState, useEffect } from 'react';
import HalfFunction from "./component/HalfFunction.jsx";

function MainPage() {
    const [chatOne, setChatOne] = useState([]);
    const [chatTwo, setChatTwo] = useState([]);
    useEffect(  () => {
        
        const resetState = async () => {

        
            try {
                const response = await fetch("https://ii4031-tc3-18221134-18221152.azurewebsites.net/app/reset", {
                    method : "DELETE" 
                })
                if (!response.ok) {
                    throw new Error("Reset fail!")
                } 
            } catch (error) {
                console.error(" Error!",error)
            }
        };
        resetState();
    }, [] )


    return (
        <div>
            <div style={{ display: 'flex' }}>
                <HalfFunction user_id = {1} chatOrigin={chatOne} chatOther={chatTwo} setChatOrigin = {setChatOne} setChatOther  = {setChatTwo} />
                <HalfFunction user_id = {2} chatOrigin={chatTwo} chatOther={chatOne} setChatOrigin = {setChatTwo} setChatOther = {setChatOne} />
            </div>
      </div>

    )

}

export default MainPage;