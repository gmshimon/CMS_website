import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const abstractUploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Only allow png/jpg/jpeg on either field
    const supported = /png|jpe?g/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (!supported.test(ext)) {
      return cb(new Error('Must be a png/jpg/jpeg image'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
});

export default abstractUploader