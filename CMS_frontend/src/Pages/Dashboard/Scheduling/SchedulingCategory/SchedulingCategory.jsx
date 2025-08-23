import React, { useState } from 'react'
import { useParams } from 'react-router'
import useScheduling from '../../../../Hooks/useScheduling'
import ScheduleModal from '../../../../Component/ScheduleModal/ScheduleModal'
import { useSelector } from 'react-redux'

const SchedulingCategory = () => {
    const {session_chairs,moderators} = useSelector(state=>state.user)
  const { conferences } = useSelector(state => state.conference)
  const { schedules } = useSelector(state => state.schedule)
  const [modalOpen, setModalOpen] = useState(false)
  const { category } = useParams()
  useScheduling(category)

  const handleCreateSchedule = data => {
    console.log('Schedule Data:', data)
    setModalOpen(false)
    // dispatch(createSchedule(data)) // connect to Redux thunk
  }

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Create Schedule
      </button>

      <ScheduleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        conferences={conferences}
        onSubmit={handleCreateSchedule}
        session_chairs={session_chairs}
        moderators={moderators}
      />

      {/* Render schedules */}
      <div>
        {schedules.map(s => (
          <div key={s._id}>
            {s.day} - {s.session} ({s.startTime} - {s.endTime})
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchedulingCategory
