import { format } from 'date-fns'
import { FaEye } from 'react-icons/fa'

export const abstractReviewColumns = ({ onViewSubmission, maxReviewers = 3 }) => {
  const baseColumns = [
    {
      key: '_id',
      label: 'Abstract ID'
    },
    {
      key: 'paper_title',
      label: 'Title'
    },
    {
      key: 'theme',
      label: 'Theme'
    },
    {
      key: 'conference.name',
      label: 'Conference',
      render: (_, row) => row?.conference?.name || 'N/A'
    },
    {
      key: 'createdAt',
      label: 'Submission Date',
      render: value =>
        value ? (
          <span className='text-sm text-gray-700'>
            {format(new Date(value), 'dd MMM yyyy')}
          </span>
        ) : (
          <span className='text-sm text-gray-400'>N/A</span>
        )
    }
  ]

  const reviewerColumns = Array.from({ length: maxReviewers }).map((_, index) => ({
    key: `reviewer_${index}`,
    label: `Reviewer ${index + 1}`,
    render: (_, row) => {
      const reviewer = row.reviewers?.[index]
      return reviewer ? (
        <span className='text-sm text-gray-700'>
          {reviewer.name || reviewer.email || 'Unnamed Reviewer'}
        </span>
      ) : (
        <span className='text-sm text-gray-400'>—</span>
      )
    }
  }))

  const viewColumn = {
    key: 'view_submission',
    label: 'View',
    render: (_, row) => (
      <button
        onClick={() => onViewSubmission(row)}
        className='btn btn-sm btn-outline text-blue-600 tooltip'
        data-tip='View Submission'
      >
        <FaEye />
      </button>
    )
  }

  return [...baseColumns, ...reviewerColumns, viewColumn]
}
