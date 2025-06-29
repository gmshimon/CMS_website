import React from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { authorColumns } from '../../../Utilis/userTabelColumn'



const ManageAuthor = () => {
  const authors = [
    {
      _id: 'auth001',
      name: 'Dr. Amina Rahman',
      email: 'amina.rahman@example.com',
      address: '45 North Road, Dhaka',
      country: 'Bangladesh',
      affiliation: 'University of Dhaka',
      faculty: 'Science',
      role: 'Author'
    },
    {
      _id: 'auth002',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Maple Street',
      country: 'USA',
      affiliation: 'MIT',
      faculty: 'Engineering',
      role: 'Author'
    },
    {
      _id: 'auth003',
      name: 'Maria Lopez',
      email: 'maria.lopez@example.com',
      address: '56 Calle de la Paz',
      country: 'Spain',
      affiliation: 'University of Barcelona',
      faculty: 'Arts',
      role: 'Author'
    }
  ]

  const handleEdit = user => {
    console.log('Edit author:', user)
  }

  const handleDelete = user => {
    console.log('Delete author:', user)
  }

  const handleAddAuthor = () => {
    console.log('Add Author clicked')
    // Later, open modal or route to a form
  }

  return (
    <div>
      <button
        onClick={handleAddAuthor}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Add Author
      </button>

      <UserTable
        users={authors}
        columns={authorColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ManageAuthor
