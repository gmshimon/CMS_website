import express from 'express'
import {
  assignReviewer,
  getAbstractsByCategory,
  getReviewDashboardsStats,
  sendReminderToReviewer
} from './review.controller.js'

const router = express.Router()

// TODO: add JWT validation in all api endpoints

router.post('/assign-reviewer', assignReviewer)
router.get('/review-stats', getReviewDashboardsStats)
router.get('/abstract', getAbstractsByCategory)
router.post('/send-reminder', sendReminderToReviewer)
export default router
