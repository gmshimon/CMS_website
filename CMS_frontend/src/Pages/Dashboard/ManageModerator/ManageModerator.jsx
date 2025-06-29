import React from 'react'
import UserTable from '../../../Component/UserTable/UserTable'

const ManageModerator = () => {
  const moderators = [
    {
      _id: 'mod001',
      image: 'https://i.pravatar.cc/40?img=21',
      name: 'Dr. Mehedi Hasan',
      university: 'University of Chittagong',
      position: 'Moderator',
      country: 'Bangladesh',
      domain: 'Cybersecurity',
      email: 'mehedi.hasan@example.com',
      contact: '+880-1711-234567',
      orcid: 'https://orcid.org/0000-0001-2345-6789',
      role: 'Moderator'
    },
    {
      _id: 'mod002',
      image: 'https://i.pravatar.cc/40?img=22',
      name: 'Prof. Olivia Brown',
      university: 'Harvard University',
      position: 'Moderator',
      country: 'USA',
      domain: 'Sociology',
      email: 'olivia.brown@example.com',
      contact: '+1-202-555-0173',
      orcid: 'https://orcid.org/0000-0002-9876-5432',
      role: 'Moderator'
    }
  ]

  const reviewerColumns = [
    {
      label: 'Photo',
      key: 'image',
      render: value => (
        <img src={value} alt='Moderator' className='w-10 h-10 rounded-full' />
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
    console.log('Edit moderator:', user)
  }

  const handleDelete = user => {
    console.log('Delete moderator:', user)
  }

  const handleAddModerator = () => {
    console.log('Add Moderator clicked')
    // Trigger modal or navigation if needed
  }

  return (
    <div>
      <button
        onClick={handleAddModerator}
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-2'
      >
        + Add Moderator
      </button>

      <UserTable
        users={moderators}
        columns={reviewerColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ManageModerator
