import { useState, useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AbstractStatusModal = ({ isOpen, onClose, abstract, onSubmit }) => {
  const [status, setStatus] = useState(abstract?.status || '')
  const [messageContent, setMessageContent] = useState('')
  const [paper_deadline, setDeadline] = useState(
    abstract?.paper_deadline ? abstract.paper_deadline.split('T')[0] : ''
  )

  const quillRef = useRef(null)

  const statuses = ['Accepted', 'Minor Revision', 'Major Revision', 'Rejected']

  useEffect(() => {
    if (abstract) {
      // setStatus(abstract.status || '')

      const reviewerComments =
        abstract.reviews
          ?.map(
            (r, index) =>
              `<details> 
                <summary><strong>Reviewer ${index + 1}</strong></summary> 
                <p style="margin-left: 1em;">${r.comments}</p> 
              </details>`
          )
          .join('') || ''

      let deadlineText = ''
      if (status === 'Minor Revision' || status === 'Major Revision') {
        deadlineText = paper_deadline
          ? `<p style="margin-bottom:16px;"><strong>Deadline:</strong> Please submit your revised paper by <u>${paper_deadline}</u>.</p>`
          : `<p style="margin-bottom:16px;"><strong>Deadline:</strong> Please submit your revised paper within the given time frame.</p>`
      }

      const initialContent = `
        <p style="margin-bottom:20px; color:red;">Dear ${abstract.createdBy.name},</p>

        <p style="margin-bottom:16px;">
          Thank you for submitting your abstract titled 
          <strong>${abstract.paper_title}</strong> to 
          <strong>${abstract.conference.name}</strong>. 
          The current status of your paper is: <strong>${status}</strong>.
        </p>

        <p style="margin-bottom:16px;">
          We have received the reviewers’ feedback, and below is a summary of their comments along with our administrative message. 
          Please review carefully and make any necessary revisions to your manuscript.
        </p>

        ${deadlineText}

        <div style="margin-bottom:16px;">
          ${reviewerComments}
        </div>
      `
      setMessageContent(initialContent)
    }
  }, [abstract, status, paper_deadline])

  const handleSubmit = () => {
    if (!status) {
      alert('Please select a status')
      return
    }

    const editorContent = quillRef.current?.getEditor().root.innerHTML
    const data = { status, paper_deadline, message: editorContent }

    onSubmit(abstract?._id, data)
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
              className='border border-black p-2 rounded-md w-full'
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value=''>Select status</option>
              {statuses.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline Input */}
          {(status === 'Minor Revision' || status === 'Major Revision') && (
            <div>
              <label className='font-semibold block mb-1'>Set Deadline</label>
              <input
                type='date'
                className='border border-black p-2 rounded-md w-full'
                value={paper_deadline}
                onChange={e => setDeadline(e.target.value)}
              />
            </div>
          )}

          {/* Message Editor */}
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
            <button className='px-2 py-2 text-sm font-semibold text-black border border-black rounded-md transition-colors duration-200 mr-2' onClick={onClose}>
              Close
            </button>
            <button className='px-2 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 mr-2' onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default AbstractStatusModal
