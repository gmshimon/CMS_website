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
export const adminAbstractNotificationTemplate = ({
  adminName,
  userName,
  abstractTitle
  // conferenceName
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Hi ${adminName},</h2>
      <p>A new abstract has been submitted by <strong>${userName}</strong>.</p>
      <p>Abstract Title: <strong>"${abstractTitle}"</strong></p>
      <p>Please review and take the necessary action.</p>
      <br />
      <p style="color: #888;">Thank you for managing the conference submissions.</p>
      <hr />
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ConferenceX.</p>
    </div>
  `
}

export const adminPaymentNotificationTemplate = ({
  adminName,
  userName,
  abstractTitle,
  conferenceName
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Hi ${adminName},</h2>
      <p>The user <strong>${userName}</strong> has submitted a payment for their abstract titled <strong>"${abstractTitle}"</strong> in the conference <strong>${conferenceName}</strong>.</p>
      <p>The payment is currently marked as <strong>Pending</strong>. Please review and confirm the payment.</p>
      <br />
      <p style="color: #888;">Thank you for managing conference payments.</p>
      <hr />
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ConferenceX.</p>
    </div>
  `
}

export const adminPaperNotificationTemplate = ({
  adminName,
  userName,
  abstractTitle,
  paperStatus,
  conferenceName
}) => {
  const actionText =
    paperStatus === 'Revision Submitted'
      ? 'submitted a revision of their paper'
      : 'submitted a new paper'

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Hi ${adminName},</h2>
      <p>The user <strong>${userName}</strong> has ${actionText} for the abstract titled <strong>"${abstractTitle}"</strong> in the conference <strong>${conferenceName}</strong>.</p>
      <p>Please review the submission at your earliest convenience.</p>
      <br/>
      <p style="color: #888;">Thank you for managing conference submissions.</p>
      <hr/>
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ConferenceX.</p>
    </div>
  `
}

export const adminReviewerSubmittedTemplate = ({
  adminName,
  reviewerName,
  abstractTitle,
  conferenceName
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Hi ${adminName},</h2>
      <p>The reviewer <strong>${reviewerName}</strong> has submitted their review for the abstract titled <strong>"${abstractTitle}"</strong> in the conference <strong>${conferenceName}</strong>.</p>
      <p>You can log in to the admin dashboard to view the full review details and proceed with the next steps.</p>
      <br/>
      <p style="color: #888;">Thank you for overseeing the review process.</p>
      <hr/>
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ConferenceX.</p>
    </div>
  `
}

export const adminReviewerInvitationResponseTemplate = ({
  adminName,
  reviewerName,
  abstractTitle,
  conferenceName,
  accepted
}) => {
  const actionText = accepted
    ? `has <span style="color: green; font-weight: bold;">ACCEPTED</span> the invitation`
    : `has <span style="color: red; font-weight: bold;">DECLINED</span> the invitation`

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Hi ${adminName},</h2>
      <p>The reviewer <strong>${reviewerName}</strong> ${actionText} to review the abstract titled <strong>"${abstractTitle}"</strong> in the conference <strong>${conferenceName}</strong>.</p>
      <p>${
        accepted
          ? 'You can monitor their review progress from the admin dashboard.'
          : 'Please assign another reviewer to ensure timely review of the abstract.'
      }</p>
      <br/>
      <p style="color: #888;">Thank you for managing the review process.</p>
      <hr/>
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ConferenceX.</p>
    </div>
  `
}

// templates/adminMarkSubmittedTemplate.js

const fmt = n => {
  if (Number.isInteger(n)) return String(n);
  const s = Number(n).toFixed(2);
  return s.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
};

export const adminMarkSubmittedTemplate = ({
  adminName,
  conferenceName,
  abstractTitle,
  presenterName,
  sessionChairName,
  totalMark,             // e.g., 46.5
  criteria = []          // [{ criterion, score, weight }]
}) => {
  // compute weighted total defensively
  const computedTotal = criteria.reduce(
    (sum, c) => sum + Number(c.score || 0) * Number(c.weight || 1),
    0
  );

  const rows = criteria.map(c => {
    const weighted = Number(c.score || 0) * Number(c.weight || 1);
    return `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee">${c.criterion || '-'}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right">${fmt(c.score ?? '-')}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right">× ${fmt(c.weight ?? 1)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right"><strong>${fmt(weighted)}</strong></td>
      </tr>
    `;
  }).join('');

  return `
  <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.6">
    <h2 style="margin:0 0 6px;font-weight:700">New Presentation Mark Submitted</h2>
    <p style="margin:0 0 16px;color:#444">Hi ${adminName},</p>

    <div style="margin:12px 0;padding:12px;border:1px solid #eee;border-radius:10px">
      <p style="margin:0 0 6px"><strong>Conference:</strong> ${conferenceName}</p>
      <p style="margin:0 0 6px"><strong>Abstract:</strong> ${abstractTitle}</p>
      <p style="margin:0 0 6px"><strong>Presenter:</strong> ${presenterName}</p>
      <p style="margin:0 0 6px"><strong>Session Chair:</strong> ${sessionChairName}</p>
    </div>

    <h3 style="margin:16px 0 8px;font-size:16px">Criteria Breakdown</h3>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      <thead>
        <tr>
          <th style="text-align:left;padding:10px 12px;border-bottom:2px solid #ddd">Criterion</th>
          <th style="text-align:right;padding:10px 12px;border-bottom:2px solid #ddd">Score</th>
          <th style="text-align:right;padding:10px 12px;border-bottom:2px solid #ddd">Weight</th>
          <th style="text-align:right;padding:10px 12px;border-bottom:2px solid #ddd">Weighted</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr>
          <td colspan="3" style="padding:12px;border-top:2px solid #ddd;text-align:right"><strong>Total</strong></td>
          <td style="padding:12px;border-top:2px solid #ddd;text-align:right">
            <strong>${fmt(totalMark ?? computedTotal)}</strong>
            <span style="color:#999;font-weight:400;margin-left:6px">(calc: ${fmt(computedTotal)})</span>
          </td>
        </tr>
      </tbody>
    </table>

    <p style="margin:16px 0 0;color:#666;font-size:12px">
      This is an automated message from your Conference Management System.
    </p>
  </div>`;
};

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
