import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const paperUploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Only allow png/jpg/jpeg on either field
    const supported = /docs|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (!supported.test(ext)) {
      return cb(new Error('Must be a docs/pdf file'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 15 * 1024 * 1024 // 5 MB
  }
});

export default paperUploader