import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { toyService } from '../services/toy'
import { utilService } from '../services/util.service'

import { socket, sendMsg, sendTypingOn, sendTypingOff } from '../services/socket.service'

export function Chat({toyId}) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    //console.log('L.U:', loggedInUser)
    
    const [ msgs,setMsgs ] = useState([])
    const [ currMsg, setCurrMsg ] = useState(toyService.getEmptyMsg())
    const [ typingUser,setTypingUser ] = useState(null)
    
    const debouncedStopTyping = useRef(utilService.debounce(sendTypingOff,2000))
    //console.log('toyId',toyId)
    //console.log('msgs',msgs)

    useEffect(()=>{
       loadMsgs()
       if(!loggedInUser) return
       fillCurrMsgUser(loggedInUser)

    },[loggedInUser,toyId])

    useEffect(() => {
        socket.on('chat-msg',addMsg)
        socket.on('typing', addTyping)
        return () => {
        socket.off('chat-msg',addMsg)
        socket.off('typing', addTyping)
        }
    }, [])



    function fillCurrMsgUser({fullName,_id:userId}){
        setCurrMsg(currMsg => ({...currMsg, by: {fullName,userId}}))
    }

    async function loadMsgs(){
       const toy = await toyService.getById(toyId)
       if(toy.msgs) setMsgs(toy.msgs) 
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        if(!loggedInUser) return
        if (!currMsg.txt.trim() && !loggedInUser) return
        await toyService.addMsg(toyId, currMsg)
        sendMsg(currMsg)
        setCurrMsg({...currMsg, txt: ''})
        loadMsgs()
    }

    function onInputChange(ev){
       setCurrMsg({...currMsg, txt: ev.target.value})
       if(!loggedInUser) return
       sendTypingOn(loggedInUser.fullName)
       debouncedStopTyping.current(loggedInUser.fullName)
    }

    function addTyping(user){
        console.log('TU',user)
        setTypingUser(user)
    }

    async function addMsg(msg) {
       setMsgs(prev=>[...prev,msg])
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
                {typingUser?.isTyping && <p>{typingUser.fullName} is typing </p>}
                <form onSubmit={onSubmit}>
                    <button className="btn">Send</button>
                    <input
                        type="text"
                        className="chat-input"
                        value={currMsg.txt}
                        onChange={onInputChange}
                        placeholder="Type a message..."
                        autoComplete="off"
                    />
                </form>
            </div>
        </section>
    )
}
