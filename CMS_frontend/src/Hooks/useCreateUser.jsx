import React from 'react'
import { useDispatch } from 'react-redux'
import { adminCreateUser } from '../Redux/Slice/AdminSlice'

const useCreateUser = () => {
  const dispatch = useDispatch()
  const handleCreateUser = form => {
    const formData = new FormData()
    for (const key in form) {
      if (key === 'imageFile' && form[key]) {
        formData.append('image', form[key]) // backend expects field name `image`
      } else {
        formData.append(key, form[key])
      }
    }
    console.log(form)
    // You might want to send formData to your backend here, or return it
    dispatch(adminCreateUser(formData))
  }

  return { handleCreateUser }
}

export default useCreateUser
