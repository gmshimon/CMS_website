import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ConferenceListTable from '../../Component/ConferenceListTable/ConferenceListTable'
import { useDispatch, useSelector } from 'react-redux'
import useConferece_reg from '../../Hooks/useConferece_reg'
import Loading from '../../Component/Loading/Loading'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import PaymentDecisionModal from '../../Component/PaymentDecisionModal/PaymentDecisionModal'
import { showErrorToast, showSuccessToast } from '../../Utilis/toastUtils'
import { reset } from '../../Redux/Slice/conference_regSlice'

const AdminAttendeeList = () => {
  const {
    createConferenceRegLoading,
    getConferenceRegLoading,
    updatePaymentDecisionLoading,
    updatePaymentDecisionSuccess,
    updatePaymentDecisionError,
    errorMessage,
    conference_regs,
    pagination
  } = useSelector(state => state.conferenceReg)
  const {user} = useSelector(state=>state.user)

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDecisionModal, setShowDecisionModal] = useState(false)
  const [selectedConference, setSelectedConference] = useState(null)

  const dispatch = useDispatch()
  const { handlePaymentDecision } = useConferece_reg(
    currentPage,
    10,
    searchQuery
  )

  useEffect(() => {
    if (updatePaymentDecisionSuccess) {
      console.log(updatePaymentDecisionSuccess)
      showSuccessToast('Successful')
      dispatch(reset())
    }
    if (updatePaymentDecisionError) {
      showErrorToast(errorMessage || 'Something went wrong')
      dispatch(reset())
    }
  }, [
    dispatch,
    errorMessage,
    updatePaymentDecisionError,
    updatePaymentDecisionSuccess
  ])

  if (
    createConferenceRegLoading ||
    getConferenceRegLoading ||
    updatePaymentDecisionLoading
  ) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-112px)]'>
        <ToastContainer />
        <Loading />
      </div>
    )
  }

  return (
    <div className='p-3 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <ToastContainer />
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Attendee List</h2>
      <div className='flex flex-col md:flex-row items-center mb-4 '>
        <div className='flex flex-col md:flex-row gap-4 mr-4'>
          <input
            type='text'
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // reset to first page when search changes
            }}
            className='w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
      </div>

      <ConferenceListTable
        data={conference_regs}
        abstract_title={true}
        admin={user?.role==='Admin'}
        handleOpenPaymentDecision={item => {
          setSelectedConference(item)
          setShowDecisionModal(true)
        }}
      />

      <div className='px-4 py-3 border-t border-gray-200'>
        <ResponsivePagination
          current={currentPage}
          total={pagination?.totalPages}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>

      <PaymentDecisionModal
        isOpen={showDecisionModal}
        onClose={() => setShowDecisionModal(false)}
        onSubmit={({ decision, invoiceFile }) => {
          setShowDecisionModal(false)
          setSelectedConference(null)
          handlePaymentDecision(selectedConference._id, {
            decision,
            invoiceFile
          })
        }}
      />
    </div>
  )
}

export default AdminAttendeeList
