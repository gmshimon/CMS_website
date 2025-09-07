import express from 'express'
import {
  getConferenceReg,
  getSingleConferenceReg
} from './conference_reg.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'
import { standardLimiter } from '../../config/rateLimiters.js'
const router = express.Router()

router.get('/:conference_id', verifyToken, standardLimiter, getConferenceReg)
router.get(
  '/single_conference_reg/:id',
  verifyToken,
  standardLimiter,
  getSingleConferenceReg
)

export default router
