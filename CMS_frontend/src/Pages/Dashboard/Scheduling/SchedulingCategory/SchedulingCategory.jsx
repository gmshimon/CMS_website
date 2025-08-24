import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useScheduling from '../../../../Hooks/useScheduling'
import ScheduleModal from '../../../../Component/ScheduleModal/ScheduleModal'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../../Component/Loading/Loading'
import decodeMethod from '../../../../Utilis/decodeMethod'
import { getScheduleColumns } from '../../../../Utilis/useScheduleColumn'
import ScheduleTable from '../../../../Component/ScheduleTable/ScheduleTable'
import { showErrorToast, showSuccessToast } from '../../../../Utilis/toastUtils'
import { reset } from '../../../../Redux/Slice/ScheduleSlice'

const SchedulingCategory = () => {
  const { unscheduleAbstract, updateScheduleLoading } = useSelector(
    state => state.abstract
  )
  const { session_chairs, moderators, getChairsAndModeratorsLoading } =
    useSelector(state => state.user)
  const { conferences, selectedConference } = useSelector(
    state => state.conference
  )
  const {
    schedules,
    createScheduleLoading,
    createScheduleError,
    createScheduleSuccess
  } = useSelector(state => state.schedule)

  const [modalOpen, setModalOpen] = useState(false)
  const { category } = useParams()
  const { handleCreateSchedule } = useScheduling(category)

  const dispatch = useDispatch()

  useEffect(() => {
    if (createScheduleSuccess) {
      showSuccessToast('Successfully Schedule created')
      dispatch(reset())
    }
    if (createScheduleError) {
      showErrorToast('Something went wrong')
      dispatch(reset())
    }
  }, [createScheduleError, createScheduleSuccess, dispatch])

  if (
    getChairsAndModeratorsLoading ||
    updateScheduleLoading ||
    createScheduleLoading
  ) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
        <Loading />
      </div>
    )
  }

  const columns = getScheduleColumns('physical')
  const data = [
    {
      day: 'Monday',
      date: '2025-09-01',
      session: 'Keynote',
      startTime: '09:00',
      endTime: '10:00',
      moderator: 'Dr. Rahman',
      session_chair: 'Prof. Akter',
      abstractList: 'Abstract 1, Abstract 2',
      conference: 'ICSE 2025',
      building: 'Main Block',
      hall: 'Hall A',
      room: '101'
    },
    {
      day: 'Tuesday',
      date: '2025-09-02',
      session: 'Online Workshop',
      startTime: '14:00',
      endTime: '16:00',
      moderator: 'Dr. Smith',
      session_chair: 'Prof. Müller',
      abstractList: 'Abstract 5',
      conference: 'ICSE 2025',
      meetingLink: 'https://zoom.us/j/123456789'
    }
  ]
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-lg transition duration-300 mb-2'
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
        abstractType={decodeMethod(category)}
        selectedConference={
          selectedConference !== 'all' ? selectedConference : null
        }
      />
      <ScheduleTable columns={columns} data={data} />
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
