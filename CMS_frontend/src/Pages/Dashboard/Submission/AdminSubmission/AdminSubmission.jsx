import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  FaChalkboardTeacher,
  FaVideo,
  FaImage,
  FaProjectDiagram
} from 'react-icons/fa'
import StatCard from '../../../../Component/StatCard/StatCard'
import { useSelector } from 'react-redux'
import useScheduling from '../../../../Hooks/useScheduling'

const AdminSubmission = () => {
  const { presentationStats } = useSelector(state => state.admin)
  useScheduling()
  const methodMeta = {
    'Paper Presentation Physical': {
      icon: FaChalkboardTeacher,
      link: '/admin/submission/presentation_method/physical-paper',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      description: 'Papers presented in person.'
    },
    'Paper Presentation Online': {
      icon: FaVideo,
      link: '/admin/submission/presentation_method/online-paper',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      description: 'Papers presented virtually.'
    },
    'Poster Presentation Physical': {
      icon: FaImage,
      link: '/admin/submission/presentation_method/physical-poster',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      description: 'Posters displayed physically.'
    },
    'Poster Presentation Online': {
      icon: FaProjectDiagram,
      link: '/admin/submission/presentation_method/online-poster',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      description: 'Poster presented virtually.'
    }
  }
  // const submissionStats = [
  //   {
  //     title: 'Abstract Submissions (Physical)',
  //     count: 12,
  //     icon: FaChalkboardTeacher,
  //     link: '/admin/submission/physical',
  //     color: 'bg-green-100',
  //     iconColor: 'text-green-600',
  //     description: 'Participants attending in person.'
  //   },
  //   {
  //     title: 'Abstract Submissions (Online)',
  //     count: 20,
  //     icon: FaVideo,
  //     link: '/admin/submissions/online',
  //     color: 'bg-blue-100',
  //     iconColor: 'text-blue-600',
  //     description: 'Participants presenting virtually.'
  //   },
  //   {
  //     title: 'Poster Submissions (Physical)',
  //     count: 8,
  //     icon: FaImage,
  //     link: '/admin/submission/poster',
  //     color: 'bg-yellow-100',
  //     iconColor: 'text-yellow-600',
  //     description: 'Participants submitting posters.'
  //   },
  //   {
  //     title: 'Abstract Submissions (Online)',
  //     count: 15,
  //     icon: FaProjectDiagram,
  //     link: '/admin/submissions/project',
  //     color: 'bg-purple-100',
  //     iconColor: 'text-purple-600',
  //     description: 'Submitted projects for review.'
  //   }
  // ]

  return (
    <div>
      {/* Animated Stat Cards */}
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

export default AdminSubmission
