import {
  adminReviewerInvitationResponseTemplate,
  adminReviewerSubmittedTemplate
} from '../../Utilis/EmailTemplate/abstractCreatedTemplate.js'
import {
  reviewerAssignmentTemplate,
  reviewerConfirmationTemplate,
  reviewerReminderTemplate
} from '../../Utilis/EmailTemplate/reviewEmailTemplate.js'
import Abstracts from '../Abstract/abstract.model.js'
import { notifyAdmins } from '../Admin/admin.service.js'
import Paper from '../Paper/paper.model.js'
import Users from '../User/user.model.js'
import { notifyUser } from '../User/user.service.js'
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
      const error = new Error(
        'This reviewer is already assigned to this abstract.'
      )
      error.statusCode = 400
      return next(error)
    }

    // Find the user by reviewerId and check if user exists and has role 'Reviewer'
    const isUserReview = await Users.findById(reviewerId).lean()

    if (!isUserReview || isUserReview.role !== 'Reviewer') {
      const error = new Error('User is not a reviewer or does not exist')
      error.statusCode = 404
      return next(error)
    }

    // Fetch abstract info to include in email
    const abstract = await Abstracts.findById(abstractId)
      .populate({
        path: 'conference',
        select: 'name'
      })
      .lean()

    // If abstract does not exist, return 404 error
    if (!abstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    // Create new review document with initial status 'Pending' and accepted=false
    const review = await Reviews.create({
      abstract: abstractId,
      reviewer: reviewerId,
      conference: abstract.conference._id,
      status: 'pending',
      accepted: false
    })

    notifyUser({
      userId: isUserReview._id,
      email: isUserReview.email,
      message: `You have been assigned as a reviewer for "${abstract?.paper_title}" in ${abstract?.conference?.name}`,
      type: 'reviewer_assigned',
      emailTemplate: () =>
        reviewerAssignmentTemplate({
          reviewerName: isUserReview.name || 'Reviewer',
          abstractTitle: abstract?.paper_title || 'an abstract',
          conferenceName: abstract?.conference?.name // replace with your dynamic conf name if available
        })
    })

    res.status(200).json({
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
    const { reviewId, status } = req.body

    // ✅ Validate required input
    if (!reviewId) {
      return res.status(400).json({
        status: 'fail',
        message: 'reviewId is required'
      })
    }

    // ✅ Find the review with matching ID and ensure it's still pending
    const review = await Reviews.findOne({
      _id: reviewId,
      status: 'pending'
    })
      .populate({
        path: 'abstract',
        populate: {
          path: 'conference'
        }
      })
      .populate('reviewer')

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review assignment not found or already responded'
      })
    }

    // ✅ If reviewer ACCEPTS the review invitation
    if (status === 'accepted') {
      // Update review to accepted state, set acceptedAt and deadline (7 days from now)
      const now = new Date()
      const deadline = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days later

      review.accepted = true
      review.acceptedAt = now
      review.status = 'accepted'
      review.deadline = deadline

      await review.save()

      // ✅ Prepare deadline string for email content
      const deadlineFormatted = review.deadline.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // ✅ Prepare email content for reviewer

      notifyUser({
        userId: review.reviewer._id,
        email: review.reviewer.email,
        message: `Thank you for accepting the review invitation for "${
          review.abstract.paper_title
        }" under ${
          review.abstract.conference?.name
        }. Your review is due by ${review.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}.`,
        type: 'reviewer_accepted',
        emailTemplate: () =>
          reviewerConfirmationTemplate({
            reviewerName: review.reviewer.name || 'Reviewer',
            abstractTitle: review.abstract.paper_title || 'the abstract',
            conferenceName:
              review.abstract.conference?.name || 'the conference',
            deadlineDate: deadlineFormatted
          })
      })

      // ✅ Fetch the author (submitter of the abstract)
      // const authorUser = await Users.findById(review.abstract.createdBy).lean()

      // // ✅ Send notification and email to author if available
      // if (authorUser && authorUser.email) {

      //   notifyUser({
      //     userId: authorUser._id,
      //     email: authorUser.email,
      //     message: `Your abstract titled "${review.abstract.paper_title}" has been assigned to reviewers for evaluation as part of the ${review.abstract?.conference?.name}.`,
      //     type: 'Abstract Review Assigned',
      //     emailTemplate: () =>
      //       authorReviewAssignedTemplate({
      //         authorName: authorUser.name || 'Author',
      //         abstractTitle: review.abstract.paper_title || 'your abstract',
      //         conferenceName: review.abstract?.conference?.name
      //       })
      //   })
      // }
    } else {
      // ❌ If reviewer REJECTS the invitation, delete the review record
      await Reviews.deleteOne({
        _id: reviewId
      })
    }

    // notify the admins about the action
    notifyAdmins({
      message: `Reviewer "${review.reviewer.name}" has ${
        status === 'accepted' ? 'accepted' : 'declined'
      } the review invitation for the abstract "${
        review.abstract.paper_title
      }" in the conference "${review.abstract.conference?.name}".`,
      type: 'Reviewer Invitation Response',
      emailTemplate: admin =>
        adminReviewerInvitationResponseTemplate({
          adminName: admin.name || 'Admin',
          reviewerName: review.reviewer.name || 'Reviewer',
          abstractTitle: review.abstract.paper_title || 'the abstract',
          conferenceName: review.abstract.conference?.name || 'the conference',
          accepted: status === 'accepted' ? true : false
        })
    })

    // ✅ Final response
    res.status(200).json({
      status: 'success',
      message:
        status === 'accepted'
          ? 'Review invitation accepted'
          : 'Review invitation declined and removed'
    })
  } catch (error) {
    next(error)
  }
}

