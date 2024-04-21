import React, { useState, useEffect } from 'react';
import "./style.css"
export default function HalfFunction({user_id,chatOrigin, chatOther, setChatOrigin, setChatOther}) {
    const [message, setMessage] = useState("");
    const handleKeyGen = async () => {
        try {
            const response = await fetch("https://ii4031-tc3-18221134-18221152.azurewebsites.net/user/generate_key?user_id="+user_id, {
                method : "GET"
            })
            if (!response.ok) {
                throw new Error("Key Gen " + user_id +  " fail!")
            } 
        } catch (error) {
            console.error(" Error!",error)
        }
    }
    const sendPublicKey = async () => {
        try {
            const response = await fetch("https://ii4031-tc3-18221134-18221152.azurewebsites.net/user/"+ user_id +"/send_key", {
                method : "PUT"
            })
            if (!response.ok) {
                throw new Error("Key Send "+ user_id +" fail!")
            } 
        } catch (error) {
            console.error(" Error!",error)
        }
    }
    const handleSendandEncrypt = async () => {
        if (message.trim() !== ""){
            setMessage("")
            try {
                const response = await fetch("https://ii4031-tc3-18221134-18221152.azurewebsites.net/rsa/encrypt", {
                    method : "POST", body : JSON.stringify({string : message})
                })
                if (!response.ok) {
                    throw new Error("Send Message "+ user_id +" fail!")
                } 
                const temp = [...chatOther, {"content" : response, "encrypted" : 1}]
                setChatOther(temp)
            } catch (error) {
                console.error(" Error!",error)
            }
        }
    }
    const handleDecrypt = async () => {
        try {
            const response = await fetch("https://ii4031-tc3-18221134-18221152.azurewebsites.net/rsa/encrypt", {
                method : "POST", body : JSON.stringify({string : message})
            })
            if (!response.ok) {
                throw new Error("Send Message "+ user_id +" fail!")
            } 
            const temp = [...chatOther, {"content" : response, "encrypted" : 1}]
            setChatOther(temp)
        } catch (error) {
            console.error(" Error!",error)
        }
    }
    return (
        <div className="container">
        <div className="topButtonsContainer">
          <button onClick={handleKeyGen}>Bangkitkan Kunci</button>
          <button onClick={sendPublicKey}>Kirim Kunci Publik</button>
        </div>
        <div className="bottomButtonContainer" >
          {chatOrigin.map((chat, index) => (
            <div> {message.content} 
            </div>
          )) 
          }
        </div>
        <div className='bottomButtonContainer'>
        <input
          type="text"
          placeholder=""
        //   className="w-full p-2 mb-3 rounded border border-gray-200"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        </div>
        <div className="bottomButtonContainer">
          <button onClick={handleSendandEncrypt}>Encrypt and Send</button>
        </div>
      </div>
    )
    
}