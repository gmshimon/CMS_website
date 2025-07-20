import express from 'express'
import {
  assignReviewer,
  getAbstractsByCategory,
  getMyReviewStats,
  getReviewDashboardsStats,
  sendReminderToReviewer
} from './review.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'

const router = express.Router()

// TODO: add JWT validation in all api endpoints

router.post('/assign-reviewer', assignReviewer)
router.get('/review-stats', getReviewDashboardsStats)
router.get('/abstract', getAbstractsByCategory)
router.post('/send-reminder', sendReminderToReviewer)
router.get('/my-review',verifyToken ,getMyReviewStats)
export default router
