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
  `;
};
