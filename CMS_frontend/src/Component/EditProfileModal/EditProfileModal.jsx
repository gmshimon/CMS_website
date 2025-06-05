import React, { useState } from 'react'

const EditProfileModal = ({ isOpen, onClose, userData }) => {
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    location: userData?.location || '',
    institution: userData?.institution || '',
    department: userData?.department || '',
    position: userData?.position || '',
    researchArea: userData?.researchArea || ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Here you would typically make an API call to update the profile
    console.log('Updated Profile Data:', formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg w-full max-w-2xl p-6 relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          ×
        </button>
        <h2 className='text-2xl font-bold mb-6'>Edit Profile</h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Personal Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Personal Information</h3>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Phone
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Location
                </label>
                <input
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>
                Professional Information
              </h3>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Institution
                </label>
                <input
                  type='text'
                  name='institution'
                  value={formData.institution}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Department
                </label>
                <input
                  type='text'
                  name='department'
                  value={formData.department}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Position
                </label>
                <input
                  type='text'
                  name='position'
                  value={formData.position}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Research Area
                </label>
                <input
                  type='text'
                  name='researchArea'
                  value={formData.researchArea}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>
            </div>
          </div>

          <div className='flex justify-end space-x-4'>
            <button type='button' onClick={onClose} className='btn btn-outline'>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
