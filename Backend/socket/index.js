// socket/index.js
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { ENV } from '../config/env.js'
import jwt from 'jsonwebtoken'

dotenv.config()

let io
// Map of connected users: userId -> [socketIds]
const connectedUsers = new Map()

// ✅ helper to verify JWT
const verifyJWT = token => {
  if (!token) throw new Error('No token provided')
  return jwt.verify(token, ENV.TOKEN_SECRET)
}

const setupWebSocket = server => {
  io = new Server(server, {
    cors: {
      origin: 'http://vgw4k0og4cw48oww0k4sw400.31.97.71.226.sslip.io',
      methods: ['GET', 'POST']
    }
  })

  // 🔒 Authenticate socket connections
  io.use((socket, next) => {
    try {
      const { token } = socket.handshake.auth
      const jwtToken = JSON.parse(token).access_token
      if (!jwtToken)
        return next(new Error('Unauthorized: No access_token provided'))

      const user = verifyJWT(jwtToken)
      socket.user = user
      next()
    } catch (err) {
      console.error('❌ WebSocket auth error:', err.message)
      next(new Error('Authentication failed'))
    }
  })

  io.on('connection', socket => {
    console.info('✅ Socket connected:', socket.id)

    // User registers their ID after connection
    socket.on('register', userId => {
      const sockets = connectedUsers.get(userId) || []
      sockets.push(socket.id)
      connectedUsers.set(userId, sockets)
      console.log(`🆔 User registered: ${userId}, sockets: ${sockets}`)
    })

    // Cleanup on disconnect
    socket.on('disconnect', () => {
      for (const [userId, socketIds] of connectedUsers.entries()) {
        const newSockets = socketIds.filter(id => id !== socket.id)
        if (newSockets.length > 0) {
          connectedUsers.set(userId, newSockets)
        } else {
          connectedUsers.delete(userId)
        }
      }
      console.log(`❌ Socket disconnected: ${socket.id}`)
    })

    // ✅ Mark notification as read
    socket.on('markAsRead', async ({ notificationId }) => {
      try {
        const { default: notification } = await import(
          '../Module/Notification/notification.model.js'
        )
        console.log(`✅ Notification ${notificationId} marked as read in DB`)
        await notification.findByIdAndUpdate(notificationId, { isRead: true })
        socket.emit('notificationRead', { notificationId })
      } catch (err) {
        console.error('Error marking as read:', notificationId, err)
        socket.emit('notificationError', { message: err.message })
      }
    })
  })

  return io
}

export { io, setupWebSocket, connectedUsers }
