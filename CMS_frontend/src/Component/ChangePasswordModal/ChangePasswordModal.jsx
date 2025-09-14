import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../Redux/Slice/AuthSlice'

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: ''
  })

  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Current password is required'
    }
    return newErrors
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      // Here you would typically make an API call to update the password
      dispatch(resetPassword(formData.email))
      onClose()
    } else {
      setErrors(newErrors)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg w-full max-w-md p-6 relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          ×
        </button>
        <h2 className='text-2xl font-bold mb-6'>Change Password</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Account Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border border-black rounded-md p-2 ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder='Your account email'
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
            )}
          </div>

          <div className='flex justify-end space-x-4 mt-6'>
            <button type='button' onClick={onClose} className='btn btn-outline'>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
