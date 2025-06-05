import React, { useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { IoMdEye } from 'react-icons/io'
import PaperModal from '../../../Component/PaperModal/PaperModal'

const MyPaper = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const papersPerPage = 6

  // Sample papers data
  const [papers] = useState([
    {
      id: 1,
      abstractId: 'ABS-2024-001',
      title: 'Machine Learning Applications in Healthcare',
      author: 'Dr. John Smith',
      abstract: 'This paper explores the innovative applications of machine learning algorithms in healthcare, focusing on early disease detection and personalized treatment planning. The study demonstrates significant improvements in diagnostic accuracy and patient outcomes through the implementation of advanced AI techniques.',
      keywords: ['Machine Learning', 'Healthcare', 'AI', 'Disease Detection'],
      status: 'Approved',
      downloadUrl: '/papers/machine-learning-healthcare.pdf'
    },
    {
      id: 2,
      abstractId: 'ABS-2024-002',
      title: 'Sustainable Energy Systems',
      author: 'Prof. Maria Garcia',
      abstract: 'An analysis of next-generation sustainable energy systems, examining the integration of renewable sources and smart grid technologies. The research presents novel approaches to energy storage and distribution, addressing key challenges in the transition to clean energy.',
      keywords: ['Sustainable Energy', 'Renewable Sources', 'Smart Grid', 'Energy Storage'],
      status: 'Under Review',
      downloadUrl: '/papers/sustainable-energy-systems.pdf'
    },
    {
      id: 3,
      abstractId: 'ABS-2024-003',
      title: 'Quantum Computing Advances',
      author: 'Dr. David Chen',
      abstract: 'This study presents recent breakthroughs in quantum computing architecture and applications. The research explores novel quantum algorithms and their potential impact on cryptography, optimization problems, and molecular simulation.',
      keywords: ['Quantum Computing', 'Quantum Algorithms', 'Cryptography'],
      status: 'Approved',
      downloadUrl: '/papers/quantum-computing-advances.pdf'
    },
    {
      id: 4,
      abstractId: 'ABS-2024-004',
      title: 'Cybersecurity in IoT Devices',
      author: 'Prof. Sarah Johnson',
      abstract: 'An examination of security challenges and solutions in Internet of Things (IoT) devices. The paper proposes a new framework for enhancing device security while maintaining efficiency and user experience.',
      keywords: ['Cybersecurity', 'IoT', 'Security Framework'],
      status: 'Pending',
      downloadUrl: '/papers/cybersecurity-iot.pdf'
    },
    {
      id: 5,
      abstractId: 'ABS-2024-005',
      title: 'Blockchain in Supply Chain',
      author: 'Dr. Michael Brown',
      abstract: 'This research investigates the implementation of blockchain technology in supply chain management. The study presents case studies and empirical evidence of improved transparency and efficiency in global supply chains.',
      keywords: ['Blockchain', 'Supply Chain', 'Transparency'],
      status: 'Under Review',
      downloadUrl: '/papers/blockchain-supply-chain.pdf'
    },
    {
      id: 6,
      abstractId: 'ABS-2024-006',
      title: 'Neural Networks in Natural Language Processing',
      author: 'Prof. Emily Wilson',
      abstract: 'An analysis of advanced neural network architectures for natural language processing tasks. The research demonstrates improved performance in language understanding and generation through novel architectural modifications.',
      keywords: ['Neural Networks', 'NLP', 'Language Processing'],
      status: 'Approved',
      downloadUrl: '/papers/neural-networks-nlp.pdf'
    }
  ])

  // Filter papers based on search query
  const filteredPapers = papers.filter(
    paper =>
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstractId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination
  const indexOfLastPaper = currentPage * papersPerPage
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage
  const currentPapers = filteredPapers.slice(
    indexOfFirstPaper,
    indexOfLastPaper
  )
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage)

  // Modal handlers
  const handleOpenModal = paper => {
    setSelectedPaper(paper)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedPaper(null)
    setIsModalOpen(false)
  }

  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
          My Papers
        </h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search papers...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto h-[400px] overflow-y-auto'>
          <table className='min-w-full divide-y divide-gray-200 table-zebra'>
            <thead className='bg-slate-500'>
              <tr>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Abstract ID
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Title
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Author
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {currentPapers.map(paper => (
                <tr
                  key={paper.id}
                  className='hover:bg-gray-50 transition-colors duration-200'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {paper.abstractId}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='text-sm text-gray-900 line-clamp-2'>
                      {paper.title}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {paper.author}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${paper.status === 'Approved' ? 'bg-green-100 text-green-800'
                          : paper.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800'
                          : paper.status === 'Pending' ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'}`}
                    >
                      {paper.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <div className='flex space-x-4'>
                      <button
                        onClick={() => handleOpenModal(paper)}
                        className='cursor-pointer hover:text-blue-500 transition-colors duration-200'
                      >
                        <IoMdEye className='text-xl' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='px-4 py-3 border-t border-gray-200'>
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <PaperModal
        paper={selectedPaper}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default MyPaper