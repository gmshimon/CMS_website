import React from 'react'

const ReviewTable = ({
  data,
  columns,
  handleOpenReviewerModal,
  mode,
  handleRespondReview,
  category = null,
  handleOpenReviewModal
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
                    className='btn-sm px-1 py-1 text-sm font-semibold text-black bg-teal-400 rounded-md hover:bg-teal-500 transition-colors duration-200 mr-2'
                  >
                    Invite
                  </button>
                </td>
              ) : (
                <td className='px-4 py-2 flex gap-2'>
                  {category === 'pending' ? (
                    <>
                      <button
                        onClick={() =>
                          handleRespondReview(row?._id, 'accepted')
                        }
                        className='btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded-md shadow'
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleRespondReview(row?._id, 'rejected')
                        }
                        className='btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow'
                      >
                        Reject
                      </button>
                    </>
                  ) : category === 'accepted' ? (
                    <>
                      <button
                        onClick={() => handleOpenReviewModal(row, true)}
                        className='btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow'
                      >
                        Review
                      </button>
                    </>
                  ) : category === 'reviewed' ? (
                    <>
                      <button
                        onClick={() => handleOpenReviewModal(row, false)}
                        className='btn btn-sm bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow'
                      >
                        Review report
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href='https://www.programiz.com/javascript/online-compiler/'
                        target='_blank'
                      >
                        <button className='btn btn-sm bg-gray-500 hover:bg-gray-600 text-white rounded-md shadow'>
                          View Certificate
                        </button>
                      </a>
                    </>
                  )}
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
