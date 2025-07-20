import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyReviewStats } from '../Redux/Slice/ReviewSlice'
import { FaUserPlus, FaClipboardList, FaCheckDouble } from 'react-icons/fa'
import { MdOutlineAssignmentLate } from 'react-icons/md'

const useReviewerHome = () => {
  const { myReviewStat } = useSelector(state => state.review)
  const { selectedConference } = useSelector(state => state.conference)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyReviewStats(selectedConference))
  }, [dispatch, selectedConference])

  const reviewActions = [
    {
      title: 'New Reviewer Invitations',
      path: '/admin/reviewer-invitations',
      icon: FaUserPlus,
      color: 'bg-yellow-50 hover:bg-yellow-100',
      stat: `${myReviewStat.pending || 0} Invited`,
      description: 'Manage and track new reviewer invitations'
    },
    {
      title: 'Pending Assignments',
      path: '/admin/pending-assignments',
      icon: FaClipboardList,
      color: 'bg-blue-50 hover:bg-blue-100',
      stat: `${myReviewStat.accepted || 0} Pending`,
      description: 'Assign reviewers and manage pending reviews'
    },
    {
      title: 'Completed Assignments',
      path: '/admin/completed-assignments',
      icon: FaCheckDouble,
      color: 'bg-green-50 hover:bg-green-100',
      stat: `${myReviewStat.reviewed || 0} Reviewed`,
      description: 'View all completed reviewer assignments'
    },
    {
      title: 'Overdue Review',
      path: '/admin/review-reports',
      icon: MdOutlineAssignmentLate,
      color: 'bg-purple-50 hover:bg-purple-100',
      stat: `${myReviewStat.overdue || 0}`,
      description: 'Access reviewer performance and analytics'
    }
  ]

  return {
    reviewActions
  }
}

export default useReviewerHome
