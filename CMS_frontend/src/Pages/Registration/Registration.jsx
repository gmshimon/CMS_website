import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  getRole,
  reset,
  createUser,
  loginWithGoogle
} from '../../Redux/Slice/AuthSlice'
import { showErrorToast, showSuccessToast } from '../../Utilis/toastUtils'
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTelegramPlane,
  FaWhatsapp,
  FaLinkedinIn
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import Loading from '../../Component/Loading/Loading'

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
  const {
    isCreateUserLoading,
    isCreateUserSuccess,
    isCreateUserError,
    isLoginWithGoogleSuccess,
    isLoginWithGoogleError,
    isLoginWithGooglePending,
    roles
  } = useSelector(state => state.user)
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
  const navigate = useNavigate()
  useEffect(() => {
    if (isCreateUserError) {
      showErrorToast('User Registration Failed')
      dispatch(reset())
    }
    if (isCreateUserSuccess) {
      showSuccessToast('User Registration Successful')
      dispatch(reset())
    }
    if (isLoginWithGoogleSuccess) {
      navigate('/admin')
    }
    if (isLoginWithGoogleError) {
      showErrorToast("'User Registration Failed")
      dispatch(reset())
    }
  }, [
    dispatch,
    isCreateUserError,
    isCreateUserSuccess,
    isLoginWithGoogleError,
    isLoginWithGoogleSuccess,
    navigate
  ])

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

  if (isLoginWithGooglePending) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-130px)]'>
        <ToastContainer />
        <Loading />
      </div>
    )
  }

  return (
    <section className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <ToastContainer />

      <div className='flex flex-col lg:flex-row min-h-screen'>
        {/* Left side - Registration Form */}
        <div className='lg:w-2/5 w-full flex items-center justify-center p-6 lg:p-7'>
          <div className='w-full max-w-2xl'>
            {/* Logo Section */}
            <div className='text-center mb-5'>
              <img src='/assets/EGE_logo.png' alt='' />
            </div>

            {/* Welcome Message */}
            <div className='text-center mb-5'>
              <h2 className='text-xl font-semibold text-gray-800 mb-1'>
                Create your account and start your journey with Elite Global
                Excellence
              </h2>
            </div>
            <div className='w-full max-w-4xl bg-white rounded-xl shadow-lg p-3'>
              {/* Registration Form */}
              <form onSubmit={handleRegister} className='space-y-4'>
                {/* Role Selection */}
                <div>
                  <h3 className='text-sm font-semibold mb-2 text-gray-700'>
                    Select Your Role
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {roles?.map(role => (
                      <div
                        key={role._id}
                        onClick={() => setSelectedRole(role.value)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md ${
                          selectedRole === role.value
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <h4 className='font-medium text-sm text-gray-800 mb-1'>
                          {role.title}
                        </h4>
                        <p className='text-xs text-gray-600 line-clamp-2'>
                          {role.description}
                        </p>
                        {selectedRole === role.value && (
                          <div className='mt-1 flex items-center text-blue-600 text-xs font-medium'>
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
                            Selected
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Fields (only show if role selected) */}
                {selectedRole && (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Keep all your input fields unchanged */}
                    {/* Just styling improvements: padding, rounded, focus ring */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Presenter Name *
                      </label>
                      <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        placeholder='Enter your full name'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Email *
                      </label>
                      <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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

                {/* Submit Button */}
                <div className='mt-6'>
                  <button
                    type='submit'
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                      password === confirmPassword &&
                      name &&
                      email &&
                      affiliation &&
                      department
                        ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={
                      password !== confirmPassword ||
                      !name ||
                      !email ||
                      !affiliation ||
                      !department ||
                      isCreateUserLoading ||
                      isLoginWithGooglePending
                    }
                  >
                    {isCreateUserLoading ? 'Loading...' : 'Register'}
                  </button>
                </div>
                {/* Divider */}
                <div className='relative my-6'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300'></div>
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-2 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-500'>
                      OR
                    </span>
                  </div>
                </div>

                {/* Google Sign In Button */}
                <button
                  title={`${
                    !selectedRole ? 'Please select role' : 'Google Signup'
                  }`}
                  disabled={
                    !selectedRole ||
                    isCreateUserLoading ||
                    isLoginWithGooglePending
                  }
                  onClick={() => dispatch(loginWithGoogle(selectedRole))}
                  type='button'
                  className={`w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200 group ${
                    !selectedRole && 'cursor-not-allowed'
                  }`}
                >
                  <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24'>
                    <path
                      fill='#4285F4'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='#34A853'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='#FBBC05'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    />
                    <path
                      fill='#EA4335'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                  <span className='text-gray-700 font-medium group-hover:text-gray-900'>
                    Continue with Google
                  </span>
                </button>

                {/* Login Redirect */}
                <p className='text-center mt-4 text-sm text-gray-600'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='text-blue-600 font-semibold hover:underline'
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Right side - Information Panel */}
        <div className='lg:w-3/5 w-full bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 text-white p-8 lg:p-12 flex items-center'>
          <div className='w-full max-w-2xl mx-auto'>
            <div className='mb-8'>
              <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight'>
                Welcome to Elite Global Excellence Conference Management System
                (EGE-CMS)
              </h1>

              <div className='flex items-start mb-6'>
                <div className='flex-shrink-0 mt-1'>
                  <span className='text-2xl'>✨</span>
                </div>
                <div className='ml-4'>
                  <p className='text-lg lg:text-xl leading-relaxed'>
                    Whether you are a researcher, student, educator, or industry
                    professional, this system connects you to{' '}
                    <span className='font-semibold text-yellow-300'>
                      world-class opportunities:
                    </span>
                  </p>
                </div>
              </div>

              <div className='space-y-4 mb-8'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 mt-1'>
                    <span className='text-xl'>📄</span>
                  </div>
                  <div className='ml-4'>
                    <p className='text-base lg:text-lg'>
                      <span className='font-semibold'>
                        Submit & track your research papers
                      </span>{' '}
                      with ease.
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='flex-shrink-0 mt-1'>
                    <span className='text-xl'>🌐</span>
                  </div>
                  <div className='ml-4'>
                    <p className='text-base lg:text-lg'>
                      <span className='font-semibold'>
                        Register for upcoming global conferences
                      </span>{' '}
                      in just a few clicks.
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='flex-shrink-0 mt-1'>
                    <span className='text-xl'>🤝</span>
                  </div>
                  <div className='ml-4'>
                    <p className='text-base lg:text-lg'>
                      <span className='font-semibold'>
                        Network with scholars and experts
                      </span>{' '}
                      from across the globe.
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='flex-shrink-0 mt-1'>
                    <span className='text-xl'>🏆</span>
                  </div>
                  <div className='ml-4'>
                    <p className='text-base lg:text-lg'>
                      <span className='font-semibold'>
                        Showcase your ideas and innovations
                      </span>{' '}
                      to an international audience.
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0 mt-1'>
                  <span className='text-2xl'>🚀</span>
                </div>
                <div className='ml-4'>
                  <p className='text-lg lg:text-xl leading-relaxed'>
                    <span className='font-bold text-yellow-300'>
                      Don't miss out!
                    </span>{' '}
                    One registration unlocks access to all our transformative
                    conferences, workshops, and academic events designed to
                    shape the future of research and innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className='mt-12'>
              <div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
                {[
                  {
                    name: 'Facebook',
                    color: 'bg-blue-600',
                    icon: <FaFacebookF />,
                    link: 'https://www.facebook.com/Eliteglobalexcellence'
                  },
                  {
                    name: 'Instagram',
                    color: 'bg-gradient-to-tr from-pink-500 to-yellow-400',
                    icon: <FaInstagram />,
                    link: 'https://www.instagram.com/eliteglobalexcellence?igsh=MWZubDNzdnJuYmt4Yw=='
                  },
                  {
                    name: 'Twitter',
                    color: 'bg-black',
                    icon: <FaXTwitter />,
                    link: 'https://twitter.com/'
                  },
                  {
                    name: 'TikTok',
                    color: 'bg-black',
                    icon: <FaTiktok />,
                    link: 'https://www.tiktok.com/@eliteglobalexcellence?_t=ZS-8zjLvUNVZ8D&_r=1'
                  },
                  {
                    name: 'YouTube',
                    color: 'bg-red-600',
                    icon: <FaYoutube />,
                    link: 'https://www.youtube.com/@eliteglobalexcellence'
                  },
                  {
                    name: 'Telegram',
                    color: 'bg-sky-500',
                    icon: <FaTelegramPlane />,
                    link: 'https://t.me/'
                  },
                  {
                    name: 'WhatsApp',
                    color: 'bg-green-500',
                    icon: <FaWhatsapp />,
                    link: 'https://wa.me/+60 11-2116 6164' // ✅ replace with your number
                  },
                  {
                    name: 'LinkedIn',
                    color: 'bg-blue-700',
                    icon: <FaLinkedinIn />,
                    link: 'https://www.linkedin.com/company/elite-global-excellence/'
                  }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`w-14 h-14 ${social.color} text-white text-xl rounded-lg flex items-center justify-center 
                shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer`}
                    title={social.name}
                  >
                    <span className='text-4xl'>{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Registration
