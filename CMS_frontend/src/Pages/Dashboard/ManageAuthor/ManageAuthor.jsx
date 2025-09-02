import UserTable from '../../../Component/UserTable/UserTable'
import { authorColumns } from '../../../Utilis/userTabelColumn'
import useCreateUser from '../../../Hooks/useCreateUser'
import { useDispatch, useSelector } from 'react-redux'
import { sendPaymentReminder } from '../../../Redux/Slice/AbstractSlice'

const ManageAuthor = () => {
  const { presenter } = useSelector(state => state.admin)
  useCreateUser('Presenter')

  const  dispatch  = useDispatch()

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
const handlePaymentReminder = (id)=>{
  dispatch(sendPaymentReminder(id))
}
  return (
    <div>
      <UserTable
        role='Presenter'
        users={presenter}
        columns={authorColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPaymentDecisionChange={handlePaymentDecisionChange}
        handlePaymentReminder={handlePaymentReminder}
      />
    </div>
  )
}

export default ManageAuthor
