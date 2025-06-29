import React from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { reviewerColumns } from '../../../Utilis/userTabelColumn'

const ManageKeynoteSpeaker = () => {
  const keynoteSpeakers = [
    {
      _id: 'ks001',
      image: 'https://i.pravatar.cc/40?img=11',
      name: 'Dr. Ayesha Karim',
      university: 'University of Toronto',
      position: 'Keynote Speaker',
      country: 'Canada',
      domain: 'Data Science',
      email: 'ayesha.karim@example.com',
      contact: '+1-416-555-9876',
      orcid: 'https://orcid.org/0000-0002-5678-1234',
      role: 'Keynote Speaker'
    },
    {
      _id: 'ks002',
      image: 'https://i.pravatar.cc/40?img=12',
      name: 'Prof. Lars Müller',
      university: 'TU Berlin',
      position: 'Keynote Speaker',
      country: 'Germany',
      domain: 'Artificial Intelligence',
      email: 'lars.mueller@example.com',
      contact: '+49-30-9876-5432',
      orcid: 'https://orcid.org/0000-0003-1234-5678',
      role: 'Keynote Speaker'
    }
  ]

  const handleEdit = user => {
    console.log('Edit keynote speaker:', user)
  }

  const handleDelete = user => {
    console.log('Delete keynote speaker:', user)
  }

  const handleAddKeynote = () => {
    console.log('Add Keynote Speaker clicked')
    // Optional: open modal or navigate to form
  }

  return (
    <div>
      <button
        onClick={handleAddKeynote}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Add Keynote Speaker
      </button>

      <UserTable
        users={keynoteSpeakers}
        columns={reviewerColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ManageKeynoteSpeaker
