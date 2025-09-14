import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginUser, loginWithGoogle, reset } from '../../Redux/Slice/AuthSlice'
import ChangePasswordModal from '../../Component/ChangePasswordModal/ChangePasswordModal'
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

const Login = () => {
  const {
    isLoginSuccess,
    isLoginLoading,
    isLoginWithGoogleSuccess,
    isLoginWithGoogleError,
    isLoginWithGooglePending,
    isLoginError,
    sendResetPasswordSuccess
  } = useSelector(state => state.user)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/admin')
    }
    if (isLoginError) {
      showErrorToast('Failed')
      dispatch(reset())
    }
    if (sendResetPasswordSuccess) {
      showSuccessToast('Password reset link sent')
      dispatch(reset())
    }
    if (isLoginWithGoogleSuccess) {
      navigate('/admin')
    }
    if (isLoginWithGoogleError) {
      showErrorToast("'User Registration Failed")
      dispatch(reset())
    }
  }, [dispatch, isLoginError, isLoginSuccess, isLoginWithGoogleError, isLoginWithGoogleSuccess, navigate, sendResetPasswordSuccess])

  const handleLogin = e => {
    e.preventDefault()
    const data = {
      email,
      password
    }
    dispatch(loginUser(data))
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)

  if (isLoginWithGooglePending) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-130px)]'>
        <ToastContainer />
        <Loading />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <ToastContainer />
      <div className='flex flex-col lg:flex-row min-h-screen'>
        {/* Left side - Login Form */}
        <div className='lg:w-2/5 w-full flex items-center justify-center p-6 lg:p-12'>
          <div className='w-full max-w-md'>
            {/* Logo Section */}
            <div className='text-center mb-8'>
              <img src='/assets/EGE_logo.png' alt='' />
            </div>

            {/* Welcome Message */}
            <div className='text-center mb-8'>
              <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                Sign in now to continue your journey with
              </h2>
              <p className='text-lg font-medium text-blue-600'>
                Elite Global Excellence.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className='space-y-6'>
              {/* Email Field */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Email
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg
                      className='w-5 h-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                      />
                    </svg>
                  </div>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400'
                    placeholder='Enter your email'
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg
                      className='w-5 h-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400'
                    placeholder='Enter your password'
                    required
                  />
                  <button
                    type='button'
                    onClick={handleClickShowPassword}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200'
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

              {/* Forgot Password */}
              <div className='text-right'>
                <button
                  type='button'
                  onClick={() => setIsPasswordModalOpen(true)}
                  className='text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition duration-200'
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type='submit'
                disabled={isLoginLoading}
                className='w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-teal-700 hover:to-teal-800 focus:ring-4 focus:ring-teal-200 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {isLoginLoading ? (
                  <div className='flex items-center justify-center'>
                    <span>Loading</span>
                    <svg
                      className='animate-spin ml-2 h-4 w-4 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

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
                onClick={() => dispatch(loginWithGoogle())}
                type='button'
                className='w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200 group'
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
            </form>

            {/* Register Link */}
            <div className='mt-8 text-center'>
              <p className='text-gray-600'>
                New here?{' '}
                <Link
                  to='/register'
                  className='text-blue-600 font-semibold hover:text-blue-800 hover:underline transition duration-200'
                >
                  Register today
                </Link>{' '}
                and become part of a vibrant global community.
              </p>
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

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  )
}

export default Login
