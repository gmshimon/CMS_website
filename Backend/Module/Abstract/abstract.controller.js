import {
  abstractCreatedTemplate,
  abstractStatusChangeTemplate,
  adminAbstractNotificationTemplate,
  adminPaymentNotificationTemplate,
  paperSubmitReminderEmailTemplate,
  paymentReminderEmailTemplate,
  paymentStatusChangeTemplate
} from '../../Utilis/EmailTemplate/abstractCreatedTemplate.js'
import { reviewerRevisionRequestTemplate } from '../../Utilis/EmailTemplate/reviewEmailTemplate.js'
import { notifyAdmins } from '../Admin/admin.service.js'
import { notifyUser } from '../User/user.service.js'
import conference_reg from '../Conference_reg/conference_reg.model.js'
import Paper from '../Paper/paper.model.js'
import Reviews from '../Review/review.model.js'
import Schedule from '../Schedule/schedule.model.js'
import Abstracts from './abstract.model.js'
import {
  s3AbstractGraphicalAbstract,
  s3AbstractPresentationProfilePicture,
  s3PaymentReceiptUploadService
} from './abstract.s3Service.js'
import dayjs from 'dayjs' // lightweight date library

export const createAbstract = async (req, res, next) => {
  try {
    const { conference_registration, ...data } = req.body
    const { _id, email, name } = req.user

    // Assign createdBy to conference registration
    conference_registration.createdBy = _id

    // ✅ Create the conference registration data
    const createConference = await conference_reg.create(
      conference_registration
    )

    // Handle uploaded files
    const abstractFile = req.files?.image?.[0]
    const profileImage = req.files?.file?.[0]

    const graphical = abstractFile
      ? await s3AbstractGraphicalAbstract(abstractFile)
      : null
    const image = profileImage
      ? await s3AbstractPresentationProfilePicture(profileImage)
      : null

    data.graphical_abstract = graphical
    data.presentation_profile_picture = image
    data.conference_reg = createConference._id
    data.createdBy = _id

    // ✅ Create the abstract
    const createAbstract = await Abstracts.create(data)
    await conference_reg.updateOne(
      { _id: createConference._id },
      { $set: { abstract: createAbstract._id } }
    )

    // ✅ Notify the submitting user (immediately)
    notifyUser({
      userId: _id,
      email,
      message: `Your abstract "${data.paper_title}" has been successfully submitted`,
      type: 'Abstract Created',
      emailTemplate: () =>
        abstractCreatedTemplate({
          userName: name,
          abstractTitle: data.paper_title
        })
    })
    // ✅ Notify admins asynchronously

    const adminMessage = `A new abstract "${data.paper_title}" has been submitted by ${name}`
    const adminType = 'new_abstract_submitted'

    notifyAdmins({
      message: adminMessage,
      type: adminType,
      emailTemplate: admin =>
        adminAbstractNotificationTemplate({
          adminName: admin.name,
          userName: name,
          abstractTitle: data.paper_title,
          conferenceName: createConference.name
        })
    })

    // ✅ Respond immediately without waiting for emails
    res.status(200).json({
      status: 'Success',
      message: 'Abstract successfully created',
      data: createAbstract
    })
  } catch (error) {
    next(error)
  }
}

