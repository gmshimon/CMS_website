import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router'
import { showErrorToast, showSuccessToast } from '../Utilis/toastUtils'
import { reset } from '../Redux/Slice/AdminSlice'
import Loading from '../Component/Loading/Loading'

const Users = () => {
  const {
    adminErrorMessage,
    isAdminCreateUserLoading,
    isAdminCreateUserSuccess,
    isAdminCreateUserError,
    isDeleteUserLoading,
    isDeleteUserSuccess,
    isDeleteUserError,
    isUpdateUserLoading,
    isUpdateUserSuccess,
    isUpdateUserError
  } = useSelector(state => state.admin)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isAdminCreateUserSuccess) {
      showSuccessToast('Successfully Created the User')
      dispatch(reset())
    }
    if (isDeleteUserSuccess) {
      showSuccessToast('Successfully deleted the user')
      dispatch(reset())
    }
    if (isUpdateUserSuccess) {
      showSuccessToast('Successfully updated the user')
      dispatch(reset())
    }
    if (isDeleteUserError) {
      showErrorToast(adminErrorMessage)
      dispatch(reset())
    }
    if (isAdminCreateUserError) {
      showErrorToast(adminErrorMessage)
      dispatch(reset())
    }
    if (isUpdateUserError) {
      showErrorToast(adminErrorMessage)
      dispatch(reset())
    }
  }, [
    adminErrorMessage,
    dispatch,
    isAdminCreateUserError,
    isAdminCreateUserSuccess,
    isDeleteUserError,
    isDeleteUserSuccess,
    isUpdateUserError,
    isUpdateUserSuccess
  ])

  const location = useLocation()

  if (isAdminCreateUserLoading || isDeleteUserLoading || isUpdateUserLoading) {
    return (
      <div className='flex justify-center min-h-[calc(100vh-100px)] items-center'>
        <Loading />
      </div>
    )
  }
  return (
    <div className='p-3'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        {location.pathname === '/admin/users'
          ? 'User Overview'
          : location?.pathname === '/admin/users/authors'
          ? 'Manage Authors'
          : location.pathname === '/admin/users/reviewers'
          ? 'Manage Reviewers'
          : location.pathname === '/admin/users/session-chairs'
          ? 'Manage Session Chair'
          : location.pathname === '/admin/users/keynote-speakers'
          ? 'Manage Key Note Speaker'
          : location.pathname === '/admin/users/moderators'
          ? 'Manage Moderator'
          : location.pathname === '/admin/users/committee'
          ? 'Manage Committee'
          : location.pathname === '/admin/users/committee/scientific'
          ? 'Manage Scientific Committee'
          : location.pathname === '/admin/users/committee/technical'
          ? 'Manage Technical Committee'
          : location.pathname === '/admin/users/committee/registration'
          ? 'Manage Registration Committee'
          : 'User Overview'}
      </h2>
      <Outlet />
    </div>
  )
}

export default Users
