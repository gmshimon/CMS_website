import { formatDate } from 'date-fns'
import { MapPin } from 'lucide-react'
import { IoMdEye } from 'react-icons/io'
import { Link } from 'react-router'

const ConferenceListTable = ({ data, abstract_title = false }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='overflow-x-auto h-[400px] overflow-y-auto'>
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data?.map((conference, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                    {conference?.abstract?.abstract_id || conference.registration_id}
                  </div>
                </td>
                {abstract_title&&<td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                    {conference.abstract.paper_title}
                  </div>
                </td>}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200'>
                    {conference?.conference?.startingDate?formatDate(
                      new Date(conference?.conference?.startingDate),
                      'PPP'
                    ):"N/A"}
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
