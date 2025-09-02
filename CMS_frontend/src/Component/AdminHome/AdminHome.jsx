/* eslint-disable no-unused-vars */
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { FaUsers, FaFileAlt, FaCheckCircle, FaChartBar } from 'react-icons/fa'
import { IoCreateOutline, IoTimeOutline } from 'react-icons/io5'
import { BsArrowRightShort } from 'react-icons/bs'
import StatCard from '../StatCard/StatCard'
import { useDispatch, useSelector } from 'react-redux'
import { adminDashboardStats } from '../../Redux/Slice/AdminSlice'

const AdminHome = () => {
  const { selectedConference } = useSelector(state => state.conference)
  const { dashboardStats } = useSelector(state => state.admin)
  // const [hoveredRow, setHoveredRow] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedConference) {
      dispatch(adminDashboardStats(selectedConference))
    } else {
      dispatch(adminDashboardStats())
    }
  }, [dispatch, selectedConference])

  // Setup adminActions with dynamic stats from dashboardStats
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
  // const conferenceArchives = [
  //   { name: 'EGE MC2020', papers: 156, participants: 230 },
  //   { name: 'EGE MC2021', papers: 189, participants: 275 },
  //   { name: 'EGE MC20222', papers: 210, participants: 320 },
  //   { name: 'EGE MC2023', papers: 245, participants: 380 },
  //   { name: 'EGE MC2024', papers: 142, participants: 195 }
  // ]

  return (
    <div className='p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[calc(100vh-64px)]'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Dashboard Overview</h2>

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

      {/* Archive Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'
      >
        <h3 className='text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
          <FaFileAlt className='text-blue-600' />
          Conference Archives
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-100'>
                <th className='text-left px-6 py-4 text-gray-600 font-semibold'>Conference Name</th>
                <th className='text-left px-6 py-4 text-gray-600 font-semibold'>Total Papers</th>
                <th className='text-left px-6 py-4 text-gray-600 font-semibold'>Participants</th>
                <th className='text-left px-6 py-4 text-gray-600 font-semibold'>Action</th>
              </tr>
            </thead>
            <tbody>
              {conferenceArchives.map((conf, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-50 transition-colors duration-200 ${hoveredRow === idx ? 'bg-gray-50' : ''}`}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className='px-6 py-4 text-gray-800 font-medium'>{conf.name}</td>
                  <td className='px-6 py-4 text-gray-600'>{conf.papers} Papers</td>
                  <td className='px-6 py-4 text-gray-600'>{conf.participants} Attendees</td>
                  <td className='px-6 py-4'>
                    <Link
                      to={`/admin/archive/${conf.name.replace(/\s+/g, '-')}`}
                      className='text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-2 w-fit'
                    >
                      Open Archive
                      <motion.span whileHover={{ x: 5 }} className='inline-block'>
                        <BsArrowRightShort className='text-xl' />
                      </motion.span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div> */}
    </div>
  )
}

export default AdminHome
