import React, { useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { IoMdEye } from 'react-icons/io'
import { FaDownload } from 'react-icons/fa'
import { Link } from 'react-router'

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const certificatesPerPage = 6

  // Sample certificates data
  const [certificates] = useState([
    {
      id: 1,
      title: 'Advanced Machine Learning Techniques',
      abstract: 'A comprehensive study of modern machine learning algorithms and their applications in real-world scenarios.',
      presenter: 'Dr. John Smith',
      downloadUrl: '/certificates/ml-techniques.pdf'
    },
    {
      id: 2,
      title: 'Blockchain in Healthcare',
      abstract: 'Exploring the potential applications of blockchain technology in healthcare data management and security.',
      presenter: 'Dr. Sarah Johnson',
      downloadUrl: '/certificates/blockchain-healthcare.pdf'
    },
    {
      id: 3,
      title: 'Sustainable Energy Solutions',
      abstract: 'Analysis of renewable energy technologies and their impact on environmental sustainability.',
      presenter: 'Prof. Michael Brown',
      downloadUrl: '/certificates/sustainable-energy.pdf'
    },
    {
      id: 4,
      title: 'Quantum Computing Applications',
      abstract: 'Investigating practical applications of quantum computing in solving complex computational problems.',
      presenter: 'Dr. Emily Chen',
      downloadUrl: '/certificates/quantum-computing.pdf'
    },
    {
      id: 5,
      title: 'AI in Education',
      abstract: 'Examining the role of artificial intelligence in transforming educational methodologies and learning outcomes.',
      presenter: 'Prof. David Wilson',
      downloadUrl: '/certificates/ai-education.pdf'
    },
    {
      id: 6,
      title: 'Cybersecurity Trends',
      abstract: 'Analysis of emerging cybersecurity threats and defensive strategies in the digital age.',
      presenter: 'Dr. Lisa Anderson',
      downloadUrl: '/certificates/cybersecurity.pdf'
    }
  ])

  // Filter certificates based on search query
  const filteredCertificates = certificates.filter(
    certificate =>
      certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.presenter.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination
  const indexOfLastCertificate = currentPage * certificatesPerPage
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage
  const currentCertificates = filteredCertificates.slice(
    indexOfFirstCertificate,
    indexOfLastCertificate
  )
  const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage)

  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
          Certificates
        </h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search certificates...'
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
                  Title
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Abstract
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Presenter
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {currentCertificates.map(certificate => (
                <tr
                  key={certificate.id}
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {certificate.title}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='text-sm text-gray-500 line-clamp-2'>
                      {certificate.abstract}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {certificate.presenter}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <div className='flex space-x-4'>
                      <Link to={`/admin/certificates/${certificate.id}`}>
                        <button className='cursor-pointer hover:text-blue-500'>
                          <IoMdEye className='text-xl' />
                        </button>
                      </Link>
                      <a
                        href={certificate.downloadUrl}
                        className='cursor-pointer hover:text-blue-500'
                        download
                      >
                        <FaDownload className='text-xl' />
                      </a>
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
    </div>
  )
}

export default Certificates