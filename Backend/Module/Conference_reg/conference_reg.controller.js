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

    const results = await conference_reg
      .find(match)
      .populate([
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
