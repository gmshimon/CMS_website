import { useState } from 'react'
import { format } from 'date-fns'
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa'

const SubmissionTable = ({
  data,
  getStatusColor,
  onEdit,
  onDelete,
  handleAbstractDecision,
  handlePaymentDecision,
  handlePaymentReminder,
  handlePaperSubmitReminder
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='overflow-x-auto h-[550px] overflow-y-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-slate-600 sticky top-0 z-10'>
            <tr>
              {[
                'Abstract ID',
                'Theme',
                'Author',
                'Title',
                'Submission Date',
                'Submission Deadline',
                'Current Status',
                'Payment',
                'Payment Proof',
                'Payment Deadline',
                'Review Status',
                'Abstract Submitted',
                'Abstract Decisions',
                'Actions'
              ].map((heading, i) => (
                <th
                  key={i}
                  className='px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap'
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className='bg-white divide-y divide-gray-200'>
            {data.length === 0 ? (
              <tr>
                <td colSpan={11} className='text-center py-6 text-gray-500'>
                  No presentations available.
                </td>
              </tr>
            ) : (
              data.map(item => (
                <tr key={item._id} className='hover:bg-gray-100 transition-all'>
                  {/* Abstract ID */}
                  <td className='px-4 py-3 text-sm font-medium text-gray-900'>
                    {item.abstract_id || item?._id}
                  </td>

                  {/* theme */}
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.theme}
                  </td>

                  {/* Author name */}
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    <>
                      <div className='font-medium text-gray-800 mb-1'>
                        {item.authors.length} Author(s)
                      </div>
                      <div className='space-y-1'>
                        <div className='space-y-1'>
                          {item.authors.slice(0, 2).map((item, idx) => (
                            <div
                              key={idx}
                              className='text-gray-600 truncate max-w-44'
                              title={item.name}
                            >
                              • {item.name}
                            </div>
                          ))}
                          {item.authors.length > 2 && (
                            <div className='text-gray-500 text-xs'>
                              +{item.authors.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                    {/* {item.authors[0]?.name} */}
                  </td>
                  {/* paper_title */}
                  <td
                    className='px-4 py-3 text-sm text-gray-700 '
                    title={item.paper_title}
                  >
                    {item.paper_title || 'N/A'}
                  </td>
                  {/* submission_date */}
                  <td className='px-4 py-3 text-sm text-gray-500'>
                    {format(new Date(item.createdAt), 'MMM d, yyyy')}
                  </td>

                  {/* Submission Deadline */}
                  <td className='px-4  py-3 text-sm text-gray-500'>
                    {item?.paper_deadline
                      ? format(new Date(item.paper_deadline), 'MMM d, yyyy')
                      : 'N/A'}
                  </td>

                  {/* status */}
                  <td className='px-4 py-3 text-sm w-40 '>
                    <p
                      className={`px-2 py-1 mt-4 rounded-full text-center text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </p>
                    <br />
                    {/* Change abstract status */}
                    {item?.status === 'Abstract Accepted' &&
                      item.payment_status === 'Paid' && (
                        <button
                          onClick={() => handlePaperSubmitReminder(item._id)}
                          className='mt-2 px-2 w-full py-1 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded'
                        >
                          Paper Reminder
                        </button>
                      )}
                  </td>

                  {/* payment_status */}
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.payment_status === 'Pending' ? (
                      <select
                        onChange={e =>
                          handlePaymentDecision(item._id, e.target.value)
                        }
                        className='border border-gray-300 rounded-md p-1 text-xs'
                      >
                        <option value=''>Select Payment Status</option>
                        <option value='Paid'>Accept</option>
                        <option value='Unpaid'>Reject</option>
                      </select>
                    ) : (
                      <>
                        {item.payment_status}
                        <br />
                        {item.payment_status === 'Unpaid' &&
                          item.status === 'Abstract Accepted' && (
                            <button
                              className='mt-1 px-2 w-full py-1 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded'
                              onClick={() => handlePaymentReminder(item._id)}
                            >
                              Payment_Reminder
                            </button>
                          )}
                      </>
                    )}
                  </td>

                  {/* payment_proof */}
                  <td className='px-4 py-3 text-center'>
                    {item.payment_proof ? (
                      <a
                        href={item.payment_proof}
                        target='_blank'
                        title='View Proof'
                        download
                      >
                        <span className='text-green-500 text-sm mx-auto'>
                          View
                        </span>
                      </a>
                    ) : (
                      <FaTimesCircle className='text-red-400 text-lg mx-auto' />
                    )}
                  </td>

                  {/* payment_deadline */}
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.payment_deadline
                      ? format(new Date(item.payment_deadline), 'MMM d, yyyy')
                      : 'N/A'}
                  </td>

                  {/* review_status */}
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.reviewStatus || 'Pending'}
                  </td>

                  {/* Abstract Submitted */}
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    <span
                      className='text-blue-600 cursor-pointer hover:text-blue-800 hover:underline'
                      onClick={() => setIsOpen(true)}
                    >
                      View abstract
                    </span>
                    <p>
                      {item?.papers
                        ? item.papers.paper.map((paper, index) => (
                            <a
                              key={index}
                              className='text-blue-600 cursor-pointer hover:text-blue-800 hover:underline text-xs mt-1 block'
                              target='_blank'
                              href={paper.url}
                            >
                              {paper?.originalName}
                            </a>
                          ))
                        : 'No files uploaded'}
                    </p>
                  </td>

                  {/* Abstract Decisions */}
                  <td className='px-4 py-3 text-center'>
                    {item.status === 'Abstract Submitted' ? (
                      <select
                        onChange={e =>
                          handleAbstractDecision(item._id, e.target.value)
                        }
                        className='border border-gray-300 rounded-md p-1 text-xs'
                      >
                        <option value=''>Select Action</option>
                        <option value='Abstract Accepted'>Accept</option>
                        <option value='Rejected'>Reject</option>
                      </select>
                    ) : (
                      <span className='text-sm'>
                        {item.status === 'Rejected'
                          ? 'Abstract Rejected'
                          : 'Abstract Accepted'}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className='px-4 py-3 whitespace-nowrap space-x-2'>
                    <button
                      onClick={() => onEdit(item)}
                      className='text-yellow-600 hover:text-yellow-800 transition-colors p-1 rounded-full hover:bg-yellow-100'
                      title='Edit'
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className='text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-100'
                      title='Delete'
                    >
                      <FaTrash />
                    </button>
                  </td>

                  {/* Abstract modal */}
                  {isOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 '>
                      <div className='bg-white p-6 rounded-lg max-w-lg w-full shadow-lg relative h-96 overflow-y-auto'>
                        <h2 className='text-lg font-bold mb-4 sticky'>
                          Abstract
                        </h2>
                        <p className='text-gray-700 whitespace-pre-wrap'>
                          <div
                            className='text-justify'
                            dangerouslySetInnerHTML={{ __html: item.abstract }}
                          />
                        </p>
                        <button
                          onClick={() => setIsOpen(false)}
                          className='absolute top-2 right-2 text-gray-600 hover:text-black text-xl'
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SubmissionTable
