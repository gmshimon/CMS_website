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
import verifyAdminToken from '../../Middleware/verifyAdminToken.js'
import {
  mediumLimiter,
  standardLimiter,
  strictLimiter
} from '../../config/rateLimiters.js'

const router = express.Router()

// 🔹 Admin-only: create schedule → very sensitive
router.post('/', verifyAdminToken, createSchedule) // Create a schedule

// 🔹 Get all schedules → per-user read
router.get('/', verifyToken, standardLimiter, getAllSchedules) // Get all schedules

// 🔹 Get schedules for logged-in user → per-user read
router.get('/my', verifyToken, standardLimiter, getMySchedule) // Get schedules for logged-in user

// 🔹 Session chair schedules → per-user read
router.get(
  '/session-chair',
  verifyAdminToken,
  standardLimiter,
  getSessionChairSchedule
)

// 🔹 Get schedule by ID → per-user read
router.get('/:id', verifyToken, standardLimiter, getScheduleById) // Get schedule by ID

// 🔹 Admin-only: update schedule → destructive but less critical than delete
router.put('/:id', mediumLimiter, verifyAdminToken, updateSchedule) // Update schedule

// 🔹 Admin-only: delete schedule → highly sensitive
router.delete('/:id', strictLimiter, verifyAdminToken, deleteSchedule) // Delete schedule

export default router
