/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  schedules: [],
  schedule: null,

  mySchedules: null,

  getScheduleLoading: false,
  getScheduleSuccess: false,
  getScheduleError: false,

  getSingleScheduleLoading: false,
  getSingleScheduleSuccess: false,
  getSingleScheduleError: false,

  createScheduleLoading: false,
  createScheduleSuccess: false,
  createScheduleError: false,

  updateScheduleLoading: false,
  updateScheduleSuccess: false,
  updateScheduleError: false,

  deleteScheduleLoading: false,
  deleteScheduleSuccess: false,
  deleteScheduleError: false,

  getMyScheduleLoading: false,
  getMyScheduleSuccess: false,
  getMyScheduleError: false,

  getSessionChairScheduleLoading: false,
  getSessionChairScheduleSuccess: false,
  getSessionChairScheduleError: false
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

export const getScheduleById = createAsyncThunk(
  'getScheduleById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get(`/schedules/${id}`)
      return response.data.data
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

export const getMySchedule = createAsyncThunk(
  'getMySchedule',
  async (conferenceId = null, { rejectWithValue }) => {
    try {
      const query = conferenceId ? `?conference_id=${conferenceId}` : ''
      const response = await axiosSecure.get(`/schedules/my${query}`)
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to fetch schedules' }
      )
    }
  }
)

export const getSessionChairSchedule = createAsyncThunk(
  'getSessionChairSchedule',
  async (
    { conferenceId, abstractType, page = 1, limit = 10 },
    { rejectWithValue }
  ) => {
    try {
      let query = `?page=${page}&limit=${limit}`
      if (conferenceId && conferenceId !== 'all')
        query += `&conference_id=${conferenceId}`
      if (abstractType && abstractType !== 'all')
        query += `&abstractType=${abstractType}`

      const response = await axiosSecure.get(`/schedules/session-chair${query}`)
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: 'Failed to fetch session chair schedules'
        }
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

      state.getSingleScheduleLoading = false
      state.getSingleScheduleSuccess = false
      state.getSingleScheduleError = false

      state.createScheduleLoading = false
      state.createScheduleSuccess = false
      state.createScheduleError = false

      state.updateScheduleLoading = false
      state.updateScheduleSuccess = false
      state.updateScheduleError = false

      state.deleteScheduleLoading = false
      state.deleteScheduleSuccess = false
      state.deleteScheduleError = false

      state.getMyScheduleLoading = false
      state.getMyScheduleSuccess = false
      state.getMyScheduleError = false

      state.getSessionChairScheduleLoading = false
      state.getSessionChairScheduleSuccess = false
      state.getSessionChairScheduleError = false
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

      .addCase(getScheduleById.pending, state => {
        state.getSingleScheduleLoading = true
        state.getSingleScheduleSuccess = false
        state.getSingleScheduleError = false
      })
      .addCase(getScheduleById.fulfilled, (state, action) => {
        state.getSingleScheduleLoading = false
        state.getSingleScheduleSuccess = true
        state.getSingleScheduleError = false
        state.schedule = action.payload
      })
      .addCase(getScheduleById.rejected, state => {
        state.getSingleScheduleLoading = false
        state.getSingleScheduleSuccess = false
        state.getSingleScheduleError = true
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

      // ===== Get my Schedule =====
      .addCase(getMySchedule.pending, state => {
        state.getMyScheduleLoading = true
        state.getMyScheduleSuccess = false
        state.getMyScheduleError = false
      })
      .addCase(getMySchedule.fulfilled, (state, action) => {
        state.getMyScheduleLoading = false
        state.getMyScheduleSuccess = true
        state.getMyScheduleError = false
        state.schedules = action.payload
      })
      .addCase(getMySchedule.rejected, state => {
        state.getMyScheduleLoading = false
        state.getMyScheduleSuccess = false
        state.getMyScheduleError = true
      })

      .addCase(getSessionChairSchedule.pending, state => {
        state.getSessionChairScheduleLoading = true
        state.getSessionChairScheduleSuccess = false
        state.getSessionChairScheduleError = false
      })
      .addCase(getSessionChairSchedule.fulfilled, (state, action) => {
        state.getSessionChairScheduleLoading = false
        state.getSessionChairScheduleSuccess = true
        state.getSessionChairScheduleError = false
        state.mySchedules = action.payload
      })
  }
})

export const { reset } = scheduleSlice.actions
export default scheduleSlice.reducer
