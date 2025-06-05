import express from 'express';
import { createAbstract, getAbstract } from './abstract.controller.js';
import abstractUploaded from '../../Middleware/FileUpload/abstractUploaded.js';
import verifyToken from '../../Middleware/verifyToken.js';

const router = express.Router();

// TODO: add the token validation of admin token
router.get('/:conference_id',getAbstract)
router.post('/create-abstract',verifyToken,abstractUploaded.fields([
    { name: 'image', maxCount: 1 },
    { name: 'file',  maxCount: 1 }
]),createAbstract)

export default router;