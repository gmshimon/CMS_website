import Users from '../User/user.model.js'
import admin from 'firebase-admin'
import { readFile } from 'fs/promises'
import { deleteImageFromS3, s3UserUpload } from '../User/user.s3Uploader.js'
import {
  accountCreatedTemplateLogin,
  accountCreateTemplate
} from '../../Utilis/EmailTemplate/createUserTemplate.js'
import { sendEmail } from '../../Utilis/sendEmail.js'
import Abstracts from '../Abstract/abstract.model.js'

const serviceAccount = JSON.parse(
  await readFile(
    new URL(
      '../../cms-website-efbff-firebase-adminsdk-fbsvc-ea47fb1749.json',
      import.meta.url
    )
  )
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export const getUserRoleCounts = async (req, res, next) => {
  try {
    const { year } = req.query
    const roles = [
      'Presenter',
      'Attendee',
      'Reviewer',
      'Session Chair',
      'Moderator',
      'Keynote Speaker',
      'scientific_committee',
      'technical_committee',
      'registration_committee'
    ]

    const matchQuery = {
      role: { $in: roles }
    }

    // Filter by year of createdAt if provided
    if (year) {
      matchQuery.$expr = {
        $eq: [{ $year: '$createdAt' }, parseInt(year)]
      }
    }

    const counts = await Users.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ])

    const roleCounts = roles.reduce((acc, role) => {
      const found = counts.find(c => c._id === role)
      acc[role] = found ? found.count : 0
      return acc
    }, {})

    res.status(200).json({
      status: 'Success',
      data: roleCounts
    })
  } catch (error) {
    next(error)
  }
}

