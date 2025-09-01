import mongoose from 'mongoose'

const markSchema = mongoose.Schema(
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
    sessionChair: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isEvaluated:{
      type:Boolean,
      default:false,
    },
    criteria: [
      {
        criterion: { type: String, required: true },
        score: { type: Number, required: true },
        weight: { type: Number, default: 1 }
      }
    ],
    totalMark: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)


const Mark = mongoose.model('mark', markSchema)
export default Mark
