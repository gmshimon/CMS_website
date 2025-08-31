import Schedule from '../Schedule/schedule.model.js'
import Mark from './mark.model.js'

export const giveMark = async (req, res) => {
  try {
    const { scheduleId, abstractId } = req.params
    const sessionChairId = req.user._id // assuming auth middleware sets this
    const { criteria, totalMark } = req.body
    // 1. Find the schedule
    const schedule = await Schedule.findById(scheduleId)
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
      await mark.save()
    } else {
      // Create new mark
      mark = new Mark({
        abstract: abstractId,
        conference: schedule.conference,
        sessionChair: sessionChairId,
        criteria,
        totalMark
      })
      await mark.save()

      // Add mark _id to schedule.abstractMarks if not already present
      if (!schedule.abstractMarks.includes(mark._id)) {
        schedule.abstractMarks.push(mark._id)
        await schedule.save()
      }
    }

    res.status(200).json({ message: 'Mark submitted successfully', data: mark })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
