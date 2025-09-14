/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaPlus,
  FaTrash,
  FaDollarSign
} from 'react-icons/fa'
import { IoCreateOutline } from 'react-icons/io5'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { countries } from '../../../Utilis/countryList'
import { createConference } from '../../../Redux/Slice/conferenceSlice'
import { useNavigate } from 'react-router'

const CreateConference = () => {
  const { createConferenceLoading, createConferenceSuccess } = useSelector(
    state => state.conference
  )
  const [formData, setFormData] = useState({
    name: '',
    category: [],
    theme: [],
    price: 0,
    // presentation_method: [],
    publication_option: [],
    year: new Date().getFullYear(),
    country: '',
    city: '',
    venue: '',
    startingDate: '',
    closingDate: ''
  })

  const [workshopOptions, setWorkshopOptions] = useState([
    { title: '', price: 0 }
  ])

  const [currentCategory, setCurrentCategory] = useState('')
  const [currentTheme, setCurrentTheme] = useState('')
  const [currentPresentationMethod, setCurrentPresentationMethod] = useState('')
  const [currentPublicationOption, setCurrentPublicationOption] = useState('')
  const [submissionOptions, setSubmissionOptions] = useState([
    { submissionType: 'Paper Presentation Online', price: 0 },
    { submissionType: 'Paper Presentation Physical', price: 0 },
    { submissionType: 'Poster Presentation Online', price: 0 },
    { submissionType: 'Poster Presentation Physical', price: 0 }
  ])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (createConferenceSuccess) {
      navigate('/admin/conference')
    }
  }, [dispatch, createConferenceSuccess, navigate])

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

  const resetForm = () => {
    setFormData({
      name: '',
      category: [],
      theme: [],
      price: 0,
      // presentation_method: [],
      publication_option: [],
      year: new Date().getFullYear(),
      country: '',
      city: '',
      venue: '',
      startingDate: '',
      closingDate: ''
    })
    setWorkshopOptions([{ title: '', price: 0 }])
    setSubmissionOptions([
      { submissionType: 'Paper Presentation Online', price: 0 },
      { submissionType: 'Paper Presentation Physical', price: 0 },
      { submissionType: 'Poster Presentation Online', price: 0 },
      { submissionType: 'Poster Presentation Physical', price: 0 }
    ])
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // setIsLoading(true);
    const data = {
      ...formData,
      submissionOptions,
      workshopOptions
    }
    console.log(data)
    dispatch(createConference(data))

    // // Reset form
    resetForm()
  }

  return (
    <div className=' min-h-screen '>
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
                Create New Conference
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

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
                {/* <div>
                  <label
                    htmlFor="mode"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Conference Mode *
                  </label>
                  <select
                    id="mode"
                    name="mode"
                    value={formData.mode}
                    onChange={handleInputChange}
                    className="border border-black rounded-md p-2 w-full text-black"
                    required
                  >
                    <option value="hybrid">Hybrid</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div> */}
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

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {submissionOptions.map((option, index) => (
                  <div
                    key={index}
                    className='flex flex-col p-3 bg-white border rounded-lg'
                  >
                    <label className='text-gray-700 font-medium mb-1'>
                      {option.submissionType}
                    </label>
                    <input
                      type='number'
                      value={option.price}
                      onChange={e => {
                        const newOptions = [...submissionOptions]
                        newOptions[index].price =
                          parseFloat(e.target.value) || 0
                        setSubmissionOptions(newOptions)
                      }}
                      className='border border-black rounded-md p-2 w-full text-black'
                      placeholder='Enter price'
                      min='0'
                    />
                  </div>
                ))}
              </div>
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
                  className='px-6 py-5 text-white font-bold btn btn-sm btn-active btn-primary'
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
                  className='px-6 py-5 text-white font-bold btn btn-sm btn-active btn-primary'
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
            {/* <motion.div
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
                  className='px-6 py-5 text-white font-bold btn btn-sm btn-active btn-primary'
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
            </motion.div> */}

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
                  className='px-6 py-5 text-white font-bold btn btn-sm btn-active btn-primary'
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
                className='px-6 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
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
                type='button'
                className='px-6 py-4 text-white font-bold  btn-sm btn btn-neutral'
                onClick={() => {
                  resetForm()
                }}
              >
                Reset Form
              </button>

              <button
                type='submit'
                disabled={createConferenceLoading}
                className='px-6 py-4 text-white font-bold btn btn-sm btn-active btn-primary'
              >
                {createConferenceLoading ? (
                  <>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <IoCreateOutline />
                    Create Conference
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

export default CreateConference
