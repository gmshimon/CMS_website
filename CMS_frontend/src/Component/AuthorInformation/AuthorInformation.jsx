import React, { useEffect, useState } from 'react'
import { FaPlus, FaTimes, FaTrash, FaEdit } from 'react-icons/fa'
import { IoPersonAdd } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setAbstractAuthors } from '../../Redux/Slice/AbstractSlice'
import { countries } from '../../Utilis/countryList'

const AuthorInformation = ({ activeStep, setActiveStep }) => {
  const { user } = useSelector(state => state.user)
  const { authors } = useSelector(state => state.abstract)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState(null)
  const [addAuthors, setAuthors] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    affiliation: '',
    country: '',
    isCorresponding: false
  })

  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const titleOptions = ['Dr.', 'Assoc. Prof.', 'Prof.', 'Mr.', 'Ms.', 'Mrs.']

  useEffect(() => {
    if (authors.length > 1) {
      setAuthors(authors)
    } else if (user?.email) {
      const data = {
        id: 1,
        title: 'Mr',
        name: user?.name,
        email: user?.email,
        affiliation: user?.affiliation,
        country: user?.country,
        isPrimary: true
      }

      setAuthors([data])
    }
  }, [authors, user])

  useEffect(() => {
    dispatch(setAbstractAuthors(addAuthors))
  }, [addAuthors, dispatch])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.name) newErrors.firstName = 'First name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.affiliation)
      newErrors.affiliation = 'Organization is required'
    if (!formData.country) newErrors.country = 'Country is required'

    // Check for duplicate email
    const isDuplicate = addAuthors.some(
      author =>
        author.email === formData.email &&
        (!editingAuthor || author.id !== editingAuthor.id)
    )
    if (isDuplicate) {
      newErrors.email = 'This email is already used by another author'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!validateForm()) return

    if (editingAuthor) {
      // Update existing author
      setAuthors(prev =>
        prev.map(author =>
          author.id === editingAuthor.id ? { ...author, ...formData } : author
        )
      )
    } else {
      // Add new author
      const newAuthor = {
        id: Date.now(),
        isPrimary: false,
        ...formData
      }
      setAuthors(prev => [...prev, newAuthor])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      country: '',
      isCorresponding: false
    })
    setErrors({})
    setIsModalOpen(false)
    setEditingAuthor(null)
  }

  const handleEdit = author => {
    setEditingAuthor(author)
    setFormData({
      title: author.title || '',
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email,
      organization: author.organization,
      country: author.country,
      isCorresponding: author.isCorresponding || false
    })
    setIsModalOpen(true)
  }

  const handleDelete = authorId => {
    if (addAuthors.find(a => a.id === authorId)?.isPrimary) {
      alert('Cannot delete primary contact')
      return
    }
    setAuthors(prev => prev.filter(author => author.id !== authorId))
  }

  return (
    <div className=' min-h-[calc(100vh-64px)]'>
      <div className='mb-6 flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>
            Author Information
          </h2>
          <p className='text-gray-600'>
            Author list cannot be modified except author order.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-2 px-2 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200'
        >
          <FaPlus className='text-sm' />
          Add Author
        </button>
      </div>

      {/* Authors Table */}
      <div className='bg-white h-[calc(100vh-64px)] rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full  divide-y divide-gray-200'>
            <thead className='bg-slate-500'>
              <tr>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Primary Contact
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Organization
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Country/Region
                </th>
                <th className='px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {addAuthors.map((author, index) => (
                <tr
                  key={index}
                  className={`hover:bg-blue-50 transition-colors duration-200 ${
                    author.isPrimary ? 'bg-blue-25' : ''
                  }`}
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      {author.isPrimary ? (
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                          Primary
                        </span>
                      ) : (
                        <span className='text-gray-400'>-</span>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='text-sm text-gray-900'>{author.email}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {author.name}
                    </div>
                  </td>

                  <td className='px-6 py-4'>
                    <div className='text-sm text-gray-900 max-w-xs truncate'>
                      {author.affiliation}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {author.country}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleEdit(author)}
                        className='text-blue-600 hover:text-blue-900 transition-colors duration-200'
                        title='Edit author'
                      >
                        <FaEdit className='text-lg' />
                      </button>
                      {!author.isPrimary && (
                        <button
                          onClick={() => handleDelete(author.id)}
                          className='text-red-600 hover:text-red-900 transition-colors duration-200'
                          title='Delete author'
                        >
                          <FaTrash className='text-lg' />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={() => {
          activeStep.pop('Author')
          setActiveStep([
            'Select Conference',
            'Abstract Information',
            'Presenter Information'
          ])
          sessionStorage.setItem(
            'activeStep',
            JSON.stringify([
              'Select Conference',
              'Abstract Information',
              'Presenter Information'
            ])
          )
        }}
        className='mt-4 px-2 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 mr-2'
      >
        Previous
      </button>
      <button
        type='button'
        onClick={() => {
          setActiveStep([...activeStep, 'Conference Registration'])
          sessionStorage.setItem(
            'activeStep',
            JSON.stringify([...activeStep, 'Conference Registration'])
          )
        }}
        className='mt-4 px-6  px-2 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200'
      >
        Next
      </button>

      {/* Add/Edit Author Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-900 bg-opacity-50'>
          <div className='relative w-full max-w-2xl mx-auto my-6'>
            <div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
              {/* Header */}
              <div className='flex items-start justify-between p-6 border-b border-gray-200 rounded-t'>
                <div className='flex items-center gap-3'>
                  <IoPersonAdd className='text-2xl text-blue-600' />
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {editingAuthor ? 'Edit Author' : 'Add New Author'}
                  </h3>
                </div>
                <button
                  onClick={resetForm}
                  className='p-1 ml-auto bg-transparent border-0 text-gray-600 hover:text-gray-900 text-2xl leading-none font-semibold outline-none focus:outline-none'
                >
                  <FaTimes />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit} className='relative p-6 flex-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* Title */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Title *
                    </label>
                    <select
                      name='title'
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`border border-black rounded-md p-2 w-full text-black ${
                        errors.title ? 'border-red-500' : 'border-black'
                      }`}
                    >
                      <option value=''>Choose</option>
                      {titleOptions.map(title => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                    {errors.title && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder='Enter full name'
                      className={`border border-black rounded-md p-2 w-full text-black${
                        errors.firstName ? 'border-red-500' : 'border-black'
                      }`}
                    />
                    {errors.firstName && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email *
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='Enter email address'
                      className={`border border-black rounded-md p-2 w-full text-black ${
                        errors.email ? 'border-red-500' : 'border-black'
                      }`}
                    />
                    {errors.email && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Country/Location */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Country/Location *
                    </label>
                    <select
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`border border-black rounded-md p-2 w-full text-black ${
                        errors.country ? 'border-red-500' : 'border-black'
                      }`}
                    >
                      <option value=''>Choose</option>
                      {countries.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>

                {/* Affiliation */}
                <div className='mt-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Affiliation(s) *
                  </label>
                  <input
                    type='text'
                    name='affiliation'
                    value={formData.affiliation}
                    onChange={handleInputChange}
                    placeholder='Enter organization/affiliation'
                    className={`border border-black rounded-md p-2 w-full text-black ${
                      errors.affiliation ? 'border-red-500' : 'border-black'
                    }`}
                  />
                  {errors.affiliation && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.affiliation}
                    </p>
                  )}
                </div>

                {/* Corresponding Author Checkbox */}
                <div className='mt-4 flex items-center'>
                  <input
                    type='checkbox'
                    name='isCorresponding'
                    checked={formData.isCorresponding}
                    onChange={handleInputChange}
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <label className='ml-2 block text-sm text-gray-700'>
                    Corresponding Author
                  </label>
                </div>

                {/* Footer */}
                <div className='flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200'>
                  <button
                    type='button'
                    onClick={resetForm}
                    className='px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg'
                  >
                    {editingAuthor ? 'Update Author' : 'Add Author'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthorInformation
