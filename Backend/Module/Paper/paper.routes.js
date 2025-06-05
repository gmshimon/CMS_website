import express from 'express'
import verifyToken from '../../Middleware/verifyToken.js'
import paperUploader from '../../Middleware/FileUpload/paperUpload.js';
import { getPaper, postPaper } from './paper.controller.js';

const router = express.Router()

router.get('/:abstractId',getPaper)
router.post('/create-paper/:abstractId',verifyToken,paperUploader.single('file'),postPaper)

export default router;