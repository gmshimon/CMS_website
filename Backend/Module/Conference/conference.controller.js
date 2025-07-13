import conference from './conference.model.js'

export const createConference = async (req, res, next) => {
  try {
    const data = req.body
    const { _id } = req.user
    data.createdBy = _id
    const response = await conference.create(data)

    res.status(200).json({
      status: 200,
      message: 'New Conference created',
      data: response
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getConference = async (req, res, next) => {
  try {
    const data = await conference.find({}).lean()

    res.status(200).json({
      status: 'success',
      message: 'Successfully fetched the data',
      data: data
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const getSingleConference = async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await conference.findOne({ _id: id }).lean()

    res.status(200).json({
      status: 'Success',
      message: 'Successfully received the single conference',
      data: data
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const updateConference = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const existingConference = await conference.findById(id)
    if (!existingConference) {
      throw new NotFoundError('Conference not found')
    }

    const updatedConference = await conference.findByIdAndUpdate(id, {
      $set: updateData
    })

    res.status(200).json({
      success: true,
      message: 'Conference updated successfully',
      data: updatedConference
    })
  } catch (error) {
    res.status(200).json({
      status:'success',
      message:error.message
    })
  }
}
