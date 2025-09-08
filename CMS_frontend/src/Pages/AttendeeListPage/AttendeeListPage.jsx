import { formatDate } from 'date-fns'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Conference_reg_modal from '../../Component/Conference_reg_modal/Conference_reg_modal'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleConference } from '../../Redux/Slice/conferenceSlice'
import { showErrorToast, showSuccessToast } from '../../Utilis/toastUtils'
import { getConferenceRegs, reset } from '../../Redux/Slice/conference_regSlice'
import Loading from '../../Component/Loading/Loading'
import { MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { IoMdEye } from 'react-icons/io'

const AttendeeListPage = () => {
  const {
    createConferenceRegSuccess,
    createConferenceRegLoading,
    getConferenceRegLoading,
    createConferenceRegError,
    errorMessage,
    conference_regs
  } = useSelector(state => state.conferenceReg)
  const { selectedConference } = useSelector(state => state.conference)
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()

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

  useEffect(() => {
    if (selectedConference) {
      dispatch(getSingleConference(selectedConference))
    }

    dispatch(getConferenceRegs(selectedConference))
  }, [dispatch, selectedConference])

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
            // value={searchQuery}
            // onChange={e => setSearchQuery(e.target.value)}
            className='w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className='btn btn-active btn-primary'
          >
            New Registration <FaPlus />
          </button>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto h-[400px] overflow-y-auto'>
          <table className='min-w-full divide-y divide-gray-200 table-zebra'>
            <thead className='bg-slate-500'>
              <tr>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Abstract ID/Ref ID
                </th>
                
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Date
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Location
                </th>

                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Presenter
                </th>

                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {conference_regs?.map((conference, index) => (
                <tr key={index}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {conference?.abstract?.abstract_id ||
                        conference._id}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {formatDate(
                        new Date(conference.conference.startingDate),
                        'PPP'
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      <div className='flex items-center gap-2'>
                        <MapPin className='text-green-500' size={16} />
                        <div className='text-sm'>
                          <div className='font-medium'>
                            {conference.conference.city},{' '}
                            {conference.conference.country}
                          </div>
                          <div className='text-gray-600'>
                            {conference.conference.venue}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {conference.presenterName}
                    </div>
                  </td>

                  <td className='px-10  whitespace-nowrap text-sm text-gray-500'>
                    <Link to={`/admin/conference/${conference?._id}`}>
                      <button className='cursor-pointer hover:text-blue-500'>
                        <IoMdEye className='text-xl' />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='px-4 py-3 border-t border-gray-200'>
          {/* <ResponsivePagination
                      current={currentPage}
                      total={totalPages}
                      onPageChange={setCurrentPage}
                    /> */}
        </div>
      </div>

      {openModal && (
        <Conference_reg_modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  )
}

export default AttendeeListPage
