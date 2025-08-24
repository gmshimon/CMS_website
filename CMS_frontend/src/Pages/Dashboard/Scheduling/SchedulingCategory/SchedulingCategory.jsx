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
    createScheduleSuccess,
    deleteScheduleLoading,
    deleteScheduleSuccess,
    deleteScheduleError
  } = useSelector(state => state.schedule)

  const [modalOpen, setModalOpen] = useState(false)
  const { category } = useParams()
  const { handleCreateSchedule, handleDeleteSchedule } = useScheduling(category)

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
    if (deleteScheduleSuccess) {
      showSuccessToast('Successfully Schedule deleted')
      dispatch(reset())
    }
    if (deleteScheduleError) {
      showErrorToast('Something went wrong')
      dispatch(reset())
    }
  }, [
    createScheduleError,
    createScheduleSuccess,
    deleteScheduleError,
    deleteScheduleSuccess,
    dispatch
  ])

  if (
    getChairsAndModeratorsLoading ||
    updateScheduleLoading ||
    createScheduleLoading ||
    deleteScheduleLoading
  ) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
        <Loading />
      </div>
    )
  }

  const columns = getScheduleColumns(
    category.includes('physical') ? 'physical' : 'online'
  )

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
      <ScheduleTable
        columns={columns}
        data={schedules}
        onDelete={handleDeleteSchedule}
      />
    </div>
  )
}

export default SchedulingCategory
