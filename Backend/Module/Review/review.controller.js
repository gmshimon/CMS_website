import {
  authorReviewAssignedTemplate,
  reviewerAssignmentTemplate
} from '../../Utilis/EmailTemplate/reviewEmailTemplate.js'
import { sendEmail } from '../../Utilis/sendEmail.js'
import Abstracts from '../Abstract/abstract.model.js'
import Users from '../User/user.model.js'
import Reviews from './review.model.js'

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

export const acceptReviewInvitation = async (req, res, next) => {
  try {
    const { reviewId } = req.body

    if (!reviewId) {
      return res.status(400).json({
        status: 'fail',
        message: 'reviewId is required'
      })
    }

    // Find the review document by ID and check if it is still pending
    const review = await Reviews.findOne({
      _id: reviewId,
      status: 'Pending'
    })

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review assignment not found or already responded'
      })
    }

    // Update review to accepted state, set acceptedAt and deadline (7 days from now)
    const now = new Date()
    const deadline = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days later

    review.accepted = true
    review.acceptedAt = now
    review.status = 'Accepted'
    review.deadline = deadline

    await review.save()

    res.status(200).json({
      status: 'success',
      message: 'Review invitation accepted',
      data: review
    })
  } catch (error) {
    next(error)
  }
}

export const submitReview = async (req, res, next) => {
  try {
    const { reviewId, score, comments } = req.body
    const userId = req.user._id // assuming you have authentication middleware that sets req.user

    if (!reviewId || score == null || comments == null) {
      return res.status(400).json({
        status: 'fail',
        message: 'reviewId, score, and comments are required'
      })
    }

    // Find the review by ID and check ownership and accepted status
    const review = await Reviews.findOne({
      _id: reviewId,
      reviewer: userId,
      status: 'Accepted'
    })

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review not found, not accepted, or not assigned to you'
      })
    }

    // Update review fields
    review.score = score
    review.comments = comments
    review.completedAt = new Date()
    review.status = 'Reviewed'

    await review.save()

    res.status(200).json({
      status: 'success',
      message: 'Review submitted successfully',
      data: review
    })
  } catch (error) {
    next(error)
  }
}
