import { io } from 'socket.io-client'

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
})

socket.on('connect', () => {
  console.log('✅ Connected to socket:', socket.id)
})

socket.on('connect_error', err => {
  console.error('❌ Socket connection error:', err.message)
})

export default socket
