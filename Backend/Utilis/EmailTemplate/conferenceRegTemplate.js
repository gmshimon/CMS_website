export const attendeeConferenceRegTemplate = ({
  attendeeName,
  conferenceName,
  registrationId,
  paymentDeadline
}) => {
  return `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #2c3e50;">Welcome to ${conferenceName}!</h2>
    <p>Dear <strong>${attendeeName}</strong>,</p>
    <p>Thank you for registering for <strong>${conferenceName}</strong>.</p>
    <p>Your Registration ID: <strong>${registrationId}</strong></p>
    <p>Please complete your payment within <strong>1 week</strong> 
       (by <strong>${paymentDeadline}</strong>) to confirm your participation.</p>
    <p>We’re excited to have you with us and look forward to your active participation.</p>
    <br/>
    <p style="color: #888;">Best regards,</p>
    <p><strong>${conferenceName} Organizing Committee</strong></p>
    <hr/>
    <p style="font-size: 12px; color: #aaa;">This is an automated email, please do not reply.</p>
  </div>
  `
}

export const adminConferenceRegTemplate = ({
  adminName,
  attendeeName,
  conferenceName,
  registrationId
}) => {
  return `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #2c3e50;">New Attendee Registration</h2>
    <p>Hi ${adminName},</p>
    <p>A new attendee has registered for <strong>${conferenceName}</strong>.</p>
    <p>
      <strong>Name:</strong> ${attendeeName}<br/>
      <strong>Registration ID:</strong> ${registrationId}
    </p>
    <p>Please check the admin dashboard for full details.</p>
    <br/>
    <p style="color: #888;">Thank you for overseeing the registration process.</p>
    <hr/>
    <p style="font-size: 12px; color: #aaa;">This is an automated message from ConferenceX.</p>
  </div>
  `
}

export const adminPaymentUploadedTemplate = ({
  adminName,
  attendeeName,
  conferenceName,
  registrationId
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2c3e50;">Hi ${adminName},</h2>
      <p>
        The attendee <strong>${attendeeName}</strong> has uploaded a payment receipt 
        for their registration <strong>${registrationId}</strong> in the conference 
        <strong>${conferenceName}</strong>.
      </p>
      <p>You can log in to the admin dashboard to review and approve/reject this payment.</p>
      <br/>
      <p style="color: #888;">Thank you for overseeing the registration process.</p>
      <hr/>
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ConferenceX.</p>
    </div>
  `
}
