import mongoose from 'mongoose'
import Schedule from './schedule.model.js'
import Users from '../User/user.model.js'
import Abstracts from '../Abstract/abstract.model.js'
import {
  scheduleRemovalTemplate,
  scheduleUpdateTemplate,
  sessionNotificationTemplate
} from '../../Utilis/EmailTemplate/abstractCreatedTemplate.js'
import { createNotificationService } from '../Notification/notification.service.js'
import Conference from '../Conference/conference.model.js'
import { sendEmail } from '../../Utilis/Services/sendEmail.js'

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

    // ✅ Mark abstracts as scheduled
    await Abstracts.updateMany(
      { _id: { $in: abstracts } },
      { $set: { scheduled: true } }
    )

    // ✅ Notify each abstract presenter
    await Promise.all(
      abstractDocs.map(async abs => {
        const emailHtml = scheduleUpdateTemplate({
          userName: abs.presenter.presenter_name,
          abstractTitle: abs.paper_title,
          conference: conferenceData.name,
          session,
          day,
          date,
          startTime,
          endTime,
          abstractType,
          meetingLink,
          venue
        })

        const message = `Your abstract "${abs.paper_title}" has been scheduled in ${conferenceData.name}.`

        // Send email
        await sendEmail({
          to: abs.presenter.presenter_email,
          subject: `Schedule Update for Your Abstract - ${conferenceData.name}`,
          html: emailHtml
        })

        // Save notification (to DB & frontend)
        await createNotificationService(abs.createdBy, message, emailHtml, 'schedule_update')
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

      await sendEmail({
        to: chair.email,
        subject: `You are assigned as Session Chair - ${conferenceData.name}`,
        html: chairHtml
      })

      await createNotificationService(chair._id, message, chairHtml, 'chair_assignment')
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
      await sendEmail({
        to: mod.email,
        subject: `You are assigned as Moderator - ${conferenceData.name}`,
        html: modHtml
      })
    }

    await schedule.populate([
      { path: 'conference', select: 'name' },
      {
        path: 'sessionChair',
        select: 'name email'
      },
      {
        path: 'moderator',
        select: 'name email'
      },
      {
        path: 'abstracts',
        select: 'paper_title authors review_status'
      }
    ])
    return res.status(200).json({
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
      .populate('conference', 'name')
      .populate('sessionChair', 'name email')
      .populate('moderator', 'name email')
      .populate('abstracts', 'paper_title authors review_status')
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
    const conferenceData = await Conference.findOne({ _id: updates.conference })
    // Get the current schedule before updating
    const existingSchedule = await Schedule.findById(id)
      .populate('abstracts')
      .populate('sessionChair')
      .populate('moderator')

    if (!existingSchedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }

    const oldAbstracts = existingSchedule.abstracts.map(a => a._id.toString())
    const newAbstracts = updates.abstracts || []

    // find abstract differences
    const addedAbstracts = newAbstracts.filter(
      id => !oldAbstracts.includes(id.toString())
    )
    const removedAbstracts = oldAbstracts.filter(
      id => !newAbstracts.includes(id.toString())
    )

    // --- session chair change ---
    const oldChair = existingSchedule.sessionChair?._id?.toString() || null
    const newChair = updates.sessionChair || null
    const chairChanged = oldChair !== newChair

    // --- moderator change ---
    const oldModerator = existingSchedule.moderator?._id?.toString() || null
    const newModerator = updates.moderator || null
    const moderatorChanged = oldModerator !== newModerator

    // update schedule
    const schedule = await Schedule.findByIdAndUpdate(id, updates, {
      new: true
    })
      .populate('abstracts')
      .populate('sessionChair')
      .populate('moderator')

    // --- emails for abstracts ---
    if (addedAbstracts.length > 0) {
      const abstracts = await Abstracts.find({ _id: { $in: addedAbstracts } })
        .populate('presenter')
        .populate('conference')
      await Abstracts.updateMany(
        { _id: { $in: addedAbstracts } },
        { $set: { scheduled: true } }
      )
      for (let abs of abstracts) {
        if (abs.presenter?.presenter_email) {
          const emailHtml = scheduleUpdateTemplate({
            userName: abs.presenter.presenter_name,
            abstractTitle: abs.paper_title,
            conference: abs.conference.name,
            session: schedule.session,
            day: schedule.day,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            abstractType: schedule.abstractType,
            venue: schedule.venue,
            meetingLink: schedule.meetingLink
          })

          const message = `Your abstract "${abs.paper_title}" has been scheduled in ${abs.conference.name}.`
          const type = 'schedule_update'

          // Send email
          await sendEmail({
            to: abs.presenter.presenter_email,
            subject: `Schedule Update for Your Abstract - ${conferenceData.name}`,
            html: emailHtml
          })

          // Save notification (to DB & frontend)
          await createNotificationService(
            abs.createdBy,
            message,
            emailHtml,
            type
          )
        }
      }
    }

    if (removedAbstracts.length > 0) {
      const abstracts = await Abstracts.find({
        _id: { $in: removedAbstracts }
      })
        .populate('presenter')
        .populate('conference')
      await Abstracts.updateMany(
        { _id: { $in: removedAbstracts } },
        { $set: { scheduled: false } }
      )
      for (let abs of abstracts) {
        if (abs.presenter?.presenter_email) {
          const html = scheduleRemovalTemplate({
            userName: abs.presenter.presenter_name,
            role: 'abstract',
            conference: abs.conference.name,
            abstractTitle: abs.paper_title,
            session: schedule.session,
            day: schedule.day,
            date: schedule.date,
            startTime: schedule.startTime,
            abstractType: schedule.abstractType,
            endTime: schedule.endTime,
            venue: schedule.venue,
            meetingLink: schedule.meetingLink
          })

          const message = `Your abstract "${abs.paper_title}" has been removed from the schedule in ${abs.conference.name}.`
          const type = 'schedule_removal'

          await sendEmail({
            to: abs.presenter.presenter_email,
            subject: `Schedule Update - Abstract Removed from ${abs.conference.name}`,
            html
          })

          await createNotificationService(abs.createdBy, message, html, type)
        }
      }
    }

    // --- emails for session chair change ---
    if (chairChanged) {
      // notify old chair (removed)
      if (oldChair) {
        const oldChairUser = await Users.findById(oldChair)
        if (oldChairUser?.email) {
          const html = scheduleRemovalTemplate({
            userName: oldChairUser.name,
            role: 'Session Chair',
            conference: conferenceData.name,
            session: schedule.session,
            day: schedule.day,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            venue: schedule.venue,
            meetingLink: schedule.meetingLink
          })

          const message = `You have been removed as Session Chair for "${schedule.session}" in ${conferenceData.name}.`
          const type = 'chair_removal'

          await sendEmail({
            to: oldChairUser.email,
            subject: `Removed as Session Chair - ${conferenceData.name}`,
            html
          })

          await createNotificationService(oldChairUser._id, message, html, type)
        }
      }

      // notify new chair (assigned)
      if (newChair) {
        const newChairUser = await Users.findById(newChair)
        if (newChairUser?.email) {
          const chairHtml = sessionNotificationTemplate({
            userName: newChairUser.name,
            role: 'Session Chair',
            conference: conferenceData.name,
            session: schedule.session,
            day: schedule.day,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            abstractType: schedule.abstractType,
            venue: schedule.venue,
            meetingLink: schedule.meetingLink,
            abstracts: schedule.abstracts
          })

          const message = `You have been assigned as Session Chair for "${session}" in ${conferenceData.name}.`
          const type = 'chair_assignment'

          await sendEmail({
            to: newChairUser.email,
            subject: `You are assigned as Session Chair - ${conferenceData.name}`,
            html: chairHtml
          })

          await createNotificationService(
            newChairUser._id,
            message,
            chairHtml,
            type
          )
        }
      }
    }

    // --- emails for moderator change ---
    if (moderatorChanged) {
      // notify old moderator (removed)
      if (oldModerator) {
        const oldModeratorUser = await Users.findById(oldModerator)
        if (oldModeratorUser?.email) {
          const html = scheduleRemovalTemplate({
            userName: oldModeratorUser.name,
            role: 'Moderator',
            conference: conferenceData.name,
            session: schedule.session,
            day: schedule.day,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            venue: schedule.venue,
            meetingLink: schedule.meetingLink
          })

          await sendEmail({
            to: oldModeratorUser.email,
            subject: `Removed as Moderator - ${conferenceData.name}`,
            html
          })
        }
      }

      // notify new moderator (assigned)
      if (newModerator) {
        const newModeratorUser = await Users.findById(newModerator)
        if (newModeratorUser?.email) {
          const modHtml = sessionNotificationTemplate({
            userName: newModeratorUser.name,
            role: 'Moderator',
            conference: conferenceData.name,
            session: schedule.session,
            day: schedule.day,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            abstractType: schedule.abstractType,
            venue: schedule.venue,
            meetingLink: schedule.meetingLink,

            abstracts: schedule.abstracts
          })

          await sendEmail({
            to: newModeratorUser.email,
            subject: `You are assigned as Moderator - ${conferenceData.name}`,
            html: modHtml
          })
        }
      }
    }

    // --- detect general schedule detail changes ---
    const scheduleFieldsChanged =
      existingSchedule.date?.toString() !== updates.date?.toString() ||
      existingSchedule.day !== updates.day ||
      existingSchedule.startTime !== updates.startTime ||
      existingSchedule.endTime !== updates.endTime ||
      existingSchedule.venue !== updates.venue ||
      existingSchedule.meetingLink !== updates.meetingLink

    if (
      scheduleFieldsChanged &&
      addedAbstracts.length === 0 &&
      removedAbstracts.length === 0
    ) {
      for (let abs of schedule.abstracts) {
        if (abs.presenter?.presenter_email) {
          const emailHtml = scheduleUpdateTemplate({
            userName: abs.presenter.presenter_name,
            abstractTitle: abs.paper_title,
            conference: conferenceData.name,
            session: schedule.session,
            day: schedule.day,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            abstractType: schedule.abstractType,
            venue: schedule.venue,
            meetingLink: schedule.meetingLink
          })

          const message = `Schedule details (time/venue/meeting link) for your abstract "${abs.paper_title}" have been updated in ${conferenceData.name}.`
          const type = 'schedule_time_update'

          await sendEmail({
            to: abs.presenter.presenter_email,
            subject: `Schedule Update - ${conferenceData.name}`,
            html: emailHtml
          })

          await createNotificationService(
            abs.createdBy,
            message,
            emailHtml,
            type
          )
        }
      }
    }

    // notify session chair
    if (scheduleFieldsChanged && !chairChanged) {
      if (schedule.sessionChair?.email) {
        const chairHtml = sessionNotificationTemplate({
          userName: schedule.sessionChair.name,
          role: 'Session Chair',
          conference: conferenceData.name,
          session: schedule.session,
          day: schedule.day,
          date: schedule.date,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          abstractType: schedule.abstractType,
          venue: schedule.venue,
          meetingLink: schedule.meetingLink,
          abstracts: schedule.abstracts
        })

        const message = `Schedule details for your session "${schedule.session}" have been updated in ${conferenceData.name}.`
        const type = 'chair_schedule_update'

        await sendEmail({
          to: schedule.sessionChair.email,
          subject: `Schedule Updated - ${conferenceData.name}`,
          html: chairHtml
        })

        await createNotificationService(
          schedule.sessionChair._id,
          message,
          chairHtml,
          type
        )
      }
    }

    if (scheduleFieldsChanged && !moderatorChanged) {
      if (schedule.sessionChair?.email) {
        const chairHtml = sessionNotificationTemplate({
          userName: schedule.sessionChair.name,
          role: 'Session Chair',
          conference: conferenceData.name,
          session: schedule.session,
          day: schedule.day,
          date: schedule.date,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          abstractType: schedule.abstractType,
          venue: schedule.venue,
          meetingLink: schedule.meetingLink,
          abstracts: schedule.abstracts
        })
        await sendEmail({
          to: schedule.sessionChair.email,
          subject: `Schedule Updated - ${conferenceData.name}`,
          html: chairHtml
        })
      }
    }
    return res.status(200).json({
      status: 'Success',
      data: schedule
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

// DELETE Schedule
export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params

    // 1. Get the schedule with all details before deletion
    const schedule = await Schedule.findById(id)
      .populate('abstracts')
      .populate('sessionChair')
      .populate('moderator')
      .populate('conference')

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }

    const conferenceName = schedule.conference?.name || 'Conference'

    // 2. Notify presenters of abstracts
    for (let abs of schedule.abstracts) {
      if (abs.presenter?.presenter_email) {
        const html = scheduleRemovalTemplate({
          userName: abs.presenter.presenter_name,
          role: 'abstract',
          conference: conferenceName,
          abstractTitle: abs.paper_title,
          session: schedule.session,
          day: schedule.day,
          date: schedule.date,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          abstractType: schedule.abstractType,
          venue: schedule.venue,
          meetingLink: schedule.meetingLink
        })

        const message = `Your abstract "${abs.paper_title}" has been removed because the session "${schedule.session}" was deleted from ${conferenceName}.`
        const type = 'schedule_deletion'

        await sendEmail({
          to: abs.presenter.presenter_email,
          subject: `Session Deleted - ${conferenceName}`,
          html
        })

        await createNotificationService(abs.createdBy, message, html, type)
      }
    }

    // 3. Notify session chair
    if (schedule.sessionChair?.email) {
      const html = scheduleRemovalTemplate({
        userName: schedule.sessionChair.name,
        role: 'Session Chair',
        conference: conferenceName,
        session: schedule.session,
        day: schedule.day,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        venue: schedule.venue,
        meetingLink: schedule.meetingLink
      })

      const message = `The session "${schedule.session}" you were chairing has been deleted from ${conferenceName}.`
      const type = 'chair_session_deleted'

      await sendEmail({
        to: schedule.sessionChair.email,
        subject: `Session Deleted - ${conferenceName}`,
        html
      })

      await createNotificationService(
        schedule.sessionChair._id,
        message,
        html,
        type
      )
    }

    // 4. Notify moderator
    if (schedule.moderator?.email) {
      const html = scheduleRemovalTemplate({
        userName: schedule.moderator.name,
        role: 'Moderator',
        conference: conferenceName,
        session: schedule.session,
        day: schedule.day,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        venue: schedule.venue,
        meetingLink: schedule.meetingLink
      })

      const message = `The session "${schedule.session}" you were moderating has been deleted from ${conferenceName}.`
      const type = 'moderator_session_deleted'

      await sendEmail({
        to: schedule.moderator.email,
        subject: `Session Deleted - ${conferenceName}`,
        html
      })

      await createNotificationService(
        schedule.moderator._id,
        message,
        html,
        type
      )
    }

    // 5. Now delete the schedule from DB
    await Schedule.findByIdAndDelete(id)

    return res.status(200).json({ message: 'Schedule deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

export const getMySchedule = async (req, res, next) => {
  try {
    const { conference_id } = req.query
    const userId = req.user._id

    // 1. Find all abstracts created by this user
    const match = {
      createdBy: userId
    }
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
    ) {
      match.conference = conference_id
    }

    const myAbstracts = await Abstracts.find(match).select(
      'paper_title status presentation_method conference scheduled createdAt'
    )

    // If no abstracts, return empty array
    if (myAbstracts.length === 0) {
      return res.status(200).json({ data: [] })
    }

    const abstractIds = myAbstracts.map(a => a._id)

    // 2. Find schedules that include these abstracts
    const schedules = await Schedule.find({ abstracts: { $in: abstractIds } })
      .populate('conference', 'name')
      .populate('sessionChair', 'name email')
      .populate('moderator', 'name email')
      .select('day date session startTime endTime venue meetingLink abstracts')

    // 3. Build abstract-wise response
    const response = myAbstracts.map(abs => {
      const schedule = schedules.find(s =>
        s.abstracts.some(a => a.toString() === abs._id.toString())
      )
      return {
        _id: abs._id,
        paper_title: abs.paper_title,
        status: abs.status,
        presentation_method: abs.presentation_method,
        conference: abs.conference,
        scheduled:abs.scheduled,
        schedule: schedule
          ? {
              day: schedule.day,
              date: schedule.date,
              session: schedule.session,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
              venue: schedule.venue,
              meetingLink: schedule.meetingLink,
              sessionChair: schedule.sessionChair,
              moderator: schedule.moderator
            }
          : null // unscheduled
      }
    })

    res.status(200).json({
      status: 'Success',
      data: response
    })
  } catch (error) {
    next(error)
  }
}
