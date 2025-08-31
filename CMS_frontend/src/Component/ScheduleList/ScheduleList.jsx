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

  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getTypeBadge = type => {
    const isOnline = type.includes('Online')
    const isPaper = type.includes('Paper')

    return (
      <div className='flex flex-col gap-1'>
        <span
          className={`badge ${
            isOnline ? 'badge-info' : 'badge-success'
          } badge-sm`}
        >
          {isOnline ? 'Online' : 'Physical'}
        </span>
        <span
          className={`badge ${
            isPaper ? 'badge-primary' : 'badge-secondary'
          } badge-sm`}
        >
          {isPaper ? 'Paper' : 'Poster'}
        </span>
      </div>
    )
  }

  if (getSessionChairScheduleLoading) {
    return (
      <div className='h-[calc(100vh-150px)] flex items-center justify-center'>
        <Loading />
      </div>
    )
  }
  console.log(mySchedules)
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
                <th className='text-white font-bold'>Day & Date</th>
                <th className='text-white font-bold'>Session</th>
                <th className='text-white font-bold'>Time</th>
                <th className='text-white font-bold'>Type</th>
                <th className='text-white font-bold'>Location/Link</th>
                <th className='text-white font-bold'>Chair & Moderator</th>
                <th className='text-white font-bold'>Abstracts</th>
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
                    {/* Day & Date */}
                    <td className='min-w-32'>
                      <div className='flex flex-col'>
                        <span className='font-semibold text-primary'>
                          {schedule.day}
                        </span>
                        <span className='text-sm text-gray-600'>
                          {formatDate(schedule.date)}
                        </span>
                      </div>
                    </td>

                    {/* Session */}
                    <td className='font-medium text-gray-800'>
                      {schedule.session}
                    </td>

                    {/* Time */}
                    <td className='min-w-24'>
                      <div className='flex items-center gap-1 text-sm'>
                        <Clock className='text-gray-400' size={14} />
                        <span>
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                      </div>
                    </td>

                    {/* Type */}
                    <td className='min-w-24'>
                      <div className='flex flex-col gap-1'>
                        {getTypeBadge(schedule.abstractType)}
                      </div>
                    </td>

                    {/* Location/Link */}
                    <td className='min-w-48'>
                      {schedule.abstractType.includes('Online') ? (
                        <div className='flex items-center gap-2'>
                          <Video className='text-blue-500' size={16} />
                          <a
                            href={schedule.meetingLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='link link-primary text-sm truncate max-w-32'
                            title={schedule.meetingLink}
                          >
                            Join Meeting
                          </a>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <MapPin className='text-green-500' size={16} />
                          <div className='text-sm'>
                            <div className='font-medium'>
                              {schedule.venue?.building}
                            </div>
                            <div className='text-gray-600'>
                              {schedule.venue?.hall} - {schedule.venue?.room}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Chair & Moderator */}
                    <td className='min-w-40'>
                      <div className='text-sm'>
                        <div className='flex items-center gap-1 mb-1'>
                          <Users className='text-gray-400' size={12} />
                          <span className='font-medium'>Chair:</span>
                          <span className='text-gray-700'>
                            {schedule.sessionChair?.name || 'Not assigned'}
                          </span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <span className='font-medium'>Moderator:</span>
                          <span className='text-gray-700'>
                            {schedule.moderator?.name || 'Not assigned'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Abstracts */}
                    <td className='min-w-48'>
                      <div className='text-sm'>
                        <div className='font-medium text-gray-800 mb-1'>
                          {schedule.abstracts.length} Abstract(s)
                        </div>
                        {schedule.abstracts.length > 0 && (
                          <div className='space-y-1'>
                            {schedule.abstracts
                              .slice(0, 2)
                              .map((abstract, idx) => (
                                <div
                                  key={idx}
                                  className='text-gray-600 truncate max-w-44'
                                  title={abstract.paper_title}
                                >
                                  • {abstract.paper_title}
                                </div>
                              ))}
                            {schedule.abstracts.length > 2 && (
                              <div className='text-gray-500 text-xs'>
                                +{schedule.abstracts.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

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
