/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  reviewStats: null,
  reviews: [],
  isGetReviewStatsLoading: false,
  isGetReviewStatsSuccess: false,
  isGetReviewStatsError: false,

  isGetAbstractReviewLoading: false,
  isGetAbstractReviewSuccess: false,
  isGetAbstractReviewError: false,

  assigningReviewerLoading: false,
  assigningReviewerSuccess: false,
  assigningReviewerError: false,

  getReviewStatsError: null
}
export const fetchReviewStats = createAsyncThunk(
  'admin/fetchReviewStats',
  async (year, { rejectWithValue }) => {
    try {
      const query = year ? `?year=${year}` : ''
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
      const { category } = data
      console.log(category)
      const query = category ? `?category=${category}` : ''
      const response = await axiosSecure.get(`/review/abstract${query}`)
      return response.data.data
    } catch (error) {
      rejectWithValue(error.response.data.message)
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
      rejectWithValue(error.response.data.message)
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

      .addCase(assignReviewer.pending,state=>{
      state.assigningReviewerLoading = true
      state.assigningReviewerSuccess = false
      state.assigningReviewerError = false
      })
      .addCase(assignReviewer.fulfilled,state=>{
      state.assigningReviewerLoading = false
      state.assigningReviewerSuccess = true
      state.assigningReviewerError = false
      })
      .addCase(assignReviewer.rejected,(state,action)=>{
      state.assigningReviewerLoading = false
      state.assigningReviewerSuccess = false
      state.assigningReviewerError = true
      state.getReviewStatsError = action.payload
      })
  }
})

export const { clearReviewStats } = adminSlice.actions
export default adminSlice.reducer
