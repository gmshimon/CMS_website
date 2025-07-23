import { useState, useEffect } from 'react'
const questions = [
  {
    id: 'q1',
    question:
      'Is the manuscript technically sound, and do the data support the conclusions?',
    description:
      'The manuscript must describe a technically sound piece of scientific research with data that supports the conclusions. Experiments must have been conducted rigorously, with appropriate controls, replication, and sample sizes.'
  },
  {
    id: 'q2',
    question:
      'Have the experiments been performed appropriately and rigorously?'
  },
  {
    id: 'q3',
    question:
      'Is the manuscript presented in an intelligible fashion and written in standard English?',
    description:
      'The language in submitted articles must be clear, correct, and unambiguous.'
  }
]
const ReviewModal = ({ isOpen, onClose, isEditable, onSubmit, paper }) => {
  const [responses, setResponses] = useState({})
  const [comment, setComment] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [score, setScore] = useState('')

  // Initialize form with paper data if it exists and we're not in editable mode
  useEffect(() => {
    if (!isEditable && paper) {
      setResponses(
        paper.responses?.reduce((acc, response) => {
          acc[response.question] = response.answer
          return acc
        }, {}) || {}
      )
      setComment(paper.comments || '')
      setRecommendation(paper.correctionLevel || '')
      setScore(paper.score || '')
    }
  }, [paper, isEditable])

  const handleSelectChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async () => {
    if (!isEditable) {
      onClose()
      return
    }

    if (!score || score < 1 || score > 10) {
      alert('Please enter a score between 1 and 10.')
      return
    }
    if (!comment.trim()) {
      alert('Please enter your review comments.')
      return
    }
    if (!recommendation) {
      alert('Please select a final recommendation.')
      return
    }

    const formattedResponses = Object.entries(responses).map(
      ([questionId, answer]) => ({
        questionId,
        question:
          questions.find(q => q.id === questionId)?.question || questionId,
        answer,
        explanation: ''
      })
    )

    const data = {
      reviewId: paper._id,
      score: Number(score),
      comments: comment,
      correctionLevel: recommendation,
      responses: formattedResponses
    }

    onClose()
    onSubmit(data)
  }

  return (
    <>
      {isOpen && (
        <dialog open className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box w-full max-w-2xl'>
            <h3 className='font-bold text-lg mb-4'>
              {isEditable ? 'Submit Review' : 'Review Details'}
            </h3>

            <form
              onSubmit={e => {
                e.preventDefault()
                handleSubmit()
              }}
              className='space-y-4'
            >
              {questions.map(q => (
                <div key={q.id}>
                  <label className='font-semibold block'>{q.question}</label>
                  {q.description && (
                    <p className='text-sm text-gray-500 mb-1'>
                      {q.description}
                    </p>
                  )}
                  {isEditable ? (
                    <select
                      className='select select-bordered w-full'
                      value={responses[q.id] || ''}
                      onChange={e => handleSelectChange(q.id, e.target.value)}
                      required
                    >
                      <option value=''>Please select a response</option>
                      <option value='Yes'>Yes</option>
                      <option value='No'>No</option>
                      <option value='Partly'>Partly</option>
                    </select>
                  ) : (
                    <div className='p-2 border rounded'>
                      {responses[q.question] || 'Not answered'}
                    </div>
                  )}
                </div>
              ))}

              <div>
                <label className='font-semibold block mb-1'>Score (1-10)</label>
                {isEditable ? (
                  <input
                    type='number'
                    min={1}
                    max={10}
                    value={score}
                    onChange={e => setScore(e.target.value)}
                    className='input input-bordered w-full'
                    required
                  />
                ) : (
                  <div className='p-2 border rounded'>
                    {score || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className='font-semibold block mb-1'>
                  Review Comments to the Author
                </label>
                {isEditable ? (
                  <>
                    <textarea
                      className='textarea textarea-bordered w-full'
                      placeholder='Write your review here...'
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      maxLength={20000}
                      required
                    />
                    <p className='text-sm text-gray-500'>
                      Character Count: {comment.length}/20000
                    </p>
                  </>
                ) : (
                  <div className='p-2 border rounded whitespace-pre-wrap'>
                    {comment || 'No comments provided'}
                  </div>
                )}
              </div>

              <div>
                <label className='font-semibold block mb-1'>
                  Final Recommendation
                </label>
                {isEditable ? (
                  <select
                    className='select select-bordered w-full'
                    value={recommendation}
                    onChange={e => setRecommendation(e.target.value)}
                    required
                  >
                    <option value=''>Select a recommendation</option>
                    <option value='Accept'>Accept</option>
                    <option value='Minor'>Minor</option>
                    <option value='Moderate'>Moderate</option>
                    <option value='Major'>Major</option>
                    <option value='Conditional Acceptance'>
                      Conditional Acceptance
                    </option>
                    <option value='Reject'>Reject</option>
                    <option value='Withdrawn'>Withdrawn</option>
                  </select>
                ) : (
                  <div className='p-2 border rounded'>
                    {recommendation || 'Not specified'}
                  </div>
                )}
              </div>

              <div className='modal-action'>
                <button
                  type='button'
                  onClick={onClose}
                  className='btn btn-outline'
                >
                  Close
                </button>
                {isEditable && (
                  <button type='submit' className='btn btn-primary'>
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  )
}

export default ReviewModal
