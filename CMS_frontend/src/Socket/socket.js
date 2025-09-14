import { io } from 'socket.io-client'
const token = localStorage.getItem('userToken')
const socket = io('http://localhost:5000', {
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
