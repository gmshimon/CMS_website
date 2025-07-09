import Users from '../User/user.model.js'
import admin from 'firebase-admin'
import { readFile } from 'fs/promises'
import { deleteImageFromS3, s3UserUpload } from '../User/user.s3Uploader.js'
import {
  accountCreatedTemplateLogin,
  accountCreateTemplate
} from '../../Utilis/EmailTemplate/createUserTemplate.js'
import { sendEmail } from '../../Utilis/sendEmail.js'

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
      data.role === 'Keynote Speaker' ||
      data.role === 'Session Chair'
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
      deletedUser.role === 'Session Chair'
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
