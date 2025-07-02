import React from 'react'
import { useDispatch } from 'react-redux'

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
    // You might want to send formData to your backend here, or return it
    return formData
  }

  return { handleCreateUser }
}

export default useCreateUser
