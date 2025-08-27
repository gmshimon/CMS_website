/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  schedules: [],

  getScheduleLoading: false,
  getScheduleSuccess: false,
  getScheduleError: false,

  createScheduleLoading: false,
  createScheduleSuccess: false,
  createScheduleError: false,

  updateScheduleLoading: false,
  updateScheduleSuccess: false,
  updateScheduleError: false,

  deleteScheduleLoading: false,
  deleteScheduleSuccess: false,
  deleteScheduleError: false
}

// Async thunk to get all schedules
export const getAllSchedules = createAsyncThunk(
  'schedule/getAllSchedules',
  async ({ conference_id, abstractType }, { rejectWithValue }) => {
    try {
      let query = ''
      const params = []
      if (conference_id) params.push(`conference_id=${conference_id}`)
      if (abstractType) params.push(`abstractType=${abstractType}`)
      if (params.length) query = '?' + params.join('&')

      const response = await axiosSecure.get(`/schedules${query}`)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch schedules' }
      )
    }
  }
)

// Async thunk placeholders for create and update (you can complete them later)
export const createSchedule = createAsyncThunk(
  'schedule/createSchedule',
  async (scheduleData, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post('/schedules', scheduleData)
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to create schedule' }
      )
    }
  }
)

export const updateSchedule = createAsyncThunk(
  'schedule/updateSchedule',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.put(`/schedules/${id}`, data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to update schedule' }
      )
    }
  }
)

export const deleteSchedule = createAsyncThunk(
  'deleteSchedule',
  async (id, { rejectWithValue }) => {
    try {
      await axiosSecure.delete(`/schedules/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to update schedule' }
      )
    }
  }
)

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    reset: state => {
      state.getScheduleLoading = false
      state.getScheduleSuccess = false
      state.getScheduleError = false

      state.createScheduleLoading = false
      state.createScheduleSuccess = false
      state.createScheduleError = false

      state.updateScheduleLoading = false
      state.updateScheduleSuccess = false
      state.updateScheduleError = false

      state.deleteScheduleLoading = false
      state.deleteScheduleSuccess = false
      state.deleteScheduleError = false
    }
  },
  extraReducers: builder => {
    // GET ALL SCHEDULES
    builder
      .addCase(getAllSchedules.pending, state => {
        state.getScheduleLoading = true
        state.getScheduleSuccess = false
        state.getScheduleError = false
      })
      .addCase(getAllSchedules.fulfilled, (state, action) => {
        state.getScheduleLoading = false
        state.getScheduleSuccess = true
        state.schedules = action.payload
      })
      .addCase(getAllSchedules.rejected, (state, action) => {
        state.getScheduleLoading = false
        state.getScheduleError = true
        state.getScheduleSuccess = false
      })

      // CREATE SCHEDULE
      .addCase(createSchedule.pending, state => {
        state.createScheduleLoading = true
        state.createScheduleSuccess = false
        state.createScheduleError = false
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.createScheduleLoading = false
        state.createScheduleSuccess = true
        state.createScheduleError = false
        state.schedules.push(action.payload)
      })
      .addCase(createSchedule.rejected, (state, action) => {
        state.createScheduleLoading = false
        state.createScheduleError = true
        state.createScheduleSuccess = false
      })

      // UPDATE SCHEDULE
      .addCase(updateSchedule.pending, state => {
        state.updateScheduleLoading = true
        state.updateScheduleSuccess = false
        state.updateScheduleError = false
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.updateScheduleLoading = false
        state.updateScheduleSuccess = true
        state.updateScheduleError = false
        const index = state.schedules.findIndex(
          s => s._id === action.payload._id
        )
        if (index !== -1) state.schedules[index] = action.payload
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.updateScheduleLoading = false
        state.updateScheduleError = true
        state.updateScheduleSuccess = false
      })
      // ===== DELETE SCHEDULE =====
      .addCase(deleteSchedule.pending, state => {
        state.deleteScheduleLoading = true
        state.deleteScheduleSuccess = false
        state.deleteScheduleError = false
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.deleteScheduleLoading = false
        state.deleteScheduleSuccess = true
        state.deleteScheduleError = false

        // remove deleted schedule from state
        state.schedules = state.schedules.filter(s => s._id !== action.payload)
      })
      .addCase(deleteSchedule.rejected, state => {
        state.deleteScheduleLoading = false
        state.deleteScheduleSuccess = false
        state.deleteScheduleError = false
      })
  }
})

export const { reset } = scheduleSlice.actions
export default scheduleSlice.reducer
