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
import { getConference } from '../Redux/Slice/conferenceSlice'

const navOptions = [
  {
    id: 1,
    label: 'Home',
    path: '/admin/home',
    icon: <FaHome />
  },
  //   {
  //     id:2,
  //     label:'Presenter List',
  //     path: '/presenter-list',
  //     icon: <FaListUl/>
  //   },
  {
    id: 2,
    label: 'Conference Registration',
    path: '/admin/conference-list',
    icon: <IoPerson />
  },
  {
    id: 3,
    label: 'Abstract',
    path: '/admin/abstract',
    icon: <IoDocumentAttachSharp />
  },
  {
    id: 4,
    label: 'Papers',
    path: '/admin/my-paper',
    icon: <FaBook />
  },
  {
    id: 5,
    label: 'Payment',
    path: '/admin/invoice',
    icon: <IoNewspaperSharp />
  },
  {
    id: 6,
    label: 'Scheduling',
    path: '/admin/scheduling',
    icon: <IoNewspaperSharp />
  },
  {
    id: 7,
    label: 'Certificate',
    path: '/admin/certificates',
    icon: <FaAward />
  },
  {
    id: 8,
    label: 'Messages',
    path: '/admin/messages',
    icon: <FaMessage />
  }
]

const Dashboard = () => {
  const { user } = useSelector(state => state.user)
  const [activeOptions, setActiveOptions] = useState('Home')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  CurrentUser()

  const dispatch = useDispatch()
  //   useEffect(() => {
  //     dispatch(getCategory())
  //     dispatch(getProducts('all'))
  //   }, [dispatch, createCategorySuccess])
  //   CurrentUser()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getConference())
  }, [dispatch])

  // if(!isGetUserDataLoading){
  //   return null
  // }
  // useEffect(()=>{
  //  if (isLoginSuccess) {
  //       toast.success('Successful', {
  //         position: 'top-right',
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: 'light'
  //       })
  //       dispatch(reset())
  //     }
  // },[dispatch, isLoginSuccess])
  //   useEffect(() => {
  //     if (isGetUserDataLoading) {
  //       return // Wait until data is loaded
  //     } else {
  //       if (!user?.role || user?.role !== 'admin') {
  //         navigate('/login') // Redirect to login page
  //       }
  //     }
  //   }, [user, isGetUserDataLoading, navigate])
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const checkTokenExpiration = () => {
  //     const storedToken = localStorage.getItem('userToken')
  //     if (storedToken) {
  //       const { expiration } = JSON.parse(storedToken)
  //       const currentTime = new Date().getTime()
  //       if (currentTime > expiration) {
  //         // Token has expired, log out the user
  //         localStorage.removeItem('userToken')
  //         // Redirect to the login page or show a logged-out state
  //         // dispatch(logOut())
  //         // window.location.href = "/";
  //         // history.push('/login');
  //       }
  //     }
  //   }
  //   useEffect(() => {
  //     // Call checkTokenExpiration every sec (1 * 1000 milliseconds)
  //     const tokenExpirationInterval = setInterval(checkTokenExpiration, 1 * 1000)
  //     // Clean up the interval on component unmount
  //     return () => clearInterval(tokenExpirationInterval)
  //   }, [checkTokenExpiration])
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
              {navOptions.map((option, index) => (
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

        <div className='navbar-end'>
          <div className='flex-none'>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle'
              >
                <div className='indicator'>
                  <LuMessageSquare className='text-xl' />
                  <span className='badge badge-xs indicator-item'>8</span>
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