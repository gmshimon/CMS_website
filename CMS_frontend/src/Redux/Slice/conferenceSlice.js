import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  conferences: [],
  singleConference: null,
  selectedConference: null,

  getConferenceLoading: false,
  getConferenceSuccess: false,
  getConferenceError: false,

  getSingleConferenceLoading: false,
  getSingleConferenceSuccess: false,
  getSingleConferenceError: false,

  createConferenceLoading: false,
  createConferenceSuccess: false,
  createConferenceError: false,

  editConferenceLoading: false,
  editConferenceSuccess: false,
  editConferenceError: false
}

export const getConference = createAsyncThunk(
  'getConference',
  async (status, { rejectWithValue }) => {
    try {
      const url = status ? `/conference?status=${status}` : '/conference'
      const response = await axios.get(url)
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

export const getSingleConference = createAsyncThunk(
  'getSingleConference',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/conference/${id}`)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while getting single conference'
      return rejectWithValue(message)
    }
  }
)

export const editConference = createAsyncThunk(
  'editConference',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.put(
        `/conference/update-conference/${id}`,
        data
      )
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while updating conference'
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

      state.getSingleConferenceLoading = false
      state.getSingleConferenceSuccess = false
      state.getSingleConferenceError = false

      state.createConferenceLoading = false
      state.createConferenceSuccess = false
      state.createConferenceError = false

      state.editConferenceLoading = false
      state.editConferenceSuccess = false
      state.editConferenceError = false
    },
    setSelectedConference: (state, action) => {
      state.selectedConference = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getConference.pending, state => {
        state.getConferenceLoading = true
        state.getConferenceSuccess = false
        state.getConferenceError = false
      })
      .addCase(getConference.fulfilled, (state, action) => {
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
      .addCase(createConference.pending, state => {
        state.createConferenceLoading = true
        state.createConferenceSuccess = false
        state.createConferenceError = false
      })
      .addCase(createConference.fulfilled, (state, action) => {
        state.conferences.push(action.payload)
        state.createConferenceLoading = false
        state.createConferenceSuccess = true
        state.createConferenceError = false
      })
      .addCase(createConference.rejected, state => {
        state.createConferenceLoading = false
        state.createConferenceSuccess = false
        state.createConferenceError = true
      })
      .addCase(getSingleConference.pending, state => {
        state.getSingleConferenceLoading = true
        state.getSingleConferenceSuccess = false
        state.getSingleConferenceError = false
      })
      .addCase(getSingleConference.fulfilled, (state, action) => {
        state.singleConference = action.payload
        state.getSingleConferenceLoading = false
        state.getSingleConferenceSuccess = true
        state.getSingleConferenceError = false
      })
      .addCase(getSingleConference.rejected, state => {
        state.getSingleConferenceLoading = false
        state.getSingleConferenceSuccess = false
        state.getSingleConferenceError = true
      })
      .addCase(editConference.pending, state => {
        state.editConferenceLoading = true
        state.editConferenceSuccess = false
        state.editConferenceError = false
      })
      .addCase(editConference.fulfilled, (state, action) => {
        const updatedConferences = state.conferences.map(conference =>
          conference._id === action.payload._id ? action.payload : conference
        )

        state.conferences = updatedConferences
        state.singleConference = action.payload
        state.editConferenceLoading = false
        state.editConferenceSuccess = true
        state.editConferenceError = false
      })
      .addCase(editConference.rejected, state => {
        state.editConferenceLoading = false
        state.editConferenceSuccess = false
        state.editConferenceError = true
      })
  }
})

export const { reset, setSelectedConference } = conferenceSlice.actions
export default conferenceSlice.reducer
