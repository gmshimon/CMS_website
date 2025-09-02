import { useState, useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AbstractStatusModal = ({ isOpen, onClose, abstract, onSubmit }) => {
  const [status, setStatus] = useState(abstract?.status || '')
  const [messageContent, setMessageContent] = useState('')

  const quillRef = useRef(null)

  const statuses = ['Accepted', 'Minor Revision', 'Major Revision', 'Rejected']

  useEffect(() => {
    if (abstract) {
      setStatus(abstract.status)

      // Build initial content with highlighted reviewer comments
      const reviewerComments =
        abstract.reviews
          ?.map(
            (r, index) =>
              `<details> <summary><strong>Reviewer ${index+1}</strong></summary> <p style="margin-left: 1em;">${r.comments}</p> </details> <details> <summary><strong>`
          )
          .join('') || ''

      const initialContent = `
  <p style="margin-bottom:20px; color:"red">Dear ${abstract.createdBy.name},</p>
<br/>
  <p style="margin-bottom:16px;">
    Thank you for submitting your abstract titled 
    <strong>${abstract.paper_title}</strong> to 
    <strong>${abstract.conference.name}</strong>. 
    We have received the reviewers’ feedback, and below is a summary of their comments along with our administrative message. 
    Please review carefully and make any necessary revisions to your manuscript.
  </p>
<br/>
  <div style="margin-bottom:16px;">
    ${reviewerComments}
  </div>
`
      setMessageContent(initialContent)
    }
  }, [abstract])

  const handleSubmit = () => {
    if (!status) {
      alert('Please select a status')
      return
    }

    // Get final HTML content from quill
    const editorContent = quillRef.current?.getEditor().root.innerHTML
    onSubmit({ status, message: editorContent })
    onClose()
  }

  if (!isOpen || !abstract) return null

  return (
    <dialog open className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box w-full max-w-5xl'>
        <h3 className='font-bold text-lg mb-4'>Change Abstract Status</h3>

        <div className='space-y-4'>
          {/* Status Select */}
          <div>
            <label className='font-semibold block mb-1'>Change Status</label>
            <select
              className='select select-bordered w-full'
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value=''>Select status</option>
              {statuses.map(s => (
                <option key={s} value={s} disabled={s === 'Paper Submitted'}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Combined Message Editor */}
          <div>
            <label className='font-semibold block mb-1'>Message</label>
            <ReactQuill
              ref={quillRef}
              value={messageContent}
              onChange={setMessageContent}
              placeholder='Write your message here...'
              className='h-64 mb-12'
              theme='snow'
            />
          </div>

          {/* Modal Actions */}
          <div className='modal-action'>
            <button className='btn btn-sm btn-outline' onClick={onClose}>
              Close
            </button>
            <button className='btn btn-sm btn-primary' onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default AbstractStatusModal
