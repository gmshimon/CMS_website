import React, { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { IoMdEye } from 'react-icons/io'
import { FaDownload, FaPlus, FaUpload } from 'react-icons/fa'
import { format } from 'date-fns'
import PaperModal from '../../../Component/PaperModal/PaperModal'
import UploadPaperModal from '../../../Component/UploadPaperModal/UploadPaperModal'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { reset, resetForm } from '../../../Redux/Slice/AbstractSlice'
import { paperReset } from '../../../Redux/Slice/PaperSlice'
import Loading from '../../../Component/Loading/Loading'
import { showErrorToast, showSuccessToast } from '../../../Utilis/toastUtils'
import useAbstract from '../../../Hooks/useAbstract'
import { getStatusColor } from '../../../Utilis/getStatusColor'

const Abstracts = () => {
  const { createPostPaperSuccess, createPostPaperError } = useSelector(
    state => state.paper
  )
  const { createAbstractSuccess, getAbstractLoading, abstracts } = useSelector(
    state => state.abstract
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  // call custom hook
  useAbstract()
  const navigate = useNavigate()
  const abstractsPerPage = 6
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeStep = ['Select Conference']
    sessionStorage.setItem('activeStep', JSON.stringify(initializeStep))
  }, [])

  useEffect(() => {
    if (createAbstractSuccess) {
      showSuccessToast('Abstract created successfully')
      dispatch(resetForm())
      dispatch(reset())
    }
    if (createPostPaperSuccess) {
      showSuccessToast('Paper uploaded successfully')
      dispatch(paperReset())
    }
    if (createPostPaperError) {
      showErrorToast('Paper Upload failed')
      dispatch(paperReset())
    }
  }, [
    createAbstractSuccess,
    createPostPaperSuccess,
    createPostPaperError,
    dispatch
  ])
  // Filter abstracts based on search query and filters
  const filteredAbstracts = abstracts?.filter(abstract => {
    const matchesSearch =
      abstract.paper_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      abstract.authors[0].name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      abstract.abstractId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      abstract.theme.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      filterStatus === 'all' || abstract.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const statuses = [
    'all',
    ...new Set(abstracts.map(abstract => abstract.status))
  ]

  // Calculate pagination
  const indexOfLastAbstract = currentPage * abstractsPerPage
  const indexOfFirstAbstract = indexOfLastAbstract - abstractsPerPage
  const currentAbstracts = filteredAbstracts.slice(
    indexOfFirstAbstract,
    indexOfLastAbstract
  )
  const totalPages = Math.ceil(filteredAbstracts.length / abstractsPerPage)

  // Modal handlers
  const handleOpenModal = paper => {
    setSelectedPaper(paper)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedPaper(null)
    setIsModalOpen(false)
  }

  

  // Function to get status color classes


  return (
    <div className='md:p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      {getAbstractLoading ? (
        <div className='flex justify-center items-center h-[calc(100vh-112px)]'>
          <Loading />
        </div>
      ) : (
        <>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Abstracts</h2>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <div className='flex flex-col md:flex-row gap-4 mb-4'>
                <input
                  type='text'
                  placeholder='Search abstracts...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className='w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  onClick={() => navigate(`/admin/abstract/add`)}
                  className='btn btn-active btn-primary'
                >
                  Abstract <FaPlus />
                </button>
              </div>
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
                      Author
                    </th>
                    <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                      Theme
                    </th>
                    <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                      Submission Date
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
                  {currentAbstracts.map(abstract => (
                    <tr
                      key={abstract._id}
                      className='hover:bg-gray-50 transition-colors duration-200'
                    >
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          {abstract._id}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-sm text-gray-900 line-clamp-2'>
                          {abstract.paper_title}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>
                          {abstract.authors[0].name}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>
                          {abstract.theme}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>
                          {format(abstract.createdAt, 'MMM d, yyyy')}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            abstract.status
                          )}`}
                        >
                          {abstract.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <div className='flex space-x-3'>
                          <button
                            onClick={() => handleOpenModal(abstract)}
                            className='cursor-pointer hover:text-blue-500 transition-colors duration-200 p-1 rounded-full hover:bg-blue-50'
                            title='View Abstract'
                          >
                            <IoMdEye className='text-xl' />
                          </button>

                          {/* Upload Paper Button - Show for specific statuses */}
                          {/* {(abstract.status === 'Abstract Submitted' ||
                            abstract.status === 'Accepted' ||
                            abstract.status === 'Minor Revision' ||
                            abstract.status === 'Major Revision') && (
                            <button
                              onClick={() => handleOpenUploadModal(abstract)}
                              className='cursor-pointer hover:text-green-500 transition-colors duration-200 p-1 rounded-full hover:bg-green-50'
                              title='Upload Paper'
                            >
                              <FaUpload className='text-lg' />
                            </button>
                          )} */}

                          {/* Download Paper - Show when paper is available */}
                          {abstract.paperUrl && (
                            <a
                              href={abstract.paperUrl}
                              className='cursor-pointer hover:text-purple-500 transition-colors duration-200 p-1 rounded-full hover:bg-purple-50'
                              download
                              title='Download Paper'
                            >
                              <FaDownload className='text-lg' />
                            </a>
                          )}

                          {/* Receipt - Show for accepted papers */}
                          {abstract.status === 'Accepted' &&
                            abstract.receiptUrl && (
                              <a
                                href={abstract.receiptUrl}
                                className='cursor-pointer hover:text-blue-500 transition-colors duration-200'
                                download
                                title='View Fee Receipt'
                              >
                                <span className='text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded'>
                                  Receipt
                                </span>
                              </a>
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
        </>
      )}

      <PaperModal
        abstract={selectedPaper}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      
    </div>
  )
}

export default Abstracts
