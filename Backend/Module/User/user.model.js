import mongoose from 'mongoose'
import { type } from 'os'
import validate from 'validator'
import { ObjectId } from 'mongodb'
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50
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
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
    photo: {
      type: String
    },
    address: {
      type: String
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    zip_code: {
      type: String
    },
    state: {
      type: String
    },
    affiliation: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    hear: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Users = mongoose.model('users', userSchema)

export default Users
