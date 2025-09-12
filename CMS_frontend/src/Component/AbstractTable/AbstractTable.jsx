import { format } from 'date-fns';
import React from 'react';
import { getStatusColor } from '../../Utilis/getStatusColor';
import { FaDownload } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';

const AbstractTable = ({data,handleOpenModal}) => {
    return (
        <div className='overflow-x-auto h-[620px] overflow-y-auto'>
                      <table className='min-w-full divide-y divide-gray-200 table-zebra'>
                        <thead className='bg-slate-500'>
                          <tr>
                            <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                              Abstract ID
                            </th>
                            <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                              Title
                            </th>
                            <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                              Author
                            </th>
                            <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                              Theme
                            </th>
                            <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                              Submission Date
                            </th>
                            <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                              Deadline
                            </th>
                            <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                              Status
                            </th>
                            <th className='px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider'>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          {data.map(abstract => (
                            <tr
                              key={abstract._id}
                              className='hover:bg-gray-50 transition-colors duration-200'
                            >
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {abstract.abstract_id || abstract._id}
                                </div>
                              </td>
                              <td className='px-6 py-4'>
                                <div
                                  title={abstract.paper_title}
                                  className='text-sm text-gray-900 line-clamp-2'
                                >
                                  {abstract.paper_title}
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>
                                  {abstract.authors[0].name}
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>
                                  {abstract.theme}
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>
                                  {format(abstract.createdAt, 'MMM d, yyyy')}
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>
                                  {abstract?.paper_deadline
                                    ? format(abstract.paper_deadline, 'MMM d, yyyy')
                                    : 'N/A'}
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                    abstract.status
                                  )}`}
                                >
                                  {abstract.status}
                                </span>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                <div className='flex space-x-3'>
                                  <button
                                    onClick={() => handleOpenModal(abstract)}
                                    className='cursor-pointer hover:text-blue-500 transition-colors duration-200 p-1 rounded-full hover:bg-blue-50'
                                    title='View Abstract'
                                  >
                                    <IoMdEye className='text-xl' />
                                  </button>
        
                                  {/* Upload Paper Button - Show for specific statuses */}
                                  {/* {(abstract.status === 'Abstract Submitted' ||
                                    abstract.status === 'Accepted' ||
                                    abstract.status === 'Minor Revision' ||
                                    abstract.status === 'Major Revision') && (
                                    <button
                                      onClick={() => handleOpenUploadModal(abstract)}
                                      className='cursor-pointer hover:text-green-500 transition-colors duration-200 p-1 rounded-full hover:bg-green-50'
                                      title='Upload Paper'
                                    >
                                      <FaUpload className='text-lg' />
                                    </button>
                                  )} */}
        
                                  {/* Download Paper - Show when paper is available */}
                                  {abstract.paperUrl && (
                                    <a
                                      href={abstract.paperUrl}
                                      className='cursor-pointer hover:text-purple-500 transition-colors duration-200 p-1 rounded-full hover:bg-purple-50'
                                      download
                                      title='Download Paper'
                                    >
                                      <FaDownload className='text-lg' />
                                    </a>
                                  )}
        
                                  {/* Receipt - Show for accepted papers */}
                                  {abstract.status === 'Accepted' &&
                                    abstract.receiptUrl && (
                                      <a
                                        href={abstract.receiptUrl}
                                        className='cursor-pointer hover:text-blue-500 transition-colors duration-200'
                                        download
                                        title='View Fee Receipt'
                                      >
                                        <span className='text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded'>
                                          Receipt
                                        </span>
                                      </a>
                                    )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
    );
};

export default AbstractTable;