import React, { useState } from 'react'
import { useParams } from 'react-router'
import { abstractReviewColumns } from '../../Utilis/reviewTableColumn'
import ReviewTable from '../ReviewTable/ReviewTable'
import useReview from '../../Hooks/useReview'
import { useSelector } from 'react-redux'
import ReviewersModal from '../ReviewersModal/ReviewersModal'
import useCreateUser from '../../Hooks/useCreateUser'
import ReviewModal from '../ReviewModal/ReviewModal'
import PaperListModal from '../PaperListModal/PaperListModal'

const ReviewDetailsPage = () => {
  const { reviews } = useSelector(state => state.review)
  const { reviewers } = useSelector(state => state.admin)
  const [openModal, setOpenModal] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [papers,setPapers] = useState([])
  const [selectedReview, setSelectedReview] = useState(null)
  const [selectedAbstract, setSelectedAbstract] = useState(null)
  const examplePapers = [
    { _id: '1', title: 'AI in 2025', submissionDate: '2025-07-25T10:00:00Z' },
    {
      _id: '2',
      title: 'Quantum Computing',
      submissionDate: '2025-07-26T09:30:00Z'
    }
  ]
  // the params of the routes
  const { category } = useParams()

  // call the custom hooks
  const { handleInviteReview, handleSendReminder } = useReview(category)
  useCreateUser('Reviewer')

  const handleOpenReviewerModal = row => {
    setSelectedAbstract(row)
  }

  const handleViewPaperList = papers =>{
    setPapers(papers)
    setModalOpen(true)
  }

  const handleViewReview = review => {
    setOpenModal(true)
    setSelectedReview(review)
  }

  const handleView = paper => {
    window.open(paper.link, '_blank')
  }

  const columns = abstractReviewColumns({
    onViewSubmission: row => setSelectedAbstract(row),
    handleSendReminder,
    handleViewReview,
    handleViewPaperList,
    maxReviewers: 3
  })
  return (
    <div>
      <div>
        <ReviewTable
          data={reviews}
          columns={columns}
          handleOpenReviewerModal={handleOpenReviewerModal}
          mode='admin'
        />
        {selectedAbstract && (
          <ReviewersModal
            reviewers={reviewers}
            row={selectedAbstract}
            onClose={() => setSelectedAbstract(null)}
            handleInviteReview={handleInviteReview}
          />
        )}
        {openModal && (
          <ReviewModal
            isOpen={openModal}
            isEditable={false}
            onClose={() => setOpenModal(false)}
            paper={selectedReview}
          />
        )}
        <PaperListModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          papers={papers}
          onView={handleView}
        />
      </div>
    </div>
  )
}

export default ReviewDetailsPage
