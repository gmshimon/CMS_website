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
  const [selectedReview, setSelectedReview] = useState(null)
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

  const handleOpenReviewModal = row => {
    setSelectedReview(row)
    setOpenModal(true)
  }

  if (respondReviewLoading || submitReviewLoading) {
    return (
      <div className='flex justify-center h-[calc(100vh-100px)] items-center'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        {location.pathname === '/admin/my-review/pending'
          ? 'New Invitation'
          : location?.pathname === '/admin/users/authors'
          ? 'Manage Authors'
          : location.pathname === '/admin/users/reviewers'
          ? 'Manage Reviewers'
          : location.pathname === '/admin/users/session-chairs'
          ? 'Manage Session Chair'
          : location.pathname === '/admin/users/keynote-speakers'
          ? 'Manage Key Note Speaker'
          : location.pathname === '/admin/users/moderators'
          ? 'Manage Moderator'
          : location.pathname === '/admin/users/committee'
          ? 'Manage Committee'
          : location.pathname === '/admin/users/committee/scientific'
          ? 'Manage Scientific Committee'
          : location.pathname === '/admin/users/committee/technical'
          ? 'Manage Technical Committee'
          : location.pathname === '/admin/users/committee/registration'
          ? 'Manage Registration Committee'
          : 'User Overview'}
      </h2>
      <div>
        <ReviewTable
          columns={reviewHomeColumn}
          data={myReviewData}
          mode='reviewer'
          handleRespondReview={handleRespondReview}
          handleOpenReviewModal={handleOpenReviewModal}
        />

        <ReviewModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmitReview}
          paper={selectedReview}
        />
      </div>
    </div>
  )
}

export default MyReviewDetailPage
