import React from 'react'
import PresenterHome from '../../../Component/PresenterHome/PresenterHome'
import { useSelector } from 'react-redux'
import Loading from '../../../Component/Loading/Loading'
import AdminHome from '../../../Component/AdminHome/AdminHome'

import ReviewerHome from '../../../Component/ReviewerHome/ReviewerHome'
import SessionChairHome from '../../../Component/SessionChairHome/SessionChairHome'

const DashboardHome = () => {
  const { user, isLoading } = useSelector(state => state.user)

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <Loading />
        </div>
      ) : (
        (user?.role === 'Presenter' && <PresenterHome />) ||
        (user?.role === 'Admin' && <AdminHome />) ||
        (user?.role === 'Reviewer' && <ReviewerHome />) ||
        (user?.role === 'Session Chair' && <SessionChairHome />)
      )}
    </>
  )
}

export default DashboardHome
