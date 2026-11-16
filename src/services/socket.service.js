import io from 'socket.io-client'
import { toyService } from './toy'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : 'http://127.0.0.1:3030/'
export const socket = io( baseUrl)


export function sendMsg(msg){
    socket.emit('chat-msg', msg)
}

export function sendTopic(toyId){
    socket.emit('join-topic', toyId)
}

export function sendTypingOn(fullName){
    socket.emit('typing', {fullName,isTyping:true})
}

export function sendTypingOff(fullName){
    socket.emit('typing', {fullName,isTyping:false})
}

//store changes

export function toyAdd(toyName){
    socket.emit('store-change',{toyName,type:'add'})
}

export async function toyRemoved(toyName){
    socket.emit('store-change',{toyName,type:'delete'})
}

export function toyUpdate(toyName){
    socket.emit('store-change',{toyName,type:'update'})
}