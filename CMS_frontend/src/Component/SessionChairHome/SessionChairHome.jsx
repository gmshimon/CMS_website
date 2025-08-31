import React from 'react'
import ScheduleList from '../ScheduleList/ScheduleList'

const SessionChairHome = () => {
  return (
    <div className='p-3 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Dashboard Overview
      </h2>
      <ScheduleList />
    </div>
  )
}

export default SessionChairHome
