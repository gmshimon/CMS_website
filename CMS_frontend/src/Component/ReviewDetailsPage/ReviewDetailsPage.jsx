import React, { useState } from 'react'
import { useParams } from 'react-router'
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

  // the params of the routes
  const { category } = useParams()

  // call the custom hooks
  const { handleInviteReview ,handleSendReminder} = useReview(category)
  useCreateUser('Reviewer')

  const handleOpenReviewerModal = row => {
    setSelectedAbstract(row)
  }
  const columns = abstractReviewColumns({
    onViewSubmission: row => setSelectedAbstract(row),
    handleSendReminder,
    maxReviewers: 3
  })
  return (
    <div>
      <div>
        <ReviewTable
          data={reviews}
          columns={columns}
          handleOpenReviewerModal={handleOpenReviewerModal}
          mode="admin"
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
