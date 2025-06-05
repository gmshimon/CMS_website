/* eslint-disable no-unused-vars */
import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IoDocumentText,
  IoWallet,
  IoReceipt,
  IoNewspaper
} from 'react-icons/io5'
import { FaDownload } from 'react-icons/fa'
import PaymentModal from '../../Component//PaymentModal/PaymentModal'

const PresenterHome = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  // Sample data - replace with actual data from your backend
  const stats = {
    abstracts: 12,
    papers: 8,
    payments: 5,
    revisions: 3
  }

  const StatCard = ({ title, count, icon: Icon, link, color }) => (
    <Link to={link} className='block'>
      <div
        className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${color}`}
      >
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              {title}
            </h3>
            <p className='text-3xl font-bold text-gray-900'>{count}</p>
          </div>
          <Icon className='text-4xl text-gray-700 opacity-80' />
        </div>
        <p className='mt-4 text-sm text-gray-600 hover:text-gray-800'>
          View Details →
        </p>
      </div>
    </Link>
  )

  return (
    <div className='p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Dashboard Overview
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard
          title='Abstracts'
          count={stats.abstracts}
          icon={IoDocumentText}
          link='/admin/abstract'
          color='bg-blue-50 hover:bg-blue-100'
        />
        <StatCard
          title='Papers'
          count={stats.papers}
          icon={IoNewspaper}
          link='/admin/my-paper'
          color='bg-green-50 hover:bg-green-100'
        />
        <div className='block' onClick={() => setIsPaymentModalOpen(true)}>
          <div
            className={`p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 bg-purple-50 hover:bg-purple-100`}
          >
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                  Payments
                </h3>
                <p className='text-3xl font-bold text-gray-900'>12</p>
              </div>
              <IoWallet className='text-4xl text-gray-700 opacity-80' />
            </div>
            <p className='mt-4 text-sm text-gray-600 hover:text-gray-800'>
              View Details →
            </p>
          </div>
        </div>

        <StatCard
          title='Revisions'
          count={stats.revisions}
          icon={IoReceipt}
          link='/admin/revisions'
          color='bg-orange-50 hover:bg-orange-100'
        />
      </div>

      <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Document Templates
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='flex-1'>
                <p className='font-medium text-gray-800'>Abstract Template</p>
                <p className='text-sm text-gray-600'>Word document format</p>
              </div>
              <button className='btn btn-sm btn-primary'>
                <FaDownload className='mr-2' /> Download
              </button>
            </div>
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
              <div className='flex-1'>
                <p className='font-medium text-gray-800'>Paper Template</p>
                <p className='text-sm text-gray-600'>Word document format</p>
              </div>
              <button className='btn btn-sm btn-primary'>
                <FaDownload className='mr-2' /> Download
              </button>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Recent Submissions
          </h3>
          <div className='space-y-4'>
            {/* Sample recent submissions - replace with actual data */}
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <div>
                <p className='font-medium text-gray-800'>
                  Machine Learning in Healthcare
                </p>
                <p className='text-sm text-gray-600'>Abstract submitted</p>
              </div>
              <span className='text-sm text-gray-500'>2 days ago</span>
            </div>
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <div>
                <p className='font-medium text-gray-800'>
                  Blockchain Technology
                </p>
                <p className='text-sm text-gray-600'>Paper under review</p>
              </div>
              <span className='text-sm text-gray-500'>5 days ago</span>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Payment History
          </h3>
          <div className='space-y-4'>
            {/* Sample payment history - replace with actual data */}
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <div className='flex-1'>
                <p className='font-medium text-gray-800'>
                  Abstract Submission Fee
                </p>
                <p className='text-sm text-gray-600'>Payment completed</p>
              </div>
              <span className='text-green-600 font-medium'>$50.00</span>
            </div>
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <div className='flex-1'>
                <p className='font-medium text-gray-800'>
                  Paper Publication Fee
                </p>
                <p className='text-sm text-gray-600'>Payment pending</p>
              </div>
              <span className='text-yellow-600 font-medium'>$150.00</span>
            </div>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        abstracts={[
          {
            abstractId: 'ABS-2024-001',
            title: 'Abstract Submission Fee',
            receiptUrl: '/receipts/receipt-001.pdf'
          },
          {
            abstractId: 'ABS-2024-002',
            title: 'Paper Publication Fee',
            receiptUrl: '/receipts/receipt-002.pdf'
          }
        ]}
      />
    </div>
  )
}

export default PresenterHome
