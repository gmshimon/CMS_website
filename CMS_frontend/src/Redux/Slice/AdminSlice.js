/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  users: [],
  reviewers: [],
  session_chairs: [],
  adminErrorMessage: null,
  isAdminCreateUserLoading: false,
  isAdminCreateUserSuccess: false,
  isAdminCreateUserError: false,
  isGetReviewersUserLoading: false,
  isGetReviewersUserSuccess: false,
  isGetReviewersUserError: false,
  isDeleteUserLoading: false,
  isDeleteUserSuccess: false,
  isDeleteUserError: false,
  isUpdateUserLoading: false,
  isUpdateUserSuccess: false,
  isUpdateUserError: false
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

export const getRoleBasedUser = createAsyncThunk(
  'getRoleBasedUser',
  async ({ data, role }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/admin/get/${role}`, data)
      return {
        data: response.data.data,
        role
      }
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

export const updateUser = createAsyncThunk(
  'updateUser',
  async ({ data, role }, { rejectWithValue }) => {
    console.log('updateUser called', { data, role })
    try {
      const response = await axios.put(`/admin/update/user/`, data)
      return { data: response.data.data, role }
    } catch (error) {
      const message =
        error.response?.data?.message || 'An error occurred while updating user'
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

      state.isUpdateUserLoading = false
      state.isUpdateUserSuccess = false
      state.isUpdateUserError = false
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
      .addCase(getRoleBasedUser.pending, state => {
        state.isGetReviewersUserLoading = true
        state.isGetReviewersUserSuccess = false
        state.isGetReviewersUserError = false
      })
      .addCase(getRoleBasedUser.fulfilled, (state, action) => {
        state.isGetReviewersUserLoading = false
        state.isGetReviewersUserSuccess = true
        state.isGetReviewersUserError = false
        const { data, role } = action.payload
        if (role == 'Reviewer') {
          state.reviewers = data
        } else if (role == 'Session Chair') {
          state.session_chairs = data
        }
      })
      .addCase(getRoleBasedUser.rejected, (state, action) => {
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
        if (role === 'Reviewer') {
          state.reviewers = state.reviewers.filter(user => user._id !== id)
        } else if (role === 'Session Chair') {
          state.session_chairs = state.reviewers.filter(user => user._id !== id)
        }
        state.users = state.users.filter(user => user._id !== id)
      })
      .addCase(deleteUserFromDb.rejected, (state, action) => {
        state.isDeleteUserLoading = false
        state.isDeleteUserSuccess = false
        state.isDeleteUserError = true
        state.adminErrorMessage = action.payload
      })
      .addCase(updateUser.pending, state => {
        state.isUpdateUserLoading = true
        state.isUpdateUserSuccess = false
        state.isUpdateUserError = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdateUserLoading = false
        state.isUpdateUserSuccess = true
        state.isUpdateUserError = false

        const { data, role } = action.payload
        if (role === 'Reviewer') {
          const index = state.reviewers.findIndex(r => r._id === data._id)
          if (index !== -1) {
            state.reviewers[index] = {
              ...state.reviewers[index],
              title: data.title,
              position: data.position,
              affiliation: data.affiliation,
              contact: data.contact,
              orcid: data.orcid
            }
          }
        } else if (role === 'Session Chair') {
          const index = state.session_chairs.findIndex(r => r._id === data._id)
          if (index !== -1) {
            state.session_chairs[index] = {
              ...state.session_chairs[index],
              title: data.title,
              position: data.position,
              affiliation: data.affiliation,
              contact: data.contact,
              orcid: data.orcid,
              chair_bio: data.chair_bio
            }
          }
        }
      })
      .addCase(updateUser.rejected, state => {
        state.isUpdateUserLoading = false
        state.isUpdateUserSuccess = false
        state.isUpdateUserError = true
      })
  }
})
export const { reset } = adminSlice.actions
export default adminSlice.reducer
