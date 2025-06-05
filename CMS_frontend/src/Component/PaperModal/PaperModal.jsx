
import {  FaFilePdf, FaFileWord } from 'react-icons/fa'


const PaperModal = ({ paper, isOpen, onClose }) => {
  if (!isOpen || !paper) return null

  // Determine file type icon based on file extension
  const getFileIcon = (filename) => {
    if (!filename) return <FaFileWord className="text-blue-500" />
    const extension = filename.split('.').pop().toLowerCase()
    return extension === 'pdf' ? 
      <FaFilePdf className="text-red-500 text-lg" /> : 
      <FaFileWord className="text-blue-500 text-lg" />
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm'>
      <div 
        
        className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'
      >
        <div className='p-6'>
          <div className='flex justify-between items-start mb-6'>
            <h3 className='text-xl md:text-2xl font-bold text-gray-900 leading-tight'>{paper?.abstract?.paper_title || paper.title}</h3>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200'
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

          <div className='space-y-6'>
            {/* Paper details with improved responsive layout */}
            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>Abstract ID</p>
                <p className='text-gray-900 md:col-span-2 break-all'>{paper?.abstract?._id || paper._id}</p>
              </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>Author</p>
                <p className='text-gray-900 md:col-span-2'>{paper.abstract.authors[0].name}</p>
              </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>Abstract</p>
                <div className='text-gray-900 whitespace-pre-wrap md:col-span-2'>
                  <div dangerouslySetInnerHTML={{ __html: paper.abstract.abstract || paper.abstract }} /> 
                </div>
              </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>Keywords</p>
                <div className='flex flex-wrap gap-2 md:col-span-2'>
                  {Array.isArray(paper?.abstract.keywords) ? (
                    paper?.abstract.keywords.map((keyword, index) => (
                      <span key={index} className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors duration-200'>
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors duration-200'>
                      {paper?.abstract.keywords || paper?.keywords}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {paper?.paper && paper?.paper.length > 0 && (
              <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                  <p className='text-sm font-semibold text-gray-500'>Paper</p>
                  <div className='md:col-span-2'>
                    <a 
                      href={paper?.paper.at(-1)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className='flex items-center gap-2 px-4 py-2 text-xs rounded-md  w-fit hover:text-blue-500'
                    >
                      {getFileIcon(paper?.paper.at(-1))}
                      <span>{paper.paper.at(-1).split('/')[4]}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperModal
