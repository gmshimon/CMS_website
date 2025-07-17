import express from 'express'
import { assignReviewer, getAbstractsByCategory, getReviewDashboardsStats } from './review.controller.js'

const router = express.Router()

// TODO: add JWT validation in all api endpoints

router.post('/assign-reviewer',assignReviewer)
router.get('/review-stats', getReviewDashboardsStats)
router.get('/abstract',getAbstractsByCategory)
export default router
