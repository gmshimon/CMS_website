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
import {
  getConference,
  setSelectedConference
} from '../Redux/Slice/conferenceSlice'
import socket from '../Socket/socket'
import {
  addNotification,
  getNotifications,
  updateNotification
} from '../Redux/Slice/notificationSlice'
import axiosSecure from '../Utilis/axiosSecure'
import {
  adminNavOptions,
  presenterNavOptions,
  reviewerNavOptions
} from '../Utilis/navOptions'

const Dashboard = () => {
  const { conferences, selectedConference } = useSelector(
    state => state.conference
  )
  const { list } = useSelector(state => state.notifications)
  const { user } = useSelector(state => state.user)
  const [navOptions, setNavOptions] = useState([])
  const [activeOptions, setActiveOptions] = useState('Home')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  CurrentUser()
  const dispatch = useDispatch()
  useEffect(() => {
    if (sessionStorage.getItem('selectedConference')) {
      dispatch(
        setSelectedConference(sessionStorage.getItem('selectedConference'))
      )
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
      if (user?.role === 'Reviewer') {
        setNavOptions(reviewerNavOptions)
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
    if (user?.role === 'Admin') {
      dispatch(getConference())
    } else {
      dispatch(getConference('Active'))
    }
  }, [dispatch, user?.role])

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
                  className='menu menu-sm dropdown-content bg-slate-500 rounded-box z-1 mt-3 w-52 p-2 shadow'
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
            {/* <h1 className='text-2xl py-7 text-center border-b'></h1> */}
            {/* <Link to='/'> */}
            {/* <img className='py-7 cursor-pointer' src={logo} alt='' /> */}
            {/* </Link> */}
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
                      // dispatch(logOut());
                      setIsDropdownOpen(false)
                    }}
                  >
                    <a>Logout</a>
                  </li>
                </ul>
              )}
              <div tabIndex={0} role='button'>
                <p
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen)
                    setActiveOptions('Name')
                  }}
                  className={`flex items-center text-[17px] hover:text-orange-500 cursor-pointer border-t py-4 pl-4 ${
                    'Name' === activeOptions ? 'text-orange-500' : ''
                  }`}
                >
                  <div className='avatar placeholder'>
                    <div className='bg-neutral text-neutral-content w-8 rounded-full'>
                      <span className='text-xs'>
                        <img src={user?.image} alt='' />
                      </span>
                    </div>
                  </div>
                  <p title={name} className='cursor-pointer ml-3'>
                    {user?.name.length > 9
                      ? user?.name.slice(0, 14) + ' ...'
                      : user?.name}
                  </p>
                </p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
