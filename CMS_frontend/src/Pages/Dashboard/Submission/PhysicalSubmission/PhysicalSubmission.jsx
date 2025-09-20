import React, { useState } from 'react'
import SubmissionTable from '../../../../Component/SubmissionTable/SubmissionTable'
import { useParams } from 'react-router'
import useSubmissions from '../../../../Hooks/useSubmissions'
import { useSelector } from 'react-redux'
import EditSubmissionModal from '../../../../Component/EditSubmissionModal/EditSubmissionModal'
import { getStatusColor } from '../../../../Utilis/getStatusColor'
import Loading from '../../../../Component/Loading/Loading'

const PhysicalSubmission = () => {
  const { abstracts, getAbstractLoading } = useSelector(state => state.abstract)
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState()

  const { method } = useParams()
  const {
    handleAbstractDecision,
    handlePaymentDecision,
    handleEditSubmission,
    handlePaymentReminder,
    handlePaperSubmitReminder
  } = useSubmissions(method)

  const handleOpenEditModal = row => {
    setData(row)
    setModalOpen(true)
  }
  if (getAbstractLoading) {
    return (
      <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <Loading />
      </div>
    )
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
