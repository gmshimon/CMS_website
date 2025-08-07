/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  dashboardStats:[],
  roleCounts: {},
  users: [],
  reviewers: [],
  session_chairs: [],
  keynote_speakers: [],
  presentationStats: [],
  moderators: [],
  scientificCommittee: [],
  technicalCommittee: [],
  registrationCommittee: [],
  selectedYear: null,
  adminErrorMessage: null,
  isAdminCreateUserLoading: false,
  isAdminCreateUserSuccess: false,
  isAdminCreateUserError: false,
  isGetUserLoading: false,
  isGetUserSuccess: false,
  isGetUserError: false,
  isDeleteUserLoading: false,
  isDeleteUserSuccess: false,
  isDeleteUserError: false,
  isUpdateUserLoading: false,
  isUpdateUserSuccess: false,
  isUpdateUserError: false,
  getPresentationStatsLoading: false,
  getPresentationStatsSuccess: false,
  getPresentationStatsError: false,
  getAdminDashboardLoading: false,
  getAdminDashboardSuccess: false,
  getAdminDashboardError: false
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

export const getUserRoleCounts = createAsyncThunk(
  'getUserRoleCounts',
  async (year, { rejectWithValue }) => {
    try {
      const query = year ? `?year=${year}` : ''
      const response = await axios.get(`/admin/total-user${query}`)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while getting total user'
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

export const deleteUserImage = createAsyncThunk(
  'deleteUserImage',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/admin/delete/user-image/${id}`)
      return {
        id,
        role
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while deleting user image'
      return rejectWithValue(message)
    }
  }
)
export const updateUserImage = createAsyncThunk(
  'updateUserImage',
  async ({ id, role, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/admin/update/user-image/${id}`, data)
      return {
        id,
        data: response.data.data,
        role
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while updating user image'
      return rejectWithValue(message)
    }
  }
)

export const getPresentationMethodStats = createAsyncThunk(
  'getPresentationMethodStats',
  async (year, { rejectWithValue }) => {
    try {
      const query = year ? `?year=${year}` : ''
      const response = await axiosSecure.get(
        `/admin/presentation-stats/${query}`
      )
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while updating user image'
      return rejectWithValue(message)
    }
  }
)

export const adminDashboardStats = createAsyncThunk(
  'adminDashboardStats',
  async (conferenceId=null, { rejectWithValue }) => {
    try {
      const query = conferenceId ? `?conferenceId=${conferenceId}` : ''
      const response = await axiosSecure.get(`/admin/dashboard${query}`)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while updating user image'
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

      state.isGetUserLoading = false
      state.isGetUserSuccess = false
      state.isGetUserError = false

      state.isDeleteUserLoading = false
      state.isDeleteUserSuccess = false
      state.isDeleteUserError = false

      state.isUpdateUserLoading = false
      state.isUpdateUserSuccess = false
      state.isUpdateUserError = false

      state.getPresentationStatsLoading = false
      state.getPresentationStatsSuccess = false
      state.getPresentationStatsError = false

      state.getAdminDashboardLoading = false
      state.getAdminDashboardSuccess = false
      state.getAdminDashboardError = false
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload
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
        state.isGetUserLoading = true
        state.isGetUserSuccess = false
        state.isGetUserError = false
      })
      .addCase(getRoleBasedUser.fulfilled, (state, action) => {
        state.isGetUserLoading = false
        state.isGetUserSuccess = true
        state.isGetUserError = false
        const { data, role } = action.payload
        if (role == 'Reviewer') {
          state.reviewers = data
        } else if (role == 'Session Chair') {
          state.session_chairs = data
        } else if (role === 'Keynote Speaker') {
          state.keynote_speakers = data
        } else if (role === 'Moderator') {
          state.moderators = data
        } else if (role === 'scientific_committee') {
          state.scientificCommittee = data
        } else if (role === 'technical_committee') {
          state.technicalCommittee = data
        } else if (role === 'registration_committee') {
          state.registrationCommittee = data
        }
      })
      .addCase(getUserRoleCounts.pending, state => {
        state.isGetUserLoading = true
        state.isGetUserSuccess = false
        state.isGetUserError = false
      })
      .addCase(getUserRoleCounts.fulfilled, (state, action) => {
        state.isGetUserLoading = false
        state.isGetUserSuccess = true
        state.isGetUserError = false
        state.roleCounts = action.payload
      })
      .addCase(getUserRoleCounts.rejected, (state, action) => {
        state.isGetUserLoading = false
        state.isGetUserSuccess = false
        state.isGetUserError = true
        state.adminErrorMessage = action.payload
      })
      .addCase(getRoleBasedUser.rejected, (state, action) => {
        state.isGetUserLoading = false
        state.isGetUserSuccess = false
        state.isGetUserError = true
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
        } else if (role === 'Keynote Speaker') {
          const index = state.keynote_speakers.findIndex(
            r => r._id === data._id
          )
          if (index !== -1) {
            state.keynote_speakers[index] = {
              ...state.keynote_speakers[index],
              title: data.title,
              position: data.position,
              affiliation: data.affiliation,
              contact: data.contact,
              talk_title: data.talk_title,
              talk_abstract: data.talk_abstract,
              speaker_bio: data.speaker_bio,
              orcid: data.orcid
            }
          }
        } else if (role === 'Moderator') {
          const index = state.moderators.findIndex(r => r._id === data._id)
          if (index !== -1) {
            state.moderators[index] = {
              ...state.moderators[index],
              name: data.name,
              position: data.position,
              affiliation: data.affiliation,
              contact: data.contact,
              faculty: data.faculty,
              country: data.country,
              orcid: data.orcid
            }
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdateUserLoading = false
        state.isUpdateUserSuccess = false
        state.isUpdateUserError = true
        state.adminErrorMessage = action.payload
      })
      .addCase(deleteUserImage.pending, state => {
        state.isDeleteUserLoading = true
        state.isDeleteUserSuccess = false
        state.isDeleteUserError = false
      })
      .addCase(deleteUserImage.fulfilled, (state, action) => {
        state.isDeleteUserLoading = false
        state.isDeleteUserSuccess = true
        state.isDeleteUserError = false

        const { id, role } = action.payload

        if (role === 'Keynote Speaker') {
          const index = state.keynote_speakers.findIndex(r => r._id === id._id)
          if (index !== -1) {
            state.keynote_speakers[index] = {
              photo: null
            }
          }
        }
      })
      .addCase(deleteUserImage.rejected, (state, action) => {
        state.isDeleteUserLoading = false
        state.isDeleteUserSuccess = false
        state.isDeleteUserError = true
        state.adminErrorMessage = action.payload
      })
      .addCase(updateUserImage.pending, state => {
        state.isUpdateUserLoading = true
        state.isUpdateUserSuccess = false
        state.isUpdateUserError = false
      })
      .addCase(updateUserImage.fulfilled, (state, action) => {
        state.isUpdateUserLoading = false
        state.isUpdateUserSuccess = true
        state.isUpdateUserError = false

        const { id, data, role } = action.payload
        if (role === 'Keynote Speaker') {
          const index = state.keynote_speakers.findIndex(r => r._id === id._id)
          if (index !== -1) {
            state.keynote_speakers[index] = data
          }
        }
      })
      .addCase(updateUserImage.rejected, (state, action) => {
        state.isUpdateUserLoading = false
        state.isUpdateUserSuccess = false
        ;(state.isUpdateUserError = true),
          (state.adminErrorMessage = action.payload)
      })

      .addCase(getPresentationMethodStats.pending, state => {
        state.getPresentationStatsLoading = true
        state.getPresentationStatsSuccess = false
        state.getPresentationStatsError = false
      })
      .addCase(getPresentationMethodStats.fulfilled, (state, action) => {
        state.getPresentationStatsLoading = false
        state.getPresentationStatsSuccess = true
        state.getPresentationStatsError = false
        state.presentationStats = action.payload
      })
      .addCase(getPresentationMethodStats.rejected, state => {
        state.getPresentationStatsLoading = false
        state.getPresentationStatsSuccess = false
        state.getPresentationStatsError = true
      })
      .addCase(adminDashboardStats.pending, state => {
        state.getAdminDashboardLoading = true
        state.getAdminDashboardSuccess = false
        state.getAdminDashboardError = false
      })
      .addCase(adminDashboardStats.fulfilled, (state,action) => {
        state.dashboardStats = action.payload
        state.getAdminDashboardLoading = false
        state.getAdminDashboardSuccess = true
        state.getAdminDashboardError = false
      })
      .addCase(adminDashboardStats.rejected, (state,action) => {
        state.getAdminDashboardLoading = false
        state.getAdminDashboardSuccess = false
        state.getAdminDashboardError = true
      })
  }
})
export const { reset, setSelectedYear } = adminSlice.actions
export default adminSlice.reducer
