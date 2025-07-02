/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
    users:[],
  adminErrorMessage: null,
  isAdminCreateUserLoading: false,
  isAdminCreateUserSuccess: false,
  isAdminCreateUserError: false
}

export const adminCreateUser = createAsyncThunk(
  'adminCreateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post('/admin/create-user', data)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while creating abstract'
      return rejectWithValue(message)
    }
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: state => {
      state.adminErrorMessage = null
      state.isAdminCreateUserLoading = false
      state.isAdminCreateUserSuccess = false
      state.isAdminCreateUserError = false
    }
  },
  extraReducers: builder => {
    builder
    .addCase(adminCreateUser.pending, state => {
      state.isAdminCreateUserLoading = true
      state.isAdminCreateUserSuccess = false
      state.isAdminCreateUserError = false
    })
    .addCase(adminCreateUser.fulfilled, (state,action) => {
      state.isAdminCreateUserLoading = false
      state.isAdminCreateUserSuccess = true
      state.isAdminCreateUserError = false
      state.users.push(action.payload)
    })
    .addCase(adminCreateUser.rejected, (state,action) => {
      state.isAdminCreateUserLoading = false
      state.isAdminCreateUserSuccess = false
      state.isAdminCreateUserError = true
      state.adminErrorMessage = action.payload
    })
  }
})
export const { reset } = adminSlice.actions
export default adminSlice.reducer