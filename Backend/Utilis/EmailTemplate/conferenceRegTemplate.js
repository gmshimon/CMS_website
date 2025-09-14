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

export const paymentDecisionEmailTemplate = ({
  attendeeName,
  conferenceName,
  paymentStatus,
  invoiceUrl = null
}) => {
  return `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden">
    <div style="background:#1e3a8a; color:white; padding:16px; text-align:center;">
      <h2 style="margin:0;">${conferenceName}</h2>
    </div>
    <div style="padding:20px;">
      <p>Dear <strong>${attendeeName}</strong>,</p>
      
      <p>We are writing to inform you about the status of your payment for the <strong>${conferenceName}</strong>.</p>
      
      ${
        paymentStatus === "Paid"
          ? `
          <p style="color:green; font-weight:bold;">✅ Your payment has been accepted.</p>
          <p>Thank you for completing your registration. You can download your invoice below:</p>
          <p><a href="${invoiceUrl}" style="display:inline-block; padding:10px 16px; background:#1e3a8a; color:#fff; text-decoration:none; border-radius:4px;">Download Invoice</a></p>
        `
          : `
          <p style="color:red; font-weight:bold;">❌ Unfortunately, your payment could not be accepted.</p>
          <p>Please review your payment details and try again. If you believe this is an error, kindly contact our support team.</p>
        `
      }
      
      <p>If you have any questions, please feel free to reach out to us.</p>
      
      <p style="margin-top:24px;">Best regards,<br/>The ${conferenceName} Organizing Committee</p>
    </div>
    <div style="background:#f3f4f6; padding:12px; text-align:center; font-size:12px; color:#555;">
      This is an automated message. Please do not reply directly to this email.
    </div>
  </div>
  `
}

