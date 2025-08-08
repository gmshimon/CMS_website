import React, { useState } from 'react'
import SubmissionTable from '../../../../Component/SubmissionTable/SubmissionTable'
import { useParams } from 'react-router'
import useSubmissions from '../../../../Hooks/useSubmissions'
import { useSelector } from 'react-redux'
import EditSubmissionModal from '../../../../Component/EditSubmissionModal/EditSubmissionModal'

const PhysicalSubmission = () => {
  const { abstracts } = useSelector(state => state.abstract)
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState()

  const { method } = useParams()
  const { handleAbstractDecision,handlePaymentDecision ,handleEditSubmission ,handlePaymentReminder,handlePaperSubmitReminder} =
    useSubmissions(method)

  const handleOpenEditModal = row => {
    setData(row)
    setModalOpen(true)
  }

  function getStatusColor (status) {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <SubmissionTable
        data={abstracts}
        getStatusColor={getStatusColor}
        onView={item => alert(`View details: ${item.title}`)}
        onEdit={handleOpenEditModal}
        onDelete={item => alert(`Delete: ${item._id}`)}
        handleAbstractDecision={handleAbstractDecision}
        handlePaymentDecision={handlePaymentDecision}
        handlePaymentReminder={handlePaymentReminder}
        handlePaperSubmitReminder={handlePaperSubmitReminder}
      />

      <EditSubmissionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleEditSubmission}
        initialData={data}
      />
    </div>
  )
}

export default PhysicalSubmission
