import React, { useEffect } from 'react'
import { IoCalendar, IoNotifications, IoCash } from 'react-icons/io5'
import StatCard from '../StatCard/StatCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAttendeeDashboardStats } from '../../Redux/Slice/conference_regSlice'
import Loading from '../Loading/Loading'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AttendeeDashboard = () => {
  const { editConferenceLoading, dashboardStats } = useSelector(
    state => state.conferenceReg
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAttendeeDashboardStats())
  }, [dispatch])

  if (editConferenceLoading) {
    return (
      <div className='flex justify-center h-[calc(100vh-120px)] items-center'>
        <ToastContainer />
        <Loading />
      </div>
    )
  }

  return (
    <div className='p-3 bg-gray-50 min-h-[calc(100vh-64px)]'>
      <ToastContainer />
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Dashboard Overview
      </h2>
      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <StatCard
          title='My Registrations'
          count={dashboardStats?.myRegistrations || 0}
          icon={IoCalendar}
          link='/attendee/registrations'
          color='bg-blue-50 hover:bg-blue-100'
        />
        <StatCard
          title='Upcoming Conference'
          count={dashboardStats?.upcomingCount || 0}
          icon={IoNotifications}
          link='/attendee/notifications'
          color='bg-green-50 hover:bg-green-100'
        />
        <StatCard
          title='Total Paid'
          count={`$  ${dashboardStats?.totalPaid || 0}`}
          icon={IoCash}
          link='/attendee/payments'
          color='bg-pink-50 hover:bg-pink-100'
        />
      </div>

      {/* Upcoming Conferences */}
      <div className='bg-white shadow rounded-2xl p-6 mb-6'>
        <h3 className='text-lg font-semibold mb-4'>Upcoming Conferences</h3>
        {dashboardStats?.upcomingConferences?.length > 0 ? (
          <ul className='space-y-4'>
            {dashboardStats.upcomingConferences.map(conf => (
              <li key={conf.id} className='flex items-center justify-between'>
                <div>
                  <p className='font-medium text-gray-800'>{conf.name}</p>
                  <p className='text-sm text-gray-500'>
                    {conf.city} •{' '}
                    {new Date(conf.startingDate).toLocaleDateString()}
                  </p>
                </div>
                <a
                  href={`/conference/${conf.id}`}
                  className='text-blue-600 hover:underline text-sm font-medium'
                >
                  View Details →
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500'>No upcoming conferences found.</p>
        )}
      </div>
    </div>
  )
}

export default AttendeeDashboard
