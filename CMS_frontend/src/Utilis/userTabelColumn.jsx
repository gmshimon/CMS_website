export const reviewerColumns = [
    {
      label: 'Photo',
      key: 'image',
      render: (value) => (
        <img src={value} alt='Session Chair' className='w-10 h-10 rounded-full' />
      )
    },
    { label: 'Name', key: 'name' },
    { label: 'University', key: 'university' },
    { label: 'Position', key: 'position' },
    { label: 'Country', key: 'country' },
    { label: 'Domain', key: 'domain' },
    { label: 'Email', key: 'email' },
    { label: 'Contact', key: 'contact' },
    {
      label: 'ORCID ID',
      key: 'orcid',
      render: (value) => (
        <a href={value} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
          ORCID
        </a>
      )
    }
  ]

export  const authorColumns = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Address', key: 'address' },
    { label: 'Country', key: 'country' },
    { label: 'Affiliation', key: 'affiliation' },
    { label: 'Faculty', key: 'faculty' },
    { label: 'Role', key: 'role' }
  ]