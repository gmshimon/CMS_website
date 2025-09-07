// config/env.js
import dotenv from 'dotenv'
dotenv.config()

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  
  // JWT + session
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,

  // DB
  MONGODB_URI: process.env.MONGODB_URI,
  REDIS_URL: process.env.REDIS_URL,

  // AWS
  AWS: {
    REGION: process.env.AWS_REGION,
    BUCKET: process.env.AWS_BUCKET_NAME,
    ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
    SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },

  // Firebase
  FIREBASE_ADMIN_CREDENTIALS: process.env.FIREBASE_ADMIN_CREDENTIALS
    ? JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    : null,

  // Socket
  SOCKET_ORIGIN: process.env.socket_origin || 'http://localhost:5173'
}
