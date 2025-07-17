import React from 'react'
import { useNavigate } from 'react-router'
import { abstractReviewColumns } from '../../Utilis/reviewTableColumn'
import ReviewTable from '../ReviewTable/ReviewTable'
const reviewData = [
  {
    _id: 'ABS12345',
    paper_title: 'AI in Medical Imaging',
    theme: 'Artificial Intelligence',
    createdAt: '2025-07-01T12:00:00Z',
    conference: { name: 'ICAAI 2025' },
    reviewers: [{ name: 'Dr. Rahman',status:'Accepted' }, { name: 'Dr. Lisa' }]
  },
  {
    _id: 'ABS98765',
    paper_title: 'Blockchain in Education',
    theme: 'Blockchain',
    createdAt: '2025-07-10T09:30:00Z',
    conference: { name: 'EduTech Summit 2025' },
    reviewers: []
  }
]
const ReviewDetailsPage = () => {
  const navigate = useNavigate()
  // Define logic function passed down
  const handleViewSubmission = row => {
    navigate(`/admin/abstracts/${row._id}`)
  }
  const columns = abstractReviewColumns({
    onViewSubmission: handleViewSubmission,
    maxReviewers: 3
  })
  return (
    <div>
      <div>
        <ReviewTable data={reviewData} columns={columns} />
      </div>
    </div>
  )
}

export default ReviewDetailsPage
