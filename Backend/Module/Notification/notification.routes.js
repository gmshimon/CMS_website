import express from 'express'
import { getUserNotifications } from './notification.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'
import { io } from "../../socket/index.js"
const router = express.Router()

// router.post('/', (req, res) => {
//   const { user, title, message } = req.body

//   const mockNotification = {
//     user,
//     title,
//     message,
//     _id: 'test123',
//     createdAt: new Date()
//   }

//   io.emit('sendNotification', mockNotification)
//   res.status(200).json({ success: true, notification: mockNotification })
// })

router.get('/', verifyToken, getUserNotifications)

export default router
