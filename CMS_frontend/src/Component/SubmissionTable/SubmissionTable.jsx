import React from 'react'
import { format } from 'date-fns'
import {
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaEdit,
  FaTrash
} from 'react-icons/fa'

const SubmissionTable = ({
  data,
  getStatusColor,
  onEdit,
  onDelete,
  onViewFiles
}) => {
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
                'Status',
                'Payment',
                'Payment Proof',
                'Review Status',
                'Submitted Files',
                'Actions',
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
              data.map((item) => (
                <tr key={item._id} className='hover:bg-gray-100 transition-all'>
                  <td className='px-4 py-3 text-sm font-medium text-gray-900'>
                    {item._id}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>{item.theme}</td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.authors[0]?.name}
                  </td>
                  <td
                    className='px-4 py-3 text-sm text-gray-700 line-clamp-2 max-w-xs'
                    title={item.title}
                  >
                    {item.title}
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
                    {item.paymentStatus || 'Unpaid'}
                  </td>
                  <td className='px-4 py-3 text-center'>
                    {item.paymentProofUrl ? (
                      <a href={item.paymentProofUrl} title='View Proof' download>
                        <FaCheckCircle className='text-green-500 text-lg mx-auto' />
                      </a>
                    ) : (
                      <FaTimesCircle className='text-red-400 text-lg mx-auto' />
                    )}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.reviewStatus || 'Pending'}
                  </td>
                  <td className='px-4 py-3 text-center'>
                    {item.submittedFiles && item.submittedFiles.length > 0 ? (
                      <button
                        onClick={() => onViewFiles(item)}
                        className='text-purple-600 hover:text-purple-800 transition-colors p-1 rounded-full hover:bg-purple-100'
                        title='View Submitted Files'
                      >
                        <FaFileAlt className='text-lg' />
                      </button>
                    ) : (
                      <span className='text-gray-400 text-xs'>No files</span>
                    )}
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
