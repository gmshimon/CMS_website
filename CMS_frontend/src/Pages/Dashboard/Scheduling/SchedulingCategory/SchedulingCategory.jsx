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
import EditScheduleModal from '../../../../Component/EditScheduleModal/EditScheduleModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SchedulingCategory = () => {
  const {user} = useSelector(state=>state.user)
  const { unscheduleAbstract } = useSelector(state => state.abstract)
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
    deleteScheduleError,
    updateScheduleLoading,
    updateScheduleSuccess,
    updateScheduleError,
    getScheduleLoading
  } = useSelector(state => state.schedule)

  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState(null)

  const { category } = useParams()
  const { handleCreateSchedule, handleDeleteSchedule, handleEditSchedule } =
    useScheduling(category)

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
    if (updateScheduleSuccess) {
      showSuccessToast('Successfully updated the schedule')
      dispatch(reset())
    }
    if (updateScheduleError) {
      showErrorToast('Something went wrong')
      dispatch(reset())
    }
  }, [
    createScheduleError,
    createScheduleSuccess,
    deleteScheduleError,
    deleteScheduleSuccess,
    dispatch,
    updateScheduleError,
    updateScheduleSuccess
  ])
  if (
    getChairsAndModeratorsLoading ||
    updateScheduleLoading ||
    createScheduleLoading ||
    deleteScheduleLoading ||
    getScheduleLoading
  ) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
        <ToastContainer />
        <Loading />
      </div>
    )
  }

  const columns = getScheduleColumns()

  return (
    <div>
      <ToastContainer />
      {
        user?.role=="Admin" &&<button
        onClick={() => {
          setModalOpen(true)
          setSelectedSchedule(null)
        }}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-lg transition duration-300 mb-2'
      >
        + Create Schedule
      </button>
      }

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

      <EditScheduleModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSchedule}
        session_chairs={session_chairs}
        moderators={moderators}
        abstracts={unscheduleAbstract}
        abstractType={decodeMethod(category)}
        selectedConference={
          selectedConference !== 'all' ? selectedConference : null
        }
        schedule={selectedSchedule}
      />

      <ScheduleTable
        columns={columns}
        data={schedules}
        onDelete={handleDeleteSchedule}
        onEdit={data => {
          setEditModalOpen(true)
          setSelectedSchedule(data)
        }}
        admin={user?.role=="Admin"}
      />
    </div>
  )
}

export default SchedulingCategory
