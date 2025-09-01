import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

export default function EvaluationFormModal ({
  isOpen,
  onClose,
  onSubmit,
  marks
}) {
  const [ratings, setRatings] = useState({})
  const [totalMarks, setTotalMarks] = useState(0)
  // Same criteria as before
  const criteria = [
    {
      id: 1,
      text: 'Explanation of the research covered within the allotted time. (Marks multiplied with 1.5)',
      multiplier: 1.5
    },
    { id: 2, text: 'Originality of the ideas', multiplier: 1 },
    {
      id: 3,
      text: 'Contribution to the body of Knowledge (Marks multiplied with 1.5)',
      multiplier: 1.5
    },
    {
      id: 4,
      text: 'Used suitable choice of words and visuals to explain the research work.',
      multiplier: 1
    },
    {
      id: 5,
      text: 'Has the ability to grab the audience attention.',
      multiplier: 1
    },
    {
      id: 6,
      text: 'Body language suits the tone of the presentation.',
      multiplier: 1
    },
    {
      id: 7,
      text: 'The research work is clearly and effectively communicated.',
      multiplier: 1
    },
    {
      id: 8,
      text: 'Handling audience questions (marks multiply with 2)',
      multiplier: 2
    }
  ]

  const ratingOptions = [
    { value: 1, label: 'Poor (1)' },
    { value: 2, label: 'Fair (2)' },
    { value: 3, label: 'Average (3)' },
    { value: 4, label: 'Outstanding (4)' },
    { value: 5, label: 'Truly Exceptional (5)' }
  ]

  // 🔹 Pre-fill ratings when marks exist
  useEffect(() => {
    if (marks?.isEvaluated) {
      const prefilled = {}
      marks.criteria.forEach((c, idx) => {
        prefilled[idx + 1] = c.score
      })
      setRatings(prefilled)
      setTotalMarks(marks.totalMark)
    }
  }, [marks])

  const handleRatingChange = (criteriaId, rating) => {
    if (marks?.isEvaluated) return
    const newRatings = { ...ratings, [criteriaId]: rating }
    setRatings(newRatings)

    let total = 0
    criteria.forEach(criterion => {
      if (newRatings[criterion.id]) {
        total += newRatings[criterion.id] * criterion.multiplier
      }
    })
    setTotalMarks(total)
  }
  // ✅ Check if all criteria are rated
  const isFormComplete = criteria.every(c => ratings[c.id])

  const handleSubmit = async () => {
    if (!isFormComplete) {
      alert('⚠️ Please rate all criteria before submitting.')
      return
    }
    const payload = {
      criteria: criteria.map(criterion => ({
        criterion: criterion.text,
        score: ratings[criterion.id] || 0,
        weight: criterion.multiplier
      })),
      totalMark: totalMarks
    }
    onSubmit(payload)
    onClose()
  }

  const handleCancel = () => {
    setRatings({})
    setTotalMarks(0)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className='bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto'
      >
        <div className='p-8'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold text-gray-800'>
              Research Presentation Evaluation Form
            </h1>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100'
            >
              ✕
            </button>
          </div>
          <>
            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='table w-full'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='text-left font-semibold text-gray-700 min-w-96'>
                      Statement
                    </th>
                    {ratingOptions.map(opt => (
                      <th
                        key={opt.value}
                        className='text-center font-semibold text-gray-700'
                      >
                        {opt.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion, index) => (
                    <tr
                      key={criterion.id}
                      className='hover:bg-gray-50 border-b border-gray-200'
                    >
                      <td className='py-4 px-4 text-sm text-gray-800'>
                        <span className='font-medium'>{index + 1}. </span>
                        {criterion.text}
                      </td>
                      {ratingOptions.map(option => (
                        <td key={option.value} className='text-center py-4'>
                          <input
                            type='radio'
                            name={`criterion-${criterion.id}`}
                            value={option.value}
                            className='radio radio-primary'
                            onChange={() =>
                              handleRatingChange(criterion.id, option.value)
                            }
                            checked={ratings[criterion.id] === option.value}
                            disabled={marks?.isEvaluated}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Marks */}
            <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
              <div className='flex items-center gap-4'>
                <label className='text-lg font-semibold text-gray-700'>
                  Total Marks Obtained Out of 50
                </label>
                <input
                  type='number'
                  value={totalMarks}
                  readOnly
                  className='input input-bordered w-20 text-center font-bold'
                />
              </div>
            </div>

            {/* Buttons */}
            <div className='flex gap-4 mt-8 justify-end'>
              {!marks?.isEvaluated && (
                <button
                  className='btn btn-sm btn-primary text-white px-8'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
              <button
                className='btn btn-sm btn-error text-white px-8'
                onClick={handleCancel}
              >
                {marks?.isEvaluated ? 'Close' : 'Cancel'}
              </button>
            </div>
          </>
        </div>
      </motion.div>
    </div>
  )
}
