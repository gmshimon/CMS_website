import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSchedules } from '../Redux/Slice/ScheduleSlice'
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
}

export default useScheduling
