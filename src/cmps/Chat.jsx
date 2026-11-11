import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toyService } from '../services/toy'

export function Chat({toyId}) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    //console.log('L.U:', loggedInUser)
    
    const [ msgs,setMsgs ] = useState([])
    const [ currMsg, setCurrMsg ] = useState(toyService.getEmptyMsg())
    

    // console.log('toyId',toyId)
    // console.log('msgs',msgs)

    useEffect(()=>{
       loadMsgs()
       if(!loggedInUser) return
       fillCurrMsgUser(loggedInUser)
       

    },[loggedInUser,toyId])

    function fillCurrMsgUser({fullName,_id:userId}){
        setCurrMsg(currMsg => ({...currMsg, by: {fullName,userId}}))
    }

    async function loadMsgs(){
       const toy = await toyService.getById(toyId)
       if(toy.msgs) setMsgs(toy.msgs) 
    }

    async function sendMsg(ev) {
        ev.preventDefault()
        if(!loggedInUser) return
        if (!currMsg.txt.trim() && !loggedInUser) return
        await toyService.addMsg(toyId, currMsg)
        setCurrMsg({...currMsg, txt: ''})
        loadMsgs()
    }

    function deleteMsg(msgId){
        toyService.removeMsg(toyId, msgId)
        loadMsgs()
    }

    return (
        <section className="chat-container">
             <div className="chat-msgs">
                {msgs.map((msg, idx) => (
                    <div key={idx} className="chat-msg">
                        <div>
                            <strong>{msg.by.fullName}:</strong>
                            <p>{msg.txt}</p>
                        </div>
                        <button onClick={() => deleteMsg(msg.msgId)}>X</button>
                    </div>
                ))}
            </div>
            <div>
                <form onSubmit={sendMsg}>
                    <button className="btn">Send</button>
                    <input
                        type="text"
                        className="chat-input"
                        value={currMsg.txt}
                        onChange={ev => setCurrMsg({...currMsg, txt: ev.target.value})}
                        placeholder="Type a message..."
                        autoComplete="off"
                    />
                </form>
            </div>
        </section>
    )
}
