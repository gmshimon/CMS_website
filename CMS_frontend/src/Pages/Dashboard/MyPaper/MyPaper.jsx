import { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { IoMdEye } from 'react-icons/io'
import PaperModal from '../../../Component/PaperModal/PaperModal'
import { useDispatch, useSelector } from 'react-redux'
import { getPaper, paperReset } from '../../../Redux/Slice/PaperSlice'
import Loading from '../../../Component/Loading/Loading'
import useAbstract from '../../../Hooks/useAbstract'
import { FaUpload } from 'react-icons/fa'
import UploadPaperModal from '../../../Component/UploadPaperModal/UploadPaperModal'
import { showErrorToast, showSuccessToast } from '../../../Utilis/toastUtils'

import { format } from 'date-fns'
import { getStatusColor } from '../../../Utilis/getStatusColor'

const MyPaper = () => {
  const { abstracts } = useSelector(state => state.abstract)
  const {
    createPostPaperSuccess,
    createPostPaperError,
    getPaperLoading,
    paperErrorMessage
  } = useSelector(state => state.paper)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAbstractForUpload, setSelectedAbstractForUpload] =
    useState(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAbstract, setSelectedAbstract] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useDispatch()
  useAbstract({
    payment_status: 'Paid'
  })

  useEffect(() => {
    if (createPostPaperSuccess) {
      showSuccessToast('Paper uploaded successfully')
      dispatch(paperReset())
    }
    if (createPostPaperError) {
      showErrorToast(paperErrorMessage || 'Failed to upload paper')
      dispatch(paperReset())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPostPaperSuccess, createPostPaperError, dispatch])

  const abstractPerPage = 6

  // Filter papers based on search query
  const filteredAbstracts = abstracts.filter(
    abstract =>
      abstract.paper_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      abstract.authors[0].name.toLowerCase().includes(searchQuery.toLowerCase())
    // paper.abstractId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination
  const indexOfLastPaper = currentPage * abstractPerPage
  const indexOfFirstPaper = indexOfLastPaper - abstractPerPage
  const currentAbstracts = filteredAbstracts.slice(
    indexOfFirstPaper,
    indexOfLastPaper
  )
  const totalPages = Math.ceil(filteredAbstracts.length / abstractPerPage)

  // Modal handlers
  const handleOpenModal = abstract => {
    setSelectedAbstract(abstract)
    dispatch(getPaper(abstract._id))
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedAbstract(null)
    setIsModalOpen(false)
  }

  // open upload modal
  const handleOpenUploadModal = abstract => {
    setSelectedAbstractForUpload(abstract)
    setIsUploadModalOpen(true)
  }
  // close upload modal
  const handleCloseUploadModal = () => {
    setSelectedAbstractForUpload(null)
    setIsUploadModalOpen(false)
  }

  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      {getPaperLoading ? (
        <div className='flex justify-center items-center h-[calc(100vh-112px)]'>
          <Loading />
        </div>
      ) : (
        <>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>My Papers</h2>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search papers...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          {/* Show if no abstracts */}
          {!getPaperLoading && currentAbstracts.length === 0 && (
            <div className='text-center text-gray-600 py-10 text-lg'>
              No abstracts found. Please submit your abstract first or check if
              your payment has been completed.
            </div>
          )}

          {/* Show table if abstracts are available */}
          {currentAbstracts.length > 0 && (
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
                        Submission Deadline
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
                            {abstract.abstract_id || abstract._id}
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='text-sm text-gray-900 line-clamp-2'>
                            {abstract.paper_title}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <>
                            <div className='font-medium text-gray-800'>
                              {abstract.authors.length} Author(s)
                            </div>
                            <div className='space-y-1'>
                              <div className='space-y-1'>
                                {abstract.authors
                                  .slice(0, 2)
                                  .map((item, idx) => (
                                    <div
                                      key={idx}
                                      className='text-gray-600 truncate max-w-44'
                                      title={item.name}
                                    >
                                      • {item.name}
                                    </div>
                                  ))}
                                {abstract.authors.length > 2 && (
                                  <div className='text-gray-500 text-xs'>
                                    +{abstract.authors.length - 2} more
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm '>
                            {abstract.paper_deadline
                              ? format(abstract.paper_deadline, 'MMM d, yyyy')
                              : 'N/A'}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${getStatusColor(abstract.status)}`}
                          >
                            {abstract.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          <div className='flex space-x-4'>
                            <button
                              onClick={() => handleOpenModal(abstract)}
                              className='cursor-pointer hover:text-blue-500 transition-colors duration-200'
                            >
                              <IoMdEye className='text-xl' />
                            </button>

                            {[
                              'Abstract Submitted',
                              'Abstract Accepted',
                              'Minor Revision',
                              'Major Revision'
                            ].includes(abstract.status) ? (
                              <button
                                onClick={() => handleOpenUploadModal(abstract)}
                                className='cursor-pointer hover:text-green-500 transition-colors duration-200 p-1 rounded-full hover:bg-green-50'
                                title='Upload Paper'
                              >
                                <FaUpload className='text-lg' />
                              </button>
                            ) : (
                              <span
                                className='text-gray-400 cursor-not-allowed'
                                title='Upload Paper not available'
                              >
                                Uploaded
                              </span>
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
          )}

          <PaperModal
            abstract={selectedAbstract}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
          <UploadPaperModal
            isOpen={isUploadModalOpen}
            onClose={handleCloseUploadModal}
            abstractData={selectedAbstractForUpload}
          />
        </>
      )}
    </div>
  )
}

export default MyPaper
