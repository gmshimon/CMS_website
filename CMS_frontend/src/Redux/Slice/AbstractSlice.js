import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from '../../Utilis/axios.js'
import axiosSecure from '../../Utilis/axiosSecure.js'

const initialState = {
  abstracts: [],
  conference: null,
  member_id: null,
  theme: null,
  presentation_method: null,
  publication_options: null,
  paper_title: null,
  abstract: null,
  keywords: null,
  presentation_video_link: null,
  graphical_abstract: null,
  video_abstract: null,
  presentation_profile_picture: null,
  researchGate_link: null,
  orcid_link: null,
  google_scholar_link: null,
  presenter_name: null,
  presenter_email: null,
  organization: null,
  department: null,
  country: null,
  contact_number: null,
  mailing_address: null,
  presenter_status: null,
  authors: [],
  conference_registration: {},

  createAbstractLoading: false,
  createAbstractSuccess: false,
  createAbstractError: false,

  getAbstractLoading: false,
  getAbstractSuccess: false,
  getAbstractError: false
}

export const createAbstract = createAsyncThunk(
  'abstract/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post('/abstract/create-abstract', data)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while creating abstract'
      return rejectWithValue(message)
    }
  }
)

export const getAbstract = createAsyncThunk(
  'createAbstract',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get(`/abstract/${id}`)
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while fetching abstract'
      return rejectWithValue(message)
    }
  }
)

const abstractSlice = createSlice({
  name: 'abstract',
  initialState,
  reducers: {
    // reset the flags
    reset: state => {
      state.createAbstractLoading = false
      state.createAbstractSuccess = false
      state.createAbstractError = false
      state.getAbstractLoading = false
      state.getAbstractSuccess = false
      state.getAbstractError = false
    },

    // setters for each field
    setAbstracts: (state, { payload }) => {
      state.abstracts = payload
    },
    setConference: (state, { payload }) => {
      state.conference = payload
    },
    setMemberId: (state, { payload }) => {
      state.member_id = payload
    },
    setTheme: (state, { payload }) => {
      state.theme = payload
    },
    setPresentationMethod: (state, { payload }) => {
      state.presentation_method = payload
    },
    setPublicationOptions: (state, { payload }) => {
      state.publication_options = payload
    },
    setPaperTitle: (state, { payload }) => {
      state.paper_title = payload
    },
    setAbstract: (state, { payload }) => {
      state.abstract = payload
    },
    setKeywords: (state, { payload }) => {
      state.keywords = payload
    },
    setPresentationVideoLink: (state, { payload }) => {
      state.presentation_video_link = payload
    },
    setGraphicalAbstract: (state, { payload }) => {
      state.graphical_abstract = payload
    },
    setVideoAbstract: (state, { payload }) => {
      state.video_abstract = payload
    },
    setPresentationProfilePicture: (state, { payload }) => {
      state.presentation_profile_picture = payload
    },
    setResearchGateLink: (state, { payload }) => {
      state.researchGate_link = payload
    },
    setOrcidLink: (state, { payload }) => {
      state.orcid_link = payload
    },
    setGoogleScholarLink: (state, { payload }) => {
      state.google_scholar_link = payload
    },
    setPresenterName: (state, { payload }) => {
      state.presenter_name = payload
    },
    setPresenterEmail: (state, { payload }) => {
      state.presenter_email = payload
    },
    setOrganization: (state, { payload }) => {
      state.organization = payload
    },
    setDepartment: (state, { payload }) => {
      state.department = payload
    },
    setCountry: (state, { payload }) => {
      state.country = payload
    },
    setContactNumber: (state, { payload }) => {
      state.contact_number = payload
    },
    setMailingAddress: (state, { payload }) => {
      state.mailing_address = payload
    },
    setPresenterStatus: (state, { payload }) => {
      state.presenter_status = payload
    },
    setAbstractAuthors: (state, { payload }) => {
      state.authors = payload
    },
    setConferenceRegistration: (state, { payload }) => {
      state.conference_registration = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createAbstract.pending, state => {
        state.createAbstractLoading = true
        state.createAbstractSuccess = false
        state.createAbstractError = false
      })
      .addCase(createAbstract.fulfilled, (state, action) => {
        state.abstracts.push(action.payload)
        state.createAbstractLoading = false
        state.createAbstractSuccess = true
        state.createAbstractError = false
      })
      .addCase(createAbstract.rejected, state => {
        state.createAbstractLoading = false
        state.createAbstractError = true
        state.createAbstractSuccess = false
      })
      .addCase(getAbstract.pending, state => {
        state.getAbstractLoading = true
        state.getAbstractSuccess = false
        state.getAbstractError = false
      })
      .addCase(getAbstract.fulfilled, (state, action) => {
        state.abstracts = action.payload
        state.getAbstractLoading = false
        state.getAbstractSuccess = true
        state.getAbstractError = false
      })
      .addCase(getAbstract.rejected, state => {
        state.getAbstractLoading = false
        state.getAbstractSuccess = false
        state.getAbstractError = true
      })
  }
})

export const {
  reset,
  setAbstracts,
  setConference,
  setMemberId,
  setTheme,
  setPresentationMethod,
  setPublicationOptions,
  setPaperTitle,
  setAbstract,
  setKeywords,
  setPresentationVideoLink,
  setGraphicalAbstract,
  setVideoAbstract,
  setPresentationProfilePicture,
  setResearchGateLink,
  setOrcidLink,
  setGoogleScholarLink,
  setPresenterName,
  setPresenterEmail,
  setOrganization,
  setDepartment,
  setCountry,
  setContactNumber,
  setMailingAddress,
  setPresenterStatus,
  setAbstractAuthors,
  setConferenceRegistration
} = abstractSlice.actions

export default abstractSlice.reducer
