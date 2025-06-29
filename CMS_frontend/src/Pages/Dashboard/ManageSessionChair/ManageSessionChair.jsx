import React from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { reviewerColumns } from '../../../Utilis/userTabelColumn'

const ManageSessionChair = () => {
  // Dummy data aligned with reviewers' columns
  const sessionChairs = [
    {
      _id: 'sc001',
      image: 'https://i.pravatar.cc/40?img=30',
      name: 'Prof. Lina Zhang',
      university: 'Tsinghua University',
      position: 'Session Chair',
      country: 'China',
      domain: 'Cybersecurity',
      email: 'lina.zhang@example.com',
      contact: '+86-10-1234-5678',
      orcid: 'https://orcid.org/0000-0002-2468-1357',
      role: 'Session Chair'
    },
    {
      _id: 'sc002',
      image: 'https://i.pravatar.cc/40?img=31',
      name: 'Dr. Michael Brown',
      university: 'MIT',
      position: 'Session Chair',
      country: 'USA',
      domain: 'Robotics',
      email: 'michael.brown@example.com',
      contact: '+1-617-555-9876',
      orcid: 'https://orcid.org/0000-0001-1357-2468',
      role: 'Session Chair'
    }
  ]

  const handleEdit = user => {
    console.log('Edit session chair:', user)
  }

  const handleDelete = user => {
    console.log('Delete session chair:', user)
  }

  const handleAddSessionChair = () => {
    console.log('Add Session Chair clicked')
    // Later: open modal or navigate to form
  }

  return (
    <div>
      <button
        onClick={handleAddSessionChair}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Add Session Chair
      </button>

      <UserTable
        users={sessionChairs}
        columns={reviewerColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ManageSessionChair
