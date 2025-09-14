import { connectedUsers, io } from '../../socket/index.js'
import notification from './notification.model.js'

export const createNotificationService = async (
  user,
  title,
  message,
  type = null
) => {
  try {
    const data = {
      user,
      message,
      title,
      type: type || 'abstract_created'
    }

    // 1️⃣ Save in DB
    const result = await notification.create(data)
    const populated = await notification.findById(result._id).populate('user')

    // 2️⃣ Emit only to this user's sockets
    const receiverSockets = connectedUsers.get(user.toString()) || []
    if (receiverSockets.length > 0) {
      receiverSockets.forEach(sid => {
        io.to(sid).emit('newNotification', populated)
      })
    }

    return populated
  } catch (error) {
    throw new Error(error.message)
  }
}
