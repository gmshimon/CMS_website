import express from 'express'
import verifyToken from '../../Middleware/verifyToken.js'
import { giveMark } from './mark.controller.js'

const router = express.Router()

router.post('/:scheduleId/:abstractId/', verifyToken, giveMark)
export default router
