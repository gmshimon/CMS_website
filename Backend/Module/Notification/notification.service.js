import { io } from "../../socket/index.js"
import notification from "./notification.model.js"

export const createNotificationService = async (user,message,title) => {
    try {
        const data = {
            user,
            message,
            title
        }

        const result = await notification.create(data)

        io.emit('sendNotification',{user,message,title}); 

        return result;
    } catch (error) {
        throw new error(error.message)
    }
}
