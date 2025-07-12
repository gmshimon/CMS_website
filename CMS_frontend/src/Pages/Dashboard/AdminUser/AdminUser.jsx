import React from 'react'
import {
  FaUserGraduate,
  FaUserTie,
  FaMicrophone,
  FaChalkboardTeacher,
  FaUsers,
  FaUserCog,
  FaTools 
} from 'react-icons/fa'
import { GiMaterialsScience } from "react-icons/gi";

import StatCard from '../../../Component/StatCard/StatCard'

const AdminUser = () => {
  const stats = [
    {
      title: 'Authors',
      count: 120,
      icon: FaUserGraduate,
      link: '/admin/users/authors',
      color: 'bg-blue-100',
      iconColor: 'text-blue-500',
      description: 'All registered authors'
    },
    {
      title: 'Reviewers',
      count: 75,
      icon: FaUserTie,
      link: '/admin/users/reviewers',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      description: 'Experts reviewing submissions'
    },
    {
      title: 'Session Chairs',
      count: 20,
      icon: FaChalkboardTeacher,
      link: '/admin/users/session-chairs',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      description: 'Chairs leading sessions'
    },
    {
      title: 'Keynote Speakers',
      count: 10,
      icon: FaMicrophone,
      link: '/admin/users/keynote-speakers',
      color: 'bg-red-100',
      iconColor: 'text-red-500',
      description: 'Speakers giving keynote talks'
    },
    {
      title: 'Moderators',
      count: 15,
      icon: FaUserCog,
      link: '/admin/users/moderators',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      description: 'Moderators managing sessions'
    },
    {
      title: 'Scientific Committee Members',
      count: 30,
      icon: GiMaterialsScience,
      link: '/admin/users/committee/scientific',
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      description: 'Organizing committee members'
    },
    {
      title: 'Technical Committee Members',
      count: 30,
      icon: FaTools ,
      link: '/admin/users/committee',
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      description: 'Organizing committee members'
    },
    {
      title: 'Registration Committee Members',
      count: 30,
      icon: FaUsers,
      link: '/admin/users/committee',
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      description: 'Organizing committee members'
    },
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 '>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

export default AdminUser
