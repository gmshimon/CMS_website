import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  conferences: [],

  getConferenceLoading: false,
  getConferenceSuccess: false,
  getConferenceError: false,

  createConferenceLoading: false,
  createConferenceSuccess: false,
  createConferenceError: false
}

export const getConference = createAsyncThunk(
  'getConference',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/conference')
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while getting conference'

      return rejectWithValue(message)
    }
  }
)

export const createConference = createAsyncThunk(
  'createConference',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post(
        '/conference/create-conference',
        data
      )
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while getting conference'

      return rejectWithValue(message)
    }
  }
)

const conferenceSlice = createSlice({
  name: 'conference',
  initialState,
  reducers: {
    reset: state => {
      state.getConferenceLoading = false
      state.getConferenceSuccess = false
      state.getConferenceError = false

      state.createConferenceLoading = false
      state.createConferenceSuccess = false
      state.createConferenceError = false
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getConference.pending, state => {
      state.getConferenceLoading = true
      state.getConferenceSuccess = false
      state.getConferenceError = false
    })
    .addCase(getConference.fulfilled, (state,action) => {
      state.getConferenceLoading = false
      state.getConferenceSuccess = true
      state.getConferenceError = false
      state.conferences = action.payload
    })
    .addCase(getConference.rejected, state => {
      state.getConferenceLoading = false
      state.getConferenceSuccess = false
      state.getConferenceError = true
    })
    .addCase(createConference.pending,state=>{
      state.createConferenceLoading = true
      state.createConferenceSuccess = false
      state.createConferenceError = false
    })
    .addCase(createConference.fulfilled,(state,action)=>{
      state.conferences.push(action.payload)
      state.createConferenceLoading = false
      state.createConferenceSuccess = true
      state.createConferenceError = false
    })
    .addCase(createConference.rejected,(state)=>{
      state.createConferenceLoading = false
      state.createConferenceSuccess = false
      state.createConferenceError = true
    })
  }
})

export const { reset } = conferenceSlice.actions
export default conferenceSlice.reducer
