import React, { useState } from 'react'
import { format } from 'date-fns'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

const Messages = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const messagesPerPage = 4

  // Sample message data
  const [messages] = useState([
    {
      id: 1,
      date: new Date('2024-01-15'),
      sender: 'john.doe@example.com',
      recipient: 'admin@conference.com',
      subject: 'Paper Submission Query',
      body: 'Hello, I have a question regarding the paper submission process. Could you please clarify the formatting requirements?'
    },
    {
      id: 2,
      date: new Date('2024-01-14'),
      sender: 'sarah.smith@example.com',
      recipient: 'admin@conference.com',
      subject: 'Registration Confirmation',
      body: 'Thank you for confirming my registration. I look forward to attending the conference.'
    },
    {
      id: 3,
      date: new Date('2024-01-13'),
      sender: 'prof.zhang@university.edu',
      recipient: 'admin@conference.com',
      subject: 'Workshop Registration',
      body: 'I would like to register for the "Advanced Machine Learning" workshop. Could you please provide the registration details and schedule?'
    },
    {
      id: 4,
      date: new Date('2024-01-12'),
      sender: 'maria.garcia@research.org',
      recipient: 'admin@conference.com',
      subject: 'Accommodation Request',
      body: 'I am looking for information about recommended hotels near the conference venue. Are there any special rates for conference attendees?'
    },
    {
      id: 5,
      date: new Date('2024-01-11'),
      sender: 'tech.support@conference.com',
      recipient: 'david.wilson@example.com',
      subject: 'Presentation Guidelines',
      body: 'Here are the technical requirements for your presentation: 16:9 aspect ratio, PDF format, and maximum file size of 20MB. Let me know if you need any clarification.'
    },
    {
      id: 6,
      date: new Date('2024-01-10'),
      sender: 'dr.brown@institute.com',
      recipient: 'admin@conference.com',
      subject: 'Special Dietary Requirements',
      body: 'I would like to inform you about my dietary restrictions for the conference meals. I require vegetarian options.'
    },
    {
      id: 7,
      date: new Date('2024-01-09'),
      sender: 'admin@conference.com',
      recipient: 'participants@conference.com',
      subject: 'Schedule Update',
      body: 'Please note that the keynote speech has been rescheduled to 10:00 AM on the first day of the conference. The updated schedule is attached.'
    },
    {
      id: 8,
      date: new Date('2024-01-08'),
      sender: 'emma.taylor@university.edu',
      recipient: 'admin@conference.com',
      subject: 'Poster Session Query',
      body: 'Could you please confirm the dimensions for the poster presentation? Also, will the poster boards be portrait or landscape oriented?'
    }
  ])

  const [selectedMessage, setSelectedMessage] = useState(null)

  // Calculate pagination
  const indexOfLastMessage = currentPage * messagesPerPage
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage
  const currentMessages = messages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  )
  const totalPages = Math.ceil(messages.length / messagesPerPage)

//   const handlePageChange = pageNumber => {
//     setCurrentPage(pageNumber)
//   }
console.log(selectedMessage)
  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <h2 className='text-2xl font-bold mb-3 text-gray-800'>Messages</h2>
      <div className='grid md:grid-cols-2 gap-6'>
        {/* Message List */}
        <div className='bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg min-h-[530px]'>
          <div className='p-3 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-blue-50'>
            <h3 className='text-lg font-semibold text-gray-800'>Inbox</h3>
          </div>
          <div className='divide-y divide-gray-200'>
            {currentMessages.map(message => (
              <div
                key={message.id}
                className={`p-4 cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:bg-blue-50 ${selectedMessage?.id === message.id ? 'bg-blue-100 !border-l-4 !border-blue-600' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className='flex justify-between items-start mb-1'>
                  <span className='font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200'>
                    {message.sender}
                  </span>
                  <span className='text-sm text-gray-500'>
                    {format(message.date, 'MMM d, yyyy')}
                  </span>
                </div>
                <div className='text-gray-900 font-medium hover:text-blue-700 transition-colors duration-200'>
                  {message.subject}
                </div>
                <div className='text-gray-600 text-sm truncate hover:text-gray-800 transition-colors duration-200'>
                  {message.body}
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
                  {selectedMessage.subject}
                </h3>
                <div className='flex justify-between items-center text-sm text-gray-500 mb-2'>
                  <span className='hover:text-blue-600 transition-colors duration-200'>
                    From: {selectedMessage.sender}
                  </span>
                  <span>
                    {format(selectedMessage.date, 'MMMM d, yyyy h:mm a')}
                  </span>
                </div>
                <div className='text-sm text-gray-500 mb-4 hover:text-blue-600 transition-colors duration-200'>
                  To: {selectedMessage.recipient}
                </div>
              </div>
              <div className='prose max-w-none'>
                <p className='text-gray-700 whitespace-pre-wrap leading-relaxed hover:text-gray-900 transition-colors duration-200'>
                  {selectedMessage.body}
                </p>
              </div>
            </div>
          ) : (
            <div className='p-6 text-center text-gray-500'>
              <p className='animate-pulse'>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
