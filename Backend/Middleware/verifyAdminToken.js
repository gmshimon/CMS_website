import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { ENV } from '../config/env.js'

const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        status: 'Failed',
        message: 'You must be logged in'
      })
    }

    const decoded = await promisify(jwt.verify)(token, ENV.TOKEN_SECRET)

    if (decoded.role !== 'Admin') {
         const error = new Error('You are not Admin')
      error.statusCode = 403
      return next(error)
      
    }

    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({
      status: 'Failed',
      message: 'Invalid token',
      error: error.message
    })
  }
}

export default verifyAdminToken
