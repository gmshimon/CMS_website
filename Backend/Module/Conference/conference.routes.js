import express from 'express'
import {
  createConference,
  getConference,
  getSingleConference,
  updateConference
} from './conference.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'
import verifyAdminToken from '../../Middleware/verifyAdminToken.js'
import {
  mediumLimiter,
  standardLimiter,
  strictLimiter
} from '../../config/rateLimiters.js'
const router = express.Router()

// 🔹 Get single conference → per-user read → limiter after token
router.get('/:id', verifyToken, standardLimiter, getSingleConference)

// 🔹 Update conference → admin-only destructive → limiter before token
router.put(
  '/update-conference/:id',
  mediumLimiter,
  verifyAdminToken,
  updateConference
)

// 🔹 Create conference → admin-only sensitive → strict limiter before token
router.post(
  '/create-conference',
  verifyAdminToken,
  strictLimiter,
  createConference
)

// 🔹 Get all conferences → per-user read → limiter after token
router.get('/', verifyToken, standardLimiter, getConference)
export default router
