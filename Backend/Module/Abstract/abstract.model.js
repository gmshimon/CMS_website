import mongoose from 'mongoose'

const abstractSchema = new mongoose.Schema(
  {
    conference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conference',
      required: true
    },
    category: {
      type: String
    },
    member_id: {
      type: String
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
    publication_options: {
      type: String,
      required: true
    },
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

const Abstracts = mongoose.model('abstract', abstractSchema)

export default Abstracts
