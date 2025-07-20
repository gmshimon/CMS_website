export const authorReviewAssignedTemplate = ({
  authorName,
  abstractTitle,
  conferenceName
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Dear ${authorName},</h2>
      <p>We are pleased to inform you that your abstract titled <strong>"${abstractTitle}"</strong> has been assigned to reviewers for evaluation as part of the <strong>${conferenceName}</strong>.</p>
      <p>We will notify you once the review process is completed and decisions are made.</p>
      <br />
      <p style="color: #888;">Thank you for your valuable contribution to our conference.</p>
      <hr />
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ${conferenceName} Conference System.</p>
    </div>
  `
}
export const reviewerAssignmentTemplate = ({
  reviewerName,
  abstractTitle,
  conferenceName,
  acceptanceLink
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Dear ${reviewerName},</h2>
      <p>You have been invited to review the abstract titled <strong>"${abstractTitle}"</strong> for the <strong>${conferenceName}</strong>.</p>
      <p>Please <a href="${acceptanceLink}" style="color: #1a73e8; text-decoration: none;">click here</a> to accept or decline this review assignment.</p>
      <p><strong>Note:</strong> Once accepted, the review deadline will be 7 days from the acceptance date.</p>
      <p>Your timely review is crucial for the smooth progress of the conference.</p>
      <br />
      <p style="color: #888;">Thank you very much for your valuable contribution.</p>
      <hr />
      <p style="font-size: 12px; color: #aaa;">This is an automated message from ${conferenceName} Conference System.</p>
    </div>
  `
}

export const reviewerReminderTemplate = ({
  reviewerName,
  abstractTitle,
  conferenceName
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Dear ${reviewerName},</h2>
      <p>This is a gentle reminder that you have been invited to review the abstract titled <strong>"${abstractTitle}"</strong> for the <strong>${conferenceName}</strong>.</p>
    
      <p>Your contribution is highly valued and essential for the success of the review process.</p>
      <br />
      <p style="color: #888;">Thank you for your attention and support.</p>
      <hr />
      <p style="font-size: 12px; color: #aaa;">This is an automated reminder from ${conferenceName} Conference System.</p>
    </div>
  `
}

export const reviewerConfirmationTemplate = ({
  reviewerName,
  abstractTitle,
  conferenceName,
  deadlineDate
}) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <h2 style="color: #2c3e50;">Dear ${reviewerName},</h2>
      
      <p>Thank you for accepting the invitation to review the abstract titled 
      <strong>"${abstractTitle}"</strong> for the <strong>${conferenceName}</strong>.</p>
      
      <p>Your review is due by <strong>${deadlineDate}</strong>. Please ensure to submit your feedback by the deadline to support the timely progression of the review process.</p>

      <p>Your contribution is greatly appreciated and plays a vital role in upholding the quality of our conference.</p>

      <br />
      <p style="color: #888;">If you have any questions or need assistance, feel free to contact us.</p>
      
      <hr />
      <p style="font-size: 12px; color: #aaa;">This is an automated confirmation from the ${conferenceName} Conference System.</p>
    </div>
  `
}
