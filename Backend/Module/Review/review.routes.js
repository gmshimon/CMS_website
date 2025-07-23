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

const router = express.Router()

// TODO: add JWT validation in all api endpoints

router.post('/respond',verifyToken,acceptReviewInvitation)
router.post('/assign-reviewer', assignReviewer)
router.get('/review-stats', getReviewDashboardsStats)
router.get('/abstract', getAbstractsByCategory)
router.post('/send-reminder', sendReminderToReviewer)
router.get('/my-review-stats',verifyToken ,getMyReviewStats)
router.get('/my-review',verifyToken,getMyReview)
router.post('/submit-review',verifyToken,submitReview)
export default router