// the reviewer add the review
export const submitReview = async (req, res, next) => {
  try {
    const { reviewId, score, comments, responses, correctionLevel } = req.body
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
      status: 'accepted'
    })
      .populate('conference', 'name')
      .populate('abstract', 'paper_title')

    if (!review) {
      const error = new Error(
        'Review not found, not accepted, or not assigned to you'
      )
      error.statusCode = 404
      return next(error)
    }

    const reviewerName = req.user.name || 'Reviewer'
    const abstractTitle = review?.abstract?.paper_title || 'the abstract'
    const conferenceName = review?.conference?.name || 'the conference'

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review not found, not accepted, or not assigned to you'
      })
    }

    // Update review fields
    review.score = score
    review.comments = comments
    review.round = review.round + 1
    review.correctionLevel = correctionLevel
    review.responses = responses
    review.completedAt = new Date()
    review.status = 'reviewed'

    await review.save()

    // ✅ Notify admins asynchronously

    const adminMessage = `Reviewer "${reviewerName}" has submitted a review for the abstract "${abstractTitle}" in the conference "${conferenceName}".`
    const adminType = 'review_submitted'

    notifyAdmins({
      message: adminMessage,
      type: adminType,
      emailTemplate: admin =>
        adminReviewerSubmittedTemplate({
          adminName: admin.name || 'Admin',
          reviewerName,
          abstractTitle,
          conferenceName
        })
    })

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
    const { conference_id } = req.query
    const matchQuery = {
      presentation_method: {
        $in: ['Paper Presentation Online', 'Paper Presentation Physical']
      }
    }
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
    ) {
      matchQuery.conference = conference_id
    }
    // 1. Total submissions
    const totalSubmissions = await Abstracts.countDocuments(matchQuery)

    // 2. Pending reviews (status = 'Accepted' but no completedAt)
    const pendingReviews = await Reviews.countDocuments({
      status: { $in: ['accepted'] },
      completedAt: { $exists: false },
      ...(conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
        ? { conference: conference_id } // <-- if Reviews also store conference directly
        : {})
    })

    // 3. Unassigned submissions = abstracts with no reviews
    const abstractsWithReviews = await Reviews.distinct('abstract')
    const unassignedSubmissions = await Abstracts.countDocuments({
      _id: { $nin: abstractsWithReviews },
      ...matchQuery
    })

    // 4. Completed reviews
    const completedReviews = await Reviews.countDocuments({
      status: 'reviewed',
      ...(conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
        ? { conference: conference_id } // <-- if Reviews store conference
        : {})
    })

    const data = {
      totalSubmissions,
      pendingReviews,
      unassignedSubmissions,
      completedReviews
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
    const { category, conference_id } = req.query
    const matchQuery = {
      presentation_method: {
        $in: ['Paper Presentation Online', 'Paper Presentation Physical']
      }
    }
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
    ) {
      matchQuery.conference = conference_id
    }

    // Helper to attach reviews and papers to each abstract
    const attachReviewsAndPapers = async (abstracts, reviewsQuery = {}) => {
      return await Promise.all(
        abstracts.map(async abstract => {
          const [reviews, papers] = await Promise.all([
            Reviews.find({
              abstract: abstract._id,
              ...reviewsQuery
            }).populate('reviewer'),
            Paper.findOne({ abstract: abstract._id }) // adjust if your key is abstractId
          ])
          return { ...abstract, reviews, papers }
        })
      )
    }

    if (category === 'all') {
      const abstracts = await Abstracts.find(matchQuery)
        .populate('conference')
        .populate('conference_reg')
        .populate('createdBy')
        .lean()

      const abstractsWithReviewsAndPapers = await attachReviewsAndPapers(
        abstracts
      )

      return res
        .status(200)
        .json({ success: true, data: abstractsWithReviewsAndPapers })
    }

    if (category === 'unassigned') {
      const reviewedAbstractIds = await Reviews.distinct('abstract')
      const unassignedAbstracts = await Abstracts.find({
        _id: { $nin: reviewedAbstractIds },
        ...matchQuery
      })
        .populate('conference')
        .populate('conference_reg')
        .populate('createdBy')
        .lean()

      // If you also want papers here, uncomment next line
      const unassignedWithPapers = await Promise.all(
        unassignedAbstracts.map(async abstract => ({
          ...abstract,
          papers: await Paper.find({ abstract: abstract._id }),
          reviews: []
        }))
      )
      return res.status(200).json({ success: true, data: unassignedWithPapers })
    }

    if (category === 'accepted') {
      const abstracts = await Abstracts.find(matchQuery)
        .populate('conference')
        .populate('conference_reg')
        .populate('createdBy')
        .lean()

      const abstractsWithReviewsAndPapers = await attachReviewsAndPapers(
        abstracts,
        { status: category }
      )
      // Filter abstracts that have at least one review with status 'pending'
      const pendingAbstracts = abstractsWithReviewsAndPapers.filter(
        abstract =>
          abstract.reviews &&
          abstract.reviews.length > 0 &&
          abstract.reviews.some(review => review.status === 'accepted')
      )

      return res.status(200).json({ success: true, data: pendingAbstracts })
    }

    // Any other specific category
    const filteredAbstracts = await Abstracts.find(matchQuery)
      .populate('conference')
      .populate('conference_reg')
      .populate('createdBy')
      .lean()

    const abstractsWithReviewsAndPapers = await attachReviewsAndPapers(
      filteredAbstracts,
      { status: category }
    )
    return res
      .status(200)
      .json({ success: true, data: abstractsWithReviewsAndPapers })
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
      status: { $in: ['accepted', 'pending'] },
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

    //✅  sending notification to the reviewer
    notifyUser({
      userId: review.reviewer._id,
      email: review.reviewer.email,
      message: `Reminder: You have been invited to review the abstract titled "${abstract?.paper_title}" for the ${abstract?.conference?.name} conference. We kindly request you to accept or decline the invitation as soon as possible to help us proceed with the review process.`,
      type: 'reviewer_reminder',
      emailTemplate: () =>
        reviewerReminderTemplate({
          reviewerName: review.reviewer.name,
          abstractTitle: abstract.paper_title,
          conferenceName: abstract.conference.name
        })
    })

    res.status(200).json({
      status: 'Success',
      message: 'Reminder sent'
    })
  } catch (error) {
    next(error)
  }
}

