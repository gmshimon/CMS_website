import express from 'express'
import userImageUploader from '../../Middleware/FileUpload/userImage.js'
import {
  createUser,
  fetchUser,
  getChairsAndModerators,
  getMyDashboardStats,
  updateImage,
  updateUserProfile
} from './user.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'
import {
  standardLimiter,
  strictLimiter ,
  mediumLimiter 
} from '../../config/rateLimiters.js'
import verifyAdminToken from '../../Middleware/verifyAdminToken.js'

const router = express.Router()

// Create user (signup-style) → sensitive
router
  .route('/')
  .post(strictLimiter , userImageUploader.single('image'), createUser)

// Fetch user → general API
router.route('/get-user').post(standardLimiter, fetchUser)

// Update profile → general API
router.route('/update-profile').put(standardLimiter, verifyToken, updateUserProfile)

// Update image (file upload) → heavy, tighter limiter
router
  .route('/update-image')
  .put(
    mediumLimiter ,
    verifyToken,
    userImageUploader.single('image'),
    updateImage
  )

// Get chairs & moderators → general API
router
  .route('/chairs-moderators')
  .get(standardLimiter, verifyAdminToken, getChairsAndModerators)

// My stats → general API
router.route('/my-stats').get(standardLimiter, verifyAdminToken, getMyDashboardStats)
export default router
