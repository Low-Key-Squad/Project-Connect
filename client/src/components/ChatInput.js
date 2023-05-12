import { useState } from "react"
import React from "react"


const ChatInput = () => {
    const [textArea, SetTextArea]=useState(null)
    return (
        <div className="chat-input">
        <textarea value={textArea} onChange={(e)=> SetTextArea(e.target.value)}/>
        <button className="secondary-button">Submit</button>
        </div>
    )
}

export default ChatInput