import {
  authorReviewAssignedTemplate,
  reviewerAssignmentTemplate
} from '../../Utilis/EmailTemplate/reviewEmailTemplate'
import { sendEmail } from '../../Utilis/sendEmail'
import Abstracts from '../Abstract/abstract.model'
import Users from '../User/user.model'
import Reviews from './review.model'

export const assignReviewer = async (req, res, next) => {
  try {
    // Extract abstractId and reviewerId from request body
    const { abstractId, reviewerId } = req.body

    //  check if this reviewer is already assigned to this abstract and round
    const existingReview = await Reviews.findOne({
      abstract: abstractId,
      reviewer: reviewerId
    })

    if (existingReview) {
      // Return 400 error if assignment already exists
      return res.status(400).json({
        message: 'This reviewer is already assigned to this abstract.'
      })
    }

    // Find the user by reviewerId and check if user exists and has role 'Reviewer'
    const isUserReview = await Users.findById(reviewerId).lean()
    // Fetch abstract info to include in email
    const abstract = await Abstracts.findById(abstractId)
      .populate({
        path: 'conference'
      })
      .lean()

    // If abstract does not exist, return 404 error
    if (!abstract) {
      return res.status(404).json({
        status: 'fail',
        message: 'Abstract not found'
      })
    }

    if (!isUserReview || isUserReview.role !== 'Reviewer') {
      const error = new Error('User is not a reviewer or does not exist')
      error.statusCode = 404
      return next(error)
    }

    // Create new review document with initial status 'Pending' and accepted=false
    const review = await Reviews.create({
      abstract: abstractId,
      reviewer: reviewerId,
      status: 'Pending',
      accepted: false
    })

    // Prepare the email content for the reviewer
    const emailHtml = reviewerAssignmentTemplate({
      reviewerName: isUserReview.name || 'Reviewer',
      abstractTitle: abstract?.paper_title || 'an abstract',
      conferenceName: abstract?.conference?.name // replace with your dynamic conf name if available
    })

    // sending notification to the reviewer
    const message = `You have been assigned as a reviewer to ${abstract?.paper_title} abstract of ${abstract?.conference?.name} conference`
    await createNotificationService(isUserReview._id, message, emailHtml)

    // Send invitation email to the reviewer
    await sendEmail(
      isUserReview.email,
      'Invitation to Review an Abstract',
      emailHtml
    )

    // Fetch the abstract submitter (author) info
    const authorUser = await Users.findById(abstract.createdBy).lean()

    // If author exists and has an email, prepare and send notification email
    if (authorUser && authorUser.email) {
      const authorEmailHtml = authorReviewAssignedTemplate({
        authorName: authorUser.name || 'Author',
        abstractTitle: abstract.paper_title || 'your abstract',
        conferenceName: abstract?.conference?.name
      })
      const authorMessage = ` We are pleased to inform you that your abstract titled "${abstract.paper_title}" has been assigned to reviewers for evaluation as part of the ${abstract?.conference?.name}.`

      // sending notification to the author of the abstract
      await createNotificationService(authorUser._id, message, emailHtml)
      // Send email to abstract author
      await sendEmail(
        authorUser.email,
        'Your Abstract is Assigned to Reviewers',
        authorEmailHtml
      )
    }

    res.status(201).json({
      status: 'Success',
      message: 'Reviewer assigned and emails sent successfully',
      data: review
    })
  } catch (error) {
    next(error)
  }
}
