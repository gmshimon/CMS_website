import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true },
    title:{
      type:String,
      required:true
    },
    type: {
      type: String,
      enum: [
        'abstract_created',
        'abstract_approved',
        'abstract_rejected',
        'reminder',
        'general'
      ],
      default: 'abstract_created'
    },
    isRead: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

const notification = mongoose.model('notification', notificationSchema)
export default notification
