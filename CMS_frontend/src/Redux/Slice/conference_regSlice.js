import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  conference_regs: [],
  single_conference_reg: null,

  dashboardStats: null,

  getConferenceRegLoading: false,
  getConferenceRegSuccess: false,
  getConferenceRegError: false,

  getSingleConferenceRegLoading: false,
  getSingleConferenceRegSuccess: false,
  getSingleConferenceRegError: false,

  getDashboardStatsLoading: false, // 👈 loading state
  getDashboardStatsSuccess: false,
  getDashboardStatsError: false
}

export const getConferenceRegs = createAsyncThunk(
  'getConferenceRegs',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get(`/conference_reg/${id}`)

      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while getting conference registration list'

      return rejectWithValue(message)
    }
  }
)
export const getSingleConferenceReg = createAsyncThunk(
  'getSingleConferenceReg',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get(
        `/conference_reg/single_conference_reg/${id}`
      )

      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while getting conference registration list'

      return rejectWithValue(message)
    }
  }
)

export const getAttendeeDashboardStats = createAsyncThunk(
  'attendee/getDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get(`/conference_reg/dashboard`)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while getting attendee dashboard stats'
      return rejectWithValue(message)
    }
  }
)

const conferenceRegSlice = createSlice({
  name: 'conferenceReg',
  initialState,
  reducers: {
    reset: state => {
      state.getConferenceRegLoading = false
      state.getConferenceRegSuccess = false
      state.getConferenceRegError = false

      state.getSingleConferenceRegLoading = false
      state.getSingleConferenceRegSuccess = false
      state.getSingleConferenceRegError = false

      state.getDashboardStatsLoading = false
      state.getDashboardStatsSuccess = false
      state.getDashboardStatsError = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getConferenceRegs.pending, state => {
        state.getConferenceRegLoading = true
        state.getConferenceRegSuccess = false
        state.getConferenceRegError = false
      })
      .addCase(getConferenceRegs.fulfilled, (state, action) => {
        state.conference_regs = action.payload
        state.getConferenceRegLoading = false
        state.getConferenceRegSuccess = true
        state.getConferenceRegError = false
      })
      .addCase(getConferenceRegs.rejected, state => {
        state.getConferenceRegLoading = false
        state.getConferenceRegSuccess = false
        state.getConferenceRegError = true
      })
      .addCase(getSingleConferenceReg.pending, state => {
        state.getSingleConferenceRegLoading = true
        state.getSingleConferenceRegSuccess = false
        state.getSingleConferenceRegError = false
      })
      .addCase(getSingleConferenceReg.fulfilled, (state, action) => {
        state.single_conference_reg = action.payload
        state.getSingleConferenceRegLoading = false
        state.getSingleConferenceRegSuccess = true
        state.getSingleConferenceRegError = false
      })
      .addCase(getSingleConferenceReg.rejected, state => {
        state.getSingleConferenceRegLoading = false
        state.getSingleConferenceRegSuccess = false
        state.getSingleConferenceRegError = true
      })
      .addCase(getAttendeeDashboardStats.pending, state => {
        state.getDashboardStatsLoading = true
        state.getDashboardStatsSuccess = false
        state.getDashboardStatsError = false
      })
      .addCase(getAttendeeDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload
        state.getDashboardStatsLoading = false
        state.getDashboardStatsSuccess = true
        state.getDashboardStatsError = false
      })
      .addCase(getAttendeeDashboardStats.rejected, state => {
        state.getDashboardStatsLoading = false
        state.getDashboardStatsSuccess = false
        state.getDashboardStatsError = true
      })
  }
})

export const { reset } = conferenceRegSlice.actions
export default conferenceRegSlice.reducer
