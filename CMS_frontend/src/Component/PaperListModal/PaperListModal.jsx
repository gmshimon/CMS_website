import React from 'react'

const PaperListModal = ({ isOpen, onClose, papers, onView }) => {
  if (!isOpen) return null
  return (
    <div className='fixed inset-0 z-50 bg-black/40 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-fade-in grid gap-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-bold'>Submitted Papers</h2>
          <button
            className='text-gray-400 hover:text-gray-700 text-2xl'
            onClick={onClose}
            aria-label='Close'
          >
            &times;
          </button>
        </div>

        {papers ? (
          <div className='divide-y'>
            {papers.paper.map(paper => (
              <div
                key={paper._id}
                className='py-3 flex items-center justify-between'
              >
                <div>
                  <div className='font-medium'>
                    {paper.split('com/paper/')[1] || 'Untitled Paper'}
                  </div>
                  <div className='text-xs text-gray-500'>
                    Submitted: {new Date(papers.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-xl text-sm shadow'
                  onClick={() => onView(paper)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center text-gray-400 py-6'>
            No papers submitted yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default PaperListModal
