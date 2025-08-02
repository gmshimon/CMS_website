import React, { useState } from 'react'
import { setSelectedYear } from '../Redux/Slice/AdminSlice'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router'
import { FaSearch } from 'react-icons/fa'

const Scheduling = () => {
  const [yearInput, setYearInput] = useState('')
  const location = useLocation()

  const dispatch = useDispatch()
  const handleSearch = () => {
    if (!yearInput || yearInput < 1900 || yearInput > 3000) {
      alert('Please enter a valid year')
      dispatch(setSelectedYear(null))
      return
    }
    dispatch(setSelectedYear(yearInput))
  }

  //       if (
  //     assigningReviewerLoading ||
  //     sentReviewerReminderLoading ||
  //     changeAbstractStatusLoading
  //   ) {
  //     return (
  //       <div className='flex justify-center h-[calc(100vh-100px)] items-center'>
  //         <Loading />
  //       </div>
  //     )
  //   }
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>
        {location.pathname === '/admin/scheduling'
          ? 'Scheduling Management'
          : location?.pathname === '/admin/scheduling/paper-physical'
          ? 'Physical Paper Presentation'
          : location.pathname === '/admin/scheduling/paper-online'
          ? 'Online Paper Presentation'
          : location.pathname === '/admin/scheduling/poster-physical'
          ? 'Physical Poster Presentation'
          : location.pathname === '/admin/scheduling/poster-online'
          ? 'Online Poster Presentation'
          : location.pathname === '/admin/scheduling/poster-online'
          }
      </h2>

      {/* Standard Year Search Field */}
      <div className='mb-4 max-w-md'>
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
      </div>
      <Outlet />
    </div>
  )
}

export default Scheduling
