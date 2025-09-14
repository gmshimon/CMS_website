import { adminMarkSubmittedTemplate } from '../../Utilis/EmailTemplate/abstractCreatedTemplate.js'
import Abstracts from '../Abstract/abstract.model.js'
import { notifyAdmins } from '../Admin/admin.service.js'
import Schedule from '../Schedule/schedule.model.js'
import Users from '../User/user.model.js'
import Mark from './mark.model.js'

export const giveMark = async (req, res) => {
  try {
    const { scheduleId, abstractId } = req.params
    const sessionChairId = req.user._id // assuming auth middleware sets this
    const { criteria, totalMark } = req.body
    // 1. Find the schedule
    const schedule = await Schedule.findById({
      _id: scheduleId,
      sessionChair: sessionChairId
    })
    if (!schedule)
      return res.status(404).json({ message: 'Schedule not found' })

    // 2. Check if the user is the session chair
    if (schedule.sessionChair.toString() !== sessionChairId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to mark this schedule' })
    }

    // 3. Check if the abstract belongs to this schedule
    if (!schedule.abstracts.includes(abstractId)) {
      return res
        .status(400)
        .json({ message: 'Abstract does not belong to this schedule' })
    }

    // 4. Check if a mark already exists for this abstract & session chair
    let mark = await Mark.findOne({
      abstract: abstractId,
      sessionChair: sessionChairId
    })

    if (mark) {
      // Update existing mark
      mark.criteria = criteria
      mark.totalMark = totalMark
      mark.isEvaluated = true
      await mark.save()
    } else {
      // Create new mark
      mark = new Mark({
        abstract: abstractId,
        conference: schedule.conference,
        sessionChair: sessionChairId,
        criteria,
        totalMark,
        isEvaluated: true
      })
      await mark.save()

      // Add mark _id to schedule.abstractMarks if not already present
      if (!schedule.abstractMarks.includes(mark._id)) {
        schedule.abstractMarks.push(mark._id)
        await schedule.save()
      }
    }

    // 5) Gather context for email
    const [abstractDoc, sessionChairUser] = await Promise.all([
      Abstracts.findById(abstractId)
        .populate('createdBy', 'name email')

        .populate('conference', 'name')
        .lean(),
      Users.findById(sessionChairId, 'name email').lean()
    ])

    const conferenceName = abstractDoc?.conference?.name || 'Conference'

    const abstractTitle = abstractDoc?.paper_title || 'Untitled Abstract'
    const presenterName = abstractDoc?.presenter?.presenter_name || 'Presenter'
    const sessionChairName = sessionChairUser?.name || 'Session Chair'

    // 6) Notify all admins (fire-and-forget inside helper with setImmediate)
    await notifyAdmins({
      type: 'mark_submitted',
      message: `A new mark has been submitted for "${abstractTitle}".`,
      emailTemplate: admin =>
        adminMarkSubmittedTemplate({
          adminName: admin?.name || 'Admin',
          conferenceName,
          abstractTitle,
          presenterName,
          sessionChairName,
          totalMark,
          criteria
        })
    })

    res.status(200).json({ message: 'Mark submitted successfully', data: mark })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
