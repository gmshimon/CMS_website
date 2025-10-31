import { useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { useSelector } from 'react-redux'
import Loading from '../../../Component/Loading/Loading'
import ConferenceListTable from '../../../Component/ConferenceListTable/ConferenceListTable'
import useConferece_reg from '../../../Hooks/useConferece_reg'
import { useNavigate } from 'react-router'

const ConferenceList = () => {
  const { conference_regs, getConferenceRegLoading, pagination } = useSelector(
    state => state.conferenceReg
  )
  const { user } = useSelector(state => state.user)
  const { getConferenceLoading } = useSelector(state => state.conference)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useConferece_reg(currentPage, 10, searchQuery)

  const navigate = useNavigate()

  return (
    <div className='p-3 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      {getConferenceRegLoading || getConferenceLoading ? (
        <div className='flex justify-center items-center h-[calc(100vh-112px)]'>
          <Loading />
        </div>
      ) : (
        <>
          <div className='mb-6'>
            <div className='flex flex-col md:flex-row md:justify-between items-center '>
              <h2 className='text-2xl font-bold text-gray-800 '>
                Conference List
              </h2>
              {user?.role === 'Presenter' && (
                <div>
                  <button
                    onClick={() => navigate(`/admin/abstract/add`)}
                    className='px-2 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 mr-2'
                  >
                    Submit New Abstract
                  </button>
                </div>
              )}
            </div>

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

          <ConferenceListTable data={conference_regs} abstract_title={true} />
          <div className='px-4 py-3 border-t border-gray-200'>
            <ResponsivePagination
              current={currentPage}
              total={pagination?.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ConferenceList
