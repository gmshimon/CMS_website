import { format } from 'date-fns'
import { FaEye } from 'react-icons/fa'
import { getStatusColor } from './getStatusColor'
export const abstractReviewColumns = ({
  handleSendReminder,
  handleViewReview,
  handleViewPaperList,
  handleOpenStatusModal
}) => {
  const baseColumns = [
    {
      key: '_id',
      label: 'Abstract ID',
      render: (_, row) => row?.abstract_id || row?._id
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
      key: 'status',
      label: 'Status',
      render: (_, row) => (
        <div className='w-32 gap-2'>
          <span
            className={`px-2 inline-flex text-[10px] leading-5 font-semibold rounded-full ${getStatusColor(
              row.status
            )}`}
          >
            {row.status}
          </span>
          <br />
          <button
            onClick={() => handleOpenStatusModal(row)}
            className='px-1 py-1 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors duration-200 text-xs mt-1 flex items-center gap-1'
          >
            Change Decision
          </button>
        </div>
      )
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
  ];

  // Dynamically generate reviewer columns based on the maximum number of reviewers in the data
  const reviewerColumns = (rowData = []) => {
    const maxReviewers = Math.max(...rowData.map(r => r.reviews?.length || 0), 0);
    return Array.from({ length: maxReviewers }).map((_, index) => ({
      key: `reviewer_${index}`,
      label: `Reviewer ${index + 1}`,
      render: (_, row) => {
        const review = row?.reviews[index];
        const reviewer = review?.reviewer;

        if (!reviewer) return <span className='text-sm text-gray-400'>—</span>;

        const { name, email } = reviewer;
        const hasReviewed = review?.completedAt && review?.status == 'reviewed';
        const hasAccepted = review?.status === 'accepted';
        const noResponse = !hasReviewed;

        const now = new Date();
        const deadline = review?.deadline ? new Date(review.deadline) : null;
        const isOverdue = deadline && now > deadline && !hasReviewed;

        let statusLabel = '';
        let statusColor = '';

        if (hasReviewed) {
          statusLabel = 'Reviewed';
          statusColor = 'text-blue-600';
        } else if (isOverdue) {
          statusLabel = `Overdue (${deadline.toLocaleDateString()})`;
          statusColor = 'text-red-600';
        } else if (hasAccepted) {
          statusLabel = `Under Review (Deadline: ${format(deadline, 'dd MMM yyyy')})`;
          statusColor = 'text-green-600';
        } else {
          statusLabel = 'No Response';
          statusColor = 'text-yellow-600';
        }

        return (
          <div className='flex flex-col gap-1 text-sm'>
            <span className='font-medium text-gray-700'>
              {name || email || 'Unnamed Reviewer'}
            </span>
            <span className={`text-xs font-semibold ${statusColor}`}>{statusLabel}</span>
            {hasReviewed && (
              <button
                onClick={() => handleViewReview(review)}
                className='px-2 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors duration-200 mt-1'
              >
                View Review
              </button>
            )}
            {noResponse && (
              <button
                onClick={() => handleSendReminder(review?._id)}
                className='px-2 py-2 text-sm font-semibold text-white bg-amber-600 rounded-md hover:bg-amber-700 transition-colors duration-200 mt-1'
              >
                Reminder
              </button>
            )}
          </div>
        );
      }
    }));
  };

  const viewColumn = {
    key: 'view_submission',
    label: 'View',
    render: (_, row) => (
      <button
        onClick={() => handleViewPaperList(row.papers)}
        className='px-1 py-1 text-sm font-semibold  border border-black rounded-md transition-colors duration-200 text-blue-600 tooltip'
        data-tip='View Submission Paper'
      >
        <FaEye />
      </button>
    )
  };

  return (rowData = []) => [...baseColumns, ...reviewerColumns(rowData), viewColumn];
};

export const reviewHomeColumn = ({
  handleViewPaperList,
  handleOpenAbstract
}) => {
  return [
    {
      key: '_id',
      label: 'Abstract ID',
      render: (_, row) => row?.abstract?.abstract_id
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
      key: 'conference.name',
      label: 'Abstract Status',
      render: (_, row) =><span className={`px-2 inline-flex text-[10px] leading-5 font-semibold rounded-full ${ getStatusColor(row?.abstract?.status )}`}>{row?.abstract?.status}</span>|| 'N/A'
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, row) => {
        const status = row?.status?.toLowerCase() || ''
        // Capitalize first letter
        const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1)

        return <span className={`px-2 inline-flex text-[10px] leading-5 font-semibold rounded-full ${getStatusColor(row?.status)}`}>{formattedStatus}</span>
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
    },
    {
      key: 'abstract.createdAt',
      label: 'Review Deadline',
      render: (_, row) =>
        row.abstract?.createdAt ? (
          <span className='text-sm text-gray-700'>
            {format(new Date(row?.deadline.split('T')[0]), 'dd MMM yyyy')}
          </span>
        ) : (
          <span className='text-sm text-gray-400'>N/A</span>
        )
    },
    {
      key: 'view_abstract',
      label: 'View Abstract',
      render: (_, row) => (
        <button
          className='text-blue-600 hover:underline'
          onClick={() => handleOpenAbstract(row.abstract)}
        >
          View
        </button>
      )
    },
    {
      key: 'view_submission',
      label: 'View Paper',
      render: (_, row) => (
        <button
          onClick={() => handleViewPaperList(row.abstract.paper)}
          className='px-1 py-1 text-sm font-semibold  border border-black rounded-md transition-colors duration-200 text-blue-600 tooltip'
          data-tip='View Submission Paper'
        >
          <FaEye />
        </button>
      )
    }
  ]
}
