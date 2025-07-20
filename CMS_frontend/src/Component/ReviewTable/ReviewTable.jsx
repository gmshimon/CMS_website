import React from 'react'

const ReviewTable = ({
  data,
  columns,
  handleOpenReviewerModal,
  mode,
  handleRespondReview
}) => {
  return (
    <div className='overflow-x-auto bg-white shadow rounded-lg'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-slate-600 sticky top-0 z-0'>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className='px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap'
              >
                {col.label}
              </th>
            ))}
            {mode === 'admin' ? (
              <th className='px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap'>
                Invite Reviewer
              </th>
            ) : (
              <th className='px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap'>
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className='hover:bg-gray-50'>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className='px-4 py-2 text-sm'>
                  {col.render
                    ? col.render(row[col.key], row)
                    : row[col.key] || '—'}
                </td>
              ))}
              {mode === 'admin' ? (
                <td className='px-4 py-2'>
                  <button
                    onClick={() => handleOpenReviewerModal(row)}
                    className='btn btn-xs text-xs  btn-accent'
                  >
                    Invite
                  </button>
                </td>
              ) : (
                <td className='px-4 py-2 flex gap-2'>
                  <button
                    onClick={() => handleRespondReview(row?._id, 'accepted')}
                    className='btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded-md shadow'
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRespondReview(row?._id, 'rejected')}
                    className='btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow'
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReviewTable
