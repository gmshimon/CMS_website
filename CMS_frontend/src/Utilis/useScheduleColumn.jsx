export const getScheduleColumns = (type) => {
  const commonColumns = [
    { label: 'Day', key: 'day' },
    { label: 'Date', key: 'date' },
    { label: 'Session', key: 'session' },
    { label: 'Start Time', key: 'startTime' },
    { label: 'End Time', key: 'endTime' },
    { label: 'Moderator', key: 'moderator' }, // shows name
    { label: 'Session Chair', key: 'session_chair' }, // shows name
    { label: 'Abstract List', key: 'abstractList' },
    { label: 'Conference', key: 'conference' },
  ];

  const physicalColumns = [
    { label: 'Building', key: 'building' },
    { label: 'Hall', key: 'hall' },
    { label: 'Room', key: 'room' },
  ];

  const onlineColumns = [
    {
      label: 'Meeting Link',
      key: 'meetingLink',
      render: value => (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Join
        </a>
      )
    }
  ];

  return [
    ...commonColumns,
    ...(type === 'physical' ? physicalColumns : []),
    ...(type === 'online' ? onlineColumns : [])
  ];
};
