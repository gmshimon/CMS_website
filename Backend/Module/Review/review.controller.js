import {
  authorReviewAssignedTemplate,
  reviewerAssignmentTemplate,
  reviewerReminderTemplate
} from '../../Utilis/EmailTemplate/reviewEmailTemplate.js'
import { sendEmail } from '../../Utilis/sendEmail.js'
import Abstracts from '../Abstract/abstract.model.js'
import { createNotificationService } from '../Notification/notification.service.js'
import Users from '../User/user.model.js'
import Reviews from './review.model.js'

// admin assign reviewer to a abstract
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
    await sendEmail({
      to: isUserReview.email,
      subject: 'Invitation to Review an Abstract',
      html: emailHtml
    })

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
      await createNotificationService(
        authorUser._id,
        authorMessage,
        authorEmailHtml
      )
      // Send email to abstract author
      await sendEmail({
        to: authorUser.email,
        subject: 'Your Abstract is Assigned to Reviewers',
        html: authorEmailHtml
      })
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

// reviewer accept the invite link
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

// the reviewer add the review
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

// admin fetch the review Dashboard
export const getReviewDashboardsStats = async (req, res, next) => {
  try {
    const { year } = req.query
    const matchQuery = {}
    if (year) {
      matchQuery.$expr = {
        $eq: [{ $year: '$createdAt' }, parseInt(year)]
      }
    }
    // 1. Total submissions
    const totalSubmissions = await Abstracts.countDocuments(matchQuery)

    // 2. Pending reviews (status = 'Accepted' but no completedAt)
    const pendingReviews = await Reviews.countDocuments({
      status: { $in: ['Accepted', 'Pending'] },
      completedAt: { $exists: false }
    })

    // 3. Unassigned submissions = abstracts with no reviews
    const abstractsWithReviews = await Reviews.distinct('abstract')
    const unassignedSubmissions = await Abstracts.countDocuments({
      _id: { $nin: abstractsWithReviews }
    })

    // 4. Completed reviews
    const completedReviews = await Reviews.countDocuments({
      status: 'Reviewed'
    })

    // 5. Overdue reviews = status = 'Overdue'
    const overdueReviews = await Reviews.countDocuments({
      status: 'Overdue'
    })

    // 6. Multiple review rounds = abstracts that appear more than once in Reviews
    const multiRoundAbstractsAgg = await Reviews.aggregate([
      {
        $group: {
          _id: '$abstract',
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      },
      {
        $count: 'multiRoundAbstracts'
      }
    ])
    const multiRoundAbstracts =
      multiRoundAbstractsAgg[0]?.multiRoundAbstracts || 0

    const data = {
      totalSubmissions,
      pendingReviews,
      unassignedSubmissions,
      completedReviews,
      overdueReviews,
      multiRoundAbstracts
    }

    res.status(200).json({
      status: 'Success',
      message: 'Fetched the review dashboard',
      data
    })
  } catch (error) {
    next(error)
  }
}

// fetch the different abstract with review data based on satus
export const getAbstractsByCategory = async (req, res, next) => {
  try {
    const { category, year } = req.query // from query string e.g., /abstracts?category=unassigned
    const matchQuery = {}
    if (year) {
      matchQuery.$expr = {
        $eq: [{ $year: '$createdAt' }, parseInt(year)]
      }
    }
    if (category === 'all') {
      // Get all abstracts with their reviews
      const abstracts = await Abstracts.find(matchQuery)
        .populate('conference')
        .populate('conference_reg')
        .populate('createdBy')
        .lean()

      // Attach reviews to each abstract
      const abstractsWithReviews = await Promise.all(
        abstracts.map(async abstract => {
          const reviews = await Reviews.find({
            abstract: abstract._id
          }).populate('reviewer')
          return { ...abstract, reviews }
        })
      )

      return res.status(200).json({ success: true, data: abstractsWithReviews })
    }

    if (category === 'unassigned') {
      // Find abstracts that do not have any review
      const reviewedAbstractIds = await Reviews.distinct('abstract')

      const unassignedAbstracts = await Abstracts.find({
        _id: { $nin: reviewedAbstractIds },
        ...matchQuery
      })
        .populate('conference')
        .populate('conference_reg')
        .populate('createdBy')
        .lean()

      return res.status(200).json({ success: true, data: unassignedAbstracts })
    }
    if (category === 'pending') {
      const abstracts = await Abstracts.find(matchQuery)
        .populate('conference')
        .populate('conference_reg')
        .populate('createdBy')
        .lean()

      // Attach reviews to each abstract
      const abstractsWithReviews = await Promise.all(
        abstracts.map(async abstract => {
          const reviews = await Reviews.find({
            abstract: abstract._id,
            status: category
          }).populate('reviewer')
          return { ...abstract, reviews }
        })
      )
      return res.status(200).json({ success: true, data: abstractsWithReviews })
    }

    // Any other specific category
    const filteredAbstracts = await Abstracts.find({ category })
      .populate('conference')
      .populate('conference_reg')
      .populate('createdBy')
      .lean()

    // Attach reviews to each
    const abstractsWithReviews = await Promise.all(
      filteredAbstracts.map(async abstract => {
        const reviews = await Reviews.find({ abstract: abstract._id }).populate(
          'reviewer'
        )
        return { ...abstract, reviews }
      })
    )

    return res.status(200).json({ success: true, data: abstractsWithReviews })
  } catch (error) {
    console.error('Error in getAbstractsByCategory:', error)
    return res.status(500).json({ success: false, message: 'Server Error' })
  }
}

export const sendReminderToReviewer = async (req, res, next) => {
  try {
    const { reviewId } = req.body

    const review = await Reviews.findOne({
      _id: reviewId,
      status: { $in: ['Accepted', 'pending'] },
      completedAt: { $exists: false }
    }).populate('reviewer')

    if (!review) {
      const error = new Error('Reviewer not found')
      error.statusCode = 404
      return next(error)
    }

    const abstract = await Abstracts.findOne({
      _id: review.abstract
    }).populate('conference')

    // create the email template for reminder

    const emailHtml = reviewerReminderTemplate({
      reviewerName: review.reviewer.name,
      abstractTitle: abstract.paper_title,
      conferenceName: abstract.conference.name
    })

    // sending notification to the reviewer
    const message = `Reminder: You have been invited to review the abstract titled "${abstract?.paper_title}" for the ${abstract?.conference?.name} conference. We kindly request you to accept or decline the invitation as soon as possible to help us proceed with the review process.`

    await createNotificationService(review.reviewer._id, message, emailHtml)

    await sendEmail({
      to: review.reviewer.email,
      subject: `Reminder: Review Invitation for "${abstract?.paper_title}" – ${abstract?.conference?.name}`,
      html: emailHtml
    })

    res.status(200).json({
      status: 'Success',
      message: 'Reminder sent'
    })
  } catch (error) {
    next(error)
  }
}
