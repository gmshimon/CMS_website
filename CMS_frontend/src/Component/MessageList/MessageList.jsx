/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MessageList = () => {
  const { list } = useSelector(state => state.notifications)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
      {/* Dropdown Menu */}

      <div className='absolute right-0 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200 transform transition-all duration-300 ease-in-out'>
        <div className='px-4 py-2 border-b border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-800'>Messages</h3>
        </div>

        <div className='max-h-96 overflow-y-auto'>
          {list?.notifications?.map(message => (
            <div
              key={message._id}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                !message.isRead ? 'bg-blue-50' : ''
              }`}
            >
              <div className='flex justify-between items-start mb-1'>
                <span
                  className={`font-medium text-sm ${
                    message.isRead ? 'text-gray-800':'text-blue-600' 
                  }`}
                >
                  {message.user.name}
                </span>
                <span className='text-xs text-gray-500'>
                  {format(message.createdAt, 'MMM d, h:mm a')}
                </span>
              </div>
              <div
                className={`text-sm ${
                  message.isRead
                    ? 'text-gray-600':'font-semibold text-gray-900'
                }`}
              >
                {message.type}
              </div>
              <div className='text-xs text-gray-500 truncate'>
                {message.title}
              </div>
            </div>
          ))}
        </div>

        <div className='px-4 py-2 border-t border-gray-200'>
          <Link
            to='/admin/messages'
            className='block text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'
          >
            View All Messages
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MessageList
