/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CurrentUser from '../../Utilis/CurrentUser'

const PrivateRoute = ({ children }) => {
  const { user, isGetUserDataLoading } = useSelector(state => state.user)
  const navigate = useNavigate()

  CurrentUser()

  useEffect(() => {
    // only run after we're done loading
    if (!isGetUserDataLoading) {
      const timer = setTimeout(() => {
        if (!user?.email) {
          navigate('/Login')
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isGetUserDataLoading, user?.email, navigate])

  if (isGetUserDataLoading || !user?.email) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  // authenticated!
  return <>{children}</>
}

export default PrivateRoute
