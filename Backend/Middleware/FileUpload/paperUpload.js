import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid' // install with: npm install uuid

const storage = multer.memoryStorage()

const paperUploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const allowedExt = /\.(doc|docx|pdf)$/i
    const allowedMime = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedExt.test(ext) || !allowedMime.includes(file.mimetype)) {
      return cb(new Error('Only .doc, .docx, and .pdf files are allowed'))
    }

    // Generate a safe S3 file name
    const uniqueName = `${uuidv4()}${ext}`
    file.safeFilename = uniqueName

    cb(null, true)
  },
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB
  }
})

export default paperUploader
