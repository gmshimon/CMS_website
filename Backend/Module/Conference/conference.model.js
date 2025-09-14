import mongoose from 'mongoose'

const conferenceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    price: {
      type: Number,
      default: 0
    },
    category: [String],
    theme: [String],
    submissionOptions: [
      {
        submissionType: {
          type: String,
          enum: [
            'Paper Presentation Online',
            'Paper Presentation Physical',
            'Poster Presentation Online',
            'Poster Presentation Physical'
          ],
          required: true
        },
        price: {
          type: Number,
          default: 0
        }
      }
    ],
    presentation_method: [String],
    publication_option: [String],
    workshopOptions: [
      {
        title: {
          type: String
        },
        price: {
          type: Number
        }
      }
    ],
    year: {
      type: Number,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      default: ''
    },
    venue: {
      type: String,
      default: ''
    },
    startingDate: {
      type: Date,
      required: true
    },
    closingDate: {
      type: Date,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    status: {
      type: String,
      enum: ['Active', 'Disable'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
)

const Conference = mongoose.model('conference', conferenceSchema)

export default Conference
