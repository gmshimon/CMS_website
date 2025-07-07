import Users from '../User/user.model.js'
import admin from 'firebase-admin'
import { readFile } from 'fs/promises'
import { deleteImageFromS3, s3UserUpload } from '../User/user.s3Uploader.js'
import {
  accountCreatedTemplate,
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

export const AdminCreateUser = async (req, res) => {
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
    if (data.role === 'Reviewer' || data.role === 'Keynote Speaker') {
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
        name: createUser.name,
        email: createUser.email,
        ...(password && { password }),
        role: createUser.role,
        ...(createUser.committeeType && {
          committeeType: createUser.committeeType
        })
      })
    } else {
      html = accountCreateTemplate({
        name: createUser.name,
        email: createUser.email,
        role: createUser.role,
        ...(createUser.committeeType && {
          committeeType: createUser.committeeType
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
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' })
  }
}
