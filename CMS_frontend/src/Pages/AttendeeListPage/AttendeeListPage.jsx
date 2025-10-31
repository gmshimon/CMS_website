import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Conference_reg_modal from '../../Component/Conference_reg_modal/Conference_reg_modal'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorToast, showSuccessToast } from '../../Utilis/toastUtils'
import { reset } from '../../Redux/Slice/conference_regSlice'
import Loading from '../../Component/Loading/Loading'
import ConferenceListTable from '../../Component/ConferenceListTable/ConferenceListTable'
import useConferece_reg from '../../Hooks/useConferece_reg'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

const AttendeeListPage = () => {
  const {
    createConferenceRegSuccess,
    createConferenceRegLoading,
    getConferenceRegLoading,
    createConferenceRegError,
    errorMessage,
    conference_regs,
    pagination
  } = useSelector(state => state.conferenceReg)

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch()

  useConferece_reg(currentPage, 10, searchQuery)
  useEffect(() => {
    if (createConferenceRegSuccess) {
      showSuccessToast('Successfully registered the conference')
      dispatch(reset())
    }
    if (createConferenceRegError) {
      showErrorToast(errorMessage || 'Something went wrong')
      dispatch(reset())
    }
  }, [
    dispatch,
    errorMessage,
    createConferenceRegError,
    createConferenceRegSuccess
  ])

  if (createConferenceRegLoading || getConferenceRegLoading) {
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
            placeholder='Search abstracts...'
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // reset to first page when search changes
            }}
            className='w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className='px-2 py-2 flex items-center text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 mr-2'
          >
            New Registration <FaPlus />
          </button>
        </div>
      </div>

      <ConferenceListTable data={conference_regs} />

      {openModal && (
        <Conference_reg_modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      <div className='px-4 py-3 border-t border-gray-200'>
        <ResponsivePagination
          current={currentPage}
          total={pagination?.totalPages}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}

export default AttendeeListPage
