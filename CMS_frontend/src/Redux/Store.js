import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slice/AuthSlice'
import abstractSlice from './Slice/AbstractSlice'
import conferenceSlice from './Slice/conferenceSlice'
import conferenceRegSlice from './Slice/conference_regSlice'
import paperSlice from './Slice/PaperSlice'
import notificationSlice from './Slice/notificationSlice'
import adminSlice from './Slice/AdminSlice'
import reviewSlice from './Slice/ReviewSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    abstract: abstractSlice,
    conference: conferenceSlice,
    conferenceReg: conferenceRegSlice,
    paper: paperSlice,
    notifications: notificationSlice,
    admin: adminSlice,
    review: reviewSlice
  } // Define your reducers here
})
