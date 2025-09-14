import { useSelector } from 'react-redux'
import StatCard from '../../../Component/StatCard/StatCard'
import {
  FaFileAlt,
  FaHourglassHalf,
  FaTimesCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSyncAlt
} from 'react-icons/fa'
import useReview from '../../../Hooks/useReview'

const AdminReview = () => {
  const { reviewStats } = useSelector(state => state.review)
  useReview()

  const stats = [
    {
      title: 'Total Submissions',
      count: reviewStats?.totalSubmissions || 0,
      icon: FaFileAlt,
      link: '/admin/review/details/all',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      description: 'All abstracts submitted'
    },
    {
      title: 'Pending Reviews',
      count: reviewStats?.pendingReviews || 0,
      icon: FaHourglassHalf,
      link: '/admin/review/details/pending',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      description: 'Accepted but not yet reviewed'
    },
    {
      title: 'Unassigned Submissions',
      count: reviewStats?.unassignedSubmissions || 0,
      icon: FaTimesCircle,
      link: '/admin/review/details/unassigned',
      color: 'bg-gray-100',
      iconColor: 'text-gray-600',
      description: 'Submissions with no reviewers assigned'
    },
    {
      title: 'Reviews Completed',
      count: reviewStats?.completedReviews || 0,
      icon: FaCheckCircle,
      link: '/admin/review/details/reviewed',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      description: 'Successfully submitted reviews'
    }
    // {
    //   title: 'Overdue Reviews',
    //   count: reviewStats?.overdueReviews || 0,
    //   icon: FaExclamationTriangle,
    //   link: '/admin/reviews/overdue',
    //   color: 'bg-red-100',
    //   iconColor: 'text-red-600',
    //   description: 'Past deadline and not submitted'
    // },
    // {
    //   title: 'Multiple Review Rounds',
    //   count: reviewStats?.multiRoundAbstracts || 0,
    //   icon: FaSyncAlt,
    //   link: '/admin/abstracts/multi-round',
    //   color: 'bg-purple-100',
    //   iconColor: 'text-purple-600',
    //   description: 'Abstracts with more than 1 review round'
    // }
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 '>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

export default AdminReview
