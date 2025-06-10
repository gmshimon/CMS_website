import { io } from "../../socket/index.js"
import notification from "./notification.model.js"

export const createNotificationService = async (user,title,message) => {
    try {
        const data = {
            user,
            message,
            title
        }

        const result = await notification.create(data)

        io.emit('sendNotification',result); 

        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}
