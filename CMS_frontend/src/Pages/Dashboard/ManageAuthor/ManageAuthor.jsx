import { useState } from 'react'
import UserTable from '../../../Component/UserTable/UserTable'
import { authorColumns } from '../../../Utilis/userTabelColumn'
import CreateUserModal from '../../../Component/CreateUserModal/CreateUserModal'
import useCreateUser from '../../../Hooks/useCreateUser'

const ManageAuthor = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { handleCreateUser } = useCreateUser()
  const authors = [
    {
      _id: 'auth001',
      name: 'Dr. Amina Rahman',
      email: 'amina.rahman@example.com',
      address: '45 North Road, Dhaka',
      country: 'Bangladesh',
      affiliation: 'University of Dhaka',
      faculty: 'Science',
      submission: 'Abstract Submitted',
      payment: 'Pending',
      payment_decision: 'Unpaid'
    },
    {
      _id: 'auth002',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Maple Street',
      country: 'USA',
      affiliation: 'MIT',
      faculty: 'Engineering',
      submission: 'Abstract Submitted',
      payment: 'Paid',
      payment_proof:
        'https://www.youtube.com/watch?v=Z_OY3-H-0W8&list=RDZ_OY3-H-0W8&start_radio=1',
      payment_decision: 'Paid'
    },
    {
      _id: 'auth003',
      name: 'Maria Lopez',
      email: 'maria.lopez@example.com',
      address: '56 Calle de la Paz',
      country: 'Spain',
      affiliation: 'University of Barcelona',
      faculty: 'Arts',
      submission: 'Abstract Submitted',
      payment: 'Unpaid',
      payment_proof:
        'https://www.youtube.com/watch?v=Z_OY3-H-0W8&list=RDZ_OY3-H-0W8&start_radio=1',
      payment_decision: 'Paid'
    }
  ]

  const handleEdit = user => {
    console.log('Edit author:', user)
  }

  const handleDelete = user => {
    console.log('Delete author:', user)
  }
  const handlePaymentDecisionChange = (newValue, user) => {
  console.log(`Changed payment decision for ${user.name} to ${newValue}`)
  // optionally update state or send API request
}

  return (
    <div>
      {/* <button
        onClick={() => setModalOpen(true)}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Add Author
      </button> */}

      <UserTable
        role='Presenter'
        users={authors}
        columns={authorColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPaymentDecisionChange={handlePaymentDecisionChange}
      />
      <CreateUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateUser}
        selectedRole={'Presenter'}
      />
    </div>
  )
}

export default ManageAuthor
