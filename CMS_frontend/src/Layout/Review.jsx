import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router'
import { setSelectedYear } from '../Redux/Slice/AdminSlice'
import { FaSearch } from 'react-icons/fa'

const Review = () => {
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
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        {location.pathname === '/admin/users'
          ? 'User Overview'
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

export default Review
