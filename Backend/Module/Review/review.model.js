import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    abstract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'abstract',
      required: true
    },
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conference',
      required: true
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },

    round: {
      type: Number,
      default: 0
    },

    accepted: {
      type: Boolean,
      default: false
    },

    assignedAt: {
      type: Date,
      default: Date.now
    },

    acceptedAt: {
      type: Date
    },

    deadline: {
      type: Date
    },

    completedAt: {
      type: Date
    },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'reviewed', 'overdue'],
      default: 'pending'
    },

    score: {
      type: Number,
      min: 1,
      max: 10
    },
    correctionLevel: {
      type: String,
      enum: [
        'None',
        'Accept',
        'Minor',
        'Moderate', // Optional middle ground
        'Major',
        'Conditional Acceptance',
        'Reject',
        'Withdrawn'
      ],
      default: 'None'
    },
    comments: {
      type: String
    },
    responses: [
      {
        question: { type: String, required: true }, // e.g. "Is it technically sound?"
        answer: { type: String, required: true }, // Yes / No / Partly
        explanation: { type: String } // optional explanation per answer
      }
    ],
    certificate: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

const Reviews = mongoose.model('reviews', reviewSchema)
export default Reviews
