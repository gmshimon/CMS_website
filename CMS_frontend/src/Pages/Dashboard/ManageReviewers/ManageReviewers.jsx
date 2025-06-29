import React from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { reviewerColumns } from '../../../Utilis/userTabelColumn'


const ManageReviewers = () => {
  const reviewers = [
  {
    _id: 'rev001',
    image: 'https://i.pravatar.cc/40?img=5',
    name: 'Dr. Sarah Khan',
    university: 'BRAC University',
    position: 'Professor of Computer Science',
    country: 'Bangladesh',
    domain: 'Artificial Intelligence',
    email: 'sarah.khan@example.com',
    contact: '+880123456789',
    orcid: 'https://orcid.org/0000-0002-1234-5678',
    role: 'Reviewer'
  },
  {
    _id: 'rev002',
    image: 'https://i.pravatar.cc/40?img=12',
    name: 'James Smith',
    university: 'Stanford University',
    position: 'Senior AI Researcher',
    country: 'USA',
    domain: 'Machine Learning',
    email: 'james.smith@example.com',
    contact: '+1-555-123-4567',
    orcid: 'https://orcid.org/0000-0001-2345-6789',
    role: 'Reviewer'
  },
  {
    _id: 'rev003',
    image: 'https://i.pravatar.cc/40?img=20',
    name: 'Chen Wei',
    university: 'Fudan University',
    position: 'Associate Professor',
    country: 'China',
    domain: 'Data Science',
    email: 'chen.wei@example.com',
    contact: '+86-21-1234-5678',
    orcid: 'https://orcid.org/0000-0003-9876-5432',
    role: 'Reviewer'
  }
]


  const handleEdit = (user) => {
    console.log('Edit reviewer:', user)
  }

  const handleDelete = (user) => {
    console.log('Delete reviewer:', user)
  }

  const handleAddReviewer = () => {
    console.log('Add Reviewer clicked')
    // Optionally open a modal or navigate
  }

  return (
    <div>
      
        <button
          onClick={handleAddReviewer}
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
        >
          + Add Reviewer
        </button>
      <UserTable users={reviewers} onEdit={handleEdit} onDelete={handleDelete} columns={reviewerColumns} />
    </div>
  )
}

export default ManageReviewers
