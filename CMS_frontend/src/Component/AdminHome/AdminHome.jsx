import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUsers, FaFileAlt, FaCheckCircle, FaChartBar } from 'react-icons/fa'
import { IoCreateOutline, IoTimeOutline } from 'react-icons/io5'
import { BsArrowRightShort } from 'react-icons/bs'

const adminActions = [
  { 
    label: 'Active Conference', 
    path: '/admin/active-conference', 
    icon: <IoTimeOutline className="text-4xl text-blue-600" />, 
    stat: '2 Active',
    description: 'Manage ongoing conferences and track real-time activities'
  },
  { 
    label: 'Create New Conference', 
    path: '/admin/create-conference', 
    icon: <IoCreateOutline className="text-4xl text-green-600" />, 
    stat: 'Start New',
    description: 'Set up and configure new conference events'
  },
  { 
    label: 'Review Workflow', 
    path: '/admin/review-workflow', 
    icon: <FaFileAlt className="text-4xl text-purple-600" />, 
    stat: '15 Pending',
    description: 'Monitor and manage paper review process'
  },
  { 
    label: 'Submissions Received', 
    path: '/admin/submissions', 
    icon: <FaUsers className="text-4xl text-orange-600" />, 
    stat: '45 New',
    description: 'View and process new paper submissions'
  },
  { 
    label: 'Pending Approvals', 
    path: '/admin/pending-approvals', 
    icon: <FaCheckCircle className="text-4xl text-red-600" />, 
    stat: '8 Waiting',
    description: 'Review and approve pending requests'
  },
  { 
    label: 'Reports', 
    path: '/admin/reports', 
    icon: <FaChartBar className="text-4xl text-indigo-600" />, 
    stat: 'View All',
    description: 'Access comprehensive conference analytics'
  },
  { label: 'Active Conference', path: '/admin/active-conference', icon: <IoTimeOutline className="text-3xl text-blue-600" />, stat: '2 Active' },
  { label: 'Create New Conference', path: '/admin/create-conference', icon: <IoCreateOutline className="text-3xl text-green-600" />, stat: 'Start New' },
  { label: 'Review Workflow', path: '/admin/review-workflow', icon: <FaFileAlt className="text-3xl text-purple-600" />, stat: '15 Pending' },
  { label: 'Submissions Received', path: '/admin/submissions', icon: <FaUsers className="text-3xl text-orange-600" />, stat: '45 New' },
  { label: 'Pending Approvals', path: '/admin/pending-approvals', icon: <FaCheckCircle className="text-3xl text-red-600" />, stat: '8 Waiting' },
  { label: 'Reports', path: '/admin/reports', icon: <FaChartBar className="text-3xl text-indigo-600" />, stat: 'View All' }
]

const conferenceArchives = [
  { name: 'EGE MC2020', papers: 156, participants: 230 },
  { name: 'EGE MC2021', papers: 189, participants: 275 },
  { name: 'EGE MC20222', papers: 210, participants: 320 },
  { name: 'EGE MC2023', papers: 245, participants: 380 },
  { name: 'EGE MC2024', papers: 142, participants: 195 }
]

const AdminHome = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[calc(100vh-64px)]">
      {/* <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4"
      >
        Admin Dashboard
      </motion.h2> */}



      {/* Action Cards */}
      <div className="mb-10">
        {/* <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminActions.map((action, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
              className="group"
            >
              <Link
                to={action.path}
                className="block bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-400 relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={hoveredCard === idx ? { opacity: 0.5 } : { opacity: 0 }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-gray-50 rounded-xl shadow-inner group-hover:bg-white group-hover:shadow transition-all duration-300">
                      {action.icon}
                    </div>
                    <motion.span 
                      className="text-sm font-semibold px-4 py-2 bg-blue-50 text-blue-700 rounded-full transform group-hover:scale-105 transition-transform duration-300"
                      animate={hoveredCard === idx ? { y: -2 } : { y: 0 }}
                    >
                      {action.stat}
                    </motion.span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {action.label}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm group-hover:text-gray-700 transition-colors duration-300">
                    {action.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span className="mr-2">Access Now</span>
                    <motion.div
                      animate={hoveredCard === idx ? { x: 5 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <BsArrowRightShort className="text-xl" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Archive Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FaFileAlt className="text-blue-600" />
          Conference Archives
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Conference Name</th>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Total Papers</th>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Participants</th>
                <th className="text-left px-6 py-4 text-gray-600 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {conferenceArchives.map((conf, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-gray-800 font-medium">{conf.name}</td>
                  <td className="px-6 py-4 text-gray-600">{conf.papers} Papers</td>
                  <td className="px-6 py-4 text-gray-600">{conf.participants} Attendees</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/archive/${conf.name.replace(/\s+/g, '-')}`}
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-2 w-fit"
                    >
                      Open Archive
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminHome
