import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  conference_regs: [],
  single_conference_reg: null,
  pagination: null,
  errorMessage: null,

  dashboardStats: null,

  createConferenceRegLoading: false,
  createConferenceRegSuccess: false,
  createConferenceRegError: false,

  getConferenceRegLoading: false,
  getConferenceRegSuccess: false,
  getConferenceRegError: false,

  getSingleConferenceRegLoading: false,
  getSingleConferenceRegSuccess: false,
  getSingleConferenceRegError: false,

  getDashboardStatsLoading: false, // 👈 loading state
  getDashboardStatsSuccess: false,
  getDashboardStatsError: false,

  updatePaymentDecisionLoading: false,
  updatePaymentDecisionSuccess: false,
  updatePaymentDecisionError: false
}

export const getConferenceRegs = createAsyncThunk(
  'getConferenceRegs',
  async (
    { conferenceId, page = 1, limit = 10, search = '' },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosSecure.get(
        `/conference_reg/${conferenceId}?page=${page}&limit=${limit}&search=${search}`
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

export const createConferenceReg = createAsyncThunk(
  'conferenceReg/createConferenceReg',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post(`/conference_reg/create`, payload)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while creating conference registration'
      return rejectWithValue(message)
    }
  }
)

// Upload payment receipt
export const uploadPaymentReceipt = createAsyncThunk(
  'conferenceReg/uploadPaymentReceipt',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post(
        `/conference_reg/upload-payment/${id}`,
        data
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to upload payment receipt'
      )
    }
  }
)

export const updatePaymentDecision = createAsyncThunk(
  'conferenceReg/updatePaymentDecision',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.put(
        `/conference_reg/payment-decision/${id}`,
        data
      )
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while updating payment decision'
      return rejectWithValue(message)
    }
  }
)

const conferenceRegSlice = createSlice({
  name: 'conferenceReg',
  initialState,
  reducers: {
    reset: state => {
      state.errorMessage = null

      state.createConferenceRegLoading = false
      state.createConferenceRegSuccess = false
      state.createConferenceRegError = false

      state.getConferenceRegLoading = false
      state.getConferenceRegSuccess = false
      state.getConferenceRegError = false

      state.getSingleConferenceRegLoading = false
      state.getSingleConferenceRegSuccess = false
      state.getSingleConferenceRegError = false

      state.getDashboardStatsLoading = false
      state.getDashboardStatsSuccess = false
      state.getDashboardStatsError = false

      state.updatePaymentDecisionLoading = false
      state.updatePaymentDecisionSuccess = false
      state.updatePaymentDecisionError = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createConferenceReg.pending, state => {
        state.createConferenceRegLoading = true
        state.createConferenceRegSuccess = false
        state.createConferenceRegError = false
      })
      .addCase(createConferenceReg.fulfilled, (state, action) => {
        state.conference_regs.push(action.payload) // add new reg to list
        state.createConferenceRegLoading = false
        state.createConferenceRegSuccess = true
        state.createConferenceRegError = false
      })
      .addCase(createConferenceReg.rejected, (state, action) => {
        state.errorMessage = action.payload
        state.createConferenceRegLoading = false
        state.createConferenceRegSuccess = false
        state.createConferenceRegError = true
      })
      .addCase(getConferenceRegs.pending, state => {
        state.getConferenceRegLoading = true
        state.getConferenceRegSuccess = false
        state.getConferenceRegError = false
      })
      .addCase(getConferenceRegs.fulfilled, (state, action) => {
        state.conference_regs = action.payload.results
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
          totalPages: action.payload.totalPages
        }
        state.getConferenceRegLoading = false
        state.getConferenceRegSuccess = true
        state.getConferenceRegError = false
      })
      .addCase(getConferenceRegs.rejected, (state, action) => {
        state.pagination = null
        state.errorMessage = action.payload
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
      .addCase(uploadPaymentReceipt.pending, state => {
        state.createConferenceRegLoading = true
        state.createConferenceRegSuccess = false
        state.createConferenceRegError = false
      })
      .addCase(uploadPaymentReceipt.fulfilled, (state, action) => {
        const updatedReg = action.payload

        // ✅ Update conference_regs list
        state.conference_regs = state.conference_regs.map(reg =>
          reg._id === updatedReg._id ? updatedReg : reg
        )

        // ✅ Also update single_conference_reg if it matches
        if (state.single_conference_reg?._id === updatedReg._id) {
          state.single_conference_reg = updatedReg
        }

        state.createConferenceRegLoading = false
        state.createConferenceRegSuccess = true
        state.createConferenceRegError = false
      })
      .addCase(uploadPaymentReceipt.rejected, (state, action) => {
        state.errorMessage = action.payload
        state.createConferenceRegLoading = false
        state.createConferenceRegSuccess = false
        state.createConferenceRegError = true
      })

      .addCase(updatePaymentDecision.pending, state => {
        state.updatePaymentDecisionLoading = true
        state.updatePaymentDecisionSuccess = false
        state.updatePaymentDecisionError = false
      })
      .addCase(updatePaymentDecision.fulfilled, (state, action) => {
        // replace the updated registration in the list
        state.conference_regs = state?.conference_regs.map(reg =>
          reg._id === action.payload._id ? action.payload : reg
        )
        state.updatePaymentDecisionLoading = false
        state.updatePaymentDecisionSuccess = true
        state.updatePaymentDecisionError = false
      })
      .addCase(updatePaymentDecision.rejected, (state, action) => {
        state.updatePaymentDecisionLoading = false
        state.updatePaymentDecisionSuccess = false
        state.updatePaymentDecisionError = action.payload
      })
  }
})

export const { reset } = conferenceRegSlice.actions
export default conferenceRegSlice.reducer
