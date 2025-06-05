import mongoose from 'mongoose'

const paperSchema = mongoose.Schema(
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
    category: {
      type: String
    },
    theme: {
      type: String
    },
    paper: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  {
    timestamps: true
  }
)

const Paper = mongoose.model('paper', paperSchema)
export default Paper
