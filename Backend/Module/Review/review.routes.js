import express from 'express'
import {
  acceptReviewInvitation,
  assignReviewer,
  getAbstractsByCategory,
  getMyReview,
  getMyReviewStats,
  getReviewDashboardsStats,
  sendReminderToReviewer,
  submitReview
} from './review.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'
import verifyAdminToken from '../../Middleware/verifyAdminToken.js'
import {
  lightLimiter,
  mediumLimiter,
  standardLimiter,
  strictLimiter
} from '../../config/rateLimiters.js'

const router = express.Router()

// 🔹 Reviewer accepts/declines review invitation → per-user
router.post('/respond', verifyToken, mediumLimiter, acceptReviewInvitation)

// 🔹 Admin assigns reviewers → very sensitive
router.post('/assign-reviewer', strictLimiter, verifyAdminToken, assignReviewer)

// 🔹 Admin review dashboard stats → read-heavy
router.get(
  '/review-stats',
  standardLimiter,
  verifyAdminToken,
  getReviewDashboardsStats
)

// 🔹 Reviewer fetches abstracts → per-user
router.get('/abstract', verifyToken, standardLimiter, getAbstractsByCategory)

// 🔹 Admin sends reminder → spam-prone
router.post(
  '/send-reminder',
  lightLimiter,
  verifyAdminToken,
  sendReminderToReviewer
)

// 🔹 Reviewer gets their review stats → per-user
router.get('/my-review-stats', verifyToken, standardLimiter, getMyReviewStats)

// 🔹 Reviewer fetches their reviews → per-user
router.get('/my-review', verifyToken, standardLimiter, getMyReview)

// 🔹 Reviewer submits a review → per-user, prevent spam
router.post('/submit-review', verifyToken, mediumLimiter, submitReview)
export default router
