/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { FaAward, FaBook, FaHome, FaListUl } from 'react-icons/fa'
import {
  IoDocumentAttachSharp,
  IoNewspaperSharp,
  IoPerson
} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LuMessageSquare } from 'react-icons/lu'
import { FaMessage } from 'react-icons/fa6'
import MessageList from '../Component/MessageList/MessageList'
import CurrentUser from '../Utilis/CurrentUser'
import { getConference, setSelectedConference } from '../Redux/Slice/conferenceSlice'
import socket from '../Socket/socket'
import {
  addNotification,
  getNotifications,
  updateNotification
} from '../Redux/Slice/notificationSlice'
import axiosSecure from '../Utilis/axiosSecure'
import { adminNavOptions, presenterNavOptions } from '../Utilis/navOptions'

const Dashboard = () => {
  const { conferences,selectedConference } = useSelector(state => state.conference)
  const { list } = useSelector(state => state.notifications)
  const { user } = useSelector(state => state.user)
  const [navOptions, setNavOptions] = useState([])
  const [activeOptions, setActiveOptions] = useState('Home')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  CurrentUser()
  const dispatch = useDispatch()

  useEffect(() => {
    if (sessionStorage.getItem('selectedConference')) {
      dispatch(setSelectedConference(sessionStorage.getItem('selectedConference')))
    }
    if (!socket.connected) {
      socket.connect()
    }
    if (!user) {
      return
    }
    if (user?._id) {
      if (user?.role === 'Presenter') {
        setNavOptions(presenterNavOptions)
      }
      if (user?.role === 'Admin') {
        setNavOptions(adminNavOptions)
      }
      //dispatch(getNotifications())
      // socket.emit('register', user?._id)
    }
    // socket.on('sendNotification', notification => {
    //   dispatch(addNotification(notification))
    //   // toast.info(`New notification: ${notification.message}`)
    //   if ('Notification' in window && Notification.permission === 'granted') {
    //     new Notification(notification.title, {
    //       body: notification.message,
    //       icon: '/logo192.png' // Optional icon — use your own image path
    //     })
    //   }
    // })

    // socket.on('notificationRead', ({ notificationId }) => {
    //   dispatch(updateNotification(notificationId))
    // })
    // return () => {
    //   socket.off('sendNotification')
    //   socket.off('notificationRead')
    // }
  }, [dispatch, user, user?._id])

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getConference())
  }, [dispatch])

  //   const handleTestNotification = async () => {
  //   const testNotification = {
  //     user: user?._id,
  //     title: 'Test Notification',
  //     message: 'This is a test notification'
  //   }

  //   try {
  //     const res = await axiosSecure.post('/notification', testNotification)
  //     toast.success('Test notification sent via API!')
  //   } catch (err) {
  //     console.error(err)
  //     toast.error('Failed to send test notification')
  //   }
  // }

  return (
    <section>
      <ToastContainer />
      <div className='navbar bg-slate-500 shadow-sm'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div className='flex items-center'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  {' '}
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h7'
                  />{' '}
                </svg>
              </div>
              <p className='text-2xl ml-3 font-semibold'>EGE CMS</p>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow bg-gray-400'
            >
              {navOptions?.map((option, index) => (
                <Link key={index} to={option.path}>
                  <div
                    onClick={() => {
                      sessionStorage.setItem('navOptions', option.label)
                      setActiveOptions(option.label)
                    }}
                    className={`flex items-center text-[14px] hover:bg-gray-800 hover:text-orange-500 cursor-pointer border-b border-gray-700 py-3 px-2 transition-all duration-200 ${
                      option.label === sessionStorage.getItem('navOptions')
                        ? 'bg-gray-800 text-orange-500'
                        : ''
                    }`}
                  >
                    <span className='text-lg mr-2'>{option.icon}</span>
                    <span className=''>{option.label}</span>
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {/* <button
          onClick={handleTestNotification}
          className='btn btn-sm bg-orange-500 hover:bg-orange-600 text-white mr-2'
        >
          Send Test Notification
        </button> */}
        <div className='navbar-end'>
          {/* Dropdown Select */}
          {user?.role !== 'Admin' && (
            <div className='ml-2'>
              <select
                value={selectedConference}
                className='border border-black p-1 rounded-lg w-44 text-sm'
                onChange={e => {
                  dispatch(setSelectedConference(e.target.value))
                  sessionStorage.setItem('selectedConference', e.target.value)
                }}
                defaultValue='default'
              >
                <option value='default' disabled>
                  Select Conference
                </option>
                {conferences?.map((opt, index) => (
                  <option key={index} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Message Dropdown */}
          <div className='flex-none'>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle'
              >
                <div className='indicator'>
                  <LuMessageSquare className='text-xl' />
                  <span className='badge badge-xs indicator-item'>
                    {list?.length}
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
                  src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <Link to='/admin/profile'>
                  <a className='justify-between'>Profile</a>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  )
}

export default Dashboard
