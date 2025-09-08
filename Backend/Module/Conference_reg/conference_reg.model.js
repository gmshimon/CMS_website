import mongoose from 'mongoose'
import Conference from '../Conference/conference.model.js'
import Counter from '../Counter/counter.model.js'

const conferenceRegSchema = new mongoose.Schema(
  {
    registration_id: {
      type: String,
      unique: true,
      index: true
    },
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conference',
      required: true,
      index: true
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
      ref: 'users',
      index: true
    }
  },
  {
    timestamps: true
  }
)

/**
 * Pre-save hook to generate unique registration_id
 * Format: {CONFERENCE_PREFIX}_REG_0001
 */
conferenceRegSchema.pre('save', async function (next) {
  if (this.registration_id) return next() // Skip if already set

  const conference = await Conference.findById(this.conference)
  if (!conference) {
    return next(new Error('Conference not found while generating registration_id'))
  }

  // Use conference shortName if available, else fallback to first word of name
  const prefix = conference.shortName || conference.name?.split(' ')[0] || 'CONF'

  // Counter key per conference
  const counterKey = `${prefix}_REG`

  const counter = await Counter.findOneAndUpdate(
    { key: counterKey },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )

  const sequence = String(counter.seq).padStart(4, '0') // e.g. 0001
  this.registration_id = `${prefix}_REG_${sequence}`

  next()
})

const conference_reg = mongoose.model('conference_reg', conferenceRegSchema)

export default conference_reg
