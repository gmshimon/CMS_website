import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router'
import Loading from '../Component/Loading/Loading'
import { showErrorToast, showSuccessToast } from '../Utilis/toastUtils'
import { clearReviewStats } from '../Redux/Slice/ReviewSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Review = () => {
  const {
    assigningReviewerLoading,
    assigningReviewerSuccess,
    assigningReviewerError,
    sentReviewerReminderSuccess,
    sentReviewerReminderError,
    changeAbstractStatusLoading,
    changeAbstractStatusSuccess,
    changeAbstractStatusError,
    getReviewStatsError
  } = useSelector(state => state.review)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (assigningReviewerSuccess) {
      showSuccessToast('Reviewer successfully assigned')
      dispatch(clearReviewStats())
    }
    if (assigningReviewerError) {
      showErrorToast(getReviewStatsError)
      dispatch(clearReviewStats())
    }
    if (sentReviewerReminderSuccess) {
      showSuccessToast('Successfully sent the reminder')
      dispatch(clearReviewStats())
    }
    if (sentReviewerReminderError) {
      showErrorToast(getReviewStatsError)
      dispatch(clearReviewStats())
    }
    if (changeAbstractStatusSuccess) {
      showSuccessToast('Successfully change the abstract status')
      dispatch(clearReviewStats())
    }
    if (changeAbstractStatusError) {
      showErrorToast(getReviewStatsError)
      dispatch(clearReviewStats())
    }
  }, [
    assigningReviewerError,
    assigningReviewerSuccess,
    changeAbstractStatusError,
    changeAbstractStatusSuccess,
    dispatch,
    getReviewStatsError,
    sentReviewerReminderError,
    sentReviewerReminderSuccess
  ])

  if (
    assigningReviewerLoading ||
    changeAbstractStatusLoading
  ) {
    return (
      <div className='flex justify-center h-[calc(100vh-100px)] items-center'>
        <Loading />
      </div>
    )
  }
  return (
    <div className='p-4'>
      <ToastContainer/>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        {location.pathname === '/admin/review/details/all'
          ? 'Total Submissions'
          : location?.pathname === '/admin/review/details/pending'
          ? 'Pending Reviews'
          : location.pathname === '/admin/review/details/unassigned'
          ? 'Unassigned Reviewers'
          : location.pathname === '/admin/review/details/reviewed'
          ? 'Completed Reviewers': 'Review Management'}
      </h2>

      {/* Standard Year Search Field */}
      {/* <div className='mb-4 max-w-md'>
        <label
          htmlFor='year'
          className='block text-sm font-medium text-gray-700 mb-2'
        >
          Filter by Year
        </label>
        <div className='flex rounded-md shadow-sm'>
          <input
            type='number'
            id='year'
            placeholder='Enter year (e.g. 2023)'
            value={yearInput}
            onChange={e => setYearInput(e.target.value)}
            className='flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={handleSearch}
            className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-all'
          >
            <FaSearch className='mr-2' />
            Search
          </button>
        </div>
      </div> */}
      <Outlet />
    </div>
  )
}

export default Review
