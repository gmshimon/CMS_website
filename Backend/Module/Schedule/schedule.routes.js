import express from 'express'
import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getMySchedule,
  getScheduleById,
  getSessionChairSchedule,
  updateSchedule
} from './schedule.controller.js'
import verifyToken from '../../Middleware/verifyToken.js'

const router = express.Router()

// Routes
router.post('/', verifyToken, createSchedule) // Create a schedule
router.get('/', verifyToken, getAllSchedules) // Get all schedules
router.get('/my', verifyToken, getMySchedule) // Get schedules for logged-in user
router.get('/session-chair', verifyToken, getSessionChairSchedule)
router.get('/:id', verifyToken, getScheduleById) // Get schedule by ID
router.put('/:id', verifyToken, updateSchedule) // Update schedule
router.delete('/:id', verifyToken, deleteSchedule) // Delete schedule

export default router
