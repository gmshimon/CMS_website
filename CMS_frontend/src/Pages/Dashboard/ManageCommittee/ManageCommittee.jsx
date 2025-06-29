import React, { useState } from 'react'
import UserTable from '../../../Component/UserTable/UserTable'

const ManageCommittee = () => {
  const [selectedCommittee, setSelectedCommittee] = useState('Scientific')

  const scientificCommittee = [
    {
      _id: 'sci001',
      image: 'https://i.pravatar.cc/40?img=30',
      name: 'Dr. Nafisa Islam',
      university: 'University of Dhaka',
      position: 'Chair',
      country: 'Bangladesh',
      domain: 'Biotechnology',
      email: 'nafisa.islam@example.com',
      contact: '+880-1678-123456',
      orcid: 'https://orcid.org/0000-0003-4567-8901',
      role: 'Scientific Committee'
    }
  ]

  const technicalCommittee = [
    {
      _id: 'tech001',
      image: 'https://i.pravatar.cc/40?img=31',
      name: 'Eng. Tarek Rahman',
      university: 'BUET',
      position: 'Coordinator',
      country: 'Bangladesh',
      domain: 'Embedded Systems',
      email: 'tarek.rahman@example.com',
      contact: '+880-1977-987654',
      orcid: 'https://orcid.org/0000-0004-9876-1234',
      role: 'Technical Committee'
    }
  ]

  const committeeColumns = [
    {
      label: 'Photo',
      key: 'image',
      render: value => (
        <img src={value} alt='Member' className='w-10 h-10 rounded-full' />
      )
    },
    { label: 'Name', key: 'name' },
    { label: 'University', key: 'university' },
    { label: 'Position', key: 'position' },
    { label: 'Country', key: 'country' },
    { label: 'Domain', key: 'domain' },
    { label: 'Email', key: 'email' },
    { label: 'Contact', key: 'contact' },
    {
      label: 'ORCID ID',
      key: 'orcid',
      render: value => (
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline'
        >
          ORCID
        </a>
      )
    }
  ]

  const handleEdit = user => {
    console.log('Edit:', user)
  }

  const handleDelete = user => {
    console.log('Delete:', user)
  }

  const handleAddMember = () => {
    console.log('Add Committee Member clicked')
  }

  const committeeData =
    selectedCommittee === 'Scientific'
      ? scientificCommittee
      : technicalCommittee

  return (
    <div>
      <button
        onClick={handleAddMember}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Add Member
      </button>

      <div className='flex space-x-4 mb-6'>
        {['Scientific', 'Technical'].map(type => (
          <button
            key={type}
            onClick={() => setSelectedCommittee(type)}
            className={`py-2 px-4 font-medium rounded-lg ${
              selectedCommittee === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {type} Committee
          </button>
        ))}
      </div>

      <UserTable
        users={committeeData}
        columns={committeeColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ManageCommittee
