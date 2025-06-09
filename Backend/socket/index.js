import { Server } from 'socket.io';
import notification from '../Module/Notification/notification.model.js';
import dotenv from 'dotenv';

dotenv.config();

let io

const setupWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.socket_origin,
      methods: ['GET', 'POST']
    }
  });

  const connectedUsers = new Map(); // userId -> socketId

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('register', (userId) => {
      connectedUsers.set(userId, socket.id);
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
        }
      }
    });

    // For internal use: trigger from backend
    socket.on('sendNotification', async ({ userId, message, type }) => {
      const notificationData = await notification.create({ user: userId, message, type });

      const receiverSocketId = connectedUsers.get(userId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newNotification', notificationData);
      }
    });
  });

  return io;
};

export { io, setupWebSocket };
