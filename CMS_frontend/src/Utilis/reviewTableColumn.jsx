import { format } from 'date-fns'
import { FaEye } from 'react-icons/fa'

export const abstractReviewColumns = ({
  onViewSubmission,
  handleSendReminder,
  handleViewReview,
  handleViewPaperList,
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
      key:"status",
      label:"Status"
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

        const { name, email, status } = reviewer
        const hasReviewed = row?.reviews[index]?.completedAt
        const hasAccepted = status === 'accepted'
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
            {
              hasReviewed&&<button onClick={()=>handleViewReview(row?.reviews[index])} className='btn btn-xs btn-accent mt-1'>
                View Review
              </button>
            }
            {noResponse && (
              <button
                onClick={() => handleSendReminder(row?.reviews[index]?._id)}
                className='btn btn-xs btn-warning mt-1'
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
        onClick={() =>handleViewPaperList(row.papers)}
        className='btn btn-sm btn-outline text-blue-600 tooltip'
        data-tip='View Submission Paper'
      >
        <FaEye />
      </button>
    )
  }

  return [...baseColumns, ...reviewerColumns, viewColumn]
}

export const reviewHomeColumn = [
  {
    key: '_id',
    label: 'Abstract ID',
    render: (_, row) => row?.abstract?._id
  },
  {
    key: 'abstract.paper_title',
    label: 'Title',
    render: (_, row) => row?.abstract?.paper_title
  },
  {
    key: 'theme',
    label: 'Theme',
    render: (_, row) => row?.abstract?.theme
  },
  {
    key: 'conference.name',
    label: 'Conference',
    render: (_, row) => row?.abstract?.conference?.name || 'N/A'
  },
  {
    key: 'status',
    label: 'Status',
    render: (_, row) => {
      const status = row?.status?.toLowerCase() || ''
      let color = ''

      // Set colors based on status
      switch (status) {
        case 'accepted':
          color = 'green'
          break
        case 'reviewed':
          color = 'blue'
          break
        case 'pending':
          color = 'orange'
          break
        case 'overdue':
          color = 'red'
          break
        default:
          color = 'gray'
      }

      // Capitalize first letter
      const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1)

      return <span style={{ color }}>{formattedStatus}</span>
    }
  },
  {
    key: 'abstract.createdAt',
    label: 'Submission Date',
    render: (_, row) =>
      row.abstract?.createdAt ? (
        <span className='text-sm text-gray-700'>
          {format(new Date(row?.abstract?.createdAt), 'dd MMM yyyy')}
        </span>
      ) : (
        <span className='text-sm text-gray-400'>N/A</span>
      )
  }
]
