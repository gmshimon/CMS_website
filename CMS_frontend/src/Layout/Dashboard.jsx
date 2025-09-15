/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { LuMessageSquare } from 'react-icons/lu'

import MessageList from '../Component/MessageList/MessageList'
import CurrentUser from '../Utilis/CurrentUser'
import {
  getConference,
  setSelectedConference
} from '../Redux/Slice/conferenceSlice'
import {
  adminNavOptions,
  attendee_chair_navOptions,
  presenterNavOptions,
  registration_committee_navOptions,
  reviewerNavOptions,
  session_chair_navOptions
} from '../Utilis/navOptions'
import { logOut, reset } from '../Redux/Slice/AuthSlice'
import { showSuccessToast } from '../Utilis/toastUtils'
import useSocket from '../Hooks/useSocket'
import { getNotifications } from '../Redux/Slice/notificationSlice'

const Dashboard = () => {
  const { isLoginSuccess, isLoginWithGoogleSuccess, user } = useSelector(
    state => state.user
  )
  const { conferences, selectedConference } = useSelector(
    state => state.conference
  )
  const { unRead } = useSelector(state => state.notifications)
  const [navOptions, setNavOptions] = useState([])
  const [activeOptions, setActiveOptions] = useState('Home')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  CurrentUser()
  useSocket()
  const dispatch = useDispatch()
  useEffect(() => {
    if (isLoginSuccess) {
      showSuccessToast('Login Successful')

      dispatch(reset())
    }
    console.log(isLoginWithGoogleSuccess)
    if (isLoginWithGoogleSuccess) {
      showSuccessToast('Login Successful')

      dispatch(reset())
    }
  }, [dispatch, isLoginSuccess, isLoginWithGoogleSuccess])

  useEffect(() => {
    if (sessionStorage.getItem('selectedConference')) {
      dispatch(
        setSelectedConference(sessionStorage.getItem('selectedConference'))
      )
    }
    if (!user) {
      return
    }
    if (user?._id) {
      dispatch(getNotifications())
      if (user?.role === 'Presenter') {
        setNavOptions(presenterNavOptions)
      }
      if (user?.role === 'Admin') {
        setNavOptions(adminNavOptions)
      }
      if (user?.role === 'Reviewer') {
        setNavOptions(reviewerNavOptions)
      }
      if (user?.role === 'Session Chair') {
        setNavOptions(session_chair_navOptions)
      }
      if (user?.role === 'Attendee') {
        setNavOptions(attendee_chair_navOptions)
      }
      if (user?.role === 'registration_committee') {
        setNavOptions(registration_committee_navOptions)
      }
    }
  }, [dispatch, user, user?._id])

  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'Admin') {
      dispatch(getConference())
    } else {
      dispatch(getConference('Active'))
    }
  }, [dispatch, user?.role])

  return (
    <section>
      <div className='drawer lg:drawer-open'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col'>
          {/* Navbar */}
          <div className=' navbar bg-slate-500 text-white w-full '>
            <div className='flex-none lg:hidden'>
              <label
                htmlFor='my-drawer-3'
                aria-label='open sidebar'
                className='btn btn-square btn-ghost'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block h-6 w-6 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </label>
            </div>
            <div className='mx-2 flex-1 px-2'>CMS</div>
            <div className='navbar-end'>
              {/* Dropdown Select */}

              <div className='ml-2'>
                <select
                  value={selectedConference}
                  className='border border-black p-1 rounded-lg w-44 text-sm bg-slate-600'
                  onChange={e => {
                    if (e.target.value === 'All Conferences') {
                      dispatch(setSelectedConference(null))
                      sessionStorage.removeItem('selectedConference')
                      return
                    }
                    dispatch(setSelectedConference(e.target.value))
                    sessionStorage.setItem('selectedConference', e.target.value)
                  }}
                  defaultValue='default'
                >
                  <option value='default' className='text-black' disabled>
                    Select Conference
                  </option>
                  <option value={'all'} className='text-white'>
                    All Conferences
                  </option>
                  {conferences?.map((opt, index) => (
                    <option key={index} value={opt._id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Dropdown */}
              <div className='flex-none'>
                <div className='dropdown dropdown-end'>
                  <div
                    tabIndex={0}
                    role='button'
                    className='btn btn-black btn-circle'
                  >
                    <div className='indicator'>
                      <LuMessageSquare className='text-xl' />
                      <span className='badge badge-xs indicator-item'>
                        {unRead}
                      </span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className='card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow'
                  >
                    <div>
                      <MessageList />
                    </div>
                  </div>
                </div>
              </div>
              {/* Profile Dropdown */}
              <div className='dropdown dropdown-end ml-2'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-ghost btn-circle avatar'
                >
                  <div className='w-8 rounded-full'>
                    <img
                      alt='Tailwind CSS Navbar component'
                      src={
                        user?.photo ||
                        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className='menu menu-sm dropdown-content bg-slate-500 rounded-box z-1 mt-3 w-52 p-2 shadow'
                >
                  <li>
                    <Link to='/admin/profile'>
                      <a className='justify-between'>Profile</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        navigate('/login')
                        dispatch(logOut())
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Page content here */}
          <div>
            {' '}
            <Outlet />
          </div>
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer-3'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu bg-slate-600 text-white min-h-full w-56 flex flex-col'>
            {/* Sidebar content here */}
            {navOptions.map((option, index) => (
              <Link key={index} to={option.path}>
                <p
                  onClick={() => {
                    sessionStorage.setItem('navOptions', option.label)
                    setActiveOptions(option.label)
                  }}
                  className={`flex items-center text-[17px] hover:text-orange-500 cursor-pointer border-b py-4 pl-5 ${
                    option.label === sessionStorage.getItem('navOptions')
                      ? 'text-orange-500'
                      : ''
                  }`}
                >
                  {option.icon} <span className='pl-4'>{option.label}</span>
                </p>
              </Link>
            ))}
            {/* Push this div to the bottom */}
            <div className='dropdown mt-auto relative'>
              {/* Dropdown menu positioned higher */}
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className='dropdown-content text-[17px] menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow mb-4 relative top-[-90px] text-black'
                >
                  <Link to={'/admin/admin-profile'}>
                    <li onClick={() => setIsDropdownOpen(false)}>
                      <a>Profile</a>
                    </li>
                  </Link>
                  <li
                    onClick={() => {
                      navigate('/login')
                      dispatch(logOut())
                    }}
                  >
                    <a>Logout</a>
                  </li>
                </ul>
              )}
            </div>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
