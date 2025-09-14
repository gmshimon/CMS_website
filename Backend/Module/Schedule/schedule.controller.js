import mongoose from 'mongoose'
import Schedule from './schedule.model.js'
import Users from '../User/user.model.js'
import Abstracts from '../Abstract/abstract.model.js'
import {
  scheduleRemovalTemplate,
  scheduleUpdateTemplate,
  sessionNotificationTemplate
} from '../../Utilis/EmailTemplate/abstractCreatedTemplate.js'
import Conference from '../Conference/conference.model.js'
import Mark from '../Mark/mark.model.js'
import Paper from '../Paper/paper.model.js'
import { notifyUser } from '../User/user.service.js'

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

    // ✅ Fetch conference and abstracts
    const [conferenceData, abstractDocs] = await Promise.all([
      Conference.findById(conference).lean(),
      Abstracts.find({ _id: { $in: abstracts } }).lean()
    ])

    // ✅ Mark abstracts as scheduled
    await Abstracts.updateMany(
      { _id: { $in: abstracts } },
      { $set: { scheduled: true } }
    )

    // ✅ Notify each abstract presenter
    await Promise.all(
      abstractDocs.map(async abs => {
        notifyUser({
          userId: abs.createdBy,
          email: abs.presenter.presenter_email,
          message: `Your abstract "${abs.paper_title}" has been scheduled in ${conferenceData.name}.`,
          type: 'Schedule Update',
          emailTemplate: () =>
            scheduleUpdateTemplate({
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
        })
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
      notifyUser({
        userId: chair._id,
        email: chair.email,
        message: `You have been assigned as Session Chair for "${session}" in ${conferenceData.name}.`,
        type: 'You are assigned as Session Chair',
        emailTemplate: () =>
          sessionNotificationTemplate({
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
      })
    }

    // ✅ Notify Moderator
    if (mod) {
      notifyUser({
        userId: mod._id,
        email: mod.email,
        message: `You have been assigned as Moderator for "${session}" in ${conferenceData.name}.`,
        type: 'You are assigned as Moderator',
        emailTemplate: () =>
          sessionNotificationTemplate({
            userName: mod.name,
            role: 'Moderator',
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
    const sessionChair = req.user._id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Schedule ID' })
    }

    const schedule = await Schedule.findOne({ _id: id })
      .populate('conference')
      .populate('sessionChair', 'name email')
      .populate('moderator', 'name email')
      .populate({
        path: 'abstracts',
        select:
          'paper_title authors abstract theme presenter conference createdAt keywords abstract_id',
        populate: {
          path: 'conference',
          select: 'name' // choose what fields you need
        }
      })

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }
    // Attach marks for each abstract
    const abstractsWithMarks = await Promise.all(
      schedule.abstracts.map(async abstract => {
        const marks = await Mark.findOne({ abstract: abstract._id })
        const papers = await Paper.findOne({ abstract: abstract._id }).lean()
        return {
          ...abstract.toObject(),
          marks,
          papers
        }
      })
    )

    return res.status(200).json({
      data: {
        ...schedule.toObject(),
        abstracts: abstractsWithMarks
      }
    })
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
          notifyUser({
            userId: abs.createdBy,
            email: abs.presenter.presenter_email,
            message: `Your abstract "${abs.paper_title}" has been scheduled in ${conferenceData.name}.`,
            type: 'Schedule has been updated',
            emailTemplate: () =>
              scheduleUpdateTemplate({
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
          })
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
          notifyUser({
            userId: abs.createdBy,
            email: abs.presenter.presenter_email,
            message: `Your abstract "${abs.paper_title}" has been removed from the schedule in ${abs.conference.name}.`,
            type: `Schedule Update - Abstract Removed from ${abs.conference.name}`,
            emailTemplate: () =>
              scheduleRemovalTemplate({
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
          })
        }
      }
    }

    // --- emails for session chair change ---
    if (chairChanged) {
      // notify old chair (removed)
      if (oldChair) {
        const oldChairUser = await Users.findById(oldChair)
        if (oldChairUser?.email) {
          notifyUser({
            userId: oldChairUser._id,
            email: oldChairUser.email,
            message: `You have been removed as Session Chair for "${schedule.session}" in ${conferenceData.name}.`,
            type: 'You have been removed as Session Chair',
            emailTemplate: () =>
              scheduleRemovalTemplate({
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
          })
        }
      }

      // notify new chair (assigned)
      if (newChair) {
        const newChairUser = await Users.findById(newChair)
        if (newChairUser?.email) {
          notifyUser({
            userId: newChairUser._id,
            email: newChairUser.email,
            message: `You have been assigned as Session Chair for "${schedule.session}" in ${conferenceData.name}.`,
            type: 'You are assigned as Session Chair',
            emailTemplate: () =>
              sessionNotificationTemplate({
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
          })
        }
      }
    }

    // --- emails for moderator change ---
    if (moderatorChanged) {
      // notify old moderator (removed)
      if (oldModerator) {
        const oldModeratorUser = await Users.findById(oldModerator)
        if (oldModeratorUser?.email) {
          notifyUser({
            userId: oldModeratorUser._id,
            email: oldModeratorUser.email,
            message: `You have been removed as Moderator for "${schedule.session}" in ${conferenceData.name}.`,
            type: `Removed as Moderator - ${conferenceData.name}`,
            emailTemplate: () =>
              scheduleRemovalTemplate({
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
          })
        }
      }

      // notify new moderator (assigned)
      if (newModerator) {
        const newModeratorUser = await Users.findById(newModerator)
        if (newModeratorUser?.email) {
          notifyUser({
            userId: newModeratorUser._id,
            email: newModeratorUser.email,
            message: `You have been assigned as Moderator for "${schedule.session}" in ${conferenceData.name}.`,
            type: `You are assigned as Moderator - ${conferenceData.name}`,
            emailTemplate: () =>
              sessionNotificationTemplate({
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
          notifyUser({
            userId: abs.createdBy,
            email: abs.presenter.presenter_email,
            message: `Schedule details (time/venue/meeting link) for your abstract "${abs.paper_title}" have been updated in ${conferenceData.name}.`,
            type: `Schedule Update - ${conferenceData.name}`,
            emailTemplate: () =>
              scheduleUpdateTemplate({
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
          })
        }
      }
    }

    // notify session chair
    if (scheduleFieldsChanged && !chairChanged) {
      if (schedule.sessionChair?.email) {
        notifyUser({
          userId: schedule.sessionChair._id,
          email: schedule.sessionChair.email,
          message: `Schedule details for your session "${schedule.session}" have been updated in ${conferenceData.name}.`,
          type: 'You are assigned as Session Chair',
          emailTemplate: () =>
            sessionNotificationTemplate({
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
        })
      }
    }

    if (scheduleFieldsChanged && !moderatorChanged) {
      if (schedule.sessionChair?.email) {
        notifyUser({
          userId: schedule.moderator._id,
          email: schedule.moderator.email,
          message: `Schedule details for the session "${schedule.session}" you are moderating have been updated in ${conferenceData.name}.`,
          type: 'You are assigned as Moderator',
          emailTemplate: () =>
            sessionNotificationTemplate({
              userName: schedule.moderator.name,
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
        })
      }
    }
    return res.status(200).json({
      status: 'Success',
      data: schedule
    })
  } catch (error) {
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
        notifyUser({
          userId: abs.createdBy,
          email: abs.presenter.presenter_email,
          message: `Your abstract "${abs.paper_title}" has been removed because the session "${schedule.session}" was deleted from ${conferenceName}.`,
          type: `Schedule Deletion - ${conferenceName}`,
          emailTemplate: () =>
            scheduleRemovalTemplate({
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
        })
      }
    }

    // 3. Notify session chair
    if (schedule.sessionChair?.email) {
      notifyUser({
        userId: schedule.sessionChair._id,
        email: schedule.sessionChair.email,
        message: `The session "${schedule.session}" you were chairing has been deleted from ${conferenceName}.`,
        type: `Session Deleted - ${conferenceName}`,
        emailTemplate: () =>
          scheduleRemovalTemplate({
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
      })
    }

    // 4. Notify moderator
    if (schedule.moderator?.email) {
      notifyUser({
        userId: schedule.moderator._id,
        email: schedule.moderator.email,
        message: `The session "${schedule.session}" you were moderating has been deleted from ${conferenceName}.`,
        type: `Session Deleted - ${conferenceName}`,
        emailTemplate: () =>
          scheduleRemovalTemplate({
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
      })
    }

    // 5. Now delete the schedule from DB
    await Schedule.findByIdAndDelete(id)

    return res.status(200).json({ message: 'Schedule deleted successfully' })
  } catch (error) {
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
      'paper_title status abstract_id presentation_method conference scheduled createdAt'
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
        scheduled: abs.scheduled,
        abstract_id: abs.abstract_id,
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

export const getSessionChairSchedule = async (req, res, next) => {
  try {
    const { conference_id, abstractType, page = 1 } = req.query

    const userId = req.user._id
    // 1. Build filter object
    const match = {
      sessionChair: userId
    }
    if (
      conference_id &&
      conference_id !== 'all' &&
      conference_id !== undefined
    ) {
      match.conference = conference_id
    }

    if (abstractType && abstractType !== 'all' && abstractType !== undefined) {
      match.abstractType = abstractType
    }

    // 2. Pagination
    const skip = (parseInt(page) - 1) * parseInt(10)
    const total = await Schedule.countDocuments(match)

    // 3. Fetch schedules
    const schedules = await Schedule.find(match)
      .populate('conference', 'name')
      .populate('sessionChair', 'name email')
      .populate('moderator', 'name email')
      .populate('abstracts', 'paper_title authors review_status')
      .sort({ startTime: 1 })
      .skip(skip)
      .limit(parseInt(10))

    // 4. Return response
    res.status(200).json({
      message: 'Successfully fetched the schedule',
      data: {
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(10)),
        totalSchedules: total,
        schedules
      }
    })
  } catch (error) {}
}
