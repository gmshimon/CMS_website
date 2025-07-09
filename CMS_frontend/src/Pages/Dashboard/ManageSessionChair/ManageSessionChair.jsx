import React, { useState } from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { reviewerColumns } from '../../../Utilis/userTabelColumn'
import CreateUserModal from '../../../Component/CreateUserModal/CreateUserModal'
import useCreateUser from '../../../Hooks/useCreateUser'
import { useSelector } from 'react-redux'
import EditUserModal from '../../../Component/EditUserModal/EditUserModal'

const ManageSessionChair = () => {
  const { session_chairs } = useSelector(state => state.admin)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    position: '',
    affiliation: '',
    contact: '',
    orcid: '',
    chair_bio: ''
  })
  const { handleCreateUser, handleDeleteUser, handleUpdateUser } =
    useCreateUser('Session Chair')

  const [editErrors, setEditErrors] = useState({})

  const handleEdit = user => {
    setEditForm({
      _id: user._id,
      title: user.title || '',
      position: user.position || '',
      affiliation: user.affiliation || '',
      contact: user.contact || '',
      orcid: user.orcid || '',
      chair_bio: user.chair_bio || ''
    })
    setEditErrors({})
    setEditModalOpen(true)
  }

  const handleFormChange = e => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const validateEditForm = () => {
    const errors = {}
    if (!editForm.affiliation) errors.affiliation = 'Affiliation is required'
    return errors
  }
  const handleFormSubmit = e => {
    e.preventDefault()
    const errors = validateEditForm()
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors)
      return
    }
    handleUpdateUser({ ...editForm }, 'Session Chair')
    setEditModalOpen(false)
  }
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Add Session Chair
      </button>

      <UserTable
      role={'Session Chair'}
        users={session_chairs}
        columns={reviewerColumns}
        onEdit={handleEdit}
        onDelete={handleDeleteUser}
      />
      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        form={editForm}
        errors={editErrors}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        selectedRole='Session Chair'
      />
      <CreateUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateUser}
        selectedRole={'Session Chair'}
      />
    </div>
  )
}

export default ManageSessionChair
