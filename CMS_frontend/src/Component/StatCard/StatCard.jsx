// StatCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, count, icon: Icon, link, color, iconColor, description }) => (
  <Link to={link} className='block'>
    <div className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${color}`}>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>{title}</h3>
          <p className='text-3xl font-bold text-gray-900'>{count}</p>
        </div>
        <Icon className={`text-4xl opacity-80 ${iconColor}`} />
      </div>
      {description && (
        <p className='mt-2 text-sm text-gray-600'>{description}</p>
      )}
      <p className='mt-4 text-sm text-gray-600 hover:text-gray-800'>
        View Details →
      </p>
    </div>
  </Link>
)

export default StatCard
