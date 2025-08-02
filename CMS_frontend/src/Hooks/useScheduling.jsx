import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPresentationMethodStats } from '../Redux/Slice/AdminSlice'

const useScheduling = () => {
  const { selectedYear } = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPresentationMethodStats(selectedYear))
  }, [])
}

export default useScheduling
