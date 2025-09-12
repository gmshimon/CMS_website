import React, { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { IoDocumentText, IoWallet, IoNewspaper } from 'react-icons/io5'
import StatCard from '../StatCard/StatCard'
import { GrSchedule } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { getRegistrationCommitteeDashboard } from '../../Redux/Slice/AuthSlice'
import Loading from '../Loading/Loading'

const RegistrationCommitteeHome = () => {
  const { selectedConference } = useSelector(state => state.conference)

  const { register_committee_stats, getRegisterStatsLoading } = useSelector(
    state => state.user
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getRegistrationCommitteeDashboard(
        sessionStorage.getItem('selectedConference')
          ? sessionStorage.getItem('selectedConference')
          : selectedConference
      )
    )
  }, [selectedConference, dispatch])

  if (getRegisterStatsLoading) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-120px)]'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[calc(100vh-64px)]'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Dashboard Overview
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <StatCard
          title='Abstracts'
          description='Total abstracts submitted by presenters'
          count={register_committee_stats?.abstracts || 0}
          icon={IoDocumentText}
          link='/admin/abstract'
          color='bg-blue-50 hover:bg-blue-100'
        />
        <StatCard
          title='Total Registration'
          description={'Attendee registered for the Conference'}
          count={register_committee_stats?.registrations || 0}
          icon={IoWallet}
          link='/admin/list'
          color='bg-purple-50 hover:bg-purple-100'
        />

        <StatCard
          title='Schedule'
          description='View sessions, tracks, and venues'
          count={register_committee_stats?.schedules || 0}
          icon={GrSchedule}
          link='/admin/scheduling'
          color='bg-orange-50 hover:bg-orange-100'
        />
      </div>
    </div>
  )
}

export default RegistrationCommitteeHome
