import express from 'express'
import {
  changeAbstractStatus,
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

const router = express.Router()

router.get('/unscheduled', verifyToken, getUnscheduledAbstracts)
router.get('/get-abstract-category', verifyToken, getAbstractByCategory)
router.post('/payment-reminder/:abstractId', verifyToken, sendPaymentReminder)
router.post('/paper-reminder/:abstractId', verifyToken, sendPaperSubmitReminder)
// TODO: add the token validation of admin token
router.get('/:conference_id', getAbstract)
router.post(
  '/create-abstract',
  verifyToken,
  abstractUploaded.fields([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]),
  createAbstract
)

router.put('/update-abstract/:id', verifyToken, updateAbstract)

router.post('/change-status/:id', verifyToken, changeAbstractStatus)
router.put(
  '/update-payment-status/:abstractId',
  verifyToken,
  updatePaymentStatus
)
router.post(
  '/upload-payment-receipt/:abstractId',
  verifyToken,
  paperUploader.single('file'),
  makePayment
)

export default router
