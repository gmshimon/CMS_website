import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  FaChalkboardTeacher,
  FaVideo,
  FaImage,
  FaProjectDiagram,
} from 'react-icons/fa'
import StatCard from '../../../../Component/StatCard/StatCard'

const AdminSubmission = () => {


  const submissionStats = [
    {
      title: 'Physical Presentation',
      count: 12,
      icon: FaChalkboardTeacher,
      link: '/admin/submission/physical',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      description: 'Participants attending in person.'
    },
    {
      title: 'Online Presentation',
      count: 20,
      icon: FaVideo,
      link: '/admin/submissions/online',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      description: 'Participants presenting virtually.'
    },
    {
      title: 'Poster Presentation',
      count: 8,
      icon: FaImage,
      link: '/admin/submissions/poster',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      description: 'Participants submitting posters.'
    },
    {
      title: 'Project Submission',
      count: 15,
      icon: FaProjectDiagram,
      link: '/admin/submissions/project',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      description: 'Submitted projects for review.'
    }
  ]

  return (
    <div>
      {/* Animated Stat Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {submissionStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <StatCard
              title={stat.title}
              count={stat.count}
              icon={stat.icon}
              link={stat.link}
              color={stat.color}
              iconColor={stat.iconColor}
              description={stat.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AdminSubmission
