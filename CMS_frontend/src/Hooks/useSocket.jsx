import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../Redux/Slice/notificationSlice'
import socket from '../Socket/socket'

const useSocket = () => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user?._id) return // wait until user is loaded

    if (!socket.connected) {
      socket.connect()
    }

    socket.on('connect', () => {
      // console.log('✅ User connected via socket:', socket.id)
      socket.emit('register', user._id) // 👈 register user for targeted notifications
    })

    // 🔔 Listen for new notifications
    socket.on('newNotification', notif => {
      dispatch(addNotification(notif)) // save into Redux slice
    })
    // 🛑 Cleanup on unmount
    return () => {
      socket.disconnect()
    }
  }, [user?._id, dispatch])
  return null
}

export default useSocket
