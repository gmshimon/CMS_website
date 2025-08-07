import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeAbstractDecision,
  getAbstractByCategory,
  updateAbstract,
  updatePaymentStatus
} from '../Redux/Slice/AbstractSlice'

const useSubmissions = (method = null) => {
  const { selectedConference } = useSelector(state => state.conference)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getAbstractByCategory({
        presentation_method:
          method == 'physical-paper'
            ? 'Paper Presentation Physical'
            : method === 'online-paper'
            ? 'Paper Presentation Online'
            : method == 'physical-poster'
            ? 'Poster Presentation Physical'
            : method === 'online-poster'
            ? 'Poster Presentation Online'
            : null,
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
    console.log('Updated Data:', updatedData)
    dispatch(updatePaymentStatus({ id: abstractId, data: updatedData }))
  }

  return {
    handleAbstractDecision,
    handleEditSubmission,
    handlePaymentDecision
  }
}

export default useSubmissions
