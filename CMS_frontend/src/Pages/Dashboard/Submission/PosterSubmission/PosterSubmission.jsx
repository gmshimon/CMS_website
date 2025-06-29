import React, { useState } from 'react'
import SubmissionTable from '../../../../Component/SubmissionTable/SubmissionTable'
const PosterSubmission = () => {
  // Dummy data for poster submissions
  const [posterSubmissions, setPosterSubmissions] = useState([
    {
      _id: 'ABS101',
      theme: 'AI in Healthcare',
      authors: [{ name: 'Dr. Ayesha Rahman' }],
      title: 'Using Deep Learning for Tumor Detection',
      createdAt: new Date('2025-06-15'),
      status: 'Accepted',
      paymentStatus: 'Paid',
      paymentProofUrl: 'https://example.com/payment-proof-101.pdf',
      reviewStatus: 'Reviewed',
      submittedFiles: ['file1.pdf', 'file2.pdf']
    },
    {
      _id: 'ABS102',
      theme: 'Smart Cities',
      authors: [{ name: 'John Doe' }],
      title: 'IoT Sensors for Urban Traffic Optimization',
      createdAt: new Date('2025-06-18'),
      status: 'Abstract Submitted',
      paymentStatus: 'Unpaid',
      paymentProofUrl: '',
      reviewStatus: 'Pending',
      submittedFiles: []
    },
    {
      _id: 'ABS103',
      theme: 'Green Energy',
      authors: [{ name: 'Mehreen Akter' }],
      title: 'Solar Panel Efficiency in Tropical Regions',
      createdAt: new Date('2025-06-20'),
      status: 'Minor Revision',
      paymentStatus: 'Paid',
      paymentProofUrl: 'https://example.com/payment-proof-103.pdf',
      reviewStatus: 'Re-review Required',
      submittedFiles: ['solar-paper.pdf']
    }
  ])

  // Dummy functions for table interactions
  const getStatusColor = status => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800'
      case 'Abstract Submitted':
        return 'bg-yellow-100 text-yellow-800'
      case 'Minor Revision':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleView = item => {
    alert(`Viewing abstract: ${item._id}`)
  }

  const handleEdit = item => {
    alert(`Editing abstract: ${item._id}`)
  }

  const handleDelete = item => {
    if (confirm(`Are you sure you want to delete abstract: ${item._id}?`)) {
      setPosterSubmissions(prev =>
        prev.filter(submission => submission._id !== item._id)
      )
    }
  }

  const handleViewFiles = item => {
    alert(`Viewing submitted files for: ${item._id}`)
  }

  return (
    <div>
      <SubmissionTable
        data={posterSubmissions}
        getStatusColor={getStatusColor}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewFiles={handleViewFiles}
      />
    </div>
  )
}

export default PosterSubmission
