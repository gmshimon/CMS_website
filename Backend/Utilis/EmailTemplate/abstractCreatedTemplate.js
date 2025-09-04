export const abstractCreatedTemplate = ({ userName, abstractTitle }) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Hi ${userName},</h2>
      <p>Your abstract titled <strong>"${abstractTitle}"</strong> has been successfully submitted.</p>
      <p>We will notify you once it is reviewed.</p>
      <br />
      <p style="color: #888;">Thank you for participating in our conference.</p>
      <hr />
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ConferenceX.</p>
    </div>
  `
}

export const abstractStatusChangeTemplate = ({
  authorName,
  abstractTitle,
  conferenceName,
  newStatus,
  paymentDeadline // optional
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Dear ${authorName},</h2>
      
      <p>
        We would like to inform you that the status of your abstract titled 
        <strong>"${abstractTitle}"</strong> for the 
        <strong>${conferenceName}</strong> has been updated to: 
        <span style="color: #2980b9; font-weight: bold;">${newStatus}</span>.
      </p>
       ${
         paymentDeadline
           ? `
      <p>
        Please note, the payment for your abstract must be completed by 
        <strong>${paymentDeadline}</strong>.
      </p>`
           : ''
       }
      <p>
        If you have any questions or require further information, please feel free to contact us.
      </p>
      
      <p>
        Thank you for your valuable contribution and participation in <strong>${conferenceName}</strong>.
      </p>
      
      <br />
      <hr />
      <p style="font-size: 12px; color: #aaa;">
        This is an automated notification from the ${conferenceName} Conference System.
      </p>
    </div>
  `
}

export const paymentStatusChangeTemplate = ({
  authorName,
  abstractTitle,
  conferenceName,
  paymentStatus,
  paperDeadline
}) => {
  const statusColor =
    paymentStatus.toLowerCase() === 'paid' ? '#27ae60' : '#c0392b'
  const statusMessage =
    paymentStatus.toLowerCase() === 'paid'
      ? 'We are pleased to inform you that your payment has been successfully received and accepted.'
      : 'We regret to inform you that your payment has been rejected. Please review your payment details or contact the conference support team.'

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Dear ${authorName},</h2>
      
      <p>
        This is to notify you that the payment status for your abstract titled 
        <strong>"${abstractTitle}"</strong> submitted to the 
        <strong>${conferenceName}</strong> has been updated to: 
        <span style="color: ${statusColor}; font-weight: bold;">${paymentStatus}</span>.
      </p>
      
      <p>
        ${statusMessage}
      </p>

       ${
         paperDeadline
           ? `
      <p>
        Please note, your paper submission deadline is <strong>${paperDeadline}</strong>.
      </p>`
           : ''
       }

      <p>
        If you have any questions or concerns, feel free to contact us for assistance.
      </p>

      <p>
        Thank you for your interest and contribution to <strong>${conferenceName}</strong>.
      </p>
      
      <br />
      <hr />
      <p style="font-size: 12px; color: #aaa;">
        This is an automated notification from the ${conferenceName} Conference System.
      </p>
    </div>
  `
}

// templates/paymentReminderTemplate.ts

export const paymentReminderEmailTemplate = ({
  authorName,
  abstractTitle,
  conferenceName,
  paymentDeadline
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2c3e50;">Dear ${authorName},</h2>
      
      <p>
        This is a gentle reminder that the payment for your abstract titled 
        <strong>"${abstractTitle}"</strong> submitted to the 
        <strong>${conferenceName}</strong> is still pending.
      </p>

      ${
        paymentDeadline
          ? `
      <p>
        Please complete your payment by <strong>${paymentDeadline}</strong> to ensure your participation and abstract processing.
      </p>`
          : `
      <p>
        Kindly complete your payment at the earliest to ensure your participation and abstract processing.
      </p>`
      }

      <p>
        If you have already made the payment recently, please disregard this message.
      </p>

      <br />
      <p>
        Thank you for your attention and your contribution to <strong>${conferenceName}</strong>.
      </p>
      
      <hr />
      <p style="font-size: 12px; color: #aaa;">
        This is an automated email from the ${conferenceName} Conference System.
      </p>
    </div>
  `
}

