import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getSingleConferenceReg } from '../../../Redux/Slice/Conference_regSlice'
import Loading from '../../../Component/Loading/Loading'
import { FaUser, FaBed, FaCalendarAlt, FaClock, FaUtensils, FaGraduationCap, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

const SingleConference = () => {
  const { single_conference_reg, getSingleConferenceRegLoading } = useSelector(
    state => state.conferenceReg
  )
  const { id } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSingleConferenceReg(id))
  }, [dispatch, id])

  // Sample data - replace with actual data from single_conference_reg
  const registrationData = {
    presenterName: single_conference_reg?.presenterName || 'Muhammad Anus',
    accommodationRequired: single_conference_reg?.accommodationRequired || 'No',
    accommodationOption: single_conference_reg?.accommodationOption || '',
    checkInDate: single_conference_reg?.checkInDate || '2025-06-23',
    checkInTime: single_conference_reg?.checkInTime || '00:00:00',
    checkOutDate: single_conference_reg?.checkOutDate || '',
    checkOutTime: single_conference_reg?.checkOutTime || '',
    attendingGalaDinner: single_conference_reg?.attendingGalaDinner || 'Yes',
    preConferenceWorkshops: single_conference_reg?.preConferenceWorkshops || [],
    siteSeeingTour: single_conference_reg?.siteSeeingTour || 'Please select option',
    specialRequest: single_conference_reg?.specialRequest || ''
  }

  const workshopsList = [
    'Research Methodology Workshop',
    'Data Analysis and Statistics',
    'Academic Writing and Publishing',
    'Grant Writing Workshop',
    'Technology in Education',
    'Leadership in Academia',
    'Innovation and Entrepreneurship',
    'Digital Marketing for Researchers'
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-lg mb-8 p-6 border-t-4 border-blue-600'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <FaGraduationCap className='text-3xl text-blue-600' />
              <div>
                <h1 className='text-3xl font-bold text-gray-800'>Registration Information</h1>
                <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                  <span className='flex items-center gap-1'>
                    <FaUser className='text-blue-500' />
                    Home
                  </span>
                  <span className='text-gray-400'>></span>
                  <span className='text-blue-600 font-medium'>Registration Information</span>
                </div>
              </div>
            </div>
            <Link
              to='/admin/conference-list'
              className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
            >
              <FaArrowLeft className='text-sm' />
              Back to List
            </Link>
          </div>
        </div>

        {getSingleConferenceRegLoading ? (
          <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
            <Loading />
          </div>
        ) : (
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <div className='space-y-6'>
              {/* Presenter/Attendee Name */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Presenter / Attendee name
                </label>
                <div className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700'>
                  {registrationData.presenterName}
                </div>
                <p className='text-sm text-gray-500 mt-1'>This name will be displayed on Certificates and schedule</p>
              </div>

              {/* Accommodation Required */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Accommodation Required
                </label>
                <div className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700'>
                  {registrationData.accommodationRequired}
                </div>
              </div>

              {/* Conditional Accommodation Fields */}
              {registrationData.accommodationRequired === 'Yes' && (
                <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
                  <h3 className='text-lg font-medium text-gray-800 mb-4 flex items-center gap-2'>
                    <FaBed className='text-blue-600' />
                    Accommodation Details
                  </h3>
                  
                  {/* Accommodation Option */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Accommodation Option
                    </label>
                    <div className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700'>
                      {registrationData.accommodationOption || 'Please select option'}
                    </div>
                  </div>

                  {/* Check In Date & Time */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        <FaCalendarAlt className='inline mr-2 text-blue-600' />
                        Check In Date & Time
                      </label>
                      <div className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700'>
                        {registrationData.checkInDate} {registrationData.checkInTime}
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        <FaClock className='inline mr-2 text-blue-600' />
                        Check Out Date & Time
                      </label>
                      <div className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700'>
                        {registrationData.checkOutDate || 'Not specified'} {registrationData.checkOutTime || ''}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Attending Gala Dinner */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <FaUtensils className='inline mr-2 text-blue-600' />
                  Attending Gala Dinner
                </label>
                <div className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700'>
                  {registrationData.attendingGalaDinner}
                </div>
                <p className='text-sm text-gray-500 mt-1'>A dinner will be held for the conference participants on 22nd July 2023</p>
              </div>

              {/* Pre-conference Workshops */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>
                  <FaGraduationCap className='inline mr-2 text-blue-600' />
                  Pre-conference Workshops
                </label>
                
                {/* Selected Workshops Display */}
                {registrationData.preConferenceWorkshops && registrationData.preConferenceWorkshops.length > 0 ? (
                  <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                    <p className='text-sm text-gray-600 mb-3'>Selected workshops:</p>
                    <div className='flex flex-wrap gap-2'>
                      {registrationData.preConferenceWorkshops.map((workshop, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'
                        >
                          {workshop}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                    <div className='flex items-center gap-2 text-gray-600'>
                      <span className='inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full'>
                        Not attending any workshop(s)
                        <IoClose className='text-sm' />
                      </span>
                    </div>
                  </div>
                )}
                <p className='text-sm text-gray-500 mt-3'>
                  Base fee of RM 0.00 will be added to your invoice if you select one or more workshop(s).
                </p>
              </div>

              {/* Site Seeing Tour */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <FaMapMarkerAlt className='inline mr-2 text-blue-600' />
                  Site Seeing Tour
                </label>
                <div className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700'>
                  {registrationData.siteSeeingTour}
                </div>
                <p className='text-sm text-gray-500 mt-1'>
                  AIMC 2023 is organizing site seeing tour on 22nd July 2023 for the participants. The arrangements will be done through 3rd party. If you are interested in any of the site seeing options we will be happy to provide you these services. Additional fee of USD 25.00 or RM 100.00 applicable.
                </p>
              </div>

              {/* Any Special Request */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Any Special Request
                </label>
                <div className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 min-h-[100px]'>
                  {registrationData.specialRequest || 'If participants need to add any additional request.'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200'>
                <Link
                  to='/admin/conference-list'
                  className='px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex-1 sm:flex-none text-center'
                >
                  Back to List
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleConference
