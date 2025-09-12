import { FaHome, FaAward, FaChartBar, FaCog, FaBook, FaList } from 'react-icons/fa'
import { IoIosPaper } from 'react-icons/io'
import { FaMessage } from 'react-icons/fa6'
import {
  IoDocumentAttachSharp,
  IoNewspaperSharp,
  IoPerson
} from 'react-icons/io5'
import {
  MdOutlineEvent,
  MdOutlineInsertInvitation,
  MdOutlineReviews,
  MdSchedule
} from 'react-icons/md'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiBarChartSquare } from 'react-icons/bi'
import { ListOrdered } from 'lucide-react'

const presenterNavOptions = [
  {
    id: 1,
    label: 'Home',
    path: '/admin',
    icon: <FaHome />
  },
  {
    id: 2,
    label: 'Conference Registration',
    path: '/admin/conference-list',
    icon: <MdOutlineEvent />
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
    path: '/admin/presenter/scheduling',
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
    path: '/admin',
    icon: <FaHome />
  },
  {
    id: 2,
    label: 'Conference',
    path: '/admin/conference',
    icon: <MdOutlineEvent  />
  },
  {
    id: 3,
    label: 'Attendee List',
    path: '/admin/list',
    icon: <FaList/>
  },
  {
    id: 4,
    label: 'Submission',
    path: '/admin/submission',
    icon: <IoIosPaper />
  },
  {
    id: 5,
    label: 'Users',
    path: '/admin/users',
    icon: <IoPerson />
  },
  {
    id: 6,
    label: 'Review Workflow',
    path: '/admin/review',
    icon: <MdOutlineReviews />
  },
  {
    id: 7,
    label: 'Scheduling',
    path: '/admin/scheduling',
    icon: <MdSchedule />
  },
  {
    id: 8,
    label: 'Message',
    path: '/admin/messages',
    icon: <FaMessage />
  },
  {
    id: 9,
    label: 'Analytics & Report',
    path: '/admin/users',
    icon: <BiBarChartSquare />
  },
  {
    id: 10,
    label: 'Settings',
    path: '/admin/settings',
    icon: <AiOutlineSetting />
  }
]

const reviewerNavOptions = [
  {
    id: 1,
    label: 'Home',
    path: '/admin/',
    icon: <FaHome />
  },
  {
    id: 2,
    label: 'Invitation',
    path: '/admin/my-review/pending',
    icon: <MdOutlineInsertInvitation />
  },
  {
    id: 3,
    label: 'Reviews',
    path: '/admin/my-review/reviewed',
    icon: <MdOutlineReviews />
  },
  {
    id: 4,
    label: 'Certificates',
    path: '/admin/my-review/certificate',
    icon: <FaAward />
  }
]

const session_chair_navOptions = [
  {
    id: 1,
    label: 'Home',
    path: '/admin/',
    icon: <FaHome />
  },
  {
    id: 2,
    label: 'Messages',
    path: '/admin/messages',
    icon: <FaMessage />
  }
]

const attendee_chair_navOptions = [
  {
    id: 1,
    label: 'Home',
    path: '/admin/',
    icon: <FaHome />
  },
  {
    id: 2,
    label: 'Attendee List',
    path: '/admin/attendee-list',
    icon: <ListOrdered />
  },
  {
    id: 3,
    label: 'Payment',
    path: '/admin/conference-reg-invoice',
    icon: <IoNewspaperSharp />
  },
  {
    id: 4,
    label: 'Messages',
    path: '/admin/messages',
    icon: <FaMessage />
  }
]
const registration_committee_navOptions = [
  {
    id: 1,
    label: 'Home',
    path: '/admin/',
    icon: <FaHome />
  },
  {
    id: 2,
    label: 'Total Registration',
    path: '/admin/list',
    icon: <ListOrdered />
  },
  
  {
    id: 3,
    label: 'Scheduling',
    path: '/admin/scheduling',
    icon: <MdSchedule />
  },
   {
    id: 4,
    label: 'Submission',
    path: '/admin/abstract',
    icon: <IoIosPaper />
  },
  {
    id: 5,
    label: 'Messages',
    path: '/admin/messages',
    icon: <FaMessage />
  },
]

export {
  presenterNavOptions,
  adminNavOptions,
  reviewerNavOptions,
  session_chair_navOptions,
  attendee_chair_navOptions,
  registration_committee_navOptions
}
