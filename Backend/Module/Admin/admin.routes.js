import express from 'express'
import userImageUploader from '../../Middleware/FileUpload/userImage.js'

import verifyToken from '../../Middleware/verifyToken.js'
import {
  AdminCreateUser,
  adminDashboardStats,
  deleteUser,
  deleteUserImage,
  getAdminAnalytics,
  getPresentationMethodStats,
  getRoleBasedUser,
  getUserRoleCounts,
  updateUser,
  updateUserImage
} from './admin.controller.js'
import verifyAdminToken from '../../Middleware/verifyAdminToken.js'
import {
  lightLimiter,
  mediumLimiter,
  standardLimiter,
  strictLimiter
} from '../../config/rateLimiters.js'
const router = express.Router()

// 🔹 Delete a user → destructive operation → medium limiter
router.delete('/delete/user/:id', mediumLimiter, verifyAdminToken, deleteUser)

// 🔹 Update user → destructive, admin-only → per-IP limiter first
router.put('/update/user', mediumLimiter, verifyAdminToken, updateUser)

// 🔹 Delete user image → per-user action → verifyToken first
router.delete(
  '/delete/user-image/:id',
  verifyToken,
  standardLimiter,
  deleteUserImage
)

// 🔹 Update user image → file upload (S3), per-user → verifyToken first
router.put(
  '/update/user-image/:id',
  verifyToken,
  mediumLimiter,
  userImageUploader.single('image'),
  updateUserImage
)

// 🔹 Get role-based counts → admin-only, read query → per-IP limiter first
router.get('/total-user', standardLimiter, verifyAdminToken, getUserRoleCounts)

// 🔹 Create new user → very sensitive, admin-only → per-IP limiter first
router.post(
  '/create-user',
  strictLimiter,
  verifyAdminToken,
  userImageUploader.single('image'),
  AdminCreateUser
)

// 🔹 Get users by role → admin-only, aggregation query → per-IP limiter first
router.get('/get/:role', verifyAdminToken, standardLimiter, getRoleBasedUser)

// 🔹 Admin dashboard stats → sensitive but not destructive → standard limiter
router.get('/dashboard',standardLimiter, verifyAdminToken, adminDashboardStats)

// 🔹 Presentation method stats → admin-only, light query → per-IP limiter first
router.get(
  '/presentation-stats',
  standardLimiter,
  verifyToken,
  getPresentationMethodStats
)

// 🔹 Admin analytics → heaviest query (multiple aggregations) → medium limiter
router.get('/', mediumLimiter,verifyAdminToken, getAdminAnalytics)

export default router
