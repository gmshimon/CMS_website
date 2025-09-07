import express from 'express'
import verifyToken from '../../Middleware/verifyToken.js'
import paperUploader from '../../Middleware/FileUpload/paperUpload.js'
import { getPaper, postPaper } from './paper.controller.js'
import { mediumLimiter, standardLimiter } from '../../config/rateLimiters.js'

const router = express.Router()

// 🔹 Get a paper → per-user read → limiter after token
router.get('/:abstractId', verifyToken, standardLimiter, getPaper)

// 🔹 Upload paper → file upload, heavy → medium limiter after token
router.post(
  '/create-paper/:abstractId',
  verifyToken,
  mediumLimiter,
  paperUploader.single('file'),
  postPaper
)

export default router
