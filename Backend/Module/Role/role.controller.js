import role from './role.model.js'

export const getRole = async (req, res, next) => {
  try {
    const allowedRoles = ['Attendee', 'Presenter', 'Reviewer', 'Session Chair']
    const data = await role.find({ value: { $in: allowedRoles } })
    res.status(200).json({
      status: 'success',
      message: 'fetched the role successfully',
      data: data
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to get role'
    })
  }
}
