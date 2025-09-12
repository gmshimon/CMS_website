import { formatDate } from 'date-fns'
import { MapPin } from 'lucide-react'
import { FaTimesCircle } from 'react-icons/fa'
import { IoMdEye } from 'react-icons/io'
import { Link } from 'react-router'

const ConferenceListTable = ({
  data,
  abstract_title = false,
  admin = false,
  handleOpenPaymentDecision
}) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='overflow-x-auto h-[620px] overflow-y-auto'>
        <table className='min-w-full divide-y divide-gray-200 table-zebra'>
          <thead className='bg-slate-500'>
            <tr>
              <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                Abstract ID
              </th>
              {abstract_title && (
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Abstract Title
                </th>
              )}
              <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                Date
              </th>
              <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                Location
              </th>

              <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                Presenter
              </th>

              <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                Payment Proof
              </th>

              {admin && (
                <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                  Payment Decision
                </th>
              )}
              <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data?.map((conference, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                    {conference?.registration_id}
                  </div>
                </td>
                {abstract_title && (
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                      {conference?.abstract?.paper_title || 'Only Attendee'}
                    </div>
                  </td>
                )}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                    {conference?.conference?.startingDate
                      ? formatDate(
                          new Date(conference?.conference?.startingDate),
                          'PPP'
                        )
                      : 'N/A'}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                    <div className='flex items-center gap-2'>
                      <MapPin className='text-green-500' size={16} />
                      <div className='text-sm'>
                        <div className='font-medium'>
                          {conference?.conference.city},{' '}
                          {conference?.conference.country}
                        </div>
                        <div className='text-gray-600'>
                          {conference?.conference.venue}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                    {conference?.presenterName}
                  </div>
                </td>

                <td className='px-6 py-4 whitespace-nowrap'>
                  {conference.payment_proof ||
                  conference.abstract.payment_proof ? (
                    <a
                      href={
                       admin? conference.payment_proof ||
                        conference.abstract.payment_proof : conference?.invoice
                      }
                      target='_blank'
                      title='View Proof'
                      download
                    >
                      <span className='text-green-500 hover:underline'>
                        View
                      </span>
                    </a>
                  ) : (
                    <span className='text-green-500 mx-auto'>
                      <FaTimesCircle className='text-red-400 text-lg' />
                    </span>
                  )}
                </td>

                {admin && (
                  <td className='px-10  whitespace-nowrap text-sm text-gray-500'>
                    {conference.payment_status === 'Pending' ? (
                      <button
                        onClick={() => handleOpenPaymentDecision(conference)}
                        className='btn btn-sm btn-primary'
                      >
                        Decision
                      </button>
                    ) : (
                      <>
                        {conference?.abstract
                          ? 'Payment done in Submission'
                          : conference?.payment_status}
                        <br />
                        {/* {conference.payment_status === 'Unpaid' &&
                        conference.status === 'Abstract Accepted' && (
                          <button
                            className='mt-1 px-2 w-full py-1 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded'
                            // onClick={() => handlePaymentReminder(item._id)}
                          >
                            Payment_Reminder
                          </button>
                        )} */}
                      </>
                    )}
                  </td>
                )}
                <td className='px-10  whitespace-nowrap text-sm text-gray-500'>
                  <Link to={`/admin/conference/${conference?._id}`}>
                    <button className='cursor-pointer hover:text-blue-500'>
                      <IoMdEye className='text-xl' />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ConferenceListTable
