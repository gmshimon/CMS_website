export const getScheduleColumns = type => {
  const commonColumns = [
    { label: 'Day', key: 'day' },
    { label: 'Date', key: 'date' },
    { label: 'Session', key: 'session' },
    { label: 'Start Time', key: 'startTime' },
    { label: 'End Time', key: 'endTime' },
    {
      label: 'Moderator',
      key: 'moderator',
      render: value => value?.name || '-'
    }, // shows name
    {
      label: 'Session Chair',
      key: 'sessionChair',
      render: value => value?.name || '-'
    }, // shows name
    {
      label: 'Abstract List',
      key: 'abstracts',
      render: value =>
        value?.length > 0 ? (
          <ul className='list-disc list-inside'>
            {value.map((abs, i) => (
              <li key={i}>
                {abs.paper_title}
              </li>
            ))}
          </ul>
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

 const physicalColumns = [
    { label: 'Building', key: 'venue', render: value => value?.building || '-' },
    { label: 'Hall', key: 'venue', render: value => value?.hall || '-' },
    { label: 'Room', key: 'venue', render: value => value?.room || '-' },
  ];

  const onlineColumns = [
    {
      label: 'Meeting Link',
      key: 'meetingLink',
      render: value => (
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline'
        >
          Join
        </a>
      )
    }
  ]

  return [
    ...commonColumns,
    ...(type === 'physical' ? physicalColumns : []),
    ...(type === 'online' ? onlineColumns : [])
  ]
}
