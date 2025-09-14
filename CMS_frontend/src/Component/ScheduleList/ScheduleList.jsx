import { useState, useEffect } from 'react'
import {
  Edit,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  Search
} from 'lucide-react'
import Loading from '../Loading/Loading'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { useDispatch, useSelector } from 'react-redux'
import { getSessionChairSchedule } from '../../Redux/Slice/ScheduleSlice'
import { useNavigate } from 'react-router'
import { getScheduleColumns } from '../../Utilis/useScheduleColumn'
const ScheduleList = () => {
  const { selectedConference } = useSelector(state => state.conference)
  const { mySchedules, getSessionChairScheduleLoading } = useSelector(
    state => state.schedule
  )
  const [filterType, setFilterType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(
      getSessionChairSchedule({
        conferenceId: sessionStorage.getItem('selectedConference')
          ? sessionStorage.getItem('selectedConference')
          : selectedConference,
        abstractType: filterType || null,
        page: currentPage
      })
    )
  }, [currentPage, dispatch, filterType, selectedConference])

  const handleEdit = schedule => {
    navigate(`/admin/schedule/${schedule._id}`)
  }

  if (getSessionChairScheduleLoading) {
    return (
      <div className='h-[calc(100vh-150px)] flex items-center justify-center'>
        <Loading />
      </div>
    )
  }

  const columns = getScheduleColumns()

  return (
    <div className=''>
      {/* Filters and Search */}
      <div className='mb-3'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-semibold'>Filter by Type</span>
            </label>
            <select
              className='border border-black p-2 rounded-lg w-full '
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value=''>All Types</option>
              <option value='Paper Presentation Online'>
                Paper Presentation Online
              </option>
              <option value='Paper Presentation Physical'>
                Paper Presentation Physical
              </option>
              <option value='Poster Presentation Online'>
                Poster Presentation Online
              </option>
              <option value='Poster Presentation Physical'>
                Poster Presentation Physical
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto max-h-[600px] overflow-y-auto'>
          <table className='table table-zebra w-full'>
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
                <th className='text-white font-bold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mySchedules?.schedules.length === 0 ? (
                <tr>
                  <td colSpan='8' className='text-center py-8 text-gray-500'>
                    <div className='flex flex-col items-center gap-2'>
                      <Calendar className='text-4xl text-gray-300' size={48} />
                      <p>No schedules found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                mySchedules?.schedules.map(schedule => (
                  <tr key={schedule._id} className='hover:bg-gray-50'>
                    {columns.map(col => (
                      <td
                        key={col.key}
                        className='px-4 py-3 text-sm text-gray-700'
                      >
                        {col.render
                          ? col.render(schedule[col.key], schedule)
                          : schedule[col.key]}
                      </td>
                    ))}

                    {/* Actions */}
                    <td className='min-w-24'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => handleEdit(schedule)}
                          className='btn btn-ghost btn-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100'
                          title='Edit Schedule'
                        >
                          <Edit size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className='px-4 py-3 border-t border-gray-200'>
        <ResponsivePagination
          current={currentPage}
          total={mySchedules?.totalPages}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}

export default ScheduleList
