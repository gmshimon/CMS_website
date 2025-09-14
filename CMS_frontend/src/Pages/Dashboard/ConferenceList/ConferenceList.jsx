import { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { useDispatch, useSelector } from 'react-redux'
import { getConferenceRegs } from '../../../Redux/Slice/conference_regSlice'
import Loading from '../../../Component/Loading/Loading'
import ConferenceListTable from '../../../Component/ConferenceListTable/ConferenceListTable'

const ConferenceList = () => {
  const { conference_regs, getConferenceRegLoading } = useSelector(
    state => state.conferenceReg
  )
  const { selectedConference, getConferenceLoading } = useSelector(
    state => state.conference
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const conferencesPerPage = 6
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getConferenceRegs(selectedConference))
  }, [selectedConference, dispatch])

  // Filter conferences based on search query
  const filteredConferences = conference_regs.filter(
    conference =>
      conference?.abstract?.paper_title
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
    <div className='p-3 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
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

          <ConferenceListTable data={currentConferences} abstract_title={true}/>
          <div className='px-4 py-3 border-t border-gray-200'>
            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ConferenceList
