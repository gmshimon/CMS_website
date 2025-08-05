import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router'
import Loading from '../Component/Loading/Loading'
import { showErrorToast, showSuccessToast } from '../Utilis/toastUtils'
import { reset } from '../Redux/Slice/AbstractSlice'

const Submission = () => {
  const {
    changeAbstractDecisionLoading,
    changeAbstractDecisionSuccess,
    changeAbstractDecisionError,
    editAbstractLoading,
    editAbstractSuccess,
    editAbstractError
  } = useSelector(state => state.abstract)
  // eslint-disable-next-line no-unused-vars
  const [yearInput, setYearInput] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()
  // eslint-disable-next-line no-unused-vars
  const handleSearch = () => {
    if (!yearInput || yearInput < 1900 || yearInput > 3000) {
      alert('Please enter a valid year')
      return
    }
    // TODO: Trigger API or filter logic using yearInput
    console.log('Searching submissions for year:', yearInput)
  }

  useEffect(() => {
    if (changeAbstractDecisionSuccess) {
      showSuccessToast('Abstract decision updated successfully')
      dispatch(reset())
    }
    if (changeAbstractDecisionError) {
      showErrorToast('Failed to update abstract decision')
      dispatch(reset())
    }
    if (editAbstractSuccess) {
      showSuccessToast('Submission edited successfully')
      dispatch(reset())
    }
    if (editAbstractError) {
      showErrorToast('Failed to edit submission')
      dispatch(reset())
    }
  }, [
    changeAbstractDecisionError,
    changeAbstractDecisionSuccess,
    editAbstractSuccess,
    editAbstractError,
    dispatch
  ])

  if (changeAbstractDecisionLoading || editAbstractLoading) {
    return (
      <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <Loading />
      </div>
    )
  }
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        {location.pathname === '/admin/submission'
          ? 'Submission Overview'
          : location?.pathname ===
            '/admin/submission/presentation_method/physical-paper'
          ? 'Paper Submissions (Physical Mode)'
          : location.pathname ===
            '/admin/submission/presentation_method/online-paper'
          ? 'Paper Submissions (Online Mode)'
          : location.pathname ===
            '/admin/submission/presentation_method/physical-poster'
          ? 'Poster Submissions (Physical Mode)'
          : location.pathname ===
            '/admin/submission/presentation_method/online-poster'
          ? 'Poster Submissions (Online Mode)'
          : 'overview'}
      </h2>

      {/* Standard Year Search Field */}
      {/* <div className='mb-8 max-w-md'>
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

export default Submission
