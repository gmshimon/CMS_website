import express from 'express'
import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule
} from './schedule.controller.js'

const router = express.Router()

// Routes
router.post('/', createSchedule) // Create a schedule
router.get('/', getAllSchedules) // Get all schedules
router.get('/:id', getScheduleById) // Get schedule by ID
router.put('/:id', updateSchedule) // Update schedule
router.delete('/:id', deleteSchedule) // Delete schedule

export default router
