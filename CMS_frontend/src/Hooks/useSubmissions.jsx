import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAbstractByCategory } from '../Redux/Slice/AbstractSlice'

const useSubmissions = (method = null) => {
  const { selectedConference } = useSelector(state => state.conference)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getAbstractByCategory({
        presentation_method:method=='physical-paper'?'Paper Presentation Physical':method==='online-paper'?'Paper Presentation Online':method=='physical-poster'?'Poster Presentation Physical':method==='online-poster'?'Poster Presentation Online':null,
        conference_id: selectedConference
      })
    )
  }, [dispatch, method, selectedConference])
}

export default useSubmissions
