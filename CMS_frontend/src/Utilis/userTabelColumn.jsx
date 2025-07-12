export const reviewerColumns = [
  {
    label: 'Photo',
    key: 'photo',
    render: value => (
      <img src={value} alt='Session Chair' className='w-10 h-10 rounded-full' />
    )
  },
  { label: 'Name', key: 'name' },
  { label: 'Title', key: 'title' },
  { label: 'Email', key: 'email' },
  { label: 'Position', key: 'position' },
  { label: 'Country', key: 'country' },
  { label: 'Research Area', key: 'domain' },
  { label: 'Faculty', key: 'faculty' },
  { label: 'Affiliation', key: 'affiliation' },
  { label: 'Contact', key: 'contact' },
  {
    label: 'ORCID ID',
    key: 'orcid',
    render: value => (
      <a
        href={value}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-600 underline'
      >
        ORCID
      </a>
    )
  }
]
export const keynoteSpeakerCol = ({ handleDeleteImage, handleAddImage }) => [
  {
    label: 'Photo',
    key: 'photo',
    render: (value, row) => {
      const inputId = `upload-${row._id}` // unique input ID per row

      return (
        <div className='relative w-14 h-14 group'>
          {value ? (
            <>
              <img
                src={value}
                alt='Session Chair'
                className='w-full h-full object-cover rounded-full border'
              />
              <button
                onClick={() => handleDeleteImage(row)}
                className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor={inputId}
                className='w-full h-full flex items-center justify-center border rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4v16m8-8H4'
                  />
                </svg>
              </label>
              <input
                id={inputId}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleAddImage(file, row) // send file and row
                    e.target.value = '' // reset input for same file re-upload
                  }
                }}
              />
            </>
          )}
        </div>
      )
    }
  },
  { label: 'Name', key: 'name' },
  { label: 'Title', key: 'title' },
  { label: 'Email', key: 'email' },
  { label: 'Position', key: 'position' },
  { label: 'Country', key: 'country' },
  { label: 'Research Area', key: 'domain' },
  { label: 'Faculty', key: 'faculty' },
  { label: 'Affiliation', key: 'affiliation' },
  { label: 'Contact', key: 'contact' },
  {
    label: 'Talk Title',
    key: 'talk_title'
  },
  {
    label: 'Talk Abstract',
    key: 'talk_abstract',
    render: value => (
      <span title={value} className='block max-w-[200px] truncate cursor-help'>
        {value}
      </span>
    )
  },
  {
    label: 'Speaker Biography',
    key: 'speaker_bio',
    render: value => (
      <span title={value} className='block max-w-[200px] truncate cursor-help'>
        {value}
      </span>
    )
  },
  {
    label: 'ORCID ID',
    key: 'orcid',
    render: value => (
      <a
        href={value}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-600 underline'
      >
        ORCID
      </a>
    )
  }
]

export const moderatorCol = ({ handleDeleteImage, handleAddImage }) => [
  {
    label: 'Photo',
    key: 'photo',
    render: (value, row) => {
      const inputId = `upload-${row._id}` // unique input ID per row

      return (
        <div className='relative w-14 h-14 group'>
          {value ? (
            <>
              <img
                src={value}
                alt='Session Chair'
                className='w-full h-full object-cover rounded-full border'
              />
              <button
                onClick={() => handleDeleteImage(row)}
                className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor={inputId}
                className='w-full h-full flex items-center justify-center border rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4v16m8-8H4'
                  />
                </svg>
              </label>
              <input
                id={inputId}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleAddImage(file, row) // send file and row
                    e.target.value = '' // reset input for same file re-upload
                  }
                }}
              />
            </>
          )}
        </div>
      )
    }
  },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Position', key: 'position' },
  { label: 'Country', key: 'country' },
  { label: 'Faculty', key: 'faculty' },
  { label: 'Affiliation', key: 'affiliation' },
  { label: 'Contact', key: 'contact' },
  {
    label: 'Social Media Link',
    key: 'orcid',
    render: value => (
      <a
        href={value}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-600 underline'
      >
        Link
      </a>
    )
  }
]

export const committeeScientificColumns = ({
  handleDeleteImage,
  handleAddImage,
  role
}) => [
  {
    label: 'Photo',
    key: 'photo',
    render: (value, row) => {
      const inputId = `upload-${row._id}` // unique input ID per row

      return (
        <div className='relative w-14 h-14 group'>
          {value ? (
            <>
              <img
                src={value}
                alt='Session Chair'
                className='w-full h-full object-cover rounded-full border'
              />
              <button
                onClick={() => handleDeleteImage(row)}
                className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor={inputId}
                className='w-full h-full flex items-center justify-center border rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4v16m8-8H4'
                  />
                </svg>
              </label>
              <input
                id={inputId}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleAddImage(file, row) // send file and row
                    e.target.value = '' // reset input for same file re-upload
                  }
                }}
              />
            </>
          )}
        </div>
      )
    }
  },
  { label: 'Title', key: 'title' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Position', key: 'position' },
  { label: 'Affiliation/University', key: 'affiliation' },
  { label: 'Faculty', key: 'faculty' },
  ...[
    role === 'scientific_committee' && {
      label: 'Research Domain',
      key: 'domain'
    }
  ].filter(Boolean),
  { label: 'Country', key: 'country' },
  { label: 'Contact', key: 'contact' },
  ...[
    role !== 'registration_committee' && {
      label: role === 'scientific_committee' ? 'Biography' : 'Unit',
      key: role === 'scientific_committee' ? 'bio' : 'committeeName',
      render: value =>
        role === 'scientific_committee' ? (
          <span
            title={value}
            className='block max-w-[200px] truncate cursor-help'
          >
            {value}
          </span>
        ) : (
          <span>{value} Team</span>
        )
    }
  ].filter(Boolean),

  ...[
    role !== 'registration_committee' && {
      label: 'ORCID ID',
      key: 'orcid',
      render: value => (
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline'
        >
          ORCID
        </a>
      )
    }
  ].filter(Boolean)
]

export const authorColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Address' },
  { key: 'country', label: 'Country' },
  { key: 'affiliation', label: 'Affiliation' },
  { key: 'faculty', label: 'Faculty' },
  {
    key: 'submission',
    label: 'Submission Status',
    render: value => (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          value === 'Abstract Submitted'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {value}
      </span>
    )
  },
  {
    key: 'payment',
    label: 'Payment Status',
    render: value => (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          value.toLowerCase() === 'paid'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {value}
      </span>
    )
  },
  {
    key: 'payment_decision',
    label: 'Payment Decision',
    render: (value, row) => (
      <select
        value={value.toLowerCase()}
        onChange={e => row.onPaymentDecisionChange(e.target.value, row)}
        className='bg-white border rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <option value='paid'>Paid</option>
        <option value='unpaid'>UnPaid</option>
      </select>
    )
  },
  {
    key: 'payment_proof',
    label: 'Payment Proof',
    render: value =>
      value ? (
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline hover:text-blue-800 text-sm'
        >
          View Proof
        </a>
      ) : (
        <span className='text-gray-400 text-sm'>—</span>
      )
  }
]
