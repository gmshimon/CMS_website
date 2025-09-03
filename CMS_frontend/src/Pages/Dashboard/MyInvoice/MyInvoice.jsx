import { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { IoMdEye } from 'react-icons/io'
import useAbstract from '../../../Hooks/useAbstract'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../Component/Loading/Loading'
import { format } from 'date-fns'
import PaymentModal from '../../../Component/PaymentModal/PaymentModal'
import { makePayment, reset } from '../../../Redux/Slice/AbstractSlice'
import { showErrorToast, showSuccessToast } from '../../../Utilis/toastUtils'

const MyInvoice = () => {
  const {
    getAbstractLoading,
    abstracts,
    makePaymentLoading,
    makePaymentSuccess,
    makePaymentError
  } = useSelector(state => state.abstract)
  const [selectedAbstract, setSelectedAbstract] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const invoicesPerPage = 6
  useAbstract()
  useEffect(() => {
    if (makePaymentSuccess) {
      showSuccessToast('Payment receipt uploaded successfully!')
      dispatch(reset())
      setSelectedAbstract(null)
    }
    if (makePaymentError) {
      dispatch(reset())
      setSelectedAbstract(null)
      showErrorToast('Failed to upload payment receipt. Please try again.')
    }
  }, [makePaymentSuccess, makePaymentError, dispatch])

  // Filter invoices based on search query
  const filteredInvoices = abstracts.filter(
    item =>
      item.paper_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.payment_status.toLowerCase().includes(searchQuery.toLowerCase())
    // item.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination
  const indexOfLastInvoice = currentPage * invoicesPerPage
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage
  const currentInvoices = filteredInvoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  )
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage)

  // Get status color
  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSubmitReceipt = file => {
    const formData = new FormData()
    formData.append('file', file)
    dispatch(
      makePayment({
        abstractId: selectedAbstract._id,
        data: formData
      })
    )
  }

  if (getAbstractLoading || makePaymentLoading) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-112px)]'>
        <Loading />
      </div>
    )
  }
  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
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
                  Title
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Theme
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Amount
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Submission Date
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Payment Deadline
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {currentInvoices.map(item => (
                <tr
                  key={item._id}
                  className='hover:bg-blue-50 transition-colors duration-200 cursor-pointer'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {item._id}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {item.paper_title}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='text-sm text-gray-500 line-clamp-2'>
                      {item.theme}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-semibold text-gray-900'>
                      $ {item.amount || 0}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {format(item.createdAt, 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {item?.payment_deadline?format(item.payment_deadline, 'MMM d, yyyy'):'N/A'}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className='px-10 whitespace-nowrap text-sm text-gray-500'>
                    <div className='flex space-x-2'>
                      {item.payment_status === 'Paid' ? (
                        <a
                          href={item.payment_proof}
                          target='_blank'
                          title='Payment Details'
                          className='cursor-pointer hover:text-blue-500 transition-colors duration-200'
                        >
                          <IoMdEye className='text-xl' />
                        </a>
                      ) : item.payment_status === 'Unpaid' ? (
                        <button
                          onClick={() => {
                            setSelectedAbstract(item)
                            setIsModalOpen(true)
                          }}
                          disabled={item.status === 'Abstract Submitted'}
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
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReceipt}
      />
    </div>
  )
}

export default MyInvoice