export const getAbstract = async (req, res, next) => {
  try {
    const { payment_status, page = 1, limit = 10, search } = req.query
    const { conference_id } = req.params
    const { role, _id: userId } = req.user

    const matchQuery = {}

    // ✅ If presenter → only own abstracts
    if (role === 'Presenter') {
      matchQuery.createdBy = userId
    }

    // ✅ If conference_id is provided and not "all"
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined &&
      conference_id !== 'All Conferences'
    ) {
      matchQuery.conference = conference_id
    }

    // ✅ Payment filter
    if (payment_status) {
      matchQuery.payment_status = payment_status
    }

    // ✅ Add search by registration_id
    if (search) {
      matchQuery.abstract_id = { $regex: search, $options: 'i' }
    }

    // ✅ Convert page & limit to numbers
    const pageNum = parseInt(page) || 1
    const limitNum = parseInt(limit) || 10
    const skip = (pageNum - 1) * limitNum

    // ✅ Get total count for pagination
    const total = await Abstracts.countDocuments(matchQuery)

    let abstractsQuery = await Abstracts.find(matchQuery)
      .populate('conference')
      .populate('createdBy')
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .lean()

    // ✅ Fetch abstracts with pagination
    const abstracts = await Abstracts.find(matchQuery)
      .populate('conference')
      .populate('createdBy')
      .skip(skip)
      .limit(parseInt(limit))
      .lean()



    // ✅ Attach paper info
    const abstractsWithPapers = await Promise.all(
      abstracts.map(async abstract => {
        const paper = await Paper.findOne({ abstract: abstract._id }).lean()
        return {
          ...abstract,
          paper: paper || null
        }
      })
    )

    return res.status(200).json({
      status: 'Success',
      message: 'Fetched the abstract by category successfully',
      data: {
        abstractsWithPapers,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const changeReviewStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status, paper_deadline, message } = req.body
    const getAbstract = await Abstracts.findOne({ _id: id }).populate([
      { path: 'conference', select: 'name' },
      { path: 'createdBy', select: 'name email' }
    ])
    if (!getAbstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    getAbstract.status = status

    if (status == 'Accepted') {
      getAbstract.review_status = 'Reviewed'
    } else if (status == 'Minor Revision' || status == 'Major Revision') {
      getAbstract.paper_deadline = paper_deadline
      getAbstract.review_status = 'Pending'
      // ✅ Reset review status of all related reviews to "Pending"
      await Reviews.updateMany(
        { abstract: id },
        {
          $set: {
            status: 'accepted'
          }
        }
      )

      // 🔔 Notify all reviewers about revision request
      const reviewers = await Reviews.find({ abstract: id }).populate(
        'reviewer'
      )
      if (reviewers?.length) {
        const notifyTasks = reviewers.map(rev =>
          notifyUser({
            userId: rev.reviewer._id,
            email: rev.reviewer.email,
            message: `The abstract "${getAbstract.paper_title}" has been marked for ${status}. Please be prepared to review the revised paper.`,
            type: 'Revision Requested',
            emailTemplate: () =>
              reviewerRevisionRequestTemplate({
                reviewerName: rev.reviewer.name,
                abstractTitle: getAbstract.paper_title,
                conferenceName: getAbstract.conference.name,
                revisionType: status,
                deadline: paper_deadline
                  ? dayjs(paper_deadline).format('DD MMM YYYY')
                  : null
              })
          })
        )
        setImmediate(() => Promise.all(notifyTasks))
      }
    }
    await getAbstract.save()

    notifyUser({
      userId: getAbstract.createdBy._id,
      email: getAbstract.createdBy.email,
      message: `Your abstract "${getAbstract.paper_title}" status has been updated to: ${status}.`,
      type: 'Abstract Status Change',
      emailTemplate: () => {
        return message
      }
    })

    res.status(200).json({
      status: 'Success',
      message: 'Successfully updated the status of the',
      data: getAbstract
    })
  } catch (error) {
    next(error)
  }
}

export const changeAbstractStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const getAbstract = await Abstracts.findOne({ _id: id }).populate([
      { path: 'conference' },
      { path: 'createdBy' }
    ])

    if (!getAbstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    getAbstract.status = status

    // Set payment deadline if accepted
    let paymentDeadline = null
    if (status == 'Abstract Accepted') {
      paymentDeadline = dayjs().add(3, 'day').toDate() // 3 days from now
      getAbstract.payment_deadline = paymentDeadline
    }

    await getAbstract.save()

    // Notify the user asynchronously
    notifyUser({
      userId: getAbstract.createdBy._id,
      email: getAbstract.createdBy.email,
      message: `Your abstract "${getAbstract.paper_title}" status has been updated to: ${status}.`,
      type: 'Update on Your Abstract Submission Status',
      emailTemplate: () =>
        abstractStatusChangeTemplate({
          authorName: getAbstract.createdBy.name,
          abstractTitle: getAbstract.paper_title,
          conferenceName: getAbstract.conference.name,
          newStatus: status,
          paymentDeadline: paymentDeadline
            ? dayjs(paymentDeadline).format('DD MMM YYYY')
            : null
        })
    })

    res.status(200).json({
      status: 'Success',
      message: 'Successfully updated the status of the',
      data: getAbstract
    })
  } catch (error) {
    next(error)
  }
}

export const getAbstractByCategory = async (req, res, next) => {
  try {
    const { conference_id, presentation_method } = req.query
    const match = {
      presentation_method
    }
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
    ) {
      match.conference = conference_id
    }

    const getAbstract = await Abstracts.find(match)
      .populate('conference')
      .populate('createdBy')
      .lean() // Returns plain JS objects

    if (!getAbstract || getAbstract.length === 0) {
      const error = new Error('No abstracts found for this category')
      error.statusCode = 404
      return next(error)
    }

    const abstractsWithPapers = await Promise.all(
      getAbstract.map(async abstract => {
        const papers = await Paper.findOne({ abstract: abstract._id }).lean()
        return {
          ...abstract,
          papers // Will be empty array if none found
        }
      })
    )

    return res.status(200).json({
      status: 'Success',
      message: 'Fetched the abstract by category successfully',
      data: abstractsWithPapers
    })
  } catch (error) {
    next(error)
  }
}

