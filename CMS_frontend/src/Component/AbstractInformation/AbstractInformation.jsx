import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the styles
import { useDispatch, useSelector } from 'react-redux'
import {
  setAbstract,
  setGoogleScholarLink,
  setGraphicalAbstract,
  setKeywords,
  setOrcidLink,
  setPaperTitle,
  setPresentationMethod,
  setPresentationProfilePicture,
  setPresentationVideoLink,
  setPublicationOptions,
  setResearchGateLink,
  setTheme,
  setVideoAbstract
} from '../../Redux/Slice/AbstractSlice'
const AbstractInformation = ({ activeStep, setActiveStep }) => {
  const {
    theme,
    presentation_method,
    publication_options,
    paper_title,
    abstract,
    keywords,
    presentation_video_link,
    video_abstract,
    researchGate_link,
    orcid_link,
    google_scholar_link
  } = useSelector(state => state.abstract)
  const { conferences } = useSelector(state => state.conference)

  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const validateForm = () => {
    const newErrors = {}
    if (!theme) {
      newErrors.theme = 'Theme is required'
    }
    if (!presentation_method) {
      newErrors.presentationMethod = 'Presentation method is required'
    }
    if (!publication_options) {
      newErrors.publicationOptions = 'Publication option is required'
    }
    if (!paper_title?.trim() || !paper_title) {
      newErrors.paperTitle = 'Paper title is required'
    }
    if (!abstract?.trim() || !abstract) {
      newErrors.abstract = 'Abstract is required'
    }
    if (!keywords?.trim() || keywords) {
      newErrors.keywords = 'Keywords are required'
    }
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validateForm()
    // if (Object.keys(newErrors).length === 0) {
      setActiveStep([...activeStep, 'Presenter Information'])
      sessionStorage.setItem(
        'activeStep',
        JSON.stringify([...activeStep, 'Presenter Information'])
      )
    // } else {
    //   setErrors(newErrors)
    // }
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6'>Abstract Information</h2>

      <form className='space-y-2'>
        {/* Theme */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>Theme *</span>
          </label>
          <select
            name='theme'
            value={theme}
            onChange={e => dispatch(setTheme(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.theme ? 'select-error' : ''
            }`}
          >
            <option value=''>Select a theme</option>
            {conferences?.theme?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.theme && (
            <p className='text-error text-sm mt-1'>{errors.theme}</p>
          )}
        </div>

        {/* Presentation Method */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Presentation Method *
            </span>
          </label>
          <select
            name='presentation_method'
            value={presentation_method}
            onChange={e => dispatch(setPresentationMethod(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.presentationMethod ? 'select-error' : ''
            }`}
          >
            <option value=''>Select presentation method</option>
            {conferences?.presentation_method?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.presentationMethod && (
            <p className='text-error text-sm mt-1'>
              {errors.presentationMethod}
            </p>
          )}
        </div>

        {/* Publication Options */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Publication Options *
            </span>
          </label>
          <select
            name='publication_options'
            value={publication_options}
            onChange={e => dispatch(setPublicationOptions(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.publicationOptions ? 'select-error' : ''
            }`}
          >
            <option value=''>Select publication option</option>
            {conferences?.publication_option?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.publicationOptions && (
            <p className='text-error text-sm mt-1'>
              {errors.publicationOptions}
            </p>
          )}
        </div>

        {/* Paper Title */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Paper Title *
            </span>
          </label>
          <input
            type='text'
            name='paper_title'
            value={paper_title}
            onChange={e => dispatch(setPaperTitle(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.paperTitle ? 'input-error' : ''
            }`}
            placeholder='Enter paper title'
          />
          {errors.paperTitle && (
            <p className='text-error text-sm mt-1'>{errors.paperTitle}</p>
          )}
        </div>

        {/* Abstract */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Abstract *
            </span>
          </label>
          <ReactQuill
            value={abstract}
            onChange={e => dispatch(setAbstract(e))}
            className={`h-[200px] mb-12 ${
              errors.abstract ? 'border-error' : ''
            }`}
          />
          {errors.abstract && (
            <p className='text-error text-sm mt-1'>{errors.abstract}</p>
          )}
        </div>

        {/* Keywords */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Keywords *
            </span>
          </label>
          <input
            type='text'
            name='keywords'
            value={keywords}
            onChange={e => dispatch(setKeywords(e.target.value))}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.keywords ? 'input-error' : ''
            }`}
            placeholder='Enter keywords (comma separated)'
          />
          {errors.keywords && (
            <p className='text-error text-sm mt-1'>{errors.keywords}</p>
          )}
        </div>

        {/* Presentation Video Link */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Presentation Video Link
            </span>
          </label>
          <input
            type='url'
            name='presentation_video_link'
            value={presentation_video_link}
            onChange={e => dispatch(setPresentationVideoLink(e.target.value))}
            className='border border-black rounded-md p-2 w-full text-black'
            placeholder='Enter presentation video link'
          />
        </div>

        {/* Graphical Abstract */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Graphical Abstract
            </span>
          </label>
          <input
            type='file'
            name='graphical_abstract'
            onChange={e => dispatch(setGraphicalAbstract(e.target.files[0]))}
            className='border border-black rounded-md p-2  w-full'
            accept='image/*'
          />
        </div>

        {/* Video Abstract of Findings */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Video Abstract of Findings
            </span>
          </label>
          <input
            type='url'
            name='video_abstract'
            value={video_abstract}
            onChange={e => dispatch(setVideoAbstract(e.target.value))}
            className='border border-black rounded-md p-2 w-full text-black'
            placeholder='Enter video abstract link'
          />
        </div>

        {/* Presenter Profile Picture */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Presenter Profile Picture
            </span>
          </label>
          <input
            type='file'
            name='presenterProfilePicture'
            onChange={e =>
              dispatch(setPresentationProfilePicture(e.target.files[0]))
            }
            className='border border-black rounded-md p-2 w-full'
            accept='image/*'
          />
        </div>

        {/* Social Media Links */}
        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Researchgate Link
            </span>
          </label>
          <input
            type='url'
            name='researchGate_link'
            value={researchGate_link}
            onChange={e => dispatch(setResearchGateLink(e.target.value))}
            className='border border-black rounded-md p-2 w-full text-black'
            placeholder='Enter Researchgate profile link'
          />
        </div>

        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              ORCID Link
            </span>
          </label>
          <input
            type='url'
            name='orcid_link'
            value={orcid_link}
            onChange={e => dispatch(setOrcidLink(e.target.value))}
            className='border border-black rounded-md p-2 w-full text-black'
            placeholder='Enter ORCID profile link'
          />
        </div>

        <div>
          <label className='label'>
            <span className='label-text font-medium text-black'>
              Google Scholar Link
            </span>
          </label>
          <input
            type='url'
            name='google_scholar_link'
            value={google_scholar_link}
            onChange={e => dispatch(setGoogleScholarLink(e.target.value))}
            className='border border-black rounded-md p-2 w-full text-black'
            placeholder='Enter Google Scholar profile link'
          />
        </div>
      </form>
      <button
        onClick={() => {
          activeStep.pop('Conference Registration')
          setActiveStep(['Select Conference'])
          sessionStorage.setItem(
            'activeStep',
            JSON.stringify(['Select Conference'])
          )
        }}
        className='mt-4 px-6 py-3 text-white font-bold btn btn-active btn-sm btn-primary mr-2'
      >
        Previous
      </button>
      <button
        type='button'
        onClick={handleSubmit}
        className='mt-4 px-6 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
      >
        Next
      </button>
    </div>
  )
}

export default AbstractInformation
