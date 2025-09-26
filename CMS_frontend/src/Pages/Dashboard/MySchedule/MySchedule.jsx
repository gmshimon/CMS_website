import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMySchedule } from '../../../Redux/Slice/ScheduleSlice'
import Loading from '../../../Component/Loading/Loading'
import { format } from 'date-fns'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { getStatusColor } from '../../../Utilis/getStatusColor'

const MySchedule = () => {
  const { schedules, getMyScheduleLoading } = useSelector(
    state => state.schedule
  )
  const { selectedConference } = useSelector(state => state.conference)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const invoicesPerPage = 6
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getMySchedule(
        sessionStorage.getItem('selectedConference')
          ? sessionStorage.getItem('selectedConference')
          : selectedConference
      )
    )
  }, [dispatch, selectedConference])

  if (getMyScheduleLoading) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-120px)]'>
        <Loading />
      </div>
    )
  }

  // Filter invoices based on search query
  const filteredInvoices = schedules.filter(
    item => item.paper_title.toLowerCase().includes(searchQuery.toLowerCase())
    // item.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination
  const indexOfLastInvoice = currentPage * invoicesPerPage
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage
  const currentSchedules = filteredInvoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  )
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage)

  return (
    <div className='p-4 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>My Schedule</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search Schedule...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto h-[400px] overflow-y-auto'>
          <table className='min-w-full divide-y divide-gray-200 table-zebra'>
            <thead className='bg-slate-500'>
              <tr>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Abstract ID
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Paper Title
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Presentation
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Day / Date
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Session / Time
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Venue / Meeting
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Chair
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Moderator
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {currentSchedules.map(item => (
                <tr
                  key={item._id}
                  className='hover:bg-blue-50 transition-colors duration-200 cursor-pointer'
                >
                  {/* Abstract ID */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                          {item.abstract_id||item._id}
                    </div>
                  </td>

                  {/* Paper Title */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {item.paper_title}
                    </div>
                  </td>

                  {/* Status */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Presentation Method */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-700'>
                      {item.presentation_method}
                    </div>
                  </td>

                  {/* Day / Date */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {item.scheduled && item.schedule
                        ? `${item.schedule.day} / ${format(
                            new Date(item.schedule.date),
                            'MMM d, yyyy'
                          )}`
                        : 'Not Scheduled Yet'}
                    </div>
                  </td>

                  {/* Session / Time */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {item.scheduled && item.schedule
                        ? `${item.schedule.session} | ${item.schedule.startTime} - ${item.schedule.endTime}`
                        : 'Not Scheduled Yet'}
                    </div>
                  </td>

                  {/* Venue / Meeting */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {item.scheduled && item.schedule ? (
                        item.presentation_method.includes('Physical') ? (
                          `${item.schedule.venue.building}, ${item.schedule.venue.hall}, ${item.schedule.venue.room}`
                        ) : (
                          <a
                            className='text-blue-600 hover:underline'
                            href={item.schedule.meetingLink}
                          >
                            Join
                          </a>
                        )
                      ) : (
                        '-'
                      )}
                    </div>
                  </td>

                   {/* Chair */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-700'>
                      {item.schedule?.sessionChair?.name || '-'}
                    </div>
                  </td>

                  {/* Moderator */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-700'>
                      {item.schedule?.moderator?.name || '-'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='px-4 py-3 border-t border-gray-200'>
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default MySchedule
