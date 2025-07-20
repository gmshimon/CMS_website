import { format } from 'date-fns'
import { FaEye } from 'react-icons/fa'

export const abstractReviewColumns = ({
  onViewSubmission,
  handleSendReminder,
  maxReviewers = 3
}) => {
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

  const reviewerColumns = Array.from({ length: maxReviewers }).map(
    (_, index) => ({
      key: `reviewer_${index}`,
      label: `Reviewer ${index + 1}`,
      render: (_, row) => {
        const reviewer = row?.reviews[index]?.reviewer

        if (!reviewer) {
          return <span className='text-sm text-gray-400'>—</span>
        }

        const { name, email, status, completedAt } = reviewer

        const hasReviewed = !!completedAt
        const hasAccepted = status === 'Accepted'
        const noResponse = !hasAccepted && !hasReviewed

        let statusLabel = ''
        let statusColor = ''

        if (hasReviewed) {
          statusLabel = 'Reviewed'
          statusColor = 'text-blue-600'
        } else if (hasAccepted) {
          statusLabel = 'Under Review'
          statusColor = 'text-green-600'
        } else {
          statusLabel = 'No Response'
          statusColor = 'text-yellow-600'
        }

        return (
          <div className='flex flex-col gap-1 text-sm'>
            <span className='font-medium text-gray-700'>
              {name || email || 'Unnamed Reviewer'}
            </span>
            <span className={`text-xs font-semibold ${statusColor}`}>
              {statusLabel}
            </span>
            {noResponse && (
              <button
                onClick={() =>handleSendReminder(row?.reviews[index]?._id)}
                className='btn btn-xs btn-outline btn-warning mt-1'
              >
                Reminder
              </button>
            )}
          </div>
        )
      }
    })
  )

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
