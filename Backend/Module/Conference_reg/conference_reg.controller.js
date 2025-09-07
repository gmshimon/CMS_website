import conference_reg from './conference_reg.model.js'

export const getConferenceReg = async (req, res, next) => {
  try {
    const { conference_id } = req.params
    const userId = req.user._id

    // 1. Find all conference registration created by this user
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

    const results = await conference_reg.find(match).populate([
      {
        path: 'conference'
      },
      {
        path: 'abstract',
        select: 'paper_title theme abstract_id'
      }
    ])

    res.status(200).json({
      status: 'Success',
      message: 'Fetched the conference registration successfully',
      data: results
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getSingleConferenceReg = async (req, res, next) => {
  try {
    const { id } = req.params

    const response = await conference_reg
      .findOne({
        _id: id
      })
      .populate([
        {
          path: 'conference'
        },
        {
          path: 'abstract'
        }
      ])

    res.status(200).json({
      status: 'Success',
      message: 'Fetched successfully',
      data: response
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getAttendeeDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id

    // ✅ All registrations by this user
    const registrations = await conference_reg
      .find({ createdBy: userId })
      .populate(
        'conference',
        'name city country startingDate closingDate status'
      )
      .lean()

    // Total registrations
    const myRegistrations = registrations.length

    // Upcoming = conference start date in the future + still active
    const now = new Date()
    const upcomingConferences = registrations
      .filter(reg => {
        const conf = reg.conference
        return (
          conf && conf.status === 'Active' && new Date(conf.startingDate) > now
        )
      })
      .map(reg => ({
        id: reg.conference._id,
        name: reg.conference.name,
        city: reg.conference.city,
        country: reg.conference.country,
        startingDate: reg.conference.startingDate
      }))

    // Total Paid = sum of all totalPrice
    const totalPaid = registrations.reduce(
      (sum, reg) => sum + (reg.totalPrice || 0),
      0
    )

    res.status(200).json({
      status: 'Success',
      message: 'Fetched attendee dashboard stats successfully',
      data: {
        myRegistrations,
        upcomingCount: upcomingConferences.length,
        totalPaid,
        upcomingConferences
      }
    })
  } catch (error) {}
}
