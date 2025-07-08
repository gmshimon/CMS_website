import { Server } from 'socket.io'
import notification from '../Module/Notification/notification.model.js'
import dotenv from 'dotenv'

dotenv.config()

let io

const setupWebSocket = server => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  const connectedUsers = new Map() // userId -> socketId

  io.on('connection', socket => {
    console.log('🔌 trying to connect the websocket')
    console.info('✅ Socket Client connected')

    socket.on('register', userId => {
      console.log(`🆔 User registered: ${userId} with socket ID: ${socket.id}`)
      connectedUsers.set(userId, socket.id)
    })

    socket.on('disconnect', () => {
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          console.log(`❌ User disconnected: ${userId}`)
          connectedUsers.delete(userId)
        }
      }
    })

    // For internal use: trigger from backend
    socket.on('sendNotification', async ({ userId, message, type }) => {
      const notificationData = await notification.create({
        user: userId,
        message,
        type
      })

      const receiverSocketId = connectedUsers.get(userId)
      if (receiverSocketId) {
        console.log(`📨 Sending notification to user: ${userId}`)
        io.to(receiverSocketId).emit('newNotification', notificationData)
      }
    })
    //  Handle mark as read
    socket.on('markAsRead', async ({ notificationId }) => {
      try {
        await notification.findByIdAndUpdate(notificationId, { isRead: true })
        const userSockets = connectedUsers.get(userId)
        // Optional: notify all tabs of the user if needed
        socket.emit('notificationRead', { notificationId })
      } catch (err) {
        console.error('Error marking notification as read:', err)
      }
    })
  })

  return io
}

export { io, setupWebSocket }
