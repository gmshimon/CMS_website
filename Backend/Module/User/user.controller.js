import generateToken from '../../Utilis/token.js'
import Abstracts from '../Abstract/abstract.model.js'
import Paper from '../Paper/paper.model.js'
import Schedule from '../Schedule/schedule.model.js'
import Users from './user.model.js'
import { deleteImageFromS3, s3UserUpload } from './user.s3Uploader.js'

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body
    const { email } = userData

    const user = await Users.findOne({ email: email })
    if (user) {
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      const token = generateToken(data)
      return res.status(200).json({
        status: 'Success',
        message: 'User already exists',
        data: user,
        token: token
      })
    } else {
      const file = req.file
      if (file) {
        const image = await s3UserUpload(file)

        userData.photo = image
      }

      const createUser = await Users.create(userData)
      const token = generateToken(result)
      res.status(200).json({
        status: 'Success',
        message: 'User created successfully',
        data: createUser,
        token: token
      })
    }
  } catch (error) {
    if (req.file) {
      await deleteImageFromS3(`users/${req.file.originalname}`)
    }
    res.status(200).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const fetchUser = async (req, res, next) => {
  try {
    const data = req.body
    const user = await Users.findOne({ email: data.email }).lean()
    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found'
      })
    }

    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: user
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to fetch users',
      error: error.message
    })
  }
}

export const updateUserProfile = async (req, res, next) => {
  try {
    const { email } = req.user // assuming you have auth middleware setting req.user
    const user = await Users.findOne({ email })

    if (!user) {
      const error = new Error('User not found')
      error.statusCode = 404
      return next(error)
    }

    // Update user fields from req.body
    const {
      name,
      contact,
      address,
      country,
      state,
      city,
      zip_code,
      affiliation,
      faculty,
      position,
      domain
    } = req.body

    user.name = name || user.name
    user.contact = contact || user.contact
    user.address = address || user.address
    user.country = country || user.country
    user.state = state || user.state
    user.city = city || user.city
    user.zip_code = zip_code || user.zip_code
    user.affiliation = affiliation || user.affiliation
    user.faculty = faculty || user.faculty
    user.position = position || user.position
    user.domain = domain || user.domain

    const updatedUser = await user.save()
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    })
  } catch (error) {
    next(error)
  }
}

export const updateImage = async (req, res, next) => {
  try {
    const { email } = req.user // assuming you have auth middleware setting req.user
    const user = await Users.findOne({ email })
    if (!user) {
      const error = new Error('User not found')
      error.statusCode = 404
      return next(error)
    }
    const file = req.file
    const image = await s3UserUpload(file)

    if (user?.photo) {
      const oldImageKey = user.photo.split('.com/')[1] // Extract key from URL
      await deleteImageFromS3(oldImageKey)
    }

    const result = await Users.updateOne(
      { email },
      {
        $set: {
          photo: image
        }
      }
    )

    res.status(200).json({
      status: 'success',
      message: 'Successfully registered',
      data: image
    })
  } catch (error) {
    if (req.file) {
      await deleteImageFromS3(`users/${req.file.originalname}`)
    }
    next(error)
  }
}

export const getChairsAndModerators = async (req, res) => {
  try {
    // Find users where role is either "Session Chair" or "Moderator"
    const sessionChairs = await Users.find({ role: 'Session Chair' })
    const moderators = await Users.find({ role: 'Moderator' })

    res.status(200).json({
      status: 'Success',
      message: 'Successfully fetched the session chair and moderator',
      data: {
        sessionChairs: sessionChairs || [],
        moderators: moderators || []
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getMyDashboardStats = async (req, res,next) => {
  try {
    const { conference_id } = req.query
    const userId = req.user._id

    // 1. Find all abstracts created by this user
    const match = {
      createdBy: userId
    }
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
    ) {
      match.conference = conference_id
    }
    // 2. Counts
    const totalAbstracts = await Abstracts.countDocuments(match)
    const totalPapers = await Paper.countDocuments(match)
    const totalPayments = await Abstracts.countDocuments({
      ...match,
      payment_proof: { $exists: true, $ne: null }
    })

    // Total schedules → find abstracts created by this user that are scheduled
    const scheduledAbstracts = await Abstracts.find({
      ...match,
      scheduled: true
    }).select('_id')

    const totalSchedules = await Schedule.countDocuments({
      abstracts: { $in: scheduledAbstracts.map(a => a._id) }
    })

    // 3. Recent submissions (latest 5)
    const recentSubmissions = await Abstracts.find(match)
      .sort({ createdAt: -1 })
      .limit(2)
      .populate('conference', 'name') // optional: populate conference name
      .lean()

    // 4. Certificate history
    // const certificateHistory = await Certificate.find({ user: userId })
    //   .sort({ createdAt: -1 })
    //   .lean()

    res.status(200).json({
      success: true,
      data: {
        totalAbstracts,
        totalPapers,
        totalPayments,
        totalSchedules,
        recentSubmissions,
        certificateHistory:[]
      },
    })
  } catch (error) {
    next(error)
  }
}
