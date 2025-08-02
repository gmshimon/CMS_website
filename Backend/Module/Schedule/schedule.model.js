import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema({
  abstracts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'abstract',
      required: true
    }
  ],
  conference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conference',
    required: true
  }
})
