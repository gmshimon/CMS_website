import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  assignReviewer,
  changeAbstractStatus,
  fetchReviewStats,
  getAbstractsByCategory,
  sendReminderToReviewer
} from '../Redux/Slice/ReviewSlice'

const useReview = (category = 'all') => {
  const { selectedConference } = useSelector(state => state.conference)
  const { assigningReviewerSuccess } = useSelector(state => state.review)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getAbstractsByCategory({
        category,
        conferenceId: sessionStorage.getItem('selectedConference')
          ? sessionStorage.getItem('selectedConference')
          : selectedConference
      })
    )
    dispatch(
      fetchReviewStats(
        sessionStorage.getItem('selectedConference')
          ? sessionStorage.getItem('selectedConference')
          : selectedConference
      )
    )
  }, [category, dispatch, assigningReviewerSuccess, selectedConference])

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

  const handleChangeStatusOfAbstract = (id, data) => {
    dispatch(changeAbstractStatus({ id: id, ...data }))
  }

  return {
    handleInviteReview,
    handleSendReminder,
    handleChangeStatusOfAbstract
  }
}

export default useReview
