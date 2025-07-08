import React from 'react'
import { useDispatch } from 'react-redux'
import { adminCreateUser, deleteUserFromDb } from '../Redux/Slice/AdminSlice'
import Swal from 'sweetalert2'

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

  const handleDeleteUser = (user,role) => {
    Swal.fire({
      title: `Do you want to delete ${user?.name}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(() => {
      dispatch(deleteUserFromDb({id:user?._id,role}))
    })
  }

  return { handleCreateUser,handleDeleteUser }
}

export default useCreateUser
