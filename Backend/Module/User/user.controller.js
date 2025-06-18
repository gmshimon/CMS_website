import mongoose from 'mongoose'
import generateToken from '../../Utilis/token.js'
import Users from './user.model.js'
import { deleteImageFromS3, s3UserUpload } from './user.s3Uploader.js'

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body
    const { name, email, role } = userData

    const user = await Users.findOne({ email: email }).populate('role')
  console.log(user)
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
    const roleIds = user.role // assuming it's an array of ObjectIds

    const roles = await mongoose.connection.db
    .collection('roles')
    .find({_id:roleIds})
    .toArray();
    user.role = roles[0]
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
