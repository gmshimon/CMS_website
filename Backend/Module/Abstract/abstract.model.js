import mongoose from 'mongoose'
import Counter from '../Counter/counter.model.js'
import Conference from '../Conference/conference.model.js'

const abstractSchema = new mongoose.Schema(
  {
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conference',
      required: true
    },
    abstract_id: {
      type: String,
      unique: true,
      index: true
    },
    track: {
      type: String,
      required: true
    },
    subTrack: {
      type: String,
      required: true
    },
    category: {
      type: String
    },
    member_id: {
      type: String
    },
    price: {
      type: Number,
      default: 0
    },
    payment_status: {
      type: String,
      enum: ['Paid', 'Pending', 'Unpaid'],
      default: 'Unpaid'
    },
    review_status: {
      type: String,
      enum: ['Pending', 'Reviewed'],
      default: 'Pending'
    },
    payment_proof: {
      type: String
    },
    scheduled: {
      type: Boolean,
      default: false
    },

    payment_deadline: {
      type: Date,
      default: null
    },
    paper_deadline: {
      type: Date,
      default: null
    },
    amount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: [
        'Abstract Submitted',
        'Abstract Accepted',
        'Paper Submitted',
        'Accepted',
        'Rejected',
        'Minor Revision',
        'Major Revision',
        'Revision Submitted',
        'Camera Ready Copy Submitted',
        'Withdraw'
      ],
      default: 'Abstract Submitted'
    },
    theme: {
      type: String,
      required: true
    },
    presentation_method: {
      type: String,
      required: true
    },
    // publication_options: {
    //   type: String,
    //   required: true
    // },
    paper_title: {
      type: String,
      required: true
    },
    abstract: {
      type: String,
      required: true
    },
    keywords: {
      type: String,
      required: true
    },
    presentation_video_link: {
      type: String
    },
    graphical_abstract: {
      type: String
    },
    video_abstract: {
      type: String
    },
    presentation_profile_picture: {
      type: String
    },
    researchGate_link: {
      type: String
    },
    orcid_link: {
      type: String
    },
    google_scholar_link: {
      type: String
    },
    conference_reg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conference_reg',
      required: true
    },
    presenter: {
      presenter_title: {
        type: String,
        default: 'Mr. '
      },
      presenter_name: {
        type: String,
        required: true
      },
      presenter_email: {
        type: String,
        required: true
      },
      organization: {
        type: String,
        required: true
      },
      department: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      contact_number: {
        type: String,
        required: true
      },
      mailing_address: {
        type: String,
        required: true
      },
      presenter_status: {
        type: String,
        required: true
      }
    },
    authors: [
      {
        title: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        },
        affiliation: {
          type: String
        },
        isPrimary: {
          type: Boolean,
          default: false
        }
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  {
    timestamps: true
  }
)

abstractSchema.pre('save', async function (next) {
  if (this.abstract_id) return next() // skip if already set

  // const Conference = mongoose.model('conference')
  const conference = await Conference.findById(this.conference)

  if (!conference) {
    return next(new Error('Conference not found while generating abstract_id'))
  }

  // ✅ Build prefix: shortName + year + track
  const shortName =
    conference.shortName || conference.name?.split(' ')[0] || 'CONF'
  const year = new Date().getFullYear()
  // ✅ Generate short track code
  function getTrackCode (track) {
    return track
      .split(/\s+/)
      .map(word => word[0]) // first letter of each word
      .join('')
      .toUpperCase()
  }
  const trackCode = this.track ? getTrackCode(this.track) : 'GEN'

  const prefix = `${shortName}_${trackCode}`

  // 🔹 Counter key is only the conference
  const counterKey = prefix

  // Counter key = prefix
  const counter = await Counter.findOneAndUpdate(
    { key: prefix },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )

  const sequence = String(counter.seq).padStart(4, '0')
  this.abstract_id = `${prefix}_${sequence}`

  next()
})

const Abstracts = mongoose.model('abstract', abstractSchema)

export default Abstracts
