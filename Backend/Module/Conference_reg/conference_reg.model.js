import mongoose from 'mongoose'

const conferenceRegSchema = new mongoose.Schema(
  {
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conference',
      required: true
    },
    presenterName: {
      type: String,
      required: true
    },
    accommodationRequired: {
      type: String,
      default: 'No'
    },
    accommodationOption: {
      type: String
    },
    checkInDate: {
      type: String
    },
    checkInTime: {
      type: String
    },
    checkOutDate: {
      type: String
    },
    checkOutTime: {
      type: String
    },
    attendingGalaDinner: {
      type: String,
      default: 'No'
    },
    preConferenceWorkshops: [Object],
    totalPrice: {
      type: Number,
      default: 0
    },
    abstract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'abstract'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  {
    timestamps: true
  }
)

const conference_reg = mongoose.model('conference_reg', conferenceRegSchema)

export default conference_reg
