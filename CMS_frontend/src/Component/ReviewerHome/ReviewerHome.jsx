import React from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

import StatCard from '../StatCard/StatCard'
import useReviewerHome from '../../Hooks/useReviewerHome'
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading'

const ReviewerHome = () => {
  const { getMyReviewStatsLoading } = useSelector(
    state => state.review
  )
  const { reviewActions } = useReviewerHome()

  if (getMyReviewStatsLoading) {
    return (
      <div className='flex justify-center min-h-[calc(100vh-100px)] items-center'>
        <Loading />
      </div>
    )
  }
  return (
    <div className='p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[calc(100vh-64px)]'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Dashboard Overview
      </h2>
      {/* Action Cards */}
      <div className='mb-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {reviewActions.map((action, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
            >
              <StatCard
                title={action.title}
                count={action.stat}
                icon={action.icon}
                link={action.path}
                color={action.color}
                iconColor={action.iconColor}
                description={action.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewerHome
