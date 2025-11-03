import React, { useState } from 'react'

const ReviewersModal = ({
  reviewers = [],
  row,
  onClose,
  handleInviteReview
}) => {
  const [search, setSearch] = useState('')
  console.log(row?.reviews)
  const filtered = reviewers.filter(
    r =>
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg w-[100%] max-w-7xl shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Reviewers List</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-black'>
            ✕
          </button>
        </div>

        <input
          type='text'
          placeholder='Search by name or email'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='input input-bordered w-full mb-4'
        />

        <div className='overflow-x-auto'>
          <table className='table table-zebra w-full'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Name</th>
                <th>Email</th>
                <th>Domain</th>
                <th>Affiliation</th>
                <th>Faculty</th>
                <th>Contact</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <img
                    src={r.photo}
                    alt='Session Chair'
                    className='w-10 h-10 rounded-full'
                  />
                  <td>{r.title || '--'}</td>
                  <td>{r.name || 'Unnamed'}</td>
                  <td>{r.email}</td>
                  <td>{r.domain || '--'}</td>
                  <td>{r.affiliation || '--'}</td>
                  <td>{r.faculty || '--'}</td>
                  <td>{r.contact || 'N/A'}</td>
                  <td>
                    <button
                      disabled={row?.reviews.find(
                        item => item.reviewer._id === r._id
                      )}
                      className='px-2 py-2 text-sm font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors duration-200 mr-2'
                      onClick={() => {
                        onClose()
                        handleInviteReview({
                          abstractId: row._id,
                          reviewerId: r._id
                        })
                      }}
                    >
                      Invite
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReviewersModal
