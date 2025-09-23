import role from './role.model.js'

export const getRole = async (req, res, next) => {
  try {
    const allowedRoles = ['Presenter','Attendee',  'Reviewer', 'Session Chair']
    const data = await role.find({ value: { $in: allowedRoles } }).sort({ _id: 1 })
    res.status(200).json({
      status: 'success',
      message: 'fetched the role successfully',
      data: data
    })
    console.log(
      data
    )
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to get role'
    })
  }
}
