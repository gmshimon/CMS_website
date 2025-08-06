import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAbstract } from '../Redux/Slice/AbstractSlice'
import { getSingleConference } from '../Redux/Slice/conferenceSlice'

const useAbstract = ({ payment_status=null }={}) => {
  const { createPostPaperSuccess } = useSelector(state => state.paper)
  const { selectedConference } = useSelector(state => state.conference)
  const dispatch = useDispatch()
  useEffect(() => {
    if (selectedConference) {
      dispatch(getAbstract({ id: selectedConference, payment_status }))
      dispatch(getSingleConference(selectedConference))
    }
  }, [dispatch, selectedConference, createPostPaperSuccess, payment_status])
}

export default useAbstract
