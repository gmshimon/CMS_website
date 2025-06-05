import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  papers: [],

  createPostPaperLoading: false,
  createPostPaperSuccess: false,
  createPostPaperError: false,

  getPaperLoading: false,
  getPaperSuccess: false,
  getPaperError: false
}

export const postPaper = createAsyncThunk(
  'postPaper',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post(`/paper/create-paper/${id}`, data)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message || 'An error occurred while posting paper'

      return rejectWithValue(message)
    }
  }
)
export const getPaper = createAsyncThunk(
  'getPaper',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get(`/paper/${id}`)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while getting paper list'

      return rejectWithValue(message)
    }
  }
)

const paperSlice = createSlice({
  name: 'paper',
  initialState,
  reducers: {
    paperReset: state => {
      state.createPostPaperLoading = false
      state.createPostPaperSuccess = false
      state.createPostPaperError = false

      state.getPaperLoading = false
      state.getPaperSuccess = false
      state.getPaperError = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(postPaper.pending, state => {
        state.createPostPaperLoading = true
        state.createPostPaperSuccess = false
        state.createPostPaperError = false
      })
      .addCase(postPaper.fulfilled, (state, action) => {
        state.createPostPaperLoading = false
        state.createPostPaperSuccess = true
        state.createPostPaperError = false
        state.papers.push(action.payload)
      })
      .addCase(postPaper.rejected, state => {
        state.createPostPaperLoading = false
        state.createPostPaperSuccess = false
        state.createPostPaperError = true
      })

      .addCase(getPaper.pending, state => {
        state.getPaperLoading = true
        state.getPaperSuccess = false
        state.getPaperError = false
      })
      .addCase(getPaper.fulfilled, (state,action) => {
        state.papers = action.payload
        state.getPaperLoading = false
        state.getPaperSuccess = true
        state.getPaperError = false
      })
      .addCase(getPaper.rejected, state => {
        state.getPaperLoading = false
        state.getPaperSuccess = false
        state.getPaperError = true
      })
  }
})


export const{paperReset} = paperSlice.actions

export default paperSlice.reducer