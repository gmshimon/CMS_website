import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeAbstractDecision,
  getAbstractByCategory,
  sendPaperSubmitReminder,
  sendPaymentReminder,
  updateAbstract,
  updatePaymentStatus
} from '../Redux/Slice/AbstractSlice'
import decodeMethod from '../Utilis/decodeMethod'

const useSubmissions = (method = null) => {
  const { selectedConference } = useSelector(state => state.conference)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getAbstractByCategory({
        presentation_method: decodeMethod(method),
        conference_id: selectedConference
      })
    )
  }, [dispatch, method, selectedConference])

  const handleAbstractDecision = (abstractId, decision) => {
    dispatch(changeAbstractDecision({ id: abstractId, status: decision }))
  }

  const handleEditSubmission = (abstractId, updatedData) => {
    dispatch(updateAbstract({ id: abstractId, data: updatedData }))
  }

  const handlePaymentDecision = (abstractId, paymentStatus) => {
    const updatedData = {
      payment_status: paymentStatus
    }
    dispatch(updatePaymentStatus({ id: abstractId, data: updatedData }))
  }

  const handlePaymentReminder = id => {
    dispatch(sendPaymentReminder(id))
  }

  const handlePaperSubmitReminder = id => {
    dispatch(sendPaperSubmitReminder(id))
  }
  return {
    handleAbstractDecision,
    handleEditSubmission,
    handlePaymentDecision,
    handlePaymentReminder,
    handlePaperSubmitReminder
  }
}

export default useSubmissions
