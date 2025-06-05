import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slice/AuthSlice'
import abstractSlice from './Slice/AbstractSlice'
import conferenceSlice from './Slice/conferenceSlice'
import conferenceRegSlice from './Slice/Conference_regSlice'
import paperSlice from './Slice/PaperSlice'

export const store = configureStore({
    reducer: {
        user:userSlice,
        abstract:abstractSlice,
        conference:conferenceSlice,
        conferenceReg:conferenceRegSlice,
        paper:paperSlice
    }, // Define your reducers here
})

