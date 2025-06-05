import { useDispatch, useSelector } from 'react-redux'
import { setConference, setMemberId } from '../../Redux/Slice/AbstractSlice'

const SelectConference = () => {
  const { conference, member_id } = useSelector(state => state.abstract)
  const { conferences } = useSelector(
    state => state.conference
  )
  const dispatch = useDispatch()
  return (
    <div>
      <h1 className='text-xl font-semibold'>Select Conference</h1>
      <div>
        <div className='mt-5'>
          <label
            htmlFor='hear'
            className='block text-gray-700 text-sm font-bold mb-2 ml-1'
          >
            Select Conference *
          </label>
          <select
            id='hear'
            value={conference}
            onChange={e => dispatch(setConference(e.target.value))}
            className='w-full border border-black rounded-md p-2'
            required
          >
            <option value=''>Select an option</option>
            {
              conferences?.category?.map((cat,index)=><option key={index} value={cat._id}>{cat}</option>)
            }
          </select>
        </div>
        <div className='mt-4'>
          <label
            htmlFor='department'
            className='block text-gray-700 text-sm font-bold mb-1 ml-1'
          >
            Member ID
          </label>
          <input
            type='text'
            id='department'
            value={member_id}
            onChange={e => dispatch(setMemberId(e.target.value))}
            className='w-full border border-black rounded-md p-2'
            placeholder='Enter your ID if you have any'
          />
        </div>
      </div>
    </div>
  )
}

export default SelectConference
