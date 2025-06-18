import React from 'react'
import PresenterHome from '../../../Component/PresenterHome/PresenterHome'
import { useSelector } from 'react-redux'
import Loading from '../../../Component/Loading/Loading'

const DashboardHome = () => {
  const { user, isLoading } = useSelector(state => state.user)
  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <Loading />
        </div>
      ) : (
        user?.role?.value === 'Presenter' && <PresenterHome />
      )}
    </>
  )
}

export default DashboardHome
