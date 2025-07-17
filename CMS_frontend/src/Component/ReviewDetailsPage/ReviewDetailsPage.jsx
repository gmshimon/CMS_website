import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { abstractReviewColumns } from '../../Utilis/reviewTableColumn'
import ReviewTable from '../ReviewTable/ReviewTable'
import useReview from '../../Hooks/useReview'
import { useSelector } from 'react-redux'
import ReviewersModal from '../ReviewersModal/ReviewersModal'
import useCreateUser from '../../Hooks/useCreateUser'

const ReviewDetailsPage = () => {
  const { reviews } = useSelector(state => state.review)
  const { reviewers } = useSelector(state => state.admin)
  const [selectedAbstract, setSelectedAbstract] = useState(null)
  const { category } = useParams()
  const { handleInviteReview } = useReview(category)
  useCreateUser('Reviewer')

  const handleOpenReviewerModal = row => {
    setSelectedAbstract(row)
  }
  const columns = abstractReviewColumns({
    onViewSubmission: row => setSelectedAbstract(row),
    maxReviewers: 3
  })

  return (
    <div>
      <div>
        <ReviewTable
          data={reviews}
          columns={columns}
          handleOpenReviewerModal={handleOpenReviewerModal}
        />
        {selectedAbstract && (
          <ReviewersModal
            reviewers={reviewers}
            row={selectedAbstract}
            onClose={() => setSelectedAbstract(null)}
            handleInviteReview={handleInviteReview}
          />
        )}
      </div>
    </div>
  )
}

export default ReviewDetailsPage
