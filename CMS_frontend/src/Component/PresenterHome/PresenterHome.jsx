import React, { useEffect } from 'react'
import { IoDocumentText, IoWallet, IoNewspaper } from 'react-icons/io5'
import { GrSchedule } from 'react-icons/gr'
import { FaDownload } from 'react-icons/fa'
import StatCard from '../StatCard/StatCard'
import { useDispatch, useSelector } from 'react-redux'
import { getMyDashboardStats } from '../../Redux/Slice/AuthSlice'
import Loading from '../Loading/Loading'
import { formatDistanceToNow } from 'date-fns'

const PresenterHome = () => {
  const { myStats, getMyStatsLoading } = useSelector(state => state.user)
  const { selectedConference } = useSelector(state => state.conference)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getMyDashboardStats(
        sessionStorage.getItem('selectedConference')
          ? sessionStorage.getItem('selectedConference')
          : selectedConference
      )
    )
  }, [dispatch, selectedConference])

  if (getMyStatsLoading) {
    return (
      <div className='flex justify-center h-[calc(100vh-120px)] items-center'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Dashboard Overview
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard
          title='Abstracts'
          count={myStats?.totalAbstracts || 0}
          icon={IoDocumentText}
          link='/admin/abstract'
          color='bg-blue-50 hover:bg-blue-100'
        />
        <StatCard
          title='Papers'
          count={myStats?.totalPapers || 0}
          icon={IoNewspaper}
          link='/admin/my-paper'
          color='bg-green-50 hover:bg-green-100'
        />
        <StatCard
          title=' Payments'
          count={myStats?.totalPayments || 0}
          icon={IoWallet}
          link='/admin/my-paper'
          color='bg-purple-50 hover:bg-purple-100'
        />

        <StatCard
          title='Schedule'
          count={myStats?.totalSchedules || 0}
          icon={GrSchedule}
          link='/admin/presenter/scheduling'
          color='bg-orange-50 hover:bg-orange-100'
        />
      </div>

      <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Document Templates
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='flex-1'>
                <p className='font-medium text-gray-800'>Abstract Template</p>
                <p className='text-sm text-gray-600'>Word document format</p>
              </div>
              <button className='btn btn-sm btn-primary'>
                <FaDownload className='mr-2' /> Download
              </button>
            </div>
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='flex-1'>
                <p className='font-medium text-gray-800'>Paper Template</p>
                <p className='text-sm text-gray-600'>Word document format</p>
              </div>
              <button className='btn btn-sm btn-primary'>
                <FaDownload className='mr-2' /> Download
              </button>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Recent Submissions
          </h3>
          <div className='space-y-4'>
            {myStats?.recentSubmissions?.map((item,idx) => (
              <div key={idx} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                <div>
                  <p className='font-medium text-gray-800'>
                    {item?.paper_title}
                  </p>
                  <p className='text-sm text-gray-600'>{item?.status}</p>
                </div>
                <span className='text-sm text-gray-500'>
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Certificate History
          </h3>

          {myStats?.certificateHistory.length === 0 ? (
            <p className='text-gray-500 text-sm'>No certificates found.</p>
          ) : (
            <div className='space-y-4'>
              {myStats?.certificateHistory.map((cert, index) => (
                <div
                  key={cert._id || index}
                  className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
                >
                  <div className='flex-1'>
                    <p className='font-medium text-gray-800'>
                      {cert.title || 'Certificate'}
                    </p>
                    <p className='text-sm text-gray-600'>
                      Issued on{' '}
                      {new Date(cert.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Download / View button */}
                  {cert.fileUrl ? (
                    <a
                      href={cert.fileUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 font-medium hover:underline'
                    >
                      View
                    </a>
                  ) : (
                    <span className='text-gray-400 text-sm'>Not available</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='mt-8 grid grid-cols-1'>
  <div className='bg-white rounded-lg shadow-md p-6'>
    <h3 className='text-xl font-semibold text-gray-800 mb-4'>
      File Naming Instructions
    </h3>
    <p className='text-gray-700 mb-4'>
      To ensure your submissions are processed smoothly, please follow the
      naming guidelines below when uploading your documents:
    </p>

    <ul className='space-y-3 text-gray-700'>
      <li className='flex items-start'>
        <span className='w-2 h-2 mt-2 bg-blue-500 rounded-full mr-3'></span>
        <span>
          <strong>First Submission:</strong> Keep the file name simple and
          clear. For example: <code className='bg-gray-100 px-1 py-0.5 rounded'>Paper_Title.pdf</code>
        </span>
      </li>
      <li className='flex items-start'>
        <span className='w-2 h-2 mt-2 bg-yellow-500 rounded-full mr-3'></span>
        <span>
          <strong>Minor Revision:</strong> Mention the revision type in the
          file name. For example:{' '}
          <code className='bg-gray-100 px-1 py-0.5 rounded'>Paper_Title_MinorRevision.pdf</code>
        </span>
      </li>
      <li className='flex items-start'>
        <span className='w-2 h-2 mt-2 bg-red-500 rounded-full mr-3'></span>
        <span>
          <strong>Major Revision:</strong> Clearly indicate the revision in
          the file name. For example:{' '}
          <code className='bg-gray-100 px-1 py-0.5 rounded'>Paper_Title_MajorRevision.pdf</code>
        </span>
      </li>
    </ul>

    <p className='mt-4 text-sm text-gray-600 italic'>
      💡 Following these instructions helps reviewers and administrators
      easily track your submission versions.
    </p>
  </div>
</div>

    </div>
  )
}
export default PresenterHome
