import { sendEmail } from '../../Utilis/Services/sendEmail.js'
import { createNotificationService } from '../Notification/notification.service.js'

export const notifyUser = async ({
  userId,
  email,
  message,
  type,
  emailTemplate
}) => {
  setImmediate(async () => {
    try {
      const html = emailTemplate()
      await createNotificationService(userId, message, html, type)
      await sendEmail({
        to: email,
        subject:
          type === 'abstract_created'
            ? 'Abstract Submission Confirmation'
            : type === 'reviewer_assigned'
            ? 'Review Invitation'
            : 'Payment Confirmation',
        html
      })
    } catch (err) {
      console.error(`Error sending email to user ${email}:`, err)
    }
  })
}
