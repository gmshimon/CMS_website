import React, { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  FaChalkboardTeacher,
  FaVideo,
  FaImage,
  FaProjectDiagram
} from 'react-icons/fa'
import StatCard from '../../../../Component/StatCard/StatCard'
import { useDispatch, useSelector } from 'react-redux'
import { getScheduleMethodStats } from '../../../../Redux/Slice/AdminSlice'
import Loading from '../../../../Component/Loading/Loading'

const methodMeta = {
  'Paper Presentation Physical': {
    icon: FaChalkboardTeacher,
    link: '/admin/scheduling/physical-paper',
    color: 'bg-green-100',
    iconColor: 'text-green-600',
    description: 'Papers presented in person.'
  },
  'Paper Presentation Online': {
    icon: FaVideo,
    link: '/admin/scheduling/online-paper',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    description: 'Papers presented virtually.'
  },
  'Poster Presentation Physical': {
    icon: FaImage,
    link: '/admin/scheduling/physical-poster',
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    description: 'Posters displayed physically.'
  },
  'Poster Presentation Online': {
    icon: FaProjectDiagram,
    link: '/admin/scheduling/online-poster',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
    description: 'Poster presented virtually.'
  }
}

const SchedulingHome = () => {
  const { selectedConference } = useSelector(state => state.conference)
  const { presentationStats,getPresentationStatsLoading } = useSelector(state => state.admin)

  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedConference) {
      dispatch(getScheduleMethodStats(selectedConference))
    } else {
      dispatch(getScheduleMethodStats())
    }
  }, [dispatch, selectedConference])

if(getPresentationStatsLoading){
  return <div className='flex justify-center items-center h-[calc(100vh-130px)]'>
    <Loading/>
  </div>
}

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {presentationStats?.map((stat, index) => {
          const meta = methodMeta[stat.method]
          if (!meta) return null // Skip if method is not defined in meta
          return (
            <motion.div
              key={stat.method}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <StatCard
                title={stat.method}
                count={stat.count}
                icon={meta.icon}
                link={meta.link}
                color={meta.color}
                iconColor={meta.iconColor}
                description={meta.description}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SchedulingHome
