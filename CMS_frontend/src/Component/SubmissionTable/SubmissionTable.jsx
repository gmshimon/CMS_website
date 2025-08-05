import React, { useState } from 'react'
import { format } from 'date-fns'
import {
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaEdit,
  FaTrash
} from 'react-icons/fa'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const SubmissionTable = ({
  data,
  getStatusColor,
  onEdit,
  onDelete,
  onViewFiles,
  handleAbstractDecision
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-slate-600 sticky top-0 z-10'>
            <tr>
              {[
                'Abstract ID',
                'Theme',
                'Author',
                'Title',
                'Submission Date',
                'Current Status',
                'Payment',
                'Payment Proof',
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
                  <td className='px-4 py-3 text-sm font-medium text-gray-900'>
                    {item._id}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.theme}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.authors[0]?.name}
                  </td>
                  <td
                    className='px-4 py-3 text-sm text-gray-700 '
                    title={item.paper_title}
                  >
                    {item.paper_title || 'N/A'}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-500'>
                    {format(new Date(item.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className='px-4 py-3 text-sm'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.payment_status || 'Pending'}
                  </td>
                  <td className='px-4 py-3 text-center'>
                    {item.payment_proof ? (
                      <a href={item.payment_proof} title='View Proof' download>
                        <FaCheckCircle className='text-green-500 text-lg mx-auto' />
                      </a>
                    ) : (
                      <FaTimesCircle className='text-red-400 text-lg mx-auto' />
                    )}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.reviewStatus || 'Pending'}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    <span
                      className='text-blue-600 cursor-pointer hover:text-blue-800 hover:underline'
                      onClick={() => setIsOpen(true)}
                    >
                      View abstract
                    </span>
                    <br />
                    <p>
                      {/* {
                    !item?.paper && span 
                  } */}
                    </p>
                  </td>
                  <td className='px-4 py-3 text-center'>
                    {
                      item.status ==='Abstract Submitted'?<select 
                      onChange={e => handleAbstractDecision(item._id, e.target.value)}
                     className='border border-gray-300 rounded-md p-1 text-xs'>
                      <option value=''>Select Action</option>
                      <option value="Accepted">Accept</option>
                      <option value="Rejected">Reject</option>
                    </select>:<span className='text-sm'>{item.status==="Rejected"?"Abstract Rejected":"Abstract Accepted"}</span>
                    }
                  </td>
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
