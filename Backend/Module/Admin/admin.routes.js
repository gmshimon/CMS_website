import express from 'express';
import userImageUploader from '../../Middleware/FileUpload/userImage.js';

import verifyToken from '../../Middleware/verifyToken.js';
import { AdminCreateUser } from './admin.controller.js';
const router = express.Router();


router.route('/admin/create-user').post(verifyToken,userImageUploader.single('image'),AdminCreateUser)

export default router;