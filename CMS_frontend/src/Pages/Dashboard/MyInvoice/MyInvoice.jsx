import React, { useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { IoMdEye } from 'react-icons/io'

const MyInvoice = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const invoicesPerPage = 6

  // Sample invoices data
  const [invoices] = useState([
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      amount: 500,
      status: 'Paid',
      dueDate: '2024-02-15',
      description: 'Conference Registration Fee'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      amount: 750,
      status: 'Pending',
      dueDate: '2024-02-20',
      description: 'Paper Publication Fee'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      amount: 300,
      status: 'Overdue',
      dueDate: '2024-01-30',
      description: 'Workshop Registration'
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      amount: 1000,
      status: 'Paid',
      dueDate: '2024-02-10',
      description: 'Premium Membership Fee'
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-005',
      amount: 250,
      status: 'Pending',
      dueDate: '2024-02-25',
      description: 'Abstract Submission Fee'
    },
    {
      id: 6,
      invoiceNumber: 'INV-2024-006',
      amount: 800,
      status: 'Paid',
      dueDate: '2024-02-05',
      description: 'Early Bird Registration'
    }
  ])

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(
    invoice =>
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination
  const indexOfLastInvoice = currentPage * invoicesPerPage
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage
  const currentInvoices = filteredInvoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  )
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage)

  // Get status color
  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>My Invoices</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search invoices...'
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
                  Invoice Number
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Description
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Amount
                </th>
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Due Date
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
              {currentInvoices.map(invoice => (
                <tr
                  key={invoice.id}
                  className='hover:bg-blue-50 transition-colors duration-200 cursor-pointer'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {invoice.invoiceNumber}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='text-sm text-gray-500 line-clamp-2'>
                      {invoice.description}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-semibold text-gray-900'>
                      ${invoice.amount}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {invoice.dueDate}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className='px-10 whitespace-nowrap text-sm text-gray-500'>
                    <button className='cursor-pointer hover:text-blue-500 transition-colors duration-200'>
                      <IoMdEye className='text-xl' />
                    </button>
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

export default MyInvoice