import { useState, useEffect } from 'react'

const EditUserModal = ({ isOpen, onClose, selectedUser, onSubmit,selectedRole }) => {
  const [form, setForm] = useState({
    email: '',
    title: '',
    position: '',
    affiliation: '',
    contact: '',
    orcid: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (selectedUser) {
      setForm({
        email: selectedUser.email || '',
        title: selectedUser.title || '',
        position: selectedUser.position || '',
        affiliation: selectedUser.affiliation || '',
        contact: selectedUser.contact || '',
        orcid: selectedUser.orcid || ''
      })
    }
  }, [selectedUser])

  if (!isOpen) return null

  const onChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.affiliation) newErrors.affiliation = 'Affiliation is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg max-w-md w-full p-6 shadow-lg'>
        <h2 className='text-xl font-semibold mb-4'>Edit {selectedRole}</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email */}
          <div>
            <label className='block mb-1 font-medium'>Email</label>
            <input
              name='email'
              value={form.email}
              onChange={onChange}
              type='email'
              placeholder='Email'
              className={`w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className='text-red-600 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className='block mb-1 font-medium'>Title</label>
            <input
              name='title'
              value={form.title}
              onChange={onChange}
              type='text'
              placeholder='Title'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Position */}
          <div>
            <label className='block mb-1 font-medium'>Current Position</label>
            <input
              name='position'
              value={form.position}
              onChange={onChange}
              type='text'
              placeholder='Position'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Affiliation */}
          <div>
            <label className='block mb-1 font-medium'>
              Affiliation (University/Institute)
            </label>
            <input
              name='affiliation'
              value={form.affiliation}
              onChange={onChange}
              type='text'
              placeholder='Affiliation'
              className={`w-full px-3 py-2 border ${
                errors.affiliation ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.affiliation && (
              <p className='text-red-600 text-sm mt-1'>{errors.affiliation}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className='block mb-1 font-medium'>Contact</label>
            <input
              name='contact'
              value={form.contact}
              onChange={onChange}
              type='text'
              placeholder='Contact number'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* ORCID / LinkedIn */}
          <div>
            <label className='block mb-1 font-medium'>
              ORCID / LinkedIn Profile
            </label>
            <input
              name='orcid'
              value={form.orcid}
              onChange={onChange}
              type='url'
              placeholder='https://orcid.org/ or LinkedIn URL'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Buttons */}
          <div className='flex justify-end space-x-4 pt-4 border-t border-gray-200'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 rounded border border-gray-300 hover:bg-gray-100'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUserModal
