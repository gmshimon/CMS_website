import React, { useState } from 'react'

const ScheduleModal = ({
  isOpen,
  onClose,
  onSubmit,
  conferences = [],
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
    abstractType: 'Paper Presentation Online',
    abstracts: [],
    sessionChair: '',
    moderator: '',
    meetingLink: '',
    venue: { building: '', hall: '', room: '' }
  })

  const handleChange = e => {
    const { name, value, type, selectedOptions } = e.target
    if (name === 'abstracts') {
      const values = Array.from(selectedOptions, option => option.value)
      setFormData(prev => ({ ...prev, abstracts: values }))
    } else if (name.startsWith('venue.')) {
      const key = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        venue: { ...prev.venue, [key]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!isOpen) return null

  const isOnline = formData.abstractType.includes('Online')

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative'>
        <h2 className='text-xl font-semibold mb-4'>Create Schedule</h2>

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
        >
          {/* Conference */}
          <div>
            <label className='block mb-1 font-medium'>Conference</label>
            <select
              name='conference'
              value={formData.conference}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
              required
            >
              <option value=''>Select Conference</option>
              {conferences.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Abstract Type */}
          <div>
            <label className='block mb-1 font-medium'>Abstract Type</label>
            <select
              name='abstractType'
              value={formData.abstractType}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
              required
            >
              <option>Paper Presentation Online</option>
              <option>Paper Presentation Physical</option>
              <option>Poster Presentation Online</option>
              <option>Poster Presentation Physical</option>
            </select>
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
              required
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
              className='w-full border rounded px-3 py-2'
              required
            />
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
              required
            />
          </div>

          {/* Track */}
          {/* <div>
            <label className="block mb-1 font-medium">Track</label>
            <input
              type="text"
              name="track"
              value={formData.track}
              onChange={handleChange}
              placeholder="Computer Science"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div> */}

          {/* SubTrack */}
          {/* <div>
            <label className="block mb-1 font-medium">SubTrack</label>
            <input
              type="text"
              name="subTrack"
              value={formData.subTrack}
              onChange={handleChange}
              placeholder="Artificial Intelligence"
              className="w-full border rounded px-3 py-2"
            />
          </div> */}

          {/* Start Time */}
          <div>
            <label className='block mb-1 font-medium'>Start Time</label>
            <input
              type='time'
              name='startTime'
              value={formData.startTime}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className='block mb-1 font-medium'>End Time</label>
            <input
              type='time'
              name='endTime'
              value={formData.endTime}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
              required
            />
          </div>

          {/* Abstracts */}
          <div>
            <label className='block mb-1 font-medium'>Abstracts</label>
            <select
              name='abstracts'
              multiple
              value={formData.abstracts}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2 h-28'
            >
              {abstracts.map(a => (
                <option key={a._id} value={a._id}>
                  {a.title}
                </option>
              ))}
            </select>
          </div>

          {/* Session Chair */}
          <div>
            <label className='block mb-1 font-medium'>Session Chair</label>
            <select
              name='sessionChair'
              value={formData.sessionChair}
              onChange={handleChange}
              className='w-full border rounded px-3 py-2'
              required
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

          {/* Conditional Fields */}
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
                required
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
                  required
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
                  required
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
                  required
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScheduleModal
