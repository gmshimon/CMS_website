import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
    collection: 'roles' // 👈 This explicitly links the model to your existing collection
  }
)

const role = mongoose.model('role', roleSchema)

export default role
