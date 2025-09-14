/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  reviewStats: null,
  reviews: [],
  myReviewStat: [],
  myReviewData: [],

  isGetReviewStatsLoading: false,
  isGetReviewStatsSuccess: false,
  isGetReviewStatsError: false,

  isGetAbstractReviewLoading: false,
  isGetAbstractReviewSuccess: false,
  isGetAbstractReviewError: false,

  assigningReviewerLoading: false,
  assigningReviewerSuccess: false,
  assigningReviewerError: false,

  sentReviewerReminderLoading: false,
  sentReviewerReminderSuccess: false,
  sentReviewerReminderError: false,

  getMyReviewStatsLoading: false,
  getMyReviewStatsSuccess: false,
  getMyReviewStatsError: false,

  getReviewDataLoading: false,
  getReviewDataSuccess: false,
  getReviewDataError: false,

  respondReviewLoading: false,
  respondReviewSuccess: false,
  respondReviewError: false,

  submitReviewLoading: false,
  submitReviewSuccess: false,
  submitReviewError: false,

  changeAbstractStatusLoading: false,
  changeAbstractStatusSuccess: false,
  changeAbstractStatusError: false,

  getReviewStatsError: null
}
export const fetchReviewStats = createAsyncThunk(
  'admin/fetchReviewStats',
  async (conferenceId = null, { rejectWithValue }) => {
    try {
      const query = conferenceId ? `?conference_id=${conferenceId}` : ''
      const response = await axiosSecure.get(`/review/review-stats${query}`)
      return response.data.data
    } catch (error) {
      // Customize error handling as needed
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getAbstractsByCategory = createAsyncThunk(
  'getAbstractsByCategory',
  async (data, { rejectWithValue }) => {
    try {
      const { category, conferenceId } = data
      let query = ''
      const params = []
      if (conferenceId) params.push(`conference_id=${conferenceId}`)
      if (category) params.push(`category=${category}`)
      if (params.length) query = '?' + params.join('&')
      const response = await axiosSecure.get(`/review/abstract${query}`)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const assignReviewer = createAsyncThunk(
  'assignReviewer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post('/review/assign-reviewer', data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const sendReminderToReviewer = createAsyncThunk(
  'sendReminderToReviewer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/review/send-reminder', data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getMyReviewStats = createAsyncThunk(
  'getMyReviewStats',
  async (id, { rejectWithValue }) => {
    try {
      const query = id ? `?conference=${id}` : ''
      const response = await axiosSecure.get(`/review/my-review-stats${query}`)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getMyReview = createAsyncThunk(
  'getMyReview',
  async ({ conference, status }, { rejectWithValue }) => {
    try {
      const conferenceQuery = conference ? `conference=${conference}` : ''
      const statusQuery = status ? `status=${status}` : ''
      const response = await axiosSecure.get(
        `/review/my-review/?${statusQuery}&${conferenceQuery}`
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const acceptReviewInvitation = createAsyncThunk(
  'acceptReviewInvitation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post(`/review/respond`, data)
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while responding to review.'
      )
    }
  }
)

export const submitReview = createAsyncThunk(
  'submitReview',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post('/review/submit-review', data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while responding to review.'
      )
    }
  }
)

export const changeAbstractStatus = createAsyncThunk(
  'changeAbstractStatus',
  async ({ id, status, paper_deadline, message }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post(
        `/abstract/change-review-status/${id}`,
        {
          status: status,
          paper_deadline,
          message
        }
      )
      return {
        id,
        status,
        paper_deadline
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while responding to review.'
      )
    }
  }
)

const adminSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearReviewStats (state) {
      state.isGetReviewStatsLoading = false
      state.isGetReviewStatsSuccess = false
      state.isGetReviewStatsError = false

      state.isGetAbstractReviewLoading = false
      state.isGetAbstractReviewSuccess = false
      state.isGetAbstractReviewError = false

      state.assigningReviewerLoading = false
      state.assigningReviewerSuccess = false
      state.assigningReviewerError = false

      state.sentReviewerReminderLoading = false
      state.sentReviewerReminderSuccess = false
      state.sentReviewerReminderError = false

      state.getMyReviewStatsLoading = false
      state.getMyReviewStatsSuccess = false
      state.getMyReviewStatsError = false

      state.getReviewDataLoading = false
      state.getReviewDataSuccess = false
      state.getReviewDataError = false

      state.respondReviewLoading = false
      state.respondReviewSuccess = false
      state.respondReviewError = false

      state.submitReviewLoading = false
      state.submitReviewSuccess = false
      state.submitReviewError = false

      state.changeAbstractStatusLoading = false
      state.changeAbstractStatusSuccess = false
      state.changeAbstractStatusError = false

      state.getReviewStatsError = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchReviewStats.pending, state => {
        state.isGetReviewStatsLoading = true
        state.isGetReviewStatsSuccess = false
        state.isGetReviewStatsError = false
        state.getReviewStatsError = null
      })
      .addCase(fetchReviewStats.fulfilled, (state, action) => {
        state.isGetReviewStatsLoading = false
        state.isGetReviewStatsSuccess = true
        state.isGetReviewStatsError = false
        state.reviewStats = action.payload
      })
      .addCase(fetchReviewStats.rejected, (state, action) => {
        state.isGetReviewStatsLoading = false
        state.isGetReviewStatsSuccess = false
        state.isGetReviewStatsError = true
        state.getReviewStatsError =
          action.payload || 'Failed to fetch review stats'
      })
      .addCase(getAbstractsByCategory.pending, state => {
        state.isGetAbstractReviewLoading = true
        state.isGetAbstractReviewSuccess = false
        state.isGetAbstractReviewError = false
      })
      .addCase(getAbstractsByCategory.fulfilled, (state, action) => {
        state.reviews = action.payload
        state.isGetAbstractReviewLoading = false
        state.isGetAbstractReviewSuccess = true
        state.isGetAbstractReviewError = false
      })
      .addCase(getAbstractsByCategory.rejected, (state, action) => {
        state.getReviewStatsError = action.payload
        state.isGetAbstractReviewLoading = false
        state.isGetAbstractReviewSuccess = false
        state.isGetAbstractReviewError = true
      })

      .addCase(assignReviewer.pending, state => {
        state.assigningReviewerLoading = true
        state.assigningReviewerSuccess = false
        state.assigningReviewerError = false
      })
      .addCase(assignReviewer.fulfilled, state => {
        state.assigningReviewerLoading = false
        state.assigningReviewerSuccess = true
        state.assigningReviewerError = false
      })
      .addCase(assignReviewer.rejected, (state, action) => {
        state.assigningReviewerLoading = false
        state.assigningReviewerSuccess = false
        state.assigningReviewerError = true
        state.getReviewStatsError = action.payload
      })
      .addCase(sendReminderToReviewer.pending, state => {
        state.sentReviewerReminderLoading = true
        state.sentReviewerReminderSuccess = false
        state.sentReviewerReminderError = false
      })
      .addCase(sendReminderToReviewer.fulfilled, state => {
        state.sentReviewerReminderLoading = false
        state.sentReviewerReminderSuccess = true
        state.sentReviewerReminderError = false
      })
      .addCase(sendReminderToReviewer.rejected, (state, action) => {
        state.sentReviewerReminderLoading = false
        state.sentReviewerReminderSuccess = false
        state.sentReviewerReminderError = true
        state.getReviewStatsError = action.payload
      })

      .addCase(getMyReviewStats.pending, state => {
        state.getMyReviewStatsLoading = true
        state.getMyReviewStatsSuccess = false
        state.getMyReviewStatsError = false
      })
      .addCase(getMyReviewStats.fulfilled, (state, action) => {
        state.getMyReviewStatsLoading = false
        state.getMyReviewStatsSuccess = true
        state.getMyReviewStatsError = false
        state.myReviewStat = action.payload
      })
      .addCase(getMyReviewStats.rejected, (state, action) => {
        state.getMyReviewStatsLoading = false
        state.getMyReviewStatsSuccess = false
        state.getMyReviewStatsError = true
        state.getMyReviewStatsError = action.payload
      })
      .addCase(getMyReview.pending, state => {
        state.getReviewDataLoading = true
        state.getReviewDataSuccess = false
        state.getReviewDataError = false
      })
      .addCase(getMyReview.fulfilled, (state, action) => {
        state.getReviewDataLoading = false
        state.getReviewDataSuccess = true
        state.getReviewDataError = false
        state.myReviewData = action.payload
      })
      .addCase(getMyReview.rejected, (state, action) => {
        state.getReviewDataLoading = false
        state.getReviewDataSuccess = false
        state.getReviewDataError = false
        state.getMyReviewStatsError = action.payload
      })
      .addCase(acceptReviewInvitation.pending, state => {
        state.respondReviewLoading = true
        state.respondReviewSuccess = false
        state.respondReviewError = false
      })
      .addCase(acceptReviewInvitation.fulfilled, state => {
        state.myReviewData = []
        state.respondReviewLoading = false
        state.respondReviewSuccess = true
        state.respondReviewError = false
      })
      .addCase(acceptReviewInvitation.rejected, (state, action) => {
        state.respondReviewLoading = false
        state.respondReviewSuccess = false
        state.respondReviewError = true
        state.getMyReviewStatsError = action.payload
      })
      .addCase(submitReview.pending, state => {
        state.submitReviewLoading = true
        state.submitReviewSuccess = false
        state.submitReviewError = false
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.submitReviewLoading = false
        state.submitReviewSuccess = true
        state.submitReviewError = false

        const index = state.myReviewData.findIndex(
          item => item._id === action.payload._id
        )
        if (index !== -1) {
          state.myReviewData.splice(index, 1)
        }
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.submitReviewLoading = false
        state.submitReviewSuccess = false
        state.submitReviewError = true
        state.getMyReviewStatsError = action.payload
      })

      .addCase(changeAbstractStatus.pending, state => {
        state.changeAbstractStatusLoading = true
        state.changeAbstractStatusSuccess = false
        state.changeAbstractStatusError = false
      })

      .addCase(changeAbstractStatus.fulfilled, (state, action) => {
        state.changeAbstractStatusLoading = false
        state.changeAbstractStatusSuccess = true
        state.changeAbstractStatusError = false
        const { id, status, paper_deadline } = action.payload

        const index = state.reviews.findIndex(item => item._id == id)
        if (index !== -1) {
          state.reviews[index].status = status
          state.reviews[index].paper_deadline = paper_deadline
        }
      })

      .addCase(changeAbstractStatus.rejected, (state, action) => {
        state.changeAbstractStatusLoading = false
        state.changeAbstractStatusSuccess = false
        state.changeAbstractStatusError = true
        state.getReviewStatsError = action.payload
      })
  }
})

export const { clearReviewStats } = adminSlice.actions
export default adminSlice.reducer
