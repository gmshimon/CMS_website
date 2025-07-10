import React, { useState } from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { keynoteSpeakerCol } from '../../../Utilis/userTabelColumn'
import CreateUserModal from '../../../Component/CreateUserModal/CreateUserModal'
import useCreateUser from '../../../Hooks/useCreateUser'
import { useSelector } from 'react-redux'
import EditUserModal from '../../../Component/EditUserModal/EditUserModal'

const ManageKeynoteSpeaker = () => {
  const { keynote_speakers } = useSelector(state => state.admin)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    position: '',
    affiliation: '',
    talk_title: '',
    talk_abstract: '',
    speaker_bio: '',
    contact: '',
    orcid: ''
  })
  const [editErrors, setEditErrors] = useState({})
  const { handleCreateUser, handleDeleteUser, handleUpdateUser,handleDeleteImage } =
    useCreateUser('Keynote Speaker')

  const handleEdit = user => {
    setEditForm({
      _id: user._id,
      title: user.title || '',
      position: user.position || '',
      affiliation: user.affiliation || '',
      contact: user.contact || '',
      talk_title: user.talk_title || '',
      talk_abstract: user.talk_abstract || '',
      speaker_bio: user.speaker_bio || '',
      orcid: user.orcid || ''
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

  // const handleDeleteImage = row => {
  //   console.log('Delete image for', row)
  //   // Your API call and state update logic here
  // }

  const handleAddImage = row => {
    console.log('Add image for', row)
    // Your file picker/modal logic here
  }

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Add Keynote Speaker
      </button>

      <UserTable
        role={'Keynote Speaker'}
        users={keynote_speakers}
        columns={keynoteSpeakerCol({
          handleDeleteImage,
          handleAddImage
        })}
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
        selectedRole='Keynote Speaker'
      />
      <CreateUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateUser}
        selectedRole={'Keynote Speaker'}
      />
    </div>
  )
}

export default ManageKeynoteSpeaker
