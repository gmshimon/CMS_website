import express from 'express'
import {
  changeAbstractStatus,
  changeReviewStatus,
  createAbstract,
  getAbstract,
  getAbstractByCategory,
  getUnscheduledAbstracts,
  makePayment,
  sendPaperSubmitReminder,
  sendPaymentReminder,
  updateAbstract,
  updatePaymentStatus
} from './abstract.controller.js'
import abstractUploaded from '../../Middleware/FileUpload/abstractUploaded.js'
import verifyToken from '../../Middleware/verifyToken.js'
import paperUploader from '../../Middleware/FileUpload/paperUpload.js'
import verifyAdminToken from '../../Middleware/verifyAdminToken.js'
import {
  lightLimiter,
  mediumLimiter,
  standardLimiter,
} from '../../config/rateLimiters.js'

const router = express.Router()

// 🔹 Admin-only: fetch unscheduled abstracts
router.get(
  '/unscheduled',
  verifyAdminToken,
  standardLimiter,
  getUnscheduledAbstracts
)

// 🔹 Authenticated users: fetch abstracts by category
router.get(
  '/get-abstract-category',
  verifyToken,
  standardLimiter,
  getAbstractByCategory
)

// 🔹 Admin-only: send payment reminder email
router.post(
  '/payment-reminder/:abstractId',
  verifyAdminToken,
  lightLimiter,
  sendPaymentReminder
)

// 🔹 Admin-only: send paper submission reminder email
router.post(
  '/paper-reminder/:abstractId',
  verifyAdminToken,
  lightLimiter,
  sendPaperSubmitReminder
)

// 🔹 Admin-only: fetch abstracts by conference
router.get('/:conference_id', verifyAdminToken, standardLimiter, getAbstract)

// 🔹 user: create a new abstract with file upload
router.post(
  '/create-abstract',
  verifyToken,
  mediumLimiter,
  abstractUploaded.fields([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]),
  createAbstract
)

// 🔹 Admin-only: update an abstract
router.put(
  '/update-abstract/:id',
  verifyAdminToken,
  standardLimiter,
  updateAbstract
)

// 🔹 Admin-only: change abstract status (accept/reject/etc.)
router.post(
  '/change-status/:id',
  verifyAdminToken,
  standardLimiter,
  changeAbstractStatus
)

// 🔹 Admin-only: change review status (session chairs)
router.post(
  '/change-review-status/:id',
  verifyAdminToken,
  standardLimiter,
  changeReviewStatus
)

// 🔹 Admin-only: update payment status
router.put(
  '/update-payment-status/:abstractId',
  verifyAdminToken,
  standardLimiter,
  updatePaymentStatus
)

// 🔹 Authenticated users: upload payment receipt (file upload to S3)
router.post(
  '/upload-payment-receipt/:abstractId',
  verifyToken,
  mediumLimiter,
  paperUploader.single('file'),
  makePayment
)

export default router
