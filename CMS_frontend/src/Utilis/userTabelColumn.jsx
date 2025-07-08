export const reviewerColumns = [
  {
    label: 'Photo',
    key: 'photo',
    render: value => (
      <img src={value} alt='Session Chair' className='w-10 h-10 rounded-full' />
    )
  },
  { label: 'Name', key: 'name' },
  {label:'Title',key:'title'},
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
  },
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
