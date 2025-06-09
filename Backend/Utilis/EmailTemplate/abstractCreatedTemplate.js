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
