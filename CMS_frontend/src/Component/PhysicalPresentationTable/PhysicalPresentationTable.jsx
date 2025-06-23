import React from 'react'
import { format } from 'date-fns'
import { IoMdEye } from 'react-icons/io'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const PhysicalPresentationTable = ({ data, getStatusColor, onView }) => {
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
                <td colSpan={10} className='text-center py-6 text-gray-500'>
                  No presentations available.
                </td>
              </tr>
            ) : (
              data.map((item) => (
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
                      <a
                        href={item.paymentProofUrl}
                        title='View Proof'
                        download
                      >
                        <FaCheckCircle className='text-green-500 text-lg mx-auto' />
                      </a>
                    ) : (
                      <FaTimesCircle className='text-red-400 text-lg mx-auto' />
                    )}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {item.reviewStatus || 'Pending'}
                  </td>
                  <td className='px-4 py-3'>
                    <button
                      onClick={() => onView(item)}
                      className='text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-100'
                      title='View Details'
                    >
                      <IoMdEye className='text-xl' />
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

export default PhysicalPresentationTable
