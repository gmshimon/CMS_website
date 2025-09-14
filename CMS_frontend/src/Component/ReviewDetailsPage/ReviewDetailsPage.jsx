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
import Loading from '../Loading/Loading'
import AbstractStatusModal from '../AbstractStatusModal/AbstractStatusModal'

const ReviewDetailsPage = () => {
  const { reviews, isGetAbstractReviewLoading } = useSelector(
    state => state.review
  )
  const { reviewers } = useSelector(state => state.admin)
  const [openModal, setOpenModal] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [papers, setPapers] = useState([])
  const [selectedReview, setSelectedReview] = useState(null)
  const [selectedAbstract, setSelectedAbstract] = useState(null)

  // the params of the routes
  const { category } = useParams()

  // call the custom hooks
  const {
    handleInviteReview,
    handleSendReminder,
    handleChangeStatusOfAbstract
  } = useReview(category === 'pending' ? 'accepted' : category)
  useCreateUser('Reviewer')

  const handleOpenReviewerModal = row => {
    setReviewModalOpen(true)
    setSelectedAbstract(row)
  }

  const handleViewPaperList = papers => {
    setPapers(papers)
    setModalOpen(true)
  }

  const handleViewReview = review => {
    setOpenModal(true)
    setSelectedReview(review)
  }

  const handleView = paper => {
    window.open(paper, '_blank')
  }

  const handleOpenStatusModal = row => {
    setSelectedAbstract(row)
    setStatusModalOpen(true)
  }

  const handleCloseStatusModal = () => {
    setSelectedAbstract(null)
    setStatusModalOpen(false)
  }

  const columns = abstractReviewColumns({
    onViewSubmission: row => setSelectedAbstract(row),
    handleSendReminder,
    handleViewReview,
    handleViewPaperList,
    handleOpenStatusModal,
    maxReviewers: 3
  })(reviews)

  if (isGetAbstractReviewLoading) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-160px)]'>
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <div>
        <ReviewTable
          data={reviews}
          columns={columns}
          handleOpenReviewerModal={handleOpenReviewerModal}
          mode='admin'
        />
        {selectedAbstract && reviewModalOpen && (
          <ReviewersModal
            reviewers={reviewers}
            row={selectedAbstract}
            onClose={() => {
              setSelectedAbstract(null)
              setReviewModalOpen(false)
            }}
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

        {statusModalOpen && (
          <AbstractStatusModal
            isOpen={statusModalOpen}
            onClose={handleCloseStatusModal}
            abstract={selectedAbstract}
            onSubmit={handleChangeStatusOfAbstract}
          />
        )}
      </div>
    </div>
  )
}

export default ReviewDetailsPage
