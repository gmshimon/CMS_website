import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setContactNumber, setCountry, setDepartment, setMailingAddress, setOrganization, setPresenterEmail, setPresenterName, setPresenterStatus } from '../../Redux/Slice/AbstractSlice'

const PresenterInformation = ({ activeStep, setActiveStep }) => {
  const {
presenter_name,presenter_email,organization,
department,country,
contact_number,mailing_address,presenter_status
  } = useSelector(state=>state.abstract)
  const [formData, setFormData] = useState({
    presenterName: '',
    email: '',
    organization: '',
    department: '',
    country: '',
    contactNumber: '',
    mailingAddress: '',
    presenterStatus: '',
    otherStatus: ''
  })

  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const presenterStatusOptions = [
    'Student',
    'Faculty Member',
    'Research Scholar',
    'Industry Professional',
    'Other'
  ]

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!presenter_name?.trim()||!presenter_name) {
      newErrors.presenterName = 'Presenter name is required'
    }
    if (!presenter_email?.trim()||!presenter_email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!organization?.trim()||!organization) {
      newErrors.organization = 'Organization/University is required'
    }
    if (!department?.trim()||!department) {
      newErrors.department = 'Department is required'
    }
    if (!country?.trim()||!country) {
      newErrors.country = 'Country is required'
    }
    if (!contact_number?.trim()||!contact_number) {
      newErrors.contactNumber = 'Contact number is required'
    }
    if (!mailing_address?.trim()||!mailing_address) {
      newErrors.mailingAddress = 'Mailing address is required'
    }
    if (!presenter_status) {
      newErrors.presenterStatus = 'Presenter status is required'
    }
    if (presenter_status === 'Other' && !presenter_status?.trim()) {
      newErrors.otherStatus = 'Please specify your status'
    }
    return newErrors
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = validateForm()
    // if (Object.keys(newErrors).length === 0) {
    setActiveStep([...activeStep, 'Author'])
    sessionStorage.setItem(
      'activeStep',
      JSON.stringify([...activeStep, 'Author'])
    )
    // Here you would typically make an API call to submit the form data
    console.log('Form Data:', formData)
    // } else {
    //     setErrors(newErrors);
    // }
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Presenter Information</h2>

      <form onSubmit={handleSubmit} className='space-y-2'>
        {/* Presenter Name */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Presenter Name *
            </span>
          </label>
          <input
            type='text'
            name='presenterName'
            value={presenter_name}
            onChange={(e)=>dispatch(setPresenterName(e.target.name))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.presenterName ? 'input-error' : ''
            }`}
            placeholder='Enter your full name'
          />
          {errors.presenterName && (
            <p className='text-error text-sm mt-1'>{errors.presenterName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Email ID *
            </span>
          </label>
          <input
            type='email'
            name='email'
            value={presenter_email}
            onChange={e=>dispatch(setPresenterEmail(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.email ? 'input-error' : ''
            }`}
            placeholder='Enter your email address'
          />
          {errors.email && (
            <p className='text-error text-sm mt-1'>{errors.email}</p>
          )}
        </div>

        {/* Organization/University */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Organization/University *
            </span>
          </label>
          <input
            type='text'
            name='organization'
            value={organization}
            onChange={e=>dispatch(setOrganization(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.organization ? 'input-error' : ''
            }`}
            placeholder='Enter your organization or university name'
          />
          {errors.organization && (
            <p className='text-error text-sm mt-1'>{errors.organization}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Department *
            </span>
          </label>
          <input
            type='text'
            name='department'
            value={department}
            onChange={e=>dispatch(setDepartment(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.department ? 'input-error' : ''
            }`}
            placeholder='Enter your department'
          />
          {errors.department && (
            <p className='text-error text-sm mt-1'>{errors.department}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>Country *</span>
          </label>
          <input
            type='text'
            name='country'
            value={country}
            onChange={e=>dispatch(setCountry(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.country ? 'input-error' : ''
            }`}
            placeholder='Enter your country'
          />
          {errors.country && (
            <p className='text-error text-sm mt-1'>{errors.country}</p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Contact Number *
            </span>
          </label>
          <input
            type='tel'
            name='contactNumber'
            value={contact_number}
            onChange={e=>dispatch(setContactNumber(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.contactNumber ? 'input-error' : ''
            }`}
            placeholder='Enter your contact number'
          />
          <p className='text-sm text-gray-500 mt-1'>
            The number will be used to contact to the participants only. We
            assure you the privacy of your number and will not be provided to
            any one for any unofficial use.
          </p>
          {errors.contactNumber && (
            <p className='text-error text-sm mt-1'>{errors.contactNumber}</p>
          )}
        </div>

        {/* Mailing Address */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Correspondence Mailing Address *
            </span>
          </label>
          <textarea
            name='mailingAddress'
            value={mailing_address}
            onChange={e=>dispatch(setMailingAddress(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black h-24 ${
              errors.mailingAddress ? 'textarea-error' : ''
            }`}
            placeholder='Enter your complete mailing address'
          />
          {errors.mailingAddress && (
            <p className='text-error text-sm mt-1'>{errors.mailingAddress}</p>
          )}
        </div>

        {/* Presenter Status */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Presenter Status *
            </span>
          </label>
          <select
            name='presenterStatus'
            value={presenter_status}
            onChange={e=>dispatch(setPresenterStatus(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.presenterStatus ? 'select-error' : ''
            }`}
          >
            <option value=''>Select your status</option>
            {presenterStatusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.presenterStatus && (
            <p className='text-error text-sm mt-1'>{errors.presenterStatus}</p>
          )}

          {/* Other Status Input */}
          {formData.presenterStatus === 'Other' && (
            <div className='mt-4'>
              <input
                type='text'
                name='otherStatus'
                value={formData.otherStatus}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  errors.otherStatus ? 'input-error' : ''
                }`}
                placeholder='Please specify your status'
              />
              {errors.otherStatus && (
                <p className='text-error text-sm mt-1'>{errors.otherStatus}</p>
              )}
            </div>
          )}
        </div>
      </form>
      <button
        onClick={() => {
          activeStep.pop('Presenter Information')
          setActiveStep(['Select Conference','Abstract Information'])
          sessionStorage.setItem(
            'activeStep',
            JSON.stringify(['Select Conference','Abstract Information'])
          )
        }}
        className='mt-4 px-6 py-3 text-white font-bold btn btn-active btn-sm btn-primary mr-2'
      >
        Previous
      </button>
      <button
        type='button'
        onClick={handleSubmit}
        className='mt-4 px-6 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
      >
        Next
      </button>
    </div>
  )
}

export default PresenterInformation
