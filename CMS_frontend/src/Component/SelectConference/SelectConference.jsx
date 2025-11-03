import { useDispatch, useSelector } from 'react-redux'
import {
  setConference,
  setMemberId,
  setTrack,
  setSubTrack,
  setTheme,
  // setCategory
} from '../../Redux/Slice/AbstractSlice'
import { useState } from 'react'

const SelectConference = ({
  setCurrentConference,
  setActiveStep,
  activeStep
}) => {
  const { conference, member_id, track, subTrack } = useSelector(
    state => state.abstract
  )
  const { singleConference, conferences } = useSelector(
    state => state.conference
  )
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  // Find the selected track object to populate subTracks dropdown
  const selectedTrack = singleConference?.tracks?.find(t => t.title === track)

  const validateForm = () => {
    const newErrors = {}
    if (!conference) newErrors.conference = 'Conference is required'
    // if (!category) newErrors.category = 'Category is required'
    if (!track) newErrors.track = 'Track is required'
    if (selectedTrack?.subTracks?.length > 0 && !subTrack)
      newErrors.subTrack = 'Sub-Track is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div>
      <h1 className='text-xl font-semibold'>Select Conference</h1>
      <div>
        {/* Select Conference */}
        <div className='mt-5'>
          <label
            htmlFor='conference'
            className='block text-gray-700 text-sm font-bold mb-2 ml-1'
          >
            Select Conference *
          </label>
          <select
            id='conference'
            value={conference}
            onChange={e => {
              dispatch(setConference(e.target.value))
              setCurrentConference(e.target.value)
              dispatch(setTheme(singleConference?.theme))
            }}
            className='w-full border border-black rounded-md p-2'
            required
          >
            <option value=''>Select an option</option>
            {conferences?.map(conf => (
              <option key={conf._id} value={conf._id}>
                {conf.name}
              </option>
            ))}
          </select>
          {errors.conference && (
            <p className='text-red-500 text-sm mt-1'>{errors.conference}</p>
          )}
        </div>

        {/* Select Category */}
        {/* <div className='mt-5'>
          <label
            htmlFor='category'
            className='block text-gray-700 text-sm font-bold mb-2 ml-1'
          >
            Select Category *
          </label>
          <select
            id='category'
            value={category}
            onChange={e => dispatch(setCategory(e.target.value))}
            className='w-full border border-black rounded-md p-2'
            required
          >
            <option value=''>Select an option</option>
            {singleConference?.category?.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
          )}
        </div> */}

        {/* Select Track */}
        <div className='mt-5'>
          <label
            htmlFor='track'
            className='block text-gray-700 text-sm font-bold mb-2 ml-1'
          >
            Select Track *
          </label>
          <select
            id='track'
            value={track}
            onChange={e => dispatch(setTrack(e.target.value))}
            className='w-full border border-black rounded-md p-2'
            required
          >
            <option value=''>Select a track</option>
            {singleConference?.tracks?.map((t, index) => (
              <option key={index} value={t.title}>
                {t.title}
              </option>
            ))}
          </select>
           {errors.track && (
            <p className="text-red-500 text-sm mt-1">{errors.track}</p>
          )}
        </div>

        {/* Select Sub-Track */}
        {selectedTrack && selectedTrack.subTracks?.length > 0 && (
          <div className='mt-5'>
            <label
              htmlFor='subTrack'
              className='block text-gray-700 text-sm font-bold mb-2 ml-1'
            >
              Select Sub-Track
            </label>
            <select
              id='subTrack'
              value={subTrack}
              onChange={e => dispatch(setSubTrack(e.target.value))}
              className='w-full border border-black rounded-md p-2'
            >
              <option value=''>Select a sub-track</option>
              {selectedTrack.subTracks.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            {errors.subTrack && (
              <p className="text-red-500 text-sm mt-1">{errors.subTrack}</p>
            )}
          </div>
        )}

        {/* Member ID */}
        <div className='mt-4'>
          <label
            htmlFor='memberId'
            className='block text-gray-700 text-sm font-bold mb-1 ml-1'
          >
            Member ID
          </label>
          <input
            type='text'
            id='memberId'
            value={member_id}
            onChange={e => dispatch(setMemberId(e.target.value))}
            className='w-full border border-black rounded-md p-2'
            placeholder='Enter your ID if you have any'
          />
        </div>
      </div>
      <button
        onClick={() => {
          if (validateForm()) {
            setActiveStep([...activeStep, 'Abstract Information'])
            sessionStorage.setItem(
              'activeStep',
              JSON.stringify([...activeStep, 'Abstract Information'])
            )
          }
        }}
        className='px-3 mt-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200'
      >
        Next
      </button>
    </div>
  )
}

export default SelectConference
