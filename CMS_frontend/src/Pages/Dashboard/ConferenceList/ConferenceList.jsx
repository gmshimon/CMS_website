import { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { IoMdEye } from 'react-icons/io'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getConferenceRegs } from '../../../Redux/Slice/Conference_regSlice'
import Loading from '../../../Component/Loading/Loading'

const ConferenceList = () => {
  const { conference_regs, getConferenceRegLoading } = useSelector(
    state => state.conferenceReg
  )
  const { conferences ,getConferenceLoading} = useSelector(state => state.conference)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const conferencesPerPage = 6
  const dispatch = useDispatch()

  useEffect(() => {
    if (conferences?._id) {
      dispatch(getConferenceRegs(conferences?._id))
    }
  }, [conferences?._id, dispatch])

  // Sample conference data
  // const [conferences] = useState([
  //   {
  //     id: 1,
  //     name: 'International Conference on AI and Machine Learning',
  //     date: new Date('2024-06-15'),
  //     location: 'London, UK',
  //     status: 'Upcoming',
  //     organizer: 'Tech University London'
  //   },
  //   {
  //     id: 2,
  //     name: 'Global Software Engineering Summit',
  //     date: new Date('2024-07-20'),
  //     location: 'San Francisco, USA',
  //     status: 'Open for Registration',
  //     organizer: 'Software Engineering Institute'
  //   },
  //   {
  //     id: 3,
  //     name: 'Data Science and Analytics Conference',
  //     date: new Date('2024-08-10'),
  //     location: 'Berlin, Germany',
  //     status: 'Upcoming',
  //     organizer: 'Berlin Tech Hub'
  //   },
  //   {
  //     id: 4,
  //     name: 'Cybersecurity and Privacy Symposium',
  //     date: new Date('2024-09-05'),
  //     location: 'Tokyo, Japan',
  //     status: 'Planning',
  //     organizer: 'Cyber Defense Institute'
  //   },
  //   {
  //     id: 5,
  //     name: 'Cloud Computing and DevOps Conference',
  //     date: new Date('2024-10-15'),
  //     location: 'Singapore',
  //     status: 'Upcoming',
  //     organizer: 'Cloud Tech Association'
  //   },
  //   {
  //     id: 6,
  //     name: 'Blockchain Technology Summit',
  //     date: new Date('2024-11-20'),
  //     location: 'Dubai, UAE',
  //     status: 'Planning',
  //     organizer: 'Blockchain Foundation'
  //   }
  // ])

  // Filter conferences based on search query
  const filteredConferences = conference_regs.filter(
    conference =>
      conference.abstract.paper_title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    // conference.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // conference.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // // Calculate pagination
  const indexOfLastConference = currentPage * conferencesPerPage
  const indexOfFirstConference = indexOfLastConference - conferencesPerPage
  const currentConferences = filteredConferences.slice(
    indexOfFirstConference,
    indexOfLastConference
  )
  const totalPages = Math.ceil(filteredConferences.length / conferencesPerPage)

  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      {getConferenceRegLoading || getConferenceLoading ? (
        <div className='flex justify-center items-center h-[calc(100vh-112px)]'>
          <Loading />
        </div>
      ) : (
        <>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>
              Conference List
            </h2>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search conferences...'
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
                    <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                      Abstract ID
                    </th>
                    <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                      Abstract Title
                    </th>
                    <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                      Presenter
                    </th>

                    <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {currentConferences.map(conference => (
                    <tr key={conference.id}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                          {conference.abstract._id}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                          {conference.abstract.paper_title}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                          {conference.presenterName}
                        </div>
                      </td>

                      <td className='px-10  whitespace-nowrap text-sm text-gray-500'>
                        <Link to={`/admin/conference/${conference?._id}`}>
                          <button className='cursor-pointer hover:text-blue-500'>
                            <IoMdEye className='text-xl' />
                          </button>
                        </Link>
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
        </>
      )}
    </div>
  )
}

export default ConferenceList