import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSchedules } from '../Redux/Slice/ScheduleSlice'
import { getChairsAndModerators } from '../Redux/Slice/AuthSlice'

const useScheduling = (method = null) => {
  const { selectedConference } = useSelector(state => state.conference)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChairsAndModerators())
    dispatch(
      getAllSchedules({
        abstractType:
          method == 'physical-paper'
            ? 'Paper Presentation Physical'
            : method === 'online-paper'
            ? 'Paper Presentation Online'
            : method == 'physical-poster'
            ? 'Poster Presentation Physical'
            : method === 'online-poster'
            ? 'Poster Presentation Online'
            : null,
        conference_id: selectedConference
      })
    )
  }, [dispatch, method, selectedConference])
}

export default useScheduling
