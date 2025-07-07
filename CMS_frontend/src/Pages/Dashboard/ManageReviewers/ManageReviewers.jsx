import React, { useState } from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { reviewerColumns } from '../../../Utilis/userTabelColumn'
import CreateUserModal from '../../../Component/CreateUserModal/CreateUserModal'
import useCreateUser from '../../../Hooks/useCreateUser'
import EditUserModal from '../../../Component/EditUserModal/EditUserModal'

const ManageReviewers = () => {
  const [selectedUser, setUser] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const { handleCreateUser } = useCreateUser()
  const reviewers = [
    {
      _id: 'rev001',
      image: 'https://i.pravatar.cc/40?img=5',
      name: 'Dr. Sarah Khan',
      title: 'Dr',
      university: 'BRAC University',
      position: 'Professor of Computer Science',
      country: 'Bangladesh',
      domain: 'Artificial Intelligence',
      faculty: 'Software',
      affiliation: 'UTM',
      email: 'sarah.khan@example.com',
      contact: '+880123456789',
      orcid: 'https://orcid.org/0000-0002-1234-5678',
      role: 'Reviewer'
    },
    {
      _id: 'rev002',
      image: 'https://i.pravatar.cc/40?img=12',
      name: 'James Smith',
      title: 'Dr',
      university: 'Stanford University',
      position: 'Senior AI Researcher',
      country: 'USA',
      domain: 'Machine Learning',
      faculty: 'Software',
      affiliation: 'TU Chemnitz',
      email: 'james.smith@example.com',
      contact: '+1-555-123-4567',
      orcid: 'https://orcid.org/0000-0001-2345-6789',
      role: 'Reviewer'
    },
    {
      _id: 'rev003',
      image: 'https://i.pravatar.cc/40?img=20',
      name: 'Chen Wei',
      title: 'Dr',
      university: 'Fudan University',
      position: 'Associate Professor',
      faculty: 'Software',
      country: 'China',
      domain: 'Data Science',
      affiliation: 'TUM',
      email: 'chen.wei@example.com',
      contact: '+86-21-1234-5678',
      orcid: 'https://orcid.org/0000-0003-9876-5432',
      role: 'Reviewer'
    }
  ]

  const handleEdit = user => {
    setUser(user)
    setEditModalOpen(true)
  }

  const handleDelete = user => {
    console.log('Delete reviewer:', user)
  }

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Add Reviewer
      </button>
      <UserTable
        role={'Reviewer'}
        users={reviewers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columns={reviewerColumns}
      />
      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        selectedUser={selectedUser}
        onSubmit={handleCreateUser}
        selectedRole={'Reviewer'}
      />
      <CreateUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateUser}
        selectedRole={'Reviewer'}
      />
    </div>
  )
}

export default ManageReviewers
