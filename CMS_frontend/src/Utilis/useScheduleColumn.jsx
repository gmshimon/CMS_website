import { formatDate } from 'date-fns'
import { Clock, MapPin, Users, Video } from 'lucide-react'

const getTypeBadge = type => {
  const isOnline = type.includes('Online')
  const isPaper = type.includes('Paper')

  return (
    <div className='flex flex-col gap-1'>
      <span
        className={`badge ${
          isOnline ? 'badge-info' : 'badge-success'
        } badge-sm`}
      >
        {isOnline ? 'Online' : 'Physical'}
      </span>
      <span
        className={`badge ${
          isPaper ? 'badge-primary' : 'badge-secondary'
        } badge-sm`}
      >
        {isPaper ? 'Paper' : 'Poster'}
      </span>
    </div>
  )
}

export const getScheduleColumns = () => {
  const commonColumns = [
    {
      label: 'Day & Date',
      key: 'day',
      render: (_, row) => (
        <div className='flex flex-col'>
          <span className='font-semibold text-primary'>{row.day}</span>
          <span className='text-sm text-gray-600'>
            {formatDate(new Date(row.date), 'PPP')}
          </span>
        </div>
      )
    },
    {
      label: 'Session',
      key: 'session',
      render: value =>
        <span className='font-medium text-gray-800'>{value}</span> || '-'
    },
    {
      label: 'Time',
      key: 'startTime',
      render: (_, row) => (
        <div className='flex items-center gap-1 text-sm'>
          <Clock className='text-gray-400' size={14} />
          <span>
            {row.startTime} - {row.endTime}
          </span>
        </div>
      )
    },
    {
      label: 'Type',
      key: 'abstractType',
      render: value => getTypeBadge(value)
    },
    {
      label: '	Location/Link',
      key: 'location',
      render: (_, row) => (
        <>
          {row.abstractType.includes('Online') ? (
            <div className='flex items-center gap-2'>
              <Video className='text-blue-500' size={16} />
              <a
                href={row.meetingLink}
                target='_blank'
                rel='noopener noreferrer'
                className='link link-primary text-sm truncate max-w-32'
                title={row.meetingLink}
              >
                Join Meeting
              </a>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <MapPin className='text-green-500' size={16} />
              <div className='text-sm'>
                <div className='font-medium'>{row.venue?.building}</div>
                <div className='text-gray-600'>
                  {row.venue?.hall} - {row.venue?.room}
                </div>
              </div>
            </div>
          )}
        </>
      )
    },
    {
      label: 'Chair & Moderator',
      key: 'moderator',
      render: (_, row) => (
        <div className='text-sm'>
          <div className='flex items-center gap-1 mb-1'>
            <Users className='text-gray-400' size={12} />
            <span className='font-medium'>Chair:</span>
            <span className='text-gray-700'>
              {row.sessionChair?.name || 'Not assigned'}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='font-medium'>Moderator:</span>
            <span className='text-gray-700'>
              {row.moderator?.name || 'Not assigned'}
            </span>
          </div>
        </div>
      )
    }, // shows name
    {
      label: 'Abstract List',
      key: 'abstracts',
      render: value =>
        value?.length > 0 ? (
          <>
            <div className='font-medium text-gray-800 mb-1'>
              {value.length} Abstract(s)
            </div>
            <div className='space-y-1'>
              <div className='space-y-1'>
                {value.slice(0, 2).map((abstract, idx) => (
                  <div
                    key={idx}
                    className='text-gray-600 truncate max-w-44'
                    title={abstract.paper_title}
                  >
                    • {abstract.paper_title}
                  </div>
                ))}
                {value.length > 2 && (
                  <div className='text-gray-500 text-xs'>
                    +{value.length - 2} more
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          'No abstracts'
        )
    },
    {
      label: 'Conference',
      key: 'conference',
      render: value => value?.name || '-'
    }
  ]

  return [...commonColumns]
}
