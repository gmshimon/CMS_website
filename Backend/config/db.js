// config/db.js
import mongoose from 'mongoose'
import { ENV } from './env.js'

// const url = ENV.MONGODB_URI
const url = 'mongodb://127.0.0.1:27017/cms_website'
export const connectDB = async () => {
  try {
    await mongoose.connect(url)
    console.log('🛢️ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    process.exit(1)
  }
}
