/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  users: [],
  reviewers: [],
  adminErrorMessage: null,
  isAdminCreateUserLoading: false,
  isAdminCreateUserSuccess: false,
  isAdminCreateUserError: false,
  isGetReviewersUserLoading: false,
  isGetReviewersUserSuccess: false,
  isGetReviewersUserError: false,
  isDeleteUserLoading: false,
  isDeleteUserSuccess: false,
  isDeleteUserError: false
}

export const adminCreateUser = createAsyncThunk(
  'adminCreateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/admin/create-user', data)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while creating abstract'
      return rejectWithValue(message)
    }
  }
)

export const getReviewersUser = createAsyncThunk(
  'getReviewersUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get('/admin/get/reviewer', data)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while fetching reviewers'
      return rejectWithValue(message)
    }
  }
)

export const deleteUserFromDb = createAsyncThunk(
  'deleteUserFromDb',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/admin/delete/user/${id}`)
      return { id, role }
    } catch (error) {
      const message =
        error.response?.data?.message || 'An error occurred while deleting user'
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

      state.isGetReviewersUserLoading = false
      state.isGetReviewersUserSuccess = false
      state.isGetReviewersUserError = false

      state.isDeleteUserLoading = false
      state.isDeleteUserSuccess = false
      state.isDeleteUserError = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(adminCreateUser.pending, state => {
        state.isAdminCreateUserLoading = true
        state.isAdminCreateUserSuccess = false
        state.isAdminCreateUserError = false
      })
      .addCase(adminCreateUser.fulfilled, (state, action) => {
        state.isAdminCreateUserLoading = false
        state.isAdminCreateUserSuccess = true
        state.isAdminCreateUserError = false
        state.users.push(action.payload)
      })
      .addCase(adminCreateUser.rejected, (state, action) => {
        state.isAdminCreateUserLoading = false
        state.isAdminCreateUserSuccess = false
        state.isAdminCreateUserError = true
        state.adminErrorMessage = action.payload
      })
      .addCase(getReviewersUser.pending, state => {
        state.isGetReviewersUserLoading = true
        state.isGetReviewersUserSuccess = false
        state.isGetReviewersUserError = false
      })
      .addCase(getReviewersUser.fulfilled, (state, action) => {
        state.isGetReviewersUserLoading = false
        state.isGetReviewersUserSuccess = true
        state.isGetReviewersUserError = false
        state.reviewers = action.payload
      })
      .addCase(getReviewersUser.rejected, (state, action) => {
        state.isGetReviewersUserLoading = false
        state.isGetReviewersUserSuccess = false
        state.isGetReviewersUserError = true
        state.adminErrorMessage = action.payload
      })
      .addCase(deleteUserFromDb.pending, state => {
        state.isDeleteUserLoading = true
        state.isDeleteUserSuccess = false
        state.isDeleteUserError = false
      })
      .addCase(deleteUserFromDb.fulfilled, (state, action) => {
        state.isDeleteUserLoading = false
        state.isDeleteUserSuccess = true
        state.isDeleteUserError = false
        const { id, role } = action.payload
        if (role === 'reviewers') {
          state.reviewers = state.reviewers.filter(user => user._id !== id)
        }
        state.users = state.users.filter(user => user._id !== id)
      })
      .addCase(deleteUserFromDb.rejected, (state, action) => {
        state.isDeleteUserLoading = false
        state.isDeleteUserSuccess = false
        state.isDeleteUserError = true
        state.adminErrorMessage = action.payload
      })
  }
})
export const { reset } = adminSlice.actions
export default adminSlice.reducer
