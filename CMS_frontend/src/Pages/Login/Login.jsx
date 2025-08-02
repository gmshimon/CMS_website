import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { loginUser, reset } from '../../Redux/Slice/AuthSlice'

const Login = () => {
  const {isLoginSuccess,isLoginLoading,isLoginError} = useSelector(state=>state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    if(isLoginSuccess){
      navigate('/admin/home')
    }
    if(isLoginError){
      toast.error('Failed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      dispatch(reset())
    }
  },[dispatch, isLoginError, isLoginSuccess, navigate])
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
  return (
    <section className='bg-gray-300 h-screen w-full'>
      <ToastContainer/>
      <div className='md:flex w-full h-full'>
        {/* Left side - Image */}
        <div className='md:w-1/2 h-full hidden md:block '>
          <img
            src='https://static.inevent.com/images/best-event-management-software-for-conference.jpg'
            alt='Conference'
            className='w-full h-full md:object-center'
          />
        </div>

        {/* Right side - Login Form */}
        <div className='md:w-1/2 flex items-center justify-center h-screen'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-md'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
            <form>
              <div className=''>
                <div className='mb-4'>
                  <label
                    htmlFor='email'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Email
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
                <div className='mb-6 relative'>
                  <label
                    htmlFor='password'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Password
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
              </div>
              <div className='mt-6'></div>
              <p className='text-end font-semibold hover:underline cursor-pointer'>
                Forgot Password
              </p>
              <p className='mb-2'>
                Please register at first.{' '}
                <Link to='/register'>
                  <span className='font-semibold hover:underline cursor-pointer'>
                    Register
                  </span>
                </Link>
              </p>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200'
                onClick={handleLogin}
                disabled={isLoginLoading}
              >
                {isLoginLoading?<p>
                  Loading <span className="loading loading-spinner loading-xs"></span>
                </p>:'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
