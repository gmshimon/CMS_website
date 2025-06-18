import { FaHome, FaAward, FaChartBar, FaCog, FaBook } from 'react-icons/fa'
import { IoIosPaper } from 'react-icons/io'
import { FaMessage } from 'react-icons/fa6'
import { IoDocumentAttachSharp, IoNewspaperSharp, IoPerson } from 'react-icons/io5'
import { MdOutlineReviews, MdSchedule } from 'react-icons/md'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiBarChartSquare } from 'react-icons/bi'

const presenterNavOptions = [
  {
    id: 1,
    label: 'Home',
    path: '/admin/home',
    icon: <FaHome />
  },
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

const adminNavOptions = [
  {
    id: 1,
    label: 'Home',
    path: '/admin/home',
    icon: <FaHome />
  },
  {
    id: 2,
    label: 'Conference',
    path: '/admin/conference',
    icon: <IoPerson />
  },
  {
    id: 3,
    label: 'Submission',
    path: '/admin/conference-list',
    icon: <IoIosPaper />
  },
  {
    id: 4,
    label: 'Users',
    path: '/admin/payment',
    icon: <IoIosPaper />
  },
  {
    id: 5,
    label: 'Review Workflow',
    path: '/admin/review',
    icon: <MdOutlineReviews />
  },
  {
    id: 6,
    label: 'Scheduling',
    path: '/admin/scheduling',
    icon: <MdSchedule />
  },
  {
    id: 7,
    label: 'Message',
    path: '/admin/messages',
    icon: <FaMessage />
  },
  {
    id: 8,
    label: 'Analytics & Report',
    path: '/admin/users',
    icon: <BiBarChartSquare />
  },
  {
    id: 9,
    label: 'Settings',
    path: '/admin/settings',
    icon: <AiOutlineSetting />
  }
]

export { presenterNavOptions,adminNavOptions }
