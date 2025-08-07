import {
  abstractCreatedTemplate,
  abstractStatusChangeTemplate,
  paymentStatusChangeTemplate
} from '../../Utilis/EmailTemplate/abstractCreatedTemplate.js'
import { sendEmail } from '../../Utilis/sendEmail.js'
import conference_reg from '../Conference_reg/conference_reg.model.js'
import { createNotificationService } from '../Notification/notification.service.js'
import Paper from '../Paper/paper.model.js'
import Abstracts from './abstract.model.js'
import {
  s3AbstractGraphicalAbstract,
  s3AbstractPresentationProfilePicture,
  s3PaymentReceiptUploadService
} from './abstract.s3Service.js'

export const createAbstract = async (req, res, next) => {
  try {
    const { conference_registration, ...data } = req.body
    const { _id, email, name } = req.user

    conference_registration.createdBy = _id
    // ✅ create the conference registration data
    const createConference = await conference_reg.create(
      conference_registration
    )

    const abstractFile = req.files?.image?.[0]
    const profileImage = req.files?.file?.[0]

    let graphical = null
    let image = null

    if (abstractFile) {
      graphical = await s3AbstractGraphicalAbstract(abstractFile)
    }

    if (profileImage) {
      image = await s3AbstractPresentationProfilePicture(profileImage)
    }

    data.graphical_abstract = graphical
    data.presentation_profile_picture = image
    data.conference_reg = createConference._id
    data.createdBy = _id

    // ✅ create the abstract
    const createAbstract = await Abstracts.create(data)
    await conference_reg.updateOne(
      { _id: createConference._id },
      {
        $set: {
          abstract: createAbstract._id
        }
      }
    )

    const message = `Your abstract ${data.paper_title} has been successfully submitted`
    const type = 'abstract_created'

    // get the styled html
    const emailHtml = abstractCreatedTemplate({
      userName: name,
      abstractTitle: data.paper_title || ''
    })

    // ✅ save the notification and send notification to the frontend
    await createNotificationService(_id, message, emailHtml)

    // ✅ Send styled email
    await sendEmail({
      to: email,
      subject: 'Abstract Submission confirmation',
      html: emailHtml
    })
    res.status(200).json({
      status: 'Success',
      message: 'Successfully abstract created',
      data: createAbstract
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message
    })
  }
}

export const getAbstract = async (req, res, next) => {
  try {
    const { payment_status } = req.query
    const { conference_id } = req.params

    const matchQuery = {}
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined &&
      conference_id !== 'All Conferences'
    ) {
      matchQuery.conference = conference_id
    }
    if (payment_status) {
      matchQuery.payment_status = payment_status
    }
    const getAbstract = await Abstracts.find(matchQuery)
      .populate('conference')
      .populate('createdBy')
      .lean() // Returns plain JS objects
    return res.status(200).json({
      status: 'Success',
      message: 'Fetched the abstract by category successfully',
      data: getAbstract
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
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
    await getAbstract.save()

    const emailHtml = abstractStatusChangeTemplate({
      authorName: getAbstract.createdBy.name,
      abstractTitle: getAbstract.paper_title,
      conferenceName: getAbstract.conference.name,
      newStatus: status
    })
    const shortMsg = `Your abstract "${getAbstract.paper_title}" status has been updated to: ${status}.`
    await createNotificationService(
      getAbstract.createdBy._id,
      shortMsg,
      emailHtml
    )
    // Send invitation email to the reviewer
    await sendEmail({
      to: getAbstract.createdBy.email,
      subject: 'Update on Your Abstract Submission Status',
      html: emailHtml
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
        const papers = await Paper.find({ abstract: abstract._id }).lean()
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
    const { paper_title, abstract, authors } = req.body

    const getAbstract = await Abstracts.findOne({ _id: id })
    if (!getAbstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    const updatedSubmission = await Abstracts.findByIdAndUpdate(
      id,
      { paper_title, abstract, authors },
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

export const makePayment = async (req, res, next) => {
  try {
    const { abstractId } = req.params

    const file = req.file
    let fileUrl = null

    const isAbstract = await Abstracts.findOne({
      _id: abstractId
    })

    if (!isAbstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    if (file) {
      fileUrl = await s3PaymentReceiptUploadService(file)
    }

    isAbstract.payment_proof = fileUrl
    isAbstract.payment_status = 'Pending'

    await isAbstract.save()

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
    }).populate('createdBy conference')

    if (!isAbstract) {
      const error = new Error('Abstract not found')
      error.statusCode = 404
      return next(error)
    }

    const htmlEmail = paymentStatusChangeTemplate({
      authorName: isAbstract.createdBy.name,
      abstractTitle: isAbstract.paper_title,
      conferenceName: isAbstract.conference.name,
      paymentStatus: payment_status
    })
    await sendEmail({
      to: isAbstract.createdBy.email,
      subject: 'Payment Status Update',
      html: htmlEmail
    })

    const shortMsg = `Payment status for your abstract "${isAbstract.paper_title}" has been updated to: ${payment_status}.`
    await createNotificationService(
      isAbstract.createdBy._id,
      shortMsg,
      htmlEmail,
      'Payment Status Change'
    )

    isAbstract.payment_status = payment_status

    await isAbstract.save()

    res.status(200).json({
      status: 'Success',
      message: 'Payment status updated successfully',
      data: isAbstract
    })
  } catch (error) {
    next(error)
  }
}
