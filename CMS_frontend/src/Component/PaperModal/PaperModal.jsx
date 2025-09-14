import { FaFilePdf, FaFileWord } from 'react-icons/fa'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

const PaperModal = ({ abstract, isOpen, onClose }) => {
  const { papers, getPaperLoading } = useSelector(state => state.paper)

  const paperFiles =
    papers?.paper?.length > 0 ? papers.paper : abstract?.papers?.paper || []

  if (!isOpen || !abstract) return null
  // Determine file type icon based on file extension
  const getFileIcon = filename => {
    if (!filename) return <FaFileWord className='text-blue-500' />
    const extension = filename.split('.').pop().toLowerCase()
    return extension === 'pdf' ? (
      <FaFilePdf className='text-red-500 text-lg' />
    ) : (
      <FaFileWord className='text-blue-500 text-lg' />
    )
  }
  if (getPaperLoading) {
    return
  }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'
      >
        <div className='p-6'>
          <div className='flex justify-between items-start mb-6'>
            <h3 className='text-xl md:text-2xl font-bold text-gray-900 leading-tight'>
              {abstract?.paper_title || 'N/A'}
            </h3>
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
                <p className='text-sm font-semibold text-gray-500'>
                  Abstract ID
                </p>
                <p className='text-gray-900 md:col-span-2 break-all'>
                  {abstract?._id}
                </p>
              </div>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>
                  Paper Title
                </p>
                <p className='text-gray-900 md:col-span-2 break-all'>
                  {abstract?.paper_title}
                </p>
              </div>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>
                  Conference
                </p>
                <p className='text-gray-900 md:col-span-2 break-all'>
                  {abstract?.conference.name}
                </p>
              </div>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>Theme</p>
                <p className='text-gray-900 md:col-span-2 break-all'>
                  {abstract?.theme}
                </p>
              </div>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>
                  Submission Date
                </p>
                <p className='text-gray-900 md:col-span-2 break-all'>
                  {format(new Date(abstract.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>Author</p>
                <p className='text-gray-900 md:col-span-2'>
                  {abstract?.authors[0].name}
                </p>
              </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>Abstract</p>
                <div className='text-gray-900 whitespace-pre-wrap md:col-span-2'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: abstract.abstract
                    }}
                  />
                </div>
              </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                <p className='text-sm font-semibold text-gray-500'>Keywords</p>
                <div className='flex flex-wrap gap-2 md:col-span-2'>
                  {Array.isArray(abstract.keywords) ? (
                    abstract.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors duration-200'
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors duration-200'>
                      {abstract.keywords}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {paperFiles?.length > 0 && (
              <div className='bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2'>
                  <p className='text-sm font-semibold text-gray-500'>Paper</p>
                  <div className='md:col-span-2'>
                    {paperFiles.map((file, index) => (
                      <div key={index} className='flex items-center gap-2 mb-2'>
                        {getFileIcon(file.originalName)}
                        <a
                          href={file.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-600 hover:underline'
                        >
                          {file.originalName}
                        </a>
                      </div>
                    ))}
                    {paperFiles.length === 0 && (
                      <p className='text-gray-500'>No paper uploaded yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PaperModal
