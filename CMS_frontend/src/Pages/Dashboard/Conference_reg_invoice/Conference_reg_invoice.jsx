import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useConferece_reg from '../../../Hooks/useConferece_reg'
import PaymentModal from '../../../Component/PaymentModal/PaymentModal'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import Loading from '../../../Component/Loading/Loading'
import { showErrorToast, showSuccessToast } from '../../../Utilis/toastUtils'
import { reset } from '../../../Redux/Slice/conference_regSlice'
import { IoMdEye } from 'react-icons/io'
const Conference_reg_invoice = () => {
  const {
    createConferenceRegLoading,
    getConferenceRegLoading,
    createConferenceRegSuccess,
    createConferenceRegError,
    errorMessage,
    conference_regs
  } = useSelector(state => state.conferenceReg)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConferenceReg, setSelectedConferenceReg] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  const {handleSubmitReceipt} = useConferece_reg()

  useEffect(() => {
    if (createConferenceRegSuccess) {
      showSuccessToast('Payment Successful')
      dispatch(reset())
    }
    if (createConferenceRegError) {
      showErrorToast(errorMessage || 'Something went wrong')
      dispatch(reset())
    }
  }, [
    createConferenceRegError,
    createConferenceRegSuccess,
    dispatch,
    errorMessage
  ])
const paymentFunction = (file) =>{
    handleSubmitReceipt(selectedConferenceReg._id,file)
}

  if (getConferenceRegLoading || createConferenceRegLoading) {
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
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>My Invoices</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search invoices...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto h-[400px] overflow-y-auto'>
          <table className='min-w-full divide-y divide-gray-200 table-zebra'>
            <thead className='bg-slate-500'>
              <tr>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Abstract ID
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  CONFERENCE
                </th>

                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Amount
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Submission Date
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {conference_regs?.map(item => (
                <tr
                  key={item._id}
                  className='hover:bg-blue-50 transition-colors duration-200 cursor-pointer'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {item.registration_id || item._id}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {item?.conference?.name || ''}
                    </div>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-semibold text-gray-900'>
                      $ {item.totalPrice || 0}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {format(item.createdAt, 'MMM d, yyyy')}
                    </div>
                  </td>

                  <td className='px-10 whitespace-nowrap text-sm text-gray-500'>
                    <div className='flex space-x-2'>
                      {item.payment_status === 'Paid' ? (
                        <a
                          href={item.invoice}
                          target='_blank'
                          title='Payment Details'
                          className='cursor-pointer hover:text-blue-500 transition-colors duration-200'
                        >
                          <IoMdEye className='text-xl' />
                        </a>
                      ) : item.payment_status === 'Unpaid' ? (
                        <button
                          onClick={() => {
                            setSelectedConferenceReg(item)
                            setIsModalOpen(true)
                          }}
                          title={`${
                            item.status === 'Abstract Submitted'
                              ? 'Payment not allowed'
                              : 'Pay Invoice'
                          }`}
                          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 shadow-md
                                ${
                                  item.status !== 'Abstract Submitted'
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:shadow-lg'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                                }
                              `}
                        >
                          Pay
                        </button>
                      ) : (
                        <span className='text-red-500'>Pending</span>
                      )}
                    </div>
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
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={paymentFunction}
      />
    </div>
  )
}

export default Conference_reg_invoice
