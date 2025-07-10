import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  adminCreateUser,
  deleteUserFromDb,
  deleteUserImage,
  getRoleBasedUser,
  updateUser
} from '../Redux/Slice/AdminSlice'
import Swal from 'sweetalert2'

const useCreateUser = searchRole => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getRoleBasedUser({
        role: searchRole
      })
    )
  }, [dispatch, searchRole])

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
    dispatch(adminCreateUser(formData))
  }

  const handleDeleteUser = (user, role) => {
    Swal.fire({
      title: `Do you want to delete ${user?.name}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(() => {
      dispatch(deleteUserFromDb({ id: user?._id, role }))
    })
  }

  const handleUpdateUser = (data, role) => {
    dispatch(updateUser({ data, role }))
  }

  const handleDeleteImage = row => {
    dispatch(deleteUserImage({ id: row._id, role: row.role }))
  }

  return {
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleDeleteImage
  }
}

export default useCreateUser
