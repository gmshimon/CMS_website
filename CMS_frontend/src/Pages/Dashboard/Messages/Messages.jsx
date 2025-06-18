import React, { useState } from 'react'
import { format } from 'date-fns'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../Component/Loading/Loading'
import socket from '../../../Socket/socket'
import { updateNotification } from '../../../Redux/Slice/notificationSlice'

const Messages = () => {
  const { list, getNotificationLoading } = useSelector(
    state => state.notifications
  )
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const messagesPerPage = 4

  const [selectedMessage, setSelectedMessage] = useState(null)

  // Calculate pagination
  const indexOfLastMessage = currentPage * messagesPerPage
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage
  const currentMessages = list?.slice(indexOfFirstMessage, indexOfLastMessage)
  const totalPages = Math.ceil(list?.length / messagesPerPage)

  //   const handlePageChange = pageNumber => {
  //     setCurrentPage(pageNumber)
  //   }
  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      {getNotificationLoading ? (
        <div className='flex justify-center items-center h-[calc(100vh-112px)]'>
          <Loading />
        </div>
      ) : (
        <>
          <h2 className='text-2xl font-bold mb-3 text-gray-800'>Messages</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Message List */}
            <div className='bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg min-h-[530px]'>
              <div className='p-3 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-blue-50'>
                <h3 className='text-lg font-semibold text-gray-800'>Inbox</h3>
              </div>
              <div className='divide-y divide-gray-200'>
                {currentMessages?.map(message => (
                  <div
                    key={message._id}
                    className={`p-4 cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:bg-blue-50 ${
                      selectedMessage?._id === message._id
                        ? 'bg-blue-100 !border-l-4 !border-blue-600'
                        : ''
                    }`}
                    onClick={() => {
                      if(!message?.isRead){
                        dispatch(updateNotification(message?._id))
                        socket.emit('markAsRead', { notificationId:message?._id });
                      }
                      setSelectedMessage(message)
                    }}
                  >
                    <div className='flex justify-between items-start mb-1'>
                      <span className='font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200'>
                        {message.user.name}
                      </span>
                      <span className='text-sm text-gray-500'>
                        {format(message.createdAt, 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className='text-gray-900 font-medium hover:text-blue-700 transition-colors duration-200'>
                      {message.type}
                    </div>
                    <div className='text-gray-600 text-sm truncate hover:text-gray-800 transition-colors duration-200'>
                      {message.title}
                    </div>
                  </div>
                ))}
              </div>

              <div className='my-3'>
                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>

            {/* Message Detail */}
            <div className='bg-white rounded-lg shadow transform transition-all duration-300 hover:shadow-lg min-h-[530px]'>
              {selectedMessage ? (
                <div className='p-6 animate-fadeIn'>
                  <div className='mb-6'>
                    <h3 className='text-2xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition-colors duration-200'>
                      {selectedMessage.type}
                    </h3>
                    <div className='flex justify-between items-center text-sm text-gray-500 mb-2'>
                      <span className='hover:text-blue-600 transition-colors duration-200'>
                        From: EMS TEAM
                      </span>
                      <span>
                        {format(
                          selectedMessage.createdAt,
                          'MMMM d, yyyy h:mm a'
                        )}
                      </span>
                    </div>
                    <div className='text-sm text-gray-500 mb-4 hover:text-blue-600 transition-colors duration-200'>
                      To: {selectedMessage.user?.name}
                    </div>
                  </div>
                  <div className='prose max-w-none'>
                    <div
                      className='text-gray-700  hover:text-gray-900 transition-colors duration-200/*  */'
                      dangerouslySetInnerHTML={{
                        __html: selectedMessage.message
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className='p-6 text-center text-gray-500'>
                  <p className='animate-pulse'>
                    Select a message to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Messages
