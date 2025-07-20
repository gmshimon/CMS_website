import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  assignReviewer,
  fetchReviewStats,
  getAbstractsByCategory,
  sendReminderToReviewer
} from '../Redux/Slice/ReviewSlice'

const useReview = (category = 'all') => {
  const { assigningReviewerSuccess } = useSelector(state => state.review)
  const { selectedYear } = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAbstractsByCategory({ category }))
    dispatch(fetchReviewStats(selectedYear))
  }, [category, dispatch, selectedYear, assigningReviewerSuccess])

  const handleInviteReview = data => {
    dispatch(assignReviewer(data))
  }

  const handleSendReminder = id => {
    dispatch(
      sendReminderToReviewer({
        reviewId: id
      })
    )
  }

  return {
    handleInviteReview,
    handleSendReminder
  }
}

export default useReview
