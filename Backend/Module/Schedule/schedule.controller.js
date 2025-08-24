import mongoose from 'mongoose'
import Schedule from './schedule.model.js'
import { sendEmail } from '../../Utilis/sendEmail.js'
import Users from '../User/user.model.js'
import Abstracts from '../Abstract/abstract.model.js'
import {
  scheduleUpdateTemplate,
  sessionNotificationTemplate
} from '../../Utilis/EmailTemplate/abstractCreatedTemplate.js'
import { createNotificationService } from '../Notification/notification.service.js'
import Conference from '../Conference/conference.model.js'


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

    // ✅ Save schedule
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

    // ✅ Fetch the conference
    const conferenceData = await Conference.findOne({ _id: conference })

    // ✅ Fetch abstracts with presenter info
    const abstractDocs = await Abstracts.find({ _id: { $in: abstracts } })

    // ✅ Notify each abstract presenter
    await Promise.all(
      abstractDocs.map(async abs => {
        const emailHtml = scheduleUpdateTemplate({
          userName: abs.presenter.presenter_name,
          abstractTitle: abs.paper_title,
          conference: conferenceData.name,
          session,
          track,
          subTrack,
          day,
          date,
          startTime,
          endTime,
          abstractType,
          meetingLink,
          venue
        })

        const message = `Your abstract "${abs.paper_title}" has been scheduled in ${conferenceData.name}.`
        const type = 'schedule_update'

        // Send email
        await sendEmail({
          to: abs.presenter.presenter_email,
          subject: `Schedule Update for Your Abstract - ${conferenceData.name}`,
          html: emailHtml
        })

        // Save notification (to DB & frontend)
        await createNotificationService(abs.createdBy, message, emailHtml, type)
      })
    )

    // ✅ Fetch session chair and moderator info
    const chair = await Users.findById(sessionChair)
    const mod = await Users.findById(moderator)

    const sessionAbstracts = abstractDocs.map(abs => ({
      title: abs.paper_title,
      author: abs.presenter.presenter_name
    }))

    // ✅ Notify Session Chair
    if (chair) {
      const chairHtml = sessionNotificationTemplate({
        userName: chair.name,
        role: 'Session Chair',
        conference: conferenceData.name,
        session,
        track,
        subTrack,
        day,
        date,
        startTime,
        endTime,
        abstractType,
        meetingLink,
        venue,
        abstracts: sessionAbstracts
      })

      const message = `You have been assigned as Session Chair for "${session}" in ${conferenceData.name}.`
      const type = 'chair_assignment'

      await sendEmail({
        to: chair.email,
        subject: `You are assigned as Session Chair - ${conferenceData.name}`,
        html: chairHtml
      })

      await createNotificationService(chair._id, message, chairHtml, type)
    }

    // ✅ Notify Moderator
    if (mod) {
      const modHtml = sessionNotificationTemplate({
        userName: mod.name,
        role: 'Moderator',
        conference: conferenceData.name,
        session,
        track,
        subTrack,
        day,
        date,
        startTime,
        endTime,
        abstractType,
        meetingLink,
        venue,
        abstracts: sessionAbstracts
      })

      const message = `You have been assigned as Moderator for "${session}" in ${conferenceData.name}.`
      const type = 'moderator_assignment'

      await sendEmail({
        to: mod.email,
        subject: `You are assigned as Moderator - ${conferenceData.name}`,
        html: modHtml
      })

      await createNotificationService(mod._id, message, modHtml, type)
    }

    return res.status(201).json({
      status: 'success',
      message: 'Schedule created and notifications sent',
      data: schedule
    })
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
