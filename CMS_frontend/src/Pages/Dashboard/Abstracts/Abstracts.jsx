import { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { FaPlus } from 'react-icons/fa'
import PaperModal from '../../../Component/PaperModal/PaperModal'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { reset, resetForm } from '../../../Redux/Slice/AbstractSlice'
import { paperReset } from '../../../Redux/Slice/PaperSlice'
import Loading from '../../../Component/Loading/Loading'
import { showErrorToast, showSuccessToast } from '../../../Utilis/toastUtils'
import useAbstract from '../../../Hooks/useAbstract'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AbstractTable from '../../../Component/AbstractTable/AbstractTable'

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

  return (
    <div className='p-3 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <ToastContainer />
      {getAbstractLoading ? (
        <div className='flex justify-center items-center h-[calc(100vh-112px)]'>
          <Loading />
        </div>
      ) : (
        <>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Abstracts</h2>
            <div className='flex flex-col md:flex-row items-center '>
              <div className='flex flex-col md:flex-row gap-4  mr-4'>
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
            <AbstractTable
              data={currentAbstracts}
              handleOpenModal={handleOpenModal}
            />

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
