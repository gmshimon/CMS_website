import{ useState } from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { reviewerColumns } from '../../../Utilis/userTabelColumn'
import CreateUserModal from '../../../Component/CreateUserModal/CreateUserModal'
import useCreateUser from '../../../Hooks/useCreateUser'
import EditUserModal from '../../../Component/EditUserModal/EditUserModal'
import {  useSelector } from 'react-redux'

const ManageReviewers = () => {
  const { reviewers } = useSelector(state => state.admin)
  // eslint-disable-next-line no-unused-vars
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const { handleCreateUser, handleDeleteUser, handleUpdateUser } =
    useCreateUser("Reviewer")
  const [editForm, setEditForm] = useState({
    title: '',
    position: '',
    affiliation: '',
    contact: '',
    orcid: ''
  })
  const [editErrors, setEditErrors] = useState({})

  const handleEdit = user => {
    setEditForm({
      _id:user._id,
      title: user.title || '',
      position: user.position || '',
      affiliation: user.affiliation || '',
      contact: user.contact || '',
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
    handleUpdateUser({ ...editForm },"Reviewer")
    setEditModalOpen(false)
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
        onDelete={handleDeleteUser}
        columns={reviewerColumns}
      />
      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        form={editForm}
        errors={editErrors}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        selectedRole='Reviewer'
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
