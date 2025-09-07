import express from 'express'
import verifyToken from '../../Middleware/verifyToken.js'
import { giveMark } from './mark.controller.js'
import { strictLimiter } from '../../config/rateLimiters.js'

const router = express.Router()

router.post('/:scheduleId/:abstractId/', verifyToken, strictLimiter, giveMark)
export default router