export const getMyReviewStats = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { conference } = req.query

    let myReviews = await Reviews.find({
      reviewer: _id
    })
      .populate({
        path: 'abstract',
        populate: {
          path: 'conference'
        }
      })
      .lean()
    if (conference) {
      myReviews = myReviews.filter(
        review => review.abstract?.conference?._id?.toString() === conference
      )
    }

    const stats = {
      total: myReviews.length,
      pending: myReviews.filter(r => r.status === 'pending').length,
      accepted: myReviews.filter(r => r.status === 'accepted').length,
      reviewed: myReviews.filter(r => r.status === 'reviewed').length,
      overdue: myReviews.filter(r => r.status === 'overdue').length
    }

    res.status(200).json({
      status: 'Success',
      message: 'Successfully get my review stats',
      data: stats
    })
  } catch (error) {
    next(error)
  }
}

export const getMyReview = async (req, res, next) => {
  try {
    const { conference, status } = req.query
    const { _id } = req.user
    const query = {
      reviewer: _id
    }
    if (status !== 'certificate') {
      query.status = status
    }
    let getReview = await Reviews.find(query)
      .populate({
        path: 'abstract',
        populate: {
          path: 'conference'
        }
      })
      .lean()

    if (conference) {
      getReview = getReview.filter(
        review => review.abstract?.conference?._id?.toString() === conference
      )
    }

    // Attach paper for each abstract
    const reviewWithPaper = await Promise.all(
      getReview.map(async review => {
        if (review.abstract?._id) {
          const paper = await Paper.findOne({
            abstract: review.abstract._id
          }).lean()
          review.abstract.paper = paper || null
        }
        return review
      })
    )

    res.status(200).json({
      status: 'Success',
      message: 'Review Data',
      data: reviewWithPaper
    })
  } catch (error) {
    next(error)
  }
}
