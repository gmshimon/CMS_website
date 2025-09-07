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
  strictLimiter,
  mediumLimiter,
  lightLimiter
} from '../../config/rateLimiters.js'
import verifyAdminToken from '../../Middleware/verifyAdminToken.js'

const router = express.Router()

// 🔹 Create user (signup-style) → sensitive
router
  .route('/')
  .post(strictLimiter, userImageUploader.single('image'), createUser)

// 🔹 Fetch user → general API
router.route('/get-user').post(standardLimiter, fetchUser)

// 🔹 Update profile → per-user limiter (token first)
router
  .route('/update-profile')
  .put(verifyToken, standardLimiter, updateUserProfile)

// 🔹 Update image (file upload) → per-user limiter (token first)
router
  .route('/update-image')
  .put(
    verifyToken,
    mediumLimiter,
    userImageUploader.single('image'),
    updateImage
  )

// 🔹 Get chairs & moderators → admin-only
router
  .route('/chairs-moderators')
  .get(standardLimiter, verifyAdminToken, getChairsAndModerators)

// 🔹 My stats → depends on role (user vs admin)
router
  .route('/my-stats')
  .get(verifyAdminToken, lightLimiter, getMyDashboardStats)
export default router
