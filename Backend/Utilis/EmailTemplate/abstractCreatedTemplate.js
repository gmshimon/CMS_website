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
  newStatus
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
  paymentStatus
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
  conferenceName
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2c3e50;">Dear ${authorName},</h2>
      
      <p>
        This is a gentle reminder that the payment for your abstract titled 
        <strong>"${abstractTitle}"</strong> submitted to the 
        <strong>${conferenceName}</strong> is still pending.
      </p>

      <p>
        Kindly complete your payment at the earliest to ensure your participation and abstract processing.
      </p>

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
