import { generateICS } from './generateICSFile'
import { sendEmail } from './sendEmail'

/**
 * Send an email with ICS calendar attachment
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content of the email
 * @param {string} options.title - ICS event title
 * @param {string} options.description - ICS event description
 * @param {Date} options.date - Event date
 * @param {string} options.startTime - Event start time "HH:mm"
 * @param {string} options.endTime - Event end time "HH:mm"
 * @param {string} options.location - Event location
 */
export const sendCalendarEmail = async ({
  to,
  subject,
  html,
  title,
  description,
  date,
  startTime,
  endTime,
  location
}) => {
  const icsPath = await generateICS({
    title,
    description,
    date,
    startTime,
    endTime,
    location,
    attendees: [to]
  })

  await sendEmail({
    to,
    subject,
    html,
    attachments: [{ filename: 'event.ics', path: icsPath }]
  })
}
