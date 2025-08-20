/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'
import auth from '../../Firebase/firebase.config.js'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'

const initialState = {
  user: null,
  roles: null,
  isLoading: false,
  isLoginLoading: false,
  isLoginSuccess: false,
  isLoginError: false,
  isCreateUserLoading: false,
  isCreateUserSuccess: false,
  isCreateUserError: false,
  isUpdateUserLoading: false,
  isUpdateUserSuccess: false,
  isUpdateUserError: false,
  isGetUserDataLoading: true,
  isGetUserDataSuccess: false,
  isGetUserDataError: false,
  isGetUsersLoading: false,
  isGetUsersSuccess: false,
  isGetUsersError: false,
  getRoleLoading: false,
  getRoleSuccess: false,
  getRoleError: false,
  sendResetPasswordLoading: false,
  sendResetPasswordSuccess: false,
  sendResetPasswordError: false
}

// Save user data in backend and localStorage
export const saveUserData = async userData => {
  const response = await axios.post('user/', userData)
  const data = response.data.data
  const tokenExpiration = new Date().getTime() + 3 * 60 * 60 * 1000 // 3 hours
  localStorage.setItem(
    'userToken',
    JSON.stringify({
      access_token: response.data.token,
      expiration: tokenExpiration
    })
  )
  return data
}

// Firebase login
export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const data = await saveUserData({
      name: res?.user?.displayName,
      email: email
    })
    return data
  }
)

// Firebase user creation
export const createUser = createAsyncThunk('createUser', async formdata => {
  const email = formdata.get('email')
  const password = formdata.get('password')
  const name = formdata.get('name')
  const res = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(auth.currentUser, { displayName: name })
  const data = await saveUserData(formdata)
  return data
})

// Fetch single user
export const fetchUser = createAsyncThunk('fetchUser', async email => {
  const response = await axios.post(`/user/get-user`, { email })
  return response.data.data
})

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.put('/user/update-profile', data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const updateImage = createAsyncThunk(
  'updateImage',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.put('/user/update-image', data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

// Logout
export const logOut = createAsyncThunk('logOut', async () => {
  await signOut(auth)
  localStorage.removeItem('userToken')
})

// Get roles
export const getRole = createAsyncThunk('getRole', async () => {
  const response = await axios.get('/role')
  return response.data.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false

      state.isLoginLoading = false
      state.isLoginSuccess = false
      state.isLoginError = false

      state.isCreateUserLoading = false
      state.isCreateUserSuccess = false
      state.isCreateUserError = false

      state.isUpdateUserLoading = false
      state.isUpdateUserSuccess = false
      state.isUpdateUserError = false

      state.isGetUserDataLoading = true
      state.isGetUserDataSuccess = false
      state.isGetUserDataError = false

      state.isGetUsersLoading = false
      state.isGetUsersSuccess = false
      state.isGetUsersError = false

      state.getRoleLoading = false
      state.getRoleSuccess = false
      state.getRoleError = false

      state.sendResetPasswordLoading = false
      state.sendResetPasswordSuccess = false
      state.sendResetPasswordError = false
    },
    startLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setUser: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    logout: state => {
      state.user = null
      localStorage.removeItem('userToken')
    }
  },
  extraReducers: builder => {
    builder
      // Login User
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true
        state.isLoginSuccess = false
        state.isLoginError = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoginLoading = false
        state.isLoginSuccess = true
        state.isLoginError = false
      })
      .addCase(loginUser.rejected, state => {
        state.isLoginLoading = false
        state.isLoginError = true
        state.isLoginSuccess = false
      })

      // Create User
      .addCase(createUser.pending, state => {
        state.isCreateUserLoading = true
        state.isCreateUserError = false
        state.isCreateUserSuccess = false
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isCreateUserLoading = false
        state.isCreateUserSuccess = true
        state.isCreateUserError = false
      })
      .addCase(createUser.rejected, state => {
        state.isCreateUserLoading = false
        state.isCreateUserSuccess = false
        state.isCreateUserError = true
      })

      // Fetch User
      .addCase(fetchUser.pending, state => {
        state.isGetUserDataLoading = true
        state.isGetUserDataSuccess = false
        state.isGetUserDataError = false
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = true
        state.isGetUserDataError = false
      })
      .addCase(fetchUser.rejected, state => {
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = false
        state.isGetUserDataError = true
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, state => {
        state.isUpdateUserLoading = true
        state.isUpdateUserSuccess = false
        state.isUpdateUserError = false
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload
        state.isUpdateUserLoading = false
        state.isUpdateUserSuccess = true
        state.isUpdateUserError = false
      })
      .addCase(updateUserProfile.rejected, state => {
        state.isUpdateUserLoading = false
        state.isUpdateUserSuccess = false
        state.isUpdateUserError = true
      })

      // Update User image
      .addCase(updateImage.pending, state => {
        state.isUpdateUserLoading = true
        state.isUpdateUserSuccess = false
        state.isUpdateUserError = false
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        state.user.photo = action.payload
        state.isUpdateUserLoading = false
        state.isUpdateUserSuccess = true
        state.isUpdateUserError = false
      })
      .addCase(updateImage.rejected, state => {
        state.isUpdateUserLoading = false
        state.isUpdateUserSuccess = false
        state.isUpdateUserError = true
      })

      // Logout
      .addCase(logOut.fulfilled, state => {
        state.user = null
      })

      // Get Roles
      .addCase(getRole.pending, state => {
        state.getRoleLoading = true
        state.getRoleSuccess = false
        state.getRoleError = false
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.roles = action.payload
        state.getRoleLoading = false
        state.getRoleSuccess = true
        state.getRoleError = false
      })
      .addCase(getRole.rejected, state => {
        state.getRoleLoading = false
        state.getRoleSuccess = false
        state.getRoleError = true
      })

      .addCase(resetPassword.pending, state => {
        state.sendResetPasswordLoading = true
        state.sendResetPasswordSuccess = false
        state.sendResetPasswordError = false
      })
      .addCase(resetPassword.fulfilled, state => {
        state.sendResetPasswordLoading = false
        state.sendResetPasswordSuccess = true
        state.sendResetPasswordError = false
      })
      .addCase(resetPassword.rejected, state => {
        state.sendResetPasswordLoading = false
        state.sendResetPasswordSuccess = false
        state.sendResetPasswordError = true
      })
  }
})

export const { reset, setUser, logout, startLoading } = userSlice.actions
export default userSlice.reducer
