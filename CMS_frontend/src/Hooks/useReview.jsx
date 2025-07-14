import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewStats } from '../Redux/Slice/ReviewSlice'

const useReview = () => {
    const { selectedYear } = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReviewStats(selectedYear))
  }, [dispatch, selectedYear])
}

export default useReview
