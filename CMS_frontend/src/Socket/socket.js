import { io } from 'socket.io-client'
const token = localStorage.getItem('userToken')
const socket = io('http://so00gsss8g8ccggg44ccsowc.31.97.71.226.sslip.io', {
  transports: ['websocket'],
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  auth: {
    token: token
  },
  autoConnect: false
})


export default socket
