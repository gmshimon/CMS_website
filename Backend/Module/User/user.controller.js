import generateToken from '../../Utilis/token.js'
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
