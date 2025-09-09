import express from 'express'
import {
  createConferenceReg,
  getAttendeeDashboardStats,
  getConferenceReg,
  getSingleConferenceReg,
  uploadPaymentReceipt
} from './conference_reg.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'
import { mediumLimiter, standardLimiter } from '../../config/rateLimiters.js'
import paperUploader from '../../Middleware/FileUpload/paperUpload.js'
const router = express.Router()

// Static routes first
router.get(
  '/dashboard',
  verifyToken,
  standardLimiter,
  getAttendeeDashboardStats
)

router.get(
  '/single_conference_reg/:id',
  verifyToken,
  standardLimiter,
  getSingleConferenceReg
)

router.post('/create', verifyToken, createConferenceReg)

// Dynamic route LAST
router.get('/:conference_id', verifyToken, standardLimiter, getConferenceReg)

// Attendee uploads payment receipt
router.post(
  '/upload-payment/:id',
  verifyToken,
  mediumLimiter,
  paperUploader.single('file'),
  uploadPaymentReceipt
)

export default router
