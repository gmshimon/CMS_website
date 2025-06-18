import { io } from '../../socket/index.js'
import notification from './notification.model.js'

export const createNotificationService = async (user, title, message) => {
  try {
    const data = {
      user,
      message,
      title
    }

    const result = await notification.create(data)
    const getNot = await notification
      .findOne({ _id: result._id })
      .populate('user')
    io.emit('sendNotification', getNot)

    return result
  } catch (error) {
    throw new Error(error.message)
  }
}
