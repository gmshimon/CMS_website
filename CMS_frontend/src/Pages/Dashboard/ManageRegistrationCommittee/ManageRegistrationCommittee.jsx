import React, { useState } from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { committeeScientificColumns } from '../../../Utilis/userTabelColumn'
import useCreateUser from '../../../Hooks/useCreateUser'
import CreateUserModal from '../../../Component/CreateUserModal/CreateUserModal'
import { useSelector } from 'react-redux'
import EditUserModal from '../../../Component/EditUserModal/EditUserModal'
const ManageRegistrationCommittee = () => {
  const { registrationCommittee } = useSelector(state => state.admin)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    name: '',
    position: '',
    affiliation: '',
    faculty: '',
    contact: '',
    country: '',

  })
  const [editErrors, setEditErrors] = useState({})
  const {
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleDeleteImage,
    handleAddImage
  } = useCreateUser('registration_committee')
  const handleEdit = user => {
    setEditForm({
      _id: user._id,
      title: user.title || '',
      name: user.name || '',
      position: user.position || '',
      affiliation: user.affiliation || '',
      contact: user.contact || '',
      faculty: user.faculty || '',
      country: user.country || '',

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
        + Add Member
      </button>

      <UserTable
        users={registrationCommittee}
        columns={committeeScientificColumns({
          handleDeleteImage,
          handleAddImage,
          role: 'registration_committee'
        })}
        onEdit={handleEdit}
        onDelete={handleDeleteUser}
        role={'registration_committee'}
      />

      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        form={editForm}
        errors={editErrors}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        selectedRole='registration_committee'
      />
      <CreateUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateUser}
        selectedRole={'registration_committee'}
      />
    </div>
  )
}

export default ManageRegistrationCommittee
