import React from 'react'
import PhysicalPresentationTable from '../../../../Component/SubmissionTable/SubmissionTable'
import SubmissionTable from '../../../../Component/SubmissionTable/SubmissionTable'
const dummyPresentationList = [
  {
    _id: 'ABS2025001',
    theme: 'Artificial Intelligence',
    authors: [{ name: 'Dr. Alice Johnson' }],
    title: 'Deep Learning Techniques for Medical Imaging',
    createdAt: '2025-05-15T10:30:00Z',
    status: 'Accepted',
    paymentStatus: 'Paid',
    paymentProofUrl: 'https://example.com/payment-proof1.pdf',
    reviewStatus: 'Reviewed'
  },
  {
    _id: 'ABS2025002',
    theme: 'Renewable Energy',
    authors: [{ name: 'Prof. Bob Smith' }],
    title: 'Solar Panel Efficiency Optimization',
    createdAt: '2025-05-18T12:45:00Z',
    status: 'Under Review',
    paymentStatus: 'Unpaid',
    paymentProofUrl: '',
    reviewStatus: 'Pending'
  },
  {
    _id: 'ABS2025003',
    theme: 'Cybersecurity',
    authors: [{ name: 'Ms. Clara Williams' }],
    title: 'Blockchain for Secure Data Sharing',
    createdAt: '2025-05-20T09:15:00Z',
    status: 'Rejected',
    paymentStatus: 'Paid',
    paymentProofUrl: 'https://example.com/payment-proof3.pdf',
    reviewStatus: 'Reviewed'
  },
  {
    _id: 'ABS2025004',
    theme: 'Robotics',
    authors: [{ name: 'Mr. Daniel Lee' }],
    title: 'Autonomous Navigation in Unstructured Environments',
    createdAt: '2025-05-22T14:00:00Z',
    status: 'Accepted',
    paymentStatus: 'Paid',
    paymentProofUrl: 'https://example.com/payment-proof4.pdf',
    reviewStatus: 'Reviewed'
  },
  {
    _id: 'ABS2025005',
    theme: 'Data Science',
    authors: [{ name: 'Dr. Emily Davis' }],
    title: 'Big Data Analytics for Smart Cities',
    createdAt: '2025-05-25T11:30:00Z',
    status: 'Under Review',
    paymentStatus: 'Unpaid',
    paymentProofUrl: '',
    reviewStatus: 'Pending'
  }
]

const PhysicalSubmission = () => {
  function getStatusColor (status) {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <SubmissionTable
        data={dummyPresentationList}
        getStatusColor={getStatusColor}
        onView={item => alert(`View details: ${item.title}`)}
        onEdit={item => alert(`Edit: ${item._id}`)}
        onDelete={item => alert(`Delete: ${item._id}`)}
        onViewFiles={item => alert(`View files for: ${item.title}`)}
      />
    </div>
  )
}

export default PhysicalSubmission
