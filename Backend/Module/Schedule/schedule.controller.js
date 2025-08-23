import mongoose from 'mongoose'
import Schedule from './schedule.model.js'

// CREATE Schedule
export const createSchedule = async (req, res) => {
  try {
    const {
      conference,
      day,
      date,
      session,
      track,
      subTrack,
      startTime,
      endTime,
      abstractType,
      meetingLink,
      sessionChair,
      moderator,
      abstracts,
      venue,
      createdBy
    } = req.body

    // Validate required fields
    if (
      !conference ||
      !day ||
      !date ||
      !session ||
      !track ||
      !startTime ||
      !endTime ||
      !abstractType
    ) {
      return res
        .status(400)
        .json({ message: 'Please fill all required fields.' })
    }

    // Conditional validation for online/offline sessions
    if (abstractType.includes('Online') && !meetingLink) {
      return res
        .status(400)
        .json({ message: 'Online sessions require a meeting link.' })
    }

    if (
      abstractType.includes('Physical') &&
      (!venue || !venue.building || !venue.hall || !venue.room)
    ) {
      return res
        .status(400)
        .json({ message: 'Physical sessions require complete venue info.' })
    }

    const schedule = new Schedule({
      conference,
      day,
      date,
      session,
      track,
      subTrack,
      startTime,
      endTime,
      abstractType,
      meetingLink: meetingLink || null,
      sessionChair,
      moderator,
      abstracts,
      venue: venue || null,
      createdBy
    })

    await schedule.save()
    return res.status(201).json(schedule)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

// GET All Schedules
export const getAllSchedules = async (req, res) => {
  try {
    const { conference_id, abstractType } = req.query
    const match = { abstractType }
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
    ) {
      match.conference = conference_id
    }
    const schedules = await Schedule.find(match)
      .populate('conference')
      .populate('sessionChair', 'name email')
      .populate('moderator', 'name email')
      .populate('abstracts', 'title authors')
    return res.status(200).json(schedules)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

// GET Schedule by ID
export const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Schedule ID' })
    }

    const schedule = await Schedule.findById(id)
      .populate('conference')
      .populate('sessionChair', 'name email')
      .populate('moderator', 'name email')
      .populate('abstracts', 'title authors')

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }

    return res.status(200).json(schedule)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

// UPDATE Schedule
export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const schedule = await Schedule.findByIdAndUpdate(id, updates, {
      new: true
    })
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }

    return res.status(200).json(schedule)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

// DELETE Schedule
export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params

    const schedule = await Schedule.findByIdAndDelete(id)
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }

    return res.status(200).json({ message: 'Schedule deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}