export const AdminCreateUser = async (req, res, next) => {
  try {
    const data = req.body
    if (data.role === 'Presenter' || data.role === 'Attendee') {
      return res.status(405).json({
        status: 'Failed',
        message: 'Not allowed to create user with role Presenter and attendee'
      })
    }
    // ✅ Check if user already exists
    const existingUser = await Users.findOne({ email: data.email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' })
    }
    let password = null
    let html = null
    // generate password and save user in the firebase if the user role is reviewer and keynote Speaker
    if (
      data.role === 'Reviewer' ||
      data.role === 'Session Chair' ||
      data.role === 'registration_committee'
    ) {
      // ✅ generate a random password
      password = (Math.random() * 10000 + 100000).toFixed(0)

      // ✅ create the user in Firebase
      const userRecord = await admin.auth().createUser({
        email: data.email,
        password: password,
        displayName: data.name,
        disabled: false,
        emailVerified: false // Set true if email is already verified
      })

      // ✅ get the styled html
      html = accountCreatedTemplateLogin({
        name: data.name,
        email: data.email,
        ...(password && { password }),
        role: data.role
      })
    } else {
      html = accountCreateTemplate({
        name: data.name,
        email: data.email,
        role: data.role,
        ...(data?.committeeType && {
          committeeType: data.committeeType
        })
      })
    }

    // ✅ Upload image to S3 if available
    if (req.file) {
      const s3Result = await s3UserUpload(req.file)
      data.photo = s3Result
    }

    // ✅ save the other details of user in the mongodb
    const createUser = await Users.create(data)

    // ✅ Send styled email
    await sendEmail({
      to: data.email,
      subject: 'Your account has been  registered',
      html: html
    })

    return res.status(201).json({
      message: 'User created successfully',
      data: createUser
    })
  } catch (error) {
    // Cleanup image from S3 if something failed after upload
    if (req.file?.key) {
      await deleteImageFromS3(req.file.key)
    }

    console.error('AdminCreateUser error:', error)
    next(error)
  }
}

export const getRoleBasedUser = async (req, res, next) => {
  try {
    const { year } = req.query
    const { role } = req.params
    const matchQuery = {
      role: role
    }

    // Add year filter if provided
    if (year) {
      matchQuery.$expr = {
        $eq: [{ $year: '$createdAt' }, parseInt(year)]
      }
    }
    const users = await Users.find(matchQuery)

    res.status(200).json({
      status: 'Success',
      message: 'Fetch the reviewer user',
      data: users
    })
  } catch (error) {
    console.error('Error fetching reviewers:', error)
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    // First delete user from your MongoDB
    const deletedUser = await Users.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (
      deletedUser.role === 'Reviewer' ||
      deletedUser.role === 'Session Chair' ||
      deletedUser.role === 'registration_committee'
    ) {
      // Step 1: Find Firebase UID by email
      const firebaseUser = await admin.auth().getUserByEmail(deletedUser.email)

      // Step 2: Delete user from Firebase Auth
      if (firebaseUser?.uid) {
        await admin.auth().deleteUser(firebaseUser.uid)
      }
    }

    // Step 3: Delete user image from the bucket
    if (deletedUser) {
      deleteImageFromS3(deletedUser.photo.split('.com/')[1])
    }

    res.status(200).json({
      status: 'Success',
      message: 'User deleted successfully',
      data: {
        id: deletedUser._id,
        role: deletedUser.role
      }
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const data = req.body

    const updatedUser = await Users.findByIdAndUpdate(
      data._id,
      { $set: data },
      { new: true } // This returns the updated document
    )

    if (!updatedUser) {
      const error = new Error('User not found')
      error.statusCode = 404
      return next(error)
    }

    res.status(200).json({
      status: 'Success',
      message: 'Successfully updated the user',
      data: updatedUser // optional, only if you want to return it
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUserImage = async (req, res, next) => {
  try {
    const { id } = req.params

    // 1. Check if user is present
    const isUser = await Users.findOne({ _id: id })

    if (!isUser) {
      const error = new Error('User not found')
      error.statusCode = 404
      return next(error)
    }

    // 2. If user has photo it will be deleted from amazon s3
    if (isUser.photo) {
      deleteImageFromS3(isUser.photo.split('.com/')[1])
    }

    // 3. update the user photo in db
    const user = await Users.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          photo: null
        }
      }
    )

    res.status(200).json({
      status: 'Success',
      message: 'Successfully deleted user Image',
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export const updateUserImage = async (req, res, next) => {
  try {
    const { id } = req.params

    // 1. Check if user is present
    const isUser = await Users.findOne({ _id: id }).lean()

    if (!isUser) {
      const error = new Error('User not found')
      error.statusCode = 404
      return next(error)
    }

    if (!isUser.role === 'Keynote Speaker') {
      const error = new Error('Not allowed to change image')
      error.statusCode = 403
      return next(error)
    }

    //  Upload image to S3 if available
    let image
    if (req.file) {
      const s3Result = await s3UserUpload(req.file)
      image = s3Result
    }

    // update the user
    const updateUser = await Users.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          photo: image
        }
      },
      { new: true }
    )

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated user image',
      data: updateUser
    })
  } catch (error) {
    // Cleanup image from S3 if something failed after upload
    if (req.file?.key) {
      await deleteImageFromS3(req.file.key)
    }
    next(error)
  }
}

export const getPresentationMethodStats = async (req, res) => {
  try {
    const { year } = req.query
    const matchQuery = {}
    if (year) {
      matchQuery.$expr = {
        $eq: [{ $year: '$createdAt' }, parseInt(year)]
      }
    }
    const stats = await Abstracts.aggregate([
      {
        $group: {
          _id: '$presentation_method',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          method: '$_id',
          count: 1
        }
      }
    ])

    // Optional: Ensure all types are returned (even if count is 0)
    const methods = [
      'Paper Presentation Online',
      'Paper Presentation Physical',
      'Poster Presentation Online',
      'Poster Presentation Physical'
    ]

    const completeStats = methods.map(method => {
      const found = stats.find(s => s.method === method)
      return {
        method,
        count: found ? found.count : 0
      }
    })

    res.status(200).json({ success: true, data: completeStats })
  } catch (error) {
    console.error('Error fetching presentation stats:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
