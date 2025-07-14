import express from 'express'
import { getReviewDashboardsStats } from './review.controller.js'

const router = express.Router()

router.get('/review-stats', getReviewDashboardsStats)

export default router
