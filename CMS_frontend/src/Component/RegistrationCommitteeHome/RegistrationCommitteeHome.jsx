import React from 'react'
import { motion } from 'framer-motion'
import { FaUsers, FaFileAlt, FaCheckCircle, FaChartBar } from 'react-icons/fa'
import { IoCreateOutline, IoTimeOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import StatCard from '../StatCard/StatCard'

const RegistrationCommitteeHome = () => {
  const { dashboardStats } = useSelector(state => state.admin)
      const adminActions = [
        {
          title: 'Active Conference',
          path: '/admin/conference?status=Active',
          icon: IoTimeOutline,
          color: 'bg-blue-50 hover:bg-blue-100',
          stat: `${dashboardStats?.active_conference || 0} Active`,
          description: 'Manage ongoing conferences and track real-time activities'
        },
        {
          title: 'Create New Conference',
          path: '/admin/create-conference',
          icon: IoCreateOutline,
          color: 'bg-green-50 hover:bg-green-100',
          stat: 'Start New',
          description: 'Set up and configure new conference events'
        },
        {
          title: 'Review Workflow',
          path: '/admin/review/details/pending',
          icon: FaFileAlt,
          color: 'bg-purple-50 hover:bg-purple-100',
          stat: `${dashboardStats?.pendingReviews || 0} Pending`,
          description: 'Monitor and manage paper review process'
        },
        {
          title: 'Submissions Received',
          path: '/admin/submission',
          icon: FaUsers,
          color: 'bg-orange-50 hover:bg-orange-100',
          stat: `${dashboardStats?.total_submission || 0} New`,
          description: 'View and process new paper submissions'
        },
        {
          title: 'Pending Approvals',
          path: '/admin/pending-approvals',
          icon: FaCheckCircle,
          color: 'bg-red-50 hover:bg-red-100',
          stat: `${dashboardStats.pendingReviews || 0} Waiting`,
          description: 'Review and approve pending requests'
        },
        {
          title: 'Reports',
          path: '/admin/reports',
          icon: FaChartBar,
          color: 'bg-indigo-50 hover:bg-indigo-100',
          stat: 'View All',
          description: 'Access comprehensive conference analytics'
        }
      ]
  return (
    <div className='p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[calc(100vh-64px)]'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Dashboard Overview
      </h2>
       {/* Action Cards */}
            <div className='mb-10'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {adminActions.map((action, idx) => (
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

export default RegistrationCommitteeHome
