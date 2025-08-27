import { useState, useEffect } from 'react'

const EditScheduleModal = ({
  isOpen,
  onClose,
  onSubmit,
  schedule, // 👈 existing schedule to edit
  session_chairs = [],
  moderators = [],
  abstracts = []
}) => {
  const [formData, setFormData] = useState({
    conference: '',
    day: '',
    date: '',
    session: '',
    startTime: '',
    endTime: '',
    abstractType: '',
    abstracts: [],
    sessionChair: '',
    moderator: '',
    meetingLink: '',
    venue: { building: '', hall: '', room: '' }
  })
  const [errors, setErrors] = useState({})
  // preload schedule data when modal opens
  useEffect(() => {
    if (schedule) {
      setFormData({
        conference: schedule.conference?._id || '',
        day: schedule.day || '',
        date: schedule.date?.slice(0, 10) || '', // in case it's an ISO date
        session: schedule.session || '',
        startTime: schedule.startTime || '',
        endTime: schedule.endTime || '',
        abstractType: schedule.abstractType || '',
        abstracts: schedule?.abstracts?.map(a => a._id) || [],
        sessionChair: schedule.sessionChair?._id || '',
        moderator: schedule.moderator?._id || '',
        meetingLink: schedule.meetingLink || '',
        venue: {
          building: schedule.venue?.building || '',
          hall: schedule.venue?.hall || '',
          room: schedule.venue?.room || ''
        }
      })
    }
  }, [schedule])

  const handleChange = e => {
    const { name, value } = e.target
    if (name.startsWith('venue.')) {
      const key = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        venue: { ...prev.venue, [key]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleCheckboxChange = (e, id) => {
    const { checked } = e.target
    setFormData(prev => ({
      ...prev,
      abstracts: checked
        ? [...prev.abstracts, id]
        : prev.abstracts.filter(v => v !== id)
    }))
  }

  const validateForm = () => {
    let newErrors = {}

    if (!formData.conference) newErrors.conference = 'Conference is required.'
    if (formData.abstracts.length === 0)
      newErrors.abstracts = 'Please select at least one abstract.'
    if (!formData.date) newErrors.date = 'Date is required.'
    if (!formData.startTime) newErrors.startTime = 'Start time is required.'
    if (!formData.endTime) newErrors.endTime = 'End time is required.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!validateForm()) return
    onSubmit(schedule?._id, formData) // parent handles API call
    onClose()
  }

  if (!isOpen) return null

  const isOnline = formData.abstractType.includes('Online')

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative'>
        <h2 className='text-xl font-semibold mb-4'>Edit Schedule</h2>

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
        >
          {/* Conference */}
          <div>
            <label className='block mb-1 font-medium'>Conference</label>
            <div className='w-full border rounded px-3 py-2'>
              {schedule.conference.name}
            </div>
          </div>

          {/* Abstract Type */}
          <div>
            <label className='block mb-1 font-medium'>Abstract Type</label>
            <div className='w-full border rounded px-3 py-2'>
              {schedule.abstractType}
            </div>
          </div>

          {/* Day */}
          <div>
            <label className='block mb-1 font-medium'>Day</label>
            <input
              type='text'
              name='day'
              value={formData.day}
              onChange={handleChange}
              placeholder='Day 1'
              className='w-full border rounded px-3 py-2'
            />
          </div>

          {/* Date */}
          <div>
            <label className='block mb-1 font-medium'>Date</label>
            <input
              type='date'
              name='date'
              value={formData.date}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.date ? 'border-red-500' : ''
              }`}
            />
            {errors.date && (
              <p className='text-red-500 text-xs mt-1'>{errors.date}</p>
            )}
          </div>

          {/* Session */}
          <div>
            <label className='block mb-1 font-medium'>Session</label>
            <input
              type='text'
              name='session'
              value={formData.session}
              onChange={handleChange}
              placeholder='Session 1'
              className='w-full border rounded px-3 py-2'
            />
          </div>

          {/* Start Time */}
          <div>
            <label className='block mb-1 font-medium'>Start Time</label>
            <input
              type='time'
              name='startTime'
              value={formData.startTime}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.startTime ? 'border-red-500' : ''
              }`}
            />
            {errors.startTime && (
              <p className='text-red-500 text-xs mt-1'>{errors.startTime}</p>
            )}
          </div>

          {/* End Time */}
          <div>
            <label className='block mb-1 font-medium'>End Time</label>
            <input
              type='time'
              name='endTime'
              value={formData.endTime}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                errors.endTime ? 'border-red-500' : ''
              }`}
            />
            {errors.endTime && (
              <p className='text-red-500 text-xs mt-1'>{errors.endTime}</p>
            )}
          </div>

          {/* Abstracts */}
          <div className='col-span-2'>
            <label className='block mb-1 font-medium'>Abstracts</label>
            <div
              className={`border rounded px-3 py-2 h-28 overflow-y-auto ${
                errors.abstracts ? 'border-red-500' : ''
              }`}
            >
              {[...abstracts,...schedule.abstracts]?.map(a => (
                <label key={a._id} className='flex items-center gap-2 mb-1'>
                  <input
                    type='checkbox'
                    checked={formData.abstracts.includes(a._id)}
                    onChange={e => handleCheckboxChange(e, a._id)}
                    disabled={a.review_status === 'Pending'}
                  />
                  <span>
                    {a.paper_title} —{' '}
                    {a.review_status === 'Pending' ? '⏳ Pending' : '✅ Done'}
                  </span>
                </label>
              ))}
            </div>
            {errors.abstracts && (
              <p className='text-red-500 text-xs mt-1'>{errors.abstracts}</p>
            )}
          </div>

          {/* Session Chair */}
          <div>
            <label className='block mb-1 font-medium'>Session Chair</label>
            <select
              name='sessionChair'
              value={formData.sessionChair}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
            >
              <option value=''>Select Chair</option>
              {session_chairs?.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Moderator */}
          <div>
            <label className='block mb-1 font-medium'>Moderator</label>
            <select
              name='moderator'
              value={formData.moderator}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
            >
              <option value=''>Select Moderator</option>
              {moderators?.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional fields */}
          {isOnline ? (
            <div>
              <label className='block mb-1 font-medium'>Meeting Link</label>
              <input
                type='text'
                name='meetingLink'
                value={formData.meetingLink}
                onChange={handleChange}
                placeholder='https://zoom.us/...'
                className='w-full border rounded px-3 py-2'
              />
            </div>
          ) : (
            <>
              <div>
                <label className='block mb-1 font-medium'>Building</label>
                <input
                  type='text'
                  name='venue.building'
                  value={formData.venue.building}
                  onChange={handleChange}
                  className='w-full border rounded px-3 py-2'
                />
              </div>
              <div>
                <label className='block mb-1 font-medium'>Hall</label>
                <input
                  type='text'
                  name='venue.hall'
                  value={formData.venue.hall}
                  onChange={handleChange}
                  className='w-full border rounded px-3 py-2'
                />
              </div>
              <div>
                <label className='block mb-1 font-medium'>Room</label>
                <input
                  type='text'
                  name='venue.room'
                  value={formData.venue.room}
                  onChange={handleChange}
                  className='w-full border rounded px-3 py-2'
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <div className='col-span-2 flex justify-end gap-2 mt-3'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditScheduleModal
