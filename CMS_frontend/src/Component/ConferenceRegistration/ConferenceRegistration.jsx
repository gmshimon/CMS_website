import React, { useState } from 'react'
import { FaCalendarAlt, FaClock, FaUser, FaBed, FaGraduationCap } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const ConferenceRegistration = () => {
  const [formData, setFormData] = useState({
    presenterName: '',
    accommodationRequired: 'No',
    accommodationOption: '',
    checkInDate: '',
    checkInTime: '',
    checkOutDate: '',
    checkOutTime: '',
    attendingGalaDinner: 'Yes',
    preConferenceWorkshops: []
  })

  const [errors, setErrors] = useState({})

  const accommodationOptions = [
    'Single Room',
    'Double Room',
    'Twin Room',
    'Suite',
    'Shared Accommodation'
  ]

  const workshopOptions = [
    'Research Methodology Workshop',
    'Data Analysis and Statistics',
    'Academic Writing and Publishing',
    'Grant Writing Workshop',
    'Technology in Education',
    'Leadership in Academia',
    'Innovation and Entrepreneurship',
    'Digital Marketing for Researchers'
  ]

  const galaDinnerOptions = [
    'Yes',
    'No',
    'Maybe'
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.presenterName.trim()) {
      newErrors.presenterName = 'Presenter/Attendee name is required'
    }

    if (formData.accommodationRequired === 'Yes') {
      if (!formData.accommodationOption) {
        newErrors.accommodationOption = 'Please select an accommodation option'
      }
      if (!formData.checkInDate) {
        newErrors.checkInDate = 'Check-in date is required'
      }
      if (!formData.checkInTime) {
        newErrors.checkInTime = 'Check-in time is required'
      }
      if (!formData.checkOutDate) {
        newErrors.checkOutDate = 'Check-out date is required'
      }
      if (!formData.checkOutTime) {
        newErrors.checkOutTime = 'Check-out time is required'
      }
      
      // Validate that check-out is after check-in
      if (formData.checkInDate && formData.checkOutDate) {
        const checkIn = new Date(formData.checkInDate)
        const checkOut = new Date(formData.checkOutDate)
        if (checkOut <= checkIn) {
          newErrors.checkOutDate = 'Check-out date must be after check-in date'
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Reset accommodation fields when accommodation is not required
    if (name === 'accommodationRequired' && value === 'No') {
      setFormData(prev => ({
        ...prev,
        accommodationOption: '',
        checkInDate: '',
        checkInTime: '',
        checkOutDate: '',
        checkOutTime: ''
      }))
    }
  }

  const handleWorkshopChange = (workshop) => {
    setFormData(prev => ({
      ...prev,
      preConferenceWorkshops: prev.preConferenceWorkshops.includes(workshop)
        ? prev.preConferenceWorkshops.filter(w => w !== workshop)
        : [...prev.preConferenceWorkshops, workshop]
    }))
  }

  const removeWorkshop = (workshop) => {
    setFormData(prev => ({
      ...prev,
      preConferenceWorkshops: prev.preConferenceWorkshops.filter(w => w !== workshop)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Registration submitted successfully!')
  }

  const resetForm = () => {
    setFormData({
      presenterName: '',
      accommodationRequired: 'No',
      accommodationOption: '',
      checkInDate: '',
      checkInTime: '',
      checkOutDate: '',
      checkOutTime: '',
      attendingGalaDinner: 'Yes',
      preConferenceWorkshops: []
    })
    setErrors({})
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-lg mb-8 p-6 border-t-4 border-blue-600'>
          <div className='flex items-center gap-3 mb-4'>
            <FaGraduationCap className='text-3xl text-blue-600' />
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>Conference Registration</h1>
              <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                <span className='flex items-center gap-1'>
                  <FaUser className='text-blue-500' />
                  Home
                </span>
                <span className='text-gray-400'>></span>
                <span className='text-blue-600 font-medium'>Conference Registration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Registration Information</h2>
            <p className='text-gray-600'>Please fill in all required information for conference registration.</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Presenter/Attendee Name */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Presenter / Attendee name *
              </label>
              <input
                type='text'
                name='presenterName'
                value={formData.presenterName}
                onChange={handleInputChange}
                placeholder='Enter your full name'
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.presenterName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <p className='text-sm text-gray-500 mt-1'>This name will be displayed on Certificates and schedule</p>
              {errors.presenterName && (
                <p className='mt-1 text-sm text-red-600'>{errors.presenterName}</p>
              )}
            </div>

            {/* Accommodation Required */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Accommodation Required *
              </label>
              <select
                name='accommodationRequired'
                value={formData.accommodationRequired}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              >
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
            </div>

            {/* Conditional Accommodation Fields */}
            {formData.accommodationRequired === 'Yes' && (
              <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
                <h3 className='text-lg font-medium text-gray-800 mb-4 flex items-center gap-2'>
                  <FaBed className='text-blue-600' />
                  Accommodation Details
                </h3>
                
                {/* Accommodation Option */}
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Accommodation Option *
                  </label>
                  <select
                    name='accommodationOption'
                    value={formData.accommodationOption}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.accommodationOption ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value=''>Please select option</option>
                    {accommodationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.accommodationOption && (
                    <p className='mt-1 text-sm text-red-600'>{errors.accommodationOption}</p>
                  )}
                </div>

                {/* Check In Date & Time */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      <FaCalendarAlt className='inline mr-2 text-blue-600' />
                      Check In Date & Time *
                    </label>
                    <input
                      type='date'
                      name='checkInDate'
                      value={formData.checkInDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.checkInDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.checkInDate && (
                      <p className='mt-1 text-sm text-red-600'>{errors.checkInDate}</p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      <FaClock className='inline mr-2 text-blue-600' />
                      Check In Time *
                    </label>
                    <input
                      type='time'
                      name='checkInTime'
                      value={formData.checkInTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.checkInTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.checkInTime && (
                      <p className='mt-1 text-sm text-red-600'>{errors.checkInTime}</p>
                    )}
                  </div>
                </div>

                {/* Check Out Date & Time */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      <FaCalendarAlt className='inline mr-2 text-blue-600' />
                      Check Out Date & Time *
                    </label>
                    <input
                      type='date'
                      name='checkOutDate'
                      value={formData.checkOutDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.checkOutDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.checkOutDate && (
                      <p className='mt-1 text-sm text-red-600'>{errors.checkOutDate}</p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      <FaClock className='inline mr-2 text-blue-600' />
                      Check Out Time *
                    </label>
                    <input
                      type='time'
                      name='checkOutTime'
                      value={formData.checkOutTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.checkOutTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.checkOutTime && (
                      <p className='mt-1 text-sm text-red-600'>{errors.checkOutTime}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Attending Gala Dinner */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Attending Gala Dinner *
              </label>
              <select
                name='attendingGalaDinner'
                value={formData.attendingGalaDinner}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              >
                {galaDinnerOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <p className='text-sm text-gray-500 mt-1'>A dinner will be held for the conference participants on 22nd July 2023</p>
            </div>

            {/* Pre-conference Workshops */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Pre-conference Workshops
              </label>
              
              {/* Selected Workshops Display */}
              {formData.preConferenceWorkshops.length > 0 && (
                <div className='mb-4'>
                  <p className='text-sm text-gray-600 mb-2'>Selected workshops:</p>
                  <div className='flex flex-wrap gap-2'>
                    {formData.preConferenceWorkshops.map(workshop => (
                      <span
                        key={workshop}
                        className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'
                      >
                        {workshop}
                        <button
                          type='button'
                          onClick={() => removeWorkshop(workshop)}
                          className='ml-1 text-blue-600 hover:text-blue-800'
                        >
                          <IoClose className='text-sm' />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Workshop Selection */}
              <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {workshopOptions.map(workshop => (
                    <label key={workshop} className='flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors'>
                      <input
                        type='checkbox'
                        checked={formData.preConferenceWorkshops.includes(workshop)}
                        onChange={() => handleWorkshopChange(workshop)}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                      />
                      <span className='text-sm text-gray-700'>{workshop}</span>
                    </label>
                  ))}
                </div>
                <p className='text-sm text-gray-500 mt-3'>
                  Base fee of RM 0.00 will be added to your invoice if you select one or more workshop(s).
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200'>
              <button
                type='button'
                onClick={resetForm}
                className='px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 border border-gray-300'
              >
                Reset Form
              </button>
              <button
                type='submit'
                className='px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex-1 sm:flex-none'
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConferenceRegistration