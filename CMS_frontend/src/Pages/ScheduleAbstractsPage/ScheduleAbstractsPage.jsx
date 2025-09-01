import { useEffect, useState } from 'react'
import { Calendar, Clock, MapPin, Video, FileText, Users } from 'lucide-react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getScheduleById } from '../../Redux/Slice/ScheduleSlice'
import Loading from '../../Component/Loading/Loading'
import PaperModal from '../../Component/PaperModal/PaperModal'
import { IoMdEye } from 'react-icons/io'
import EvaluationFormModal from '../../Component/EvaluationForm/EvaluationForm'

const ScheduleAbstractsPage = () => {
  const { schedule, getSingleScheduleLoading } = useSelector(
    state => state.schedule
  )
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [evaluateModal, setEvaluateModal] = useState(false)

  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getScheduleById(id))
  }, [dispatch, id])

  const handleEvaluate = (abstractId, title) => {
    setEvaluateModal(true)
    console.log('Evaluate abstract:', abstractId)
  }

  // Modal handlers
  const handleOpenModal = paper => {
    setSelectedPaper(paper)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setSelectedPaper(null)
    setIsModalOpen(false)
  }

  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getMarksDisplay = (marks, isEvaluated) => {
    if (!isEvaluated || !marks) {
      return <span className='badge badge-warning badge-sm'>N/A</span>
    }

    const color =
      marks.totalMark >= 40
        ? 'text-green-600 bg-green-50'
        : marks >= 30
        ? 'text-yellow-600 bg-yellow-50'
        : 'text-red-600 bg-red-50'

    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${color}`}
      >
        {marks.totalMark}/50
      </div>
    )
  }

  if (getSingleScheduleLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='p-3 bg-gray-50 '>
      {/* Schedule Information Card */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
          {/* Left Side - Schedule Details */}
          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              {schedule?.session} - {schedule?.day}
            </h1>
            <p className='text-lg text-gray-600 mb-4'>
              {schedule?.conference.name}
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Date & Time */}
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Calendar className='text-blue-600' size={20} />
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>Date</p>
                  <p className='text-gray-600'>{formatDate(schedule?.date)}</p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                  <Clock className='text-green-600' size={20} />
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>Time</p>
                  <p className='text-gray-600'>
                    {schedule?.startTime} - {schedule?.endTime}
                  </p>
                </div>
              </div>

              {/* Location or Meeting Link */}
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                  {schedule?.abstractType.includes('Online') ? (
                    <Video className='text-purple-600' size={20} />
                  ) : (
                    <MapPin className='text-purple-600' size={20} />
                  )}
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>
                    {schedule?.abstractType.includes('Online')
                      ? 'Meeting Link'
                      : 'Venue'}
                  </p>
                  {schedule?.abstractType.includes('Online') ? (
                    <a
                      href={schedule?.meetingLink}
                      className='text-blue-600 hover:text-blue-800 underline'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Join Meeting
                    </a>
                  ) : (
                    <p className='text-gray-600'>
                      {schedule?.venue?.building} - {schedule?.venue?.hall},{' '}
                      {schedule?.venue?.room}
                    </p>
                  )}
                </div>
              </div>

              {/* Session Chair & Moderator */}
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
                  <Users className='text-orange-600' size={20} />
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>Session Team</p>
                  <p className='text-gray-600 text-sm'>
                    Chair: {schedule?.sessionChair?.name}
                    <br />
                    Moderator: {schedule?.moderator?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Session Type Badge */}
          <div className='flex flex-col items-end gap-2'>
            <div className='flex flex-col gap-2'>
              <span
                className={`badge ${
                  schedule?.abstractType.includes('Online')
                    ? 'badge-info'
                    : 'badge-success'
                }`}
              >
                {schedule?.abstractType.includes('Online')
                  ? 'Online Session'
                  : 'Physical Session'}
              </span>
              <span
                className={`badge ${
                  schedule?.abstractType.includes('Paper')
                    ? 'badge-primary'
                    : 'badge-secondary'
                }`}
              >
                {schedule?.abstractType.includes('Paper')
                  ? 'Paper Presentation'
                  : 'Poster Presentation'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Abstracts Table */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold text-gray-800 flex items-center gap-2'>
            <FileText size={20} />
            Session Abstracts
          </h2>
        </div>

        <div className='overflow-x-auto p-2'>
          <table className='table w-full'>
            <thead className='bg-slate-600 rounded-lg'>
              <tr>
                <th className='text-white font-bold'>Abstract ID</th>
                <th className='text-white font-bold'>Title</th>
                <th className='text-white font-bold'>Author</th>
                <th className='text-white font-bold'>View</th>
                <th className='text-white font-bold'>Marks</th>
                <th className='text-white font-bold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedule?.abstracts.length === 0 ? (
                <tr>
                  <td colSpan='5' className='text-center py-8 text-gray-500'>
                    <div className='flex flex-col items-center gap-2'>
                      <FileText className='text-4xl text-gray-300' size={48} />
                      <p>No abstracts found for this session</p>
                    </div>
                  </td>
                </tr>
              ) : (
                schedule?.abstracts.map(abstract => (
                  <tr key={abstract._id} className='hover:bg-gray-50'>
                    {/* Abstract ID */}
                    <td className='font-mono text-sm font-semibold text-gray-800'>
                      {abstract._id}
                    </td>

                    {/* Title */}
                    <td className='max-w-md'>
                      <div className='font-medium text-gray-800 leading-tight'>
                        {abstract.paper_title}
                      </div>
                    </td>

                    {/* Author */}
                    <td className='text-gray-700'>
                      {abstract.authors[0].name}
                    </td>

                    {/* Abstract */}
                    <td>
                      <button
                        onClick={() => handleOpenModal(abstract)}
                        className='cursor-pointer hover:text-blue-500 transition-colors duration-200 p-1 rounded-full hover:bg-blue-50'
                        title='View Abstract'
                      >
                        <IoMdEye className='text-xl' />
                      </button>
                    </td>
                    {/* Marks */}
                    <td>
                      {getMarksDisplay(abstract.marks, abstract.isEvaluated)}
                    </td>

                    {/* Actions */}
                    <td>
                      <button
                        onClick={() =>
                          handleEvaluate(abstract._id, abstract.paper_title)
                        }
                        className={`btn btn-sm gap-2 ${
                          abstract.isEvaluated
                            ? 'btn-outline btn-primary'
                            : 'btn-primary'
                        }`}
                      >
                        Evaluate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <EvaluationFormModal
        isOpen={evaluateModal}
        onClose={() => setEvaluateModal(false)}
      />
      <PaperModal
        abstract={selectedPaper}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default ScheduleAbstractsPage