export const paperSubmitReminderEmailTemplate = ({
  authorName,
  abstractTitle,
  conferenceName
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto;">
      <h2 style="color: #2c3e50;">Dear ${authorName},</h2>

      <p>
        This is a kind reminder to submit your full paper for the abstract
        titled <strong>"${abstractTitle}"</strong>, submitted to <strong>${conferenceName}</strong>.
      </p>

      <p>
        Please log in to the conference portal to upload your full paper.
        Timely submission is important to ensure your paper is considered for review.
      </p>

      <p>
        If you have already submitted your paper, kindly disregard this message.
      </p>

      <p>
        Thank you for your contribution to <strong>${conferenceName}</strong>.
      </p>

      <hr />
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        This is an automated email from the ${conferenceName} Conference System.
      </p>
    </div>
  `
}

export const scheduleUpdateTemplate = ({
  userName,
  abstractTitle,
  conference,
  session,
  day,
  date,
  startTime,
  endTime,
  abstractType,
  meetingLink,
  venue
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2c3e50;">Hi ${userName},</h2>

      <p>We are excited to inform you that your abstract titled 
        <strong>"${abstractTitle}"</strong> has been scheduled in 
        the <strong>${conference}</strong>.
      </p>

      <h3 style="color: #2c3e50; margin-top: 20px;">📅 Schedule Details:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Session:</strong> ${session}</li>
        <li><strong>Day:</strong> ${day}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${startTime} - ${endTime}</li>
        <li><strong>Type:</strong> ${abstractType}</li>
        ${
          abstractType.includes('Online') && meetingLink
            ? `<li><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></li>`
            : ''
        }
        ${
          abstractType.includes('Physical') && venue
            ? `<li><strong>Venue:</strong> ${venue.building}, ${venue.hall}, Room ${venue.room}</li>`
            : ''
        }
      </ul>

      <p style="margin-top: 20px;">
        Please make a note of the schedule. We look forward to your presentation.
      </p>

      <br/>
      <p style="color: #888;">Thank you for contributing to our conference!</p>
      <hr />
      <p style="font-size: 12px; color: #aaa;">
        This is an automated message from ConferenceX. Please do not reply directly.
      </p>
    </div>
  `
}

export const sessionNotificationTemplate = ({
  userName,
  role, // "Session Chair" or "Moderator"
  conference,
  session,
  day,
  date,
  startTime,
  endTime,
  abstractType,
  meetingLink,
  venue,
  abstracts // array of { title, author }
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2c3e50;">Hi ${userName},</h2>

      <p>
        You have been assigned as the <strong>${role}</strong> for the following session 
        in <strong>${conference}</strong>.
      </p>

      <h3 style="color: #2c3e50; margin-top: 20px;">📅 Session Details:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Session:</strong> ${session}</li>
        <li><strong>Day:</strong> ${day}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${startTime} - ${endTime}</li>
        <li><strong>Type:</strong> ${abstractType}</li>
        ${
          abstractType.includes('Online') && meetingLink
            ? `<li><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></li>`
            : ''
        }
        ${
          abstractType.includes('Physical') && venue
            ? `<li><strong>Venue:</strong> ${venue.building}, ${venue.hall}, Room ${venue.room}</li>`
            : ''
        }
      </ul>

      ${
        abstracts && abstracts.length
          ? `
          <h3 style="color: #2c3e50; margin-top: 20px;">📑 Abstracts in this Session:</h3>
          <ol style="padding-left: 20px;">
            ${abstracts
              .map(
                abs => `<li><strong>${abs.title}</strong> by ${abs.author}</li>`
              )
              .join('')}
          </ol>
        `
          : ''
      }

      <p style="margin-top: 20px;">
        Thank you for your valuable contribution in ensuring the success of this session.
      </p>

      <br/>
      <p style="color: #888;">We appreciate your support in our conference!</p>
      <hr />
      <p style="font-size: 12px; color: #aaa;">
        This is an automated message from ConferenceX. Please do not reply directly.
      </p>
    </div>
  `
}

export const scheduleRemovalTemplate = ({
  userName,
  role,
  conference,
  abstractTitle,
  session,
  day,
  date,
  startTime,
  abstractType,
  endTime,
  venue,
  meetingLink
}) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2 style="color: #d9534f;">Schedule Update Notification</h2>
      <p>Hello ${userName},</p>
      
      ${
        role === 'abstract'
          ? `<p>We wanted to inform you that your abstract <strong>"${abstractTitle}"</strong> has been <span style="color:#d9534f;">removed</span> from the schedule of <strong>${conference}</strong>.</p>`
          : `<p>We wanted to inform you that you have been <span style="color:#d9534f;">removed</span> as <strong>${role}</strong> for the following session in <strong>${conference}</strong>.</p>`
      }
<h3 style="color: #2c3e50; margin-top: 20px;">📅 Schedule Details:</h3>
      <<ul style="list-style: none; padding: 0;">
        <li><strong>Session:</strong> ${session}</li>
        <li><strong>Day:</strong> ${day}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${startTime} - ${endTime}</li>
        <li><strong>Type:</strong> ${abstractType}</li>
        ${
          abstractType.includes('Online') && meetingLink
            ? `<li><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></li>`
            : ''
        }
        ${
          abstractType.includes('Physical') && venue
            ? `<li><strong>Venue:</strong> ${venue.building}, ${venue.hall}, Room ${venue.room}</li>`
            : ''
        }
      </ul>

      <p>Thank you for your contribution.<br/>- Conference Team</p>
    </div>
  `
}
