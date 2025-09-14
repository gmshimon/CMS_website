import React, { useEffect, useState } from 'react'

const EditProfileModal = ({
  isOpen,
  onClose,
  userData,
  handleUpdateUserProfile
}) => {
  const initialFormData = {
    name: '',
    email: '',
    contact: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    affiliation: '',
    faculty: '',
    position: '',
    domain: ''
  }
  const [formData, setFormData] = useState(initialFormData)
  const resetFormData = () => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        contact: userData.contact || '',
        address: userData.address || '',
        country: userData.country || '',
        state: userData.state || '',
        city: userData.city || '',
        zip_code: userData.zip_code || '',
        affiliation: userData.affiliation || '',
        faculty: userData.faculty || '',
        position: userData.position || '',
        domain: userData.domain || ''
      })
    } else {
      setFormData(initialFormData)
    }
  }

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        contact: userData.contact || '',
        address: userData.address || '',
        country: userData.country || '',
        state: userData.state || '',
        city: userData.city || '',
        zip_code: userData.zip_code || '',
        affiliation: userData.affiliation || '',
        faculty: userData.faculty || '',
        position: userData.position || '',
        domain: userData.domain || ''
      })
    }
  }, [userData])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleUpdateUserProfile(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg w-full max-w-3xl p-6 relative'>
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
                  name='name'
                  value={formData.name}
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
                  readOnly
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
                  name='contact'
                  value={formData.contact}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>

              {/* <div>
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
              </div> */}

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Address
                </label>
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  State
                </label>
                <input
                  type='text'
                  name='state'
                  value={formData.state}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  ZIP Code
                </label>
                <input
                  type='text'
                  name='zip_code'
                  value={formData.zip_code}
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
                  name='affiliation'
                  value={formData.affiliation}
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
                  name='faculty'
                  value={formData.faculty}
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
                  name='domain'
                  value={formData.domain}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  City
                </label>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Country
                </label>
                <input
                  type='text'
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-black rounded-md p-2'
                />
              </div>
            </div>
          </div>

          <div className='flex justify-end space-x-4'>
            <button
              type='button'
              onClick={() => {
                resetFormData()
                onClose()
              }}
              className='btn btn-outline'
            >
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