export const updateAbstract = async (req, res, next) => {
  try {
    const { id } = req.params
    const { paper_title, abstract, authors, payment_deadline, paper_deadline } =
      req.body

    const getAbstract = await Abstracts.findOne({ _id: id })

    if (!getAbstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    const updatedSubmission = await Abstracts.findByIdAndUpdate(
      id,
      { paper_title, abstract, authors, payment_deadline, paper_deadline },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      message: 'Submission updated successfully',
      data: updatedSubmission
    })
  } catch (error) {
    next(error)
  }
}

export const getUnscheduledAbstracts = async (req, res) => {
  try {
    const { conference_id, presentation_method } = req.query
    const match = { presentation_method }
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
    ) {
      match.conference = conference_id
    }
    // Find all abstract IDs that are already scheduled
    const scheduledAbstracts = await Schedule.distinct('abstracts')

    // Find abstracts whose _id is NOT in scheduledAbstracts
    const unscheduledAbstracts = await Abstracts.find({
      _id: { $nin: scheduledAbstracts },
      ...match
    })

    return res.status(200).json({
      status: 'Success',
      message: 'Successfully get the unscheduled abstract',
      data: unscheduledAbstracts
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const makePayment = async (req, res, next) => {
  try {
    const { abstractId } = req.params

    const file = req.file
    let fileUrl = null

    const isAbstract = await Abstracts.findOne({
      _id: abstractId
    }).populate('conference', 'name')

    if (!isAbstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    // Check if payment deadline exists and is still valid
    if (
      isAbstract.payment_deadline &&
      dayjs().isAfter(dayjs(isAbstract.payment_deadline))
    ) {
      const error = new Error(
        'Payment deadline has passed. You can no longer make the payment.'
      )
      error.statusCode = 400
      return next(error)
    }

    if (file) {
      fileUrl = await s3PaymentReceiptUploadService(
        req.file,
        req.file.safeFilename
      )
    }

    isAbstract.payment_proof = fileUrl
    isAbstract.payment_status = 'Pending'

    await isAbstract.save()

    const adminMessage = `Payment submitted for abstract "${isAbstract.paper_title}" by ${req.user.name}`
    const adminType = 'payment_submitted'

    notifyAdmins({
      message: adminMessage,
      type: adminType,
      emailTemplate: admin =>
        adminPaymentNotificationTemplate({
          adminName: admin.name,
          userName: req.user.name,
          abstractTitle: isAbstract.paper_title,
          conferenceName: isAbstract.conference?.name || 'N/A'
        })
    })

    res.status(200).json({
      status: 'Success',
      message: 'Payment made successfully',
      data: isAbstract
    })
  } catch (error) {
    if (req.file) {
      await s3PaymentReceiptUploadService(`/payment/${req.file.originalname}`)
    }
    next(error)
  }
}

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { abstractId } = req.params
    const { payment_status } = req.body
    const isAbstract = await Abstracts.findOne({
      _id: abstractId
    })
      .populate('createdBy', 'name email')
      .populate('conference', 'name')

    if (!isAbstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    // If payment is Paid, set paper_deadline 5 days from now
    let paperDeadline = null
    if (payment_status.toLowerCase() === 'paid') {
      paperDeadline = dayjs().add(5, 'day').toDate()
      isAbstract.paper_deadline = paperDeadline
    }

    // Update payment status
    isAbstract.payment_status = payment_status

    await isAbstract.save()

    // ✅ Notify the user asynchronously
    const userMessage = `Payment status for your abstract "${isAbstract.paper_title}" has been updated to: ${payment_status}.`

    notifyUser({
      userId: isAbstract.createdBy._id,
      email: isAbstract.createdBy.email,
      message: userMessage,
      type: 'Payment Status Change',
      emailTemplate: () =>
        paymentStatusChangeTemplate({
          authorName: isAbstract.createdBy.name,
          abstractTitle: isAbstract.paper_title,
          conferenceName: isAbstract.conference?.name || 'N/A',
          paymentStatus: payment_status,
          paperDeadline: isAbstract.paper_deadline
            ? dayjs(isAbstract.paper_deadline).format('DD MMM YYYY')
            : null
        })
    })

    res.status(200).json({
      status: 'Success',
      message: 'Payment status updated successfully',
      data: isAbstract
    })
  } catch (error) {
    next(error)
  }
}

export const sendPaymentReminder = async (req, res, next) => {
  try {
    const { abstractId } = req.params

    // 1. Find abstract by ID and populate createdBy (to get user email)
    const abstract = await Abstracts.findById(abstractId).populate(
      'createdBy conference'
    )

    if (!abstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    // 2. Check payment status
    if (abstract.payment_status !== 'Unpaid') {
      const error = new Error('Already Payment done')
      error.statusCode = 400
      return next(error)
    }

    // 3. Prepare formatted payment deadline
    const paymentDeadline = abstract.payment_deadline
      ? dayjs(abstract.payment_deadline).format('DD MMM YYYY')
      : null

    notifyUser({
      userId: abstract.createdBy._id,
      email: abstract.createdBy.email,
      message: `Reminder: Your payment for the abstract "${abstract.paper_title}" is still pending.`,
      type: 'Payment Reminder',
      emailTemplate: () =>
        paymentReminderEmailTemplate({
          authorName: abstract.createdBy.name,
          abstractTitle: abstract.paper_title,
          conferenceName: abstract.conference.name,
          paymentDeadline
        })
    })

    return res
      .status(200)
      .json({ message: 'Payment reminder email sent successfully.' })
  } catch (error) {
    console.error('Error sending payment reminder:', error)
    next(error)
  }
}

export const sendPaperSubmitReminder = async (req, res, next) => {
  try {
    const { abstractId } = req.params
    // 1) Fetch abstract with author + conference populated
    const abstract = await Abstracts.findById(abstractId).populate(
      'createdBy conference'
    )
    if (!abstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    // 2. Check payment status
    if (abstract.status !== 'Abstract Submitted') {
      const error = new Error('Something went wrong')
      error.statusCode = 400
      return next(error)
    }

    notifyUser({
      userId: abstract.createdBy._id,
      email: abstract.createdBy.email,
      message: `Reminder: Your paper for "${abstract.paper_title}" has not been submitted yet. Please submit it through the portal.`,
      type: 'Paper Submit Reminder',
      emailTemplate: () =>
        paperSubmitReminderEmailTemplate({
          authorName: abstract.createdBy.name,
          abstractTitle: abstract.paper_title,
          conferenceName: abstract.conference.name
        })
    })

    return res
      .status(200)
      .json({ message: 'Payment reminder email sent successfully.' })
  } catch (error) {
    next(error)
  }
}
