import { Chat } from "./Chat"

import { useState } from "react"

export function Children() {
 
   const [ chatOn,setChatOn ] = useState(false)

  return (
    <section className="children-page">

      
      <div className="fancy-box">
      <button className="chat-btn" onClick={()=>setChatOn(!chatOn)}>{chatOn ? 'Close' : 'Chat'}</button>
      

      {chatOn && <FancyBox title="Hi">
        <div>
        <h4>Hellooooo</h4>
        <span>🍌</span>
        <span>🍌</span>
        </div>
      </FancyBox>}

      </div>

    </section>
  )
}

function FancyBox({ title = 'Hello', children }) {
  return (
    <div>
      <h3>{title}</h3>
      <div>
      {children}
      </div>
      <Chat />
    </div>



  )
}
