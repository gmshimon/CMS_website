import mongoose from 'mongoose'
import validate from 'validator'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validate.isEmail, 'Please enter a valid email']
    },
    phone: {
      type: String
    },
    photo: {
      type: String
    },

    // Address Info
    address: { type: String },
    country: { type: String },
    city: { type: String },
    zip_code: { type: String },
    state: { type: String },

    // Affiliation & Education
    affiliation: { type: String },
    department: { type: String },
    faculty: { type: String },

    // Role (ObjectId ref or enum fallback)
    role: { type: String }, // collection: roles

    // How user heard about it (optional)
    hear: { type: String },

    // Reviewer/Moderator/Session Chair-specific fields
    university: { type: String },
    position: { type: String }, // current position like "Associate Professor"
    domain: { type: String },
    orcid: { type: String }, // ORCID link
    contact: { type: String }, // Alternative contact or phone

    // For committee members (scientific/technical)
    committeeType: {
      type: String,
      enum: ['Scientific', 'Organizing'],
      default: null
    },
    committeeName:{
      type:String,
      enum:['Program','Technical','Publication','Publicity','Sponsorship','Technical Support','Registration','Virtual Conference','Logistic'],
    }
  },
  {
    timestamps: true
  }
)

const Users = mongoose.model('users', userSchema)

export default Users
