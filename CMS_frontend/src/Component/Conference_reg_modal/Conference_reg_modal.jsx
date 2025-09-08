// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaBed, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { createConferenceReg } from '../../Redux/Slice/conference_regSlice'
const Conference_reg_modal = ({ isOpen, onClose }) => {
  const { getConferenceRegLoading } = useSelector(
    state => state.conferenceReg
  )
  const { singleConference } = useSelector(state => state.conference)
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
  const dispatch = useDispatch()

  if (!isOpen) return null

  const accommodationOptions = [
    'Single Room',
    'Double Room',
    'Twin Room',
    'Suite',
    'Shared Accommodation'
  ]

  const galaDinnerOptions = ['Yes', 'No', 'Maybe']

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
  const handleWorkshopChange = workshop => {
    setFormData(prev => ({
      ...prev,
      preConferenceWorkshops: prev.preConferenceWorkshops.includes(workshop)
        ? prev.preConferenceWorkshops.filter(w => w !== workshop)
        : [...prev.preConferenceWorkshops, workshop]
    }))
  }

  const removeWorkshop = workshop => {
    setFormData(prev => ({
      ...prev,
      preConferenceWorkshops: prev.preConferenceWorkshops.filter(
        w => w !== workshop
      )
    }))
  }

  const handleInputChange = e => {
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

  const handleSubmit = e => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }
    const totalWorkshopPrice = formData.preConferenceWorkshops.reduce(
      (total, workshop) => total + (workshop.price || 0),
      0
    )

    const data = {
      conference: singleConference?._id,
      presenterName: formData.presenterName,
      accommodationRequired: formData.accommodationRequired,
      accommodationOption: formData.accommodationOption,
      checkInDate: formData.checkInDate,
      checkInTime: formData.checkInTime,
      checkOutDate: formData.checkOutDate,
      checkOutTime: formData.checkOutTime,
      attendingGalaDinner: formData.attendingGalaDinner,
      preConferenceWorkshops: formData.preConferenceWorkshops,
      totalPrice: totalWorkshopPrice + singleConference?.price
    }

    dispatch(createConferenceReg(data))
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className='bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto'
      >
        <div className='p-4'>
          <div className='flex justify-between items-start '>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
              Registration Information
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className=''>
            <div className='mb-2'>
              <p className='text-gray-600'>
                Please fill in all required information for conference
                registration.
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-2'>
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
                  className={`border border-black rounded-md p-2 w-full text-black ${
                    errors.presenterName ? 'border-red-500' : 'border-blacks'
                  }`}
                />
                <p className='text-sm text-gray-500 mt-1'>
                  This name will be displayed on Certificates and schedule
                </p>
                {errors.presenterName && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.presenterName}
                  </p>
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
                  className='border border-black rounded-md p-2 w-full text-black'
                >
                  <option value='No'>No</option>
                  <option value='Yes'>Yes</option>
                </select>
              </div>

              {/* Conditional Accommodation Fields */}
              {formData.accommodationRequired === 'Yes' && (
                <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
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
                      className={`border border-black rounded-md p-2 w-full text-black ${
                        errors.accommodationOption
                          ? 'border-red-500'
                          : 'border-black'
                      }`}
                    >
                      <option value=''>Please select option</option>
                      {accommodationOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.accommodationOption && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.accommodationOption}
                      </p>
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
                        className={`border border-black rounded-md p-2 w-full text-black ${
                          errors.checkInDate ? 'border-red-500' : 'border-black'
                        }`}
                      />
                      {errors.checkInDate && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.checkInDate}
                        </p>
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
                        className={`border border-black rounded-md p-2 w-full text-black ${
                          errors.checkInTime ? 'border-red-500' : 'border-black'
                        }`}
                      />
                      {errors.checkInTime && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.checkInTime}
                        </p>
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
                        className={`border border-black rounded-md p-2 w-full text-black ${
                          errors.checkOutDate
                            ? 'border-red-500'
                            : 'border-black'
                        }`}
                      />
                      {errors.checkOutDate && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.checkOutDate}
                        </p>
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
                        className={`border border-black rounded-md p-2 w-full text-black ${
                          errors.checkOutTime
                            ? 'border-red-500'
                            : 'border-black'
                        }`}
                      />
                      {errors.checkOutTime && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.checkOutTime}
                        </p>
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
                  className='border border-black rounded-md p-2 w-full text-black'
                >
                  {galaDinnerOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <p className='text-sm text-gray-500 mt-1'>
                  A dinner will be held for the conference participants on 22nd
                  July 2023
                </p>
              </div>

              {/* Pre-conference Workshops */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>
                  Pre-conference Workshops
                </label>

                {/* Selected Workshops Display */}
                {formData.preConferenceWorkshops.length > 0 && (
                  <div className='mb-4'>
                    <p className='text-sm text-gray-600 mb-2'>
                      Selected workshops:
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {formData?.preConferenceWorkshops.map(workshop => (
                        <span
                          key={workshop}
                          className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'
                        >
                          {workshop?.title}
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
                    {singleConference?.workshopOptions?.map(workshop => (
                      <label
                        key={workshop._id}
                        className='flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors'
                      >
                        <input
                          type='checkbox'
                          checked={formData.preConferenceWorkshops.includes(
                            workshop
                          )}
                          onChange={() => handleWorkshopChange(workshop)}
                          className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                        />
                        <span className='text-sm text-gray-700'>
                          {workshop?.title}{' '}
                          {workshop?.price > 0 && `(RM ${workshop?.price})`}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className='text-sm text-gray-500 mt-3'>
                    Base fee of RM 0.00 will be added to your invoice if you
                    select one or more workshop(s).
                  </p>
                </div>
              </div>
            </form>

            <button
              className='mt-4 px-6 py-3 text-black font-bold btn btn-sm btn-active btn-ghost mr-4'
              onClick={onClose}
            >
              Close
            </button>
            <button
              disabled={getConferenceRegLoading}
              type='button'
              onClick={handleSubmit}
              className='mt-4 px-6 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
            >
              {getConferenceRegLoading ? '..Loading' : 'Submit'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Conference_reg_modal
