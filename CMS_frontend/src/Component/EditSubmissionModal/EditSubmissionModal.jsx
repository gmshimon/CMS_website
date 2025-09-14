import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dayjs from 'dayjs'

const EditSubmissionModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    paper_title: '',
    abstract: '',
    authors: [],
    payment_deadline: '',
    paper_deadline: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id || '',
        paper_title: initialData.paper_title || '',
        abstract: initialData.abstract || '',
        authors: initialData.authors || [],
        payment_deadline: initialData.payment_deadline
          ? dayjs(initialData.payment_deadline).format('YYYY-MM-DD')
          : '',
        paper_deadline: initialData.paper_deadline
          ? dayjs(initialData.paper_deadline).format('YYYY-MM-DD')
          : ''
      })
    }
  }, [initialData])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleQuillChange = value => {
    setFormData(prev => ({ ...prev, abstract: value }))
  }

  const handleAuthorChange = (index, e) => {
    const { name, value } = e.target
    const updatedAuthors = formData.authors.map((author, i) =>
      i === index ? { ...author, [name]: value } : { ...author }
    )
    setFormData(prev => ({ ...prev, authors: updatedAuthors }))
  }

  const handleAddAuthor = () => {
    const newAuthor = {
      _id: Date.now().toString(),
      title: '',
      name: '',
      email: '',
      affiliation: '',
      country: '',
      isPrimary: false
    }
    setFormData(prev => ({ ...prev, authors: [...prev.authors, newAuthor] }))
  }

  const handleDeleteAuthor = index => {
    const updatedAuthors = [...formData.authors]
    updatedAuthors.splice(index, 1)
    setFormData(prev => ({ ...prev, authors: updatedAuthors }))
  }

  const handleSave = () => {
    onSave(initialData._id, formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto'>
      <div className='bg-white p-6 rounded-lg w-full max-w-3xl shadow-xl relative max-h-[95vh] overflow-y-auto'>
        <h2 className='text-xl font-bold mb-4'>Edit Submission Details</h2>

        {/* Paper Title */}
        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Paper Title
        </label>
        <input
          type='text'
          name='paper_title'
          value={formData.paper_title}
          onChange={handleInputChange}
          className='border border-gray-300 p-2 rounded-md w-full mb-4'
        />

        {/* Abstract */}
        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Abstract
        </label>
        <ReactQuill
          value={formData.abstract}
          onChange={handleQuillChange}
          className='mb-4'
        />

        {/* Payment Deadline */}
        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Payment Deadline
        </label>
        <input
          type='date'
          name='payment_deadline'
          value={formData.payment_deadline}
          onChange={handleInputChange}
          className='border border-gray-300 p-2 rounded-md w-full mb-4'
        />

        {/* Paper Deadline */}
        <label className='block mb-2 text-sm font-medium text-gray-700'>
          Paper Deadline
        </label>
        <input
          type='date'
          name='paper_deadline'
          value={formData.paper_deadline}
          onChange={handleInputChange}
          className='border border-gray-300 p-2 rounded-md w-full mb-4'
        />

        {/* Authors */}
        <h3 className='text-lg font-semibold mb-2'>Authors</h3>
        {formData.authors.map((author, index) => (
          <div
            key={author._id || index}
            className='border border-gray-300 p-4 rounded-md mb-4 relative'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
              <div>
                <label className='text-sm font-medium text-gray-700'>
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  value={author.title}
                  onChange={e => handleAuthorChange(index, e)}
                  className='w-full border border-gray-300 p-2 rounded-md'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={author.name}
                  onChange={e => handleAuthorChange(index, e)}
                  className='w-full border border-gray-300 p-2 rounded-md'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={author.email}
                  onChange={e => handleAuthorChange(index, e)}
                  className='w-full border border-gray-300 p-2 rounded-md'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-gray-700'>
                  Affiliation
                </label>
                <input
                  type='text'
                  name='affiliation'
                  value={author.affiliation}
                  onChange={e => handleAuthorChange(index, e)}
                  className='w-full border border-gray-300 p-2 rounded-md'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-gray-700'>
                  Country
                </label>
                <input
                  type='text'
                  name='country'
                  value={author.country}
                  onChange={e => handleAuthorChange(index, e)}
                  className='w-full border border-gray-300 p-2 rounded-md'
                />
              </div>
            </div>
            <p className='text-sm mb-2'>
              <span className='font-medium'>Primary Author:</span>{' '}
              {author.isPrimary ? 'Yes' : 'No'}
            </p>

            {/* Delete Author Button */}
            {author.isPrimary ? (
              <span className='absolute top-2 right-2 text-xs text-gray-500 italic'>
                Primary author cannot be deleted
              </span>
            ) : (
              <button
                onClick={() => handleDeleteAuthor(index)}
                className='absolute top-2 right-2 text-red-600 text-sm hover:underline'
              >
                Delete
              </button>
            )}
          </div>
        ))}

        {/* Add Author Button */}
        <button
          onClick={handleAddAuthor}
          className='px-6 py-2 btn btn-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg mb-4'
        >
          + Add Author
        </button>

        {/* Action Buttons */}
        <div className='flex justify-end mt-6 space-x-2'>
          <button
            onClick={onClose}
            className='px-4 py-2 btn btn-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-4 py-2 btn btn-sm bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Save
          </button>
        </div>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className='absolute top-2 right-3 text-gray-600 text-2xl hover:text-black'
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default EditSubmissionModal
