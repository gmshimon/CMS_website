import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getRole, reset, createUser } from '../../Redux/Slice/AuthSlice'
import { showErrorToast, showSuccessToast } from '../../Utilis/toastUtils'

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bangladesh',
  'Belgium',
  'Brazil',
  'Canada',
  'China',
  'Denmark',
  'Egypt',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'India',
  'Indonesia',
  'Italy',
  'Japan',
  'Kenya',
  'Malaysia',
  'Nepal',
  'Netherlands',
  'Pakistan',
  'Philippines',
  'Russia',
  'Saudi Arabia',
  'South Africa',
  'Spain',
  'Sweden',
  'Switzerland',
  'Thailand',
  'Turkey',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Vietnam'
]

const Registration = () => {
  const { isCreateUserLoading, isCreateUserSuccess, isCreateUserError, roles } =
    useSelector(state => state.user)
  const [selectedRole, setSelectedRole] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fileName, setFileName] = useState('')
  const [hear, setHear] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isCreateUserError) {
      showErrorToast('User Registration Failed')

      dispatch(reset())
    }
    if (isCreateUserSuccess) {
      showSuccessToast('User Registration Successful')
      dispatch(reset())
    }
  }, [dispatch, isCreateUserError, isCreateUserSuccess])

  useEffect(() => {
    dispatch(getRole())
  }, [dispatch])

  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file)
    }
  }
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(show => !show)

  const handleRegister = e => {
    e.preventDefault()
    if (password === confirmPassword) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('role', selectedRole)
      formData.append('image', fileName) // if fileName is a file, otherwise ensure you're appending a file object
      formData.append('address', address)
      formData.append('country', country)
      formData.append('city', city)
      formData.append('zip_code', zip)
      formData.append('state', state)
      formData.append('affiliation', affiliation)
      formData.append('faculty', department)
      formData.append('password', password)
      formData.append('hear', hear)

      dispatch(createUser(formData))
    }
  }

  return (
    <section className='bg-gray-300 md:min-h-screen w-full'>
      <ToastContainer />
      <div className='md:flex justify-center w-full md:min-h-screen'>
        {/* Left side - Image */}
        {/* <div className='md:w-1/2 md:min-h-screen hidden md:block '>
          <img
            src='https://static.inevent.com/images/best-event-management-software-for-conference.jpg'
            alt='Conference'
            className='w-full h-full md:object-fit'
          />
        </div> */}

        {/* Right side - Login Form */}
        <div className='md:w-1/2 w-full  flex items-center justify-center my-2'>
          <div className='bg-white w-full px-4 py-1 mx-4 rounded-md'>
            <h2 className='text-lg font-bold mb-1 text-center'>Registration</h2>
            <form onSubmit={handleRegister} className='space-y-2'>
              {/* Role Selection */}
              <div className='mb-2'>
                <h3 className='text-sm font-semibold mb-1 text-gray-700'>
                  Select Your Role
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                  {roles?.map(role => (
                    <div
                      key={role._id}
                      onClick={() => setSelectedRole(role.value)}
                      className={`p-1.5 rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                        selectedRole === role.value
                          ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                          : 'border-gray-200 hover:border-blue-300'
                      } group`}
                    >
                      <div className='flex flex-col h-full'>
                        <h4 className='font-medium text-sm text-gray-800 mb-0.5 group-hover:text-blue-600 transition-colors duration-200'>
                          {role.title}
                        </h4>
                        <p className='text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-200 flex-grow line-clamp-2'>
                          {role.description}
                        </p>
                        <div
                          className={`mt-0.5 flex items-center ${
                            selectedRole === role._id
                              ? 'text-blue-600'
                              : 'text-transparent'
                          } transition-all duration-300`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-3 w-3 mr-1'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                          <span className='text-xs font-medium'>Selected</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {selectedRole && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-1'>
                  {/* Presenter Name */}
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Presenter Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter your full name'
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Email *
                    </label>
                    <input
                      type='email'
                      id='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter your email'
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className='md:col-span-2'>
                    <label
                      htmlFor='address'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Address *
                    </label>
                    <input
                      type='text'
                      id='address'
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter your address'
                      required
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor='city'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      City *
                    </label>
                    <input
                      type='text'
                      id='city'
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter your city'
                      required
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor='state'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      State/Province *
                    </label>
                    <input
                      type='text'
                      id='state'
                      value={state}
                      onChange={e => setState(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter your state/province'
                      required
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label
                      htmlFor='zip'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Postal Code *
                    </label>
                    <input
                      type='text'
                      id='zip'
                      value={zip}
                      onChange={e => setZip(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter your postal code'
                      required
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      htmlFor='country'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Country *
                    </label>
                    <select
                      id='country'
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    >
                      <option value=''>Select a country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Affiliation */}
                  <div>
                    <label
                      htmlFor='affiliation'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Affiliation (University/Institute) *
                    </label>
                    <input
                      type='text'
                      id='affiliation'
                      value={affiliation}
                      onChange={e => setAffiliation(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter your affiliation'
                      required
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label
                      htmlFor='department'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Faculty Department *
                    </label>
                    <input
                      type='text'
                      id='department'
                      value={department}
                      onChange={e => setDepartment(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter your department'
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className='relative'>
                    <label
                      htmlFor='password'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Password *
                    </label>
                    <div className='relative'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter your password'
                        required
                      />
                      <button
                        type='button'
                        onClick={handleClickShowPassword}
                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      >
                        {showPassword ? (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className='relative'>
                    <label
                      htmlFor='confirmPassword'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Confirm Password *
                    </label>
                    <div className='relative'>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Confirm your password'
                        required
                      />
                      <button
                        type='button'
                        onClick={handleClickShowConfirmPassword}
                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      >
                        {showConfirmPassword ? (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Profile Picture Upload */}
                  <div>
                    <label
                      htmlFor='profilePicture'
                      className='block text-gray-700 text-sm font-bold mb-1'
                    >
                      Profile Picture
                    </label>
                    <input
                      type='file'
                      id='profilePicture'
                      onChange={handleFileChange}
                      accept='image/*'
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <label
                      htmlFor='hear'
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      How did you hear about Connecting Asia? *
                    </label>
                    <select
                      id='hear'
                      value={hear}
                      onChange={e => setHear(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    >
                      <option value=''>Select an option</option>
                      <option value='social_media'>Social Media</option>
                      <option value='search_engine'>Search Engine</option>
                      <option value='friend'>Friend/Colleague</option>
                      <option value='conference'>Conference/Event</option>
                      <option value='email'>Email Newsletter</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>
                </div>
              )}

              <p className='text-center mt-4'>
                Already have an account?{' '}
                <Link to='/login'>
                  <span className='cursor-pointer font-semibold hover:underline text-blue-600'>
                    Login
                  </span>
                </Link>
              </p>

              <div className='flex justify-center mt-6'>
                <button
                  type='submit'
                  className={`w-full md:w-1/2 py-2 px-4 rounded-md transition duration-200 ${
                    password === confirmPassword && name && email
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                  disabled={
                    password !== confirmPassword ||
                    !name ||
                    !email ||
                    isCreateUserLoading
                  }
                >
                  {isCreateUserLoading ? 'Loading...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Registration
