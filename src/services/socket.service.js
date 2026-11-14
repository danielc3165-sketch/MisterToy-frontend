import io from 'socket.io-client'
import { userService } from './user.service.api'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : 'http://127.0.0.1:3030/'
console.log('baseUrl',baseUrl)
export const socket = io( baseUrl)


export function sendMsg(msg){
    socket.emit('chat-msg', msg)
}

export function sendTopic(toyId){
    console.log('T',toyId)
    socket.emit('join-topic', toyId)
}