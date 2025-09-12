import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleConference } from '../Redux/Slice/conferenceSlice'
import {
  getConferenceRegs,
  uploadPaymentReceipt
} from '../Redux/Slice/conference_regSlice'

const useConferece_reg = (page, limit, searchQuery) => {
  const { selectedConference } = useSelector(state => state.conference)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSingleConference(selectedConference))
    if (selectedConference) {
      dispatch(
        getConferenceRegs({
          conferenceId: selectedConference,
          page,
          limit,
          search: searchQuery
        })
      )
    }
  }, [dispatch, limit, page, searchQuery, selectedConference])

  const handleSubmitReceipt = (id, file) => {
    const formData = new FormData()
    formData.append('file', file)
    dispatch(
      uploadPaymentReceipt({
        id,
        data: formData
      })
    )
  }
  return {
    handleSubmitReceipt
  }
}

export default useConferece_reg
