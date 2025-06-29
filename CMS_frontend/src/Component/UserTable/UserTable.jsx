import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const UserTable = ({ users, onEdit, onDelete, columns }) => {
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
                <td colSpan={columns.length + 1} className='text-center py-6 text-gray-500'>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className='hover:bg-gray-100 transition-all'>
                  {columns.map((col, index) => (
                    <td key={index} className='px-4 py-3 text-sm text-gray-700'>
                      {col.render
                        ? col.render(user[col.key], user)
                        : user[col.key] || '—'}
                    </td>
                  ))}
                  <td className='px-4 py-3 whitespace-nowrap space-x-2'>
                    <button
                      onClick={() => onEdit(user)}
                      className='text-yellow-600 hover:text-yellow-800 transition-colors p-1 rounded-full hover:bg-yellow-100'
                      title='Edit'
                      aria-label={`Edit ${user.name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(user)}
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
