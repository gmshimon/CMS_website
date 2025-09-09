import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleConference } from '../Redux/Slice/conferenceSlice'
import {
  getConferenceRegs,
  uploadPaymentReceipt
} from '../Redux/Slice/conference_regSlice'

const useConferece_reg = () => {
  const { selectedConference } = useSelector(state => state.conference)
  const dispatch = useDispatch()
  useEffect(() => {
    if (selectedConference) {
      dispatch(getSingleConference(selectedConference))
      dispatch(getConferenceRegs(selectedConference))
    }
  }, [dispatch, selectedConference])

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
