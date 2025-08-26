import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createSchedule,
  deleteSchedule,
  getAllSchedules
} from '../Redux/Slice/ScheduleSlice'
import { getChairsAndModerators } from '../Redux/Slice/AuthSlice'
import { getUnscheduledAbstracts } from '../Redux/Slice/AbstractSlice'
import decodeMethod from '../Utilis/decodeMethod'

const useScheduling = (method = null) => {
  const { selectedConference } = useSelector(state => state.conference)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getUnscheduledAbstracts({
        conference_id: selectedConference,
        presentation_method: decodeMethod(method)
      })
    )

    dispatch(getChairsAndModerators())
    dispatch(
      getAllSchedules({
        abstractType: decodeMethod(method),
        conference_id: selectedConference
      })
    )
  }, [dispatch, method, selectedConference])

  const handleCreateSchedule = data => {
    dispatch(createSchedule(data))
  }

  const handleDeleteSchedule = id => {
    dispatch(deleteSchedule(id))
  }

  const handleEditSchedule = (id,data)=>{
    console.log({
      id,data
    })
  }

  return { handleCreateSchedule, handleDeleteSchedule ,handleEditSchedule}
}

export default useScheduling
