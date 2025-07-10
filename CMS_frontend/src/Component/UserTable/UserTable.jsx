import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const UserTable = ({
  role,
  users,
  onDelete,
  onEdit,
  columns,
  onPaymentDecisionChange
}) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-slate-600 sticky top-0 z-10'>
            <tr>
              {columns?.map((col, index) => (
                <th
                  key={index}
                  className='px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap'
                >
                  {col.label}
                </th>
              ))}
              <th className='px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='bg-white divide-y divide-gray-200'>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className='text-center py-6 text-gray-500'
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id} className='hover:bg-gray-100 transition-all'>
                  {columns.map((col, index) => (
                    <td key={index} className='px-4 py-3 text-sm text-gray-700'>
                      {col.render
                        ? col.render(user[col.key], user, {
                            onPaymentDecisionChange // pass handler here as context
                          })
                        : user[col.key] || '—'}
                    </td>
                  ))}
                  <td className='px-4 py-3 whitespace-nowrap space-x-2'>
                    {user.payment?.toLowerCase() === 'unpaid' ||
                    user.payment?.toLowerCase() === 'pending' ? (
                      <button
                        // onClick={() => onSendReminder(user)}
                        className='text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-100'
                        title='Send Reminder'
                        aria-label={`Send payment reminder to ${user.name}`}
                      >
                        <MdEmail />
                      </button>
                    ) : null}
                    {(role == 'Reviewer' ||
                      role === 'Session Chair' ||
                      role === 'Keynote Speaker') && (
                      <button
                        onClick={() => onEdit(user)}
                        className='text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-100'
                        title='Send Reminder'
                        aria-label={`Send payment reminder to ${user.name}`}
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(user, role)}
                      className='text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-100'
                      title='Delete'
                      aria-label={`Delete ${user.name}`}
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

export default UserTable
