import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the styles
import { useDispatch, useSelector } from 'react-redux'
import {
  setAbstract,
  setKeywords,
  setPaperTitle,
  setPresentationMethod,
  setPrice,
  setTheme
} from '../../Redux/Slice/AbstractSlice'

const MAX_ABSTRACT_WORDS = 250
const MAX_KEYWORDS = 5

const AbstractInformation = ({ activeStep, setActiveStep }) => {
  const { theme, presentation_method, paper_title, abstract, keywords } =
    useSelector(state => state.abstract)
  const { singleConference } = useSelector(state => state.conference)
  const [wordCount, setWordCount] = useState(0)
  const [keywordCount, setKeywordCount] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTheme(singleConference.theme))
  }, [dispatch, singleConference.theme])
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!theme) {
      newErrors.theme = 'Theme is required'
    }
    if (!presentation_method) {
      newErrors.presentationMethod = 'Presentation method is required'
    }
    // if (!publication_options) {
    //   newErrors.publicationOptions = 'Publication option is required'
    // }
    if (!paper_title?.trim() || !paper_title) {
      newErrors.paperTitle = 'Paper title is required'
    }
    if (!abstract?.trim() || !abstract) {
      newErrors.abstract = 'Abstract is required'
    }
    if (!keywords?.trim() || !keywords) {
      newErrors.keywords = 'Keywords are required'
    }
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      setActiveStep([...activeStep, 'Presenter Information'])
      sessionStorage.setItem(
        'activeStep',
        JSON.stringify([...activeStep, 'Presenter Information'])
      )
    } else {
      setErrors(newErrors)
    }
  }

  const handleWordLimitedChange = (value, type = 'abstract') => {
    let text = ''
    let words = []

    // Different input source for ReactQuill vs text input
    if (type === 'abstract') {
      text = value.replace(/<[^>]+>/g, ' ').trim() // remove HTML tags
    } else {
      text = value.trim() // plain input
    }

    // ✅ split words by space, comma, or punctuation
    words = text.split(/[\s,.;:!?]+/).filter(Boolean)

    const limit = type === 'abstract' ? MAX_ABSTRACT_WORDS : MAX_KEYWORDS
    const count = words.length

    // Enforce limit
    if (count <= limit) {
      if (type === 'abstract') {
        dispatch(setAbstract(value))
        setWordCount(count)
      } else {
        dispatch(setKeywords(value))
        setKeywordCount(count)
      }
    }
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
          <input
            name='theme'
            value={theme}
            readOnly
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.theme ? 'select-error' : ''
            }`}
          />

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
            value={presentation_method || ''} // <-- store submissionType in state or Redux
            onChange={e => {
              const selectedSubmissionType = e.target.value

              // find full object based on submissionType
              const selectedOption = singleConference?.submissionOptions?.find(
                option => option.submissionType === selectedSubmissionType
              )

              // find early bird deadline
              const earlyBirdDeadline = singleConference?.importantDates?.find(
                d => d.title.toLowerCase().includes('early bird')
              )?.date

              const today = new Date()
              const price =
                earlyBirdDeadline && today <= new Date(earlyBirdDeadline)
                  ? selectedOption.earlyBird
                  : selectedOption.normal

              // ✅ Save submissionType (for API)
              dispatch(setPresentationMethod(selectedOption.submissionType))

              // ✅ Save calculated price
              dispatch(setPrice(price))
            }}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.presentationMethod ? 'select-error' : ''
            }`}
          >
            <option value=''>Select presentation method</option>
            {singleConference?.submissionOptions?.map(option => (
              <option key={option._id} value={option.submissionType}>
                {option.submissionType}
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
        {/* <div>
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
            {singleConference?.publication_option?.map((option, index) => (
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
        </div> */}

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
            onChange={val => handleWordLimitedChange(val, 'abstract')}
            className={`h-[200px] mb-12 ${
              errors.abstract ? 'border-error' : ''
            }`}
          />
          <div
            className={`text-right text-sm mt-1 ${
              wordCount > MAX_ABSTRACT_WORDS ? 'text-error' : 'text-gray-500'
            }`}
          >
            {wordCount} / {MAX_ABSTRACT_WORDS} words
          </div>
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
            readOnly={keywordCount > MAX_KEYWORDS}
            onChange={e => handleWordLimitedChange(e.target.value, 'keywords')}
            className={`border border-black rounded-md p-2 w-full text-black ${
              errors.keywords ? 'input-error' : ''
            }`}
            placeholder='Enter keywords (comma separated)'
          />
          <div
            className={`text-right text-sm mt-1 ${
              keywordCount > MAX_KEYWORDS ? 'text-error' : 'text-gray-500'
            }`}
          >
            {keywordCount} / {MAX_KEYWORDS} keywords
          </div>
          {errors.keywords && (
            <p className='text-error text-sm mt-1'>{errors.keywords}</p>
          )}
        </div>

        {/* Presentation Video Link */}
        {/* <div>
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
        </div> */}

        {/* Graphical Abstract */}
        {/* <div>
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
        </div> */}

        {/* Video Abstract of Findings */}
        {/* <div>
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
        </div> */}

        {/* Presenter Profile Picture */}
        {/* <div>
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
        </div> */}

        {/* Social Media Links */}
      </form>
      <button
        onClick={() => {
          activeStep.pop('Abstraction Information')
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
