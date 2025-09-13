import { Calendar, ExternalLink } from 'lucide-react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoMdEye } from 'react-icons/io'
import { useNavigate } from 'react-router'

const ScheduleTable = ({ columns, data, onDelete, onEdit,admin }) => {
  const navigate = useNavigate()
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-slate-600 sticky top-0 z-10'>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className='px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap'
                >
                  {col.label}
                </th>
              ))}
              <th className='px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider'>
                Details
              </th>
              {admin&&<th className='px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider'>
                Actions
              </th>}
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 ? (
              <tr>
                <td colSpan='8' className='text-center py-8 text-gray-500'>
                  <div className='flex flex-col items-center gap-2'>
                    <Calendar className='text-4xl text-gray-300' size={48} />
                    <p>No schedules found</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className='hover:bg-gray-50'>
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className='px-4 py-3 text-sm text-gray-700'
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                  <td className='px-4 py-3 whitespace-nowrap space-x-2'>
                    <button
                      onClick={() => navigate(`/admin/schedule/${row._id}`)}
                      className='text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-100'
                      title='View Schedule Details'
                    >
                      <ExternalLink size={20}/>
                    </button>
                  </td>
                  {admin&&<td className='px-4 py-3 whitespace-nowrap space-x-2'>
                    <button
                      onClick={() => onEdit(row)}
                      className='text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-100'
                      title='Send Reminder'
                      // aria-label={`Send payment reminder to ${user.name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(row._id)}
                      className='text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-100'
                      title='Delete'
                      // aria-label={`Delete ${user.name}`}
                    >
                      <FaTrash />
                    </button>
                  </td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ScheduleTable
