import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  list: [],
  unRead: 0,
  getNotificationLoading: false,
  getNotificationSuccess: false,
  getNotificationError: false
}

export const getNotifications = createAsyncThunk(
  'getNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get('/notification')
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while fetching notification'
      return rejectWithValue(message)
    }
  }
)

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    reset: state => {
      state.getNotificationLoading = false
      state.getNotificationSuccess = false
      state.getNotificationError = false
    },
    addNotification: (state, action) => {
      state.list.push(action.payload) // add new notification at the front
      state.unRead += 1
    },
    clearNotifications: state => {
      state.list = []
       state.unRead = 0
    },
    updateNotification: (state, action) => {
      const id = action.payload
      const index = state.list.findIndex(n => n._id === id)
      if (index !== -1 && !state.list[index].isRead) {
        state.list[index].isRead = true
        state.unRead = Math.max(0, state.unRead - 1)
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getNotifications.pending, state => {
        state.getNotificationLoading = true
        state.getNotificationSuccess = false
        state.getNotificationError = false
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.getNotificationLoading = false
        state.getNotificationSuccess = true
        state.getNotificationError = false
        state.list = action.payload.notifications
        state.unRead = action.payload.unreadCount
      })
      .addCase(getNotifications.rejected, state => {
        state.getNotificationLoading = false
        state.getNotificationSuccess = false
        state.getNotificationError = true
      })
  }
})

export const { addNotification, clearNotifications,updateNotification } = notificationSlice.actions
export default notificationSlice.reducer
