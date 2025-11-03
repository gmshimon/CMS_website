import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getSingleConferenceReg } from '../../../Redux/Slice/conference_regSlice'
import Loading from '../../../Component/Loading/Loading'
import {
  FaBed,
  FaCalendarAlt,
  FaClock,
  FaUtensils,
  FaGraduationCap,
  FaMapMarkerAlt
} from 'react-icons/fa'
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
    siteSeeingTour:
      single_conference_reg?.siteSeeingTour || 'Please select option',
    specialRequest: single_conference_reg?.specialRequest || ''
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        {getSingleConferenceRegLoading ? (
          <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
            <Loading />
          </div>
        ) : (
          <div className='bg-white rounded-lg shadow-lg p-3'>
            <div className='space-y-2'>
              {/* Presenter/Attendee Name */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Presenter / Attendee name
                </label>
                <div className='border border-black rounded-md p-2 w-full text-black'>
                  {registrationData.presenterName}
                </div>
                <p className='text-sm text-gray-500 mt-1'>
                  This name will be displayed on Certificates and schedule
                </p>
              </div>

              {/* Accommodation Required */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Accommodation Required
                </label>
                <div className='border border-black rounded-md p-2 w-full text-black'>
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
                    <div className='border border-black rounded-md p-2 w-full text-black'>
                      {registrationData.accommodationOption ||
                        'Please select option'}
                    </div>
                  </div>

                  {/* Check In Date & Time */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        <FaCalendarAlt className='inline mr-2 text-blue-600' />
                        Check In Date & Time
                      </label>
                      <div className='border border-black rounded-md p-2 w-full text-black'>
                        {registrationData.checkInDate}{' '}
                        {registrationData.checkInTime}
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        <FaClock className='inline mr-2 text-blue-600' />
                        Check Out Date & Time
                      </label>
                      <div className='border border-black rounded-md p-2 w-full text-black'>
                        {registrationData.checkOutDate || 'Not specified'}{' '}
                        {registrationData.checkOutTime || ''}
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
                <div className='border border-black rounded-md p-2 w-full text-black'>
                  {registrationData.attendingGalaDinner}
                </div>
                <p className='text-sm text-gray-500 mt-1'>
                  A dinner will be held for the conference participants
                </p>
              </div>

              {/* Pre-conference Workshops */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-3'>
                  <FaGraduationCap className='inline mr-2 text-blue-600' />
                  Pre-conference Workshops
                </label>

                {/* Selected Workshops Display */}
                {registrationData.preConferenceWorkshops &&
                registrationData.preConferenceWorkshops.length > 0 ? (
                  <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                    <p className='text-sm text-gray-600 mb-3'>
                      Selected workshops:
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {registrationData.preConferenceWorkshops.map(
                        (workshop, index) => (
                          <span
                            key={index}
                            className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'
                          >
                            {workshop?.title}
                          </span>
                        )
                      )}
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
                  Base fee of RM 0.00 will be added to your invoice if you
                  select one or more workshop(s).
                </p>
              </div>

              {/* Site Seeing Tour */}
              {/* <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  <FaMapMarkerAlt className='inline mr-2 text-blue-600' />
                  Site Seeing Tour
                </label>
                <div className='border border-black rounded-md p-2 w-full text-black'>
                  {registrationData.siteSeeingTour}
                </div>
              </div> */}

              {/* Any Special Request */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Any Special Request
                </label>
                <div className='border border-black rounded-md p-2 w-full text-black min-h-[100px]'>
                  {registrationData.specialRequest ||
                    'If participants need to add any additional request.'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200'>
                <Link
                  to='/admin/conference-list'
                  className='px-2 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200'
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
