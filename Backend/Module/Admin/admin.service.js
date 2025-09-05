// utils/notificationHelper.js

import { sendEmail } from "../../Utilis/Services/sendEmail.js"
import { createNotificationService } from "../Notification/notification.service.js"
import Users from "../User/user.model.js"

export const notifyAdmins = async ({ message, type, emailTemplate }) => {
  const admins = await Users.find({ role: 'Admin' })

  admins.forEach(admin => {
    setImmediate(async () => {
      try {
        const html = emailTemplate(admin) // pass admin to template for personalization
        await createNotificationService(admin._id, message, html, type)
        await sendEmail({
          to: admin.email,
          subject: type === 'new_abstract_submitted' ? 'New Abstract Submitted' : 'New Payment Submitted',
          html
        })
      } catch (err) {
        console.error(`Error sending email to admin ${admin.email}:`, err)
      }
    })
  })
}
