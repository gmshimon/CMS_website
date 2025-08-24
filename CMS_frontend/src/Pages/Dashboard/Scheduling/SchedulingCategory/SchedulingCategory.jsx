import React, { useState } from 'react'
import { useParams } from 'react-router'
import useScheduling from '../../../../Hooks/useScheduling'
import ScheduleModal from '../../../../Component/ScheduleModal/ScheduleModal'
import { useSelector } from 'react-redux'
import Loading from '../../../../Component/Loading/Loading'
import decodeMethod from '../../../../Utilis/decodeMethod'

const SchedulingCategory = () => {
  const { unscheduleAbstract, updateScheduleLoading } = useSelector(
    state => state.abstract
  )
  const { session_chairs, moderators, getChairsAndModeratorsLoading } =
    useSelector(state => state.user)
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

  if (getChairsAndModeratorsLoading || updateScheduleLoading) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
        <Loading />
      </div>
    )
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
        abstracts={unscheduleAbstract}
        abstractType = {decodeMethod(category)}
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
