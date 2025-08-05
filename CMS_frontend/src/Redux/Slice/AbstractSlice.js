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
  getAbstractError: false,

  editAbstractLoading: false,
  editAbstractSuccess: false,
  editAbstractError: false,

  changeAbstractDecisionLoading: false,
  changeAbstractDecisionSuccess: false,
  changeAbstractDecisionError: false
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

export const getAbstractByCategory = createAsyncThunk(
  'getAbstractByCategory',
  async ({ conference_id, presentation_method }, { rejectWithValue }) => {
    try {
      let query = ''
      const params = []
      if (conference_id) params.push(`conference_id=${conference_id}`)
      if (presentation_method)
        params.push(`presentation_method=${presentation_method}`)
      if (params.length) query = '?' + params.join('&')

      const response = await axiosSecure.get(
        `/abstract/get-abstract-category${query}`
      )
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while fetching abstracts by category'
      return rejectWithValue(message)
    }
  }
)

export const changeAbstractDecision = createAsyncThunk(
  'changeAbstractStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await axiosSecure.post(`/abstract/change-status/${id}`, {
        status: status
      })
      return {
        id,
        status
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Something went wrong while responding to review.'
      )
    }
  }
)

export const updateAbstract = createAsyncThunk(
  'updateAbstract',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.put(
        `/abstract/update-abstract/${id}`,
        data
      )
      return response.data.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'An error occurred while updating abstract'
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
      state.changeAbstractDecisionLoading = false
      state.changeAbstractDecisionSuccess = false
      state.changeAbstractDecisionError = false
      state.editAbstractLoading = false
      state.editAbstractSuccess = false
      state.editAbstractError = false
    },
    resetForm: state => {
      state.conference = null
      state.member_id = null
      state.theme = null
      state.presentation_method = null
      state.publication_options = null
      state.paper_title = null
      state.abstract = null
      state.keywords = null
      state.presentation_video_link = null
      state.graphical_abstract = null
      state.video_abstract = null
      state.presentation_profile_picture = null
      state.researchGate_link = null
      state.orcid_link = null
      state.google_scholar_link = null
      state.presenter_name = null
      state.presenter_email = null
      state.organization = null
      state.department = null
      state.country = null
      state.contact_number = null
      state.mailing_address = null
      state.presenter_status = null
      state.authors = []
      state.conference_registration = {}
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
      .addCase(getAbstractByCategory.pending, state => {
        state.getAbstractLoading = true
        state.getAbstractSuccess = false
        state.getAbstractError = false
      })
      .addCase(getAbstractByCategory.fulfilled, (state, action) => {
        state.abstracts = action.payload
        state.getAbstractLoading = false
        state.getAbstractSuccess = true
        state.getAbstractError = false
      })
      .addCase(getAbstractByCategory.rejected, state => {
        state.getAbstractLoading = false
        state.getAbstractSuccess = false
        state.getAbstractError = true
      })
      .addCase(changeAbstractDecision.pending, state => {
        state.changeAbstractDecisionLoading = true
        state.changeAbstractDecisionSuccess = false
        state.changeAbstractDecisionError = false
      })
      .addCase(changeAbstractDecision.fulfilled, (state, action) => {
        const { id, status } = action.payload
        const index = state.abstracts.findIndex(abstract => abstract._id === id)
        if (index !== -1) {
          state.abstracts[index].status = status
        }
        state.changeAbstractDecisionLoading = false
        state.changeAbstractDecisionSuccess = true
        state.changeAbstractDecisionError = false
      })
      .addCase(changeAbstractDecision.rejected, state => {
        state.changeAbstractDecisionLoading = false
        state.changeAbstractDecisionSuccess = false
        state.changeAbstractDecisionError = true
      })
      .addCase(updateAbstract.pending, state => {
        state.editAbstractLoading = true
        state.editAbstractSuccess = false
        state.editAbstractError = false
      })
      .addCase(updateAbstract.fulfilled, (state, action) => {
        const updatedAbstract = action.payload
        const index = state.abstracts.findIndex(
          abstract => abstract._id === updatedAbstract._id
        )
        if (index !== -1) {
          state.abstracts[index] = updatedAbstract
        }
        state.editAbstractLoading = false
        state.editAbstractSuccess = true
        state.editAbstractError = false
      })
      .addCase(updateAbstract.rejected, state => {
        state.editAbstractLoading = false
        state.editAbstractSuccess = false
        state.editAbstractError = true
      })
  }
})

export const {
  reset,
  resetForm,
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
