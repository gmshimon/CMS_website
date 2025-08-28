import { useLocation, useParams } from 'react-router'
import ReviewTable from '../../../Component/ReviewTable/ReviewTable'
import useReviewerHome from '../../../Hooks/useReviewerHome'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../Component/Loading/Loading'
import { useEffect, useState } from 'react'
import { reviewHomeColumn } from '../../../Utilis/reviewTableColumn'
import { showErrorToast, showSuccessToast } from '../../../Utilis/toastUtils'
import { clearReviewStats } from '../../../Redux/Slice/ReviewSlice'
import ReviewModal from '../../../Component/ReviewModal/ReviewModal'
import PaperListModal from '../../../Component/PaperListModal/PaperListModal'

const MyReviewDetailPage = () => {
  const {
    myReviewData,
    respondReviewError,
    respondReviewSuccess,
    respondReviewLoading,
    getMyReviewStatsError,
    submitReviewLoading,
    submitReviewSuccess,
    submitReviewError
  } = useSelector(state => state.review)
  const [openModal, setOpenModal] = useState(false)
  const [isEditable, setIsEditable] = useState(true)
  const [selectedReview, setSelectedReview] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [papers, setPapers] = useState([])
  const [openAbstract, setOpenAbstract] = useState(false)
  const [abstract, setAbstract] = useState('')
  const { category } = useParams()
  const location = useLocation()
  const { handleRespondReview, handleSubmitReview } = useReviewerHome(category)

  const dispatch = useDispatch()

  useEffect(() => {
    if (respondReviewSuccess) {
      showSuccessToast('Successful')
      dispatch(clearReviewStats())
    }
    if (respondReviewError) {
      showErrorToast(getMyReviewStatsError)
      dispatch(clearReviewStats())
    }
    if (submitReviewSuccess) {
      showSuccessToast('Successful')
      dispatch(clearReviewStats())
    }
    if (submitReviewError) {
      showErrorToast(getMyReviewStatsError)
      dispatch(clearReviewStats())
    }
  }, [
    dispatch,
    getMyReviewStatsError,
    respondReviewError,
    respondReviewSuccess,
    submitReviewError,
    submitReviewSuccess
  ])

  const handleViewPaperList = papers => {
    setPapers(papers)
    setModalOpen(true)
  }

  const handleOpenReviewModal = (row, edit) => {
    setIsEditable(edit)
    setSelectedReview(row)
    setOpenModal(true)
  }
  const handleView = paper => {
    window.open(paper, '_blank')
  }

  if (respondReviewLoading || submitReviewLoading) {
    return (
      <div className='flex justify-center h-[calc(100vh-100px)] items-center'>
        <Loading />
      </div>
    )
  }

  const columns = reviewHomeColumn({
    handleViewPaperList,
    handleOpenAbstract: abstract => {
      console.log(abstract)
      setAbstract(abstract)
      setOpenAbstract(true)
    }
  })

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        {location.pathname === '/admin/my-review/pending'
          ? 'New Invitation'
          : location?.pathname === '/admin/my-review/reviewed'
          ? 'Completed Review'
          : location.pathname === '/admin/my-review/accepted'
          ? 'Pending Review'
          : 'User Overview'}
      </h2>
      <div>
        <ReviewTable
          columns={columns}
          data={myReviewData}
          mode='reviewer'
          category={category}
          handleRespondReview={handleRespondReview}
          handleOpenReviewModal={handleOpenReviewModal}
        />

        <ReviewModal
          isOpen={openModal}
          isEditable={isEditable}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmitReview}
          paper={selectedReview}
        />

        <PaperListModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          papers={papers}
          onView={handleView}
        />

        {openAbstract && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 '>
            <div className='bg-white p-6 rounded-lg max-w-lg w-full shadow-lg relative h-96 overflow-y-auto'>
              <h2 className='text-lg font-bold mb-4 sticky'>Abstract</h2>
              <p className='text-gray-700 whitespace-pre-wrap'>
                <div
                  className='text-justify'
                  dangerouslySetInnerHTML={{ __html: abstract }}
                />
              </p>
              <button
                onClick={() => setOpenAbstract(false)}
                className='absolute top-2 right-2 text-gray-600 hover:text-black text-xl'
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyReviewDetailPage
