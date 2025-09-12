import dayjs from 'dayjs'
import {
  getCache,
  invalidateUserCache,
  setCache
} from '../../Utilis/Cache/cacheHelper.js'
import Conference from '../Conference/conference.model.js'
import conference_reg from './conference_reg.model.js'
import { notifyUser } from '../User/user.service.js'
import {
  adminConferenceRegTemplate,
  adminPaymentUploadedTemplate,
  attendeeConferenceRegTemplate
} from '../../Utilis/EmailTemplate/conferenceRegTemplate.js'
import { notifyAdmins } from '../Admin/admin.service.js'
import { s3PaymentReceiptUploadService } from '../Abstract/abstract.s3Service.js'

export const getConferenceReg = async (req, res, next) => {
  try {
    const { conference_id } = req.params

    const { _id: userId, role } = req.user
    const { page = 1, limit = 10, search } = req.query

    // 1. Find all conference registration created by this user
    let match = {}
    if (role === 'Presenter' || role === 'Attendee') {
      match.createdBy = userId
    } else if (role === 'Admin' || role === 'registration_committee') {
      // admins & registration committee can see all
      match = {}
    } else {
      return res.status(403).json({
        status: 'Fail',
        message: 'You are not authorized to view conference registrations'
      })
    }

    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
    ) {
      match.conference = conference_id
    }

// ✅ Add search by registration_id
    if (search) {
      match.registration_id = { $regex: search, $options: 'i' }
    }

    // ✅ Convert page & limit to numbers
    const pageNum = parseInt(page) || 1
    const limitNum = parseInt(limit) || 10
    const skip = (pageNum - 1) * limitNum

    // ✅ Get total count for pagination
    const total = await conference_reg.countDocuments(match)

    // ✅ Query DB with pagination
    const results = await conference_reg
      .find(match)
      .populate([
        { path: 'conference' },
        {
          path: 'abstract',
          select: 'paper_title theme abstract_id presentation_method presenter'
        }
      ])
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })

    res.status(200).json({
      status: 'Success',
      message: 'Fetched the conference registration successfully',
      data: {
        results,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getSingleConferenceReg = async (req, res, next) => {
  try {
    const { id } = req.params

    const cacheKey = `confReg:single:${id}`

    const cached = await getCache(cacheKey)
    if (cached) {
      return res.status(200).json({
        status: 'Success',
        message: 'Fetched from cache',
        data: cached
      })
    }

    const response = await conference_reg
      .findOne({
        _id: id
      })
      .populate([
        {
          path: 'conference'
        },
        {
          path: 'abstract'
        }
      ])

    await setCache(cacheKey, response)

    res.status(200).json({
      status: 'Success',
      message: 'Fetched successfully',
      data: response
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getAttendeeDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id

    const cacheKey = `confReg:dashboard:${userId}`
    const cached = await getCache(cacheKey)
    if (cached) {
      console.log('Returning data: ', cached)
      return res.status(200).json({
        status: 'Success',
        message: 'Fetched from cache',
        data: cached
      })
    }

    // ✅ All registrations by this user
    const registrations = await conference_reg
      .find({ createdBy: userId })
      .populate(
        'conference',
        'name city country startingDate closingDate status'
      )
      .lean()
    // Total registrations
    const myRegistrations = registrations.length

    // Upcoming = conference start date in the future + still active
    const now = new Date()
    const upcomingConferences = registrations
      .filter(reg => {
        const conf = reg.conference
        return (
          conf && conf.status === 'Active' && new Date(conf.startingDate) > now
        )
      })
      .map(reg => ({
        id: reg.conference._id,
        name: reg.conference.name,
        city: reg.conference.city,
        country: reg.conference.country,
        startingDate: reg.conference.startingDate
      }))

    // Total Paid = sum of all totalPrice
    const totalPaid = registrations.reduce(
      (sum, reg) =>
        reg?.payment_status === 'Paid' ? sum + (reg.totalPrice || 0) : sum,
      0
    )
    const stats = {
      myRegistrations,
      upcomingCount: upcomingConferences.length,
      totalPaid,
      upcomingConferences
    }
    await setCache(cacheKey, stats)

    res.status(200).json({
      status: 'Success',
      message: 'Fetched attendee dashboard stats successfully',
      data: stats
    })
  } catch (error) {}
}

export const createConferenceReg = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { conference, presenterName, ...rest } = req.body

    // 1️⃣ Check if conference exists
    const isConference = await Conference.findById(conference)

    if (!isConference) {
      const error = new Error('Conference not found')
      error.statusCode = 404
      return next(error)
    }

    // 2️⃣ Check if user already registered
    const existingReg = await conference_reg.findOne({
      createdBy: userId,
      conference: conference
    })

    if (existingReg) {
      const error = new Error('You have already registered for this conference')
      error.statusCode = 400
      return next(error)
    }

    // 3️⃣ Create new registration
    const newReg = await conference_reg.create({
      conference,
      presenterName,
      createdBy: userId,
      ...rest
    })
    await invalidateUserCache(userId)
    const paymentDeadline = dayjs().add(7, 'day').format('DD MMM YYYY')

    // ✅ Notify Attendee
    notifyUser({
      userId: userId,
      email: req.user.email,
      message: `You have successfully registered for ${isConference.name}.`,
      type: 'Conference Registration',
      emailTemplate: () =>
        attendeeConferenceRegTemplate({
          attendeeName: req.user.name,
          conferenceName: isConference.name,
          id: newReg.registration_id,
          paymentDeadline
        })
    })

    // ✅ Notify Admins
    notifyAdmins({
      message: `${req.user.name} has registered as an attendee for ${isConference.name}`,
      type: 'New Conference Registration',
      emailTemplate: admin =>
        adminConferenceRegTemplate({
          adminName: admin.name,
          attendeeName: req.user.name,
          conferenceName: isConference.name,
          id: newReg.registration_id
        })
    })

    return res.status(201).json({
      status: 'Success',
      message: 'Conference registration created successfully',
      data: newReg
    })
  } catch (error) {
    next(error)
  }
}

export const uploadPaymentReceipt = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user._id
    const userRole = req.user.role
    const userName = req.user.name

    // 1. Ensure only Attendees can upload
    if (userRole !== 'Attendee') {
      return res.status(403).json({
        status: 'Fail',
        message: 'Only Attendees are allowed to upload payment receipts'
      })
    }

    // 2. Find the registration owned by this user
    const registration = await conference_reg.findOne({
      _id: id,
      createdBy: userId
    })

    if (!registration) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Conference registration not found'
      })
    }

    // 3. Validate file presence
    if (!req.file) {
      return res.status(400).json({
        status: 'Fail',
        message: 'No file uploaded'
      })
    }

    // 4. Upload to S3
    const fileUrl = await s3PaymentReceiptUploadService(
      req.file,
      req.file.safeFilename // 👈 comes from multer's file.safefilename
    )

    // 5. Update registration
    registration.payment_proof = fileUrl
    registration.payment_status = 'Pending'
    await registration.save()

    // 6. Notify admins
    notifyAdmins({
      message: `Payment receipt uploaded by ${userName} for conference "${registration.conference.name}".`,
      type: 'payment_uploaded',
      emailTemplate: admin =>
        adminPaymentUploadedTemplate({
          adminName: admin.name,
          attendeeName: userName,
          registrationId: updatedReg.registration_id,
          conferenceName: registration.conference.name
        })
    })

    res.status(200).json({
      status: 'Success',
      message: 'Payment receipt uploaded successfully',
      data: registration
    })
  } catch (error) {
    console.error('❌ Upload payment receipt error:', error)
    next(error)
  }
}
