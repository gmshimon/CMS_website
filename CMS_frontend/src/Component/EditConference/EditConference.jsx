import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { countries } from '../../Utilis/countryList'
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaPlus,
  FaTags,
  FaTrash,
  FaUsers
} from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router'
import { IoCreateOutline } from 'react-icons/io5'
import {
  editConference,
  getSingleConference,
  reset
} from '../../Redux/Slice/conferenceSlice'
import { showErrorToast } from '../../Utilis/toastUtils'
const EditConference = () => {
  const {
    editConferenceLoading,
    singleConference,
    editConferenceSuccess,
    editConferenceError
  } = useSelector(state => state.conference)
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    category: [],
    theme: [],
    price: 0,
    presentation_method: [],
    publication_option: [],
    year: new Date().getFullYear(),
    country: '',
    city: '',
    venue: '',
    startingDate: '',
    closingDate: '',
    mode: 'hybrid',
    status: '',
    submissionOptions: [] // ✅ added
  })
  const [workshopOptions, setWorkshopOptions] = useState([
    { title: '', price: 0 }
  ])

  const [currentCategory, setCurrentCategory] = useState('')
  const [currentTheme, setCurrentTheme] = useState('')
  const [currentPresentationMethod, setCurrentPresentationMethod] = useState('')
  const [currentPublicationOption, setCurrentPublicationOption] = useState('')
  // ✅ extra states
  const [tracks, setTracks] = useState([{ title: '', subTracks: [] }])
  const [currentSubTrack, setCurrentSubTrack] = useState('')
  const [importantDates, setImportantDates] = useState([
    { title: '', description: '', date: '' }
  ])
  const [submissionOptions, setSubmissionOptions] = useState([
    {
      submissionType: 'Paper Presentation Online',
      earlyBird: 0,
      normal: 0,
      currency: 'USD'
    },
    {
      submissionType: 'Paper Presentation Physical',
      earlyBird: 0,
      normal: 0,
      currency: 'USD'
    },
    {
      submissionType: 'Poster Presentation Online',
      earlyBird: 0,
      normal: 0,
      currency: 'USD'
    },
    {
      submissionType: 'Poster Presentation Physical',
      earlyBird: 0,
      normal: 0,
      currency: 'USD'
    }
  ])

  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getSingleConference(id))
  }, [dispatch, id])

  useEffect(() => {
    if (singleConference) {
      setFormData({
        name: singleConference.name || '',
        shortName: singleConference.shortName || '',
        category: singleConference.category || [],
        theme: singleConference.theme || [],
        price: singleConference.price || 0,
        presentation_method: singleConference.presentation_method || [],
        publication_option: singleConference.publication_option || [],
        year: singleConference.year || new Date().getFullYear(),
        country: singleConference.country || '',
        city: singleConference.city || '',
        venue: singleConference.venue || '',
        startingDate: singleConference.startingDate?.substring(0, 10) || '',
        closingDate: singleConference.closingDate?.substring(0, 10) || '',
        mode: singleConference.mode || 'hybrid',
        status: singleConference?.status || 'Active',
        submissionOptions: singleConference.submissionOptions || []
      })

      if (
        singleConference.workshopOptions &&
        singleConference.workshopOptions.length > 0
      ) {
        setWorkshopOptions(singleConference.workshopOptions)
      }

      // preload importantDates + tracks if backend later supports
      if (singleConference.importantDates) {
        setImportantDates(
          singleConference.importantDates.map(d => ({
            ...d,
            date: d.date ? d.date.substring(0, 10) : ''
          }))
        )
      }
      if (singleConference.tracks) {
        setTracks(singleConference.tracks)
      }
    }
  }, [singleConference])

  useEffect(() => {
    if (editConferenceSuccess) {
      navigate('/admin/conference')
    }
    if (editConferenceError) {
      showErrorToast('Something went wrong')
      dispatch(reset)
    }
  }, [editConferenceSuccess, dispatch, editConferenceError, navigate])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addArrayItem = (field, value, setter) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }))
      setter('')
    }
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const addWorkshopOption = () => {
    setWorkshopOptions(prev => [...prev, { title: '', price: 0 }])
  }

  const removeWorkshopOption = index => {
    if (workshopOptions.length > 1) {
      setWorkshopOptions(prev => prev.filter((_, i) => i !== index))
    }
  }

  const updateWorkshopOption = (index, field, value) => {
    setWorkshopOptions(prev =>
      prev.map((option, i) =>
        i === index ? { ...option, [field]: value } : option
      )
    )
  }

  // --- Tracks functions ---
  const addTrack = () =>
    setTracks(prev => [...prev, { title: '', subTracks: [] }])

  const removeTrack = index =>
    setTracks(prev => prev.filter((_, i) => i !== index))

  const updateTrack = (index, field, value) => {
    setTracks(prev =>
      prev.map((track, i) =>
        i === index ? { ...track, [field]: value } : track
      )
    )
  }
  const addSubTrack = (trackIndex, value) => {
    if (!value.trim()) return
    setTracks(prev =>
      prev.map((track, i) =>
        i === trackIndex
          ? { ...track, subTracks: [...track.subTracks, value.trim()] }
          : track
      )
    )
    setCurrentSubTrack('')
  }

  const removeSubTrack = (trackIndex, subTrackIndex) => {
    setTracks(prev =>
      prev.map((track, i) =>
        i === trackIndex
          ? {
              ...track,
              subTracks: track.subTracks.filter((_, j) => j !== subTrackIndex)
            }
          : track
      )
    )
  }

  // --- Important Dates functions ---
  const addImportantDate = () =>
    setImportantDates(prev => [
      ...prev,
      { title: '', description: '', date: '' }
    ])

  const updateImportantDate = (index, field, value) => {
    setImportantDates(prev =>
      prev.map((date, i) => (i === index ? { ...date, [field]: value } : date))
    )
  }

  const removeImportantDate = index => {
    if (importantDates.length > 1) {
      setImportantDates(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(editConference({ id, data: formData }))
  }
  return (
    <div className=' min-h-screen'>
      <ToastContainer />
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className=' p-4  '
        >
          <div className='flex items-center gap-4 mb-2'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>
                Edit Conference
              </h1>
              <p className='text-gray-600 mt-1'>
                Set up and configure a new conference event
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-2'>
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className='bg-gray-50 p-4 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <FaUsers className='text-blue-600' />
                Basic Information
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='md:col-span-3'>
                  <label
                    htmlFor='name'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Conference Name *
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    placeholder='Enter conference name'
                    required
                  />
                </div>

                <div>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Short Name *
                  </label>
                  <input
                    type='text'
                    name='shortName'
                    value={formData.shortName}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    placeholder='e.g. ICML2024'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='year'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Status *
                  </label>
                  <select
                    id='mode'
                    name='status'
                    value={formData.status}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    required
                  >
                    <option value='Active'>Active</option>
                    <option value='Disable'>Disable</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='year'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Registration Price *
                  </label>
                  <input
                    type='number'
                    id='price'
                    name='price'
                    value={formData.price}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='year'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Year *
                  </label>
                  <input
                    type='number'
                    id='year'
                    name='year'
                    value={formData.year}
                    onChange={handleInputChange}
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 10}
                    className='border border-black rounded-md p-2 w-full text-black'
                    required
                  />
                </div>
                <div>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Conference Mode *
                  </label>
                  <select
                    name='mode'
                    value={formData.mode}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    required
                  >
                    <option value='Hybrid'>Hybrid</option>
                    <option value='Online'>Online</option>
                    <option value='Physical'>Physical</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Submission Types & Prices */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className='bg-gray-50 p-4 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <FaDollarSign className='text-indigo-600' />
                Submission Types & Prices
              </h2>

              <div className='space-y-4'>
                {formData?.submissionOptions?.map((option, index) => (
                  <div key={index} className='p-4 bg-white border rounded-lg'>
                    <h3 className='font-medium text-gray-700 mb-3'>
                      {option.submissionType}
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                      <div>
                        <label className='text-sm text-gray-600'>
                          Early Bird Price
                        </label>
                        <input
                          type='number'
                          value={option.earlyBird}
                          onChange={e => {
                            const value = parseFloat(e.target.value) || 0
                            const newOptions = [...formData.submissionOptions]
                            // clone the object before updating
                            newOptions[index] = {
                              ...newOptions[index],
                              earlyBird: value
                            }
                            setFormData(prev => ({
                              ...prev,
                              submissionOptions: newOptions
                            }))
                          }}
                          className='border border-black rounded-md p-2 w-full text-black'
                          placeholder='0'
                          min='0'
                        />
                      </div>
                      <div>
                        <label className='text-sm text-gray-600'>
                          Normal Price
                        </label>
                        <input
                          type='number'
                          value={option.normal}
                          onChange={e => {
                            const newOptions = [...formData.submissionOptions]
                            newOptions[index].normal =
                              parseFloat(e.target.value) || 0
                            setFormData(prev => ({
                              ...prev,
                              submissionOptions: newOptions
                            }))
                          }}
                          className='border border-black rounded-md p-2 w-full text-black'
                          placeholder='0'
                          min='0'
                        />
                      </div>
                      {/* <div>
                        <label className='text-sm text-gray-600'>
                          Attendee Price
                        </label>
                        <input
                          type='number'
                          value={option.attendee}
                          onChange={e => {
                            const newOptions = [...submissionOptions]
                            newOptions[index].attendee =
                              parseFloat(e.target.value) || 0
                            setSubmissionOptions(newOptions)
                          }}
                          className='border border-black rounded-md p-2 w-full text-black'
                          placeholder='0'
                          min='0'
                        />
                      </div> */}
                      <div>
                        <label className='text-sm text-gray-600'>
                          Currency
                        </label>
                        <select
                          value={option.currency}
                          onChange={e => {
                            const newOptions = [...submissionOptions]
                            newOptions[index].currency = e.target.value
                            setSubmissionOptions(newOptions)
                          }}
                          className='border border-black rounded-md p-2 w-full text-black'
                        >
                          <option value='USD'>USD</option>
                          <option value='EUR'>EUR</option>
                          <option value='GBP'>GBP</option>
                          <option value='INR'>INR</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tracks Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='bg-gray-50 p-4 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <FaTags className='text-teal-600' />
                Conference Tracks
              </h2>

              {tracks.map((track, trackIndex) => (
                <div
                  key={trackIndex}
                  className='mb-4 p-4 bg-white rounded-lg border'
                >
                  <div className='flex gap-2 mb-3'>
                    <input
                      type='text'
                      value={track.title}
                      onChange={e =>
                        updateTrack(trackIndex, 'title', e.target.value)
                      }
                      className='border border-black rounded-md p-2 w-full text-black'
                      placeholder='Track title'
                    />
                    {tracks.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeTrack(trackIndex)}
                        className='px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>

                  <div className='ml-4'>
                    <div className='flex gap-2 mb-2'>
                      <input
                        type='text'
                        value={currentSubTrack}
                        onChange={e => setCurrentSubTrack(e.target.value)}
                        className='border border-black rounded-md p-2 w-full text-black'
                        placeholder='Add sub-track'
                        onKeyPress={e =>
                          e.key === 'Enter' &&
                          (e.preventDefault(),
                          addSubTrack(trackIndex, currentSubTrack))
                        }
                      />
                      <button
                        type='button'
                        onClick={() => addSubTrack(trackIndex, currentSubTrack)}
                        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      {track.subTracks.map((subTrack, subTrackIndex) => (
                        <span
                          key={subTrackIndex}
                          className='bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center gap-2'
                        >
                          {subTrack}
                          <button
                            type='button'
                            onClick={() =>
                              removeSubTrack(trackIndex, subTrackIndex)
                            }
                            className='text-teal-600 hover:text-teal-800'
                          >
                            <FaTrash className='text-xs' />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type='button'
                onClick={addTrack}
                className='px-3 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
              >
                <FaPlus className='inline mr-2' /> Add Track
              </button>
            </motion.div>

            {/* Important Dates */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className='bg-gray-50 p-4 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <FaClock className='text-orange-600' />
                Important Dates
              </h2>

              {importantDates.map((dateItem, index) => (
                <div
                  key={index}
                  className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-white rounded-lg border'
                >
                  <div>
                    <label className='block text-sm text-gray-600 mb-1'>
                      Title *
                    </label>
                    <input
                      type='text'
                      value={dateItem.title}
                      onChange={e =>
                        updateImportantDate(index, 'title', e.target.value)
                      }
                      className='border border-black rounded-md p-2 w-full text-black'
                      placeholder='e.g. Abstract Submission'
                    />
                  </div>
                  <div>
                    <label className='block text-sm text-gray-600 mb-1'>
                      Description
                    </label>
                    <input
                      type='text'
                      value={dateItem.description}
                      onChange={e =>
                        updateImportantDate(
                          index,
                          'description',
                          e.target.value
                        )
                      }
                      className='border border-black rounded-md p-2 w-full text-black'
                      placeholder='Optional description'
                    />
                  </div>
                  <div>
                    <label className='block text-sm text-gray-600 mb-1'>
                      Date *
                    </label>
                    <input
                      type='date'
                      value={dateItem.date}
                      onChange={e =>
                        updateImportantDate(index, 'date', e.target.value)
                      }
                      className='border border-black rounded-md p-2 w-full text-black'
                    />
                  </div>
                  <div className='flex items-end'>
                    {importantDates.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeImportantDate(index)}
                        className='px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type='button'
                onClick={addImportantDate}
                className='px-3 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
              >
                <FaPlus className='inline mr-2' /> Add Important Date
              </button>
            </motion.div>

            {/* Location Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='bg-gray-50 p-4 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <FaMapMarkerAlt className='text-green-600' />
                Location Details
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='country'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Country *
                  </label>
                  <select
                    id='country'
                    name='country'
                    value={formData.country}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    required
                  >
                    <option value=''>Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='city'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    City *
                  </label>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    value={formData.city}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    placeholder='Enter city name'
                    required
                  />
                </div>

                <div className='md:col-span-2'>
                  <label
                    htmlFor='venue'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Venue *
                  </label>
                  <input
                    type='text'
                    id='venue'
                    name='venue'
                    value={formData.venue}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    placeholder='Enter venue details'
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Date Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className='bg-gray-50 px-4 py-1 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <FaCalendarAlt className='text-purple-600' />
                Conference Dates
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='startingDate'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Starting Date *
                  </label>
                  <input
                    type='date'
                    id='startingDate'
                    name='startingDate'
                    value={formData.startingDate}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='closingDate'
                    className='block text-gray-700 text-sm font-bold mb-2'
                  >
                    Closing Date *
                  </label>
                  <input
                    type='date'
                    id='closingDate'
                    name='closingDate'
                    value={formData.closingDate}
                    onChange={handleInputChange}
                    className='border border-black rounded-md p-2 w-full text-black'
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className='bg-gray-50 px-4 py-1 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Categories
              </h2>

              <div className='flex gap-2 mb-4'>
                <input
                  type='text'
                  value={currentCategory}
                  onChange={e => setCurrentCategory(e.target.value)}
                  className='border border-black rounded-md p-2 w-full text-black'
                  placeholder='Add category'
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    addArrayItem(
                      'category',
                      currentCategory,
                      setCurrentCategory
                    ))
                  }
                />
                <button
                  type='button'
                  onClick={() =>
                    addArrayItem(
                      'category',
                      currentCategory,
                      setCurrentCategory
                    )
                  }
                  className='px-3 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
                >
                  <FaPlus /> Add
                </button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {formData.category.map((cat, index) => (
                  <span
                    key={index}
                    className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2'
                  >
                    {cat}
                    <button
                      type='button'
                      onClick={() => removeArrayItem('category', index)}
                      className='text-blue-600 hover:text-blue-800'
                    >
                      <FaTrash className='text-xs' />
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Themes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className='bg-gray-50 px-4 py-1 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Themes
              </h2>

              <div className='flex gap-2 mb-4'>
                <input
                  type='text'
                  value={currentTheme}
                  onChange={e => setCurrentTheme(e.target.value)}
                  className='border border-black rounded-md p-2 w-full text-black'
                  placeholder='Add theme'
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    addArrayItem('theme', currentTheme, setCurrentTheme))
                  }
                />
                <button
                  type='button'
                  onClick={() =>
                    addArrayItem('theme', currentTheme, setCurrentTheme)
                  }
                  className='px-3 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
                >
                  <FaPlus /> Add
                </button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {formData.theme.map((theme, index) => (
                  <span
                    key={index}
                    className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2'
                  >
                    {theme}
                    <button
                      type='button'
                      onClick={() => removeArrayItem('theme', index)}
                      className='text-green-600 hover:text-green-800'
                    >
                      <FaTrash className='text-xs' />
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Presentation Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className='bg-gray-50 px-4 py-1 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Presentation Methods
              </h2>

              <div className='flex gap-2 mb-4'>
                <input
                  type='text'
                  value={currentPresentationMethod}
                  onChange={e => setCurrentPresentationMethod(e.target.value)}
                  className='border border-black rounded-md p-2 w-full text-black'
                  placeholder='Add presentation method'
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    addArrayItem(
                      'presentation_method',
                      currentPresentationMethod,
                      setCurrentPresentationMethod
                    ))
                  }
                />
                <button
                  type='button'
                  onClick={() =>
                    addArrayItem(
                      'presentation_method',
                      currentPresentationMethod,
                      setCurrentPresentationMethod
                    )
                  }
                  className='px-3 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
                >
                  <FaPlus /> Add
                </button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {formData.presentation_method.map((method, index) => (
                  <span
                    key={index}
                    className='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2'
                  >
                    {method}
                    <button
                      type='button'
                      onClick={() =>
                        removeArrayItem('presentation_method', index)
                      }
                      className='text-purple-600 hover:text-purple-800'
                    >
                      <FaTrash className='text-xs' />
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Publication Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className='bg-gray-50 px-4 py-1 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                Publication Options
              </h2>

              <div className='flex gap-2 mb-4'>
                <input
                  type='text'
                  value={currentPublicationOption}
                  onChange={e => setCurrentPublicationOption(e.target.value)}
                  className='border border-black rounded-md p-2 w-full text-black'
                  placeholder='Add publication option'
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    addArrayItem(
                      'publication_option',
                      currentPublicationOption,
                      setCurrentPublicationOption
                    ))
                  }
                />
                <button
                  type='button'
                  onClick={() =>
                    addArrayItem(
                      'publication_option',
                      currentPublicationOption,
                      setCurrentPublicationOption
                    )
                  }
                  className='px-3 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
                >
                  <FaPlus /> Add
                </button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {formData.publication_option.map((option, index) => (
                  <span
                    key={index}
                    className='bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2'
                  >
                    {option}
                    <button
                      type='button'
                      onClick={() =>
                        removeArrayItem('publication_option', index)
                      }
                      className='text-orange-600 hover:text-orange-800'
                    >
                      <FaTrash className='text-xs' />
                    </button>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Workshop Options */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className='bg-gray-50 px-4 py-1 rounded-xl'
            >
              <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <FaDollarSign className='text-indigo-600' />
                Workshop Options
              </h2>

              {workshopOptions.map((workshop, index) => (
                <div
                  key={index}
                  className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-white rounded-lg border border-gray-200'
                >
                  <div className='md:col-span-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>
                      Workshop Title
                    </label>
                    <input
                      type='text'
                      value={workshop.title}
                      onChange={e =>
                        updateWorkshopOption(index, 'title', e.target.value)
                      }
                      className='border border-black rounded-md p-2 w-full text-black'
                      placeholder='Enter workshop title'
                    />
                  </div>

                  <div className='flex gap-2'>
                    <div className='flex-1'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>
                        Price ($)
                      </label>
                      <input
                        type='number'
                        value={workshop.price}
                        onChange={e =>
                          updateWorkshopOption(
                            index,
                            'price',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className='border border-black rounded-md p-2 w-full text-black'
                        placeholder='0.00'
                        min='0'
                        step='0.01'
                      />
                    </div>

                    {workshopOptions.length > 1 && (
                      <div className='flex items-end'>
                        <button
                          type='button'
                          onClick={() => removeWorkshopOption(index)}
                          className='px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300'
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                type='button'
                onClick={addWorkshopOption}
                className='px-3 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
              >
                <FaPlus /> Add Workshop Option
              </button>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className='flex justify-end gap-4 pt-6 border-t border-gray-200'
            >
              <button
                type='submit'
                disabled={editConferenceLoading}
                className='px-3 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
              >
                {editConferenceLoading ? (
                  <>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <IoCreateOutline />
                    Update Conference
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default EditConference
