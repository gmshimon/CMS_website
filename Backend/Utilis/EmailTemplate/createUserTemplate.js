export const accountCreatedTemplate = ({ name, email, password, role, committeeType }) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
      <h2 style="color: #2c3e50;">Welcome to ConferenceX, ${name}!</h2>

      <p>We are excited to inform you that your account has been successfully created.</p>

      <p><strong>Here are your login details:</strong></p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
        <li><strong>Role:</strong> ${role}</li>
        ${committeeType ? `<li><strong>Committee Type:</strong> ${committeeType}</li>` : ''}
      </ul>

      <p>You can log in to your dashboard and start using the platform:</p>
      <a href="https://your-frontend-url.com/login" style="display: inline-block; padding: 10px 20px; color: white; background-color: #2c3e50; border-radius: 4px; text-decoration: none;">Login Now</a>

      <br/><br/>
      <p style="color: #888;">If you did not request this account, please ignore this message.</p>
      
      <hr style="margin-top: 30px;" />
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ConferenceX. Please do not reply to this email.</p>
    </div>
  `;
};
