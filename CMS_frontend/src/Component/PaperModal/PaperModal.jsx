import React from 'react'
import { FaDownload } from 'react-icons/fa'

const PaperModal = ({ paper, isOpen, onClose }) => {
  if (!isOpen || !paper) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6'>
          <div className='flex justify-between items-start mb-4'>
            <h3 className='text-xl font-bold text-gray-900'>{paper.title}</h3>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-500 transition-colors duration-200'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='space-y-4'>
            <div>
              <p className='text-sm font-semibold text-gray-500'>Abstract ID</p>
              <p className='text-gray-900'>{paper.abstractId}</p>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-500'>Author</p>
              <p className='text-gray-900'>{paper.author}</p>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-500'>Abstract</p>
              <p className='text-gray-900 whitespace-pre-wrap'>
                {paper.abstract}
              </p>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-500'>Keywords</p>
              <div className='flex flex-wrap gap-2 mt-1'>
                <span className='px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'>
                  {paper?.keywords}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperModal
