import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAbstract } from '../Redux/Slice/AbstractSlice'
import { getSingleConference } from '../Redux/Slice/conferenceSlice'

const useAbstract = ({
  payment_status = null,
  page = 1,
  limit = 10,
  searchQuery,
  currentConference
} = {}) => {
  const { createPostPaperSuccess } = useSelector(state => state.paper)
  const { selectedConference } = useSelector(state => state.conference)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getAbstract({
        id: sessionStorage.getItem('selectedConference')
          ? sessionStorage.getItem('selectedConference')
          : selectedConference,
        payment_status,
        page: page,
        limit: limit,
        search: searchQuery
      })
    )
    if (currentConference) {
      dispatch(getSingleConference(currentConference))
    }
  }, [
    dispatch,
    selectedConference,
    createPostPaperSuccess,
    payment_status,
    page,
    limit,
    searchQuery,
    currentConference
  ])
}

export default useAbstract
