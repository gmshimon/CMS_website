/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  reviewStats: null,
  isGetReviewStatsLoading: false,
  isGetReviewStatsSuccess: false,
  isGetReviewStatsError: false,
  getReviewStatsError: null
}
export const fetchReviewStats = createAsyncThunk(
  'admin/fetchReviewStats',
  async (year, { rejectWithValue }) => {
    try {
      const query = year ? `?year=${year}` : ''
      const response = await axiosSecure.get(
        `/review/review-stats?${query}`
      )
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

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearReviewStats (state) {
      state.isGetReviewStatsLoading = false
      state.isGetReviewStatsSuccess = false
      state.isGetReviewStatsError = false
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
  }
})

export const { clearReviewStats } = adminSlice.actions
export default adminSlice.reducer
